window.addEventListener("load", function (): void {
    document.querySelector(".button1").addEventListener("mousedown", function (): void { playSamples("kick.mp3"); });
    document.querySelector(".button2").addEventListener("mousedown", function (): void { playSamples("snare.mp3"); });
    document.querySelector(".button3").addEventListener("mousedown", function (): void { playSamples("hihat.mp3"); });
    document.querySelector(".button4").addEventListener("mousedown", function (): void { playSamples("F.mp3"); });
    document.querySelector(".button5").addEventListener("mousedown", function (): void { playSamples("G.mp3"); });
    document.querySelector(".button6").addEventListener("mousedown", function (): void { playSamples("A.mp3"); });
    document.querySelector(".button7").addEventListener("mousedown", function (): void { playSamples("C.mp3"); });
    document.querySelector(".button8").addEventListener("mousedown", function (): void { playSamples("laugh-1.mp3"); });
    document.querySelector(".button9").addEventListener("mousedown", function (): void { playSamples("laugh-2.mp3"); });
    document.querySelector("#play").addEventListener("click", playJingleBells);
    document.querySelector("#delete").addEventListener("click", deleteBeat);
    document.querySelector("#record").addEventListener("click", recordBeat);
});
var jingleBells: string[] = ["A.mp3", "A.mp3", "A.mp3", " ", "A.mp3", "A.mp3", "A.mp3", " ", "A.mp3", "C.mp3", "F.mp3", "G.mp3", "A.mp3", "laugh-1.mp3", " ", " "];
var intervalloop: number;
var record: boolean = false;
function playSamples(mp3: string): void {
    var sound: HTMLAudioElement = new Audio("assets/" + mp3);
    sound.play();
    if (record == true) {
        jingleBells.push(mp3);
    }
}
function playJingleBells(): void {
    var index: number = 0;
    var playButton: HTMLElement = document.getElementById("play");
    if (playButton.classList.contains("fa-play")) {
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-stop");
        intervalloop = setInterval(startJingleBells, 400);
    } else {
        playButton.classList.remove("fa-stop");
        playButton.classList.add("fa-play");
        clearInterval(intervalloop);
    }
    function startJingleBells(): void {
        playSamples(jingleBells [index]);
        index += 1;
        if (index > jingleBells.length) { index = 0; }
    }
}
function deleteBeat (): void {
    jingleBells = [];
}
function recordBeat (): void {
    record = true;
}