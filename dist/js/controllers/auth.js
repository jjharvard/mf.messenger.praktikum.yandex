import {collectFromForm} from "../common/data_collector.js";

let authBtn = document.querySelector('.auth__btn_main')
let form = document.querySelector('.auth__form')

authBtn.onclick = () => collectFromForm(form)