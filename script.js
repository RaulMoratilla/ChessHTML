const white_piece = ['w_rook', 'w_horse', 'w_bishop', 'w_queen', 'w_king', 'w_bishop', 'w_horse', 'w_rook'];
const black_piece = ['b_rook', 'b_horse', 'b_bishop', 'b_king', 'b_queen', 'b_bishop', 'b_horse', 'b_rook'];


function fillBoard() {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const board = document.getElementById('board');

    for (let fil = 0; fil < 8; fil++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add((fil + col) % 2 == 0 ? 'white-cell' : 'black-cell');
            cell.id = letters[7 - fil] + String(col + 1);
            cell.ondrop = drop;
            cell.ondragover = allowDrop;
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
    }
}

function createPiece(pieceClass) {
    const piece = document.createElement('img');
    piece.src = "img/" + pieceClass + ".png";
    piece.alt = pieceClass;
    piece.classList.add('piece_cell');
    piece.classList.add(pieceClass);
    piece.draggable = true;
    piece.ondragstart = drag;
    return piece;
}

function drag(event) {
    // Obtén la URL de la imagen desde el src del elemento img
    const data = event.target.src;

    // Establece el elemento img como el elemento arrastrado
    event.dataTransfer.setData("text", data);

    event.target.parentNode.removeChild(event.target);
}

function allowDrop(event) {
    // Previene el comportamiento predeterminado para permitir soltar
    event.preventDefault();
}

function drop(event) {
    // Obtiene la URL de la imagen desde los datos de transferencia
    const data = event.dataTransfer.getData("text");

    console.log(event.dataTransfer)

    // Crea un nuevo elemento img con la misma URL
    const draggedElement = event.target;

    console.log(draggedElement);

    // Agrega el elemento img al destino
    event.target.appendChild(draggedElement);
}
