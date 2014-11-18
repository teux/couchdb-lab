angular.module('app.components')
    .directive('showPhoto', function ($compile) {
        return {
            restrict: 'EA',
            controller: 'ShowPhotoController',
            transclude: 'element',
            scope: {
                doc: '=',
                url: '&'
            },
            compile: function () {
                var linkFn = $compile(require('./show-photo.html'));
                return function takePhotoLink(scope, element) {
                    scope.linkFn = linkFn;
                    scope.element = element;
                }
            }
        };
    });
