// One rAF loop drives everything scroll-driven on the page: the angle readout,
// the progress rule, reveals, parallax, the journey corridor and the six-frame
// takeover. Nothing hangs off a `scroll` event — position is read from element
// geometry, so it stays correct whether the window or an ancestor element is
// the real scroll container.

const MOBILE = 768;
const reduce = matchMedia("(prefers-reduced-motion: reduce)");

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth = (x: number) => x * x * (3 - 2 * x);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const $ = <T extends HTMLElement>(id: string) =>
  document.getElementById(id) as T | null;

// Every track below is sized in CSS `vh`, so the maths that divides by a
// viewport height has to use the number `vh` itself resolves against. On a
// phone that is NOT `innerHeight`: the URL bar collapses as you scroll and
// moves `innerHeight` ~75px mid-gesture while `vh` — and so the track heights —
// stay put. Dividing a fixed track by a moving viewport makes the progress
// jump, which is the corridor and the photo hero snapping sideways every time
// the bar slides. `documentElement.clientHeight` is the initial containing
// block, which is exactly what `vh` measures and does not follow the bar.
const viewportH = () => document.documentElement.clientHeight || innerHeight;

const angleOuts = document.querySelectorAll<HTMLElement>("[data-angle]");
const navLinks = document.querySelectorAll<HTMLElement>("[data-nav]");
const parallaxed = document.querySelectorAll<HTMLElement>("[data-par]");
const progFill = $("progFill");
const angHead = $("angHead");

// Section centres are keyframes on the angle scalar; scroll midpoint
// interpolates between them.
const STOPS: [string, number][] = [
  ["top", 68],
  ["engineer", 0],
  ["journey", 60],
  ["founder", 120],
  ["photography", 240],
  ["contact", 300],
];

const NAV_ANGLE: Record<string, number> = {
  engineer: 0,
  founder: 120,
  photography: 240,
};

// `max` must come from the document's scrollable extent: deriving it from
// body height alone yields 0 when the body is viewport-height, which pins the
// progress bar at 100%.
function scrollPos() {
  const box = document.body.getBoundingClientRect();
  const extent = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
    box.height,
  );
  return { y: -box.top, max: Math.max(1, extent - viewportH()) };
}

function angleAt(y: number) {
  const mid = y + viewportH() / 2;
  const points = STOPS.map(([id, deg]) => {
    const el = document.getElementById(id);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { top: rect.top + y + rect.height / 2, deg };
  }).filter((p): p is { top: number; deg: number } => p !== null);

  if (!points.length) return 0;
  if (mid <= points[0].top) return Math.round((points[0].deg + 360) % 360);

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (mid >= a.top && mid <= b.top) {
      const f = (mid - a.top) / Math.max(1, b.top - a.top);
      return Math.round((a.deg + (b.deg - a.deg) * f + 360) % 360);
    }
  }
  return Math.round((points[points.length - 1].deg + 360) % 360);
}

let lastAngle = -1;

function chrome(angle: number, progress: number) {
  if (progFill) progFill.style.width = progress.toFixed(2) + "%";
  if (angle === lastAngle) return;
  lastAngle = angle;

  const label = String(angle).padStart(3, "0") + "°";
  angleOuts.forEach((el) => (el.textContent = label));
  if (angHead) angHead.style.left = ((angle / 360) * 100).toFixed(2) + "%";

  navLinks.forEach((el) => {
    const target = NAV_ANGLE[el.dataset.nav ?? ""] ?? 0;
    const near = Math.abs(((angle - target + 540) % 360) - 180) <= 14;
    el.toggleAttribute("data-active", near);
  });
}

// One-way: revealed blocks never re-hide.
let risers = Array.from(document.querySelectorAll<HTMLElement>("[data-rise]"));

function rise(vh: number) {
  if (!risers.length) return;
  const edge = vh * (innerWidth <= MOBILE ? 0.9 : 0.86);
  risers = risers.filter((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top >= edge || rect.bottom <= 0) return true;
    el.classList.add("is-in");
    return false;
  });
}

