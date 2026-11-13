/* 영상 카드: <button class="thumb" data-yt="영상ID" data-len="2:32"> → 썸네일, 누르면 그 자리에서 재생 */
(function () {
  document.querySelectorAll(".thumb[data-yt]").forEach(function (b) {
    var id = b.dataset.yt;
    b.innerHTML = '<img src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()">' + (b.dataset.len ? '<span class="len">' + b.dataset.len + "</span>" : "");
    b.setAttribute("aria-label", "영상 재생");
    b.addEventListener("click", function () {
      if (b.classList.contains("playing")) return;
      b.classList.add("playing");
      b.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + "?autoplay=1" + (b.dataset.start ? "&start=" + b.dataset.start : "") + '" title="YouTube 영상" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    });
  });
})();

/* 사진 갤러리: <div class="gallery" data-photos='[["키","제목","설명"],…]'> + window.PHOTOS(사진 출처) */
(function () {
  var P = window.PHOTOS || {}, list = [], lb, idx = 0;
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  function credit(p) { return p ? '사진: <a href="' + esc(p.page) + '" target="_blank" rel="noopener">' + esc(p.artist || "Wikimedia Commons") + "</a> · " + esc(p.license) : ""; }
  document.querySelectorAll(".gallery[data-photos]").forEach(function (g) {
    var rows; try { rows = JSON.parse(g.dataset.photos); } catch (e) { console.error("사진 목록 형식 오류", e); return; }
    rows.forEach(function (row) {
      var p = P[row[0]]; if (!p) return;
      var i = list.length; list.push({ p: p, cap: row[1], note: row[2] || "" });
      var f = document.createElement("figure"); f.className = "ph"; f.dataset.key = row[0];
      f.innerHTML = '<button type="button" aria-label="크게 보기: ' + esc(row[1]) + '"><img src="' + esc(p.src) + '" alt="' + esc(row[1]) + '" loading="lazy"></button><figcaption><span class="cap">' + esc(row[1]) + "</span>" + (row[2] ? '<span class="note">' + esc(row[2]) + "</span>" : "") + '<span class="credit">' + credit(p) + "</span></figcaption>";
      f.querySelector("button").addEventListener("click", function () { detach(i) || open(i); });
      g.appendChild(f);
    });
  });
  if (!list.length) return;
  // 수업실(index.html) 안에서 열렸으면 사진을 떠 있는 창으로 떼어 냄. 응답이 없으면 이 화면 안에서 크게 보기
  var pending = {};
  window.addEventListener("message", function (e) { if (e.data && e.data.type === "hanji-photo-ok") { clearTimeout(pending[e.data.id]); delete pending[e.data.id]; } });
  function detach(i) {
    if (window.parent === window) return false;
    var o = list[i], id = Date.now() + "-" + i, tmp = document.createElement("span"); tmp.innerHTML = credit(o.p);
    try {
      window.parent.postMessage({ type: "hanji-photo", id: id, src: new URL(o.p.src, location.href).href, cap: o.cap, note: o.note, credit: credit(o.p) }, "*");
    } catch (err) { return false; }
    pending[id] = setTimeout(function () { delete pending[id]; open(i); }, 400);
    return true;
  }
  lb = document.createElement("div"); lb.className = "lightbox"; lb.hidden = true;
  lb.innerHTML = '<div class="lb-stage"><img alt=""></div><div class="lb-text"><b></b><span></span><small></small></div><button class="lb-close" aria-label="닫기">×</button><button class="lb-prev" aria-label="이전 사진">‹</button><button class="lb-next" aria-label="다음 사진">›</button>';
  document.body.appendChild(lb);
  function show() { var o = list[idx]; lb.querySelector("img").src = o.p.src; lb.querySelector("img").alt = o.cap; lb.querySelector("b").textContent = o.cap; lb.querySelector("span").textContent = o.note; lb.querySelector("small").innerHTML = credit(o.p); }
  function open(i) { idx = i; show(); lb.hidden = false; lb.querySelector(".lb-close").focus(); }
  function close() { lb.hidden = true; }
  lb.querySelector(".lb-close").onclick = close;
  lb.querySelector(".lb-prev").onclick = function () { idx = (idx - 1 + list.length) % list.length; show(); };
  lb.querySelector(".lb-next").onclick = function () { idx = (idx + 1) % list.length; show(); };
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lb-stage")) close(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") lb.querySelector(".lb-prev").click(); else if (e.key === "ArrowRight") lb.querySelector(".lb-next").click();
  });
})();

