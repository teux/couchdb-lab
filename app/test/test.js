describe('Co-Author app', function () {
    it('Angular should present in global context', function () {
        expect(angular).not.to.equal(undefined);
    });
    it('PouchDB should present in global context', function () {
        expect(PouchDB).not.to.equal(undefined);
    });
});
