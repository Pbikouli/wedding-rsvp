# Periklis & Génesis — Wedding Invitation

A single-page, trilingual (Greek / Spanish / French) wedding invitation with
embedded Google Maps for the church and the venue, and an RSVP form that saves
responses to a Google Sheet. One universal link works for every guest.

```
index.html     – page structure
styles.css     – styling
app.js         – translations, language toggle, maps, RSVP form
Code.gs        – Google Apps Script backend (paste into Google Sheets)
```

---

## Part 1 — Google Sheets RSVP backend

1. Go to <https://sheets.google.com> and create a new blank spreadsheet
   (name it e.g. *Wedding RSVPs*).
2. Menu: **Extensions → Apps Script**.
3. Delete any sample code, then paste the entire contents of **`Code.gs`**.
   Click the 💾 save icon.
4. Click **Deploy → New deployment**.
   - Click the gear ⚙ next to "Select type" → choose **Web app**.
   - **Description:** anything (e.g. "RSVP v1").
   - **Execute as:** **Me**.
   - **Who has access:** **Anyone**.
   - Click **Deploy**.
5. Google asks you to **authorize** — allow it (choose your account →
   "Advanced" → "Go to … (unsafe)" → Allow). This warning is normal for your
   own script.
6. Copy the **Web app URL** (looks like
   `https://script.google.com/macros/s/AKfy…/exec`).
7. Open **`app.js`** and replace the placeholder on the first config line:
   ```js
   const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfy…/exec";
   ```

**Test it:** paste the Web app URL into a browser. You should see
`{"result":"ok","message":"RSVP endpoint is live."}`.

> If you ever change `Code.gs`, redeploy via **Deploy → Manage deployments →
> edit (✏) → Version: New version → Deploy**. The URL stays the same.

---

## Part 2 — Publish with GitHub Pages (free, universal link)

1. Create a free account at <https://github.com> if you don't have one.
2. Create a **new repository** — e.g. `wedding` — set it to **Public**.
3. Upload the four files (`index.html`, `styles.css`, `app.js`, and optionally
   `Code.gs`/`README.md`). Easiest in the browser:
   **Add file → Upload files → drag them in → Commit changes**.
   *(Make sure your real `RSVP_ENDPOINT` is already in `app.js`.)*
4. In the repo go to **Settings → Pages**.
   - **Source:** *Deploy from a branch*.
   - **Branch:** `main` / `(root)` → **Save**.
5. Wait ~1 minute. Your universal link appears at the top of that page:
   ```
   https://<your-username>.github.io/wedding/
   ```
   Send **this same link** to all your guests.

---

## Part 3 — Editing the content later

All wedding text lives in the `I18N` object in **`app.js`** (three blocks:
`el`, `es`, `fr`). Change times, addresses, messages there — keep the same
keys. Map addresses and the "Open in Google Maps" short links are the
constants near the top of `app.js`:

```js
const CHURCH_ADDRESS   = "...";
const VENUE_ADDRESS    = "...";
const CHURCH_MAPS_LINK = "https://maps.app.goo.gl/...";
const VENUE_MAPS_LINK  = "https://maps.app.goo.gl/...";
```

After editing, re-upload the changed file to GitHub (or commit) and Pages
updates automatically within a minute.

---

## Reading responses

Open your Google Sheet → the **RSVPs** tab. Each submission is one row with:
timestamp, name/family, **email**, attending (yes/no), number of guests,
shuttle (yes/no), shuttle seats, message, and the language the guest used.

---

## Confirmation emails

If a guest fills in the optional **Email** field, `Code.gs` automatically sends
them a confirmation email (in their chosen language) with a summary of their
reply plus all the wedding details and map links.

- The email is sent **from your Gmail**. The first time it runs, Google asks for
  extra authorization (permission to send mail) — allow it.
- **Daily limit:** a free Gmail account can send ~100 emails/day via Apps
  Script. That's plenty for staggered RSVPs; only relevant if 100+ guests reply
  on the same day.
- ⚠️ **After editing `Code.gs` you must redeploy a new version:**
  **Deploy → Manage deployments → ✏ edit → Version: New version → Deploy.**
  The URL stays the same.

---

## Custom domain (optional, makes the link "cuter")

The site is safe to expose publicly (no secrets, the Sheet stays private), so a
custom domain is purely cosmetic.

1. Buy a domain (~€8–15/yr) from Namecheap / Porkbun / GoDaddy, e.g.
   `periklis-and-genesis.com`.
2. In the repo, add a file named **`CNAME`** (no extension) containing just the
   domain, e.g. `periklis-and-genesis.com`.
3. At your registrar's DNS settings add, for an apex domain, four **A records**
   pointing to GitHub Pages:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (and a `CNAME` record for `www` → `<username>.github.io`).
4. GitHub repo **Settings → Pages → Custom domain** → enter the domain → Save →
   wait for the DNS check → tick **Enforce HTTPS**.

DNS can take 10–60 minutes to propagate.

---

## Preview locally (run it yourself)

Open **PowerShell** (Start menu → type "PowerShell"), then:

```powershell
cd C:\Users\Periklis.Bikoulis\wedding-invitation
python -m http.server 8123
```

Open your browser to **http://localhost:8123/**.

- **Stop the server:** click the PowerShell window and press **Ctrl + C**.
- **After editing** `app.js`, `styles.css`, or `index.html`: just **save the
  file and refresh** the browser (**F5**, or **Ctrl + F5** for a hard refresh
  if a change doesn't show up). No need to restart the server.
- If you *did* stop the server, re-run the two commands above to start it again.

> The RSVP form only saves once the real `RSVP_ENDPOINT` is set in `app.js` and
> the page is served over http/https (this local server), not opened as a bare
> `file://` path.
