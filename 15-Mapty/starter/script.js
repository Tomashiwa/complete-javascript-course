'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  id = String(Date.now());
  date = new Date();

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription() {
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(
      1
    )} on ${new Intl.DateTimeFormat(navigator.language, {
      day: '2-digit',
      month: 'long',
    }).format(this.date)}`;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class App {
  #map;
  #mapEvent;
  #zoomLevel = 13;

  constructor() {
    // Get user's location
    this._getPosition();

    // Load workouts from local storage
    this.workouts = [];
    this._loadLocalStorage();

    // Setup event listeners
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToMarker.bind(this));
  }

  _getPosition() {
    /*
    The thing is that we don't call the _loadMap() method in this line

    We just pass it as an argument, and it will be called later by the internal code of 
    getCurrentPosition(). This means that the _loadMap() method will be called as a normal 
    function, without the context of 'this' from the time it was passed as an argument 
    (functions get their value of 'this' when they are called).

    ie. the callback function, _loadMap, becomes a regular variable when its passed as an arugment
    */
    navigator.geolocation?.getCurrentPosition(this._loadMap.bind(this), err =>
      console.log('Error', err)
    );
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    // Define map + center it on user's location
    this.#map = L.map('map').setView(coords, this.#zoomLevel);

    // Define tileset to use
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.workouts.forEach(workout => this._addMarker(workout));

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Clear input fields + Hide form
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // Hide the form instantly through direct styling, allowing the new workout to take over the
    // form's position immediatelyand skip the animation
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    // Toggle the CSS class that reveal/hide the form with the input element
    inputElevation.closest('div').classList.toggle('form__row--hidden');
    inputCadence.closest('div').classList.toggle('form__row--hidden');
  }

  _renderWorkout(workout) {
    form.insertAdjacentHTML(
      'afterend', // insert right after form as a sibling element
      `<li class="workout workout--${workout.type}" data-id=${workout.id}>
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${
            workout.type === 'running'
              ? workout.pace.toFixed(1)
              : workout.speed.toFixed(1) // 1 d.p
          }</span>
          <span class="workout__unit">${
            workout.type === 'running' ? 'min/km' : 'km/h'
          }</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🦶🏼' : '⛰'
          }</span>
          <span class="workout__value">${
            workout.type === 'running' ? workout.cadence : workout.elevation
          }</span>
          <span class="workout__unit">${
            workout.type === 'running' ? 'spm' : 'm'
          }</span>
        </div>
      </li>`
    );
  }

  _addMarker(workout) {
    L.marker(workout.coords) // Create marker @ ...
      .addTo(this.#map)
      .bindPopup(
        // Bind a popup to the marker
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false, // Dont close popup when a new popup is opened
          closeOnClick: false, // Dont close popup when click happens on map
          className: `${workout.type}-popup`, // Assign CSS class name to the popup
        }).setContent(
          `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
        )
      )
      .openPopup();
  }

  _allNumbers(...inputs) {
    return inputs.every(input => Number.isFinite(input));
  }

  _allPositive(...numbers) {
    return numbers.every(number => number > 0);
  }

  _newWorkout(e) {
    e.preventDefault();

    // Read input from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;

    // Construct the workout (Running/Cycling) and add to the array
    let workout;
    if (type === 'running') {
      const cadence = +inputCadence.value;
      if (
        !this._allNumbers(distance, duration, cadence) ||
        !this._allPositive(distance, duration, cadence)
      )
        return;
      workout = new Running([lat, lng], distance, duration, cadence);
    } else if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !this._allNumbers(distance, duration, elevation) ||
        !this._allPositive(distance, duration, elevation)
      )
        return;
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    this.workouts.push(workout);

    // Add workout to the map as a marker
    this._addMarker(workout);

    // Refresh the list with the new workout
    this._renderWorkout(workout);

    // Clear fields + hide form
    this._hideForm();

    // Save to local storage
    this._setLocalStorage();
  }

  _moveToMarker(e) {
    const workoutEle = e.target.closest('.workout');

    if (!workoutEle) return;

    const workout = this.workouts.find(
      workout => workout.id === workoutEle.dataset.id
    );

    this.#map.setView(workout.coords, this.#zoomLevel);
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }

  _loadLocalStorage() {
    /*
    Class fields of Workout, Cycling, and Running has been modified to no longer be FAKE private
    or REAL private. 
    
    For FAKE private, the parsing will result in the fields having "_" in front instead of using 
    the getter's name. This require us to do an additional step to re-map the key names.
      -> In IRL situation, this will be optimal solution

    For REAL private, the parsing simply dont include the private fields into the final string
    */
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.workouts = data;
    this.workouts.forEach(workout => this._renderWorkout(workout));
  }

  // Reset app's state
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
