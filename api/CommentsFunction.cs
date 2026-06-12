using Azure.Data.Tables;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Web;

namespace RawaComments;

public class CommentsFunction
{
    private const string TableName = "rawacomments";
    private readonly ILogger _log;

    private static readonly JsonSerializerOptions JsonOpts = new()
    {
        PropertyNameCaseInsensitive = true,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    public CommentsFunction(ILoggerFactory loggerFactory)
    {
        _log = loggerFactory.CreateLogger<CommentsFunction>();
    }

    // ── GET /api/comments?stage=s1 ───────────────────────────────────────
    [Function("GetComments")]
    public async Task<HttpResponseData> GetComments(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "comments")] HttpRequestData req)
    {
        var stage = HttpUtility.ParseQueryString(req.Url.Query)["stage"] ?? "overview";
        var client = GetTableClient();

        var results = new List<CommentResponse>();
        await foreach (var entity in client.QueryAsync<CommentEntity>(e => e.PartitionKey == stage))
        {
            results.Add(ToResponse(entity));
        }

        results.Sort((a, b) => DateTimeOffset.Compare(a.CreatedAt, b.CreatedAt));

        return await OkJson(req, results);
    }

    // ── GET /api/comments/counts ─────────────────────────────────────────
    // Returns unresolved comment counts per stage: { "s0": 2, "s1": 5, ... }
    [Function("GetCommentCounts")]
    public async Task<HttpResponseData> GetCommentCounts(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "comments/counts")] HttpRequestData req)
    {
        var client = GetTableClient();
        var counts = new Dictionary<string, int>();

        await foreach (var entity in client.QueryAsync<TableEntity>(
            select: new[] { "PartitionKey", "Resolved" }))
        {
            var pk = entity.PartitionKey;
            if (string.IsNullOrEmpty(pk)) continue;
            var resolved = entity.GetBoolean("Resolved") ?? false;
            if (!resolved)
                counts[pk] = counts.TryGetValue(pk, out var c) ? c + 1 : 1;
        }

        return await OkJson(req, counts);
    }

    // ── POST /api/comments ───────────────────────────────────────────────
    [Function("PostComment")]
    public async Task<HttpResponseData> PostComment(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "comments")] HttpRequestData req)
    {
        var body = await req.ReadAsStringAsync() ?? "";
        var dto = JsonSerializer.Deserialize<PostCommentRequest>(body, JsonOpts);

        if (dto is null || string.IsNullOrWhiteSpace(dto.Author) || string.IsNullOrWhiteSpace(dto.Text))
        {
            var bad = req.CreateResponse(HttpStatusCode.BadRequest);
            AddCors(bad);
            await bad.WriteStringAsync("Author and text are required.");
            return bad;
        }

        var now = DateTimeOffset.UtcNow;
        var entity = new CommentEntity
        {
            PartitionKey = string.IsNullOrWhiteSpace(dto.Stage) ? "overview" : dto.Stage,
            RowKey       = $"{now:yyyyMMddHHmmssffff}_{Guid.NewGuid():N}",
            Author       = dto.Author.Trim(),
            Text         = dto.Text.Trim(),
            CreatedAt    = now,
            Quote        = dto.Quote?.Trim() ?? "",
            Prefix       = dto.Prefix?.Trim() ?? "",
            Suffix       = dto.Suffix?.Trim() ?? ""
        };

        var client = GetTableClient();
        await client.AddEntityAsync(entity);

        _log.LogInformation("Comment saved: stage={Stage} author={Author}", entity.PartitionKey, entity.Author);

        var created = req.CreateResponse(HttpStatusCode.Created);
        AddCors(created);
        created.Headers.Add("Content-Type", "application/json");
        await created.WriteStringAsync(JsonSerializer.Serialize(ToResponse(entity), JsonOpts));
        return created;
    }

    // ── PUT /api/comments/{id} ───────────────────────────────────────────
    [Function("EditComment")]
    public async Task<HttpResponseData> EditComment(
        [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "comments/{id}")] HttpRequestData req,
        string id)
    {
        var body = await req.ReadAsStringAsync() ?? "";
        var dto  = JsonSerializer.Deserialize<EditCommentRequest>(body, JsonOpts);

        if (dto is null || string.IsNullOrWhiteSpace(dto.Stage) || string.IsNullOrWhiteSpace(dto.Text))
            return await BadRequest(req, "stage and text are required.");

        // Authoritative identity from Static Web Apps auth header; fall back to body for local dev
        var callerEmail = GetCallerEmail(req) ?? dto.Author ?? "";
        if (string.IsNullOrWhiteSpace(callerEmail))
            return await BadRequest(req, "Authentication required.");

        var client = GetTableClient();
        CommentEntity entity;
        try { entity = await client.GetEntityAsync<CommentEntity>(dto.Stage, id); }
        catch { return req.CreateResponse(HttpStatusCode.NotFound); }

        if (!string.Equals(entity.Author, callerEmail, StringComparison.OrdinalIgnoreCase))
            return await BadRequest(req, "You can only edit your own comments.");

        entity.Text = dto.Text.Trim();
        await client.UpdateEntityAsync(entity, entity.ETag, TableUpdateMode.Replace);
        _log.LogInformation("Comment edited: stage={Stage} id={Id}", dto.Stage, id);

        return await OkJson(req, ToResponse(entity));
    }

    // ── DELETE /api/comments/{id}?stage=s1 ──────────────────────────────
    [Function("DeleteComment")]
    public async Task<HttpResponseData> DeleteComment(
        [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "comments/{id}")] HttpRequestData req,
        string id)
    {
        var qs    = HttpUtility.ParseQueryString(req.Url.Query);
        var stage = qs["stage"] ?? "";

        if (string.IsNullOrWhiteSpace(stage))
            return await BadRequest(req, "stage is required.");

        // Authoritative identity from Static Web Apps auth header; fall back to query param for local dev
        var callerEmail = GetCallerEmail(req) ?? qs["author"] ?? "";
        if (string.IsNullOrWhiteSpace(callerEmail))
            return await BadRequest(req, "Authentication required.");

        var client = GetTableClient();
        CommentEntity entity;
        try { entity = await client.GetEntityAsync<CommentEntity>(stage, id); }
        catch { return req.CreateResponse(HttpStatusCode.NotFound); }

        if (!string.Equals(entity.Author, callerEmail, StringComparison.OrdinalIgnoreCase))
            return await BadRequest(req, "You can only delete your own comments.");

        await client.DeleteEntityAsync(stage, id, entity.ETag);
        _log.LogInformation("Comment deleted: stage={Stage} id={Id}", stage, id);

        var res = req.CreateResponse(HttpStatusCode.NoContent);
        AddCors(res);
        return res;
    }

    // ── POST /api/comments/{id}/resolve?stage=s1 ────────────────────────
    // Toggles the resolved flag. Any authenticated team member can resolve.
    [Function("ResolveComment")]
    public async Task<HttpResponseData> ResolveComment(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "comments/{id}/resolve")] HttpRequestData req,
        string id)
    {
        var qs    = HttpUtility.ParseQueryString(req.Url.Query);
        var stage = qs["stage"] ?? "";

        if (string.IsNullOrWhiteSpace(stage))
            return await BadRequest(req, "stage is required.");

        var callerEmail = GetCallerEmail(req) ?? qs["author"] ?? "";
        if (string.IsNullOrWhiteSpace(callerEmail))
            return await BadRequest(req, "Authentication required.");

        var client = GetTableClient();
        CommentEntity entity;
        try { entity = await client.GetEntityAsync<CommentEntity>(stage, id); }
        catch { return req.CreateResponse(HttpStatusCode.NotFound); }

        entity.Resolved   = !entity.Resolved;
        entity.ResolvedBy = entity.Resolved ? callerEmail : "";
        await client.UpdateEntityAsync(entity, entity.ETag, TableUpdateMode.Replace);
        _log.LogInformation("Comment resolve toggled: stage={Stage} id={Id} resolved={Resolved}", stage, id, entity.Resolved);

        return await OkJson(req, ToResponse(entity));
    }

    // ── OPTIONS /api/comments  (CORS preflight) ──────────────────────────
    [Function("OptionsComments")]
    public HttpResponseData Options(
        [HttpTrigger(AuthorizationLevel.Anonymous, "options", Route = "comments")] HttpRequestData req)
    {
        var res = req.CreateResponse(HttpStatusCode.OK);
        AddCors(res);
        res.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.Headers.Add("Access-Control-Allow-Headers", "Content-Type");
        return res;
    }

    // ── OPTIONS /api/comments/{id} and /api/comments/{id}/resolve ───────
    [Function("OptionsCommentsId")]
    public HttpResponseData OptionsId(
        [HttpTrigger(AuthorizationLevel.Anonymous, "options", Route = "comments/{rest}")] HttpRequestData req,
        string rest)
    {
        var res = req.CreateResponse(HttpStatusCode.OK);
        AddCors(res);
        res.Headers.Add("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST, OPTIONS");
        res.Headers.Add("Access-Control-Allow-Headers", "Content-Type");
        return res;
    }

    // ── Helpers ──────────────────────────────────────────────────────────

    // Read the authenticated user's email from the Azure Static Web Apps principal header.
    // Returns null when the header is absent (e.g. local dev without the SWA emulator).
    private static string? GetCallerEmail(HttpRequestData req)
    {
        if (!req.Headers.TryGetValues("x-ms-client-principal", out var vals))
            return null;
        var encoded = vals.FirstOrDefault();
        if (string.IsNullOrEmpty(encoded)) return null;
        try
        {
            var json = Encoding.UTF8.GetString(Convert.FromBase64String(encoded));
            using var doc = JsonDocument.Parse(json);
            return doc.RootElement.GetProperty("userDetails").GetString();
        }
        catch { return null; }
    }

    private static TableClient GetTableClient()
    {
        var conn = Environment.GetEnvironmentVariable("AzureWebJobsStorage")
                   ?? throw new InvalidOperationException("AzureWebJobsStorage is not set.");
        var svc = new TableServiceClient(conn);
        svc.CreateTableIfNotExists(TableName);
        return svc.GetTableClient(TableName);
    }

    private static async Task<HttpResponseData> OkJson(HttpRequestData req, object payload)
    {
        var res = req.CreateResponse(HttpStatusCode.OK);
        AddCors(res);
        res.Headers.Add("Content-Type", "application/json");
        await res.WriteStringAsync(JsonSerializer.Serialize(payload, JsonOpts));
        return res;
    }

    private static async Task<HttpResponseData> BadRequest(HttpRequestData req, string msg)
    {
        var res = req.CreateResponse(HttpStatusCode.BadRequest);
        AddCors(res);
        await res.WriteStringAsync(msg);
        return res;
    }

    private static void AddCors(HttpResponseData res) =>
        res.Headers.Add("Access-Control-Allow-Origin", "*");

    private static CommentResponse ToResponse(CommentEntity e) => new()
    {
        Id         = e.RowKey,
        Stage      = e.PartitionKey,
        Author     = e.Author,
        Text       = e.Text,
        CreatedAt  = e.CreatedAt,
        Quote      = string.IsNullOrEmpty(e.Quote)      ? null : e.Quote,
        Prefix     = string.IsNullOrEmpty(e.Prefix)     ? null : e.Prefix,
        Suffix     = string.IsNullOrEmpty(e.Suffix)     ? null : e.Suffix,
        Resolved   = e.Resolved,
        ResolvedBy = string.IsNullOrEmpty(e.ResolvedBy) ? null : e.ResolvedBy,
    };
}
