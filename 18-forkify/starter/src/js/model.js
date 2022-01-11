import { API_URL, KEY, RESULTS_PER_PAGE } from './config';
import { AJAX } from './helper';

// Since imported values are live references, any modification to state via loadRecipe(...)
// will be reflected in the state
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
  },
  bookmarks: [],
};

const createRecipeObj = function (data) {
  let recipe = data.data.recipe;
  recipe = {
    ...recipe,
    cookingTime: recipe.cooking_time,
    sourceUrl: recipe.source_url,
    imageUrl: recipe.image_url,
  };
  delete recipe.source_url;
  delete recipe.image_url;
  delete recipe.cooking_time;
  return recipe;
};

// Fetch a recipe and update the model's state
export const loadRecipe = async function (id) {
  try {
    // Fetching a recipe from API
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    // Format recipe by removing _ from its keys
    state.recipe = createRecipeObj(data);

    // Restore a recipe's bookmark status
    state.recipe.bookmarked = state.bookmarks.some(
      bookmark => bookmark.id === id
    );
  } catch (err) {
    // Propagate error back to controller to be caught and displayed
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        imageUrl: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
        ...(rec.key && { key: rec.key }), // Verify key's existence before adding
      };
    });

    // Reset page back to 1
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

// Return a subset of search results, corresponding to user's page
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  // Compute the indexes of the 1st and last item in the given page
  const start = (page - 1) * RESULTS_PER_PAGE;
  const end = page * RESULTS_PER_PAGE;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  // Update ingredient quantity based on new servings given
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  persistBookmarks();
};

export const removeBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  persistBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    // Format ingredients for upload
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(entry => {
        const ing = entry[1];
        // Extract ingredient info
        const ings = ing.split(',').map(el => el.trim());
        if (ings.length !== 3) throw new Error('Wrong format for ingredient!');

        const [quantity, unit, description] = ings;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });

    // Format recipe for upload
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObj(data);

    // Bookmarked user-created recipe
    addBookmark(state.recipe);
  } catch (err) {
    // Since this function is async, any error occur needs to be caught and throw upwards
    throw err;
  }
};

// Load persisted bookmarks upon page load
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
