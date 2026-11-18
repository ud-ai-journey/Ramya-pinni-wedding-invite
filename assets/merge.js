(() => {
const W = window.WEDDING, SC = window.SCENES, $ = id => document.getElementById(id), NS = 'http://www.w3.org/2000/svg';
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (v, a, b) => clamp((v - a) / (b - a));
const ease = p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
const lerp = (a, b, p) => a + (b - a) * p;
const merc = lat => 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));
const proj = ([lon, lat]) => [(lon - 68) * 20, (merc(37.2) - merc(lat)) * 20];
const ST = window.INDIA.states;
const YT_ID = 'TNFDgq3LFTc';

/* ---------- paint scenes ---------- */
$('svgK').innerHTML = SC.KERALA; $('svgA').innerHTML = SC.ANDHRA; $('svgM').innerHTML = SC.MANDAP;
$('svgM2').innerHTML = SC.MANDAP.replace(/id="m(Bg|Glow)"/g, 'id="m$1b"').replace(/url\(#m(Bg|Glow)\)/g, 'url(#m$1b)');
$('bandA').innerHTML = SC.ABAND; $('bandK').innerHTML = SC.KBAND;
$('thor').innerHTML = (() => { let o = '<path d="M0,6 Q100,40 200,6 Q300,40 400,6" stroke="#7A5A2A" stroke-width="1.5" fill="none"/>';
  for (let x = 8; x < 400; x += 14) { const k = (x % 200) / 200, y = 6 + 34 * 4 * k * (1 - k) * .5;
    o += (x / 14 | 0) % 3 === 2 ? `<circle cx="${x}" cy="${y + 8}" r="5" fill="#F29A1F"/>` : `<path d="M${x - 4},${y} Q${x - 5},${y + 12} ${x},${y + 20} Q${x + 5},${y + 12} ${x + 4},${y} Z" fill="${(x / 14 | 0) % 2 ? '#4E8A3A' : '#68A04A'}"/>`; }
  return `<g class="thor">${o}</g>`; })();

/* ================= MUSIC: mp3 if present, else the YouTube song ================= */
const song = $('song'); let mp3 = false, yt = null, ytReady = false, wantPlay = false, playing = false;
song.addEventListener('loadedmetadata', () => { mp3 = true; });
window.onYouTubeIframeAPIReady = () => {
  yt = new YT.Player('yt', { width: 200, height: 113, videoId: YT_ID,
    playerVars: { playsinline: 1, loop: 1, playlist: YT_ID, rel: 0, modestbranding: 1, controls: 1 },
    events: { onReady: () => { ytReady = true; yt.setVolume(80); if (wantPlay) yt.playVideo(); } } });
};
(() => { const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(s); })();
function startMusic() {
  playing = true; $('music').hidden = false; $('music').classList.remove('off');
  if (mp3) { song.volume = .8; song.play().catch(() => {}); return; }
  wantPlay = true; if (ytReady) yt.playVideo();
}
function stopMusic() {
  playing = false; $('music').classList.add('off');
  if (mp3) song.pause(); else if (ytReady) yt.pauseVideo();
}
$('music').onclick = () => playing ? stopMusic() : startMusic();
document.addEventListener('visibilitychange', () => { if (!playing) return; if (document.hidden) { mp3 ? song.pause() : ytReady && yt.pauseVideo(); } else { mp3 ? song.play().catch(() => {}) : ytReady && yt.playVideo(); } });

/* ================= ENTRY: light the lamp ================= */
$('lamp').addEventListener('click', () => {
  if ($('entry').classList.contains('lit')) return;
  $('entry').classList.add('lit'); startMusic();
  setTimeout(() => document.body.classList.remove('sealed'), 1200);
  setTimeout(() => $('entry').remove(), 2600);
});

/* ================= details ================= */
$('pBride').textContent = W.bride.parents; $('pBridePl').textContent = W.bride.place;
$('pGroom').textContent = W.groom.parents; $('pGroomPl').textContent = W.groom.place;
$('regards').innerHTML = W.regards.join('<br>');
const target = new Date(W.muhurtham.iso).getTime();
const tick = () => { const d = Math.max(0, target - Date.now());
  $('cd').innerHTML = [[Math.floor(d / 864e5), 'Days'], [Math.floor(d / 36e5) % 24, 'Hours'], [Math.floor(d / 6e4) % 60, 'Minutes'], [Math.floor(d / 1e3) % 60, 'Seconds']]
    .map(([v, l]) => `<div><b>${String(v).padStart(2, '0')}</b><small>${l.toUpperCase()}</small></div>`).join(''); };
tick(); setInterval(tick, 1000);
const links = ev => `<div class="links"><a href="${W.calLink(ev)}" target="_blank" rel="noopener">Add to calendar</a><a href="${W.mapLink(ev)}" target="_blank" rel="noopener">Map</a></div>`;
const sched = state => { const days = [];
  W.events.filter(e => e.state === state).forEach(ev => { let d = days.find(x => x.date === ev.date); if (!d) days.push(d = { day: ev.day, date: ev.date, evs: [] }); d.evs.push(ev); });
  return days.map(d => { const f = d.evs.find(e => e.hero);
    if (f) return `<div class="feature rv"><div class="f-date"><b>${parseInt(d.date)}</b><div><span>DECEMBER 2026</span><span>${d.day.toUpperCase()}</span></div></div><h3>The Wedding</h3><p class="te" style="color:var(--gold-hi)">శుభ ముహూర్తం</p>
      <p class="when" style="margin-top:12px">MUHURTHAM · ${f.time}</p><p class="v">${f.venue}, ${f.town}</p>${links(f)}</div>`;
    return `<div class="day rv"><div class="day-h"><b class="dnum">${parseInt(d.date)}</b><div class="dlbl"><b>${d.day}</b><span>DECEMBER 2026</span></div></div>${d.evs.map(e => `<div class="item"><div class="t">${e.time}</div><div><h4>${e.title}</h4><div class="tag">${e.tag}</div><div class="v">${e.venue}, ${e.town}</div>${links(e)}</div></div>`).join('')}</div>`; }).join(''); };
$('schedA').innerHTML = sched('andhra'); $('schedK').innerHTML = sched('kerala');
$('dir').href = W.mapLink(W.events.find(e => e.hero)); $('calMain').href = W.calLink(W.events.find(e => e.hero));
const PH = ['embrace-top', 'jasmine', 'garland', 'forehead', 'cake', 'radha', 'bride-smile', 'umbrella', 'swing-lean', 'bouquet'];
$('track').innerHTML = PH.map(p => `<img src="assets/photos/${p}.webp" alt="" loading="lazy">`).join('');
$('dots').innerHTML = PH.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('');
$('track').addEventListener('scroll', () => { const tr = $('track'), w = tr.firstElementChild.offsetWidth + 12, i = Math.round(tr.scrollLeft / w);
  [...$('dots').children].forEach((d, j) => d.classList.toggle('on', j === i)); }, { passive: true });
let n = 2; $('form').addEventListener('click', e => { const d = e.target.dataset.d; if (d) { n = clamp(n + +d, 1, 20); $('n').textContent = n; } });
$('form').addEventListener('submit', e => { e.preventDefault(); const f = new FormData(e.target);
  const msg = `RSVP · Ramyashruthi & Shambu's wedding\n\nName: ${f.get('name')}\n${f.get('att')}\nGuests: ${n}\nEvents: ${f.getAll('ev').join(', ') || '—'}${f.get('wish') ? `\n\nWish: ${f.get('wish')}` : ''}`;
  window.open(`https://wa.me/${W.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank'); e.target.style.display = 'none'; $('thanks').classList.add('on'); });
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .15, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

/* ================= INTERACTIVE MAP: tap the states ================= */
const IM = (() => {
  const box = $('mapbox'), svg = $('imap'), states = {};
  ['Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Kerala', 'Maharashtra', 'Odisha', 'Chhattisgarh', 'Goa', 'Puducherry'].forEach(nm => {
    const p = document.createElementNS(NS, 'path'); p.setAttribute('d', ST[nm].d);
    p.setAttribute('class', 'st' + (nm === 'Kerala' ? ' k tap' : nm === 'Andhra Pradesh' ? ' a tap' : '')); $('imStates').appendChild(p); states[nm] = p; });
  const KC = ST['Kerala'].c, AC = ST['Andhra Pradesh'].c, KOD = proj(W.places.kodumur.lonlat);
  const bK = states['Kerala'].getBBox(), bA = states['Andhra Pradesh'].getBBox();
  let x0 = Math.min(bK.x, bA.x) - 30, x1 = Math.max(bK.x + bK.width, bA.x + bA.width) + 20, y0 = bA.y - 30, y1 = bK.y + bK.height + 20;
  let w = x1 - x0, h = y1 - y0; if (w / h > .8) { const nh = w / .8; y0 -= (nh - h) / 2; h = nh; } else { const nw = h * .8; x0 -= (nw - w) / 2; w = nw; }
  svg.setAttribute('viewBox', `${x0} ${y0} ${w} ${h}`);
  const pct = ([x, y]) => [(x - x0) / w * 100, (y - y0) / h * 100];
  const C = [(KC[0] + KOD[0]) / 2 - 20, (KC[1] + KOD[1]) / 2];
  $('imArc').setAttribute('d', `M${KC[0]},${KC[1]} Q${C[0]},${C[1]} ${KOD[0]},${KOD[1]}`);
  const kP = pct(KC), aP = pct(AC), kodP = pct(KOD);
  const spotK = [clamp(kP[0] - 8, 14, 86), kP[1] - 4], spotA = [clamp(aP[0] + 6, 14, 86), aP[1] - 6];
  const place = (el, [x, y]) => { el.style.left = x + '%'; el.style.top = y + '%'; };
  place($('chipK'), [kP[0], kP[1] + 8]); place($('chipA'), [aP[0], aP[1] + 10]);
  let on = { k: false, a: false }, joined = false;
  const sparks = ([x, y], color) => { for (let i = 0; i < 14; i++) { const s = document.createElement('i'); s.className = 'spark'; s.style.left = x + '%'; s.style.top = y + '%'; s.style.background = color; box.appendChild(s);
      const a = i / 14 * Math.PI * 2, d = 40 + Math.random() * 50;
      s.animate([{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px)) scale(.2)`, opacity: 0 }], { duration: 900, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => s.remove(); } };
  function pop(which) {
    if (on[which] || joined) return; on[which] = true;
    const st = which === 'k' ? states['Kerala'] : states['Andhra Pradesh'], el = which === 'k' ? $('popK') : $('popA'), spot = which === 'k' ? spotK : spotA;
    st.classList.add('on'); st.classList.remove('tap'); $(which === 'k' ? 'chipK' : 'chipA').style.opacity = 0;
    place(el, spot);
    el.animate([{ left: '50%', top: '40%', transform: 'translate(-50%,-50%) scale(0)', opacity: 0 },
      { left: '50%', top: '40%', transform: 'translate(-50%,-50%) scale(1.9)', opacity: 1, offset: .35 },
      { left: '50%', top: '40%', transform: 'translate(-50%,-50%) scale(1.75)', opacity: 1, offset: .6 },
      { left: spot[0] + '%', top: spot[1] + '%', transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }],
      { duration: 1500, easing: 'cubic-bezier(.3,.8,.3,1)', fill: 'forwards' });
    setTimeout(() => sparks(spot, which === 'k' ? '#8FD3A6' : '#F7BE6B'), 1350);
    $('playHint').innerHTML = on.k && on.a ? 'Bringing them together…' : which === 'k' ? 'Now tap <b class="ta">Andhra</b>' : 'Now tap <b class="tk">Kerala</b>';
    if (on.k && on.a) setTimeout(join, 1700);
  }
  function join() {
    joined = true; const arc = $('imArc'); arc.style.opacity = 1;
    arc.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, fill: 'forwards' });
    const meetK = [kodP[0] - 13, kodP[1] - 2], meetA = [kodP[0] + 13, kodP[1] - 2];
    [[$('popK'), spotK, meetK], [$('popA'), spotA, meetA]].forEach(([el, a, b]) => {
      el.getAnimations().forEach(x => x.cancel()); place(el, b);
      el.animate([{ left: a[0] + '%', top: a[1] + '%', transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { left: b[0] + '%', top: b[1] + '%', transform: 'translate(-50%,-50%) scale(.92)', opacity: 1 }],
        { duration: 1400, delay: 400, easing: 'cubic-bezier(.6,0,.2,1)', fill: 'forwards' }); });
    setTimeout(() => { $('popA').classList.add('face-l'); const hp = [kodP[0], kodP[1] - 22]; place($('imHeart'), hp);
      $('imHeart').animate([{ transform: 'translate(-50%,-50%) scale(0)' }, { transform: 'translate(-50%,-50%) scale(1.4)', offset: .6 }, { transform: 'translate(-50%,-50%) scale(1)' }], { duration: 700, fill: 'forwards', easing: 'ease-out' });
      sparks(hp, '#F3D893'); $('unlock').classList.add('on'); $('playHint').textContent = 'Two states, one heart'; }, 1900);
  }
  function reset() {
    on = { k: false, a: false }; joined = false; $('unlock').classList.remove('on'); $('popA').classList.remove('face-l');
    [$('popK'), $('popA'), $('imHeart'), $('imArc')].forEach(el => { el.getAnimations().forEach(a => a.cancel()); });
    states['Kerala'].setAttribute('class', 'st k tap'); states['Andhra Pradesh'].setAttribute('class', 'st a tap');
    $('chipK').style.opacity = 1; $('chipA').style.opacity = 1; $('imArc').style.opacity = 0; $('playHint').innerHTML = 'Tap <b class="tk">Kerala</b> and <b class="ta">Andhra</b> on the map';
  }
  states['Kerala'].addEventListener('click', () => pop('k')); states['Andhra Pradesh'].addEventListener('click', () => pop('a'));
  [$('popK'), $('popA')].forEach((el, i) => el.addEventListener('click', () => { sparks([parseFloat(el.style.left), parseFloat(el.style.top)], i ? '#F7BE6B' : '#8FD3A6');
    el.animate([{ scale: 1 }, { scale: 1.15 }, { scale: 1 }], { duration: 450, easing: 'ease-out', composite: 'add' }); }));
  $('replayMap').onclick = reset;
  return { pop };
})();

