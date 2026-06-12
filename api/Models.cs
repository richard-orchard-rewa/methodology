using Azure;
using Azure.Data.Tables;

namespace RawaComments;

// ── Table Storage entity ─────────────────────────────────────────────────
public class CommentEntity : ITableEntity
{
    public string PartitionKey { get; set; } = "";  // stage id, e.g. "s1"
    public string RowKey { get; set; } = "";        // sortable timestamp + guid
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }

    public string Author { get; set; } = "";
    public string Text { get; set; } = "";
    public DateTimeOffset CreatedAt { get; set; }
    public string Quote { get; set; } = "";
    public string Prefix { get; set; } = "";
    public string Suffix { get; set; } = "";
}

// ── API request/response DTOs ────────────────────────────────────────────
public class PostCommentRequest
{
    public string Stage { get; set; } = "overview";
    public string Author { get; set; } = "";
    public string Text { get; set; } = "";
    public string? Quote { get; set; }
    public string? Prefix { get; set; }
    public string? Suffix { get; set; }
}

public class EditCommentRequest
{
    public string Stage { get; set; } = "";
    public string Author { get; set; } = "";
    public string Text { get; set; } = "";
}

public class CommentResponse
{
    public string Id { get; set; } = "";
    public string Stage { get; set; } = "";
    public string Author { get; set; } = "";
    public string Text { get; set; } = "";
    public DateTimeOffset CreatedAt { get; set; }
    public string? Quote { get; set; }
    public string? Prefix { get; set; }
    public string? Suffix { get; set; }
}
