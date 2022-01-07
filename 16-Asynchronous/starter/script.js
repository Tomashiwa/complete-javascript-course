'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Traditional AJAX call
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send(); // Send request

  // Once data arrive, execute a callback function
  request.addEventListener('load', function () {
    // "this" refers to request, the object that the callback attaches to
    const [data] = JSON.parse(this.responseText);

    const cardHTML = `
      <article class="country">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
              <h3 class="country__name">${data.name.official}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                data.population / 1000000
              ).toFixed(1)} mil. people</p>
              <p class="country__row"><span>🗣️</span>${
                Object.values(data.languages)[0]
              }</p>
              <p class="country__row"><span>💰</span>${
                Object.values(data.currencies)[0].name
              }</p>
          </div>
      </article>`;

    // Reveal the container + Add card
    countriesContainer.style.opacity = 1;
    countriesContainer.insertAdjacentHTML('beforeend', cardHTML);
  });
};

// Order is not guaranteed as each asynchronous request is independent
getCountryData('Japan');
getCountryData('Singapore');
getCountryData('Russia');
getCountryData('Ireland');
*/

// Callback hell - Request made 1 after another where there are many nested callbacks
// Example here: A country and its neighbour country
/*
const renderCountry = function (data, className = '') {
  const cardHTML = `
      <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
              <h3 class="country__name">${data.name.official}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                data.population / 1000000
              ).toFixed(1)} mil. people</p>
              <p class="country__row"><span>🗣️</span>${
                Object.values(data.languages)[0]
              }</p>
              <p class="country__row"><span>💰</span>${
                Object.values(data.currencies)[0].name
              }</p>
          </div>
      </article>`;

  // Reveal the container + Add card
  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', cardHTML);
};

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  // Callback within a callback
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log('country:', data);

    // Main country
    renderCountry(data);

    // Neighbour country
    const [neighbourCode] = data.borders;
    if (!neighbourCode) return;

    const neighbourRequest = new XMLHttpRequest();
    neighbourRequest.open(
      'GET',
      `https://restcountries.com/v3.1/alpha/${neighbourCode}`
    );
    neighbourRequest.send();

    neighbourRequest.addEventListener('load', function () {
      const [neighbourData] = JSON.parse(this.responseText);
      console.log('neighbour:', neighbourData);

      renderCountry(neighbourData, 'neighbour');
    });
  });
};

getCountryAndNeighbour('portugal');
*/

// Fetch API - Modern way of AJAX Call
/*
const request = fetch('https://restcountries.com/v3.1/name/portugal'); // Simple GET
console.log(request);
*/

// Promises
// const renderCountry = function (data, className = '') {
//   console.log(data);
//   const cardHTML = `
//       <article class="country ${className}">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//               <h3 class="country__name">${data.name.official}</h3>
//               <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>👫</span>${(
//                 data.population / 1000000
//               ).toFixed(1)} mil. people</p>
//               <p class="country__row"><span>🗣️</span>${
//                 Object.values(data.languages)[0]
//               }</p>
//               <p class="country__row"><span>💰</span>${
//                 Object.values(data.currencies)[0].name
//               }</p>
//           </div>
//       </article>`;

//   // Add card
//   countriesContainer.insertAdjacentHTML('beforeend', cardHTML);
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
// };

// const getCountryJSON = function (url, errorMsg) {
//   return (
//     fetch(url) // Returns a promise
//       // response object's .json() returns a promise that converts the response's body into
//       // JSON to actually read the data
//       .then(response => {
//         /*
//         Response.ok
//         A boolean on whether the request was successful (ie. status of 200 to 299)
//         */
//         if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//         return response.json();
//       })
//   );
// };

// const getCountryData = function (country) {
//   /*
//   PROMISE.then(FULFILL_CALLBACK, REJECT_CALLBACK)
//   Returns a Promise that executes one of the given callbacks asynchronously when PROMISE
//   has been fulfilled or rejected

