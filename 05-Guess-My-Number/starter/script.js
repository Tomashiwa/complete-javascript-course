'use strict';

let secret = Math.trunc(Math.random() * 20) + 1;
console.log(`Secret: ${secret}`);

let score = 20;
let highScore = 0;

const displayMsg = function (msg) {
  document.querySelector('.message').textContent = msg;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (score <= 0) {
    return;
  } else if (!guess || guess <= 0 || guess > 20) {
    score -= 1;
    displayMsg('⚠ Invalid guess!');
  } else if (guess === secret) {
    // Modify CSS style via ELEMENT.style.XXX = XXX
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    document.querySelector('.number').textContent = secret;
    displayMsg('🎈 Correct guess!');
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== secret) {
    score -= 1;
    displayMsg(guess > secret ? '☝ Too high!' : '👇 Too low!');
  }

  document.querySelector('.score').textContent = String(score);
  if (score <= 0) {
    displayMsg('🧨 You lost the game...');
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;

  // Reset CSS styling
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  // Reset UI values
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  displayMsg('Start guessing...');
  document.querySelector('.score').textContent = String(score);

  secret = Math.trunc(Math.random() * 20) + 1;
  console.log(`Secret: ${secret}`);
});
