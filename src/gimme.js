/**
 * Takes selector, element, or array of elements and runs function on each.
 * @param {String|Element|Array} selector
 * @param {Function} func
 */
function gimme(selector, func) {
    const els = getElementArray(selector);
    for (let el of els) {
        func(el);
    }
}

/**
 * If element exists, call function with el as parameter.
 * @param {String|Element} selector
 * @param {Function} func
 */
function gimmeOne(selector, func) {
    const el = gimmeHelperOne(selector);
    if (el) {
        func(el);
    }
}

/**
 * Takes selector (string), element, or array of elements and returns array
 * of elements.
 * @param {String|Element|Array} selector
 * @returns {Array}
 */
function gimmeHelperArray(selector) {
    let els;
    if (typeof selector === 'string') {
        els = document.querySelectorAll(selector);
    } else {
        // Allow elements to be passed in directly.
        if (selector && selector.length === undefined) {
            els = [selector];
        } else {
            els = selector;
        }
    }
    return els;
}

/**
 * 
 * @param {String|Element} selector
 * @returns {Element}
 */
function gimmeHelperOne(selector) {
    let el;
    if (typeof selector === 'string') {
        els = document.querySelector(selector);
    } else {
        el = selector;
    }
    return el;
}
