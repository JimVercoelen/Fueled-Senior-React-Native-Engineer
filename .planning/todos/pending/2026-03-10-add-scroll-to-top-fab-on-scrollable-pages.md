---
created: 2026-03-10T19:03:09.996Z
title: Add scroll-to-top FAB on scrollable pages
area: ui
files:
  - apps/mobile/app/(dashboard)/about.tsx
  - apps/mobile/app/(dashboard)/index.tsx
  - apps/mobile/app/(dashboard)/profile.tsx
  - apps/mobile/app/(dashboard)/_layout.tsx
---

## Problem

Long/scrollable pages have no quick way to navigate back to the top. User requested a floating action button (FAB) in the bottom-right corner of all scrollable screens that scrolls back to the top when pressed. This is a cross-cutting UI concern affecting dashboard, about, profile, and all future screens with scroll content.

## Solution

Create a reusable ScrollToTopFAB component (or integrate into a shared ScrollView wrapper) that:
- Appears in the bottom-right corner when the user has scrolled down
- Animates scroll back to top on press
- Uses ScrollView ref + scrollTo(0)
- Could be added to the dashboard _layout.tsx or as a wrapper component used per-screen
