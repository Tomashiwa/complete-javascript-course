// Handles the search bar and search button

// USING _ PROTECTED AS BABEL CANNOT HANDLE THE PRIVATE CLASS FIELD YET
class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    // This could have been done in controller.js, but since this interacts with DOM
    // it should go under View
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    // Using "submit" event to allow user to search via click or enter
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
