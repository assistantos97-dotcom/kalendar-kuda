{
const IMG = window.KK_IMG || {};
const $ = id => document.getElementById(id);
const T = {
 ms: {title:'Kalendar Kuda <b>OT</b>', sub:'Paste jadual dari Excel → dapat kalendar kuda PNG untuk setiap orang.', h1:'1. Paste data Excel', ph:'Copy baris Fieldname / Shiftcode / WorkStatus / OT dari Excel, kemudian paste di sini',
  hint1:'Copy terus dari Excel (Ctrl+C), termasuk baris <b>Fieldname</b> yang ada tarikh. Boleh paste ramai orang sekali gus; setiap nama dapat kalendar sendiri. Lajur "Total OT (Hrs)" dipakai kalau ada.',
  go:'Jana kalendar',send:'Hantar ke Plan vs Actual',noSend:'Paste data Excel dulu.', sample:'Isi contoh', clear:'Kosongkan', h2:'2. Tetapan (cuti umum &amp; kiraan jam OT)', hint2:'Cuti umum: satu baris setiap tarikh, format <code>YYYY-MM-DD Nama</code>.', hint3:'Jam OT hanya dikira di sini kalau data tiada lajur Total.',
  lw:'OT hari kerja (jam)', lo:'OT hari OFF/REST (jam)', sop:'📘 SOP',
  nodata:"Tiada data dijumpai. Pastikan baris 'Fieldname' (dengan tarikh) dan baris Shiftcode / WorkStatus / OT turut di-copy.", dlfail:'Download dibatalkan. Tekan lama pada gambar untuk simpan.', save:'Atau tekan lama / klik kanan gambar → Save image.',
  done:(n,x)=>`Siap: ${n} kalendar (${x}).`, ph_hol:'Cuti Umum',
  c_title:'JADUAL KERJA & OT', c_total:'Jumlah OT', c_hrs:'Jam', c_leg:'Petunjuk:', c_l:['(Bekerja)','(Cuti)','(Rehat)','(Masa OT)'], c_time:'Masa OT:'},
 en: {title:'Horse Calendar <b>OT</b>', sub:'Paste your roster from Excel → get a horse-style calendar PNG for each person.', h1:'1. Paste Excel data', ph:'Copy the Fieldname / Shiftcode / WorkStatus / OT rows from Excel, then paste here',
  hint1:'Copy straight from Excel (Ctrl+C), including the <b>Fieldname</b> row with the dates. You can paste several people at once; each name gets its own calendar. The "Total OT (Hrs)" column is used when present.',
  go:'Generate calendar',send:'Send to Plan vs Actual',noSend:'Paste the Excel data first.', sample:'Load example', clear:'Clear', h2:'2. Settings (public holidays &amp; OT hours)', hint2:'Public holidays: one line per date, format <code>YYYY-MM-DD Name</code>.', hint3:'OT hours are only calculated here when the data has no Total column.',
  lw:'OT on work day (hrs)', lo:'OT on OFF/REST day (hrs)', sop:'📘 SOP',
  nodata:"No data found. Make sure the 'Fieldname' row (with dates) and the Shiftcode / WorkStatus / OT rows are copied too.", dlfail:'Download cancelled. Long-press the image to save it.', save:'Or long-press / right-click the image → Save image.',
  done:(n,x)=>`Done: ${n} calendar(s) (${x}).`, ph_hol:'Public Holiday',
  c_title:'WORK & OT SCHEDULE', c_total:'Total OT', c_hrs:'Hrs', c_leg:'Legend:', c_l:['(Working)','(Off day)','(Rest day)','(OT hours)'], c_time:'OT Time:'}
};
let LANG = 'ms';
try { LANG = new URLSearchParams(location.search).get('lang') || localStorage.getItem('kk-lang') || 'en'; } catch (e) {}
if (!T[LANG]) LANG = 'en';
let L = T[LANG];
function applyLang() {
  L = T[LANG]; document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i]').forEach(e => { e.innerHTML = L[e.dataset.i]; });
  document.querySelectorAll('[data-ph]').forEach(e => { e.placeholder = L[e.dataset.ph]; });
  document.querySelectorAll('[data-l]').forEach(b => b.classList.toggle('on', b.dataset.l === LANG));
}

