using Azure.Data.Tables;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Net;
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

    // ── Helpers ──────────────────────────────────────────────────────────
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

    private static void AddCors(HttpResponseData res) =>
        res.Headers.Add("Access-Control-Allow-Origin", "*");

    private static CommentResponse ToResponse(CommentEntity e) => new()
    {
        Id        = e.RowKey,
        Stage     = e.PartitionKey,
        Author    = e.Author,
        Text      = e.Text,
        CreatedAt = e.CreatedAt,
        Quote     = string.IsNullOrEmpty(e.Quote)  ? null : e.Quote,
        Prefix    = string.IsNullOrEmpty(e.Prefix) ? null : e.Prefix,
        Suffix    = string.IsNullOrEmpty(e.Suffix) ? null : e.Suffix
    };
}
