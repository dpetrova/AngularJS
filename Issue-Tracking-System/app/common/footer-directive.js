angular.module('issueTracker.common.footer', [])
    .directive('footerDirective', function (){
        return {
            restrict: 'A',
            scope: {something: '='},
            templateUrl: 'app/common/footer-directive.html',
            //controller: 'MainCtrl',
            link: function(scope, element, attrs, controller){
                //console.log(scope);
                //console.log(element);
                //console.log(attrs);
                //console.log(controller);
            }
        };
    });




