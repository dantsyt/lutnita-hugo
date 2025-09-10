import { imgArr, imgArrMob, imgDir, imgDirMob } from "./data"
import { mob } from "./mob"

const initNextCounter = 1
const initPrevCounter = (imgArr.length - 1)

let nextImageElement = new Image()
let prevImageElement = new Image()
let nextVideoElement = document.createElement('video')
let prevVideoElement = document.createElement('video')

export const preloadNextMedia = (src) => {
    if (src.endsWith('.mp4')) {
        nextVideoElement.src = src
    } else {
        nextImageElement.src = src
    }
}

export const preloadPrevMedia = (src) => {
    if (src.endsWith('.mp4')) {
        prevVideoElement.src = src
    } else {
        prevImageElement.src = src
    }
}

export const initPrevMediaUrl = mob ? `${imgDirMob}/${imgArrMob[initPrevCounter]}` : `${imgDir}/${imgArr[initPrevCounter]}`


export const initNextMediaUrl = mob ? `${imgDirMob}/${imgArrMob[initNextCounter]}` : `${imgDir}/${imgArr[initNextCounter]}`