//   PROMISE.catch(REJECT_CALLBACK) <= equivalent => PROMISE.then(undefined, REJECT_CALLBACK)
//   Returns a Promise that executes the REJECT callback asynchronously when PROMISE has been
//   rejected

//   PROMISE.finally(CALLBACK)
//   Returns a Promise that executes a callback asynchronously when PROMISE has been settled
//   (ie. Fulfilled or Rejected)

//   Note: Any error/rejection a Promise encounters are propagated down to the nearest REJECT_CALLBACK
//   or .catch(...) to handle

//   throw new Error("...")

//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
//   */

//   getCountryJSON(
//     `https://restcountries.com/v3.1/name/${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       console.log(data);

//       renderCountry(data[0]);
//       if (!data[0].borders) throw new Error('No neighbour found!');

//       const neighbourCode = data[0].borders[0];
//       return getCountryJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbourCode}`,
//         'Neighbour not found'
//       );
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => renderError(err.message))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// // getCountryData('portugal');
// // getCountryData('abcdefg');
// getCountryData('portugal');

// // btn.addEventListener('click', getCountryData.bind(null, 'portugal'));

//////////////////////////////////////////////////////////////////////////////////////
// Coding challenge #1
/*
const c1 = [52.508, 13.381];
const c2 = [19.037, 72.873];
const c3 = [-33.933, 18.474];

const renderCountry = function (data, className = '') {
  const cardHTML = `
      <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
              <h3 class="country__name">${data.name.official}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                data.population / 1000000
              ).toFixed(1)} mil. people</p>
              <p class="country__row"><span>🗣️</span>${
                Object.values(data.languages)[0]
              }</p>
              <p class="country__row"><span>💰</span>${
                Object.values(data.currencies)[0].name
              }</p>
          </div>
      </article>`;
  // Add card
  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', cardHTML);
};

// 1
const whereAmI = function (lat, lng) {
  // 2, 3 ,4
  fetch(
    `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
  )
    .then(response => {
      // 5
      if (!response.ok)
        throw new Error('API limit reached, please try again later!');
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.display_name}`);
      return fetch(
        `https://restcountries.com/v3.1/name/${data.address.country}`
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found! (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);
    })
    .catch(err => console.error(`Something went wrong... ${err.message}`));
};

// btn.addEventListener('click', whereAmI.bind(null, ...c1));
whereAmI(...c1);
whereAmI(...c2);
whereAmI(...c3);
*/

// Event Loop
/*
  Order of output: 
    1) Synchronous code: "Start", "End" 
    [Since the other outputs are deferred]
    2) "P1 resolved" 
    [Takes priority due to microtasks queue]
    3) "P2 resolved" 
    [Takes priority due to microtasks queue]
    [Blocks the timeout callback as the Event Loop is waiting for P2's callback to complete execution]
    4) "Timeout of 0 completed"
*/
/*
console.log('Start');
setTimeout(() => console.log('Timeout of 0 completed'), 0);
Promise.resolve('P1 resolved').then(data => console.log(data));
Promise.resolve('P2 resolved').then(data => {
  for (let i = 0; i < 1000000; i++) {}
  console.log(data);
});
console.log('End');
*/

// Constructing a Promise
// new Promise((resolve, reject) => {...}) <-- Executor function
// resolve(RESOLVED_VALUE) --> Executing this sets the Promise as fulfilled with RESOLVED_VALUE
// reject(REASON) --> Executing this sets the Promise as reject with REASON
/*
const flipCoin = new Promise((resolve, reject) => {
  console.log('Flipping coin...');
  // Using setTimeout to simulate an asynchronous task's completion
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('Flip succeed, All stats x10!');
    }
    reject('Flip failed, All stats are halved!');
  }, 2000);
});
flipCoin.then(res => console.log(res)).catch(err => console.error(err));
*/

// Promisifying
// Convert callback based async behavior (eg. setTimeout) to promise based
/*
const wait = function (seconds) {
  console.log('Waiting begins');
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};
wait(2).then(() => console.log('2 seconds has passed'));
*/