const imgs = {};
const ready = Promise.all(Object.entries(IMG).map(([k, src]) => new Promise(r => {
  const i = new Image(); i.onload = () => { imgs[k] = i; r(); }; i.onerror = r; i.src = src;
})));

const SAMPLE = "Fieldname\tName\t2026-12-01\t2026-12-02\t2026-12-03\t2026-12-04\t2026-12-05\t2026-12-06\t2026-12-07\t2026-12-08\t2026-12-09\t2026-12-10\t2026-12-11\t2026-12-12\t2026-12-13\t2026-12-14\t2026-12-15\t2026-12-16\t2026-12-17\t2026-12-18\t2026-12-19\t2026-12-20\t2026-12-21\t2026-12-22\t2026-12-23\t2026-12-24\t2026-12-25\t2026-12-26\t2026-12-27\t2026-12-28\t2026-12-29\t2026-12-30\t2026-12-31\tTotal OT (Hrs)\nShiftcode\tAli\tM001-new\tM001-new\tM001-new\tM001-new\tOFF\tREST\tM001-new\tM001-new\tM001-new\tM001-new\tM001-new\tOFF\tREST\tM001-new\tM001-new\tM001-new\tM001-new\tM001-new\tOFF\tREST\tM001-new\tM001-new\tM001-new\tM001-new\tM001-new\tOFF\tREST\tM001-new\tM001-new\tM001-new\tM001-new\t\nWorkStatus\tAli\tW\tW\tW\tW\tO\tR\tW\tW\tW\tW\tW\tO\tR\tW\tW\tW\tW\tW\tO\tR\tW\tW\tW\tW\tW\tO\tR\tW\tW\tW\tW\t\nOT\tAli\t20:00\t20:00\t20:00\t\t\t\t\t\t\t\t\t17:00\t\t\t20:00\t20:00\t20:00\t\t\t\t\t20:00\t20:00\t20:00\t\t17:00\t\t\t20:00\t20:00\t20:00\t61\nFieldname\tName\t2026-12-01\t2026-12-02\t2026-12-03\t2026-12-04\t2026-12-05\t2026-12-06\t2026-12-07\t2026-12-08\t2026-12-09\t2026-12-10\t2026-12-11\t2026-12-12\t2026-12-13\t2026-12-14\t2026-12-15\t2026-12-16\t2026-12-17\t2026-12-18\t2026-12-19\t2026-12-20\t2026-12-21\t2026-12-22\t2026-12-23\t2026-12-24\t2026-12-25\t2026-12-26\t2026-12-27\t2026-12-28\t2026-12-29\t2026-12-30\t2026-12-31\tTotal OT (Hrs)\nShiftcode\tAbu\tM001-new\tM001-new\tM001-new\tM001-new\tOFF\tREST\tM001-new\tM001-new\tM001-new\tM001-new\tM001-new\tOFF\tREST\tM001-new\tM001-new\tM001-new\tM001-new\tM001-new\tOFF\tREST\tM001-new\tM001-new\tM001-new\tM001-new\tM001-new\tOFF\tREST\tM001-new\tM001-new\tM001-new\tM001-new\t\nWorkStatus\tAbu\tW\tW\tW\tW\tO\tR\tW\tW\tW\tW\tW\tO\tR\tW\tW\tW\tW\tW\tO\tR\tW\tW\tW\tW\tW\tO\tR\tW\tW\tW\tW\t\nOT\tAbu\t\t20:00\t20:00\t\t\t\t20:00\t\t20:00\t20:00\t\t17:00\t\t20:00\t\t20:00\t20:00\t\t17:00\t\t20:00\t\t20:00\t20:00\t\t\t\t\t\t20:00\t20:00\t";
const SANS = '"Arial Black","Segoe UI Black","Noto Sans SC","Microsoft YaHei",system-ui,sans-serif';
const BOLD = '"Segoe UI","Noto Sans SC","Microsoft YaHei",system-ui,sans-serif';
const SERIF = 'Georgia,"Times New Roman","Noto Serif SC",serif';
const MS = ["JANUARI","FEBRUARI","MAC","APRIL","MEI","JUN","JULAI","OGOS","SEPTEMBER","OKTOBER","NOVEMBER","DISEMBER"];
const EN = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
const CND = ["初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十"];
const DAYS = [["星期日","AHAD","SUN","#fde9c8","#d7141a"],["星期一","ISNIN","MON","#c9f5c0","#111"],["星期二","SELASA","TUE","#8fd3f5","#111"],["星期三","RABU","WED","#c9a6f0","#111"],["星期四","KHAMIS","THU","#f5a6e6","#111"],["星期五","JUMAAT","FRI","#fbc39c","#111"],["星期六","SABTU","SAT","#c9a6f0","#111"]];

