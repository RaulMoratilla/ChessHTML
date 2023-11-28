const white_piece = ['w_rook', 'w_horse', 'w_bishop', 'w_queen', 'w_king', 'w_bishop', 'w_horse', 'w_rook'];
const black_piece = ['b_rook', 'b_horse', 'b_bishop', 'b_queen', 'b_king', 'b_bishop', 'b_horse', 'b_rook'];

// Variable global para almacenar la pieza actualmente arrastrada
let draggedPiece = null;
let originalCell = null;

// Variables globales para almacenar las posiciones iniciales del ratón con respecto a la pieza
let offsetX, offsetY;

function fillBoard() {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const board = document.getElementById('board');

    for (let fil = 0; fil < 8; fil++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add((fil + col) % 2 == 0 ? 'white-cell' : 'black-cell');
            cell.id = letters[7 - fil] + String(col + 1);
            board.appendChild(cell);
        }
    }

    for (let col = 1; col < 9; col++) {
        let white_pawn_cell = document.getElementById('b' + String(col));
        let white_big_piece_cell = document.getElementById('a' + String(col));

        const white_pawn = createPiece('w_pawn');
        white_pawn_cell.appendChild(white_pawn);

        const white_big_piece = createPiece(white_piece[col - 1]);
        white_big_piece_cell.appendChild(white_big_piece);

        let black_pawn_cell = document.getElementById('g' + String(col));
        let black_big_piece_cell = document.getElementById('h' + String(col));

        const black_pawn = createPiece('b_pawn');
        black_pawn_cell.appendChild(black_pawn);

        const black_big_piece = createPiece(black_piece[col - 1]);
        black_big_piece_cell.appendChild(black_big_piece);

        createListeners();
    }
}

function createPiece(pieceClass) {
    const piece = document.createElement('img');
    piece.src = "img/" + pieceClass + ".png";
    piece.alt = pieceClass;
    piece.classList.add('piece_cell');
    switch (pieceClass.charAt(0)) {
        case 'w':
            piece.classList.add('white_piece');
            break;
        case 'b':
            piece.classList.add('black_piece');
            break;
    }
    piece.classList.add(pieceClass);
    return piece;
}

function createListeners() {
    document.querySelectorAll('.piece_cell').forEach(piece => {
        piece.addEventListener('mousedown', startDragging);
    });
}

function startDragging(event) {
    // Evitar comportamiento predeterminado del evento
    event.preventDefault();

    // Obtén la pieza que se está arrastrando
    draggedPiece = event.target;

    // Calcula el offset para centrar la pieza en el puntero del ratón
    offsetX = draggedPiece.offsetWidth / 2;
    offsetY = draggedPiece.offsetHeight / 2;

    // Ajusta el estilo de la imagen para mantener su tamaño original
    draggedPiece.style.width = draggedPiece.offsetWidth + 'px';
    draggedPiece.style.height = draggedPiece.offsetHeight + 'px';

    // Agrega un controlador de eventos de ratón para seguir el movimiento del ratón
    document.addEventListener('mousemove', updatePosition);

    // Remueve el listener de soltar asociado al documento para evitar problemas
    document.removeEventListener('mouseup', dropPiece);

    // Agrega el listener de soltar asociado a la pieza
    draggedPiece.addEventListener('mouseup', dropPiece);

    // Establece la opacidad de la pieza mientras se arrastra
    draggedPiece.style.opacity = '1';

    // Establece el cursor "grabbing"
    document.body.style.cursor = 'grabbing';

    // Elimina la pieza de la casilla original
    originalCell = draggedPiece.parentNode;
    originalCell.removeChild(draggedPiece);

    // Añade la pieza al cuerpo del documento para que no quede restringida por tamaños de contenedores
    document.body.appendChild(draggedPiece);

    updatePosition(event);
}


function updatePosition(e) {
    // Actualiza la posición de la pieza mientras se mueve el ratón
    draggedPiece.style.position = 'absolute';
    draggedPiece.style.left = e.clientX - offsetX + 'px';
    draggedPiece.style.top = e.clientY - offsetY + 'px';
}

function findTargetCell(mouseX, mouseY) {
    // Itera sobre todas las celdas y verifica si el mouse está dentro de los límites de cada celda
    const cells = document.querySelectorAll('.cell');
    for (const cell of cells) {
        const rect = cell.getBoundingClientRect();
        if (
            mouseX >= rect.left &&
            mouseX <= rect.right &&
            mouseY >= rect.top &&
            mouseY <= rect.bottom
        ) {
            return cell;
        }
    }
    return null;
}

function dropPiece(event) {
    if (draggedPiece) {
        // Elimina los controladores de eventos de ratón
        document.removeEventListener('mousemove', updatePosition);
        draggedPiece.removeEventListener('mouseup', dropPiece);
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        let targetCell = findTargetCell(mouseX, mouseY);

        if (!targetCell || !checkMove(originalCell, targetCell, draggedPiece.alt)) {
            targetCell = originalCell;
        }

        // Ajusta el estilo de la imagen para centrarla en la casilla
        const offsetX = (targetCell.offsetWidth - draggedPiece.offsetWidth) / 2;
        const offsetY = (targetCell.offsetHeight - draggedPiece.offsetHeight) / 2;

        // Restablece la posición de la pieza a la posición de la casilla más el offset
        draggedPiece.style.left = targetCell.getBoundingClientRect().left + offsetX + 'px';
        draggedPiece.style.top = targetCell.getBoundingClientRect().top + offsetY + 'px';
        targetCell.appendChild(draggedPiece);

        // Restaura el cursor a su valor original
        document.body.style.cursor = 'auto';

        draggedPiece = null;
        originalCell = null;
    }
}

function checkMove(originalCell, targetCell, piece) {
    let originalCellId = originalCell.id;
    let targetCellId = targetCell.id;
    let originalCellLetter = originalCellId.charAt(0);
    let originalCellNumber = originalCellId.charAt(1);
    let targetCellLetter = targetCellId.charAt(0);
    let targetCellNumber = targetCellId.charAt(1);
    let move = false;
    console.log(originalCellLetter, originalCellNumber, targetCellLetter, targetCellNumber);
    console.log(targetCell.hasChildNodes());
    console.log(targetCell);
    if (targetCell.hasChildNodes()) {
        console.log(targetCell.lastChild.classList.contains('black_piece'));
    }
    switch (piece) {
        case 'w_pawn':
            if ((originalCellLetter.charCodeAt(0)+1 == targetCellLetter.charCodeAt(0) && targetCellNumber == originalCellNumber && !targetCell.hasChildNodes())
                || (originalCellLetter.charCodeAt(0)+2 == targetCellLetter.charCodeAt(0) && targetCellNumber == originalCellNumber && originalCellLetter == 'b' && !targetCell.hasChildNodes())
                || (originalCellLetter.charCodeAt(0)+1 == targetCellLetter.charCodeAt(0) && targetCellNumber+1 == originalCellNumber && targetCell.hasChildNodes() && targetCell.lastChild.classList.contains('black_piece'))
                || (originalCellLetter.charCodeAt(0)+1 == targetCellLetter.charCodeAt(0) && targetCellNumber-1 == originalCellNumber-1 && targetCell.hasChildNodes() && targetCell.lastChild.classList.contains('black_piece'))) {
                
                console.log(move = true);
            }
            break;
        
    }
    return move;
}

