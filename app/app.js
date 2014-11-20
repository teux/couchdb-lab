require('./components');

angular.module('App', ['angular.bundle', 'app.components'])
    .controller('AppController', function ($scope, $compile, pouchdb) {
        var localdb = 'testdb1';
        var remotedb = 'http://192.168.0.9:5984/' + localdb;
        var docs = $scope.docs = pouchdb.create(localdb);

        var setItemCount = function () {
            docs.info().then(function (info) {
                $scope.itemCount = info.doc_count;
            });
        };
        var pushChange = function () {
            docs.replicate.to(remotedb);
            setItemCount();
        };
        var livePull = function () {
            docs.replicate.from(remotedb, {
                live: true,
                filter: 'coauthor/latest'
            })
            .on('change', function () {
                setItemCount();
            })
        };
        $scope.addDoc = function () {
            docs.post({timestamp: Date.now()}).then(pushChange);
        };
        $scope.modifyDoc = function (doc) {
            docs.put(doc).then(pushChange);
        };
        $scope.removeDoc = function (item) {
            docs.remove(item).then(pushChange);
        };
        $scope.removeDocs = function () {
            docs.allDocs({include_docs: true})
                .then(function (response) {
                    return docs.bulkDocs(response.rows.map(function (row) {
                        return {
                            _id: row.doc._id,
                            _rev: row.doc._rev,
                            _deleted: true
                        };
                    }));
                })
                .then(pushChange);
        };
        $scope.getPhotoUrl = function (doc) {
            return docs.getAttachment(doc._id, 'photo')
                .then(function (blob) {
                    return blobUtil.createObjectURL(blob);
                });
        };

        // Initial replication from
        docs.replicate.from(remotedb, {
            filter: 'coauthor/latest'
        })
        .on('complete', function () {
            setItemCount();
            livePull();
            docs.replicate.to(remotedb);
        });

        setItemCount();
    });
