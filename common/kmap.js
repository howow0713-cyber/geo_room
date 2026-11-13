/* 시도 단계구분도·위치도 (korea-sido.js 필요)
   KMap.choropleth(요소, 설정)  : 시도별 통계를 색으로 + 순위 막대
   KMap.points(요소, 설정)      : 지점을 층(layer)별로 표시 + 이름 숨기기(빈 지도 활동용) */
(function () {
  var G = window.KOREA_SIDO, NS = "http://www.w3.org/2000/svg";
  var FULL = { 서울: "서울특별시", 부산: "부산광역시", 대구: "대구광역시", 인천: "인천광역시", 광주: "광주광역시", 대전: "대전광역시", 울산: "울산광역시", 세종: "세종특별자치시", 경기: "경기도", 강원: "강원특별자치도", 충북: "충청북도", 충남: "충청남도", 전북: "전북특별자치도", 전남: "전라남도", 경북: "경상북도", 경남: "경상남도", 제주: "제주특별자치도", 전남광주: "전남광주통합특별시" };
  // 지도 위 이름표 위치 보정 (1000폭 좌표)
  var NUDGE = { 서울: [-6, -18], 인천: [-34, 10], 경기: [34, 44], 대전: [-4, 2], 세종: [-26, -8], 충남: [-20, 10], 광주: [-24, 0], 전남: [-20, 30], 대구: [0, 0], 울산: [16, 0], 부산: [14, 10], 경남: [-30, 0], 경북: [20, -10], 강원: [10, 0], 충북: [-10, 10], 전북: [0, 0], 제주: [0, 0] };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  function el(tag, attrs, parent) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  // 울릉도·독도는 오른쪽 위 작은 상자 안으로 옮겨 그림 (islandDx만큼 이동)
  function proj(lat, lon) { var p = G.proj; return [(lon - p.minx) * p.k * p.s + (lon > p.islandLon ? p.islandDx : 0), (p.maxy - lat) * p.s]; }
  function keyOf(short, merge) { return merge && (short === "광주" || short === "전남") ? "전남광주" : short; }
  function baseSvg(box, view) {
    if (view) {  // 확대 지도: view = {lon:[서,동], lat:[남,북]}
      var a = proj(view.lat[1], view.lon[0]), b = proj(view.lat[0], view.lon[1]);
      var svgZ = el("svg", { viewBox: a[0] + " " + a[1] + " " + (b[0] - a[0]) + " " + (b[1] - a[1]), class: "kmap-svg zoomed", role: "img" });
      svgZ.style.setProperty("--z", 885 / (b[0] - a[0]));
      box.appendChild(svgZ); return svgZ;
    }
    var svg = el("svg", { viewBox: "0 0 885 " + G.h, class: "kmap-svg", role: "img" });
    el("rect", { x: 698, y: 168, width: 182, height: 104, rx: 4, class: "kmap-inset" }, svg);
    var t = el("text", { x: 706, y: 190, class: "kmap-inset-label" }, svg); t.textContent = "울릉도·독도";
    box.appendChild(svg); return svg;
  }
  function source(cfg) {
    if (!cfg.source) return "";
    return '<p class="kmap-source">자료: ' + (cfg.source.url ? '<a href="' + esc(cfg.source.url) + '" target="_blank" rel="noopener">' + esc(cfg.source.text) + "</a>" : esc(cfg.source.text)) + (cfg.note ? " · " + esc(cfg.note) : "") + "</p>";
  }

  function choropleth(root, cfg) {
    var fmt = cfg.format || function (v) { return v.toLocaleString("ko-KR"); };
    var keys = Object.keys(cfg.data), vals = keys.map(function (k) { return cfg.data[k]; });
    var breaks = cfg.breaks;
    if (!breaks) { var s = vals.slice().sort(function (a, b) { return a - b; }); breaks = [1, 2, 3, 4].map(function (i) { return s[Math.round(i * (s.length - 1) / 5)]; }); }
    var cls = function (v) { var c = 0; while (c < breaks.length && v >= breaks[c]) c++; return c; };
    root.classList.add("kmap");
    root.innerHTML = '<div class="kmap-grid"><div class="kmap-map"></div><div class="kmap-side"></div></div>' + source(cfg);
    var mapBox = root.querySelector(".kmap-map"), side = root.querySelector(".kmap-side");
    var svg = baseSvg(mapBox);
    svg.setAttribute("aria-label", cfg.title || "시도별 통계 지도");
    var tip = document.createElement("div"); tip.className = "kmap-tip"; tip.hidden = true; mapBox.appendChild(tip);
    var paths = {};
    G.regions.forEach(function (r) {
      var k = keyOf(r.short, cfg.merge), v = cfg.data[k];
      var c = "kmap-region c" + (v == null ? "x" : cls(v));
      var p = el("path", { d: r.d, class: c, "data-k": k, tabindex: 0 }, svg);
      (paths[k] = paths[k] || []).push(p);
      if (r.isl) paths[k].push(el("path", { d: r.isl, class: c, "data-k": k, transform: "translate(" + G.proj.islandDx + ",0)" }, svg));
    });
    if (cfg.merge) {  // 통합 전 광주·전남 경계는 점선으로
      var gj = G.regions.filter(function (r) { return r.short === "광주"; })[0];
      if (gj) el("path", { d: gj.d, class: "kmap-oldline" }, svg);
    }
    var hi = el("g", { class: "kmap-hi" }, svg);
    var lab = el("g", { class: "kmap-labels" }, svg);
    G.regions.forEach(function (r) {
      var k = keyOf(r.short, cfg.merge);
      if (cfg.merge && r.short === "광주") return;
      var n = NUDGE[r.short] || [0, 0], x = r.cx + n[0], y = r.cy + n[1];
      if (cfg.merge && r.short === "전남") { x += 8; y -= 4; }
      var t = el("text", { x: x, y: y, "text-anchor": "middle" }, lab);
      t.textContent = cfg.merge && r.short === "전남" ? "전남광주" : r.short;
      if (cfg.data[k] != null && cfg.labelValues !== false) { var t2 = el("text", { x: x, y: y + 24, "text-anchor": "middle", class: "v" }, lab); t2.textContent = (cfg.shortFormat || fmt)(cfg.data[k]); }
    });
    // 범례 + 순위
    var colors = breaks.length + 1, legend = "";
    for (var i = 0; i < colors; i++) {
      var lo = i === 0 ? null : breaks[i - 1], hiV = i === breaks.length ? null : breaks[i];
      legend += '<li><span class="sw c' + i + '"></span>' + (lo == null ? fmt(hiV) + " 미만" : hiV == null ? fmt(lo) + " 이상" : fmt(lo) + " ~ " + fmt(hiV)) + "</li>";
    }
    var sorted = keys.slice().sort(function (a, b) { return cfg.data[b] - cfg.data[a]; });
    var max = Math.max.apply(null, vals);
    side.innerHTML = '<div class="kmap-head"><strong>' + esc(cfg.title) + "</strong>" + (cfg.unit ? '<span>단위: ' + esc(cfg.unit) + "</span>" : "") + "</div>" +
      '<ul class="kmap-legend">' + legend + "</ul>" +
      (cfg.highlight ? '<button type="button" class="kmap-btn" aria-pressed="false">' + esc(cfg.highlight.label) + " 강조</button>" : "") +
      '<ol class="kmap-rank">' + sorted.map(function (k, i) {
        var v = cfg.data[k];
        return '<li data-k="' + esc(k) + '"><span class="r">' + (i + 1) + '</span><span class="n">' + esc(k) + '</span><span class="bar"><i class="c' + cls(v) + '" style="width:' + Math.max(2, v / max * 100).toFixed(1) + '%"></i></span><span class="v">' + fmt(v) + "</span></li>";
      }).join("") + "</ol>" + (cfg.avg != null ? '<p class="kmap-avg">' + esc(cfg.avgLabel || "전국") + " " + fmt(cfg.avg) + "</p>" : "");
    function focus(k, on, evt) {
      (paths[k] || []).forEach(function (p) { p.classList.toggle("on", on); if (on) svg.insertBefore(p, hi); });
      side.querySelectorAll('.kmap-rank li[data-k="' + k + '"]').forEach(function (li) { li.classList.toggle("on", on); });
      if (on) {
        var rank = sorted.indexOf(k) + 1;
        tip.innerHTML = "<b>" + esc(FULL[k] || k) + "</b><br>" + fmt(cfg.data[k]) + (cfg.unit ? " " + esc(cfg.unit) : "") + ' <span>(' + rank + "위 / " + sorted.length + ")</span>";
        tip.hidden = false;
        var b = mapBox.getBoundingClientRect(), pb = paths[k][paths[k].length - 1].getBoundingClientRect();
        var x = evt && evt.clientX ? evt.clientX - b.left : pb.left - b.left + pb.width / 2, y = evt && evt.clientY ? evt.clientY - b.top : pb.top - b.top;
        tip.style.left = Math.min(Math.max(x, 70), b.width - 70) + "px"; tip.style.top = Math.max(y - 12, 30) + "px";
      } else tip.hidden = true;
    }
    svg.addEventListener("pointermove", function (e) { var k = e.target.getAttribute && e.target.getAttribute("data-k"); svg.querySelectorAll(".on").forEach(function (p) { if (p.getAttribute("data-k") !== k) p.classList.remove("on"); }); side.querySelectorAll("li.on").forEach(function (li) { if (li.dataset.k !== k) li.classList.remove("on"); }); if (k && cfg.data[k] != null) focus(k, true, e); else tip.hidden = true; });
    svg.addEventListener("pointerleave", function () { svg.querySelectorAll(".on").forEach(function (p) { p.classList.remove("on"); }); side.querySelectorAll("li.on").forEach(function (li) { li.classList.remove("on"); }); tip.hidden = true; });
    svg.addEventListener("focusin", function (e) { var k = e.target.getAttribute("data-k"); if (cfg.data[k] != null) focus(k, true); });
    svg.addEventListener("focusout", function (e) { focus(e.target.getAttribute("data-k"), false); });
    side.querySelectorAll(".kmap-rank li").forEach(function (li) {
      li.addEventListener("pointerenter", function () { focus(li.dataset.k, true); });
      li.addEventListener("pointerleave", function () { focus(li.dataset.k, false); });
    });
    if (cfg.highlight) {
      var btn = side.querySelector(".kmap-btn");
      btn.addEventListener("click", function () {
        var on = btn.getAttribute("aria-pressed") !== "true";
        btn.setAttribute("aria-pressed", on);
        root.classList.toggle("dim", on);
        cfg.highlight.keys.forEach(function (k) { (paths[k] || []).forEach(function (p) { p.classList.toggle("keep", on); }); });
        side.querySelectorAll(".kmap-rank li").forEach(function (li) { li.classList.toggle("keep", on && cfg.highlight.keys.indexOf(li.dataset.k) > -1); });
        var box = root.querySelector(".kmap-hl-note");
        if (on && cfg.highlight.note) { if (!box) { box = document.createElement("p"); box.className = "kmap-hl-note"; side.insertBefore(box, side.querySelector(".kmap-rank")); } box.textContent = cfg.highlight.note; }
        else if (box) box.remove();
      });
    }
  }

  var SHAPES = {
    circle: function (g, x, y, r) { return el("circle", { cx: x, cy: y, r: r }, g); },
    square: function (g, x, y, r) { return el("rect", { x: x - r * .9, y: y - r * .9, width: r * 1.8, height: r * 1.8, rx: 2 }, g); },
    diamond: function (g, x, y, r) { return el("path", { d: "M" + x + "," + (y - r * 1.25) + "L" + (x + r * 1.25) + "," + y + "L" + x + "," + (y + r * 1.25) + "L" + (x - r * 1.25) + "," + y + "Z" }, g); },
    triangle: function (g, x, y, r) { return el("path", { d: "M" + x + "," + (y - r * 1.3) + "L" + (x + r * 1.2) + "," + (y + r * .8) + "L" + (x - r * 1.2) + "," + (y + r * .8) + "Z" }, g); },
    star: function (g, x, y, r) { var d = ""; for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .6 : r * 1.5; d += (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + "," + (y + rr * Math.sin(a)).toFixed(1); } return el("path", { d: d + "Z" }, g); }
  };

  function points(root, cfg) {
    root.classList.add("kmap", "kmap-points");
    root.innerHTML = '<div class="kmap-grid"><div class="kmap-map"></div><div class="kmap-side"></div></div>' + source(cfg);
    var mapBox = root.querySelector(".kmap-map"), side = root.querySelector(".kmap-side");
    var svg = baseSvg(mapBox, cfg.view), z = cfg.view ? parseFloat(svg.style.getPropertyValue("--z")) : 1;
    svg.setAttribute("aria-label", cfg.title || "위치 지도");
    G.regions.forEach(function (r) {
      var cl = "kmap-base" + (cfg.regionHighlight && cfg.regionHighlight.keys.indexOf(r.short) > -1 ? " rh" : "");
      el("path", { d: r.d, class: cl, "vector-effect": "non-scaling-stroke" }, svg);
      if (cfg.view && cfg.view.names && cfg.view.names[r.short]) { var nm = cfg.view.names[r.short], tn = el("text", { x: proj(nm[0], nm[1])[0], y: proj(nm[0], nm[1])[1], class: "kmap-zname", "text-anchor": "middle" }, svg); tn.textContent = r.short; tn.style.fontSize = (34 / z) + "px"; }
      if (r.isl) el("path", { d: r.isl, class: cl, transform: "translate(" + G.proj.islandDx + ",0)" }, svg);
    });
    if (cfg.regionHighlight && cfg.regionHighlight.label) {
      var rr = G.regions.filter(function (r) { return r.short === cfg.regionHighlight.keys[cfg.regionHighlight.keys.length - 1]; })[0];
      var rt = el("text", { x: rr.cx - 40, y: rr.cy + 60, class: "kmap-rh-label", "text-anchor": "middle" }, svg); rt.textContent = cfg.regionHighlight.label;
    }
    // 선(하천 등): cfg.lines = [{name, color, coords:[[[위도,경도],…],…], label:[위도,경도], dashed}]
    (cfg.lines || []).forEach(function (ln) {
      var gl = el("g", { class: "kmap-line-g" }, svg);
      ln.coords.forEach(function (seg) {
        el("path", { d: seg.map(function (c, i) { var p = proj(c[0], c[1]); return (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1); }).join(""), class: "kmap-line" + (ln.dashed ? " dashed" : ""), style: "stroke:" + ln.color + ";stroke-width:" + (3.2 / z) + "px" }, gl);
      });
      if (ln.label) { var lp = proj(ln.label[0], ln.label[1]), lt = el("text", { x: lp[0], y: lp[1], class: "kmap-line-label", "text-anchor": "middle" }, gl); lt.textContent = ln.name; lt.style.fill = ln.color; if (z !== 1) lt.style.fontSize = (19 / z) + "px"; }
    });
    var all = [];
    cfg.layers.forEach(function (L) {
      var g = el("g", { class: "kmap-layer", "data-layer": L.key, style: "--pc:" + L.color }, svg);
      L.items.forEach(function (it) {
        var xy = proj(it.lat, it.lon), dx = (it.dx || 0) / z, dy = (it.dy || 0) / z;
        var gi = el("g", { class: "kmap-pt", tabindex: 0, role: "button", "aria-label": it.name }, g);
        SHAPES[L.shape || "circle"](gi, xy[0], xy[1], (L.size || 9) / z);
        var anchor = it.side === "l" ? "end" : "start", tx = xy[0] + (it.side === "l" ? -14 : 14) / z + dx;
        var t = el("text", { x: tx, y: xy[1] + 6 / z + dy, "text-anchor": anchor, class: "kmap-ptlabel" }, gi);
        if (z !== 1) t.style.fontSize = (20 / z) + "px";
        t.textContent = it.label || it.name;
        all.push({ g: gi, it: it, L: L });
      });
    });
    var info = '<div class="kmap-info" aria-live="polite"><p class="kmap-hint">지도의 기호를 누르면 설명이 나옵니다.</p></div>';
    side.innerHTML = '<div class="kmap-head"><strong>' + esc(cfg.title) + "</strong></div>" +
      '<ul class="kmap-layers">' + cfg.layers.map(function (L) {
        return '<li><label><input type="checkbox" checked data-layer="' + esc(L.key) + '"><svg viewBox="-12 -12 24 24" class="kmap-sym" style="--pc:' + L.color + '"></svg>' + esc(L.label) + ' <span class="n">' + L.items.length + "</span></label></li>";
      }).join("") + "</ul>" +
      '<button type="button" class="kmap-btn" id="' + (root.id || "m") + '-quiz" aria-pressed="false">이름 숨기기 (빈 지도 활동)</button>' + info;
    side.querySelectorAll(".kmap-sym").forEach(function (s, i) { SHAPES[cfg.layers[i].shape || "circle"](s, 0, 0, 7); });
    side.querySelectorAll("input[data-layer]").forEach(function (cb) {
      cb.addEventListener("change", function () { svg.querySelector('[data-layer="' + cb.dataset.layer + '"]').style.display = cb.checked ? "" : "none"; });
    });
    var quiz = side.querySelector(".kmap-btn");
    quiz.addEventListener("click", function () {
      var on = quiz.getAttribute("aria-pressed") !== "true";
      quiz.setAttribute("aria-pressed", on); root.classList.toggle("quiz", on);
      quiz.textContent = on ? "이름 보이기" : "이름 숨기기 (빈 지도 활동)";
      svg.querySelectorAll(".kmap-pt.shown").forEach(function (g) { g.classList.remove("shown"); });
    });
    var box = side.querySelector(".kmap-info");
    function show(o) {
      svg.querySelectorAll(".kmap-pt.sel").forEach(function (g) { g.classList.remove("sel"); });
      o.g.classList.add("sel", "shown");
      box.innerHTML = '<p class="kmap-info-layer" style="--pc:' + o.L.color + '">' + esc(o.L.label) + "</p><h4>" + esc(o.it.name) + (o.it.year ? " <span>" + esc(o.it.year) + "</span>" : "") + "</h4>" + (o.it.desc ? "<p>" + esc(o.it.desc) + "</p>" : "");
    }
    all.forEach(function (o) {
      o.g.addEventListener("click", function () { show(o); });
      o.g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(o); } });
    });
  }

  window.KMap = { choropleth: choropleth, points: points };
})();
