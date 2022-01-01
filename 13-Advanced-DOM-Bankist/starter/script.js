'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  // PREVENT <a> DEFAULT BEHAVIOR OF SCROLLING FULLY TO IT AFTER CLICKING IT
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  // Traditional way of scrolling to an element
  /*
  const s1coords = section1.getBoundingClientRect();
  const btncoords = e.target.getBoundingClientRect();
  // x/left, y/top - element's offset from the left and top of the viewport
  // width, height - element's width and height
  console.log('s1coords', s1coords);
  console.log('btncoords', btncoords);

  // Viewport's offset from left and top of the page
  console.log('Current scroll (x,y)', window.pageXOffset, window.pageYOffset);

  // Since s1coord's left and top only consider the offset from left and top of viewport,
  // we will need to include how much horizontal and vertical scrolling were made
  window.scrollTo({
    left: window.pageXOffset + s1coords.left,
    top: window.pageYOffset + s1coords.top,
    behavior: 'smooth',
  });
  */

  // Modern way of scrolling to an element
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation via NavBar
/*
document.querySelectorAll('.nav__link').forEach(element => {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    // Put scroll target element ID to href attribute of nav element
    // Easy retrieve and scroll to
    const id = this.getAttribute('href'); // Relative URL
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

// Event delegation
// Use the fact that events bubble up, put an eventListener at the common parent of elements
// that share the same callback function. So, only 1 copy of the function is required
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target); // Allow us to know the origin of the event (ie. which nav button)

  e.preventDefault();
  // Matching strategy
  // Ensure that we are clicking on nav buttons
  if (e.target.classList.contains('nav__link')) {
    // Put scroll target element ID to href attribute of nav element
    // Easy retrieve and scroll to
    const id = e.target.getAttribute('href'); // Relative URL
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
// Using event delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  if (!clicked) return;

  // Swapping active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activating content area
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`) // tab is from data-tab attribute
    .classList.add(`operations__content--active`);
});

// Fade animation in NavBar when hover a link
const handleHover = function (e) {
  // this --> Opacity given
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // Links at the right
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // Image link at the left
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(sibling => {
      if (sibling !== link) sibling.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// Can use .bind(...) to pass arguments into the callback without having to create an higher-order function
nav.addEventListener('mouseover', handleHover.bind(0.5)); // MouseEnter does not bubble, so MouseOver
nav.addEventListener('mouseout', handleHover.bind(1.0));

// Sticky navigation
// Inefficient way
/*
// To get distance from top of section 1 to top of page
const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/

// Sticky navigation - Interaction Observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries; // first entry
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // Push up the start of threshold
});
headerObserver.observe(header);
/*
const obsCallback = function (entries, observer) {
  console.log('ping');
  entries.forEach(entry => console.log(entry));
};
const obsOptions = {
  root: null, // Element that the target is intersecting, null -> entire viewport
  // At what amount of interaction, should the intersection be called
  // No matter scrolling up or down
  threshold: 0.5,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1); // Target to observe
*/

// Reveal sections through scrolling
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Reveal
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target); // Since sections has already been revealed
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
// An observer can observe multiple elements intersecting an element at the same time
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]'); // Select all <img data-src=...>

const loadImg = function (entries, observer) {
  const [entry] = entries; // only 1 threshold, so only 1 entry

  if (!entry.isIntersecting) return;

  // Switch to full res image
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    // Remove blur filter upon loading finish
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // Start loading when the scroll is 200px above the image
});
imgTargets.forEach(target => {
  imgObserver.observe(target);
});

