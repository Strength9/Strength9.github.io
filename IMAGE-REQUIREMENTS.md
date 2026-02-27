# Image Requirements — Strength 9 Design Website

All images should be supplied at **2x resolution** for Retina/HiDPI displays.
Format: **WebP** preferred (with PNG/JPG fallback where needed).
Maximum file size targets are per image after compression.

---

## 1. Hero Background Image (Homepage)

| Property | Value |
|----------|-------|
| **File** | `assets/images/hero-bg.webp` |
| **Display size** | 1440 x 800 px |
| **Supply at** | **2880 x 1600 px** |
| **Format** | WebP (+ JPG fallback) |
| **Max file size** | 200 KB |
| **Style** | Dark, moody, abstract or workspace shot. Needs to sit behind white text, so should be predominantly dark (blacks, deep blues, charcoals). A subtle texture, abstract geometric pattern, or darkened photo of a workspace/screen would work well. Will have a dark overlay applied in CSS. |
| **Used on** | `index.html` — hero section background |

---

## 2. About / Team Image

| Property | Value |
|----------|-------|
| **File** | `assets/images/about-team.webp` |
| **Display size** | 600 x 450 px (4:3 ratio) |
| **Supply at** | **1200 x 900 px** |
| **Format** | WebP |
| **Max file size** | 150 KB |
| **Style** | Workspace, desk setup, or team-at-work shot. Clean, modern, professional. Should feel authentic — not a generic stock photo. |
| **Used on** | `index.html` — about teaser section (right column), `about/index.html` — story section |

---

## 3. Portfolio Screenshots

These appear on both the **homepage** (3 featured) and the **portfolio page** (all 6). Each needs a browser/device mockup screenshot of the live project.

| # | Project | File | Display Size | Supply At | Category |
|---|---------|------|-------------|-----------|----------|
| 1 | **SubSpace** | `assets/images/portfolio-subspace.webp` | 640 x 400 px (16:10) | **1280 x 800 px** | SaaS |
| 2 | **Gearbox CRM** | `assets/images/portfolio-gearbox.webp` | 640 x 400 px | **1280 x 800 px** | SaaS |
| 3 | **LotIQ** | `assets/images/portfolio-lotiq.webp` | 640 x 400 px | **1280 x 800 px** | SaaS |
| 4 | **KF Drilling** | `assets/images/portfolio-kfdrilling.webp` | 640 x 400 px | **1280 x 800 px** | Web |
| 5 | **Country Automotive** | `assets/images/portfolio-country-auto.webp` | 640 x 400 px | **1280 x 800 px** | WordPress |
| 6 | **Teach Cricket** | `assets/images/portfolio-teachcricket.webp` | 640 x 400 px | **1280 x 800 px** | Web |

**Style notes:**
- Browser mockup or clean screenshot of the homepage/dashboard
- Consistent framing across all 6 (all in same device frame or all flat screenshots)
- Light drop shadow or no background — the CSS handles the container styling
- Max **120 KB each** after compression

**Homepage featured items** (3 of the 6 — currently LotIQ, Chambers Wales, Apex Scaffolding):
- If you'd prefer different projects on the homepage, let me know and I'll swap them

---

## 4. Open Graph / Social Sharing Images

These appear when the site is shared on LinkedIn, Twitter/X, Facebook, etc.

| # | Page | File | Size | Max Size |
|---|------|------|------|----------|
| 1 | **Homepage / Default** | `assets/images/og-image.jpg` | **1200 x 630 px** | 100 KB |
| 2 | **Services** | `assets/images/og-services.jpg` | **1200 x 630 px** | 100 KB |

**Style notes:**
- Should include the Strength 9 logo prominently
- Bold text overlay with the page purpose (e.g. "Bold Digital Agency" for homepage)
- Dark background matching brand colours (deep blue/charcoal)
- **JPG format** (widest OG compatibility)
- The other pages (products, portfolio, about, contact) fall back to the homepage OG image or the logo — these 2 are the priority

---

## 5. Favicons & App Icons

| # | File | Size | Format | Notes |
|---|------|------|--------|-------|
| 1 | `assets/icons/favicon.ico` | **32 x 32 px** | ICO | Multi-size ICO (16x16 + 32x32) |
| 2 | `assets/icons/favicon.svg` | **Scalable** | SVG | Vector version of the "9" icon mark |
| 3 | `assets/icons/apple-touch-icon.png` | **180 x 180 px** | PNG | iOS home screen icon |

**Style notes:**
- Use the "9" icon mark from `assets/logos/Strength9-Small.png`
- The SVG favicon should be the blue gradient "9" on transparent background
- The apple-touch-icon needs a solid white or dark background (no transparency)

---

## Summary Checklist

| Asset | Count | Status |
|-------|-------|--------|
| Hero background | 1 | Needed |
| About/team photo | 1 | Needed |
| Portfolio screenshots | 6 | Needed |
| OG social images | 2 | Needed |
| Favicons | 3 | Needed |
| **Total** | **13 images** | |

---

## Quick Reference: Directory Structure

```
assets/
├── icons/
│   ├── favicon.ico          32x32 ICO
│   ├── favicon.svg          Vector SVG
│   └── apple-touch-icon.png 180x180 PNG
├── images/
│   ├── hero-bg.webp         2880x1600 WebP
│   ├── about-team.webp      1200x900 WebP
│   ├── og-image.jpg         1200x630 JPG
│   ├── og-services.jpg      1200x630 JPG
│   ├── portfolio-subspace.webp      1280x800 WebP
│   ├── portfolio-gearbox.webp       1280x800 WebP
│   ├── portfolio-lotiq.webp         1280x800 WebP
│   ├── portfolio-kfdrilling.webp    1280x800 WebP
│   ├── portfolio-country-auto.webp  1280x800 WebP
│   └── portfolio-teachcricket.webp  1280x800 WebP
└── logos/
    ├── Strength9.png        (exists)
    └── Strength9-Small.png  (exists)
```

Once you supply these images, I'll integrate them into the HTML, add proper `<img>` tags with `width`, `height`, `loading="lazy"`, and `alt` text, and update the hero section to use the background image with a dark overlay.
