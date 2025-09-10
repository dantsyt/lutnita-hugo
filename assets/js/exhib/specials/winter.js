import { mob } from "../utils/mob"

export const winter = () => {
    const namesContainer = document.querySelectorAll('.names_container')
    namesContainer[7].id = 'empty_w'
    document.querySelector('footer').style.backgroundColor = 'white'
    if (!mob) {
        document.querySelector('.title_menu').style.display = 'none'
    }
}