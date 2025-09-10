import { mob, image } from "../utils/mob"
import { captions, exhId } from "../utils/data"
import { videoRemove } from "./videoRemove"
import { sendLog } from "../utils/log"

let videoBtn1, videoBtn2

export const svitlosalome = () => {
    if (mob) {
        document.querySelector('.pdf_mob').insertAdjacentHTML('afterend', `
        <h6 id="videoBtn1" class="videoBtn vidBtnSvitlo">video I</h6>
        <h6 id="videoBtn2" class="videoBtn vidBtnSvitlo">video II</h6>
        `)
    } else {
        document.querySelector('.pdf').insertAdjacentHTML('afterend', `
        <h6 id="videoBtn1" class="videoBtn vidBtnSvitlo">video I</h6>
        <h6 id="videoBtn2" class="videoBtn vidBtnSvitlo">video II</h6>
        `)
    }
    videoBtn1 = document.querySelector('#videoBtn1')
    videoBtn2 = document.querySelector('#videoBtn2')
    videoBtn1.addEventListener('click', videoAdd1)
    videoBtn2.addEventListener('click', videoAdd2)
}

export const videoAdd1 = () => {
    let videoWrapper
    videoBtn1 = document.querySelector('#videoBtn1')
    videoBtn2 = document.querySelector('#videoBtn2')
    sendLog(`videoAdd function called on exhibition: ${exhId} video 1`)
    document.documentElement.classList.toggle('dark_mode')
    document.documentElement.style.cursor = "url('cursors/cursor_white.svg'), pointer;"
    document.querySelector('#space_image').classList.remove('space_image')
    image.style.display = 'none'
    image.classList.remove('fade')
    captions.style.display = 'none'
    captions.classList.remove('fade_captions')
    document.querySelector('.image_container_mob_one').insertAdjacentHTML('beforebegin', `
    <div id="videowrapper" class="videowrapper">
    <div id="video" class="inverted" style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1003391273?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Salt Salome: The Room of the Destiny (Fate)"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
    <p id="captions_svitlosalome" class="captions">Max Svitlo - The Room of the Fugitive (Runner)</p>
    </div>
    `)
    document.querySelector('.right_space').insertAdjacentHTML('afterbegin', `
    <p id="close_video" class="close_video">close video  <span id="close_vid_symb"><sup>&#10005;</sup></span></p>
    `)
    setTimeout(() => {
        document.querySelector('#captions_svitlosalome').style.display = 'unset'
    }, 100)
    setTimeout(() => {
        document.querySelector('#captions_svitlosalome').classList.add('fade_captions')
    }, 1100)
    if (mob) {
        videoBtn1.style.display = 'none'
        videoBtn2.style.display = 'none'
        document.querySelector('#svitlosalome').insertAdjacentHTML('beforeend', `
    <p id="close_video_mob" class="close_video">close video</p>
    `)
        document.querySelector('#close_video_mob').addEventListener('click', videoRemove)
    }
    videoWrapper = document.querySelector('#videowrapper')
    document.querySelectorAll('.inverted').forEach((res) => {
        res.classList.toggle('invert')
    })
    videoWrapper.classList.add('video_visible')
    document.querySelector('#close_video').addEventListener('click', videoRemove)
    document.querySelector('.img_counter').style.opacity = '0'
    videoBtn1.removeEventListener('click', videoAdd1)
    videoBtn2.removeEventListener('click', videoAdd2)
}

export const videoAdd2 = () => {
    let videoWrapper
    videoBtn1 = document.querySelector('#videoBtn1')
    videoBtn2 = document.querySelector('#videoBtn2')
    sendLog(`videoAdd function called on exhibition: ${exhId} video 2`)
    document.documentElement.classList.toggle('dark_mode')
    document.documentElement.style.cursor = "url('cursors/cursor_white.svg'), pointer;"
    document.querySelector('#space_image').classList.remove('space_image')
    image.style.display = 'none'
    image.classList.remove('fade')
    captions.style.display = 'none'
    captions.classList.remove('fade_captions')
    document.querySelector('.image_container_mob_one').insertAdjacentHTML('beforebegin', `
    <div id="videowrapper" class="videowrapper">
    <div id="video" class="inverted" style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1003391330?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Salt Salome: The Room of the Destiny (Fate)"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
    <p id="captions_svitlosalome" class="captions">Salt Salome - The Room of the Destiny (Fate)</p>
    </div>
    `)
    document.querySelector('.right_space').insertAdjacentHTML('afterbegin', `
    <p id="close_video" class="close_video">close video  <span id="close_vid_symb"><sup>&#10005;</sup></span></p>
    `)
    setTimeout(() => {
        document.querySelector('#captions_svitlosalome').style.display = 'unset'
    }, 100)
    setTimeout(() => {
        document.querySelector('#captions_svitlosalome').classList.add('fade_captions')
    }, 1100)
    if (mob) {
        videoBtn1.style.display = 'none'
        videoBtn2.style.display = 'none'
        document.querySelector('#svitlosalome').insertAdjacentHTML('beforeend', `
    <p id="close_video_mob" class="close_video">close video</p>
    `)
        document.querySelector('#close_video_mob').addEventListener('click', videoRemove)
    }
    videoWrapper = document.querySelector('#videowrapper')
    document.querySelectorAll('.inverted').forEach((res) => {
        res.classList.toggle('invert')
    })
    videoWrapper.classList.add('video_visible')
    document.querySelector('#close_video').addEventListener('click', videoRemove)
    document.querySelector('.img_counter').style.opacity = '0'
    videoBtn1.removeEventListener('click', videoAdd1)
    videoBtn2.removeEventListener('click', videoAdd2)
}