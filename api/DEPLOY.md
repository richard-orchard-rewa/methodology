# Deploy to Azure Static Web Apps

## Prerequisites

- An active Azure subscription
- This repo pushed to GitHub
- [.NET 8 SDK](https://dotnet.microsoft.com/download) — for local testing only
- [Azure Functions Core Tools v4](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local) — for local testing only (`npm install -g azure-functions-core-tools@4`)

---

## Step 1 — Create a Storage Account (for Table Storage)

1. Portal → **Storage accounts** → **Create**
2. Fill in:
   - Resource group: `rawa-methodology-rg` (create new if needed, region: Australia East)
   - Storage account name: `rawamethodologyst` (must be globally unique, lowercase, 3–24 chars)
   - Region: `Australia East`
   - Performance: `Standard`, Redundancy: `LRS`
3. **Review + create**

---

## Step 2 — Get the storage connection string

1. Open the storage account → **Access keys** (under Security + networking)
2. Copy **Connection string** for key1 — you'll need this in Step 4

---

## Step 3 — Create the Static Web App

1. Portal → **Static Web Apps** → **Create**
2. Fill in:
   - Resource group: `rawa-methodology-rg`
   - Name: `rawa-methodology`
   - Plan type: **Free**
   - Region: `East Asia` (closest available to Australia for the free tier)
   - Source: **GitHub** — authorise and select this repo, branch `main`
   - Build presets: **Custom**
   - App location: `src`
   - Api location: `api`
   - Output location: *(leave blank)*
3. **Review + create**

Azure will commit a GitHub Actions workflow file (`.github/workflows/azure-static-web-apps-*.yml`) to your repo automatically. Every push to `main` triggers a deployment.

---

## Step 4 — Add the storage connection string to the Static Web App

1. Open the Static Web App → **Configuration** (under Settings)
2. **Add** application setting:
   - Name: `AzureWebJobsStorage`
   - Value: *(paste the connection string from Step 2)*
3. **Save**

---

## Step 5 — Verify

Once the GitHub Actions workflow completes (check the **Actions** tab in GitHub), your app will be live at the URL shown in the Static Web App overview blade.

The comments API is served from the same domain at `/api/comments` — no CORS configuration needed.

---

## Local testing

```bash
cd api
cp local.settings.json.example local.settings.json
# Fill in AzureWebJobsStorage in local.settings.json

dotnet build
func start
# API at http://localhost:7071/api/comments
```

`local.settings.json` is gitignored — never commit it.

---

## Cost

At RAWA team scale this runs for free:
- **Static Web Apps** — free tier covers hosting + managed Functions
- **Table Storage** — first 5 GB free, ~$0.07/GB/month after

---

## Viewing comments

All comments are stored in Azure Table Storage under the `rawacomments` table. View them via:
- **Azure Portal** → Storage Account → **Storage browser** → Tables → `rawacomments`
- Or connect with **Azure Storage Explorer** (free desktop app)
