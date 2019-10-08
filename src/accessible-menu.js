function tabindex0(els) {
  for (var i = 0; i < els.length; i++) {
    els[i].setAttribute('tabindex', '0');
  }
}

$(document).ready(function() {
  document.querySelector('.zone-menu .menu').addEventListener('keydown', mobileMenuKeydown);
  document.getElementById('mobile-menu').addEventListener('keydown', mobileMenuButtonKeydown);
  var itemsWithSubmenu = document.querySelectorAll('.zone-menu .menu li.expanded');
  tabindex0(itemsWithSubmenu);
});

/* keyboard navigation for mobile menu */
function mobileMenuButtonKeydown(event) {
  var keys = {
    enter: 13,
    space: 32,
    up: 38,
    down: 40,
  };
  if ([38, 40].indexOf(event.keyCode) > -1) {
    event.preventDefault();
  }
  switch (event.which) {
  case keys.enter:
  case keys.space:
  case keys.down:
    showMobileMenu();
    mobileMenuFocusFirst();
    break;
  case keys.up:
    showMobileMenu();
    mobileMenuFocusLast();
    break;
  }
}
function mobileMenuKeydown(event) {
  var keys = {
    enter: 13,
    space: 32,
    escape: 27,
    up: 38,
    down: 40,
    home: 36,
    end: 35,
    tab: 9
  };
  if ([32, 35, 36, 38, 40].indexOf(event.keyCode) > -1) {
    event.preventDefault();
  }
  switch (event.which) {
  case keys.escape: hideMobileMenuFocusMenuButton(); break;
  case keys.up: mobileMenuFocusPrevious(event.target); break;
  case keys.down: mobileMenuFocusNext(event.target); break;
  case keys.home: mobileMenuFocusFirst(); break;
  case keys.end: mobileMenuFocusLast(); break;
  case keys.enter:
  case keys.space: mobileMenuOpenAccordion(event.target); break;
  // case keys.tab:
  //   //document.querySelector('.quicklinks__btn').removeAttribute('aria-expanded');
  //   break;
  }
}

function mobileMenuOpenAccordion(el) {
  if (el.tagName === 'LI' && el.classList.contains('expanded')) {
    el.click();
  }
}

function mobileMenuFocusNext(el) {
  var submenuFirstLink;
  if (el.tagName === 'LI') {
    if (el.classList.contains('expanded-mobile-menu')) {
      // focus first sub item
      submenuFirstLink = el.childNodes[1].firstElementChild.firstElementChild;
      submenuFirstLink.focus();
    } else {
      mobileMenuFocusNextLink(el);
    }
  } else { // a tag (link)
    var listItem = el.parentElement;
    if (listItem.classList.contains('expanded')) {
      listItem.focus();
    } else {
      mobileMenuFocusNextLink(listItem);
    }
  }
}
/* focus next link, parent next link, or first link */
function mobileMenuFocusNextLink(listItem) {
  var nextLink;
  var nextListItem = listItem.nextElementSibling;
  if (nextListItem) {
    nextLink = nextListItem.firstElementChild;
    nextLink.focus();
  } else {
    var parentListItem = listItem.parentElement.parentElement;
    if (parentListItem.tagName === 'LI') {
      nextLink = parentListItem.nextElementSibling.firstElementChild;
      nextLink.focus();
    } else {
      mobileMenuFocusFirst();
    }
  }
}
function mobileMenuFocusPrevious(el) {
  var previousLink, previousListItem, parentListItem, parentLink;
  if (el.tagName === 'LI') {
    previousLink = el.firstElementChild;
    previousLink.focus();
  } else { // a tag
    previousListItem = el.parentElement.previousElementSibling;
    if (previousListItem) {
      var previousItem = mobileMenuGetPreviousItem(previousListItem);
      previousItem.focus();
    } else { // first list item
      parentListItem = el.parentElement.parentElement.parentElement;
      if (parentListItem.tagName === 'LI') {
        if (parentListItem.classList.contains('expanded')) {
          parentListItem.focus();
        } else {
          parentLink = parentListItem.firstElementChild;
          parentLink.focus();
        }
      } else {
        mobileMenuFocusLast();
      }
    }
  }
}
function mobileMenuGetPreviousItem(previousListItem) {
  /* if item does not contain sublist, then return contained link */
  if (!previousListItem.classList.contains('expanded')) return previousListItem.firstElementChild;
  /* if sublist is not currently open, then return the list item */
  if (!previousListItem.classList.contains('expanded-mobile-menu')) return previousListItem;
  /* repeat steps on the last sublist item */
  return mobileMenuGetPreviousItem(previousListItem.lastElementChild.lastElementChild);
}
function mobileMenuFocusFirst() {
  document.querySelector('.zone-menu .menu .first').firstElementChild.focus();
}
function mobileMenuFocusLast() {
  document.querySelector('.zone-menu .menu-name-main-menu > .menu > .last').firstElementChild.focus();
}