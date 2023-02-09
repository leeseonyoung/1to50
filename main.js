
function mainControl(obj, page) {

    obj.changePage(page);

    if(page === 2)
        obj.startCount();
    else if(page === 3)
        obj.drawScores();
}

window.onload = function () {
    let gameBoard = new GameBoard();
    gameBoard.draw();
    gameBoard.addTouchEvent();

    document.getElementById("startBtn").addEventListener('touchstart', function(evt){mainControl(gameBoard, 2);} );
    document.getElementById("scoreBtn").addEventListener('touchstart', function(evt){mainControl(gameBoard, 3);} );
};

