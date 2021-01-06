import {collectFromForm} from "../common/data_collector.js";

let saveBtn = document.querySelector('.profile-save__btn')
let form = document.querySelector('.profile')

saveBtn.onclick = () => collectFromForm(form, () => {
    window.location.replace('/profile.html')
})