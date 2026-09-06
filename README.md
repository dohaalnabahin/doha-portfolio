# Doha Al-Nabahin — Portfolio Site

Plain HTML/CSS/JS, no build step. Files:
- `index.html` — page content
- `style.css` — all styling + color palette (see `:root` at the top)
- `script.js` — 3D hero background (Three.js) + project tilt effect + nav behavior
- `assets/` — your CV and photo

## 1. Open it in VS Code
1. Unzip the folder and open it in VS Code (`File > Open Folder`).
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions tab.
3. Right-click `index.html` → **Open with Live Server** to preview it locally in your browser.

## 2. Things you may want to edit first
- **GitHub links**: in `index.html`, the "Malware Detection", "Customer Churn", and
  "Chicago Crime" projects currently link to your GitHub profile (not a specific repo),
  since I didn't have the exact repo URLs. Search for `github.com/dohaalnabahin` in
  `index.html` and swap in the specific repo link once you confirm it.
- **Colors**: all colors are CSS variables at the top of `style.css` (`--violet`, `--teal`,
  `--coral`, `--gold`). Change the hex values there to try a different palette — everything
  on the page (pills, project borders, buttons) updates automatically.

## 3. Deploy on Render
Render's free **Static Site** service is the right fit for this project (no server needed):

1. Push this folder to a GitHub repository (create a new repo, e.g. `doha-portfolio`).
2. Go to [render.com](https://render.com) → **New +** → **Static Site**.
3. Connect your GitHub account and select the repository.
4. Settings:
   - **Build Command**: leave empty
   - **Publish Directory**: `.` (the root folder)
5. Click **Create Static Site**. Render will give you a live URL
   (e.g. `doha-portfolio.onrender.com`) within a minute or two.
6. Any time you push a change to GitHub, Render redeploys automatically.
