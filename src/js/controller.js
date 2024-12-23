import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";

// https://forkify-api.herokuapp.com/v2

const recipeController = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

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

    resultsView.renderView(model.state.search.results);
  } catch (error) {
    resultsView.renderErrorMessage();
  }
};

const init = () => {
  recipeView.addHandlerRender(recipeController);
  searchView.addHandlerSearch(searchController);
};
init();
