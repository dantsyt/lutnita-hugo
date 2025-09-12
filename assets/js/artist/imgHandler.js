import { imgArr, imgArrMob, imgDir, imgDirMob, captions, captionsArr, artistId } from "./data"
import { mob, image } from "./mob"
import { preloadNextMedia, preloadPrevMedia } from "./imgPreload"
import { sendLog } from "./log"
import { detectSwipe } from "./swipe"

const viewsCount = document.querySelector('#counter_num')

let counter = 0
let videoWrapper = document.querySelector('#videowrapper')

export const nextImage = () => {
    counter++
    if (videoWrapper) {
        videoWrapper.remove()
        image.style.display = 'unset'
    }
    if (counter == imgArr.length) {
        counter = 0
    }
    image.classList.remove('fade')
    const nextMediaUrl = mob ? `${imgDirMob}/${imgArrMob[counter]}` : `${imgDir}/${imgArr[counter]}`
    captions.classList.remove('fade_captions')
    preloadNextMedia(nextMediaUrl)  // Preload the next media

    if (nextMediaUrl.endsWith('.mp4')) {
        if (document.querySelector('.content-wrapper')) {
            document.querySelector('.content-wrapper').remove()
        }
        image.style.display = 'none'
        document.querySelector('.image_container_mob_one').insertAdjacentHTML('beforebegin', `
            <div class="content-wrapper">
            <div class="placeholder">
            <div class="animated-background"></div>
            </div>
            </div>
            <div id="videowrapper" class="videowrapper artist_video">
            <video id="video" autoplay loop playsinline class="inverted">
            <source src=${nextMediaUrl} type="video/mp4" />
            </video>
            </div>
            `)
        const video = document.querySelector('video')
        video.onloadedmetadata = () => {
            document.querySelector('.content-wrapper').classList.add('load_image_hidden')
            videoWrapper = document.querySelector('#videowrapper')
            setTimeout(() => {
                videoWrapper.classList.add('video_visible')
            }, 50)
            setTimeout(() => {
                captions.classList.add('fade_captions')
                document.querySelector('.content-wrapper').remove()
            }, 700)
            captions.innerText = captionsArr[counter]
            viewsCount.innerText = ` ${counter + 1}`
            const nextCounter = (counter + 1) % imgArr.length
            const nextNextMediaUrl = mob ? `${imgDirMob}/${imgArrMob[nextCounter]}` : `${imgDir}/${imgArr[nextCounter]}`
            preloadNextMedia(nextNextMediaUrl)
        }
        video.onclick = (e) => {
            let center = video.clientWidth / 2
            if (e.offsetX > center) {
                nextImage()
            } else {
                prevImage()
            }
        }
        detectSwipe(video, function (direction) {
            if (direction === 'left') {
                nextImage()
            } else if (direction === 'right') {
                prevImage()
            }
        })
    } else {
        image.src = nextMediaUrl
        image.onload = () => {
            setTimeout(() => {
                image.classList.add('fade')
            }, 50)
            setTimeout(() => {
                captions.classList.add('fade_captions')
            }, 700)
            captions.innerText = captionsArr[counter]
            viewsCount.innerText = ` ${counter + 1}`
            const nextCounter = (counter + 1) % imgArr.length
            const nextNextMediaUrl = mob ? `${imgDirMob}/${imgArrMob[nextCounter]}` : `${imgDir}/${imgArr[nextCounter]}`
            preloadNextMedia(nextNextMediaUrl)
        }
    }
    sendLog(`nextImage function called on artist: ${artistId}, counter: ${counter + 1}`)
}

export const prevImage = () => {
    counter--
    if (videoWrapper) {
        videoWrapper.remove()
        image.style.display = 'unset'
    }
    image.classList.remove('fade')
    if (counter == -1) {
        counter = imgArr.length - 1
    }
    captions.classList.remove('fade_captions')
    const prevMediaUrl = mob ? `${imgDirMob}/${imgArrMob[counter]}` : `${imgDir}/${imgArr[counter]}`
    preloadPrevMedia(prevMediaUrl)  // Preload the previous media

    if (prevMediaUrl.endsWith('.mp4')) {
        if (document.querySelector('.content-wrapper')) {
            document.querySelector('.content-wrapper').remove()
        }
        image.style.display = 'none'
        document.querySelector('.image_container_mob_one').insertAdjacentHTML('beforebegin', `
            <div class="content-wrapper">
            <div class="placeholder">
            <div class="animated-background"></div>
            </div>
            </div>
            <div id="videowrapper" class="videowrapper artist_video">
            <video id="video" playsinline autoplay loop class="inverted">
            <source src=${prevMediaUrl} type="video/mp4" />
            </video>
            </div>
            `)
        const video = document.querySelector('video')
        video.onloadedmetadata = () => {
            document.querySelector('.content-wrapper').classList.add('load_image_hidden')
            videoWrapper = document.querySelector('#videowrapper')
            setTimeout(() => {
                videoWrapper.classList.add('video_visible')
            }, 50)
            setTimeout(() => {
                captions.classList.add('fade_captions')
                document.querySelector('.content-wrapper').remove()
            }, 700)
            captions.innerText = captionsArr[counter]
            viewsCount.innerText = ` ${counter + 1}`
            const prevCounter = (counter - 1) % imgArr.length
            const prevPrevMediaUrl = mob ? `${imgDirMob}/${imgArrMob[prevCounter]}` : `${imgDir}/${imgArr[prevCounter]}`
            preloadPrevMedia(prevPrevMediaUrl)
        }
        video.onclick = (e) => {
            let center = video.clientWidth / 2
            if (e.offsetX > center) {
                nextImage()
            } else {
                prevImage()
            }
        }
        detectSwipe(video, function (direction) {
            if (direction === 'left') {
                nextImage()
            } else if (direction === 'right') {
                prevImage()
            }
        })
    } else {
        image.src = prevMediaUrl
        image.onload = () => {
            setTimeout(() => {
                image.classList.add('fade')
            }, 50)
            setTimeout(() => {
                captions.classList.add('fade_captions')
            }, 700)
            captions.innerText = captionsArr[counter]
            viewsCount.innerText = ` ${counter + 1}`
            const prevCounter = (counter - 1) % imgArr.length
            const prevPrevMediaUrl = mob ? `${imgDirMob}/${imgArrMob[prevCounter]}` : `${imgDir}/${imgArr[prevCounter]}`
            preloadPrevMedia(prevPrevMediaUrl)
        }
    }
    sendLog(`prevImage function called on artist: ${artistId}, counter: ${counter + 1}`)
}
