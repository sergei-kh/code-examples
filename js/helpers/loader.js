export function showLoader() {
    let loader = document.getElementById('loader');
    loader.style.display = 'block';
}

export function hideLoader() {
    let loader = document.getElementById('loader');
    loader.removeAttribute('style');
}