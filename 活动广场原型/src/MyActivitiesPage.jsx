import { useEffect, useMemo, useState } from "react";
import { LuCalendarDays, LuChevronDown, LuEllipsis, LuHeartOff, LuMapPin, LuPlus, LuScanLine, LuSearch, LuTrash2, LuX } from "react-icons/lu";

const withBasePath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const records = [
  { id: "my-01", title: "阅读经典 · 悦读人生——校园读书分享会", status: "ongoing", start: "2026-08-14 14:00", end: "2026-08-14 17:00", location: "武侯区图书馆三楼多功能厅", cover: "/assets/unsplash/reading.jpg", relations: ["joined", "favorited", "managed"] },
  { id: "my-02", title: "校园绿色行动日：一起为校园种下一棵树", status: "not_started", start: "2026-08-16 09:00", end: "2026-08-16 12:00", location: "金牛区青年公园东门", cover: "/assets/unsplash/mountains.jpg", relations: ["joined", "favorited"] },
  { id: "my-03", title: "青少年心理健康与情绪管理公益讲座", status: "reviewing", start: "2026-08-15 19:00", end: "2026-08-15 20:30", location: "成华区文化报告厅 · 同步直播", cover: "/assets/unsplash/volunteers.jpg", relations: ["joined", "favorited", "managed"] },
  { id: "my-04", title: "传统文化体验日：非遗手作与器物之美", status: "ongoing", start: "2026-08-18 09:30", end: "2026-08-18 16:30", location: "青羊区文化中心工坊", cover: "/assets/unsplash/culture.jpg", relations: ["joined", "favorited", "managed"] },
  { id: "my-05", title: "青春在场：城市公共文化志愿服务培训", status: "not_started", start: "2026-08-21 14:00", end: "2026-08-21 16:00", location: "线上活动 · 直播课堂", cover: "/assets/unsplash/students.jpg", relations: ["joined", "favorited", "managed"] },
  { id: "my-06", title: "山河同读：人文与自然主题阅读计划", status: "not_started", start: "2026-09-01 10:00", end: "2026-09-30 18:00", location: "武侯区多所图书馆及线上社群", cover: "/assets/unsplash/mountains.jpg", relations: ["joined", "managed"] },
  { id: "my-07", title: "美好社区共创工作坊", status: "ongoing", start: "2026-08-17 10:00", end: "2026-08-17 12:00", location: "金牛区邻里中心", cover: "/assets/unsplash/volunteers.jpg", relations: ["joined", "favorited"] },
  { id: "my-08", title: "秋日校园摄影采风与影像叙事基础课", status: "ended", start: "2026-08-06 09:00", end: "2026-08-06 16:00", location: "高新区大学城创意空间", cover: "/assets/unsplash/culture.jpg", relations: ["joined", "favorited", "managed"] },
  { id: "my-09", title: "城市公共安全微课堂：应急技能入门", status: "reviewing", start: "2026-08-14 19:30", end: "2026-08-14 20:30", location: "线上直播间", cover: "/assets/unsplash/students.jpg", relations: ["joined", "favorited"] },
  { id: "my-10", title: "青年夜校 · 手机影像创作与城市漫游", status: "ended", start: "2026-08-28 18:30", end: "2026-08-28 21:00", location: "高新区城市会客厅", cover: "/assets/unsplash/volunteers.jpg", relations: ["joined", "favorited", "managed"] },
  { id: "my-11", title: "周末亲子科学实验室：一起发现身边的物理", status: "reviewing", start: "2026-08-23 10:00", end: "2026-08-23 11:30", location: "青羊区科学体验馆", cover: "/assets/unsplash/culture.jpg", relations: ["joined", "favorited"] },
  { id: "my-12", title: "校园音乐午间场：轻松聆听室内乐", status: "ended", start: "2026-08-14 12:20", end: "2026-08-14 13:00", location: "武侯区大学生活动中心", cover: "/assets/unsplash/students.jpg", relations: ["joined", "managed"] },
].map((record) => ({ ...record, cover: withBasePath(record.cover) }));

