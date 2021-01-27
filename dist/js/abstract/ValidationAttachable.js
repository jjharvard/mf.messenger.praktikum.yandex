export function ValidationAttachable(Base) {
    return class extends Base {
        attachValidation() {
            this.inputsArray = Array.from(document.getElementsByClassName('should_be_validated'));
            console.log(this.inputsArray);
        }
    };
}
