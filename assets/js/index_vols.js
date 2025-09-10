if (!window.Source.media.matches) {
    const assetUrl = window.exhibitionData.assetUrl
    const exhibs = window.exhibitionData.exhibs
    const exhibnames = window.exhibitionData.exhibnames
    const srcImages = window.exhibitionData.images
    const vols = document.querySelectorAll('.vols_wrapper')
    const image = document.querySelector('.center_image_index')

    for (let i = 0; i < exhibs; i++) {
        let exhname = exhibnames[i] ? exhibnames[i] : ""
        vols[i].addEventListener('mouseenter', () => {
            image.src = `${assetUrl}/img/exhibitions/${srcImages[i]}`
            image.onclick = () => {
                location.assign(`/exhibitions/${exhname}`)
            }
        })
    }
}