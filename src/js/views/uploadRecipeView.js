import { View } from "./View";

class UploadRecipeView extends View {
  _parentElem = document.querySelector(".upload");
  _overlay = document.querySelector(".overlay");
  _addRecipeWindow = document.querySelector(".add-recipe-window");
  _btnCloseModal = document.querySelector(".btn--close-modal");
  _btnOpenModal = document.querySelector(".nav__btn--add-recipe");
  _message = "Successfully added the new recipe !";

  constructor() {
    super();
    this._addHandlerCloseModal();
    this._addHandlerOpenModal();
  }

  toggleModal() {
    this._overlay.classList.toggle("hidden");
    this._addRecipeWindow.classList.toggle("hidden");
  }

  _addHandlerOpenModal() {
    this._btnOpenModal.addEventListener("click", this.toggleModal.bind(this));
  }

  _addHandlerCloseModal() {
    this._btnCloseModal.addEventListener("click", this.toggleModal.bind(this));
    this._overlay.addEventListener("click", this.toggleModal.bind(this));
  }

  addHandlerSubmit(handler) {
    this._parentElem.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = [...new FormData(this._parentElem)];
      handler(Object.fromEntries(formData));
    });
  }
}

export default new UploadRecipeView();
