# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

RAWA Methodology Reference — a static HTML page served via **Azure Static Web Apps**, with a managed Azure Functions API backed by Azure Table Storage. Both the frontend and API are hosted under the same domain (no CORS needed).

## Components

**`src/index.html`** — HTML structure and CSS only. No inline JavaScript.
- **Mode switcher** — header tabs toggle between Reference cards, Playbook cards, or Both.
- **Stage navigation** — sticky nav bar with a button per stage; Overview is the landing page.
- Loads `src/index.js` as a plain (non-module) script at the end of `<body>`.

**`src/index.js`** — All JavaScript. Three sections, clearly marked with `═══` header comments:
- **DATA** — `STAGES` array: the full methodology content for all 7 stages (s0–s6). Edit here to update stage text, gate options, RACI roles, steps, pitfalls, etc.
- **RENDER** — Builds the DOM from `STAGES` data: summary cards, stage views (reference + playbook), mode switcher, `showStage()` navigation with URL deep-linking via `history.pushState`.
- **COMMENTS** — Everything comments-related: text-selection anchoring, highlight engine, auth (`initAuth` via `/.auth/me`), panel toggle, CRUD operations, resolve/reopen, nav count badges, `loadNavCounts()`.
  - `COMMENTS_API` constant near the top of this section points to `/api/comments` in production and `http://localhost:7071/api/comments` locally.
  - Auth: Microsoft AAD via Azure Static Web Apps built-in auth. Only `@relationshipswa.org.au` accounts can post; others see a "wrong domain" message.
  - **Text-selection anchoring**: selecting text shows a "💬 Comment on selection" tooltip. The selected quote (plus 40-char prefix/suffix for context) is stored with the comment and rendered as a `<mark>` highlight. Clicking a highlight opens/scrolls to the comment.
  - Users can edit and delete their own comments; any authenticated user can resolve/reopen.

> **Why not split `index.js` further?** All comment CRUD functions are referenced by inline `onclick` attributes in JS-generated HTML, so they must be globals. ES modules would break this without explicit `window.fn = fn` wiring for every handler. With no bundler, a single well-sectioned file is cleaner than multiple interdependent `<script>` tags.

**`api/`** — .NET 8 Azure Functions (isolated worker model).
- `CommentsFunction.cs` — Seven HTTP triggers:
  - `GET /api/comments?stage=<id>` — list all comments for a stage (sorted by `CreatedAt`)
  - `GET /api/comments/counts` — unresolved comment count per stage, returned as `{ "s0": 2, ... }`
  - `POST /api/comments` — create a comment (with optional text-anchor fields: `quote`, `prefix`, `suffix`)
  - `PUT /api/comments/{id}` — edit the text of an existing comment (author-gated)
  - `DELETE /api/comments/{id}?stage=<id>` — delete a comment (author-gated)
  - `POST /api/comments/{id}/resolve?stage=<id>` — toggle resolved/unresolved (any authenticated user)
  - `OPTIONS /api/comments` and `OPTIONS /api/comments/{rest}` — CORS preflight
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
