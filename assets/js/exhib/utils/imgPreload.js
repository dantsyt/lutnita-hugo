import { imgArr, imgDir, imgDirMob } from "./data"
import { mob } from "./mob"

const initPrevCounter = (imgArr.length - 1)
const initNextCounter = 1

let nextImageElement = new Image()
let prevImageElement = new Image()

export const preloadNextImage = (src) => {
    nextImageElement.src = src
}

export const preloadPrevImage = (src) => {
    prevImageElement.src = src
}

export const initPrevImageUrl = mob ? `${imgDirMob}/${imgArr[initPrevCounter]}_450px.webp` : `${imgDir}/${imgArr[initPrevCounter]}.webp`

export const initNextImageUrl = mob ? `${imgDirMob}/${imgArr[initNextCounter]}_450px.webp` : `${imgDir}/${imgArr[initNextCounter]}.webp`