const tabs = [
  { id: "joined", label: "我报名的", empty: "暂未报名活动" },
  { id: "favorited", label: "我收藏的", empty: "暂未收藏活动" },
  { id: "managed", label: "我管理的", empty: "暂无可管理活动" },
];
const statusNames = { not_started: "未开始", ongoing: "进行中", ended: "已结束", reviewing: "报名审核中" };
const mobileRecordIds = {
  joined: ["my-01", "my-02", "my-03", "my-04", "my-05", "my-08"],
  favorited: ["my-01", "my-02", "my-03", "my-04", "my-05", "my-07"],
  managed: ["my-01", "my-03", "my-04", "my-05", "my-06", "my-08"],
};
const recordsById = Object.fromEntries(records.map((item) => [item.id, item]));
const normalize = (value) => value.trim().split(" ").filter(Boolean).join(" ");

function Status({ value }) {
  return <span className={"my-status my-status--" + value}>{statusNames[value]}</span>;
}

function MoreMenu({ activity, onFeedback }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event) => {
      if (!event.target.closest('[data-menu-id="' + activity.id + '"]')) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [activity.id]);
  return <div className="my-more" data-menu-id={activity.id}>
    <button className="my-more-trigger" type="button" aria-label={"更多操作：" + activity.title} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((current) => !current)}><LuEllipsis aria-hidden="true" /></button>
    {open && <div className="my-more-menu" role="menu">{["报名信息", "去填表", "活动评价"].map((entry) => <button type="button" role="menuitem" key={entry} onClick={() => { setOpen(false); onFeedback("已记录「" + entry + "」操作"); }}>{entry}</button>)}</div>}
  </div>;
}

function JoinedActions({ activity, onFeedback }) {
  if (activity.status === "reviewing") return null;
  const primary = activity.status === "ended" ? "提交作品" : "去签到";
  return <div className="my-actions my-actions--joined"><button className="my-action-primary" type="button" onClick={() => onFeedback("已记录「" + primary + "」操作")}>{primary}</button><MoreMenu activity={activity} onFeedback={onFeedback} /></div>;
}

function ActivityRow({ activity, tab, onRemove, onFeedback }) {
  return <article className={"my-activity-row my-activity-row--" + tab}>
    <div className="my-cover"><img src={activity.cover} alt="" /><Status value={activity.status} /></div>
    <div className="my-activity-info"><h2 title={activity.title}>{activity.title}</h2><p><LuCalendarDays aria-hidden="true" />{activity.start} — {activity.end}</p>{activity.location && <p><LuMapPin aria-hidden="true" />{activity.location}</p>}</div>
    {tab === "joined" && <JoinedActions activity={activity} onFeedback={onFeedback} />}
    {tab === "favorited" && <div className="my-actions my-actions--hover"><button className="my-action-quiet" type="button" onClick={() => onRemove(activity.id, "已取消收藏")}><LuHeartOff aria-hidden="true" />取消收藏</button></div>}
    {tab === "managed" && <div className="my-actions my-actions--hover"><button className="my-action-danger" type="button" onClick={() => onRemove(activity.id, "confirm")}><LuTrash2 aria-hidden="true" />删除</button></div>}
  </article>;
}

function Skeletons() {
  return <section className="my-skeletons" aria-label="正在加载我的活动">{Array.from({ length: 4 }).map((_, index) => <div className="my-skeleton" key={index}><i /><b /><b /><small /></div>)}</section>;
}

