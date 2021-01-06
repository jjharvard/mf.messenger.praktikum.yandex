import {collectFromForm} from "../common/data_collector.js";

let signBtn = document.querySelector('.sign__btn_main')
let form = document.querySelector('.sign__form')

signBtn.onclick = () => collectFromForm(form, () => {
    window.location.replace('/index.html')
})