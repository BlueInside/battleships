const Ship = require('./ship.js');
const showNotification = require('./utility/showNotification.js');
let targetedCells = [];
let currentDraggedShip = null;
let rotation = 'horizontal';
let isShipOutOfBounds = null;
let isColliding = false;
const shipPositionDisplay = document.getElementById('ship-position');

function handleRotationClick() {
  rotation = rotation === 'horizontal' ? 'vertical' : 'horizontal';
  shipPositionDisplay.classList.toggle('vertical');
  shipPositionDisplay.innerText = `Ship orientation: ${rotation}`;
  const displayedShips = document.querySelectorAll('.draggable-ship');
  displayedShips.forEach((ship) => ship.classList.toggle('rotated'));
}

function addRotationEventListener() {
  shipPositionDisplay.classList.toggle('hidden');
  shipPositionDisplay.addEventListener('click', handleRotationClick);
}

function removeRotationEventListener() {
  shipPositionDisplay.classList.toggle('hidden');
  shipPositionDisplay.addEventListener('click', handleRotationClick);
}

function createDropZones(player) {
  const board = player.getBoard();
  const boardContainer = document.getElementById('setup-screen');
  for (let row = 0; row < board.length; row++) {
    const rowHTML = document.createElement('div');
    rowHTML.classList.add('row-dropzone');
    for (let col = 0; col < board[row].length; col++) {
      const dropZone = document.createElement('div');
      dropZone.className = 'drop-zone';
      dropZone.dataset.cordX = col;
      dropZone.dataset.cordY = row;

      rowHTML.appendChild(dropZone);

      dropZone.addEventListener('dragover', (event) => {
        event.preventDefault(); // Allow drop
        // Checks if draggable element is valid for dropping
        const shipLength = currentDraggedShip
          ? currentDraggedShip.length
          : null;

        targetedCells = [];
        isColliding = false;

        if (rotation === 'horizontal') {
          // Check horizontal bounds and collect targeted cells;
          isShipOutOfBounds = shipLength + col > board.length;
          for (let i = col; i < shipLength + col; i++) {
            const targetedCell = document.querySelector(
              `[data-cord-x="${i}"][data-cord-y="${row}"]`
            );

            // check if cell is inside board
            if (targetedCell) {
              targetedCells.push(targetedCell);
              // Check if collides with other ship
              if (targetedCell.classList.contains('ship')) isColliding = true;
            }
          }
        } else if (rotation === 'vertical') {
          // Check vertical bounds and collect targeted cells
          isShipOutOfBounds = shipLength + row > board.length;
          for (let i = row; i < shipLength + row; i++) {
            const targetedCell = document.querySelector(
              `[data-cord-x="${col}"][data-cord-y="${i}"]`
            );

            // check if cell is inside board
            if (targetedCell) {
              targetedCells.push(targetedCell);
              // Check if collides with other ship
              if (targetedCell.classList.contains('ship')) isColliding = true;
            }
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
      });

      dropZone.addEventListener('dragleave', (event) => {
        // Remove the "out-of-bounds" class when the cursor leaves the cell
        targetedCells.forEach((targetedCell) =>
          targetedCell.classList.remove('out-of-bounds', 'in-bounds')
        );
      });

      dropZone.addEventListener('drop', (event) => {
        event.preventDefault();

        // Check if drop is valid
        if (isColliding || isShipOutOfBounds) {
          // HANDLE WHEN SHIP COLLIDES OR IS OUT OF BOUNDS
          showNotification(`Invalid ship placement.`, 800);
        } else {
          // HANDLE WHEN SHIP IS PLACED CORRECTLY
          targetedCells.forEach((targetedCell) => {
            targetedCell.classList.add('placed', 'ship');
          });

          // Remove placed ship HTMLElement
          const shipId = currentDraggedShip.id;
          const shipElement = document.getElementById(`${shipId}`);
          const shipLength = currentDraggedShip.length;

          // place ship on players gameboard
          player.placeShip(shipLength, col, row, rotation);
          shipElement.remove();

          // TODO fix issue where you can drag previous ship
          // by dragging random area into board
        }

        targetedCells.forEach((targetedCell) =>
          targetedCell.classList.remove('out-of-bounds', 'in-bounds')
        );

        // FINISHED HERE, I JUST MADE SHIPS DISPLAY IF OUT OF BOUNDS OR IN
        // INSIDE THE DROPZONES TRY TO MAKE SETUP MORE MODULAR, START PLACING
        // SHIPS BASED ON THE SHIPS DRAGGED AND DROPPED, AND THEN PLAY A GAME
      });
    }
    boardContainer.appendChild(rowHTML);
  }
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
  ships.forEach((ship, index) => {
    const shipElement = document.createElement('div');
    shipElement.className = 'draggable-ship';

    shipElement.id = `ship-${index}`;
    shipElement.dataset.length = ship.length;

    shipElement.draggable = true;

    shipElement.addEventListener('dragstart', (event) => {
      console.log(event);
      event.dataTransfer.setData('text/plain', event.target.id);
      currentDraggedShip = {
        id: event.target.id,
        length: ship.length,
      };
    });

    shipContainer.appendChild(shipElement);
  });
}

module.exports = {
  createDropZones,
  displayShips,
  addRotationEventListener,
  removeRotationEventListener,
};