let lunarFmt = null;
try { lunarFmt = new Intl.DateTimeFormat("zh-u-ca-chinese", {month: "long", day: "numeric"}); } catch (e) {}
function lunar(y, m, d) {
  if (!lunarFmt) return "";
  try {
    const p = lunarFmt.formatToParts(new Date(y, m, d, 12));
    let day = (p.find(x => x.type === "day") || {}).value || "";
    const mon = ((p.find(x => x.type === "month") || {}).value || "").replace(/^闰/, "");
    let n = /^\d+$/.test(day) ? +day : CND.indexOf(day) + 1;
    if (n < 1) return "";
    if (n === 1) return mon.length >= 2 ? mon.slice(0, 3) : CND[0];
    return CND[n - 1];
  } catch (e) { return ""; }
}

// ---------- parse ----------
function parse(text) {
  // 1) group lines into blocks: a Fieldname header + its data rows
  const blocks = [];
  for (const raw of text.split(/\r?\n/)) {
    if (!raw.trim()) continue;
    let c = (raw.includes("\t") ? raw.split("\t") : raw.trim().split(/\s{2,}/)).map(v => (v || "").trim());
    // the row label may not be in the first column (e.g. an "ID Number" column before it)
    const KEYS = ["fieldname", "shiftcode", "workstatus", "ot"];
    const norm = v => (v || "").toLowerCase().replace(/\s+/g, "");
    let ki = c.findIndex((v, i) => i < 8 && KEYS.includes(norm(v)));
    if (ki < 0) continue;
    c = c.slice(ki);
    const key = norm(c[0]);
    if (key === "fieldname") {
      const dates = {}; let total = -1, nameCol = -1;
      c.forEach((v, i) => { const m = v.match(/(\d{4})-(\d{1,2})-(\d{1,2})/); if (m) dates[i] = [+m[1], +m[2] - 1, +m[3]]; else if (/total/i.test(v)) total = i; else if (/^name$/i.test(v) && nameCol < 0) nameCol = i; });
      if (Object.keys(dates).length) blocks.push({c, dates, total, nameCol, rows: []});
      continue;
    }
    if (blocks.length && ["shiftcode", "workstatus", "ot"].includes(key)) blocks[blocks.length - 1].rows.push({key, c});
  }
  // 2) per block, find the column shift caused by hidden/extra columns (e.g. row numbers 1,2,3)
  const people = {}; const order = []; let lastName = "";
  for (const B of blocks) {
    const idx = Object.keys(B.dates).map(Number);
    const d0 = Math.min(...idx);
    const ws = B.rows.find(r => r.key === "workstatus");
    const lenOff = B.rows.length ? Math.max(0, B.rows[0].c.length - B.c.length) : 0;
    let off = lenOff;
    if (ws) {
      let best = -1;
      for (let o = 0; o <= 6; o++) {
        let sc = 0; for (const i of idx) if (/^[A-Za-z]{1,3}$/.test(ws.c[i + o] || "")) sc++;
        if (sc > best || (sc === best && o === lenOff)) { best = sc; off = o; }
      }
    }
    const nameOf = c => {
      if (B.nameCol >= 0) { const v = c[B.nameCol + off] || ""; if (v && !/^\d+$/.test(v)) return v; }
      for (let i = 1; i < d0 + off; i++) { const v = c[i] || ""; if (v && !/^[\d.]+$/.test(v)) return v; }
      return "";
    };
    let bName = "";
    for (const R of B.rows) { const n = nameOf(R.c); if (n) { bName = n; break; } }
    for (const R of B.rows) {
      const nm = nameOf(R.c) || bName || lastName;
      if (!nm) continue;
      lastName = nm;
      if (!people[nm]) { people[nm] = {name: nm, days: {}, total: null}; order.push(nm); }
      const P = people[nm];
      for (const [i, dt] of Object.entries(B.dates)) {
        const k = dt.join("-");
        const v = R.c[+i + off] || "";
        const D = P.days[k] || (P.days[k] = {dt, shift: "", ws: "", ot: ""});
        if (R.key === "shiftcode") D.shift = v;
        else if (R.key === "workstatus") D.ws = v.toUpperCase();
        else D.ot = /^\d{1,2}[:.]\d{2}$/.test(v) ? v.replace(".", ":").padStart(5, "0") : "";
      }
      if (R.key === "ot" && B.total >= 0) {
        const t = parseFloat((R.c[B.total + off] || "").replace(",", "."));
        if (!isNaN(t)) P.total = (P.total || 0) + t;
      }
    }
  }
  return order.map(n => people[n]);
}
function statusOf(D) {
  const s = (D.shift || "").toUpperCase();
  if (D.ws === "O" || s === "OFF") return "O";
  if (D.ws === "R" || s === "REST") return "R";
  // empty Saturday/Sunday = day off (Sat OFF, Sun REST)
  if (!D.ws && !s && D.dt) { const wd = new Date(D.dt[0], D.dt[1], D.dt[2]).getDay(); if (wd === 6) return "O"; if (wd === 0) return "R"; }
  return "W";
}
function holidays() {
  const h = {};
  for (const l of $("hol").value.split(/\r?\n/)) {
    const m = l.match(/(\d{4})-(\d{1,2})-(\d{1,2})\s*(.*)/);
    if (m) h[[+m[1], +m[2] - 1, +m[3]].join("-")] = m[4].trim() || L.ph_hol;
  }
  return h;
}

