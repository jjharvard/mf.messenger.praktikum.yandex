export class ValidationUtil {
}
ValidationUtil.hasError = (input) => !ValidationUtil.VALIDATION_DATA[input.name][1].test(input.value);
ValidationUtil.REGEX_EMAIL = /^\S+@\S+\.[a-z]{2,5}$/;
ValidationUtil.REGEX_NAME = /^[a-zA-Z\-]+$/;
ValidationUtil.REGEX_PASSWORD = /^(\S){6,25}$/;
ValidationUtil.REGEX_PHONE = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
ValidationUtil.VALIDATION_DATA = {
    'email': [
        'Should contain valid email',
        ValidationUtil.REGEX_EMAIL
    ],
    'first_name': [
        'Name should contain letters only',
        ValidationUtil.REGEX_NAME
    ],
    'login': [
        'Login should contain letters only',
        ValidationUtil.REGEX_NAME
    ],
    'second_name': [
        'Surname should contain letters only',
        ValidationUtil.REGEX_NAME
    ],
    'display_name': [
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
    ],
    'create-chat': [
        'Chat should contain letters only',
        ValidationUtil.REGEX_NAME
    ],
    'users-modal': [
        'Login should contain letters only',
        ValidationUtil.REGEX_NAME
    ]
};
//# sourceMappingURL=ValidationUtil.js.map