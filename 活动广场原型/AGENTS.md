# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Confirmed product decisions

- The seven filter dimensions are equal peers. Do not group, tint, accent, or otherwise imply priority among any subset of them.
- The mobile activity plaza is 375–414px-first. It keeps activity category as the horizontally scrollable on-page filter, while the other six business dimensions are staged inside a bottom drawer with a small “重置” and a primary “确定” action.
- The primary filter-dimension stack retains 6px top padding and uses no bottom padding, so it connects cleanly to the following filtering layer.
- Conditional date and score controls use the same option-column baseline as each dimension's “全部” button. A custom score range appears directly below “考核积分”, before region filters.
- Conditional controls begin at the option-column edge, not the dimension-label edge. Date fields follow a 50px row rhythm with 12px group gaps and muted empty-date text. Custom score uses inline placeholders in the order 最低 input 分 — 最高 input 分.
- Custom date and score fields use 14px regular text. The date icon sits 4px from its label; each side of “到” has a 12px gap. Empty date text and native calendar icons share the muted #9AA8B9 treatment, while score units use #35445A.
- This prototype is a 1920px-first desktop activity plaza. The shared visual system is white surfaces, restrained institutional blue, thin dividers, 72px page gutters, and 24px layout spacing.
- Use Unsplash photos as semantic placeholder covers, downloaded into the project with a maximum image width of 900px. Do not use generated cover art in the prototype.
- Both方案 A and方案 B must follow the shared design and component baseline in `../设计与组件规范.md`; plan-specific information architecture remains documented separately.
- 方案 B keeps the same visual and component system as方案 A, while implementing the layered filter and progressive card-disclosure rules in `../方案B-设计说明.md`.
- 方案 B card rules: List keeps方案 A’s default fields, then expands one custom field per line with a cover that fills the increased height; Grid reveals all custom fields in a raised overlay that covers adjacent rows; Masonry keeps方案 A’s full-information default card.
- 方案 B uses a 68px sticky top navigation aligned to the same page gutter as the activity content. Its initial surface is 36% white with an 8% black bottom divider, becoming solid white after scrolling; the centered search is neutral gray.
- 方案 B uses the supplied fixed blue gradient image over a #FFFFFF page background. The image is width-fitted and fixed to the top of the viewport; navigation logo height is 26px, and search focus plus “我的活动” use the shared blue accent.
- “我的活动” is a direct prototype destination from the activity plaza header. Its PC canvas uses a fixed 1200px centered content area, white surfaces, restrained institutional blue, thin dividers, and existing local Unsplash covers.
- The “我报名的” default tab demonstrates 12 records. Activity cards are a UI/UX-only surface: clicking the card itself must not open a detail page or detail dialog.
- In “我收藏的” and “我管理的”, cancel/delete controls appear only when a row is hovered or keyboard-focused. In “我报名的”, registration-reviewing records have no controls; other records expose exactly one primary action plus a more-actions menu. Ended records use “提交作品”; not-started and ongoing records use “去签到”.
- ../DESIGN.md is the extracted source of truth for plaza-derived routes. “我的活动” must reuse the plaza background image, white surface hierarchy, activity status tags, search anatomy, and hover/focus behavior.
- The “我的活动” page has a full-width deep-blue reference header with a centered title. Its activity categories use a segmented control—not an underlined tab strip—and the search field shares that toolbar row, right-aligned.
- The “我的活动” reference header is 40px high with 16px title text; its toolbar search is 240px wide. Segmented-control hover uses a neutral surface and preserves the text color.
- Personal activity rows are visually borderless at rest. Their cover aligns with the segmented control while the row shell extends 16px to either side; list gaps are 12px. Hover/focus uses the plaza list-card shadow 0 10px 24px rgba(45,67,100,.12) with a near-transparent border.
- Hover-revealed cancel-favorite and delete actions use restrained icon-plus-label treatments at rest, then gain clearly tinted blue/red surfaces and borders on direct button hover.
- “我的活动” uses white activity rows with a 24px right action inset. The route background—not the content surface—provides the soft blue-gray contrast.
- Primary check-in hovers brighten to #4389FF; only the active press state darkens. Cancel-favorite is blue at rest and delete is vivid red at rest; their hover treatments use tinted fills and borders without shadows. Demo data contains 10 favorited activities and 8 managed activities.
- “我的活动” applies the soft blue-gray to the complete route backdrop (at 92% opacity so the plaza background image remains understated). Its 1200px white content surface has 40px horizontal padding and a default plaza-card shadow. List rows extend 16px beyond the content padding, retain 16px left padding, and therefore keep covers aligned with the segmented control.
- The 1200px content surface uses the shared 12px card radius; do not clip it, so row menus can continue to layer above the surface.
- Hover borders on cancel-favorite and delete actions stay deliberately low-opacity so the tinted fill, not the outline, carries the interaction.
- “我的活动”移动端以 375px 一倍图为设计基准。旧版 Figma 节点 `488:20592` 仅作为顶部、搜索、分段控件和列表容器的框架样式来源；顶部保留旧稿文案与结构，业务内容仍严格复用现有 PC 端字段和三分类（我报名的、我收藏的、我管理的）。
- 移动端“我的活动”运行时仅活动列表内容区内部滚动；设计评审稿可纵向展开完整展示每个分类的 6 张静态示例卡片。活动卡片仅包含封面状态、标题、时间、地点，状态仅叠加于封面左上角一次，卡片本身不打开详情。
- 移动端“我报名的”操作规则：审核中不显示操作区；操作总数不超过 3 个时全部直接展示；超过 3 个时仍直接展示 3 个操作，剩余操作收纳到固定在操作区最左侧的“更多”下拉菜单。未开始/进行中主操作优先“去签到”，已结束优先“提交作品”。“我收藏的”仅显示取消收藏，“我管理的”仅显示删除。
- 移动端“我的活动”右下角固定展示仅含二维码扫描图标和“去签到”文字的悬浮胶囊按钮；不显示数量、角标或说明，也不实现后续跳转页面。

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
