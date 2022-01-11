import View from './View';
// Get relative path to assets via Parcel in a shipping product
// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2
import previewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  // What the messages contain should be known by the View
  _errorMsg = 'No recipes found for your query! Please try again.';
  _msg = '';

  _generateHTML() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
