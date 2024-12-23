import icons from "url:../../img/icons.svg";

export class View {
  renderView(data) {
    this._data = data;
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage(
        "There is no recipes found for you search keyword. Please try another keyword!"
      );

    const markup = this._generateMarkup();
    this._clear();
    this._parentElem.insertAdjacentHTML("afterbegin", markup);
  }

  renderErrorMessage(message = this._errorMessage) {
    this._clear();
    this._parentElem.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="error">
              <div>
                <svg>
                  <use href="${icons}.svg#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
        </div>
        `
    );
  }

  renderMessage(message = this._message) {
    this._clear();
    this._parentElem.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}.svg#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
        `
    );
  }

  renderSpinner() {
    this._clear();
    this._parentElem.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
        </div>`
    );
  }

  _clear() {
    this._parentElem.innerHTML = "";
  }
}
