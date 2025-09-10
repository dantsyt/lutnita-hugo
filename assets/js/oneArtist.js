import { captions, captionsArr } from "./artist/data"
import { mob, image } from "./artist/mob"
import { initNextMediaUrl, 
    initPrevMediaUrl, 
    preloadNextMedia, 
    preloadPrevMedia 
} from "./artist/imgPreload"
import { nextImage, prevImage } from "./artist/imgHandler"
import { detectSwipe } from "./artist/swipe"
import { sendLog } from "./artist/log"

captions.innerText = captionsArr[0]

preloadPrevMedia(initPrevMediaUrl)
preloadNextMedia(initNextMediaUrl)

setTimeout(() => {
    image.classList.add('fade')
}, 50)
setTimeout(() => {
    captions.classList.add('fade_captions')
}, 500)

window.addEventListener('keydown', function (event) {
    const key = event.key
    if (key === "ArrowLeft") {
        sendLog(key)
        prevImage()
    } else if (key === "ArrowRight") {
        sendLog(key)
        nextImage()
    }
})

image.onclick = (e) => {
    let center = image.width / 2
    e.offsetX > center ? nextImage() : prevImage()
    mob ? sendLog("tap") : sendLog("click")
}

detectSwipe(image, function (direction) {
    if (direction === 'left') {
        nextImage()
    } else if (direction === 'right') {
        prevImage()
    }
    sendLog("swipe")
})



