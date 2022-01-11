import View from './View';
import previewView from './previewView';
// Get relative path to assets via Parcel in a shipping product
// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  // What the messages contain should be known by the View
  _errorMsg = 'No bookmarks yet! Find a nice recipe and bookmark it.';
  _msg = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateHTML() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