// Instant resolved or rejected Promises
// Promise.resolve(VALUE) || Promise.reject(REASON)
/*
Promise.resolve('RESOLVED').then(res => console.log(res));
Promise.reject('REJECTED').catch(err => console.log(err));
*/

// Promisifying Geolocation API
/*
const getPosition = function () {
  // Promisify getting user's location
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

const renderCountry = function (data, className = '') {
  const cardHTML = `
      <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
              <h3 class="country__name">${data.name.official}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                data.population / 1000000
              ).toFixed(1)} mil. people</p>
              <p class="country__row"><span>🗣️</span>${
                Object.values(data.languages)[0]
              }</p>
              <p class="country__row"><span>💰</span>${
                Object.values(data.currencies)[0].name
              }</p>
          </div>
      </article>`;
  // Add card
  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', cardHTML);
};

const whereAmI = function () {
  // Chaining getting user's location to get user's country info
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      console.log(lat, lng);

      return fetch(
        `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
    })
    .then(response => {
      // 5
      if (!response.ok)
        throw new Error('API limit reached, please try again later!');
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.display_name}`);
      return fetch(
        `https://restcountries.com/v3.1/name/${data.address.country}`
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found! (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);
    })
    .catch(err => console.error(`Something went wrong... ${err.message}`));
};

btn.addEventListener('click', whereAmI);
*/

//////////////////////////////////////////////////////////////////////////////
// Coding Challenge #2
/*
// 1
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    console.log(`loading ${imgPath}`);

    const imageEle = document.createElement('img');
    imageEle.src = imgPath;

    // 2
    imageEle.addEventListener('load', () => {
      console.log(`loaded`);
      document.querySelector('.images').appendChild(imageEle);
      resolve(imageEle);
    });
    imageEle.addEventListener('error', () => {
      reject(new Error('Load failure'));
    });
  });
};

// 4, 5
const delayReturn = function (seconds, returning) {
  return new Promise(resolve =>
    setTimeout(resolve.bind(null, returning), seconds * 1000)
  );
};

createImage('./img/img-1.jpg')
  .then(element1 => delayReturn(2, element1))
  .then(element1 => {
    element1.style.display = 'none';
    return createImage('./img/img-2.jpg');
  })
  .then(element2 => delayReturn(2, element2))
  .then(element2 => (element2.style.display = 'none'))
  .catch(err => console.error(err));
*/

///////////////////////////////////////////////////////////////////////
// Async await
// Able to write async code with a similar appearance as synchronous code
// -> Synthetic sugar over the chaining promises and callbacks
// -> Always returns a promise with the async function's return value as its fulfilled value
/*
const getPosition = function () {
  // Promisify getting user's location
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};

const renderCountry = function (data, className = '') {
  const cardHTML = `
      <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
              <h3 class="country__name">${data.name.official}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                data.population / 1000000
              ).toFixed(1)} mil. people</p>
              <p class="country__row"><span>🗣️</span>${
                Object.values(data.languages)[0]
              }</p>
              <p class="country__row"><span>💰</span>${
                Object.values(data.currencies)[0].name
              }</p>
          </div>
      </article>`;
  // Add card
  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', cardHTML);
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const locationRes = await fetch(
      `http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
    );
    if (!locationRes.ok)
      throw new Error('API limit reached, please try again later!');
    const locationData = await locationRes.json();

    // Country data
    const countryRes = await fetch(
      `https://restcountries.com/v3.1/name/${locationData.address.country}`
    );
    if (!countryRes.ok)
      throw new Error(`Country not found! (${countryRes.status})`);
    const [countryData] = await countryRes.json();
    renderCountry(countryData);

    return `You are in ${locationData.display_name}`;
  } catch (err) {
    console.error(`1: Something went wrong... ${err.message}`);

    throw err;
  }
};

// btn.addEventListener('click', () => {
//   // Possible to have a hybrid approach where we mix promise with async await
//   whereAmI()
//     .then(value => console.log(value))
//     // Catching the rethrown error
//     .catch(err => console.error(`2: Something went wrong... ${err.message}`));
// });

// Immediately invoked function expression with an async function
(async function () {
  try {
    const res = await whereAmI();
    console.log(res);
  } catch (err) {
    console.error(`2: Something went wrong... ${err.message}`);
  }
})();
*/

