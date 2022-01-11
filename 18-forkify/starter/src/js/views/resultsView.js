import View from './View';
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
