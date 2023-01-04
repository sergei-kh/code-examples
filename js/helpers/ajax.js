export function send(method, src, data, callback, element) {
    let token = null;
    if (window.globalOptions) {
        token = window.globalOptions.ajaxToken;
    }
    let xhr = new XMLHttpRequest;
    xhr.open(method, src);
    if (token !== null) {
        xhr.setRequestHeader("X-CSRF-Token", token);
    }
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(data);
    xhr.onload = (response) => {
        if (callback !== null) {
            callback(response.currentTarget.response, response.target.status, element);
        }
    };
}