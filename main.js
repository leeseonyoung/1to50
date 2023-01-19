
function changePage(page) {
    console.log("change page to page"+page);
 
    for(let num = 1; num <=3; num++) {
        if(num === page)
            document.getElementById("page"+num).style.display = "block";
        else
            document.getElementById("page"+num).style.display = "none";
    }
}

window.onload = function () {
    document.getElementById("startBtn").addEventListener('touchstart', function(evt){changePage(2);} );
    document.getElementById("scoreBtn").addEventListener('touchstart', function(evt){changePage(3);} );

    let gameBoard = new GameBoard();
    gameBoard.draw();
    gameBoard.addTouchEvent();
};