function DesktopMyActivitiesPage() {
  const [activeTab, setActiveTab] = useState("joined");
  const [items, setItems] = useState(records);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 360); return () => window.clearTimeout(timer); }, []);
  const result = useMemo(() => items.filter((item) => item.relations.includes(activeTab) && (!query || item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))), [items, activeTab, query]);
  const refreshList = () => { setLoading(true); window.setTimeout(() => setLoading(false), 150); };
  const changeTab = (id) => { setActiveTab(id); refreshList(); };
  const submitSearch = () => { setQuery(normalize(keyword)); refreshList(); };
  const remove = (id, feedback) => {
    if (feedback === "confirm") { setPendingDelete(items.find((item) => item.id === id)); return; }
    setItems((current) => current.map((item) => item.id === id ? { ...item, relations: item.relations.filter((relation) => relation !== activeTab) } : item));
    setNotice(feedback);
  };
  const moveTab = (event, index) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    changeTab(tabs[next].id);
    document.getElementById("my-tab-" + tabs[next].id)?.focus();
  };
  const empty = query ? { title: "未找到相关活动", detail: "请调整关键词后重试" } : { title: tabs.find((tab) => tab.id === activeTab).empty, detail: "你可以切换其他标签查看活动。" };
  return <main className="my-page">
    <header className="my-reference-header"><h1 id="my-page-title">我的活动</h1></header>
    <section className="my-page-inner" aria-labelledby="my-page-title">
      <div className="my-toolbar"><div className="my-tabs my-segments" role="tablist" aria-label="我的活动分类">{tabs.map((tab, index) => <button id={"my-tab-" + tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls={"my-panel-" + tab.id} tabIndex={activeTab === tab.id ? 0 : -1} key={tab.id} onKeyDown={(event) => moveTab(event, index)} onClick={() => changeTab(tab.id)}>{tab.label}</button>)}</div><label className="my-search"><input value={keyword} maxLength="100" onChange={(event) => setKeyword(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submitSearch()} placeholder="搜索活动名称" aria-label="搜索活动名称" />{keyword && <button className="my-search-clear" type="button" aria-label="清空搜索" onClick={() => { setKeyword(""); setQuery(""); refreshList(); }}><LuX aria-hidden="true" /></button>}<button className="my-search-submit" type="button" aria-label="搜索" onClick={submitSearch}><LuSearch aria-hidden="true" /></button></label></div>
      <section className="my-result-head" aria-live="polite"><strong>共 {result.length} 个活动</strong>{query && <span>“{query}” 的搜索结果</span>}</section>
      <section id={"my-panel-" + activeTab} role="tabpanel" aria-labelledby={"my-tab-" + activeTab} className="my-result-list">
        {loading ? <Skeletons /> : result.length ? result.map((activity) => <ActivityRow key={activity.id} activity={activity} tab={activeTab} onRemove={remove} onFeedback={setNotice} />) : <div className="my-empty"><LuSearch aria-hidden="true" /><h2>{empty.title}</h2><p>{empty.detail}</p>{query && <button type="button" onClick={() => { setKeyword(""); setQuery(""); refreshList(); }}>清空搜索</button>}</div>}
      </section>
    </section>
    {pendingDelete && <div className="my-dialog-backdrop" role="presentation"><section className="my-delete-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-title"><h2 id="delete-title">删除活动？</h2><p>删除后，“{pendingDelete.title}”将从我管理的列表中移除。</p><div><button type="button" onClick={() => setPendingDelete(null)}>取消</button><button className="my-confirm-delete" type="button" onClick={() => { setItems((current) => current.map((item) => item.id === pendingDelete.id ? { ...item, relations: item.relations.filter((relation) => relation !== "managed") } : item)); setPendingDelete(null); setNotice("已删除活动"); }}>确认删除</button></div></section></div>}
    {notice && <div className="my-toast" role="status">{notice}<button type="button" aria-label="关闭提示" onClick={() => setNotice("")}><LuX aria-hidden="true" /></button></div>}
  </main>;
}

function getMobileActionGroups(activity, tab) {
  if (tab === "favorited") return { direct: [{ label: "取消收藏", tone: "quiet" }], overflow: [] };
  if (tab === "managed") return { direct: [{ label: "删除", tone: "danger" }], overflow: [] };
  if (activity.status === "reviewing") return { direct: [], overflow: [] };
  const primary = activity.status === "ended" ? "提交作品" : "去签到";
  const secondary = { label: "报名信息", tone: "secondary" };
  if (activity.id === "my-01") return { direct: [secondary, { label: "去填表", tone: "secondary" }, { label: primary, tone: "primary" }], overflow: [] };
  if (activity.id === "my-04" || activity.id === "my-08") return { direct: [secondary, { label: "去填表", tone: "secondary" }, { label: primary, tone: "primary" }], overflow: [{ label: "活动评价", tone: "secondary" }] };
  if (activity.id === "my-05") return { direct: [secondary, { label: "去填表", tone: "secondary" }, { label: primary, tone: "primary" }], overflow: [] };
  return { direct: [secondary, { label: primary, tone: "primary" }], overflow: [] };
}

function MobileMoreMenu({ activity, actions, onFeedback }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event) => {
      if (!event.target.closest('[data-mobile-menu-id="' + activity.id + '"]')) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [activity.id]);
  return <div className="my-mobile-more" data-mobile-menu-id={activity.id}>
    <button type="button" className="my-mobile-more-trigger" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}>更多<LuChevronDown aria-hidden="true" /></button>
    {open && <div className="my-mobile-more-menu" role="menu">{actions.map((action) => <button type="button" role="menuitem" key={action.label} onClick={() => { setOpen(false); onFeedback("已记录「" + action.label + "」操作"); }}>{action.label}</button>)}</div>}
  </div>;
}

