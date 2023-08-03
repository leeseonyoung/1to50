
class Rank {
    
    constructor() {

    }

    saveRecord(nickname, scoreMin, scoreSec, scoreMSec) {

        let record = {
            name : nickname,
            score : scoreMin+scoreSec+scoreMSec
        }

        /*let record = new Object();
        record.name = nickname;
        record.score = score;*/

        /*localStorage.clear();
        let objectArr = [];
        objectArr[0] = {'name':'kim1', 'score':'11'};
        objectArr[1] = {'name':'kim2', 'score':'22'};
        objectArr[2] = {'name':'kim3', 'score':'33'};
        console.log(objectArr);
        localStorage.setItem("recordList", JSON.stringify(objectArr));
        console.log("=========");*/

        let loadRecords = JSON.parse(localStorage.getItem("recordList"));
        if(loadRecords === null)
            loadRecords = [];
        loadRecords.push(record);
        this.sortRecordList(loadRecords);
        console.log("sorted!");   

        console.log(loadRecords);   
        /*if(loadArr != null)
            loadArr.push(record);
        else{
            let recordArr = new Array();
            recordArr[0] = record;
            loadArr = recordArr;
        }*/
        localStorage.setItem("recordList", JSON.stringify(loadRecords));
    }

    draw() {
        let recordList = JSON.parse(localStorage.getItem("recordList"));
        console.log(recordList);   
        if(recordList === null)
            return;

        //this.sortRecordList(recordList);

        let tempNum = 2;
        for(let i=0; i<recordList.length; i++){
            let drawScore = recordList[i].score[0]+recordList[i].score[1]+":"+recordList[i].score[2]+recordList[i].score[3]+":"+recordList[i].score[4];
            this.drawScoreRow(tempNum++, recordList[i].name, drawScore);
        }

    }

    sortRecordList(recordList){
        recordList.sort(function(a,b) {
            //console.log(a.score+"-"+b.score);
            return a.score - b.score;

        });
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