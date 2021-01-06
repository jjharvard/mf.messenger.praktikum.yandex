export function collectFromForm(form, next) {
    let res = Array.from(form.elements).reduce((acc, input) => {
        if (input) {
            acc[input.name] = input.value
        }
        return acc
    }, {})
    console.log(res)
    if(next) {
        next()
    }
}
