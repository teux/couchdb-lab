angular.module('app.components')
    .controller('ShowPhotoController', function ($scope, $element, $attrs) {
        var removePhoto = function () {
            if ($scope.linkedNode) {
                $scope.linkedNode.remove();
                $scope.linkedNode = null;
            }
        };

        $scope.$watch('doc._attachments.photo', function (photo) {
            removePhoto();
            if (photo) {
                $scope.linkFn($scope, function (clone) {
                    $scope.linkedNode = clone;
                    clone.insertAfter($scope.element);
                    $scope.url().then(function (url) {
                        clone.find('img').attr('src', url);
                    })
                });
            }
        });
    });
