const arrowUp = document.getElementById('arrowUp');
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');
const arrowDown = document.getElementById('arrowDown');
// const mainContainer = document.getElementById('mainContainer');

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0};

// For touch support
// let gestureDown = { x: 0, y: 0 };
// let gestureUp = { x: 0, y: 0 };

window.addEventListener('keydown', handleDirection);
window.addEventListener('click', handleMobileDirection);
// mainContainer.addEventListener('touchstart', handleTouchStart, false);
// mainContainer.addEventListener('touchmove', handleTouchMove, false);

function handleDirection(e) {
  switch (e.keyCode) {
    case 87:
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case 83:
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case 65:
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case 68:
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
  }
}

function handleMobileDirection(e) {
  switch(e.target) {
    case arrowUp:
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case arrowDown:
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case arrowLeft:
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case arrowRight:
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
  }
}

function getTouches(e) {
  return e.touches;
}

function handleTouchStart(e) {
  const touchStart = getTouches(e)[0];
  gestureDown.x = touchStart.clientX;
  gestureDown.y = touchStart.clientY;
}

function handleTouchMove(e) {
  if (!gestureDown.x|| !gestureDown.y) return;

  gestureUp.x = e.touches[0].clientX;
  gestureUp.y = e.touches[0].clientY;

  let xDiff = gestureDown.x - gestureUp.x;
  let yDiff = gestureDown.y - gestureUp.y;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      // Left Swipe
        if (lastInputDirection.x !== 0) return;
        inputDirection = { x: -1, y: 0 };
      } else {
      // Right Swipe
        if (lastInputDirection.x !== 0) return;
        inputDirection = { x: 1, y: 0 };
      }
  } else {
    if (yDiff > 0) {
      // Up Swipe
      if (lastInputDirection.y !== 0) return 
      inputDirection = { x: 0, y: -1 }; 
    } else {
      // Down Swipe
      if (lastInputDirection.y !== 0) return;
      inputDirection = { x: 0, y: 1 };
    }
  }

  gestureDown = { x: 0 , y: 0 };
}

export function getInputDirection () {
  lastInputDirection = inputDirection;
  return inputDirection;
}