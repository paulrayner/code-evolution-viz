# README Screenshot Instructions

The README.md file now includes references to 4 screenshots. Please save the provided screenshots to this directory with the following filenames:

## Required Screenshots

### 1. `timeline-v2-gource.png`
**Source:** First screenshot you provided
**Location in README:** Hero section (line 7-8)
**Shows:**
- Gource repository in Timeline V2 mode
- File Type color mode
- Green connection lines for added files
- Timeline controls at bottom showing "Commit 1 of 988"
- Repository Stats panel showing "80 files, 8,000 LOC"

**Caption:** *Timeline V2 playback showing Gource repository evolution (988 commits) with color-coded connection lines highlighting file changes*

---

### 2. `churn-mode-react.png`
**Source:** Second screenshot you provided
**Location in README:** Color Modes section (line 48-49)
**Shows:**
- React repository (6,784 files, 918,533 LOC)
- Churn (Lifetime Commits) color mode
- Red spheres indicating high-churn files
- File detail panel on right showing "ReactStartTransition.js" with "28 commits"
- Legend showing churn levels from "Low churn (1-2 commits)" to "Extremely high (50+ commits)"

**Caption:** *React repository (6,784 files) colored by commit frequency - red spheres indicate high-churn hotspots that may need refactoring*

---

### 3. `activity-mode-cbioportal.png`
**Source:** Third screenshot you provided
**Location in README:** Collapsible section under Color Modes (line 54-55)
**Shows:**
- cBioPortal repository (2,127 files, 282,517 LOC)
- Recent Activity (90 days) color mode
- Mix of colored and gray files
- Legend showing activity levels from "Low (1-50 lines)" to "Extremely high (1000+ lines)"
- File detail panel showing "SurvivalRequest.java" with "0 lines changed" in last 90 days

**Caption:** *cBioPortal repository with Recent Activity (90 days) coloring - shows which files have been actively developed*

---

### 4. `lastmod-mode-cbioportal.png`
**Source:** Fourth screenshot you provided
**Location in README:** Collapsible section under Color Modes (line 57-58)
**Shows:**
- Same cBioPortal repository (2,452 files, 657,554 LOC) - cbioportal-frontend
- Last Modified (Relative) color mode
- Color gradient from green (newest) through yellow/orange to red (oldest) and gray (legacy)
- Legend showing percentile-based time ranges
- Large "lib" directory with many files visible
- File detail panel visible on right

**Caption:** *Same cBioPortal repository with Last Modified (Relative) coloring - reveals code age distribution from newest (green) to legacy (red)*

---

## How to Save

1. Take the 4 screenshots you provided in the conversation
2. Save them to `/Users/paul/Documents/code-evolution-viz/docs/images/` with the exact filenames above
3. The images are already referenced in README.md and will display automatically

## Verification

After saving, you can verify by:
1. Opening README.md in GitHub or a Markdown preview
2. Check that all 4 images display correctly
3. Ensure captions match the content shown

## Image Specifications

- **Format:** PNG (recommended for screenshots)
- **Size:** No specific requirements, but reasonable resolution (1920x1080 or similar)
- **Aspect Ratio:** Wide/landscape preferred for better display in README
