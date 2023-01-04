/**
 * From string to DOM
 * @param str
 * @returns {ChildNode}
 */
export function strToDom(str) {
    return new DOMParser().parseFromString(str, "text/html").body.firstChild;
}

/**
 * Remove all children
 * @param element
 */
export function clearAll(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * Makes element display none
 * @param element
 */
export function hide(element) {
    element.style.display = 'none';
}

/**
 * Makes element display block
 * @param element
 */
export function show(element) {
    element.style.display = 'block';
}