// Promise combinators
// Promise.all(ARRAY_OF_PROMISES)
// Returns a Promise that resolves to an array of results from an array of input Promises
//  -> Short circuits when a promise rejected
/*
const getCountryJSON = async function (
  url,
  errorMsg = 'Something went wrong...'
) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);

  const data = await res.json();
  return data;
};

const get3Countries = async function (c1, c2, c3) {
  try {
    const responses = await Promise.all([
      getCountryJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getCountryJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getCountryJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(responses);
    console.log(responses.map(response => response[0].capital[0]));
  } catch (err) {
    console.error(err.message);
  }
};
get3Countries('japan', 'singapore', 'russia');
*/

// Promise.race(ARRAY_OF_PROMISES)
// Returns a Promise that resolves to the value returned by the 1st promise that settled
// (ie. fulfilled or rejected)
//  -> Only 1 promise will be settled and this overall promise will end
/*
const getCountryJSON = async function (
  url,
  errorMsg = 'Something went wrong...'
) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);

  const data = await res.json();
  return data;
};

(async function () {
  const response = await Promise.race([
    getCountryJSON(`https://restcountries.com/v3.1/name/ireland`),
    getCountryJSON(`https://restcountries.com/v3.1/name/canada`),
    getCountryJSON(`https://restcountries.com/v3.1/name/france`),
  ]);
  console.log(response[0].name.common);
})();
// Use case: Timeout-ing promises that took too long
const timeout = function (seconds) {
  return new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error('Timeout due to time limit')),
      seconds * 1000
    )
  );
};

(async function () {
  try {
    const response = await Promise.race([
      timeout(0.1),
      getCountryJSON(`https://restcountries.com/v3.1/name/canada`),
      getCountryJSON(`https://restcountries.com/v3.1/name/france`),
    ]);
    console.log(response[0].name.common);
  } catch (err) {
    console.error(err.message);
  }
})();
*/

// Promise.allSettled
// Returns a Promise that resolves to an array of results from an array of input Promises
// -> Waits until all promises have settled (resolved or rejected)
/*
Promise.allSettled([
  Promise.resolve('SUCCESS'),
  Promise.reject('FAILURE'),
  Promise.resolve('ANOTHER SUCCESS'),
]).then(res => console.log(res));
*/

// Promise.any
// Returns a Promise that resolves to the output of the 1st fulfilled Promise from an array
// of input Promises
// -> Short circuits when a Promise is fulfilled
/*
Promise.any([
  Promise.resolve('SUCCESS'),
  Promise.reject('FAILURE'),
  Promise.reject('ANOTHER FAILURE'),
]).then(res => console.log(res));
*/

////////////////////////////////////////////////////////////////////////
// Coding Challenge #3
/*
// 1, 2, 3
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    console.log(`loading ${imgPath}`);

    const imageEle = document.createElement('img');
    imageEle.src = imgPath;

    imageEle.addEventListener('load', () => {
      console.log(`loaded`);
      document.querySelector('.images').appendChild(imageEle);
      resolve(imageEle);
    });
    imageEle.addEventListener('error', () => {
      reject(new Error('Load failure'));
    });
  });
};

const wait = function (seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

const loadNPause = async function () {
  try {
    const img1 = await createImage('./img/img-1.jpg');
    await wait(2);

    img1.style.display = 'none';
    const img2 = await createImage('./img/img-2.jpg');
    await wait(2);

    img2.style.display = 'none';
  } catch (err) {
    console.error(err.message);
  }
};

// btn.addEventListener('click', loadNPause);

const loadAll = async function (imgArr) {
  try {
    const imgPromises = imgArr.map(img => createImage(img));
    console.log('promises:', imgPromises);
    const imgs = await Promise.all(imgPromises);
    console.log('imgs', imgs);

    imgs.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
*/
