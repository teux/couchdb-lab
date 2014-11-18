module.exports = function ($httpBackend) {
    $httpBackend.whenGET('/rest/news/').respond(200, []);
    $httpBackend.whenGET(/^assets\//).passThrough();
};
