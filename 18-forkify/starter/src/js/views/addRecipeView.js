// Handle the pagination buttons
import View from './View';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _msg = 'Recipe was successfully uploaded!';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  // Initialize event listeners with constructor
  constructor() {
    super();
    this._addHandlerToggle();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  // Handlers for toggling overlay and window
  _addHandlerToggle() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      // Spreading this FormData object gives us field values in entries form
      // Entries -> Array of [KEY, VALUE] arrays
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateHTML() {}
}

export default new AddRecipeView();
