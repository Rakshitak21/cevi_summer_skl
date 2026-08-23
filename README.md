# Vision Summer School — Progress Tracker

A lightweight, anti-paste student assignment check-in portal with automated Google Sheets / Excel logging.

---

## 🚀 Quick Setup Guide (Takes 3 Minutes)

### Step 1: Create your Google Sheet & Apps Script
1. Go to [Google Sheets](https://sheets.new) and create a new spreadsheet (e.g. `Vision Summer School Submissions 2026`).
2. In the top menu, click **Extensions** → **Apps Script**.
3. Delete any default code in the editor, and paste the entire contents of [`google-apps-script.js`](./google-apps-script.js).
4. Click the blue **Deploy** button (top right) → **New deployment**.
5. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
6. Configure the deployment settings:
   - **Description**: `Vision Tracker API`
   - **Execute as**: `Me (your_email@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial: must be "Anyone" so student browsers can submit)*
7. Click **Deploy**, click **Authorize access**, select your Google account, click **Advanced** → **Go to Untitled project (unsafe)**, and click **Allow**.
8. Copy the generated **Web App URL** (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).

---

### Step 2: Link the URL in `index.html`
1. Open [`index.html`](./index.html).
2. Find line 214:
   ```javascript
   const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
3. Replace `"YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"` with your copied Web App URL:
   ```javascript
   const SCRIPT_URL = "https://script.google.com/macros/s/.../exec";
   ```
4. Save the file.

---

### Step 3: Host for Free on GitHub Pages (Like CEVI Tracker)
1. Create a new public repository on GitHub (e.g. `vision-summer-school-tracker`).
2. Upload `index.html` to the repository.
3. In your GitHub repository:
   - Go to **Settings** → **Pages** (on the left sidebar).
   - Under **Build and deployment** → **Branch**, select `main` (or `master`) and `/ (root)`.
   - Click **Save**.
4. In 30–60 seconds, GitHub will provide your live public URL:
   `https://<your-username>.github.io/vision-summer-school-tracker/`

---

## 📊 How Responses Are Organized in Google Sheets / Excel
- The script automatically creates separate tabs for each chapter (`Ch 1 - Supervised Learning`, `Ch 2 - SVM`, etc.).
- Every submission records:
  1. `Timestamp`
  2. `USN`
  3. `Full Name`
  4. `Chapter`
  5. `Q1 (Single Line)`
  6. `Q2 (Single Line)`
  7. `Q3 (Brief Answer)`
- **To view in Excel:** In Google Sheets, simply click **File → Download → Microsoft Excel (.xlsx)** anytime.
