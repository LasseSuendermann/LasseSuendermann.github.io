const videos = [
    'https://www.youtube.com/embed/H44QtkOMfDE',
    'https://www.youtube.com/embed/vuhvrIbDpMY',
    'https://www.youtube.com/embed/POOUOIXrC3g',
    'https://www.youtube.com/embed/p6yqHgQp37c',
    'https://www.youtube.com/embed/ITdHFhkGihs',
]


$(document).ready(() => {
    $('.dot').click((e) => {
        let id = parseInt(e.target.id.replace('d', ''))
        $('.vid_w').css('visibility', 'visible')
        $('.vid_w iframe').css('width', '800px')
        setTimeout(() => {
            $('.vid_w iframe').attr('src', videos[id])
        }, 300)
    })

    $('.close').click(() => {
        $('.vid_w').css('visibility', 'hidden')
        $('.vid_w iframe').css('width', '0')
    })
})

