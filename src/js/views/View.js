import icons from "url:../../img/icons.svg";

export class View {
  renderView(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage(
        "There is no recipes found for you search keyword. Please try another keyword!"
      );
    this._data = data;

    const markup = this._generateMarkup();
    this._clear();
    this._parentElem.insertAdjacentHTML("afterbegin", markup);
  }

  updateView(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage(
        "There is no recipes found for you search keyword. Please try another keyword!"
      );
    this._data = data;

    const newMarkup = this._generateMarkup();
    const virtualDOM = document
      .createRange()
      .createContextualFragment(newMarkup);
    const currentElements = Array.from(this._parentElem.querySelectorAll("*"));
    const newElements = Array.from(virtualDOM.querySelectorAll("*"));

    newElements.forEach((newElem, i) => {
      const currentElem = currentElements[i];

      if (
        !newElem.isEqualNode(currentElem) &&
        newElem.firstChild?.nodeValue.trim() !== ""
      ) {
        currentElem.textContent = newElem.textContent;
      }

      if (!newElem.isEqualNode(currentElem)) {
        Array.from(newElem.attributes).forEach((attr) =>
          currentElem.setAttribute(attr.name, attr.value)
        );
      }
    });
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
