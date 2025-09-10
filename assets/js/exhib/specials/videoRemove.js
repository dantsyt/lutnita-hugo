import { mob, image } from "../utils/mob"
import { captions, exhId } from "../utils/data"
import { videoAdd } from "./vbmmrdngmr"
import { videoAdd1, videoAdd2 } from "./svitlosalome"
import { videoAddDoina } from "./doinamardari"
import { videoAddAnna } from "./annagodzina"
import { sendLog } from "../utils/log"

export const videoRemove = () => {
    const videoWrapper = document.querySelector('#videowrapper')
    const videoBtn = document.querySelector('.videoBtn')
    const videoBtn1 = document.querySelector('#videoBtn1')
    const videoBtn2 = document.querySelector('#videoBtn2')

    sendLog(`videoRemove function called on exhibition: ${exhId}`)

    if (mob) {
        if (document.querySelector('.text_container_nohover').id == 'svitlosalome') {
            videoBtn1.style.display = 'unset'
            videoBtn2.style.display = 'unset'
        } else {
            videoBtn.style.display = 'unset'
        }
        document.querySelector('#close_video_mob').remove()
    }
    
    document.querySelector('.img_counter').style.opacity = 'unset'
    document.querySelector('#space_image').classList.add('space_image')
    document.documentElement.classList.toggle('dark_mode')
    document.querySelectorAll('.inverted').forEach((res) => {
        res.classList.toggle('invert')
    })
    videoWrapper.remove()

    setTimeout(() => {
        image.style.display = 'unset'
        captions.style.display = 'unset'
    }, 900)
    setTimeout(() => {
        image.classList.add('fade')
        captions.classList.add('fade_captions')
    }, 1100)
    document.querySelector('#close_video').remove()

    let exhName = document.querySelector('.text_container_nohover').id
    switch(exhName) {
        case "vbmmrdngmr":
            videoBtn.addEventListener('click', videoAdd)
            break
        case "svitlosalome":
            videoBtn1.addEventListener('click', videoAdd1)
            videoBtn2.addEventListener('click', videoAdd2)
            break
        case "doinamardari":
            videoBtn.addEventListener('click', videoAddDoina)
            break
        case "annagodzina":
            videoBtn.addEventListener('click', videoAddAnna)
            break
    }
}