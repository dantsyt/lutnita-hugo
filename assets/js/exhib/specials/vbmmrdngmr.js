import { mob, image } from "../utils/mob"
import { captions, imgDir, exhId } from "../utils/data"
import { videoRemove } from "./videoRemove"
import { sendLog } from "../utils/log"

export const vbmmrdngmr = () => {
    const namesWrapper = document.querySelector('.names_wrapper')
    const namesContainer = document.querySelectorAll('.names_container')
    if (mob) {
        document.querySelector('.pdf_mob').insertAdjacentHTML('afterend', `
        <h6 class="videoBtn">video</h6>
        `)
        namesWrapper.style.maxHeight = '9.5em'
        namesWrapper.style.marginBottom = '-2em'
        namesWrapper.style.marginTop = '5rem'
    } else {
        document.querySelector('.title_menu').style.display = 'none'
        document.querySelector('.pdf').insertAdjacentHTML('afterend', `
        <h6 class="videoBtn">video</h6>
        `)
        namesContainer[5].style.display = 'none'
    }
    const videoBtn = document.querySelector('.videoBtn')
    videoBtn.addEventListener('click', videoAdd)
}

export const videoAdd = () => {
    const videoBtn = document.querySelector('.videoBtn')
    let videoWrapper
    sendLog(`videoAdd function called on exhibition: ${exhId}`)
    document.documentElement.classList.toggle('dark_mode')
    document.documentElement.style.cursor = "url('cursors/cursor_white.svg'), pointer;"
    document.querySelector('#space_image').classList.remove('space_image')
    image.style.display = 'none'
    image.classList.remove('fade')
    captions.style.display = 'none'
    captions.classList.remove('fade_captions')
    document.querySelector('.image_container_mob_one').insertAdjacentHTML('beforebegin', `
    <div id="videowrapper" class="videowrapper">
    <video id="video" playsinline autoplay loop class="inverted">
    <source src="${imgDir}/vbmmrdngmr.mp4" type="video/mp4" />
    </video>
    </div>
    `)
    document.querySelector('.right_space').insertAdjacentHTML('afterbegin', `
    <p id="close_video" class="close_video">close video  <span id="close_vid_symb"><sup>&#10005;</sup></span></p>
    `)
    if (mob) {
        videoBtn.style.display = 'none'
        document.querySelector('#vbmmrdngmr').insertAdjacentHTML('beforeend', `
    <p id="close_video_mob" class="close_video">close video</p>
    `)
        document.querySelector('#close_video_mob').addEventListener('click', videoRemove)
    }
    const video = document.querySelector('video')
    videoWrapper = document.querySelector('#videowrapper')
    document.querySelectorAll('.inverted').forEach((res) => {
        res.classList.toggle('invert')
    })
    video.onloadedmetadata = () => {
        videoWrapper.classList.add('video_visible')
    }
    document.querySelector('.img_counter').style.opacity = '0'
    document.querySelector('#close_video').addEventListener('click', videoRemove)
    videoBtn.removeEventListener('click', videoAdd)
}