// ---------- draw ----------
function rr(g, x, y, w, h, r, fill, stroke, lw) {
  g.beginPath(); g.roundRect(x, y, w, h, r);
  if (fill) { g.fillStyle = fill; g.fill(); }
  if (stroke) { g.lineWidth = lw || 2; g.strokeStyle = stroke; g.stroke(); }
}
function txt(g, t, x, y, font, color, align) {
  g.font = font; g.fillStyle = color; g.textAlign = align || "center"; g.textBaseline = "middle"; g.fillText(t, x, y);
}
function fit(g, t, maxW, size, fam, weight) {
  let s = size; g.font = `${weight} ${s}px ${fam}`;
  while (g.measureText(t).width > maxW && s > 10) { s -= 1; g.font = `${weight} ${s}px ${fam}`; }
  return `${weight} ${s}px ${fam}`;
}
function pill(g, x, y, w, h, fill, t, size, color) {
  rr(g, x, y, w, h, h / 2.4, fill);
  txt(g, t, x + w / 2, y + h / 2 + 1, fit(g, t, w - 10, size, SANS, 900), color || "#111");
}
function soft(g, im, x, y) {
  if (!im) return;
  g.save(); rr(g, x, y, im.width, im.height, 12); g.clip(); g.drawImage(im, x, y); g.restore();
}

