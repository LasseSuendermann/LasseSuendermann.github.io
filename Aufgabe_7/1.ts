window.addEventListener("load", function(){
    document.querySelector("#button1").addEventListener("click", play1)
})
window.addEventListener("load", function(){
    document.querySelector("#button2").addEventListener("click", play2)
})
window.addEventListener("load", function(){
    document.querySelector("#button3").addEventListener("click", play3)
})
window.addEventListener("load", function(){
    document.querySelector("#button4").addEventListener("click", play4)
})
window.addEventListener("load", function(){
    document.querySelector("#button5").addEventListener("click", play5)
})
window.addEventListener("load", function(){
    document.querySelector("#button6").addEventListener("click", play6)
})
window.addEventListener("load", function(){
    document.querySelector("#button7").addEventListener("click", play7)
})
window.addEventListener("load", function(){
    document.querySelector("#button8").addEventListener("click", play8)
})
window.addEventListener("load", function(){
    document.querySelector("#button9").addEventListener("click", play9)
})
function play1() {
    var sound:HTMLAudioElement = new Audio("assets/kick.mp3");
    sound.play();
}
function play2() {
    var sound:HTMLAudioElement = new Audio("assets/snare.mp3");
    sound.play();
}
function play3() {
    var sound:HTMLAudioElement = new Audio("assets/hihat.mp3");
    sound.play();
}
function play4() {
    var sound:HTMLAudioElement = new Audio("assets/F.mp3");
    sound.play();
}
function play5() {
    var sound:HTMLAudioElement = new Audio("assets/G.mp3");
    sound.play();
}
function play6() {
    var sound:HTMLAudioElement = new Audio("assets/A.mp3");
    sound.play();
}
function play7() {
    var sound:HTMLAudioElement = new Audio("assets/C.mp3");
    sound.play();
}
function play8() {
    var sound:HTMLAudioElement = new Audio("assets/laugh-1.mp3");
    sound.play();
}
function play9() {
    var sound:HTMLAudioElement = new Audio("assets/laugh-2.mp3");
    sound.play();
}

//Aufgabe2
document.querySelector(".play1").addEventListener("click", playSample)
function playSample(mp3) {
    var sound = new Audio("assets/" + mp3);
    sound.play();
}
function play() {
    var song = setInterval(startJingleBells, 400);
    var index = 0;
    var jingleBells = ["assets/A.mp3", "assets/A.mp3", "assets/A.mp3", "assets/A.mp3", "assets/A.mp3", "assets/A.mp3", "assets/A.mp3", "assets/C.mp3", "assets/F.mp3", "assets/G.mp3", "assets/A.mp3", "assets/laugh-1.mp3"];
    function startJingleBells() {
        var play = new Audio(jingleBells[index]);
        play.play();
        index += 1;
    }};
