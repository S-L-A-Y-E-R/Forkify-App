import { getJSON, sendJSON } from "./helpers";
import { API_URL, RESULTS_PER_PAGE, API_KEY } from "./config";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

export const getRecipe = async (id) => {
  try {
    const { recipe } = (await getJSON(`${API_URL}${id}?key=${API_KEY}`)).data;
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

    state.bookmarks.some((bookmark) => bookmark.id === id)
      ? (state.recipe.bookmarked = true)
      : (state.recipe.bookmarked = false);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const getSearchResults = async (query) => {
  try {
    state.search.query = query;
    const { data } = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getResultsPerPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = (newServings) => {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = (recipe) => {
  state.bookmarks.push(recipe);
  recipe.id === state.recipe.id && (recipe.bookmarked = true);

  persistBookmarks();
};

export const removeBookmark = (id) => {
  const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  state.recipe.bookmarked = false;

  persistBookmarks();
};

export const persistBookmarks = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const getBookmarksFromStorage = () => {
  const storage = localStorage.getItem("bookmarks");
  if (storage) {
    state.bookmarks = JSON.parse(storage);
  }
};

export const uploadRecipe = async (data) => {
  try {
    const ingredients = Object.entries(data)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const tempIng = ing[1].split(",");
        return {
          quantity: tempIng[0] === "" ? null : +tempIng[0],
          unit: tempIng[1],
          description: tempIng[2],
        };
      });

    const newRecipe = {
      ingredients,
      source_url: data.sourceUrl,
      image_url: data.image,
      title: data.title,
      publisher: data.publisher,
      cooking_time: +data.cookingTime,
      servings: +data.servings,
    };
    const { recipe } = (await sendJSON(`${API_URL}?key=${API_KEY}`, newRecipe))
      .data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cooking_time,
      key: recipe.key,
    };
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
