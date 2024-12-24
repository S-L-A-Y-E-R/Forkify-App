import { View } from "./View";

class BookmarksView extends View {
  _parentElem = document.querySelector(".bookmarks");
  _data;

  addHandlerGetBookmarks(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map((recipe) => {
        return `  <li class="preview">
            <a class="preview__link ${
              recipe.id === window.location.hash.slice(1) &&
              "preview__link--active"
            }" href="#${recipe.id}">
              <figure class="preview__fig">
                <img src="${recipe.image}" alt="${recipe.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
              </div>
            </a>
          </li>
      `;
      })
      .join("");
  }
}

export default new BookmarksView();
