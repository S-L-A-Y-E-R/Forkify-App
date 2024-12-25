import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import bookmarksView from "./views/bookmarksView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import uploadRecipeView from "./views/uploadRecipeView";

// https://forkify-api.herokuapp.com/v2

const recipeController = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    resultsView.updateView(model.getResultsPerPage());

    bookmarksView.updateView(model.state.bookmarks);

    await model.getRecipe(id);

    recipeView.renderView(model.state.recipe);
  } catch (err) {
    console.log(err.message);
    recipeView.renderErrorMessage();
  }
};

const searchController = async () => {
  try {
    resultsView.renderSpinner();

    await model.getSearchResults(searchView.getQuery());

    searchView.clearInput();

    resultsView.renderView(model.getResultsPerPage());

    paginationView.renderView(model.state.search);
  } catch (error) {
    console.log(error);

    resultsView.renderErrorMessage();
  }
};

const paginationController = (goToPage) => {
  resultsView.renderView(model.getResultsPerPage(goToPage));

  paginationView.renderView(model.state.search);
};

const updateServingsController = (newServings) => {
  model.updateServings(newServings);

  recipeView.updateView(model.state.recipe);
};

const bookmarksController = () => {
  model.state.recipe.bookmarked
    ? model.removeBookmark(model.state.recipe.id)
    : model.addBookmark(model.state.recipe);
  recipeView.updateView(model.state.recipe);

  bookmarksView.renderView(model.state.bookmarks);
};

const bookmarksStorageController = () => {
  model.getBookmarksFromStorage();

  bookmarksView.renderView(model.state.bookmarks);
};

const uploadRecipeController = async (data) => {
  try {
    uploadRecipeView.renderSpinner();

    await model.uploadRecipe(data);

    recipeView.renderView(model.state.recipe);

    uploadRecipeView.renderMessage();

    bookmarksView.renderView(model.state.bookmarks);

    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    setTimeout(() => {
      uploadRecipeView.toggleModal();
    }, 2500);
  } catch (error) {
    console.log(error);

    uploadRecipeView.renderErrorMessage(error.message);
  }
};

const init = () => {
  uploadRecipeView.addHandlerSubmit(uploadRecipeController);
  bookmarksView.addHandlerGetBookmarks(bookmarksStorageController);
  recipeView.addHandlerRender(recipeController);
  recipeView.addHandlerUpdateServings(updateServingsController);
  recipeView.addHandlerBookmark(bookmarksController);
  searchView.addHandlerSearch(searchController);
  paginationView.addHandlerClick(paginationController);
};
init();