/* ================= TWO WORLDS → ONE (scroll-driven, eased) ================= */
const stage = $('stage'), sec = $('worlds');
const svgK = $('svgK'), svgA = $('svgA'), wK = $('wK'), wA = $('wA'), wM = $('wM'), seam = $('seam'), burst = $('burst');
const chK = $('chK'), chA = $('chA'), chC = $('chC'), lK = $('lK'), lA = $('lA'), pK = $('pK'), pA = $('pA');
const AR = { K: 760 / 1230, A: 760 / 1486, C: 822 / 1447 };
const caps = [['c0', -1, .085], ['cK', .17, .28], ['cA', .39, .5], ['c1', .565, .645], ['c2', .665, .765], ['cM', .88, 9]].map(([id, a, b]) => [$(id), a, b]);
const SK = [[0, 50], [.08, 50], [.16, 100], [.28, 100], [.38, 0], [.5, 0], [.58, 50], [1, 50]];
const splitAt = p => { let i = 0; while (i < SK.length - 2 && p >= SK[i + 1][0]) i++; const [a0, a] = SK[i], [b0, b] = SK[i + 1]; return lerp(a, b, ease(seg(p, a0, b0))); };
const win = (p, a, b) => Math.min(ease(seg(p, a, a + .025)), 1 - ease(seg(p, b - .025, b)));
function draw(p) {
  const Wd = stage.clientWidth, H = stage.clientHeight;
  const s = splitAt(p), m = ease(seg(p, .64, .76));
  const kL = m * 50, kR = s * (1 - m) + 50 * m, aL = kR, aR = 100 - m * 50;
  const kW = kR - kL, aW = aR - aL, kC = (kL + kR) / 2, aC = (aL + aR) / 2;
  wK.style.clipPath = `inset(0 ${100 - kR}% 0 ${kL}%)`; wA.style.clipPath = `inset(0 ${100 - aR}% 0 ${aL}%)`;
  const fK = ease(seg(kW, 50, 100)), fA = ease(seg(aW, 50, 100));
  svgK.style.transform = `translateX(${(kC - 50) * (1 - m * .6)}%) scale(${1 + fK * .05})`;
  svgA.style.transform = `translateX(${(aC - 50) * (1 - m * .6)}%) scale(${1 + fA * .05})`;
  wK.style.visibility = kW > .1 ? 'visible' : 'hidden'; wA.style.visibility = aW > .1 ? 'visible' : 'hidden';
  seam.style.left = kR + '%'; seam.style.opacity = ((kW > .5 && aW > .5) || m > 0) ? 1 - seg(p, .76, .79) : 0;
  seam.style.boxShadow = `0 0 ${18 + m * 40}px rgba(243,216,147,${.6 + m * .4})`;
  lK.style.left = kC + '%'; lA.style.left = aC + '%';
  lK.style.opacity = seg(kW, 30, 46) * (1 - seg(p, .6, .66)) * (1 - fK);
  lA.style.opacity = seg(aW, 30, 46) * (1 - seg(p, .6, .66)) * (1 - fA);
  const maxH = H * .56, hFor = (w, ar) => Math.min(maxH, (w / 100) * Wd * .98 / ar);
  const hk = m > 0 ? hFor(50, AR.K) : lerp(hFor(Math.min(Math.max(kW, 1), 50), AR.K), H * .4, fK);
  const ha = m > 0 ? hFor(50, AR.A) : lerp(hFor(Math.min(Math.max(aW, 1), 50), AR.A), H * .42, fA);
  const xk = m > 0 ? lerp(25, 31, m) : lerp(kC, kC + 27, fK), xa = m > 0 ? lerp(75, 69, m) : lerp(aC, aC - 27, fA);
  const out = 1 - ease(seg(p, .78, .84));
  chK.style.height = hk + 'px'; chK.style.left = xk + '%'; chK.style.opacity = (kW > 8 || m > 0 ? 1 : 0) * out;
  chA.style.height = ha + 'px'; chA.style.left = xa + '%'; chA.style.opacity = (aW > 8 || m > 0 ? 1 : 0) * out;
  [[pK, win(p, .17, .28)], [pA, win(p, .39, .5)]].forEach(([el, o]) => { el.style.opacity = o; el.style.transform = `translateX(-50%) translateY(${(1 - o) * 24}px) scale(${.94 + .06 * o})`; });
  const b = seg(p, .755, .83);
  burst.style.opacity = b > 0 && b < 1 ? Math.sin(b * Math.PI) : 0; burst.style.transform = `scale(${1 + ease(b) * 40})`;
  wM.style.clipPath = `circle(${ease(seg(p, .77, .86)) * 120}% at 50% 60%)`;
  const c = ease(seg(p, .83, .92));
  chC.style.height = Math.min(H * .54, Wd * .9 / AR.C) + 'px'; chC.style.left = '50%';
  chC.style.opacity = c; chC.style.transform = `translateX(-50%) translateY(${(1 - c) * 40}px)`;
  caps.forEach(([el, a, b2]) => { const o = win(p, a, b2); el.style.opacity = o; el.style.transform = `translateY(${(1 - o) * 14}px)`; });
  $('hint').style.opacity = 1 - seg(p, .01, .05);
  $('prog').firstElementChild.style.height = p * 100 + '%';
}
let pTarget = 0, pCur = -1, raf = 0;
const measure = () => { const r = sec.getBoundingClientRect(); pTarget = clamp(-r.top / (r.height - innerHeight)); };
function loop() {
  pCur = pCur < 0 ? pTarget : pCur + (pTarget - pCur) * .12;
  if (Math.abs(pTarget - pCur) < .0004) pCur = pTarget;
  draw(pCur);
  raf = pCur !== pTarget ? requestAnimationFrame(loop) : 0;
}
const kick = () => { measure(); if (!raf) raf = requestAnimationFrame(loop); };
addEventListener('scroll', kick, { passive: true }); addEventListener('resize', () => { pCur = -1; kick(); }); kick();

/* test hooks: ?open · ?col=<px> */
const q = new URLSearchParams(location.search);
if (q.has('col')) document.documentElement.style.setProperty('--col', q.get('col') + 'px');
if (q.has('open')) { $('entry').remove(); document.body.classList.remove('sealed'); }
window.__IM = IM;
})();
