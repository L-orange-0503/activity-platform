# My Activities Mobile Design QA

## Comparison target

- Source visual truth: Figma node `488:20592` from `https://www.figma.com/design/isvkUMxUZBinHaSnvN1VdC/Untitled?node-id=488-20592`; exported source capture at `/tmp/my-activities-legacy-mobile.png` (375 × 1129 px).
- Implementation route: `http://192.168.1.0:5173/#my-activities`.
- Intended viewport: 375 × 812 CSS px, device scale factor not overridden.
- State compared: default “我报名的” category. The implementation intentionally replaces the source's two categories with the confirmed PC-derived three categories and adds the confirmed activity-location field.

## Evidence captured

- Browser-rendered DOM confirmed the 375px mobile route has the Figma-derived header anatomy: return control, centered “应用标题”, plus control, search field, and compact category pills.
- Browser-rendered DOM confirmed six “我报名的” cards, including time and location fields; “报名审核中” has no action controls.
- Interaction checks passed: “我收藏的” renders 6 direct “取消收藏” controls; an over-three-action joined card renders 3 direct actions plus a left “更多” control, whose menu contains “活动评价”.
- Internal scrolling check passed: `.my-mobile-scroll` reported `scrollTop: 357`, `scrollHeight: 1027`, `clientHeight: 670`, while the fixed header remained at `top: 0` and the page scroll position remained `0`.
- Console check: no warning or error entries.

## Screenshot limitation

The selected in-app browser can render and interact with the local route, but its documented screenshot API returned “Unable to capture screenshot” on both a normal and an explicit 375 × 812 clip attempt. No alternative browser surface was used, so a side-by-side image comparison cannot be completed in this run.

## Findings

- [P1] Visual pixel comparison remains unverified.
  Location: full mobile page.
  Evidence: source export is available, but the selected in-app browser could not produce an implementation screenshot.
  Impact: typography, exact spacing, colors, imagery crop, and copy cannot be signed off from a normalized visual pair.
  Fix: capture the rendered 375px route from the selected browser when its screenshot capability is available, then compare it with the source export and record any necessary follow-up adjustments.

## Required fidelity surfaces

| Surface | Status |
|---|---|
| Fonts and typography | Blocked from pixel comparison; implementation uses the source-aligned PingFang SC fallback and documented sizes. |
| Spacing and layout rhythm | Functionally verified through DOM and scroll measurements; visual pixel sign-off blocked. |
| Colors and visual tokens | Implemented from Figma-derived white, `#F6F7FB`, `#2663FF`, and muted gray values; visual sign-off blocked. |
| Image quality and asset fidelity | Existing local Unsplash covers are intentionally reused from the current PC page per PRD; crop comparison blocked. |
| Copy and content | Verified in DOM: PC-derived three categories and fields are present; the old header's “应用标题” is preserved. |

## Implementation checklist

- [x] Implement the 375px mobile route and fixed Figma-derived header framework.
- [x] Add the three PC-derived categories with six static records each.
- [x] Add internal list scrolling, location fields, action overflow, review-state suppression, and floating scan/check-in control.
- [x] Verify production build, Sites packaging tests, DOM state, key interactions, internal scroll, and console output.
- [ ] Capture a browser-rendered 375px implementation screenshot and complete normalized pixel comparison.

## Final result

final result: blocked
