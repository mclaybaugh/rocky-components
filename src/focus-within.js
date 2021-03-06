/**
 * Adds class "focus-within" to elements like a pseudo-selector
 */
var topItems = document.querySelectorAll('#zone-menu-wrapper .main-menu ul.menu li.level-1');
Array.prototype.forEach.call(topItems, function (el) {
  el.addEventListener('focusin', function () {
    el.classList.add('focus-within');
  });
  el.addEventListener('focusout', function (e) {
    if (!el.contains(e.relatedTarget)) {
      el.classList.remove('focus-within');
    }
  });
});