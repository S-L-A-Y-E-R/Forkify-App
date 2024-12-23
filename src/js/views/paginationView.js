import { View } from "./View";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElem = document.querySelector(".pagination");
  _data;

  addHandlerClick(helper) {
    this._parentElem.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      helper(goToPage);
    });
  }

  _generateMarkup() {
    const numOfPages = Math.ceil(this._data.results.length / 10);
    const currentPage = this._data.page;

    if (currentPage === 1 && numOfPages > 1) {
      return `
          <button class="btn--inline pagination__btn--next" data-goto=${
            currentPage + 1
          }>
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    } else if (currentPage === numOfPages && currentPage > 1) {
      return `
          <button class="btn--inline pagination__btn--prev"data-goto=${
            currentPage - 1
          }>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
      `;
    } else if (currentPage > 1 && currentPage < numOfPages) {
      return `
          <button class="btn--inline pagination__btn--next"data-goto=${
            currentPage + 1
          }>
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          <button class="btn--inline pagination__btn--prev " data-goto=${
            currentPage - 1
          }>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
      `;
    }
  }
}

export default new PaginationView();
