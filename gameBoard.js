
class GameBoard {

    next;
    //nums = [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    numberPhase1 = [];
    numberPhase2 = [];
    isCountDone = false;
    min;
    sec;
    ms;
    intervalId;

    constructor() {
        this.next = 1;
        this.makeNumberArray(this.numberPhase1, 1);
        this.makeNumberArray(this.numberPhase2, 26);
        this.min = 0;
        this.sec = 0;
        this.ms = 0;
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

    countAction(count) {
        console.log(count);
        //do action
        if(count === 0) {
            document.getElementById("count").innerText = "";
            this.isCountDone = true;
            this.startTimer();
            //document.getElementById("page2").style.touchAction = "manipulation";
        }
        else
            document.getElementById("count").innerText = count;

        count--;

        //let self = this;
        if(count >= 0)
            setTimeout(()=> {this.countAction(count)}, 1000);
            //setTimeout( function() { self.printAction(count); }, 1000);
    }

    startCount() {  // 3 2 1
        this.countAction(3);
        //setTimeout( this.printAction.bind(this), 1000);


        /* callback 피라미드
        let num = 2;
        setTimeout(function() {
            console.log(num--);
            setTimeout(function() {
                console.log(num--);
                setTimeout(function() {
                    console.log(num--);
                }, 1000);
            }, 1000);
        }, 1000);*/
    }

    timerAction() {
        //next
        this.ms++;
        if(this.ms === 10) {
            this.sec++;
            this.ms = 0;
        }

        if(this.sec === 60) {
            this.min++;
            this.sec = 0;
        }

        let pMin = (this.min >= 10) ? this.min : "0"+this.min;
        let pSec = (this.sec >= 10) ? this.sec : "0"+this.sec;
        let pMs = this.ms;

        //print
        document.getElementById("timeScore").innerText = pMin+":"+pSec+":"+pMs;
        //console.log(document.getElementById("timeScore").innerHTML);

    }

    startTimer() {
        this.intervalId = setInterval(()=> {this.timerAction()}, 100);

    }

    gameClear() {
        clearInterval(this.intervalId);
        console.log("Great! "+document.getElementById("timeScore").innerHTML);
        let jbResult = prompt( document.getElementById("timeScore").innerHTML + '\nWell done! Enter a nickname to save.', '' );
        if(jbResult === null) {
            console.log("canceled");
        }
        else {
            console.log("confirmed");
            document.getElementById("page1").style.display = "none";
            document.getElementById("page2").style.display = "none";
            document.getElementById("page3").style.display = "block";
        }
        //document.write( jbResult );

        //clearTimeout();


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
        if(this.isCountDone === false) {
            console.log("counting..");
            return;
        }
        let element = document.getElementById(evt.target.id);
        console.log("target:"+evt.target.id+" text:"+element.innerHTML);
        if(this.next === Number(element.innerHTML)) {
            console.log("!!");
            if(this.next === 50) {
                this.gameClear();
            }

            if(this.next <= 25) {
                element.innerText = this.numberPhase2[this.next-1];
            }
            else {
                element.innerText = " ";
                element.style.backgroundColor = 'rgb(32 ,30 ,30)';
            }
            this.next++;
            document.getElementById("next").innerText = this.next;
        }
        else {
            
        }
    }
}