import { mob, image } from "../utils/mob"
import { captions, exhId } from "../utils/data"
import { videoRemove } from "./videoRemove"
import { sendLog } from "../utils/log"

export const doinamardari = () => {
    if (mob) {
        document.querySelector('.pdf_mob').insertAdjacentHTML('afterend', `
        <h6 class="videoBtn">video</h6>
        `)
    } else {
        document.querySelector('.pdf').insertAdjacentHTML('afterend', `
        <h6 class="videoBtn">video</h6>
        `)
    }
    const videoBtn = document.querySelector('.videoBtn')
    videoBtn.addEventListener('click', videoAddDoina)
}

export const videoAddDoina = () => {
    let videoWrapper
    const videoBtn = document.querySelector('.videoBtn')
    sendLog(`videoAdd function called on exhibition: ${exhId}`)
    document.documentElement.classList.toggle('dark_mode')
    document.documentElement.style.cursor = "url('cursors/cursor_white.svg'), pointer;"
    document.querySelector('#space_image').classList.remove('space_image')
    image.style.display = 'none'
    image.classList.remove('fade')
    captions.style.display = 'none'
    captions.classList.remove('fade_captions')
    document.querySelector('.image_container_mob_one').insertAdjacentHTML('beforebegin', `
    <div id="videowrapper" class="videowrapper video_doina">
    <div id="video" class="inverted" style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1016962293?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Doina Mardari - Untitled"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
    <p id="captions_doina" class="captions captions_doina">Doina Mardari - Untitled<br>site-specific installation, silicon tubes and water, 2024</p>
    </div>
    `)
    document.querySelector('.right_space').insertAdjacentHTML('afterbegin', `
    <p id="close_video" class="close_video">close video  <span id="close_vid_symb"><sup>&#10005;</sup></span></p>
    `)
    setTimeout(() => {
        document.querySelector('#captions_doina').style.display = 'unset'
    }, 100)
    setTimeout(() => {
        document.querySelector('#captions_doina').classList.add('fade_captions')
    }, 1100)
    if (mob) {
        videoBtn.style.display = 'none'
        document.querySelector('#doinamardari').insertAdjacentHTML('beforeend', `
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
    videoBtn.removeEventListener('click', videoAddDoina)
}