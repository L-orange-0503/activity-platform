---
name: 活动广场方案 B
description: 面向桌面端活动检索与个人活动管理的克制机构蓝界面系统。
colors:
  primary: "#1769FF"
  primary-hover: "#0A55DA"
  primary-soft: "#EDF4FF"
  page-bg: "#FFFFFF"
  surface: "#FFFFFF"
  surface-subtle: "#F8FAFC"
  surface-muted: "#F1F4F8"
  text: "#172B4D"
  text-secondary: "#617187"
  text-muted: "#7C8DA5"
  border: "#E2E8F0"
  border-strong: "#D9DEE6"
  nav-deep: "#3D5368"
  status-ongoing: "#2EA96B"
  status-upcoming: "#397FE8"
  status-ended: "#708098"
  status-warm: "#EE8D22"
typography:
  display:
    fontFamily: "Inter, PingFang SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: "32px"
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, PingFang SC, Microsoft YaHei, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  page-gutter: "72px"
components:
  search-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    height: "40px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  action-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    height: "40px"
---

## Overview

**Creative North Star: "Institutional Clarity".** This is a desktop activity system for quickly judging, filtering, and acting. It uses a pale photographic page field beneath compact white working surfaces; the interface itself stays quiet so activity imagery and decision data remain legible.

**The Shared-Surface Rule.** Activity plaza and personal activity views are one product surface. They share the same background image treatment, white cards, thin blue-gray borders, typography, status tags, search field anatomy, and focus language. A new page may change information architecture, never invent a separate visual theme.

**Key Characteristics:**

- White information surfaces over a restrained, fixed background image.
- Institutional blue used for selection, primary actions, and focus—not for large decorative blocks.
- Dense-but-breathable desktop spacing based on 8px increments.
- Hover and keyboard focus reveal the same additional affordances.

## Colors

**The Accent-is-a-Decision Rule.** Use the primary blue for current selection, explicit user actions, input focus, and interactive text. Do not use it as an undifferentiated page background.

- The page background is white with the existing fixed, width-fitted plaza image visible through transparent route shells.
- White is the default information surface; subtle and muted surfaces only organize grouped controls, skeletons, and inactive states.
- Primary text carries titles and values. Secondary text carries time, location, and helper text. Muted text is reserved for placeholders and quiet icons.
- Status is always text plus a solid color-filled tag: ongoing green, not-started blue, ended slate, and reviewing orange.
- Destructive actions use red only at the final action, never as a persistent card accent.

## Typography

**The Scan-First Rule.** Titles establish hierarchy with weight; time, location, and supporting metadata remain smaller and blue-gray. Avoid display typography, gradients, or decorative letter spacing.

- Use the project system stack from the tokens for all UI.
- Page titles use the display token. Header-bar titles use white text at the same visual weight.
- Activity titles use 16px / 23–24px at 600–700 weight; clamp before metadata loses space.
- Body controls use 14px / 20–22px. Tags use 11–12px with a 15–16px line-height.
- Use tabular numerals for dates, counts, and time ranges.

## Layout

**The Stable-Gutter Rule.** The plaza uses 72px desktop page gutters. A focused personal-management route may use a fixed 1200px centered content column, but its background and top-level header remain full-width.

- The plaza navigation is 68px high and sticky. Its translucent initial state becomes solid white after scroll.
- The personal-activity reference header is a full-width 72px deep-blue bar; its title is centered independently of surrounding content.
- Grouped controls, such as a segmented control and search, occupy one 40px toolbar row aligned to the same content edges. Search sits at the far right.
- Use 8px component gaps, 16px list gaps, and 24px section spacing. Card internals begin at 16px.
- Cards preserve their geometry during hover; color, border, shadow, opacity, or overlay may change, but their neighbors must not reflow.

## Elevation & Depth

**The Quiet-Lift Rule.** Borders define default surfaces. A soft, downward shadow is added only for interactive hover/focus, floating menus, dialogs, and the sticky header after scroll.

- Default cards use a 1px low-contrast border and no pronounced shadow.
- Hover/focus may use a subtle 8–10px downward shadow with a blue-tinted neutral border.
- Menus and dialogs use a larger downward soft shadow to communicate a new layer.
- Do not combine a heavy shadow with a high-contrast border on the same resting surface.

## Shapes

**The Moderate-Corner Rule.** Inputs, buttons, and compact segmented controls are gently rounded at 8px; cards use 12px; tags use 5–6px. Pills are reserved for small status or compact metadata only.

- The search field is a 40px outlined control, with a right-side icon action and optional clear action.
- The segmented control is one muted container with an inset active white segment. It is not an underlined tab navigation.
- Image covers keep a 16:9 crop and a small internal radius.
- Status tags use the same compact rectangular shape across every route.

## Components

**Search field.** 40px tall, neutral outlined surface. Search icon is the submit action at the trailing edge; hover subtly shifts the neutral background, and focus changes only the border to primary blue.

**Segmented control.** A 40px muted group containing peer buttons. The selected option is white, medium-weight, and subtly elevated. Hover applies a faint blue-tinted surface; focus uses the shared 2px blue ring. Use tablist, tab, and tabpanel semantics when it changes a content panel.

**Activity card/list row.** White surface, 1px border, 12px radius, 16px padding, semantic local cover, status tag, title, time, and location. On hover or keyboard focus, strengthen border/shadow only; do not scale or move the row. Optional row actions become visible on hover and focus together.

**Status tag.** White semibold text on a semantic solid fill, 6px radius, 12px text. Do not replace it with a pale, unbordered chip on personal pages.

**More-actions menu.** Trigger is a 40px icon button. The menu is a white, 8px-radius layer with a soft downward shadow, left-aligned action labels, hover/focus blue-tinted rows, and explicit menu semantics.

**Primary and quiet actions.** Primary action is filled primary blue with white text. Quiet actions remain text or outlined; use the same 8px radius and 40px height. All actions include visible hover, pressed, and 2px focus states.

## Do's and Don'ts

**Do**

- Reuse the plaza background image and component colors on all related routes.
- Keep reference headers literal: deep-blue full-width bar, centered white title, no invented ornament.
- Make hover-only controls appear for keyboard focus as well.
- Preserve the reading order: status → cover → title → time → location → actions.
- Use 120–220ms transitions for color, border, shadow, and opacity only.

**Don't**

- Add a second visual language with a flat gray page background or unrelated pale status chips.
- Use an underlined tab strip where a segmented control is requested.
- Reveal information by shifting cards, expanding their layout, scaling covers, or moving rows.
- Put a persistent destructive action on every card.
- Use color alone to explain a state or selection.
