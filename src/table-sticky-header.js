function offset(el) {
  var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}
function drupalTop() {
  var top = 0;
  if (document.body.classList.contains('user-logged-in')) {
    top += 39;
  }
  if (document.body.classList.contains('toolbar-tray-open')) {
    top += 39;
  }
  return top;
}
function styleHeaderRow(row) {
  row.style.display = 'table-row';
  row.style.position = 'fixed';
  row.style.top = drupalTop() + 'px';
  row.style.backgroundColor = 'white';
  row.style.boxShadow = '0 0 3px #888888';
  return row;
}
function styleHeaderCell(cell, width, height, isTextCentered, isLast) {
  cell.style.display = 'table-cell';
  cell.style.width = width + 'px';
  cell.style.height = height + 'px';
  cell.style.borderTop = '1px solid #ddd';
  cell.style.borderLeft = '1px solid #ddd';
  if (isLast) cell.style.borderRight = '1px solid #ddd';
  cell.style.borderBottom = '2px solid #ddd';
  cell.style.verticalAlign = 'bottom';
  if (isTextCentered) cell.style.textAlign = 'center';
  cell.style.padding = '1rem .5rem';
  cell.style.fontFamily = '"ITC Franklin Gothic LT W01 Bk", Arial, sans-serif';
  cell.style.fontWeight = 'bold';
  return cell;
}
function makeStickyHeader(table) {
  var container = table.parentElement;
  var headerTable = document.createElement('div');
  headerTable.style.display = 'table';
  headerTable.classList.add('tableStickyHeader');
  var headerRow = document.createElement('div');
  headerRow = styleHeaderRow(headerRow);
  var cell, text, header, headerText, isTextCentered, isLast;
  for (var i = 0; i < table.rows[0].cells.length; i++) {
    cell = table.rows[0].cells[i];
    if (cell.style.display === 'none') continue;
    text = leafInnerHtml(cell);
    text = text.replace(/&amp;/g, '&');
    headerText = document.createTextNode(text);
    header = document.createElement('div');
    header.appendChild(headerText);
    isTextCentered = cell.classList.contains('views-align-center');
    isLast = i === table.rows[0].cells.length - 1;
    header = styleHeaderCell(header, cell.offsetWidth, cell.offsetHeight, isTextCentered, isLast);
    headerRow.appendChild(header);
  }
  headerTable.appendChild(headerRow);
  container.appendChild(headerTable);
}
function leafInnerHtml(el) {
  return el.firstElementChild === null
    ? el.innerHTML
    : leafInnerHtml(el.firstElementChild);
}
function removeStickyHeader() {
  var stickyHeader = document.querySelector('.tableStickyHeader');
  if (stickyHeader) {
    stickyHeader.remove();
  }
}
document.addEventListener('DOMContentLoaded', function () {
  if (!document.querySelector('.footable')) return;
  var state = 'notfixed';
  document.addEventListener('scroll', function () {
    var table = document.querySelector('.footable');
    if (!table) return;
    if (table.style.display === 'none') return;
    var tableOffset = offset(table).top - drupalTop();
    if (pageYOffset > tableOffset) {
      // don't make fixed if already fixed
      if (state === 'fixed') return;
      state = 'fixed';
      makeStickyHeader(table);
    } else {
      // don't unfix if already not fixed
      if (state === 'notfixed') return;
      state = 'notfixed';
      removeStickyHeader();
    }
  });
});