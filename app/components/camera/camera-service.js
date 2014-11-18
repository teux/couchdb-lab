angular.module('app.components')
    .factory('camera', function ($rootScope, $compile) {
        var hasUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);

        var scope = $rootScope.$new();
        var widget = $compile(require('./camera.html'))(scope);

        var service = {
            supported: function () {
                return hasUserMedia;
            },
            take: function (elem, pipePhoto) {
                scope.cameraEnabled = true;
                scope.elem = elem;
                scope.pipePhoto = pipePhoto;
                widget.insertAfter(elem);
                widget.show();
                widget.find('#ng-camera-feed').get(0).play();
            },
            close: function () {
                scope.elem = null;
                scope.pipePhoto = null;
                widget.hide();
                widget.appendTo('body');    // safe position in case of removing docs
            },
            isOpen: function (elem) {
                return scope.elem === elem;
            }
        };

        scope.$watch('media', function () {
            if (typeof scope.pipePhoto === 'function') {
                scope.pipePhoto(scope.media);
            }
        });

        Object.keys(service).forEach(function (key) {
            service[key] = (function (fn) {
                return function () {
                    if (!hasUserMedia) return false;
                    return fn.apply(this, arguments);
                };
            })(service[key]);
        });

        return service;
    });
