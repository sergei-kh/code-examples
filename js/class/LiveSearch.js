import debounce from "lodash/debounce";
import {send} from "../helpers/ajax";
import {strToDom} from "../helpers/document";
import {clearAll} from "../helpers/document";
import {showLoader, hideLoader} from "../helpers/loader";
import {show} from "../helpers/document";

/**
 * new LiveSearch().init();
 */

export default class LiveSearch {
    constructor() {
        this.input = document.getElementById('header_search');
        if (this.input !== null) {
            this.search = document.getElementById('search_output');
            this.itemsBox = this.search.children[1];
            this.moreBox = this.search.children[2];
            this.searchActive = false;
            this.handlerSearch = debounce(this.onInput, 300);
            this.btnClose = document.getElementById('search-output_close');
        }
    }

    init() {
        if (this.input !== null) {
            this.input.addEventListener('input', this.handlerSearch.bind(this));
            this.input.addEventListener('focus', () => {
                if (this.searchActive) {
                    show(this.search);
                }
            });
            this.btnClose.addEventListener('click', () => {
                this.input.value = '';
                this.clear();
            });
        }
    }

    onInput(e) {
        let value = e.target.value;
        if (value.length > 2) {
            showLoader();
            this.searchActive = true;
            let fd = new FormData();
            fd.append('q', value);
            send('post', '/product/search', fd, this.callbackAfterSend.bind(this));
        } else {
            this.clear();
        }
    }

    callbackAfterSend(response, status) {
        hideLoader();
        if (status === 200) {
            clearAll(this.itemsBox);
            let result = JSON.parse(response);
            this.insertItems(result);
            if (result.flag_more) {
                this.moreBox.children[0].href = this.getUrlMore();
                this.moreBox.classList.remove('hide');
            } else {
                this.moreBox.classList.add('hide');
            }
            show(this.search);
        }
    }

    insertItems(items) {
        if (items.products.length) {
            items.products.forEach((product) => {
                let str = `<a title="${product.intl_title}" href="${product.intl_link}" class="search-output__link">
                            <span class="search-output__name">${product.intl_title}</span>
                            <span class="search-output__price">${product.price_formatted}</span></a>`;
                let item = strToDom(str);
                this.itemsBox.appendChild(item);
            });
        } else {
            let text = document.createElement("p");
            text.style.textAlign = 'left';
            text.textContent = items.message;
            this.itemsBox.appendChild(text);
        }
    }

    getUrlMore() {
        return `/product/list?q=${this.input.value}`;
    }

    clear() {
        this.searchActive = false;
        this.search.removeAttribute('style');
        clearAll(this.itemsBox);
    }
}