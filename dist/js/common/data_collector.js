export function collectFromForm(form) {
    let res = Array.from(form.elements).reduce((acc, input) => {
        if (input) {
            acc[input.name] = input.value
        }
        return acc
    }, {})
    console.log(res)
}