function parallax(vh: number) {
  const mobile = innerWidth <= MOBILE;
  parallaxed.forEach((el) => {
    const host = el.closest("section") ?? el.parentElement;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    // -1 when the host sits a viewport below centre, +1 a viewport above.
    const c = Math.max(
      -1.6,
      Math.min(1.6, (rect.top + rect.height / 2 - vh / 2) / vh),
    );
    const raw =
      mobile && el.dataset.parM !== undefined ? el.dataset.parM : el.dataset.par;
    const factor = parseFloat(raw ?? "") || 0;
    el.style.transform = factor
      ? `translate3d(0,${(-c * factor * vh).toFixed(1)}px,0)`
      : "none";
  });
}

// ---- Journey corridor -------------------------------------------------

const jTrack = $("jTrack");
const corridor = $("corridor");
const corridorTrack = $("corridorTrack");
const corrFill = $("corrFill");
const corrLabel = $("corrLabel");
const cards = corridor
  ? Array.from(corridor.querySelectorAll<HTMLElement>("[data-card]"))
  : [];

function journey(vh: number) {
  if (!jTrack || !corridor || !corridorTrack) return;

  const rect = jTrack.getBoundingClientRect();
  const p = clamp01(-rect.top / Math.max(1, rect.height - vh));
  const max = Math.max(0, corridorTrack.scrollWidth - corridor.clientWidth);
  // A transform, never scrollLeft: page scroll is the only driver.
  corridorTrack.style.transform = `translate3d(${(-(p * max)).toFixed(1)}px,0,0)`;

  const mobile = innerWidth <= MOBILE;
  const width = corridor.clientWidth || 1;
  const left = corridor.getBoundingClientRect().left;
  const ramp = width * (mobile ? 0.34 : 0.3);
  const floor = mobile ? 0.82 : 0.78;
  const base = mobile ? 0.2 : 0.24;

  cards.forEach((card) => {
    const r = card.getBoundingClientRect();
    const t = r.left >= left - 1 ? 1 : clamp01((r.right - left) / ramp);
    const visible = r.right > left + 2 && r.left < left + width - 2;
    const k = visible ? Math.max(floor, t) : t;
    card.style.opacity = (base + (1 - base) * k).toFixed(3);
  });

  if (corrFill) corrFill.style.width = (p * 100).toFixed(1) + "%";
  if (corrLabel) {
    const stops = cards.length || 7;
    const at = Math.min(stops, Math.round(p * (stops - 1)) + 1);
    const next = String(at).padStart(2, "0") + " / " + String(stops).padStart(2, "0");
    if (corrLabel.textContent !== next) corrLabel.textContent = next;
  }
}

// ---- Six frames takeover ----------------------------------------------

const shotTrack = $("shotTrack");
const shotHero = $("shotHero");
const shotVeil = $("shotVeil");
const shotHeroCap = $("shotHeroCap");
const shotHeroImg = $("shotHeroImg");
const shotHint = $("shotHint");
const shotHead = $("shotHead");
const shotTrail = $("shotTrail");
const photography = $("photography");
const frames = photography
  ? Array.from(photography.querySelectorAll<HTMLElement>("[data-frame]"))
  : [];
const shotNums = photography
  ? Array.from(photography.querySelectorAll<HTMLElement>("[data-shotn]"))
  : [];

