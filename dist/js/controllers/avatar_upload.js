let modal = document.querySelector('.upload-modal')
let imgBtn = document.querySelector('.profile-title__hover-message');
let container = document.querySelector('.profile-container')
let uploadAction = document.querySelector('.upload-modal__action')

if (imgBtn) {
    imgBtn.addEventListener('click', function () {
        chooseFile()
    })
}

function chooseFile() {
    modal.style.display = 'flex'

    let actionLabel = document.createElement('label')
    actionLabel.setAttribute('for', 'upload-modal__id')
    actionLabel.textContent = 'Choose the file on your computer'
    actionLabel.style.textDecoration = 'underline'
    actionLabel.style.textAlign = 'center'
    actionLabel.style.cursor = 'pointer'
    uploadAction.appendChild(actionLabel)

    let fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
    fileInput.setAttribute('id', 'upload-modal__id')
    fileInput.style.display = 'none'
    uploadAction.appendChild(fileInput)
}

window.addEventListener('click', function (event) {
    if (event.target == modal) {
        while (uploadAction.firstChild) {
            uploadAction.removeChild(uploadAction.lastChild)
        }
        modal.style.display = 'none'
    }
})


