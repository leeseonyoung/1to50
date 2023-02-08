
function changePage(obj, page) {
    console.log("change page to page"+page);
 
    for(let num = 1; num <=3; num++) {
        if(num === page)
            document.getElementById("page"+num).style.display = "block";
        else
            document.getElementById("page"+num).style.display = "none";
    }

    if(page === 2)
        obj.startCount();
    else if(page === 3)
        obj.drawScores();
}

window.onload = function () {
    let gameBoard = new GameBoard();
    gameBoard.draw();
    gameBoard.addTouchEvent();

    document.getElementById("startBtn").addEventListener('touchstart', function(evt){changePage(gameBoard, 2);} );
    document.getElementById("scoreBtn").addEventListener('touchstart', function(evt){changePage(gameBoard, 3);} );
};

