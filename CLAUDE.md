# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

RAWA Methodology Reference — a static HTML page served via **Azure Static Web Apps**, with a managed Azure Functions API backed by Azure Table Storage. Both the frontend and API are hosted under the same domain (no CORS needed).

## Components

**`src/index.html`** — Single-file static frontend. All HTML, CSS, and JavaScript inline.
- `COMMENTS_API` constant is set to `/api/comments` (same-origin, relative path).
- **Mode switcher** — header tabs toggle between Reference cards, Playbook cards, or Both.
- **Stage navigation** — sticky nav bar with a button per stage; Overview is the landing page.
- **Comments panel** — fixed FAB (bottom-right) opens a slide-in panel scoped to the current stage.
  - Auth: Microsoft AAD via Azure Static Web Apps built-in auth. Only `@relationshipswa.org.au` accounts can post; others see a "wrong domain" message.
  - **Text-selection anchoring**: selecting text anywhere on the page shows a "💬 Comment on selection" tooltip. The selected quote (plus 40-char prefix/suffix for context) is stored with the comment and rendered as a highlight (`<mark>`) on the page. Clicking a highlight opens/scrolls to the comment.
  - Users can edit and delete their own comments inline.

**`api/`** — .NET 8 Azure Functions (isolated worker model).
- `CommentsFunction.cs` — Five HTTP triggers:
  - `GET /api/comments?stage=<id>` — list all comments for a stage (sorted by `CreatedAt`)
  - `POST /api/comments` — create a comment (with optional text-anchor fields: `quote`, `prefix`, `suffix`)
  - `PUT /api/comments/{id}` — edit the text of an existing comment (author-gated)
  - `DELETE /api/comments/{id}?stage=<id>&author=<email>` — delete a comment (author-gated)
  - `OPTIONS /api/comments` — CORS preflight
- `Models.cs` — `CommentEntity` (Table Storage), `PostCommentRequest`, `EditCommentRequest`, `CommentResponse`.
- Comments are partitioned by stage ID (e.g. `"s1"`, `"overview"`). RowKey is a sortable timestamp+GUID.
- Storage connection is read from `AzureWebJobsStorage` environment variable.
- Identity is validated from the `x-ms-client-principal` header (Azure Static Web Apps auth) — the client-submitted author field is only used as a local-dev fallback.

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
