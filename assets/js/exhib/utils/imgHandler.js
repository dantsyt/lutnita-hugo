import { imgArr, imgDir, imgDirMob, captions, captionsArr, exhId } from "./data"
import { mob, image } from "./mob"
import { preloadNextImage } from "./imgPreload"
import { sendLog } from "./log"

const viewsCount = document.querySelector('#counter_num')

let counter = 0

export const nextImage = () => {
    counter++
    if (counter == imgArr.length) {
        counter = 0
    }
    const nextImageUrl = mob ? `${imgDirMob}/${imgArr[counter]}_450px.webp` : `${imgDir}/${imgArr[counter]}.webp`

    // preloadNextImage(nextImageUrl)  // Preload the next image

    image.classList.remove('fade')
    image.onload = null
    image.src = nextImageUrl

    captions.classList.remove('fade_captions')
    image.onload = () => {
        setTimeout(() => {
            image.classList.add('fade')
        }, 50)
        setTimeout(() => {
            captions.classList.add('fade_captions')
        }, 700)
        captions.innerText = captionsArr[counter]
        viewsCount.innerText = ` ${counter + 1}`

        // Preload the next image
        const nextCounter = (counter + 1) % imgArr.length
        const nextNextImageUrl = mob ? `${imgDirMob}/${imgArr[nextCounter]}_450px.webp` : `${imgDir}/${imgArr[nextCounter]}.webp`
        preloadNextImage(nextNextImageUrl)
    }
    sendLog(`nextImage function called on exhibition: ${exhId}, counter: ${counter + 1}`)
}

export const prevImage = () => {
    counter--
    if (counter == -1) {
        counter = imgArr.length - 1
    }
    const prevImageUrl = mob ? `${imgDirMob}/${imgArr[counter]}_450px.webp` : `${imgDir}/${imgArr[counter]}.webp`

    //preloadNextImage(prevImageUrl)  // Preload the previous image

    image.classList.remove('fade')
    image.onload = null
    image.src = prevImageUrl

    captions.classList.remove('fade_captions')
    image.onload = () => {
        setTimeout(() => {
            image.classList.add('fade')
        }, 50)
        setTimeout(() => {
            captions.classList.add('fade_captions')
        }, 700)
        captions.innerText = captionsArr[counter]
        viewsCount.innerText = ` ${counter + 1}`

        // Preload the next image
        const prevCounter = (counter - 1) % imgArr.length
        const prevPrevImageUrl = mob ? `${imgDirMob}/${imgArr[prevCounter]}_450px.webp` : `${imgDir}/${imgArr[prevCounter]}.webp`
        preloadNextImage(prevPrevImageUrl)
    }
    sendLog(`prevImage function called on exhibition: ${exhId}, counter: ${counter + 1}`)
}