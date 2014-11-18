require('./components');

angular.module('App', ['angular.bundle', 'app.components'])
    .controller('AppController', function ($scope, $compile, pouchdb) {
        var localdb = 'testdb1';
        var remotedb = 'http://teux.iriscouch.com/' + localdb;
        var docs = $scope.docs = pouchdb.create(localdb);

        var setItemCount = function () {
            docs.info().then(function (info) {
                $scope.itemCount = info.doc_count;
            });
        };
        var onChange = function () {
            docs.replicate.to(remotedb);
            setItemCount();
        };

        setItemCount();

        docs.replicate.from(remotedb, {live: true})
            .on('change', function () {
                setItemCount();
            })
            .on('complete', function () {
                docs.replicate.to(remotedb);
            })
            .on('error', function (err) {
                console.log(err);
            });

        $scope.addDoc = function () {
            docs.post({timestamp: Date.now()}).then(onChange);
        };

        $scope.modifyDoc = function (doc) {
            docs.put(doc).then(onChange);
        };

        $scope.removeDoc = function (item) {
            docs.remove(item).then(onChange);
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
                .then(onChange);
        };

        $scope.getPhotoUrl = function (doc) {
            return docs.getAttachment(doc._id, 'photo')
                .then(function (blob) {
                    return blobUtil.createObjectURL(blob);
                });
        }
    });
