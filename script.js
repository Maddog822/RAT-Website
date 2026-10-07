/* ===== NAVBAR: mark the button for the page you are on ===== */
/* Each page can set <body data-nav="services"> to choose which button lights up.
   If it doesn't, the file name decides (for example booking.html lights up "booking"). */
(function () {
  var page = document.body.dataset.nav;
  if (!page) {
    page = location.pathname.split("/").pop().replace(".html", "") || "index";
  }
  var links = document.querySelectorAll(".navbar a");
  for (var i = 0; i < links.length; i++) {
    var name = links[i].getAttribute("href").replace(".html", "");
    if (name === page) {
      links[i].setAttribute("aria-current", "page");
    }
  }
})();

/* ===== CAROUSEL: 3 tiles at a time, swipe or arrows, loops forever ===== */
(function () {
  var track = document.getElementById("track");
  if (!track) return;   // pages without a carousel skip this whole section

  var carousel = track.closest(".carousel");
  var viewport = carousel.querySelector(".carousel-viewport");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var originals = [].slice.call(track.children);
  var n = originals.length;   // number of real tiles

  // To loop forever, add a copy of all tiles before and after the real ones
  function makeClone(el) {
    var c = el.cloneNode(true);
    c.setAttribute("aria-hidden", "true");
    c.setAttribute("tabindex", "-1");
    return c;
  }
  originals.forEach(function (el) { track.insertBefore(makeClone(el), originals[0]); });
  originals.forEach(function (el) { track.appendChild(makeClone(el)); });

  var visible = 3;   // tiles showing at once
  var offset = 1;    // tiles to the left of the middle one
  var index = n;     // which tile is in the middle (starts on the first real tile)

  function tileWidth() { return viewport.clientWidth / visible; }
  function xFor(i) { return -(i - offset) * tileWidth(); }

  // Move the track to the current tile, with or without the sliding animation
  function place(animate) {
    track.style.transition = animate ? "" : "none";
    track.style.transform = "translateX(" + xFor(index) + "px)";
    if (!animate) void track.offsetWidth;   // makes the browser apply the jump right away
  }

  // After sliding into a copy, jump back to the matching real tile (looks identical)
  function normalize() {
    var changed = false;
    while (index >= 2 * n) { index -= n; changed = true; }
    while (index < n) { index += n; changed = true; }
    if (changed) place(false);
  }

  function go(step) {
    index += step;
    place(true);
    if (reduceMotion) normalize();
  }

  // 3 tiles on desktop and tablets, 1 on phones
  function setLayout() {
    visible = window.innerWidth < 640 ? 1 : 3;
    offset = (visible - 1) / 2;
    carousel.style.setProperty("--visible", visible);
    carousel.style.setProperty("--fade", visible === 3 ? "33.333%" : "12%");
    place(false);
  }

  track.addEventListener("transitionend", function (e) {
    if (e.target === track) normalize();
  });
  window.addEventListener("resize", setLayout);

  /* --- Arrow buttons --- */
  carousel.querySelector(".prev").onclick = function () { go(-1); };
  carousel.querySelector(".next").onclick = function () { go(1); };

  /* --- Swiping and mouse dragging --- */
  var pressed = false, dragging = false, justDragged = false;
  var startX = 0, baseX = 0, dx = 0;

  viewport.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pressed = true;
    dragging = false;
    startX = e.clientX;
    dx = 0;
    baseX = xFor(index);
  });

  viewport.addEventListener("pointermove", function (e) {
    if (!pressed) return;
    dx = e.clientX - startX;
    // Only count it as a drag after moving a few pixels, so plain taps still open links
    if (!dragging && Math.abs(dx) > 6) {
      dragging = true;
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add("dragging");
      track.style.transition = "none";
    }
    if (dragging) {
      track.style.transform = "translateX(" + (baseX + dx) + "px)";
    }
  });

  function endDrag() {
    if (!pressed) return;
    pressed = false;
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove("dragging");

    // Stops the tile link from opening when you let go after a drag
    justDragged = true;
    setTimeout(function () { justDragged = false; }, 50);

    // Drag far enough and it moves to the next tile, otherwise it snaps back
    var limit = tileWidth() * 0.2;
    if (dx < -limit) go(1);
    else if (dx > limit) go(-1);
    else place(true);
  }

  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);
  viewport.addEventListener("click", function (e) {
    if (justDragged) { e.preventDefault(); e.stopPropagation(); }
  }, true);
  viewport.addEventListener("dragstart", function (e) { e.preventDefault(); });

  setLayout();
})();