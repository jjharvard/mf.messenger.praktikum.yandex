export var METHOD;
(function (METHOD) {
    METHOD["GET"] = "GET";
    METHOD["PUT"] = "PUT";
    METHOD["POST"] = "POST";
    METHOD["DELETE"] = "DELETE";
})(METHOD || (METHOD = {}));
;
export const DEFAULT_REQUEST_OPTIONS = {
    url: '',
    headers: {
        'Content-Type': 'application/json'
    },
    queryParams: {},
    timeout: 5000,
    data: {}
};
//# sourceMappingURL=HTTPTypes.js.map