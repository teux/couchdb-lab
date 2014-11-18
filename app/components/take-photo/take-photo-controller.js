angular.module('app.components')
    .controller('TakePhotoController', function ($scope, $element, $attrs, camera) {

        $scope.$watch('doc._attachments.photo', function (photo) {
            $scope.hasPhoto = !!photo
        });

        $scope.takePhoto = function () {
            if ($scope.hasPhoto) {
                delete $scope.doc._attachments;
                $scope.modify($scope.doc);

            } else if (camera.isOpen($scope.linkedNode)) {
                camera.close();

            } else {
                camera.take($scope.linkedNode, function (imgUrl) {
                    var match = imgUrl.match(/^data:([^;]+);base64,(.+)$/);
                    $scope.doc._attachments = {
                        photo: {
                            type: match[1],
                            data: match[2]
                        }
                    };
                    $scope.modify();
                    camera.close();
                });
            }
        };
    });