// Slider component
// Put all into a function to prevent global namespace pollution
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slider = document.querySelector('.slider');
  const dotContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const highlightDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`) // Select specific dot
      .classList.add('dots__dot--active');
  };

  // Going left and right in slider
  const maxSlide = slides.length;
  let curSlide = 0;
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
    highlightDot(slide);
  };
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  // Initialize slider
  createDots();
  goToSlide(0);

  // Going left and right via buttons
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Going left and right via left and right arrow keys
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  // Change slides using dot buttons (event delegation with dot container)
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
    }
  });
};
slider();
////////////////////////////////////////////////////////////////////////////
// LECTURE

// Select, Create, and Delete elements
/*
// Selecting elements (QuerySelector & getElementsBy...)
// Primary elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// QuerySelector
// Modern way of retrieving elements
// Present multiple elements in a NodeList
console.log(document.querySelector('.header'));
console.log(document.querySelectorAll('.section'));

// GetElementBy...
// Traditional way of retrieving elements but generally faster
// Present multiple elements in a HTMLCollection that is Live
// Live --> Auto-update the data structure if an element is added or removed
console.log(document.getElementsByClassName('header')[0]);
console.log(document.getElementsByClassName('section'));

// Creating and inserting elements
// .insertAdjacentHTML

// .createElement(TAG_NAME)
const msg = document.createElement('div'); // Just a DOM object, not in the page yet
msg.classList.add('cookie-message');
// msg.textContent = "We use cookies for improved functionality and analytics.";
msg.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// prepend --> Add as first child | append --> Add as last child
// document.querySelector('.header').prepend(msg);
document.querySelector('.header').append(msg);
// before --> Before the element | after --> After the element
// document.querySelector('.header').before(msg);
// document.querySelector('.header').after(msg);

// Delete elements
// ELEMENT.remove()
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => msg.remove());
*/

// Styling, Attributes, and Classes
/*
// Styling
// Inline styling
msg.style.backgroundColor = '#37383d';
msg.style.width = '105%';
console.log(msg.style.backgroundColor);
console.log(msg.style.color); // Cannot be found as .style can only access inline styles
// getComputedStyle() - Get all CSS properties of an element
console.log(getComputedStyle(msg).color);
msg.style.height = Number.parseFloat(getComputedStyle(msg).height) + 40 + 'px'; // parseFloat to extract value from ...px
// CSS custom properties (similar to variables in JS)
// JS can modify them by accessing the root element (documentElement)
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
// Attributes that are a standard in the element type, can be directly access and modify
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
logo.alt = 'Just another logo';
// Non-standard attributes can only be accessed and modified through getters and setters
logo.setAttribute('designer', 'toma');
console.log(logo.getAttribute('designer'));
// Note. URL are presented as relative or absolute depending on hwo it is accessed
console.log(logo.src); // absolute
console.log(logo.getAttribute('src')); // relative
// Custom data attributes (through a map of "data-*" to string)
logo.setAttribute('data-version-number', '2.1.0');
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('class1', 'class2'); // can be multiple
logo.classList.remove('class1', 'class2');
logo.classList.toggle('class1');
console.log(logo.classList.contains('class1'));
*/

// Event handling
/*
// Types of events: https://developer.mozilla.org/en-US/docs/Web/Events
// Adding and removing event callbacks
const h1 = document.querySelector('h1');
// .addEventListen(...) / .removeEventListener(...)
// Can stack up callback functions to be executed on 1 event
const ping = function () {
  alert('eventListener: ENTER');
  h1.removeEventListener('mouseenter', ping);
};
h1.addEventListener('mouseenter', ping);

// .onEVENT_NAME = ...
// Only allow 1 callback function per event
h1.onmouseenter = function () {
  alert('onmouseenter: ENTER');
};
// Event callback can also be written inline in html
// <h1 onClick="alert("html alert")"> ...
*/

// Event Bubbling and Capturing
// When an event happen, the event object gets generated at the root of the DOM tree
// 1) Capturing phase
// Event object gets passed down all the way to the target element, going through target
// element's parent and ancestors. Callback maybe executed if it has been flagged to run
// in capturing phase
// 2) Target phase
// Target element handles the event by running its callback function for it
// 3) Bubbling phase
// Event object travels back up to the root through the parent/ancestors elements, calling
// their corresponding callback if they are listening for that event
/*
const randomInt = (min, max) => Math.ceil(Math.random() * (max - min) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();

  // e.target - Element that is actually clicked
  // e.currentTarget - Current element where the callback function is executed from
  console.log('LINK', e.target, e.currentTarget);

  // Can stop propagation (ie. bubble up)
  // e.stopPropagation();

  // Force the callback function to be executed in capturing phase
  // }, true);
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAVBAR', e.target, e.currentTarget);
});
*/

// DOM Traversal
/*
const h1 = document.querySelector('h1');
console.log(h1);
// Descendent elements (Downwards)
console.log(h1.querySelectorAll('.highlight')); // Selecting from h1's descendents
console.log(h1.childNodes); // Selecting direct children nodes in the DOM tree (NodeList)
console.log(h1.children); // Selecting direct children elements (HTMLCollection)
console.log(h1.firstElementChild); // First child element
console.log(h1.lastElementChild); // Last child element
// Ancestor elements (Upwards)
console.log(h1.parentNode); // Direct parent node
console.log(h1.parentElement); // Direct parent element
console.log(h1.closest('.header')); // Closest ancestor element that matches the query string
// Sibling elements (Sideways) - Only direct siblings
console.log(h1.previousSibling); // node
console.log(h1.previousElementSibling); // element
console.log(h1.nextSibling);
console.log(h1.nextElementSibling);
console.log(h1.parentElement.children); // Go to parent to find all siblings of this element (HTMLCollection)
*/

// Useful DOM Lifecycle events
/*
// DOM Content Loaded
// Fired as soon as the HTML document has been parsed as DOM tree. Other dependences may not
// be loaded yet. If there is any synchronous reference to .JS, they will be loaded.
// Note. JS file reference is usually placed at the bottom of the HTML, the .JS code don't
// need to explictly wait for DOMContentLoaded to fire before executing
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('DOM tree loaded', e);
});

// Load
// Fired when the entire page is loaded including dependencies like stylesheets and images
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// Before Unload
// Fired when the page are about to be closed
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log('Before closing', e);
  e.returnValue = 'aaa';
});
*/
