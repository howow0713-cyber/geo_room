(function () {
  var pages = window.SHEET || [], main = document.getElementById("pages");
  var total = 0;
  pages.forEach(function (p, i) {
    var div = document.createElement("div");
    div.className = "page";
    div.innerHTML = '<img src="' + p.img + '" alt="' + (i + 1) + '쪽" loading="' + (i < 2 ? "eager" : "lazy") + '" style="aspect-ratio:1/' + p.ratio + '">';
    p.answers.forEach(function (a) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "ans"; b.textContent = a.t; b.title = "눌러서 정답 보기";
      b.style.left = a.x + "%"; b.style.top = a.y + "%"; b.style.width = a.w + "%"; b.style.height = a.h + "%";
      b.style.fontSize = a.s + "cqw";
      div.appendChild(b); total++;
    });
    main.appendChild(div);
  });
  var count = document.getElementById("count"), all = document.getElementById("toggle-all");
  function update() {
    var on = main.querySelectorAll(".ans.on").length;
    count.textContent = total ? "빈칸 " + on + " / " + total : "";
    all.setAttribute("aria-pressed", on === total && total > 0);
    all.textContent = on === total && total > 0 ? "정답 모두 숨기기" : "정답 모두 보기";
  }
  if (!total) all.hidden = true;
  main.addEventListener("click", function (e) {
    var b = e.target.closest(".ans"); if (!b) return;
    b.classList.toggle("on"); update();
  });
  all.addEventListener("click", function () {
    var show = all.getAttribute("aria-pressed") !== "true";
    main.querySelectorAll(".ans").forEach(function (b) { b.classList.toggle("on", show); });
    update();
  });
  update();

  // 확대·축소: 1 = 칸 너비에 맞춤(최대 1000px)
  var zoom = 1, zv = document.getElementById("zoom-val");
  try { zoom = parseFloat(localStorage.getItem("hanji:sheetzoom")) || 1; } catch (e) {}
  function applyZoom(z, anchorY) {
    var before = main.scrollHeight, top = window.scrollY;
    zoom = Math.min(3, Math.max(0.5, Math.round(z * 10) / 10));
    var base = Math.min(main.clientWidth - 28, 1000);
    main.querySelectorAll(".page").forEach(function (pg) { pg.style.width = Math.round(base * zoom) + "px"; });
    zv.textContent = Math.round(zoom * 100) + "%";
    if (before && anchorY !== false) window.scrollTo(window.scrollX, top * main.scrollHeight / before);
    try { localStorage.setItem("hanji:sheetzoom", zoom); } catch (e) {}
  }
  document.getElementById("zoom-in").onclick = function () { applyZoom(zoom + 0.1); };
  document.getElementById("zoom-out").onclick = function () { applyZoom(zoom - 0.1); };
  zv.onclick = function () { applyZoom(1); };
  window.addEventListener("wheel", function (e) {
    if (!e.ctrlKey) return;
    e.preventDefault(); applyZoom(zoom * (e.deltaY < 0 ? 1.1 : 1 / 1.1));
  }, { passive: false });
  document.addEventListener("keydown", function (e) {
    if (!(e.ctrlKey || e.metaKey)) return;
    if (e.key === "+" || e.key === "=") { e.preventDefault(); applyZoom(zoom + 0.1); }
    else if (e.key === "-") { e.preventDefault(); applyZoom(zoom - 0.1); }
    else if (e.key === "0") { e.preventDefault(); applyZoom(1); }
  });
  window.addEventListener("resize", function () { applyZoom(zoom, false); });
  applyZoom(zoom, false);
})();
