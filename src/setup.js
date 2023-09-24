const Ship = require('./ship.js');
const showNotification = require('./utility/showNotification.js');
let targetedCells = [];
let currentDraggedShip = null;
let rotation = 'horizontal';
let isShipOutOfBounds = null;
let isColliding = false;
let boardSize = null;

const shipPositionDisplay = document.getElementById('ship-position');

function handleRotationClick() {
  rotation = rotation === 'horizontal' ? 'vertical' : 'horizontal';
  shipPositionDisplay.classList.toggle('vertical');
  shipPositionDisplay.innerText = `Ship orientation: ${rotation}`;
  const displayedShips = document.querySelectorAll('.draggable-ship');
  displayedShips.forEach((ship) => ship.classList.toggle('rotated'));
}

function addRotationEventListener() {
  shipPositionDisplay.addEventListener('click', handleRotationClick);
}

function removeRotationEventListener() {
  shipPositionDisplay.addEventListener('click', handleRotationClick);
}

function createDropZones(player1, player2) {
  const board = player1.getBoard();
  boardSize = board.length;

  const boardContainer = document.getElementById('setup-screen');
  boardContainer.innerHTML = '';

  for (let row = 0; row < boardSize; row++) {
    const rowHTML = document.createElement('div');
    rowHTML.classList.add('row-dropzone');

    for (let col = 0; col < boardSize; col++) {
      const dropZone = document.createElement('div');
      dropZone.className = 'drop-zone';
      dropZone.dataset.coordX = col;
      dropZone.dataset.coordY = row;

      rowHTML.appendChild(dropZone);

      dropZone.addEventListener('dragover', handleDragOver);

      dropZone.addEventListener('dragleave', handleDragLeave);

      // HandleDrop function needs player to place ship on drop;
      const handleDropBind = handleDrop.bind({ player1, player2 });
      dropZone.addEventListener('drop', handleDropBind);
    }
    boardContainer.appendChild(rowHTML);
  }
}

function handleDragOver(event) {
  event.preventDefault(); // Allow drop

  // Extract row and column information from the drop target
  const { coordX, coordY } = event.target.dataset;
  const col = Number(coordX);
  const row = Number(coordY);

  // Checks if draggable element is valid for dropping
  const shipLength = currentDraggedShip ? currentDraggedShip.length : null;

  targetedCells = [];
  isColliding = false;

  if (rotation === 'horizontal') {
    // Check horizontal bounds and collect targeted cells;
    isShipOutOfBounds = shipLength + col > boardSize;
    for (let i = col; i < shipLength + col; i++) {
      const targetedCell = document.querySelector(
        `[data-coord-x="${i}"][data-coord-y="${row}"]`
      );

      // check if cell is inside board
      isColliding = areShipsColliding(targetedCell);
    }
  } else if (rotation === 'vertical') {
    // Check vertical bounds and collect targeted cells
    isShipOutOfBounds = shipLength + row > boardSize;
    for (let i = row; i < shipLength + row; i++) {
      const targetedCell = document.querySelector(
        `[data-coord-x="${col}"][data-coord-y="${i}"]`
      );
      isColliding = areShipsColliding(targetedCell);
    }
  }

  // Check if ship is inside bounds and add appropriate classes
  targetedCells.forEach((targetedCell) => {
    if (isShipOutOfBounds || isColliding) {
      targetedCell.classList.add('out-of-bounds');
    } else {
      targetedCell.classList.add('in-bounds');
    }
  });
}

function handleDragLeave(event) {
  // Remove styling when elements dragged out of the cell
  targetedCells.forEach((targetedCell) =>
    targetedCell.classList.remove('out-of-bounds', 'in-bounds')
  );
}

