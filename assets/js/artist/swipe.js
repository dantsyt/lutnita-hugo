export function detectSwipe(el, func) {
    let swipe_det = {}
    swipe_det.sX = 0
    swipe_det.sY = 0
    swipe_det.eX = 0
    swipe_det.eY = 0
    const min_x = 20
    const max_y = 40
    const max_time = 700
    let startTime = 0
    let isHorizontalSwipe = false

    el.addEventListener('touchstart', function (e) {
        const t = e.touches[0]
        swipe_det.sX = t.screenX
        swipe_det.sY = t.screenY
        startTime = new Date().getTime()
        isHorizontalSwipe = false
    }, false)

    el.addEventListener('touchmove', function (e) {
        const t = e.touches[0]
        swipe_det.eX = t.screenX
        swipe_det.eY = t.screenY
        const dX = swipe_det.eX - swipe_det.sX
        if (Math.abs(dX) > min_x) {
            isHorizontalSwipe = true
        }
        if (isHorizontalSwipe) {
            e.preventDefault()
        }
    }, false)

    el.addEventListener('touchend', function (e) {
        const dX = swipe_det.eX - swipe_det.sX
        const dY = swipe_det.eY - swipe_det.sY
        const elapsedTime = new Date().getTime() - startTime

        if (Math.abs(dX) > min_x && Math.abs(dY) < max_y && elapsedTime <= max_time && isHorizontalSwipe) {
            if (dX > 0) {
                func('right')
            } else {
                func('left')
            }
        }
    }, false)
}