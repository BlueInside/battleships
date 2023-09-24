const Ship = require('./ship.js');
let targetedCells = [];
let currentDraggedShip = null;
let rotation = 'horizontal';
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
        const currentXCoord = col;
        const currentYCoord = row;

        const shipLength = currentDraggedShip
          ? currentDraggedShip.length
          : null;
        let isShipOutOfBounds = null;
        targetedCells = [];

        if (rotation === 'horizontal') {
          // Check horizontal bounds and collect targeted cells;
          isShipOutOfBounds = shipLength + currentXCoord > board.length;
          for (let i = currentXCoord; i < shipLength + currentXCoord; i++) {
            const targetedCell = document.querySelector(
              `[data-cord-x="${i}"][data-cord-y="${currentYCoord}"]`
            );
            if (targetedCell) targetedCells.push(targetedCell);
          }
        } else if (rotation === 'vertical') {
          // Check vertical bounds and collect targeted cells
          isShipOutOfBounds = shipLength + currentYCoord > board.length;
          for (let i = currentYCoord; i < shipLength + currentYCoord; i++) {
            const targetedCell = document.querySelector(
              `[data-cord-x="${currentXCoord}"][data-cord-y="${i}"]`
            );
            if (targetedCell) targetedCells.push(targetedCell);
          }
        }

        // Check if ship is inside bounds and add appropriate classes
        targetedCells.forEach((targetedCell) => {
          if (isShipOutOfBounds) {
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

        //place ships on the board different color
        targetedCells.forEach((targetedCell) =>
          targetedCell.classList.add('placed')
        );

        const shipId = event.dataTransfer.getData('text/plain');
        console.log(shipId);
        // const shipElement = document.getElementById(shipId);
        // console.log(event.target.dataset.currentXCoord);
        // console.log(event.target.dataset.currentYCoord);

        // Check if the drop is valid (e.g., ship fits in the zone)
        // if (isValidDrop(shipElement, dropZone)) {
        //   // Place the ship on the gameboard
        //   placeShipOnBoard(shipElement, dropZone, player);

        //   // Remove the ship from the container
        // shipElement.remove();
        // }

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
      event.dataTransfer.setData('text/plain', event.target.id);
      currentDraggedShip = {
        id: event.target.id,
        length: ship.length,
      };
      console.log(currentDraggedShip);
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
