import { useState } from "react";
import { LuArrowLeft, LuCalendarDays, LuEye, LuFilter, LuMapPin, LuSearch, LuUser, LuUsers, LuX } from "react-icons/lu";

function MobileFilterGroup({ row, value, onChange, children }) {
  return <section className="mobile-filter-group" aria-labelledby={`mobile-filter-${row.key}`}><h3 id={`mobile-filter-${row.key}`}>{row.label}</h3><div className="mobile-filter-options" role="group" aria-label={row.label}>{row.options.map((option) => <button className={value === option ? "active" : ""} type="button" aria-pressed={value === option} key={option} onClick={() => onChange(row.key, option)}>{option}</button>)}</div>{children}</section>;
}

function MobileActivityCard({ activity, onOpen }) {
  return <article className="mobile-activity-card"><button type="button" onClick={() => onOpen(activity)} aria-label={`查看活动详情：${activity.title}`}><div className="mobile-card-cover"><img src={activity.cover} alt={activity.title} /><div className="mobile-card-flags"><span className={`mobile-status mobile-status-${activity.status}`}>{activity.status}</span><span className="mobile-top-tag">置顶</span></div><div className="mobile-cover-stats"><span><LuUsers aria-hidden="true" />{activity.signup}</span><span><LuEye aria-hidden="true" />{activity.views}</span></div></div><div className="mobile-card-body"><h2 title={activity.title}>{activity.title}</h2><p className="mobile-card-time"><LuCalendarDays aria-hidden="true" /><span>{activity.start} — {activity.end}</span></p><div className="mobile-card-tags" aria-label="活动标签">{activity.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}{activity.tags.length > 3 && <span>+{activity.tags.length - 3}</span>}</div>{activity.custom.map((item) => <p className="mobile-card-custom" key={item} title={item}>{item}</p>)}<p className="mobile-card-line" title={`主办方：${activity.organizer}`}>主办方：{activity.organizer}</p><p className="mobile-card-line" title={`活动地点：${activity.location}`}><LuMapPin aria-hidden="true" />活动地点：{activity.location}</p></div></button></article>;
}

