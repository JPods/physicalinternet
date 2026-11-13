// Screenshot viewer: each .stage shows the selected .shot from the .shots row after it;
// clicking the stage opens a full-screen viewer (←/→ step through every shot on the page, Esc closes).
(function () {
  var shots = Array.prototype.slice.call(document.querySelectorAll('.shot'));
  var box = document.getElementById('lightbox');
  if (!box || !shots.length) return;
  var img = box.querySelector('img'), cap = box.querySelector('.lb-cap'), i = 0;
  function show(n) {
    i = (n + shots.length) % shots.length;
    var s = shots[i].querySelector('img');
    img.src = s.src; img.alt = s.alt;
    cap.innerHTML = shots[i].querySelector('figcaption').innerHTML.replace('</b>', '</b> — ');
    shots[i].click();
    box.classList.add('open');
  }
  function hide() { box.classList.remove('open'); }
  document.querySelectorAll('.stage').forEach(function (stage) {
    var group = Array.prototype.slice.call(stage.nextElementSibling.querySelectorAll('.shot'));
    var simg = stage.querySelector('img'), scap = stage.querySelector('figcaption'), cur = 0;
    function select(k) {
      cur = k;
      group.forEach(function (g, m) { g.classList.toggle('on', m === k); });
      var t = group[k].querySelector('img');
      simg.src = t.src; simg.alt = t.alt;
      scap.innerHTML = group[k].querySelector('figcaption').innerHTML;
    }
    group.forEach(function (g, k) { g.addEventListener('click', function () { select(k); }); });
    stage.addEventListener('click', function () { show(shots.indexOf(group[cur])); });
    select(0);
  });
  box.querySelector('.lb-close').addEventListener('click', hide);
  box.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(i - 1); });
  box.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(i + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) hide(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
})();
