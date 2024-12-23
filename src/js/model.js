import { getJSON } from "./helpers";
import { API_URL } from "./config";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
};

export const getRecipe = async (id) => {
  try {
    const { recipe } = (await getJSON(`${API_URL}${id}`)).data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
    };
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const getSearchResults = async (query) => {
  try {
    state.search.query = query;
    const { data } = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};
