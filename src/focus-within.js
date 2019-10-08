var topItems = document.querySelectorAll('#zone-menu-wrapper .main-menu ul.menu li.level-1');
Array.prototype.forEach.call(topItems, function (el) {
  el.addEventListener('focusin', function () {
    // add class on focusin, idempotent
    el.classList.add('focus-within');
  });
  el.addEventListener('focusout', function (e) {
    // check if upcoming target is within our el
    if (!el.contains(e.relatedTarget)) {
      el.classList.remove('focus-within');
    }
  });
});