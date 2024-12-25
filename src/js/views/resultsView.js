import { View } from "./View";
import { icons } from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentElem = document.querySelector(".results");
  _data;

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
                <div class="recipe__user-generated ${
                  !this._data.key ? "hidden" : ""
                }">
                 <svg>
                    <use href="${icons}.svg#icon-user"></use>
                 </svg>
              </div>
              </div>
            </a>
          </li>
      `;
      })
      .join("");
  }
}

export default new ResultsView();
