const data = window.exhibitionData
const imgArr = data.arr
const imgArrMob = data.arrMob
const imgDir = data.imgDir 
const imgDirMob = `${imgDir}/mob`
const captionsArr = data.captionsArr

const captions = document.querySelector('#captions_desk')
const artistPath = window.location.pathname
const artistId = artistPath.substring(artistPath.indexOf('/', 1) + 1, artistPath.length)

export { data, imgArr, imgArrMob, imgDir, imgDirMob, captions, captionsArr, artistId }