function MobileActivityCard({ activity, tab, onFeedback }) {
  const actions = getMobileActionGroups(activity, tab);
  const hasActions = actions.direct.length > 0 || actions.overflow.length > 0;
  return <article className="my-mobile-card">
    <div className="my-mobile-card-main">
      <div className="my-mobile-cover"><img src={activity.cover} alt="" /><Status value={activity.status} /></div>
      <div className="my-mobile-card-info"><h2>{activity.title}</h2><p className="my-mobile-time"><LuCalendarDays aria-hidden="true" />{activity.start} — {activity.end}</p><p className="my-mobile-location"><LuMapPin aria-hidden="true" />{activity.location}</p></div>
    </div>
    {hasActions && <div className="my-mobile-card-actions">
      <div>{actions.overflow.length > 0 && <MobileMoreMenu activity={activity} actions={actions.overflow} onFeedback={onFeedback} />}</div>
      <div className="my-mobile-direct-actions">{actions.direct.map((action) => <button type="button" key={action.label} className={"my-mobile-action my-mobile-action--" + action.tone} onClick={() => onFeedback("已记录「" + action.label + "」操作")}>{action.label}</button>)}</div>
    </div>}
  </article>;
}

function MobileMyActivitiesPage() {
  const [activeTab, setActiveTab] = useState("joined");
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const result = useMemo(() => mobileRecordIds[activeTab].map((id) => recordsById[id]).filter((item) => !query || item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())), [activeTab, query]);
  const submitSearch = () => setQuery(normalize(keyword));
  return <main className="my-mobile-page">
    <header className="my-mobile-header"><div className="my-mobile-nav"><button type="button" className="my-mobile-nav-icon" aria-label="返回活动广场" onClick={() => { window.location.hash = ""; }}><span aria-hidden="true">‹</span></button><h1>应用标题</h1><button type="button" className="my-mobile-nav-icon" aria-label="新增活动" onClick={() => setNotice("本期未配置新增活动")}><LuPlus aria-hidden="true" /></button></div></header>
    <section className="my-mobile-toolbar"><label className="my-mobile-search"><LuSearch aria-hidden="true" /><input value={keyword} maxLength="100" onChange={(event) => setKeyword(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submitSearch()} placeholder="搜索" aria-label="搜索活动名称" />{keyword && <button type="button" aria-label="清空搜索" onClick={() => { setKeyword(""); setQuery(""); }}><LuX aria-hidden="true" /></button>}</label><div className="my-mobile-tabs" role="tablist" aria-label="我的活动分类">{tabs.map((tab) => <button id={"mobile-tab-" + tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls="mobile-activities-panel" key={tab.id} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>)}</div></section>
    <section id="mobile-activities-panel" role="tabpanel" aria-labelledby={"mobile-tab-" + activeTab} className="my-mobile-scroll"><div className="my-mobile-list">{result.length ? result.map((activity) => <MobileActivityCard activity={activity} tab={activeTab} onFeedback={setNotice} key={activity.id} />) : <div className="my-mobile-empty"><LuSearch aria-hidden="true" /><h2>未找到相关活动</h2><button type="button" onClick={() => { setKeyword(""); setQuery(""); }}>清空搜索</button></div>}</div></section>
    <div className="my-mobile-checkin" aria-label="去签到"><LuScanLine aria-hidden="true" /><span>去签到</span></div>
    {notice && <div className="my-mobile-toast" role="status">{notice}<button type="button" aria-label="关闭提示" onClick={() => setNotice("")}><LuX aria-hidden="true" /></button></div>}
  </main>;
}

function useMobileViewport() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(media.matches);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return isMobile;
}

export function MyActivitiesPage() {
  return useMobileViewport() ? <MobileMyActivitiesPage /> : <DesktopMyActivitiesPage />;
}
