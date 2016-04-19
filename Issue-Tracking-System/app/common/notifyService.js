'use strict';

angular.module('issueTracker.notify', [])
    .factory('notify', [function () {

        function showInfo(message) {
            noty({
                    text: message,
                    type: 'info',
                    layout: 'topCenter',
                    timeout: 1000}
            );
        }

        function showSuccess(message) {
            noty({
                    text: message,
                    type: 'success',
                    layout: 'topCenter',
                    timeout: 1000}
            );
        }

        function showError(message, serverError) {
            // Collect errors to display from the server response
            var errors = [];
            if (serverError && serverError.error_description) {
                errors.push(serverError.error_description);
            }
            if (serverError && serverError.modelState) {
                var modelStateErrors = serverError.modelState;
                for (var propertyName in modelStateErrors) {
                    var errorMessages = modelStateErrors[propertyName];
                    var trimmedName = propertyName.substr(propertyName.indexOf('.') + 1);
                    for (var i = 0; i < errorMessages.length; i++) {
                        var currentError = errorMessages[i];
                        errors.push(trimmedName + ' - ' + currentError);
                    }
                }
            }
            if (errors.length > 0) {
                message = message + ":<br>" + errors.join("<br>");
            }
            noty({
                    text: message,
                    type: 'error',
                    layout: 'topCenter',
                    timeout: 3000}
            );
        }

        return {
            showInfo: showInfo,
            showSuccess: showSuccess,
            showError: showError
        };
    }]);
