const footer = document.querySelector('.footer')
const header = document.querySelector('.header')
const title = document.querySelector('.title')

const hoverForMenu = [footer, title, header]

const navbar = document.querySelector('#navbar')
const navBtns = document.querySelectorAll('.nav-btns')

window.Source = window.Source || {}
window.Source.media = window.matchMedia('only screen and (max-width: 1024px)')

if (window.Source.media.matches) {
    title.addEventListener('click', () => {
        navbar.className = 'navbar'
        for (let one of navBtns) {
            one.style.visibility = 'visible'
        }
    })
    navbar.addEventListener('click', (e) => {
        if (e.target == navbar) {
            navbar.className = 'navbar_hidden'
            for (let one of navBtns) {
                one.style.visibility = 'hidden'
            }
        }
    })
} else {
    displayNavBar = () => {
        navbar.className = 'navbar'
        for (let one of navBtns) {
            one.style.visibility = 'visible'
        }
    }
    hideNavBar = () => {
        navbar.className = 'navbar_hidden'
        navBtns.className = 'nav-btns_hidden'
    }

    const page = ["CURRENT", "UPCOMING"]
    if (!page.includes(title.innerText)) {
        hoverForMenu.forEach(elem => { 
            elem.addEventListener('mouseenter', displayNavBar) 
            elem == footer ? elem.addEventListener('mouseleave', hideNavBar) 
            : elem.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    hideNavBar()
                }, 3000)
            })
        })
    }
}

document.oncontextmenu = () => { return false }