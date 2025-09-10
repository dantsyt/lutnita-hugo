const title = document.getElementById('title')
const assetUrl = window.data.assetUrl

const names = document.querySelectorAll('.text_container')
const image = document.querySelector('.center_image_exhib')
for (let name of names) {
    name.addEventListener('mouseenter', () => {
        image.src = `${assetUrl}/img/exhibitions/${name.firstElementChild.id}.webp`
        image.onclick = () => {
            location.assign(`/exhibitions/${name.id}`)
        }
    })
}
if (document.querySelector('#winter')) {
    const emptyContainer = document.querySelector('#winter > div.names_wrapper').children
    emptyContainer[7].id = 'empty_w'
}