'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const curr0El = document.querySelector('#current--0');
const curr1El = document.querySelector('#current--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currScore, turn, isPlaying;

const initialise = function () {
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');

  curr0El.textContent = 0;
  curr1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  scores = [0, 0];
  currScore = 0;
  isPlaying = true;
  turn = 0;
};

// Switch player
const switchPlayer = function () {
  currScore = 0;
  document.querySelector(`#current--${turn}`).textContent = 0;
  turn = turn === 0 ? 1 : 0;

  // Add class if not in class list, Remove class if its in class list
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice
const rollDice = function () {
  if (!isPlaying) {
    return;
  }

  // Generate random dice roll
  const value = Math.trunc(Math.random() * 6) + 1;
  console.log(`Player ${turn} rolled ${value}`);

  // Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${value}.png`;

  if (value === 1) {
    switchPlayer();
  } else {
    // Add dice to current score
    currScore += value;
    document.querySelector(`#current--${turn}`).textContent = currScore;
  }
};
btnRoll.addEventListener('click', rollDice);

// Hold
const hold = function () {
  if (!isPlaying) {
    return;
  }

  // Update score display
  scores[turn] += currScore;
  document.querySelector(`#score--${turn}`).textContent = scores[turn];

  // Determine winner or switch player
  if (scores[turn] >= 20) {
    isPlaying = false;
    // Adding and removing classes to change style and visibility of elements
    document.querySelector(`.player--${turn}`).classList.add('player--winner');
    document
      .querySelector(`.player--${turn}`)
      .classList.remove('player--active');
    diceEl.classList.add('hidden');
  } else {
    switchPlayer();
  }
};
btnHold.addEventListener('click', hold);

btnNew.addEventListener('click', initialise);

initialise();
