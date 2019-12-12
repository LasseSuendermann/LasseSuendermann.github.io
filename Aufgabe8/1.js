window.addEventListener("load", function () {
    document.querySelector(".button1").addEventListener("mousedown", function () { playSamples("kick.mp3"); });
    document.querySelector(".button2").addEventListener("mousedown", function () { playSamples("snare.mp3"); });
    document.querySelector(".button3").addEventListener("mousedown", function () { playSamples("hihat.mp3"); });
    document.querySelector(".button4").addEventListener("mousedown", function () { playSamples("F.mp3"); });
    document.querySelector(".button5").addEventListener("mousedown", function () { playSamples("G.mp3"); });
    document.querySelector(".button6").addEventListener("mousedown", function () { playSamples("A.mp3"); });
    document.querySelector(".button7").addEventListener("mousedown", function () { playSamples("C.mp3"); });
    document.querySelector(".button8").addEventListener("mousedown", function () { playSamples("laugh-1.mp3"); });
    document.querySelector(".button9").addEventListener("mousedown", function () { playSamples("laugh-2.mp3"); });
    document.querySelector("#play").addEventListener("click", playJingleBells);
    document.querySelector("#delete").addEventListener("click", deleteBeat);
    document.querySelector("#record").addEventListener("click", recordBeat);
});
var jingleBells = ["A.mp3", "A.mp3", "A.mp3", " ", "A.mp3", "A.mp3", "A.mp3", " ", "A.mp3", "C.mp3", "F.mp3", "G.mp3", "A.mp3", "laugh-1.mp3", " ", " "];
var intervalloop;
var record = false;
function playSamples(mp3) {
    var sound = new Audio("assets/" + mp3);
    sound.play();
    if (record == true) {
        jingleBells.push(mp3);
    }
}
function playJingleBells() {
    var index = 0;
    var playButton = document.getElementById("play");
    if (playButton.classList.contains("fa-play")) {
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-stop");
        intervalloop = setInterval(startJingleBells, 400);
    }
    else {
        playButton.classList.remove("fa-stop");
        playButton.classList.add("fa-play");
        clearInterval(intervalloop);
    }
    function startJingleBells() {
        playSamples(jingleBells[index]);
        index += 1;
        if (index > jingleBells.length) {
            index = 0;
        }
    }
}
function deleteBeat() {
    jingleBells = [];
}
function recordBeat() {
    record = true;
}
//# sourceMappingURL=1.js.map