function shots(vh: number) {
  if (!shotTrack || !shotHero || !frames.length) return;

  const mobile = innerWidth <= MOBILE;
  const vw = innerWidth;
  const rect = shotTrack.getBoundingClientRect();
  const p = clamp01(-rect.top / Math.max(1, rect.height - vh));
  const n = frames.length;
  const q = p * n;
  const idx = Math.max(0, Math.min(n - 1, Math.floor(q)));
  const local = clamp01(q - idx);
  const live = q > 0.01 && q < n;
  // 1 while a frame holds centre stage, easing to 0 as it docks into its slot.
  const u = local < 0.45 ? 1 : 1 - smooth((local - 0.45) / 0.55);
  const fade = local < 0.26 ? smooth(local / 0.26) : 1;

  frames.forEach((el, i) => {
    const docked = q >= n || i < idx || (i === idx && u < 0.04 && q > 0.01);
    el.style.opacity = docked ? "1" : "0";
  });

  // The hint has done its job the moment the first frame starts arriving.
  if (shotHint) shotHint.style.opacity = (1 - smooth(clamp01(q / 0.6))).toFixed(3);

  const slot = frames[idx];
  const r = slot.getBoundingClientRect();
  const aw = slot.offsetWidth || 1;
  const ah = slot.offsetHeight || 1;
  const k = Math.max(
    1,
    Math.min((vw * (mobile ? 0.88 : 0.56)) / aw, (vh * (mobile ? 0.62 : 0.6)) / ah),
  );
  const cw = aw * k;
  const ch = ah * k;

  shotHero.style.width = lerp(r.width, cw, u).toFixed(1) + "px";
  shotHero.style.height = lerp(r.height, ch, u).toFixed(1) + "px";
  shotHero.style.left = lerp(r.left, (vw - cw) / 2, u).toFixed(1) + "px";
  shotHero.style.top = lerp(r.top, (vh - ch) / 2, u).toFixed(1) + "px";
  shotHero.style.transform = `rotate(${((mobile ? 1.2 : 1.4) * u).toFixed(2)}deg)`;
  shotHero.style.opacity = live && u > 0.03 ? fade.toFixed(3) : "0";

  const caption = slot.dataset.cap ?? "";
  if (shotHeroCap && shotHeroCap.textContent !== caption)
    shotHeroCap.textContent = caption;

  // Centre stage shows the same photograph as the slot it grew out of — and
  // drops back to the stripes when that slot has no file yet, rather than
  // holding the previous frame's photo.
  const photo = slot.querySelector("img")?.getAttribute("src") ?? "";
  if (shotHeroImg && shotHeroImg.getAttribute("src") !== photo) {
    if (photo) shotHeroImg.setAttribute("src", photo);
    else shotHeroImg.removeAttribute("src");
  }

  if (shotVeil)
    shotVeil.style.opacity = live
      ? ((mobile ? 0.88 : 0.86) * u * fade).toFixed(3)
      : "0";

  const pct = Math.max(0, Math.min(100, (Math.min(q, n) / n) * 100));
  if (shotHead)
    shotHead.style.left = `calc(${pct.toFixed(1)}% - ${(pct / 100).toFixed(2)}px)`;
  if (shotTrail) shotTrail.style.width = pct.toFixed(1) + "%";

  const shown = Math.max(0, Math.min(n, Math.floor(q)));
  shotNums.forEach((el) => {
    const m = parseInt(el.dataset.shotn ?? "0", 10);
    el.style.color = m <= shown ? "var(--bone)" : "var(--dim)";
  });
}

// ---- Loop --------------------------------------------------------------

function update() {
  const vh = viewportH();
  const { y, max } = scrollPos();
  chrome(angleAt(y), clamp01(y / max) * 100);
  rise(vh);
  if (reduce.matches) return;
  parallax(vh);
  journey(vh);
  shots(vh);
}

let lastTop: number | null = null;
let lastHeight = 0;

function tick() {
  const box = document.body.getBoundingClientRect();
  if (box.top !== lastTop || box.height !== lastHeight) {
    lastTop = box.top;
    lastHeight = box.height;
    update();
  }
  requestAnimationFrame(tick);
}

addEventListener("resize", update);
addEventListener("orientationchange", update);
reduce.addEventListener("change", update);
// Fonts land after first paint and change every measurement below them.
document.fonts?.ready.then(update);

update();
requestAnimationFrame(tick);
