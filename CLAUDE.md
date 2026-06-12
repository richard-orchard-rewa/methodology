# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

RAWA Methodology Reference — a static HTML page served via **Azure Static Web Apps**, with a managed Azure Functions API backed by Azure Table Storage. Both the frontend and API are hosted under the same domain (no CORS needed).

## Components

**`src/rawa_methodology_reference_4.html`** — Single-file static frontend. All HTML, CSS, and JavaScript inline. The `COMMENTS_API` constant is set to `/api/comments` (same-origin, relative path).

**`api/`** — .NET 8 Azure Functions (isolated worker model).
- `CommentsFunction.cs` — Two HTTP triggers: `GET /api/comments?stage=<id>` and `POST /api/comments`.
- `Models.cs` — `CommentEntity` (Table Storage), `PostCommentRequest`, `CommentResponse`.
- Comments are partitioned by stage ID (e.g. `"s1"`, `"overview"`). RowKey is a sortable timestamp+GUID.
- Storage connection is read from `AzureWebJobsStorage` environment variable.

**`staticwebapp.config.json`** — Static Web Apps routing config (navigation fallback to the HTML file).

## Deployment

Azure Static Web Apps is connected to this GitHub repo. Every push to `main` triggers a GitHub Actions deployment (workflow file committed by Azure into `.github/workflows/`).

- App location: `src`
- Api location: `api`
- Azure resources: resource group `rawa-methodology-rg`, storage account `rawamethodologyst`, Static Web App `rawa-methodology`

See [`api/DEPLOY.md`](api/DEPLOY.md) for portal-based setup steps.

## Local development

```bash
cd api
cp local.settings.json.example local.settings.json
# Fill in AzureWebJobsStorage with the Azure storage connection string

dotnet build
func start
# API at http://localhost:7071/api/comments
```

`local.settings.json` is gitignored — never commit it.
