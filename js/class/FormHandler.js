import {send} from "../helpers/ajax";
import {showLoaderBtn, hideLoaderBtn, saveSizeBtn} from "../helpers/form";

/**
 * let options = {
 *     resetForm:         true,
 *     classBoxSelector: '.form-basic__box',
 *     callbackAfterSend: function () {
 *
 *     },
 * };
 * new FormHandler('test_form', options);
 */

export default class FormHandler {
    constructor(formId, options = {}) {
        this.form = document.getElementById(formId);
        this.options = options;
        if (this.form !== null) {
            this.form.addEventListener('submit', this.onSubmit.bind(this));
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.errorsReset();
        let fd = new FormData(this.form);
        let btn = this.form.querySelector("[type='submit']");
        btn.disabled = true;
        saveSizeBtn(btn);
        showLoaderBtn(btn);
        send('post', this.form.action, fd, (response, status) => {
            btn.removeAttribute('style');
            let result = JSON.parse(response);
            switch (status) {
                case 200:
                    if (this.options.resetForm) {
                        this.form.reset();
                    }
                    if (this.options.callbackAfterSend) {
                        this.options.callbackAfterSend(result, btn);
                    }
                    break;
                case 422:
                    this.errorsHandler(result);
                    btn.disabled = false;
                    hideLoaderBtn(btn);
                    break;
                case 500:
                    btn.disabled = false;
                    hideLoaderBtn(btn);
                    alert('Ошибка сервера');
                    break;
            }
        });
    }

    errorsReset() {
        let fields = document.querySelectorAll('.form-basic__input_error');
        fields.forEach((field) => {
            field.classList.remove('form-basic__input_error');
            if (this.options.classBoxSelector) {
                let box = field.closest(this.options.classBoxSelector);
                if (box) {
                    let label = box.querySelector('.form-basic__label_error');
                    let text = box.querySelector('.form-basic__text-err');
                    if (label) {
                        label.classList.remove('form-basic__label_error');
                    }
                    if (text) {
                        text.innerText = '';
                    }
                }
            }
        });
    }

    errorsHandler(object) {
        for (let key in object) {
            let field = this.form.querySelector(`[name=${key}]`);
            if (field) {
                field.classList.add('form-basic__input_error');
                if (this.options.classBoxSelector) {
                    let box = field.closest(this.options.classBoxSelector);
                    if (box) {
                        let label = box.querySelector('.form-basic__label');
                        let text = box.querySelector('.form-basic__text-err');
                        if (label) {
                            label.classList.add('form-basic__label_error');
                        }
                        if (text) {
                            text.innerText = object[key];
                        }
                    }
                }
            }
        }
    }
}