const data = window.exhibitionData
const imgArr = data.arr
const imgDir = data.imgDir 
const imgDirMob = `${imgDir}/mob`
const captionsArr = data.captionsArr

const captions = document.querySelector('#captions_desk')
const exhPath = window.location.pathname
const exhId = exhPath.substring(exhPath.indexOf('/', 1) + 1, exhPath.length)

export { data, imgArr, imgDir, imgDirMob, captions, captionsArr, exhId }