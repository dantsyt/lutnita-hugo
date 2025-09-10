import { captions, captionsArr } from "./exhib/utils/data"
import { mob, image } from "./exhib/utils/mob"
import { detectSwipe } from "./exhib/utils/swipe"
import { 
    preloadNextImage, 
    preloadPrevImage, 
    initNextImageUrl, 
    initPrevImageUrl 
} from "./exhib/utils/imgPreload"
import { nextImage, prevImage } from "./exhib/utils/imgHandler"
import { sendLog } from "./exhib/utils/log"

import { winter } from "./exhib/specials/winter"
import { annagodzina } from "./exhib/specials/annagodzina"
import { vbmmrdngmr } from "./exhib/specials/vbmmrdngmr"
import { svitlosalome } from "./exhib/specials/svitlosalome"
import { doinamardari } from "./exhib/specials/doinamardari"

document.querySelector('footer').style.backgroundColor = 'unset'
captions.innerText = captionsArr[0]

preloadPrevImage(initPrevImageUrl)
preloadNextImage(initNextImageUrl)

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

let special = document.querySelector('.text_container_nohover').id
switch(special) {
    case "vbmmrdngmr":
        vbmmrdngmr()
        break
    case "svitlosalome":
        svitlosalome()
        break
    case "doinamardari":
        doinamardari()
        break
    case "winter":
        winter()
        break
    case "annagodzina":
        annagodzina()
        break
}