function draw(P, hol, hW, hO) {
  const keys = Object.keys(P.days);
  const first = P.days[keys[0]].dt;
  const Y = first[0], M = first[1];
  const nd = new Date(Y, M + 1, 0).getDate();
  const start = new Date(Y, M, 1).getDay();
  const ncol = Math.ceil((start + nd) / 7);
  let total = P.total, ot20 = 0, otOff = 0;
  const times = new Set();
  for (const D of Object.values(P.days)) {
    if (!D.ot) continue; times.add(D.ot);
    if (statusOf(D) === "W") ot20++; else otOff++;
  }
  if (total == null) total = ot20 * hW + otOff * hO;
  const totTxt = (Math.round(total * 10) / 10).toString();

  const W = 1200, rh = 146, gap = 4, top = 152, lab = 182;
  const H = top + 7 * (rh + gap) + 130;
  const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
  const g = cv.getContext("2d");
  g.fillStyle = "#fff"; g.fillRect(0, 0, W, H);

  // header
  rr(g, 6, 8, 884, 128, 18, "#011c56");
  soft(g, imgs.hdr, 16, 20);
  txt(g, L.c_title, 300, 42, fit(g, L.c_title, 290, 28, SANS, 900), "#fff");
  txt(g, P.name.toUpperCase(), 296, 96, fit(g, P.name.toUpperCase(), 300, 58, SANS, 900), "#ffe61a");
  g.fillStyle = "#fff"; g.fillRect(456, 22, 4, 102);
  rr(g, 474, 20, 410, 106, 18, "#c8101e", "#ffd24a", 3);
  txt(g, String(M + 1), 540, 75, fit(g, String(M + 1), 110, 88, SANS, 900), "#fff");
  txt(g, `${(LANG==="en"?EN:MS)[M]} ${Y}`, 742, 50, fit(g, `${(LANG==="en"?EN:MS)[M]} ${Y}`, 260, 32, SERIF, 900), "#fff");
  rr(g, 604, 76, 274, 40, 20, "#ffd21a");
  txt(g, `${(LANG==="en"?MS:EN)[M]} ${Y}`, 741, 97, fit(g, `${(LANG==="en"?MS:EN)[M]} ${Y}`, 250, 26, SANS, 900), "#111");
  rr(g, 900, 8, W - 906, 128, 18, "#dcecfb", "#9cc3ec", 3);
  txt(g, `${L.c_total} (${P.name})`, 1047, 38, fit(g, `${L.c_total} (${P.name})`, 270, 26, BOLD, 700), "#0b2a6f");
  g.font = `900 64px ${SANS}`; const nw = g.measureText(totTxt).width;
  g.font = `900 48px ${SANS}`; const jw = g.measureText(L.c_hrs).width;
  const sx = 1047 - (nw + 12 + jw) / 2;
  txt(g, totTxt, sx, 98, `900 64px ${SANS}`, "#d7141a", "left");
  txt(g, L.c_hrs, sx + nw + 12, 100, `900 48px ${SANS}`, "#111", "left");

  // grid
  const gx0 = 6 + lab + gap;
  const cw = (W - 6 - gx0 - gap * (ncol - 1)) / ncol;
  let emptyLast = null;
  DAYS.forEach(([cn, my, en, bg, fg], r) => {
    const y = top + r * (rh + gap);
    rr(g, 6, y, lab, rh, 16, bg, "#444", 2);
    const cx = 6 + lab / 2;
    txt(g, cn, cx, y + 28, `900 26px ${SANS}`, fg);
    txt(g, my, cx, y + 68, fit(g, my, lab - 16, 30, SANS, 900), fg);
    txt(g, en, cx, y + 112, `900 48px ${SANS}`, fg);
    for (let c = 0; c < ncol; c++) {
      const x = gx0 + c * (cw + gap);
      const day = c * 7 + r - start + 1;
      if (day < 1 || day > nd) {
        rr(g, x, y, cw, rh, 16, "#fff", "#444", 2);
        if (day > nd) emptyLast = [x, y];
        continue;
      }
      const k = [Y, M, day].join("-");
      const D = P.days[k] || {shift: "", ws: "", ot: "", none: 1};
      const st = statusOf(D), ot = D.ot, off = st !== "W";
      const hn = hol[k];
      rr(g, x, y, cw, rh, 16, D.none ? "#f1f1f1" : (st === "O") ? "#fde0e6" : "#fff200", hn ? "#d7141a" : "#444", hn ? 5 : 2);
      const lu = lunar(Y, M, day);
      [...lu].forEach((ch, i) => txt(g, ch, x + 16, y + 26 + 26 * i, `900 21px ${SANS}`, "#111", "left"));
      if (r === 0 && imgs.sun) {
        soft(g, imgs.sun, x + cw - imgs.sun.width - 4, y + 4);
        txt(g, String(day), x + 76, y + 70, `900 50px ${SERIF}`, "#c8101e");
      } else {
        txt(g, String(day), x + cw / 2 + 12, y + 52, `900 58px ${SERIF}`, "#c8101e");
      }
      if (hn) txt(g, hn, x + cw - 10, y + 16, fit(g, hn, cw - 60, 15, BOLD, 700), "#d7141a", "right");
      const px = x + 22, pw = cw - 44;
      const lbl = st === "W" ? "W" : st === "O" ? "OFF" : "REST";
      const col = st === "W" ? "#2fd23a" : st === "O" ? "#f78c98" : "#fbe7a8";
      if (D.none) {
        // date outside the pasted data: show date only
      } else if (ot) {
        pill(g, px + 10, y + 82, pw - 20, 28, col, lbl, 22);
        pill(g, px - 6, y + 112, pw + 12, 28, "#b8e2fb", `OT ${ot}`, 24);
      } else {
        pill(g, px, y + 96, pw, 38, col, lbl, st === "W" ? 32 : 28);
      }
    }
  });
  if (emptyLast && imgs.big) {
    const [x, y] = emptyLast;
    soft(g, imgs.big, x + (cw - imgs.big.width) / 2, y + (rh - imgs.big.height) / 2);
  }

  // footer
  const fy = top + 7 * (rh + gap) + 10, fb = H - 8;
  rr(g, 6, fy, 934, fb - fy, 18, "#011c56");
  txt(g, L.c_leg, 95, (fy + fb) / 2, `900 28px ${SANS}`, "#fff");
  rr(g, 180, fy + 8, 750, fb - fy - 16, 14, "#fff");
  let lx = 192;
  for (const [a, b, bg] of [["W = Work", L.c_l[0], "#a9f0a0"], ["OFF = Off", L.c_l[1], "#fbc9d0"], ["REST = Rest", L.c_l[2], "#fbf07a"], ["OT = Overtime", L.c_l[3], "#b8e2fb"]]) {
    g.font = `900 22px ${SANS}`; const w = Math.max(g.measureText(a).width, 90) + 26;
    rr(g, lx, fy + 16, w, fb - fy - 32, 12, bg);
    txt(g, a, lx + w / 2, fy + 42, `900 22px ${SANS}`, "#111");
    txt(g, b, lx + w / 2, fb - 40, `700 19px ${BOLD}`, "#333");
    lx += w + 10;
  }
  rr(g, 954, fy, W - 960, fb - fy, 18, "#dcecfb", "#9cc3ec", 3);
  txt(g, L.c_time, 1077, fy + 34, `900 26px ${SANS}`, "#111");
  const tl = [...times].sort().join(" / ") || "-";
  txt(g, tl, 1077, fy + 78, fit(g, tl, 220, 30, SANS, 900), "#0b2a6f");
  return {cv, Y, M};
}

