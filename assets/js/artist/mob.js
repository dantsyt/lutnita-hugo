export let mob
export let image

window.Source = window.Source || {};
window.Source.media = window.matchMedia('only screen and (max-width: 1024px)')

const updateValues = () => {
    if (window.Source.media.matches) {
        mob = true
        image = document.querySelector('.mob_one_exhib')
    } else {
        mob = false
        image = document.querySelector('#main_image')
    }
}

updateValues()
window.Source.media.addEventListener('change', updateValues)