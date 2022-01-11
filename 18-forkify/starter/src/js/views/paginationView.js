// Handle the pagination buttons
import View from './View';
// Get relative path to assets via Parcel in a shipping product
// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2
import { RESULTS_PER_PAGE } from '../config';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // Searches up from the current element being clock
      // So, even if we click the <span> inside the button, the button can be found
      // If the user click an element higher than the button, its not in the button anyway
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }

  _generateHTMLPrev(currPage) {
    return `
        <button class="btn--inline pagination__btn--prev" data-goto="${
          currPage - 1
        }">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
        </button>
    `;
  }

  _generateHTMLNext(currPage) {
    return `
        <button class="btn--inline pagination__btn--next" data-goto="${
          currPage + 1
        }">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }

  _generateHTML() {
    // By passing state.search into .render(...), this function now
    // has access to state.search via this._state
    const currPage = this._data.page;
    const totalPages = Math.ceil(this._data.results.length / RESULTS_PER_PAGE);

    // Page 1 with other pages
    if (currPage === 1 && totalPages > 1) {
      return this._generateHTMLNext(currPage);
    }

    // Middle of 2 pages
    if (currPage > 1 && currPage < totalPages) {
      return `
        ${this._generateHTMLPrev(currPage)}
        ${this._generateHTMLNext(currPage)}
      `;
    }

    // Last page
    if (currPage > 1 && currPage === totalPages) {
      return this._generateHTMLPrev(currPage);
    }

    // Page 1 without any other page
    return '';
  }
}

export default new PaginationView();
