/**
 * Configures tests, mocks responses. launches tests after bootstrap.
 * Must be called before angular.bootstrap.
 */
module.exports = function () {
    angular.module('App').requires.push('ngMockE2E');
    angular.module('App').run(function ($httpBackend) {
        require('./http-mock.js')($httpBackend);
    });
};

require('./test.js');

setTimeout(mocha.run);

// HMR (webpack)
if(module.hot) {
    module.hot.accept();
    module.hot.dispose(function () {
        mocha.suite.suites.length = 0;
        var stats = document.getElementById('mocha-stats');
        var report = document.getElementById('mocha-report');
        stats && stats.parentNode.removeChild(stats);
        report && report.parentNode.removeChild(report);
    });
}
