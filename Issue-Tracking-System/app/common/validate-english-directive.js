angular.module('issueTracker.common.validation', [])
    .directive('validateEnglish', function (){
        return {
            restrict: 'A',
            link: function(scope, element){
                element.on('click', function(){
                    console.log('Clicked!');
                });
            }
        };
    });