/* 선 그래프: KChart.line(요소, {points:[[x,y],…], bands:[[x0,x1,"이름"],…], yMin, yMax, unit, xLabel}) */
window.KChart = {
  line: function (root, c) {
    var NS = "http://www.w3.org/2000/svg", W = 720, H = 300, L = 46, R = 20, T = 34, B = 34;
    var xs = c.points.map(function (p) { return p[0]; }), x0 = c.xMin || Math.min.apply(null, xs), x1 = c.xMax || Math.max.apply(null, xs);
    var sx = function (x) { return L + (x - x0) / (x1 - x0) * (W - L - R); }, sy = function (y) { return T + (1 - (y - c.yMin) / (c.yMax - c.yMin)) * (H - T - B); };
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + (c.title || "") + '">';
    (c.bands || []).forEach(function (b, i) {
      if (i % 2 === 0) s += '<rect class="chart-band" x="' + sx(b[0]) + '" y="' + T + '" width="' + (sx(b[1]) - sx(b[0])) + '" height="' + (H - T - B) + '" opacity=".6"/>';
      s += '<text class="t-mute" x="' + (sx(b[0]) + sx(b[1])) / 2 + '" y="' + (T - 8) + '" text-anchor="middle">' + b[2] + "</text>";
    });
    for (var y = c.yMin; y <= c.yMax; y += c.yStep) s += '<line class="chart-grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + sy(y) + '" y2="' + sy(y) + '"/><text class="t-mute" x="' + (L - 8) + '" y="' + (sy(y) + 4) + '" text-anchor="end">' + y + (c.unit || "") + "</text>";
    xs.forEach(function (x) { s += '<text class="t-mute" x="' + sx(x) + '" y="' + (H - B + 18) + '" text-anchor="middle">' + x + "</text>"; });
    if (c.ref != null) s += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + sy(c.ref) + '" y2="' + sy(c.ref) + '" class="ln-mute"/><text class="t-mute" x="' + (L + 6) + '" y="' + (sy(c.ref) - 6) + '">' + c.refLabel + "</text>";
    s += '<path class="chart-line" d="' + c.points.map(function (p, i) { return (i ? "L" : "M") + sx(p[0]) + "," + sy(p[1]); }).join("") + '"/>';
    c.points.forEach(function (p, i) {
      s += '<circle class="chart-dot" cx="' + sx(p[0]) + '" cy="' + sy(p[1]) + '" r="5"/><circle cx="' + sx(p[0]) + '" cy="' + sy(p[1]) + '" r="18" fill="transparent" data-i="' + i + '"/>';
      if (c.label && c.label.indexOf(i) > -1) s += '<text class="t-m" x="' + sx(p[0]) + '" y="' + (sy(p[1]) - 12) + '" text-anchor="' + (i === c.points.length - 1 ? "end" : i === 0 ? "start" : "middle") + '">' + p[1] + (c.unit || "") + "</text>";
    });
    root.classList.add("dg"); root.style.position = "relative";
    root.innerHTML = s + "</svg>";
    var tip = document.createElement("div"); tip.className = "chart-tip"; tip.hidden = true; root.appendChild(tip);
    root.querySelector("svg").addEventListener("pointermove", function (e) {
      var i = e.target.getAttribute("data-i"); if (i == null) { tip.hidden = true; return; }
      var p = c.points[i], r = root.getBoundingClientRect(), k = r.width / W;
      tip.textContent = p[0] + "년 " + p[1] + (c.unit || "") + (p[2] ? " · " + p[2] : ""); tip.hidden = false;
      tip.style.left = sx(p[0]) * k + "px"; tip.style.top = sy(p[1]) * k + "px";
    });
    root.querySelector("svg").addEventListener("pointerleave", function () { tip.hidden = true; });
  }
};
