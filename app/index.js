require.ensure(['./bundles/style.bundle.js'], function () {
    require('./bundles/style.bundle.js');
}, 'style');

require.ensure(['./bundles/pouch.bundle.js'], function () {
    require('./bundles/pouch.bundle.js');
}, 'pouch');

require.ensure(['./bundles/jquery.bundle.js'], function () {
    require.ensure(['./bundles/angular.bundle.js'], function () {
        require.ensure(['./app.js'], function () {
            require('./app.js');
            if (DEBUG) require('./test/web.js')();
            angular.bootstrap(document, ['App']);
        }, 'app');
        require('./bundles/angular.bundle.js');
    }, 'angular');
    require('./bundles/jquery.bundle.js');
}, 'jquery');

// Testing stuff
if (DEBUG) {
    var chai = require("chai");
    chai.use(require("chai-as-promised"));
    (0, eval)('this').expect = chai.expect;
    chai.should();

    require('mocha');
    require("mocha/mocha.css");
    require("./styles/mocha.css");
    mocha.setup('bdd');

    var wrapper = document.createElement('div');
    wrapper.id = 'mocha';
    document.getElementById('main').appendChild(wrapper);
}
