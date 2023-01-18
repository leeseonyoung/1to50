
function changeToStartPage(evt) {
    console.log("change page to page2");
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "block";
    document.getElementById("page3").style.display = "none";
}

function changeToScorePage(evt) {
    console.log("change page to page3");
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "block";
}

window.onload = function () {
    //document.getElementById("startBtn").addEventListener('click', changeToStartPage);
    //document.getElementById("scoreBtn").addEventListener('click', changeToScorePage);
    document.getElementById("startBtn").addEventListener('touchstart', changeToStartPage);
    document.getElementById("scoreBtn").addEventListener('touchstart', changeToScorePage);
    
};

