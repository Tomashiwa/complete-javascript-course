// Get relative path to assets via Parcel in a shipping product
import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  // Element to render view to
  _parentElement = document.querySelector('.recipe');
  // Data to render
  _data;
  // What the messages contain, should be known by the View instead of the controller
  _errorMsg = 'We could not find that recipe. Please try another one!';
  _msg;

  // Render the View
  render(data, render = true) {
    // Display error when data not found or data is empty
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    if (!render) return this._generateHTML(); // use "render" boolean to determine returning the HTML or not

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', this._generateHTML());
  }

  // Update the modified elements of the View
  update(data) {
    this._data = data;

    const newHTML = this._generateHTML();
    // Parses the HTML to a fragment (virtual DOM) -> Only contains the elements stated in the HTML
    // Range -> A fragment that contains nodes and text nodes
    const newDOM = document.createRange().createContextualFragment(newHTML);

    // Update the elements that are modified
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== '' // Check if it has a text node with content
      ) {
        // Update element's text content
        currEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(currEl)) {
        // Update element's attribute
        Array.from(newEl.attributes).forEach(newAttr => {
          currEl.setAttribute(newAttr.name, newAttr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const html = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    // Remove any children element in parentEl
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  // Render error in the recipe container
  renderError(msg = this._errorMsg) {
    const html = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${msg}</p>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderMessage(msg = this._msg) {
    const html = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${msg}</p>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}
