
class GameBoard {

    next;

    constructor() {
        this.next = 1;
    }

    shuffleArray(array) {
            array.sort(() => Math.random() - 0.5);
    }

    draw() {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
        this.shuffleArray(nums);
        let idx = 0;
        for(let row = 0; row < 5; row++) {
            for(let col = 0; col < 5; col++) {
                document.getElementById("gameBoard_cell_"+row+"_"+col).innerText = nums[idx++];
            }
        }
    }

    addTouchEvent() { 
        /*for(let row = 0; row < 5; row++) {
            for(let col = 0; col < 5; col++) {
                document.getElementById("gameBoard_cell_"+row+"_"+col).addEventListener('touchstart', this.tapAction );
            }
        }*/
        let cell = document.getElementsByClassName("cell");
        for(let len = 0; len < cell.length; len++)
            cell[len].addEventListener('touchstart', this.tapAction );
        //document.getElementsByClassName("cell").addEventListener('touchstart', this.tapAction );
    }

    tapAction(evt) {
        console.log(evt.target.id);

        console.log(document.getElementById(evt.target.id).innerHTML);
    }
}
