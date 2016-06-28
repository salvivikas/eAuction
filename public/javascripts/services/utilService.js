'use strict'

// Utility methods
ngApp.service('utilService', [
    function () {
        this.deepClone = function (obj) {
            return JSON.parse(JSON.stringify(obj));
        };

        this.getErrorMessages = function (errors) {
            var messages = [];
            for (var i = 0; i < errors.length; i++) {
                messages[i] = errors[i].message;
            }
            return messages;
        };
    }
]);