// Function to handle ship placement on the game board
function handleDrop(event) {
  event.preventDefault();

  // Extract row and column information from the drop target
  const { coordX, coordY } = event.target.dataset;
  const col = Number(coordX);
  const row = Number(coordY);

  // Does nothing when elements other than ships are dragged
  if (!currentDraggedShip) {
  }
  // Check if drop is valid
  else if (isColliding || isShipOutOfBounds) {
    // Handle wrongly placed ships
    showNotification(`Invalid ship placement.`, 800);
  } else {
    // Add proper styling for correctly placed ships
    targetedCells.forEach((targetedCell) => {
      targetedCell.classList.add('placed', 'ship');
    });

    // Place ship on players gameboard
    const shipLength = currentDraggedShip.length;
    this.player1.placeShip(shipLength, col, row, rotation);
    this.player2.placeShip(shipLength, col, row, rotation);

    // Remove placed ship HTMLElement
    removeCurrentlyDroppedShip();

    // Create reset button and play button if needed
    createResetButton();
    if (isShipContainerEmpty()) createPlayButton();
  }

  // Remove indicating styling
  targetedCells.forEach((targetedCell) =>
    targetedCell.classList.remove('out-of-bounds', 'in-bounds')
  );
}

function removeCurrentlyDroppedShip() {
  const shipId = currentDraggedShip.id;
  const shipElement = document.getElementById(`${shipId}`);
  shipElement.remove();
  currentDraggedShip = null;
}

function areShipsColliding(targetedCell) {
  if (targetedCell) {
    targetedCells.push(targetedCell);
    // Check if collides with other ship
    if (targetedCell.classList.contains('ship')) return true;
  }
}

function isShipContainerEmpty() {
  const shipsContainer = document.getElementById('ship-container');
  return !shipsContainer.hasChildNodes();
}

function createPlayButton() {
  const playButton = document.createElement('button');
  playButton.innerText = 'Start';
  playButton.id = 'start-button';
  playButton.addEventListener('click', () => {
    const playEvent = new Event('startGame');
    document.dispatchEvent(playEvent);
    resetShipOrientation();
  });
  const buttonsContainer = document.getElementById('buttons-container');
  buttonsContainer.appendChild(playButton);
}

function createResetButton() {
  const resetButton = document.createElement('button');
  resetButton.innerText = 'Reset';
  resetButton.id = 'reset-button';
  resetButton.addEventListener('click', () => {
    const resetEvent = new Event('resetGame');
    document.dispatchEvent(resetEvent);
    resetShipOrientation();
  });
  const buttonsContainer = document.getElementById('buttons-container');
  buttonsContainer.innerHTML = '';
  buttonsContainer.appendChild(resetButton);
}

// RESET SHIP ORIENTATION TO HORIZONTAL!
function resetShipOrientation() {
  rotation = 'horizontal';
  if (shipPositionDisplay.classList.contains('vertical'))
    shipPositionDisplay.classList.remove('vertical');
  shipPositionDisplay.innerText = `Ship orientation: ${rotation}`;
}

function createShips() {
  const ships = [];
  const carrier = Ship(5);
  const battleship = Ship(4);
  const cruiser = Ship(3);
  const submarine = Ship(3);
  const destroyer = Ship(2);
  ships.push(carrier, battleship, cruiser, submarine, destroyer);
  return ships;
}

function displayShips() {
  const ships = createShips();
  const shipContainer = document.getElementById('ship-container');
  shipContainer.innerHTML = '';
  ships.forEach((ship, index) => {
    const shipElement = document.createElement('div');
    shipElement.className = 'draggable-ship';

    shipElement.id = `ship-${index}`;
    shipElement.dataset.length = ship.length;

    shipElement.draggable = true;

    shipElement.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', event.target.id);
      currentDraggedShip = {
        id: event.target.id,
        length: ship.length,
      };
    });

    shipContainer.appendChild(shipElement);
  });
}

function showSetupWindow() {
  const setupDisplay = document.getElementById('setup-display');
  setupDisplay.classList.remove('hidden');
}

module.exports = {
  createDropZones,
  displayShips,
  addRotationEventListener,
  removeRotationEventListener,
  showSetupWindow,
};
