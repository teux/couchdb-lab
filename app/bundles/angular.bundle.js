require('angular/angular.js');
require('angular-animate/angular-animate.js');
require('angular-uuid-service/uuid-svc.js');
require('angular-pouchdb/angular-pouchdb.js');
require('angular-camera/angular-camera.js');

angular.module('angular.bundle', [
    'pouchdb',
    'omr.directives'    // angular-camera
]);
if (DEBUG) {
    require('angular-mocks/angular-mocks.js');
}
