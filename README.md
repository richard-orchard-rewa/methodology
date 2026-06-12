# RAWA Methodology Reference

Internal reference site for the RAWA Services Delivery Tech Upgrade methodology. Hosted on Azure Static Web Apps with a .NET 8 Azure Functions API backed by Azure Table Storage.

## What it is

A seven-stage methodology guide (Stage 0 through Stage 6) covering Problem Awareness → Research → Define → Ideate & Design → Measure & De-Risk → Develop & Deploy → Embed & CI, with six decision gates between stages.

The site has two card modes — **Reference cards** (what/who/gate) and **Playbook cards** (how to run each stage) — switchable from the header.

## Comments

Authenticated users can leave comments scoped to each stage. Selecting any text on the page shows a "Comment on selection" tooltip — the quoted text is stored and highlighted inline so the comment is anchored to the exact passage it refers to.

Auth is Microsoft AAD via Azure Static Web Apps built-in auth, restricted to `@relationshipswa.org.au` accounts.

## Tech stack

| Layer | Technology |
|---|---|
| Hosting | Azure Static Web Apps |
| API | .NET 8 Azure Functions (isolated worker) |
| Storage | Azure Table Storage |
| Auth | Azure Static Web Apps built-in AAD auth |
| Frontend | Single-file HTML/CSS/JS (`src/index.html`) |

## Azure resources

- Resource group: `rawa-methodology-rg`
- Static Web App: `rawa-methodology`
- Storage account: `rawamethodologyst`

Deployment is triggered automatically on every push to `main` via GitHub Actions (workflow managed by Azure).

## Local development

```bash
cd api
cp local.settings.json.example local.settings.json
# Fill in AzureWebJobsStorage with the Azure storage connection string

dotnet build
func start
# API available at http://localhost:7071/api/comments
```

The frontend can be served from `src/` with any static file server. Auth endpoints (`/.auth/*`) won't work locally — the frontend falls back to allowing comments as `local-dev`.

See [`api/DEPLOY.md`](api/DEPLOY.md) for the portal-based setup steps used to provision resources.