export function MobilePlaza({ filters, setFilters, keyword, setKeyword, refresh, view, setView, viewOptions, results, eligibleOnly, setEligibleOnly, dateRange, setDateRange, customPoints, setCustomPoints, primaryFilters, extendedFilters, availableSubRegions, onOpenActivity, onOpenMyActivities }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState(filters);
  const [draftEligible, setDraftEligible] = useState(eligibleOnly);
  const [draftDates, setDraftDates] = useState(dateRange);
  const [draftPoints, setDraftPoints] = useState(customPoints);
  const categoryRow = primaryFilters.find((row) => row.key === "category");
  const drawerRows = [...primaryFilters.filter((row) => row.key !== "category"), ...extendedFilters];

  const openDrawer = () => {
    setDraftFilters(filters);
    setDraftEligible(eligibleOnly);
    setDraftDates(dateRange);
    setDraftPoints(customPoints);
    setDrawerOpen(true);
  };

  const setDraftFilter = (key, value) => {
    setDraftFilters((current) => {
      const next = { ...current, [key]: value };
      if (key === "region" && value !== "全部" && current.subRegion !== "全部" && !availableSubRegions[value]?.includes(current.subRegion)) next.subRegion = "全部";
      return next;
    });
  };

  const resetDrawer = () => {
    setDraftFilters((current) => ({ ...current, format: "全部", status: "全部", time: "全部", points: "全部", region: "全部", subRegion: "全部" }));
    setDraftEligible(false);
    setDraftDates({ from: "", to: "" });
    setDraftPoints({ min: "", max: "" });
  };

  const applyDrawer = () => {
    setFilters(draftFilters);
    setEligibleOnly(draftEligible);
    setDateRange(draftDates);
    setCustomPoints(draftPoints);
    refresh();
    setDrawerOpen(false);
  };

  const selectCategory = (value) => {
    setFilters((current) => ({ ...current, category: value }));
    refresh();
  };

  return <main className="mobile-plaza"><div className="mobile-status-bar" aria-hidden="true"><span>9:41</span><span>●●●　⌁　100%</span></div><header className="mobile-page-header"><button className="mobile-back" type="button" aria-label="返回" onClick={() => window.history.back()}><LuArrowLeft aria-hidden="true" /></button><h1>活动广场</h1><button className="mobile-my" type="button" onClick={onOpenMyActivities}><LuUser aria-hidden="true" />我的</button></header><section className="mobile-discovery" aria-label="活动浏览工具"><div className="mobile-search-row"><label className="mobile-search"><LuSearch aria-hidden="true" /><input value={keyword} onChange={(event) => setKeyword(event.target.value)} onKeyDown={(event) => event.key === "Enter" && refresh()} placeholder="搜索活动…" aria-label="搜索活动名称、主办方或地点" />{keyword && <button type="button" aria-label="清空搜索" onClick={() => setKeyword("")}><LuX aria-hidden="true" /></button>}</label><div className="mobile-view-switch" role="group" aria-label="切换活动展示视图">{viewOptions.map(({ key, label, icon: Icon }) => <button className={view === key ? "active" : ""} type="button" key={key} aria-label={label} aria-pressed={view === key} onClick={() => setView(key)}><Icon aria-hidden="true" /></button>)}</div></div><div className="mobile-category-wrap"><div className="mobile-category-scroll" role="group" aria-label="活动分类">{categoryRow.options.map((option) => <button type="button" className={filters.category === option ? "active" : ""} aria-pressed={filters.category === option} onClick={() => selectCategory(option)} key={option}>{option}</button>)}</div><button className="mobile-filter-trigger" type="button" onClick={openDrawer} aria-haspopup="dialog" aria-expanded={drawerOpen}><LuFilter aria-hidden="true" />筛选</button></div></section><section className={`mobile-card-list mobile-${view}`} aria-live="polite">{results.map((activity) => <MobileActivityCard activity={activity} onOpen={onOpenActivity} key={activity.id} />)}{results.length === 0 && <div className="mobile-empty"><LuSearch aria-hidden="true" /><h2>未找到符合条件的活动</h2><p>请调整分类、筛选条件或关键词。</p></div>}</section>{drawerOpen && <div className="mobile-drawer-layer" role="presentation" onMouseDown={() => setDrawerOpen(false)}><section className="mobile-filter-drawer" role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title" onMouseDown={(event) => event.stopPropagation()}><div className="mobile-drawer-handle" aria-hidden="true" /><header><h2 id="mobile-filter-title">筛选</h2><button type="button" aria-label="关闭筛选" onClick={() => setDrawerOpen(false)}><LuX aria-hidden="true" /></button></header><div className="mobile-drawer-content"><label className="mobile-eligible"><span>我能报名</span><input type="checkbox" checked={draftEligible} onChange={(event) => setDraftEligible(event.target.checked)} /><i aria-hidden="true" /></label>{drawerRows.map((row) => <MobileFilterGroup row={row} value={draftFilters[row.key]} onChange={setDraftFilter} key={row.key}>{row.key === "time" && draftFilters.time === "选择日期" && <div className="mobile-conditional mobile-date-range"><label>从<input type="date" value={draftDates.from} onChange={(event) => setDraftDates((current) => ({ ...current, from: event.target.value }))} /></label><label>到<input type="date" value={draftDates.to} onChange={(event) => setDraftDates((current) => ({ ...current, to: event.target.value }))} /></label></div>}{row.key === "points" && draftFilters.points === "自定义" && <div className="mobile-conditional mobile-point-range"><label>最低<input type="number" min="0" value={draftPoints.min} onChange={(event) => setDraftPoints((current) => ({ ...current, min: event.target.value }))} /></label><label>最高<input type="number" min="0" value={draftPoints.max} onChange={(event) => setDraftPoints((current) => ({ ...current, max: event.target.value }))} /></label><em>分</em></div>}</MobileFilterGroup>)}</div><footer><button className="mobile-reset" type="button" onClick={resetDrawer}>重置</button><button className="mobile-confirm" type="button" onClick={applyDrawer}>确定</button></footer></section></div>}</main>;
}
