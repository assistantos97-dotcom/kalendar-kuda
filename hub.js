/* OT Hub shared shell: top bar (brand, menu, language, theme) + page head.
   Include right after <body> as: <header id="hub"></header><script src="hub.js"></script>
   <body data-page="board|calendar|plan|guide" data-help="guide.html#calendar">
   Language is stored in localStorage "kk-lang" (shared with every page), theme in "hub-theme". */
(function () {
  const H = {
    en: {
      tag: "Overtime Management", board: "Planning Board", calendar: "Horse Calendar", plan: "Plan vs Actual", guide: "User Guide",
      dark: "Dark", light: "Light", help: "How to use this page", foot: "OT Hub prototype. Data you enter stays in this browser.",
      t: {
        board: ["OT Planning <b>Board</b>", "Arrange OT for the whole month. Drag blocks between staff and days; public holidays and weekends are marked."],
        calendar: ["Horse <b>Calendar</b>", "Paste the roster from Excel and get a horse-style calendar PNG for each person."],
        plan: ["OT <b>Plan vs Actual</b>", "Paste the roster, key in actual OT hours, and compare hours and RM against the plan."],
        guide: ["User <b>Guide</b>", "Step-by-step instructions for the Horse Calendar and Plan vs Actual."]
      }
    },
    ms: {
      tag: "Pengurusan Kerja Lebih Masa", board: "Papan Perancangan", calendar: "Kalendar Kuda", plan: "Plan vs Actual", guide: "Panduan",
      dark: "Gelap", light: "Cerah", help: "Cara guna page ini", foot: "Prototaip OT Hub. Data yang diisi kekal dalam browser ini.",
      t: {
        board: ["Papan Perancangan <b>OT</b>", "Susun OT untuk sebulan penuh. Heret blok antara pekerja dan hari; cuti umum dan hujung minggu ditanda."],
        calendar: ["Kalendar <b>Kuda</b>", "Paste jadual dari Excel dan dapat kalendar kuda PNG untuk setiap orang."],
        plan: ["OT <b>Plan vs Actual</b>", "Paste jadual, isi jam OT sebenar, dan banding jam serta RM dengan plan."],
        guide: ["<b>Panduan</b> Pengguna", "Langkah demi langkah untuk Kalendar Kuda dan Plan vs Actual."]
      }
    }
  };
  const ls = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } };
  let lang = new URLSearchParams(location.search).get("lang") || ls("kk-lang") || "en";
  if (!H[lang]) lang = "en";
  ls("kk-lang", lang);
  let theme = ls("hub-theme") || "light";
  document.documentElement.dataset.theme = theme;

  const page = document.body.dataset.page || "board";
  const help = document.body.dataset.help || "";
  const NAV = [["board", "./"], ["calendar", "calendar.html"], ["plan", "ot.html"], ["guide", "guide.html"]];
  const el = document.getElementById("hub");
  el.innerHTML =
    `<div class="hub-bar"><div class="hub-in">
      <a class="hub-brand" href="./"><span class="hub-logo">OT</span><span class="hub-name">OT Hub<small id="hubTag"></small></span></a>
      <nav class="hub-nav" aria-label="Main">${NAV.map(([k, u]) => `<a href="${u}" data-k="${k}"${k === page ? ' class="on" aria-current="page"' : ""}></a>`).join("")}</nav>
      <div class="hub-tools">
        <div class="hub-seg" role="group" aria-label="Language"><button type="button" data-l="ms">BM</button><button type="button" data-l="en">EN</button></div>
        <button type="button" class="hub-theme" id="hubTheme"></button>
      </div></div></div>
    <div class="hub-head"><div class="hub-in"><div><p class="hub-crumb">OT Hub</p><h1 id="hubT"></h1><p class="sub" id="hubS"></p></div>
      ${help ? `<a class="hub-help" id="hubHelp" href="${help}"><span aria-hidden="true">?</span> <span id="hubHelpT"></span></a>` : ""}</div></div>`;

  function paint() {
    const L = H[lang];
    document.documentElement.lang = lang;
    document.getElementById("hubTag").textContent = L.tag;
    el.querySelectorAll(".hub-nav a").forEach(a => a.textContent = L[a.dataset.k]);
    el.querySelectorAll("[data-l]").forEach(b => b.classList.toggle("on", b.dataset.l === lang));
    document.getElementById("hubT").innerHTML = L.t[page][0];
    document.getElementById("hubS").textContent = L.t[page][1];
    const ht = document.getElementById("hubHelpT"); if (ht) ht.textContent = L.help;
    const tb = document.getElementById("hubTheme");
    tb.innerHTML = theme === "dark" ? `<span aria-hidden="true">☀</span> ${L.light}` : `<span aria-hidden="true">☾</span> ${L.dark}`;
    tb.setAttribute("aria-label", theme === "dark" ? L.light : L.dark);
    const f = document.getElementById("hubFoot"); if (f) f.textContent = L.foot;
  }
  el.querySelectorAll("[data-l]").forEach(b => b.addEventListener("click", () => {
    lang = b.dataset.l; ls("kk-lang", lang); paint();
    document.dispatchEvent(new CustomEvent("hub:lang", {detail: lang}));
  }));
  document.getElementById("hubTheme").addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark"; ls("hub-theme", theme);
    document.documentElement.dataset.theme = theme; paint();
    document.dispatchEvent(new CustomEvent("hub:theme", {detail: theme}));
  });
  window.HUB = {get lang() { return lang; }, get theme() { return theme; }};
  paint();
  document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("hubFoot")) { const f = document.createElement("footer"); f.className = "hub-foot"; f.id = "hubFoot"; document.body.append(f); }
    paint();
  });
})();
