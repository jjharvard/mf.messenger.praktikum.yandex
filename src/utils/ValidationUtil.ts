export class ValidationUtil {

    static hasError = (input: HTMLInputElement): boolean => !ValidationUtil.VALIDATION_DATA[input.name][1].test(input.value);

    static REGEX_EMAIL = /^\S+@\S+\.[a-z]{2,5}$/;
    static REGEX_NAME = /^[a-zA-Z\-]+$/;
    static REGEX_PASSWORD = /^(\S){6,25}$/;
    static REGEX_PHONE = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

    static VALIDATION_DATA: { [k: string]: [string, RegExp] } = {
        'email': [
            'Should contain valid email',
            ValidationUtil.REGEX_EMAIL
        ],
        'name': [
            'Name should contain letters only',
            ValidationUtil.REGEX_NAME
        ],
        'login': [
            'Login should contain letters only',
            ValidationUtil.REGEX_NAME
        ],
        'surname': [
            'Surname should contain letters only',
            ValidationUtil.REGEX_NAME
        ],
        'nickname': [
            'Nickname should contain letters only',
            ValidationUtil.REGEX_NAME
        ],
        'password': [
            'Password should be of length from 6 to 25 symbols',
            ValidationUtil.REGEX_PASSWORD
        ],
        'confirm_password': [
            'Password should be of length from 6 to 25 symbols',
            ValidationUtil.REGEX_PASSWORD
        ],
        'phone': [
            'Should contain valid phone number',
            ValidationUtil.REGEX_PHONE
        ]
    };

}