angular.module('app.components')
    .directive('takePhoto', function ($compile) {
        return {
            restrict: 'EA',
            controller: 'TakePhotoController',
            transclude: 'element',
            scope: {
                doc: '=',
                modify: '&'
            },
            compile: function () {
                var linkFn = $compile(require('./take-photo.html'));

                return function takePhotoLink(scope, element) {
                    linkFn(scope, function (clone) {
                        scope.linkedNode = clone;
                    });
                    scope.linkedNode.insertAfter(element);
                }
            }
        };
    });
