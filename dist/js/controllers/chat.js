let sendBtn = document.querySelector('.input__send')
let inputEdit = document.querySelector('.input__edit')
let inputSearch = document.querySelector('.user__search')

let handleSend = function (e) {
    if (e.key === 'Enter' && e.target.id === 'input__edit_id' || e.target.id === 'input__send_id') {
        e.preventDefault()
        console.log({"message": inputEdit.value})
        inputEdit.value = ""
    }
}

let handleSearch = function (e) {
    if (e.key === 'Enter' && e.target.id === 'user__search_id') {
        e.preventDefault()
        console.log({"search": inputSearch.value})
        inputSearch.value = ""
    }
}

sendBtn.onclick = (e) => handleSend(e)

inputEdit.onkeypress = (e) => handleSend(e)

inputSearch.onkeypress = (e) => handleSearch(e)