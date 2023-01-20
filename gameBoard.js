
class GameBoard {

    next;
    //nums = [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    numberPhase1 = [];
    numberPhase2 = [];
    

    constructor() {
        this.next = 1;
        this.makeNumberArray(this.numberPhase1, 1);
        this.makeNumberArray(this.numberPhase2, 26);
    }

    makeNumberArray(array, start) {

        let idx = 0;
        while(idx < 25) {
            array[idx++] = start++;
        }
        this.shuffleArray(array);
        console.log(array);

    }
    shuffleArray(array) {
            array.sort(() => Math.random() - 0.5);
    }

    draw() {
        let idx = 0;
        for(let row = 0; row < 5; row++) {
            for(let col = 0; col < 5; col++) {
                document.getElementById("gameBoard_cell_"+row+"_"+col).innerText = this.numberPhase1[idx++];
            }
        }

        document.getElementById("next").innerText = this.next;
    }

    addTouchEvent() { 
        /*for(let row = 0; row < 5; row++) {
            for(let col = 0; col < 5; col++) {
                document.getElementById("gameBoard_cell_"+row+"_"+col).addEventListener('touchstart', this.tapAction );
            }
        }*/
        let cell = document.getElementsByClassName("cell");
        for(let len = 0; len < cell.length; len++)
            cell[len].addEventListener('touchstart', this.tapAction.bind(this) );   
            // tapAction 에서 쓸 this 를 bind 로 지정. 지정 안했을 시 event trigger callback 의 this 는 글로벌 객체인 window 가 됨
        //document.getElementsByClassName("cell").addEventListener('touchstart', this.tapAction );
    }

    tapAction(evt) {
        let element = document.getElementById(evt.target.id);
        console.log("target:"+evt.target.id+" text:"+element.innerHTML);
        if(this.next === Number(element.innerHTML)) {
            console.log("!!");
            if(this.next <= 25) {
                element.innerText = this.numberPhase2[this.next-1];
            }
            else {
                element.innerText = "";
                element.style.backgroundColor = 'rgb(32 ,30 ,30)';
            }
            this.next++;
            document.getElementById("next").innerText = this.next;
        }
        else {
            
        }
    }
}
