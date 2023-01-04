/**
 * Show loading on button
 * @param btn
 */
export function showLoaderBtn(btn) {
    let loader = btn.querySelector('.preloader');
    if (loader) {
        let textEl = btn.querySelector('.btn-text');
        if (textEl) {
            textEl.style.display = 'none';
        }
        //
        loader.classList.remove('preloader_hide');
        loader.classList.add('preloader_show');
    }
}

/**
 * Hide loading on button
 * @param btn
 */
export function hideLoaderBtn(btn) {
    let loader = btn.querySelector('.preloader');
    if (loader) {
        loader.classList.remove('preloader_show');
        loader.classList.add('preloader_hide');
        //
        let textEl = btn.querySelector('.btn-text');
        if (textEl) {
            textEl.removeAttribute('style');
        }
    }
}

/**
 * Save size button
 * @param btn
 */
export function saveSizeBtn(btn) {
    btn.style.height = btn.offsetHeight + "px";
    btn.style.width = btn.offsetWidth + "px";
}