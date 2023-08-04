
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
    rank;

    constructor() {
        this.next = 1;
        this.makeNumberArray(this.numberPhase1, 1);
        this.makeNumberArray(this.numberPhase2, 26);
        this.min = 0;
        this.sec = 0;
        this.ms = 0;

        //localStorage.clear();
        this.rank = new Rank();
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
        //document.getElementById("timeScore").innerText = pMin+":"+pSec+":"+pMs;
        document.getElementById("timeScoreMin").innerText = pMin;
        document.getElementById("timeScoreSec").innerText = pSec;
        document.getElementById("timeScoreMSec").innerText = pMs;

    }

    startTimer() {
        this.intervalId = setInterval(()=> {this.timerAction()}, 100);

    }

    gameClear() {
        clearInterval(this.intervalId);
        let scoreMin = document.getElementById("timeScoreMin").innerHTML;
        let scoreSec = document.getElementById("timeScoreSec").innerHTML;
        let scoreMSec = document.getElementById("timeScoreMSec").innerHTML;
        let score = scoreMin+":"+scoreSec+":"+scoreMSec;
        console.log("Great! "+score);
        let nickname = prompt( score + '\nWell done! Enter a nickname to save.', '' );
        if(nickname === null) {
            console.log("canceled");
            this.changePage(1);
        }
        else {
            console.log("confirmed");
            //let rank = new Rank();
            this.rank.saveRecord(nickname, scoreMin, scoreSec, scoreMSec);
            this.rank.draw();
            this.changePage(3);
        }
        //clearTimeout();
    }

    changePage(page) {
        console.log("change page to page"+page);

        for(let num = 1; num <=3; num++) {
            if(num === page)
                document.getElementById("page"+num).style.display = "block";
            else
                document.getElementById("page"+num).style.display = "none";
        }
    }

    drawScores() {
        this.rank.draw();

    }
    /*
    drawScores() {
        let tempRank = 1;
        console.log("draw scores "+localStorage.length);
        this.drawScoreRow(++tempRank, "sun1", "00:14.2");

        let keys = Object.keys(localStorage);
        for(let key of keys) {
            console.log("nick:"+ key + " score:"+localStorage.getItem(key));
            this.drawScoreRow(++tempRank, key, localStorage.getItem(key));
        }
    }
    drawScoreRow(rank, name, score) {
        let newDivRank = document.createElement("div");
        let rankText = document.createTextNode(rank);
        newDivRank.appendChild(rankText);
        newDivRank.setAttribute("class", "content");
        document.getElementById("boardRank").appendChild(newDivRank);

        let newDivName = document.createElement("div");
        let nameText = document.createTextNode(name);
        newDivName.appendChild(nameText);
        newDivName.setAttribute("class", "content");
        document.getElementById("boardName").appendChild(newDivName);

        let newDivScore = document.createElement("div");
        let scoreText = document.createTextNode(score);
        newDivScore.appendChild(scoreText);
        newDivScore.setAttribute("class", "content");
        document.getElementById("boardScore").appendChild(newDivScore);
    }
*/
    addTouchEvent() { 
        /*for(let row = 0; row < 5; row++) {
            for(let col = 0; col < 5; col++) {
                document.getElementById("gameBoard_cell_"+row+"_"+col).addEventListener('touchstart', this.tapAction );
            }
        }*/
        let cell = document.getElementsByClassName("cell");
        for(let len = 0; len < cell.length; len++){
            cell[len].addEventListener('touchstart', this.tapAction.bind(this) );   
            // tapAction 에서 쓸 this 를 bind 로 지정. 지정 안했을 시 event trigger callback 의 this 는 글로벌 객체인 window 가 됨
        //document.getElementsByClassName("cell").addEventListener('touchstart', this.tapAction );
            cell[len].addEventListener('touchend', this.tapEnd.bind(this) );
        }
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
            element.style.borderStyle = 'inset';

            if(this.next === 50) {
                this.gameClear();
            }

        }
        else {
            
        }
    }

    tapEnd(evt) {
        let element = document.getElementById(evt.target.id);

        if(this.next === Number(element.innerHTML)) {
            if(this.next <= 25) {
                element.innerText = this.numberPhase2[this.next-1];
                element.style.borderStyle = 'outset';
            }
            else {
                element.innerText = "00";
                element.style.color = 'rgb(32 ,30 ,30)';
                element.style.backgroundColor = 'rgb(32 ,30 ,30)';
                element.style.borderColor = 'rgb(32 ,30 ,30)';
                element.style.borderStyle = 'dotted'; // temp
            }

            this.next++;
            document.getElementById("next").innerText = this.next;
        }
        else {

        }

    }
}
