class SearchView {
  #parentElem = document.querySelector(".search");

  addHandlerSearch(handler) {
    this.#parentElem.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    return this.#parentElem.querySelector("input").value;
  }

  clearInput() {
    this.#parentElem.querySelector("input").value = "";
  }
}

export default new SearchView();
