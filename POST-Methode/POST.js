var vidSrc = [
    {src: "https://www.youtube.com/embed/uCRT8IItGpw", done: true, title: "Intro"},
    {src: "https://www.youtube.com/embed/YTC75cKzuNk", done: false, title: "Kapitel 2"},
    {src: "https://www.youtube.com/embed/uCRT8IItGpw", done: false, title: "Kapitel 3"},
    {src: "https://www.youtube.com/embed/YTC75cKzuNk", done: false, title: "Kapitel 4"},
    {src: "https://www.youtube.com/embed/uCRT8IItGpw", done: false, title: "Kapitel 5"}
]
var actualVid = 0;

var questions = [
    [],
    [
        [true, false, false, false]
    ],
    [
        [true, false, false, false]
    ],
    [
        [true, false, true, false, true]
    ],
    [
        [false, true, false, false]
    ],
]

var stepBarWidth = 10;

var firstDone = false;

window.addEventListener("load", () => {
    let top = $('.top')
    let width = top.width()
    top.height(width / 16 * 9 + "px")

    $('.go-right').on("click", nextVid)
    $('.go-left').on("click", () => {
        let srcToCheck = actualVid - 1
        if (srcToCheck < 0) {
            srcToCheck = 4
        }
        if (vidSrc[srcToCheck].done === true) {
            $('.quiz.' + actualVid).hide()
            actualVid--
            stepBarWidth -= 10
            if (firstDone) {
                stepBarWidth -= 10
                firstDone = false
            }
            if (actualVid < 0) {
                actualVid = 4
                stepBarWidth = 99.96 
            }
            $('.quiz.' + actualVid).css("display", "flex")
            let stepBar = $('.inner-step-bar')
            stepBar.width(stepBarWidth + "%")
            $('.top .mid iframe').attr("src", vidSrc[actualVid].src);
            $('.top .down h4').html(vidSrc[actualVid].title);
            console.log(actualVid, vidSrc[actualVid].src)
            $('.mid')[0].scrollIntoView({block: "end", behavior: "smooth"})
        } else {
            console.log("answer questions first")
            $('.quiz-sec')[0].scrollIntoView({behavior: "smooth"})
        }
    })

    $('.answer-button').on("click", () => {
        let ansDivs = $('.' + actualVid + " .answer-sec")
        let counter = 0;
        let done = true
        for (let ansDiv of ansDivs) {
            let innerCounter = 0
            let labs = $(ansDiv).children()
            for (let lab of labs) {
                if ($(lab).children()[0].checked !== questions[actualVid][counter][innerCounter]) {
                    done = false;
                    break;
                }
                innerCounter++
            }
        counter++
        }
        if (done && actualVid !== 4) {
            vidSrc[actualVid].done = true;
            let nth = actualVid+1
            $('.point:nth-child('+nth+')').css("background-color", "rgb(153, 13, 13)")
            $('.point:nth-child('+nth+')').css("color", "white")
            nextVid()
            $('.popup').css('display', 'flex')
            $('.popup .correct').show()
            $('.mid')[0].scrollIntoView({block: "end", behavior: "smooth"})
        } else if (actualVid !== 4) {
            $('.popup').css('display', 'flex')
            $('.popup .false').show()
            $('.mid')[0].scrollIntoView({block: "end", behavior: "smooth"})
        } else {
            $('.popup').css('display', 'flex')
            $('.popup .done').show()
            $('.mid')[0].scrollIntoView({block: "end", behavior: "smooth"})
            stepBarWidth += 10
            let stepBar = $('.inner-step-bar')
            stepBar.width(stepBarWidth + "%")
            $('.point:nth-child(5)').css('background-color', 'rgb(153, 13, 13)')
            $('.point:nth-child(5)').css('color', 'white')
            vidSrc[4].done = true;
            firstDone = true;
        }
    })

    $('.follow').on("click", () => {
        $('.popup').css('display', 'flex')
        $('.popup .drink').css('display', 'flex')
    })

    $('.input-wrap input').on("keydown", (e) => {
        if (e.keyCode === 13) {
            $('.popup').css('display', 'flex')
            $('.popup .search').css('display', 'flex')
        }
    })

    $('.input-wrap img').on("click", () => {
        $('.popup').css('display', 'flex')
        $('.popup .search').css('display', 'flex')
    })

    $('.popup .ok').on("click", () => {
        $('.popup').hide()
        $('.popup .correct').hide()
        $('.popup .false').hide()
        $('.popup .done').hide()
        $('.popup .drink').hide()
        $('.popup .search').hide()
    })
})

window.addEventListener("resize", () => {
    let top = $('.top')
    let width = top.width()
    top.height(width / 16 * 9 + "px")
})

function nextVid () {
    if (vidSrc[actualVid].done === true) {
        $('.quiz.' + actualVid).hide()
        if (actualVid === 0) {
            $('.point:nth-child(1)').css('background-color', 'rgb(153, 13, 13)')
            $('.point:nth-child(1)').css('color', 'white')
        }
        actualVid++
        stepBarWidth += 10
        if (firstDone) {
            stepBarWidth -= 10
            firstDone = false
        }
        if (actualVid > 4) {
            actualVid = 0
            stepBarWidth = 10
        }
        let stepBar = $('.inner-step-bar')
        stepBar.width(stepBarWidth + "%")
        $('.top .mid iframe').attr("src", vidSrc[actualVid].src);
        $('.quiz.' + actualVid).css("display", "flex")
        console.log(actualVid, vidSrc[actualVid].src)
        $('.top .down h4').html(vidSrc[actualVid].title);
        $('.mid')[0].scrollIntoView({block: "end", behavior: "smooth"})
    } else {
        console.log("answer questions first")
        $('.quiz-sec')[0].scrollIntoView({behavior: "smooth"})
    }
}