// ---------- UI ----------
let downloads = null;
if (window.claude && window.claude.use) claude.use("downloads").then(d => { downloads = d;  }).catch(() => {});

async function run() {
  const msg = $("msg"); msg.className = ""; msg.textContent = "";
  const out = $("out"); out.textContent = "";
  try { localStorage.setItem("kk-src", $("src").value); localStorage.setItem("kk-hol", $("hol").value); } catch (e) {}
  const people = parse($("src").value).filter(p => Object.keys(p.days).length);
  if (!people.length) {
    msg.className = "err";
    msg.textContent = L.nodata;
    return;
  }
  await ready;
  const hol = holidays(), hW = +$("hW").value || 0, hO = +$("hO").value || 0;
  const cals = [];
  for (const p of people) {
    const by = {};
    for (const [k, D] of Object.entries(p.days)) { const mk = D.dt[0] * 12 + D.dt[1]; (by[mk] || (by[mk] = {})); by[mk][k] = D; }
    const mks = Object.keys(by).map(Number).sort((a, b) => a - b);
    // one month: keep sheet Total; several months: total per month from settings
    for (const mk of mks) cals.push({...p, days: by[mk], total: mks.length > 1 ? null : p.total});
  }
  for (const p of cals) {
    const {cv, Y, M} = draw(p, hol, hW, hO);
    const url = cv.toDataURL("image/png");
    const fname = `OT_${p.name.replace(/\s+/g, "_")}_${EN[M]}_${Y}.png`;
    const box = document.createElement("div"); box.className = "cal";
    const h = document.createElement("h3"); h.textContent = `${p.name} · ${(LANG==="en"?EN:MS)[M]} ${Y}`; box.append(h);
    const img = document.createElement("img"); img.src = url; img.alt = `OT ${p.name}`; box.append(img);
    const row = document.createElement("div"); row.className = "row";
    const b = document.createElement("button"); b.className = "dl"; b.textContent = "Download PNG"; b.hidden = false;
    b.onclick = () => cv.toBlob(async bl => {
      try {
        if (downloads) await downloads.save({filename: fname, data: bl});
        else { const a = document.createElement("a"); a.href = URL.createObjectURL(bl); a.download = fname; document.body.append(a); a.click(); a.remove(); }
      } catch (e) { msg.textContent = L.dlfail; }
    }, "image/png");
    const hint = document.createElement("span"); hint.className = "hint"; hint.textContent = L.save;
    row.append(b, hint); box.append(row); out.append(box);
  }
  msg.textContent = L.done(cals.length, people.map(p => p.name).join(", "));
}

document.querySelectorAll('[data-l]').forEach(b => b.onclick = () => { LANG = b.dataset.l; try { localStorage.setItem('kk-lang', LANG); } catch (e) {} applyLang(); if ($("out").children.length) run(); });
applyLang();
$("go").onclick = run;
$("sample").onclick = () => { $("src").value = SAMPLE; run(); };
$("send").onclick = () => {
  const v = $("src").value;
  if (!v.trim()) { $("msg").className = "err"; $("msg").textContent = L.noSend; return; }
  try { localStorage.setItem("ot:f:src", JSON.stringify(v)); localStorage.removeItem("ot:f:from"); localStorage.removeItem("ot:f:to"); } catch (e) {}
  location.href = "ot.html?lang=" + LANG;
};
$("clear").onclick = () => { $("src").value = ""; $("out").textContent = ""; $("msg").textContent = ""; };
try {
  const s = localStorage.getItem("kk-src"), h = localStorage.getItem("kk-hol");
  if (h) $("hol").value = h;
  $("src").value = s || SAMPLE;
} catch (e) { $("src").value = SAMPLE; }
run();
}
