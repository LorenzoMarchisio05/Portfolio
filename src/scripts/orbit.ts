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

const navTargets = Array.from(navLinks, (link) => ({
  link,
  section: document.getElementById(link.dataset.nav ?? ""),
}));

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
  if (progFill) progFill.style.transform = `scaleX(${(progress / 100).toFixed(4)})`;
  if (angle === lastAngle) return;
  lastAngle = angle;

  const label = String(angle).padStart(3, "0") + "°";
  angleOuts.forEach((el) => (el.textContent = label));
  if (angHead) angHead.style.left = ((angle / 360) * 100).toFixed(2) + "%";
}

// A link is lit for as long as its section holds the middle of the viewport.
// Matching the angle to the section's (within 14°) lit the photographer link
// only near the centre of its section, which is several screens tall.
function nav(vh: number) {
  navTargets.forEach(({ link, section }) => {
    const rect = section?.getBoundingClientRect();
    link.toggleAttribute("data-active", !!rect && rect.top <= vh / 2 && rect.bottom > vh / 2);
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
//
// The section is one screen, pinned for the corridor's travel plus a rest at
// each end, then let go. Inside the rests the corridor eases from still to its
// cruising speed and back: a straight one-to-one mapping turned the page's
// motion sideways at full speed in a single frame, and the corridor, moved
// here a frame behind the browser's own pinning, visibly jerked at both
// corners. Everything is measured in scroll, not time, so the cards never
// trail the page — but that means it has to be sized for a trackpad's
// 30–40px a frame: rests and ramps a few frames long read as no ease at all.
// Page scroll is the only driver: wheel, trackpad, keys and touch all arrive
// as scroll, momentum included. Handling the wheel itself cannot work — a
// trackpad gesture can only be cancelled on its first event, so the page
// scrolls straight past.

const journeySection = $("journey");
const jPin = journeySection?.querySelector<HTMLElement>(".pin") ?? null;
const corridor = $("corridor");
const corrFill = $("corrFill");
const corrLabel = $("corrLabel");
const corridorTrack = $("corridorTrack");
const cards = corridor
  ? Array.from(corridor.querySelectorAll<HTMLElement>("[data-card]"))
  : [];

// How far the corridor travels, and where the pin sits. Measured on layout
// changes only, never inside the loop: derived per frame, a mobile URL-bar
// resize moves the corridor for that frame, which reads as a jump.
let corridorMax = 0;
let pinTop = 0;
let dwell = 0;
let span = 0;

// Shares of the viewport: the rest at each end, and the scroll added on top
// of the travel, which slows the cards on a desktop, where the travel is
// short, more than on a phone, where it is long. RAMP is the share of the
// travel spent speeding up and slowing down.
const DWELL = 0.2;
const SPAN = 0.6;
const RAMP = 0.3;

// 0..1 in, 0..1 out: quadratic ramps either side of a straight middle, so the
// speed is continuous and zero at both ends.
function glide(t: number) {
  const v = 1 / (1 - RAMP);
  if (t < RAMP) return (v / (2 * RAMP)) * t * t;
  if (t > 1 - RAMP) return 1 - (v / (2 * RAMP)) * (1 - t) * (1 - t);
  return v * (t - RAMP / 2);
}

// Where the browser supports it, the track is a scroll-driven animation (see
// Journey.astro), built from the same glide() so both paths agree, and this
// loop only keeps the card opacities and the counter in step with it.
const scrollDriven = CSS.supports("animation-timeline: view()");
if (scrollDriven && corridorTrack)
  corridorTrack.style.animationTimingFunction = `linear(${Array.from(
    { length: 41 },
    (_, i) => glide(i / 40).toFixed(4),
  ).join(", ")})`;

// Elsewhere this loop moves the track, easing toward the scroll position over
// this many ms: the page scrolls on a thread of its own and this loop sees it
// in uneven steps, which set straight onto the cards read as a judder. Short,
// so the cards have settled before the rest at the end runs out; after a hard
// flick they may not have, and then they land at once rather than drift
// sideways under a section already moving up.
const CATCH_UP = 60;

let target = 0;
let pinned = false;
let shown = -1;
let shownAt = 0;
let catching = 0;

function measureCorridor() {
  if (!journeySection || !jPin || !corridor || !corridorTrack) return;
  // From the track's layout width, not `scrollWidth`: that counts the track's
  // transformed box, so it shrinks as the track slides.
  corridorMax = Math.max(
    0,
    parseFloat(getComputedStyle(corridor).paddingLeft) +
      corridorTrack.offsetWidth -
      corridor.clientWidth,
  );
  const vh = viewportH();
  const pinH = jPin.offsetHeight;
  // A pin taller than the screen parks with its bottom edge on the screen's.
  pinTop = Math.min(0, vh - pinH);
  dwell = corridorMax ? Math.round(vh * DWELL) : 0;
  span = corridorMax ? corridorMax + Math.round(vh * SPAN) : 0;
  jPin.style.top = pinTop + "px";
  journeySection.style.height = pinH + span + 2 * dwell + "px";
  // The animation's range: the section's `contain` stretch — from filling the
  // screen to its bottom meeting the screen's — less the part a tall pin
  // spends parking and the rests at either end.
  journeySection.style.setProperty("--j-travel", corridorMax + "px");
  journeySection.style.setProperty("--j-start", -pinTop + dwell + "px");
  journeySection.style.setProperty("--j-end", dwell + "px");
  // A new layout is not a movement: land on it rather than glide there.
  shown = -1;
}

function journey() {
  if (!journeySection) return;
  const travelled = pinTop - journeySection.getBoundingClientRect().top - dwell;
  target = span ? glide(clamp01(travelled / span)) * corridorMax : 0;
  pinned = travelled >= -dwell && travelled <= span + dwell;
  // Nothing to draw while the cards are where they should be — which is most
  // of the page — and every redraw is a layer update WebKit has to reconcile
  // with its own scrolling.
  if (!catching && target !== shown) {
    shownAt = performance.now();
    catching = requestAnimationFrame(catchUp);
  }
}

function catchUp(now: number) {
  catching = 0;
  if (!corridor || !corridorTrack) return;
  const k =
    scrollDriven || reduce.matches || shown < 0 || !pinned
      ? 1
      : 1 - Math.exp(-Math.max(0, now - shownAt) / CATCH_UP);
  shownAt = now;
  shown += (target - shown) * k;
  if (Math.abs(target - shown) < 0.05) shown = target;
  else catching = requestAnimationFrame(catchUp);
  if (!scrollDriven)
    corridorTrack.style.transform = `translate3d(${(-shown).toFixed(2)}px,0,0)`;
  const p = corridorMax ? shown / corridorMax : 0;

  const mobile = innerWidth <= MOBILE;
  const width = corridor.clientWidth || 1;
  const left = corridor.getBoundingClientRect().left;
  const ramp = width * (mobile ? 0.34 : 0.3);
  const base = mobile ? 0.2 : 0.24;

  // How much of the card is still east of the corridor's west edge: 1 while it
  // is fully in, ramping to `base` as it slides out. Both halves of this are
  // load-bearing. The ramp is capped at the card's own width because the cards
  // are narrower than it at every width the design uses — measured against a
  // ramp wider than itself a card can never reach 1, so it snapped down the
  // instant it touched the edge. And nothing may clamp the result from below:
  // a floor here held an exiting card at 0.86 across the whole ramp and then
  // dropped it the moment it cleared, one hard pop per card. On a phone, where
  // a card is the screen, that pop is the whole view.
  // Every rect before any opacity: reading after a write makes the browser
  // restyle once per card.
  const rects = cards.map((card) => card.getBoundingClientRect());
  cards.forEach((card, i) => {
    const r = rects[i];
    const t = clamp01((r.right - left) / Math.min(ramp, r.width || 1));
    card.style.opacity = (base + (1 - base) * t).toFixed(3);
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
  // Not fetched until the section is two screens away: at the top of the page
  // the hero is invisible, and its full-size file would compete with
  // everything the first screen needs.
  const photo = slot.querySelector("img")?.getAttribute("src") ?? "";
  if (rect.top < vh * 2 && shotHeroImg && shotHeroImg.getAttribute("src") !== photo) {
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
  nav(vh);
  rise(vh);
  journey();
  if (reduce.matches) return;
  parallax(vh);
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

// Geometry only the viewport can change is measured here rather than in the
// loop, so the loop reads a value that cannot move under it.
function remeasure() {
  measureCorridor();
  update();
}

addEventListener("resize", remeasure);
addEventListener("orientationchange", remeasure);
reduce.addEventListener("change", remeasure);

// Any reflow that changes the track's width or the pin's height — a font
// swapping in after first paint, a text metric settling — changes how far it
// travels. Catch it at the source instead of re-deriving it every frame; the
// body covers everything else the loop reads.
// Its first call, right after the browser's own first layout, is also where
// everything starts. Measuring any earlier, as the script runs, forced that
// layout early, on the script's clock.
let running = false;
const resized = new ResizeObserver(() => {
  measureCorridor();
  lastTop = null; // redraw on the next frame, moved or not
  if (running) return;
  running = true;
  requestAnimationFrame(tick);
});
for (const el of [corridorTrack, jPin, document.body]) if (el) resized.observe(el);
