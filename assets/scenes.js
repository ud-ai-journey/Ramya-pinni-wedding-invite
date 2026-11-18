/* Illustrated scenes, drawn as layered SVG (viewBox 400 x 900, portrait). */
(() => {
const R = Math.PI / 180;
const f = n => n.toFixed(1);

function palm(x, y, h, lean, s = 1, trunk = '#6E4B2F', leaf = '#2E6B46', rib = '#4C8A5E', cls = '') {
  const tx = x + lean, ty = y - h, w0 = 8 * s, w1 = 4.2 * s, cx = x + lean * .25, cy = y - h * .5;
  let o = `<path d="M${f(x - w0)},${y} Q${f(cx - w0 * .9)},${f(cy)} ${f(tx - w1)},${f(ty)} L${f(tx + w1)},${f(ty)} Q${f(cx + w0 * .9)},${f(cy)} ${f(x + w0)},${y} Z" fill="${trunk}"/>`;
  for (let i = 1; i < 11; i++) { const u = i / 11, px = (1 - u) ** 2 * x + 2 * (1 - u) * u * cx + u * u * tx, py = (1 - u) ** 2 * y + 2 * (1 - u) * u * cy + u * u * ty, w = w0 + (w1 - w0) * u;
    o += `<path d="M${f(px - w)},${f(py)} q${f(w)},${f(2.5 * s)} ${f(w * 2)},0" stroke="#4A3020" stroke-width="${f(1.1 * s)}" fill="none" opacity=".55"/>`; }
  const angs = [-178, -158, -138, -116, -94, -72, -50, -28, -6, -150, -30];
  angs.forEach((a, i) => { const L = (i > 8 ? 52 : 74) * s, ex = tx + Math.cos(a * R) * L, ey = ty + Math.sin(a * R) * L * .55 + L * .42,
    c1x = tx + Math.cos(a * R) * L * .5, c1y = ty + Math.sin(a * R) * L * .55 - L * .18;
    o += `<path d="M${f(tx)},${f(ty)} Q${f(c1x)},${f(c1y)} ${f(ex)},${f(ey)} Q${f(c1x)},${f(c1y + 11 * s)} ${f(tx)},${f(ty)} Z" fill="${i % 2 ? leaf : rib}"/>
      <path d="M${f(tx)},${f(ty)} Q${f(c1x)},${f(c1y + 4 * s)} ${f(ex)},${f(ey)}" stroke="#1F4A31" stroke-width="${f(.9 * s)}" fill="none" opacity=".5"/>`; });
  [[-5, 6], [4, 7], [0, 10]].forEach(([dx, dy]) => o += `<circle cx="${f(tx + dx * s)}" cy="${f(ty + dy * s)}" r="${f(4.2 * s)}" fill="#7A8F3A"/>`);
  return `<g class="${cls}" style="transform-origin:${x}px ${y}px">${o}</g>`;
}

const KERALA = `
<defs>
  <linearGradient id="kSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F9E4CF"/><stop offset=".55" stop-color="#FBD9B9"/><stop offset="1" stop-color="#F6C9A4"/></linearGradient>
  <linearGradient id="kWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9CC3BC"/><stop offset="1" stop-color="#4E8582"/></linearGradient>
  <radialGradient id="kSun"><stop offset="0" stop-color="#FFF4DC"/><stop offset=".55" stop-color="#FFE3B5"/><stop offset="1" stop-color="#FFE3B5" stop-opacity="0"/></radialGradient>
</defs>
<rect width="400" height="900" fill="url(#kSky)"/>
<circle cx="250" cy="520" r="120" fill="url(#kSun)"/><circle cx="250" cy="520" r="40" fill="#FFF1D6"/>
<g class="far" opacity=".9">
  <path d="M-40,610 Q40,520 120,575 Q190,510 270,568 Q340,520 440,580 L440,640 L-40,640 Z" fill="#A9C7AE"/>
  
</g>
<g class="mid">
  <path d="M-40,640 Q60,590 150,622 Q240,585 330,618 Q380,600 440,612 L440,660 L-40,660 Z" fill="#6F9F7E"/>
  ${[30, 70, 115, 170, 230, 290, 340, 380].map((x, i) => palm(x, 646, 70 + (i % 3) * 14, (i % 2 ? 8 : -6), .45, '#4E5B3E', '#2F5B40', '#3F7150')).join('')}
</g>
<g class="birds"><path d="M60,250 l8,5 l8,-5 M90,232 l6,4 l6,-4 M120,262 l7,4 l7,-4" stroke="#7A5A48" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>
<rect y="650" width="400" height="250" fill="url(#kWater)"/>
<g class="ripples" opacity=".35" stroke="#FFF6E8" stroke-width="1.4" stroke-linecap="round">
  <path d="M40,690 h40 M120,705 h60 M230,684 h30 M290,712 h50 M60,740 h70 M200,752 h40 M300,770 h60 M30,800 h50 M150,815 h80 M280,840 h50"/>
</g>
<path d="M235,580 l14,0" stroke="#FFF1D6" stroke-width="3" opacity=".6"/>
<g transform="translate(70,712)"><g class="boat">
  <path d="M-6,-4 Q70,10 150,-2 L160,-12 Q78,-2 -14,-14 Z" fill="#4A2D1C"/>
  <path d="M4,-12 Q72,-58 148,-14 Z" fill="#C99A5A"/>
  <path d="M24,-17 Q72,-48 128,-17" stroke="#A97A3E" stroke-width="1.4" fill="none"/>
  <path d="M40,-14 v-16 M60,-14 v-22 M80,-14 v-24 M100,-14 v-21 M120,-14 v-14" stroke="#8E6431" stroke-width="1.2"/>
  <rect x="48" y="-26" width="9" height="8" fill="#6B3E22"/><rect x="88" y="-27" width="9" height="8" fill="#6B3E22"/>
  <path d="M-6,4 Q70,16 150,4" stroke="#FFF6E8" stroke-width="1" opacity=".3" fill="none"/>
</g></g>
<g class="near">
  ${palm(-10, 900, 520, 70, 1.25, undefined, undefined, undefined, 'sway s1')}
  ${palm(420, 900, 430, -80, 1.05, undefined, undefined, undefined, 'sway s2')}
  <path d="M-20,900 Q40,850 110,872 Q170,858 230,880 Q300,860 420,876 L420,900 Z" fill="#3E7350"/>
  <path d="M-20,900 Q60,868 140,890 L140,900 Z" fill="#2F5E40"/>
</g>`;

/* ---------- Andhra ---------- */
function gopuram(cx, base, s = 1) {
  let o = '', w = 170 * s, y = base;
  o += `<rect x="${cx - w / 2 - 6}" y="${y - 70 * s}" width="${w + 12}" height="${70 * s}" fill="#B9672F"/>
        <path d="M${cx - 18 * s},${y} v${-40 * s} q${18 * s},${-22 * s} ${36 * s},0 v${40 * s} Z" fill="#5E2A12"/>`;
  y -= 70 * s;
  for (let i = 0; i < 7; i++) { const h = 30 * s, nw = w - 16 * s;
    o += `<path d="M${f(cx - w / 2)},${f(y)} L${f(cx - nw / 2)},${f(y - h)} L${f(cx + nw / 2)},${f(y - h)} L${f(cx + w / 2)},${f(y)} Z" fill="${i % 2 ? '#C97A3D' : '#D4894A'}"/>
      <path d="M${f(cx - w / 2)},${f(y)} L${f(cx + w / 2)},${f(y)}" stroke="#8F4A1F" stroke-width="${f(2 * s)}"/>`;
    const n = 5 - Math.floor(i / 2); for (let j = 0; j < n; j++) { const x = cx - nw / 2 + (j + .5) * nw / n;
      o += `<rect x="${f(x - 4 * s)}" y="${f(y - h + 7 * s)}" width="${f(8 * s)}" height="${f(14 * s)}" rx="${f(3 * s)}" fill="#8F4A1F" opacity=".6"/>`; }
    y -= h; w = nw - 4 * s; }
  o += `<rect x="${f(cx - w / 2 - 6 * s)}" y="${f(y - 24 * s)}" width="${f(w + 12 * s)}" height="${f(24 * s)}" rx="${f(12 * s)}" fill="#C27235"/>`;
  for (let j = 0; j < 5; j++) { const x = cx - w / 2 + (j + .5) * w / 5;
    o += `<path d="M${f(x - 4 * s)},${f(y - 24 * s)} q${f(4 * s)},${f(-14 * s)} ${f(8 * s)},0 Z" fill="#E2B04A"/><circle cx="${f(x)}" cy="${f(y - 37 * s)}" r="${f(2 * s)}" fill="#E2B04A"/>`; }
  return o;
}
function thoranam(W, y0, sag) {
  let o0 = `<path d="M0,${y0} Q${W / 4},${y0 + sag} ${W / 2},${y0} Q${W * .75},${y0 + sag} ${W},${y0}" stroke="#7A5A2A" stroke-width="2" fill="none"/>`;
  let o = o0;
  for (let x = 6; x < W; x += 16) { const k = (x % (W / 2)) / (W / 2), y = y0 + sag * 4 * k * (1 - k) * .5;
    if ((x / 16 | 0) % 3 === 2) o += `<circle cx="${f(x)}" cy="${f(y + 10)}" r="6.5" fill="#F29A1F"/><circle cx="${f(x)}" cy="${f(y + 10)}" r="3" fill="#E0731A"/>`;
    else o += `<path d="M${f(x - 5)},${f(y)} Q${f(x - 6)},${f(y + 16)} ${f(x)},${f(y + 26)} Q${f(x + 6)},${f(y + 16)} ${f(x + 5)},${f(y)} Z" fill="${(x / 16 | 0) % 2 ? '#4E8A3A' : '#68A04A'}"/>`; }
  return `<g class="thor">${o}</g>`;
}
function kolam(cx, cy, s = 1) {
  let o = '';
  for (let i = 0; i < 8; i++) o += `<ellipse cx="${cx}" cy="${cy - 34 * s}" rx="${11 * s}" ry="${26 * s}" transform="rotate(${i * 45} ${cx} ${cy})" fill="${i % 2 ? '#E2503F' : '#F2B632'}" stroke="#FFF7E8" stroke-width="2.2"/>`;
  o += `<circle cx="${cx}" cy="${cy}" r="${12 * s}" fill="#5A9A4A" stroke="#FFF7E8" stroke-width="2.2"/>`;
  o += `<circle cx="${cx}" cy="${cy}" r="${72 * s}" fill="none" stroke="#FFF7E8" stroke-width="2.4"/>`;
  for (let i = 0; i < 16; i++) { const a = i * 22.5 * R; o += `<circle cx="${f(cx + Math.cos(a) * 84 * s)}" cy="${f(cy + Math.sin(a) * 84 * s)}" r="${2.6 * s}" fill="#FFF7E8"/>`;
    if (i % 2 === 0) o += `<path d="M${f(cx + Math.cos(a) * 72 * s)},${f(cy + Math.sin(a) * 72 * s)} q${f(Math.cos(a + .7) * 22 * s)},${f(Math.sin(a + .7) * 22 * s)} ${f(Math.cos(a) * 26 * s)},${f(Math.sin(a) * 26 * s)}" stroke="#FFF7E8" stroke-width="2" fill="none"/>`; }
  return `<g transform="translate(0,0) scale(1,.42)" transform-origin="${cx} ${cy}">${o}</g>`;
}
const garland = (x, y0, len, alt) => { let o = `<g class="gar" style="transform-origin:${x}px ${y0}px"><line x1="${x}" y1="${y0}" x2="${x}" y2="${y0 + len}" stroke="#7A5A2A" stroke-width="1"/>`;
  for (let y = y0 + 8; y < y0 + len; y += 11) o += `<circle cx="${x}" cy="${y}" r="5.4" fill="${(y / 11 | 0) % 4 === 0 ? '#FFF6E6' : alt ? '#F2B632' : '#F08A1C'}"/>`;
  return o + `<path d="M${x - 5},${y0 + len} l5,14 l5,-14 Z" fill="#E2503F"/></g>`; };
const deepam = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-10,0 Q0,8 10,0 L7,-4 Q0,0 -7,-4 Z" fill="#B5582A"/><path class="flame" d="M0,-6 Q-4,-12 0,-20 Q4,-12 0,-6 Z" fill="#FFC23D"/><circle cy="-12" r="9" fill="#FFD27A" opacity=".25"/></g>`;

const ANDHRA = `
<defs>
  <linearGradient id="aSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE6BF"/><stop offset=".5" stop-color="#FBC680"/><stop offset="1" stop-color="#F3A55C"/></linearGradient>
  <linearGradient id="aGround" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9B980"/><stop offset="1" stop-color="#D99B5E"/></linearGradient>
  <radialGradient id="aSun"><stop offset="0" stop-color="#FFF3D6"/><stop offset=".6" stop-color="#FFDDA0" stop-opacity=".8"/><stop offset="1" stop-color="#FFDDA0" stop-opacity="0"/></radialGradient>
</defs>
<rect width="400" height="900" fill="url(#aSky)"/>
<circle cx="200" cy="360" r="170" fill="url(#aSun)"/>
<g class="far" opacity=".55">${gopuram(70, 640, .5)}${gopuram(335, 640, .45)}</g>
<g class="mid">
  ${gopuram(200, 650, 1)}
  <rect x="0" y="600" width="112" height="56" fill="#C47A42"/><rect x="288" y="600" width="112" height="56" fill="#C47A42"/>
  ${[10, 34, 58, 82, 306, 330, 354, 378].map(x => `<rect x="${x}" y="608" width="10" height="48" fill="#A85E2C"/>`).join('')}
  <path d="M0,600 h112 M288,600 h112" stroke="#8F4A1F" stroke-width="4"/>
</g>
<rect y="650" width="400" height="250" fill="url(#aGround)"/>
<g class="near">
  ${kolam(200, 805, .9)}
  ${deepam(110, 770, 1)}${deepam(290, 770, 1)}${deepam(70, 820, 1.1)}${deepam(330, 820, 1.1)}
  ${garland(14, 40, 210, 0)}${garland(36, 46, 160, 1)}${garland(364, 46, 160, 1)}${garland(386, 40, 210, 0)}
  ${thoranam(400, 18, 40)}
</g>`;

/* ---------- Royal mandap (the merged world) ---------- */
function banana(x, flip) { const d = flip ? -1 : 1;
  let o = `<path d="M${x - 11},900 L${x - 7},540 L${x + 7},540 L${x + 11},900 Z" fill="#6E9A4A"/><path d="M${x - 3},900 L${x - 2},540" stroke="#5A8A3C" stroke-width="2"/>`;
  [[-160, 150], [-125, 185], [-95, 170], [-60, 190], [-25, 160], [-140, 120], [-75, 130]].forEach(([a, L], i) => {
    const aa = (flip ? -180 - a : a) * R, ex = x + Math.cos(aa) * L, ey = 540 + Math.sin(aa) * L * .75 + L * .25;
    const mx = x + Math.cos(aa) * L * .55, my = 540 + Math.sin(aa) * L * .55, nx = -Math.sin(aa) * 26, ny = Math.cos(aa) * 26;
    o += `<path d="M${x},540 Q${f(mx + nx)},${f(my + ny - 14)} ${f(ex)},${f(ey)} Q${f(mx - nx)},${f(my - ny + 6)} ${x},540 Z" fill="${i % 2 ? '#3F7A3E' : '#5A964C'}"/>
      <path d="M${x},540 Q${f(mx)},${f(my - 4)} ${f(ex)},${f(ey)}" stroke="#2F5E30" stroke-width="1.4" fill="none" opacity=".6"/>`; });
  return o; }
function cuspArch(x0, x1, yBase, yTop, sw, op) {
  const n = 11, pts = [];
  for (let i = 0; i <= n; i++) { const u = i / n, x = x0 + (x1 - x0) * u, k = Math.sin(Math.PI * u);
    pts.push([x, yBase - (yBase - yTop) * Math.pow(k, .7) - (Math.abs(u - .5) < .05 ? 18 : 0)]); }
  let d = `M${x0},900 V${f(pts[0][1])}`;
  for (let i = 1; i <= n; i++) { const [px, py] = pts[i - 1], [qx, qy] = pts[i], r = Math.hypot(qx - px, qy - py) * .62; d += ` A${f(r)},${f(r)} 0 0 1 ${f(qx)},${f(qy)}`; }
  d += ` V900`;
  return `<path d="${d}" fill="none" stroke="#D9BC7E" stroke-width="${sw}" opacity="${op}"/>`;
}
const lamp = (x, y) => `<g transform="translate(${x},${y})"><path d="M-22,0 h44 l-6,-8 h-32 Z" fill="#C9A24A"/><rect x="-3" y="-70" width="6" height="62" fill="#D9BC7E"/>
  <circle cy="-40" r="7" fill="#C9A24A"/><path d="M-20,-70 Q0,-58 20,-70 L16,-76 Q0,-68 -16,-76 Z" fill="#C9A24A"/>
  ${[-14, 0, 14].map(dx => `<path class="flame" d="M${dx},-77 Q${dx - 3},-84 ${dx},-92 Q${dx + 3},-84 ${dx},-77 Z" fill="#FFC23D"/>`).join('')}
  <circle cy="-84" r="26" fill="#FFD27A" opacity=".18"/><path d="M-6,-100 q6,-12 12,0 q-6,6 -12,0 Z" fill="#C9A24A"/></g>`;
const MANDAP = `
<defs>
  <radialGradient id="mBg" cx=".5" cy=".55" r=".75"><stop offset="0" stop-color="#7E1E30"/><stop offset=".6" stop-color="#5A1222"/><stop offset="1" stop-color="#36080F"/></radialGradient>
  <radialGradient id="mGlow" cx=".5" cy=".62" r=".45"><stop offset="0" stop-color="#FFE7B0" stop-opacity=".55"/><stop offset="1" stop-color="#FFE7B0" stop-opacity="0"/></radialGradient>
</defs>
<rect width="400" height="900" fill="url(#mBg)"/>
<rect width="400" height="900" fill="url(#mGlow)"/>
${cuspArch(70, 330, 380, 150, 2.2, 1)}${cuspArch(86, 314, 382, 172, 1, .55)}
<rect x="52" y="340" width="20" height="560" fill="#7A1A2C" stroke="#C9A24A"/><rect x="328" y="340" width="20" height="560" fill="#7A1A2C" stroke="#C9A24A"/>
${[380, 460, 540, 620, 700, 780].map(y => `<path d="M52,${y} h20 M328,${y} h20" stroke="#C9A24A"/>`).join('')}
<g class="garlands">${[110, 140, 170, 230, 260, 290].map((x, i) => garland(x, 160 + Math.abs(200 - x) * .55, 120 + (i % 3) * 30, i % 2)).join('')}</g>
${thoranam(400, 70, 50)}
${banana(30, false)}${banana(370, true)}
${lamp(95, 880)}${lamp(305, 880)}
<path d="M90,900 L110,872 H290 L310,900 Z" fill="#4A0D1A" stroke="#C9A24A"/>`;

const KBAND = `<rect width="400" height="90" fill="#E7F0E6"/><path d="M0,62 Q100,48 200,58 Q300,46 400,56 V90 H0 Z" fill="#9CC3BC"/>${[20, 70, 130, 260, 330, 380].map((x, i) => palm(x, 64, 46 + (i % 2) * 10, i % 2 ? 6 : -5, .32, '#4E5B3E', '#2F6B46', '#4C8A5E')).join('')}<g transform="translate(150,74) scale(.5)"><path d="M-6,-4 Q70,10 150,-2 L160,-12 Q78,-2 -14,-14 Z" fill="#4A2D1C"/><path d="M4,-12 Q72,-58 148,-14 Z" fill="#C99A5A"/></g>`;
const ABAND = `<rect width="400" height="90" fill="#FCEBD2"/><g transform="translate(0,-8)">${gopuram(200, 98, .28)}${gopuram(90, 98, .18)}${gopuram(310, 98, .18)}</g><rect y="86" width="400" height="4" fill="#E9B980"/>${thoranam(400, 2, 14)}`;
window.SCENES = { KERALA, ANDHRA, MANDAP, KBAND, ABAND };
})();
