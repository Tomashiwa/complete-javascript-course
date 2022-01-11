import * as model from './model';
import recipeView from './views/recipeView';

import 'regenerator-runtime/runtime'; // Polyfill async await
import 'core-js/stable'; // Polyfill remaining stuff
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';

// Ask Parcel to only load this if its dirty
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    // Obtaining the hash value from URL (eg. #XXXXXXXXX)
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Initiates a spinner
    recipeView.renderSpinner();

    // Mark selection on search results
    resultsView.update(model.getSearchResultsPage());

    // Load recipe
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Render bookmark dropdown to highlight if any
    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    // console.error(err);

    // Errors thrown by model are also propagated to here
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // Get query
    const query = searchView.getQuery();
    if (!query) return;

    // Get search results
    await model.loadSearchResults(query);

    // Render results
    resultsView.render(model.getSearchResultsPage(1));

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goto) {
  // Render a page's results
  resultsView.render(model.getSearchResultsPage(goto));

  // Render a new set of pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update servings
  model.updateServings(newServings);

  // Update view
  // recipeView.render(model.state.recipe); // Full render
  recipeView.update(model.state.recipe); // Only re-render modified elements
};

const controlAddBookmark = function () {
  // Add / remove bookmarks in modal
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else if (model.state.recipe.bookmarked) {
    model.removeBookmark(model.state.recipe.id);
  }

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks in dropdown
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  // Render bookmarks into bookmark list upon load
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render new recipe
    recipeView.render(model.state.recipe);

    // Render success message
    addRecipeView.renderMessage();

    // Render bookmark dropdown view
    bookmarksView.render(model.state.bookmarks);

    // Update browser URL to have recipe ID (with hash) without loading page
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(() => addRecipeView.toggleWindow(), MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  // Subscribe to Views with a callback func
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();

// Won't be handled here as adding event listener is more of a DOM and UI operation
// Instead, we will use a pub-sub pattern with the view being publisher and controller being a subscriber

// hashChange event
// Fired only when the fragment identifier of the URL has changed
//  -> The part of the URL beginning with and following the # symbol
// ['hashchange', 'load'].forEach(event =>
//   window.addEventListener(event, controlRecipes)
// );
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe); // When user directly load the page with #
