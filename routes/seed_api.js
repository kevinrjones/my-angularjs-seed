var data = {
    "slips": [
        {
            "title": "Lorem ipsum",
            "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            "title": "Sed egestas",
            "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
        }
    ]
};

// GET

var SlipsServer = function (app, dbName, ensureLoggedIn) {

    var mongo = require("mongoskin");

    var connect = function (dbName, next) {
        var db = mongo.db("localhost/" + dbName, {safe: true});
        next(db);
    }


    var server = {};

    function checkSecurityAndExecute(req, res, callback) {
        if (req.user) {
            callback();
        } else {
            res.send(403);
        }

    }

    app.get('/api/slips', function (req, res) {
        checkSecurityAndExecute(req, res, function () {
            var dateFrom = new Date(Date.parse(req.query.startDate));
            console.log(dateFrom.toUTCString());
            connect(dbName, function (db) {
                db.collection('slips').find().toArray(function (err, items) {
                    res.json([
                        {
                            title: 'some title'
                        },
                        {
                            title: 'some other title'
                        }
                    ]);
                })
            });
        });
    });


//    app.get('/api/slips', function (req, res) {
//        var slips = [];
//        data.slips.forEach(function (slip, i) {
//            slips.push({
//                id: i,
//                title: slip.title,
//                text: slip.text.substr(0, 50) + '...'
//            });
//        });
//        res.json({
//            slips: slips
//        });
//    });

    app.get('/api/slip/:id', function (req, res) {
        checkSecurityAndExecute(req, res, function () {
            var id = req.params.id;
            if (id >= 0 && id < data.slips.length) {
                res.json({
                    slip: data.slips[id]
                });
            } else {
                res.json(false);
            }
        });
    });

    app.post('/api/slip', function (req, res) {
        checkSecurityAndExecute(req, res, function () {
            data.slips.push(req.body);
            res.json(req.body);
        });
    });

    app.put('/api/slip/:id', function (req, res) {
        checkSecurityAndExecute(req, res, function () {

            var id = req.params.id;

            if (id >= 0 && id < data.slips.length) {
                data.slips[id] = req.body;
                res.json(true);
            } else {
                res.json(false);
            }
        });
    });

    app.delete('/api/slip/:id', function (req, res) {
        checkSecurityAndExecute(req, res, function () {

            var id = req.params.id;

            if (id >= 0 && id < data.slips.length) {
                data.slips.splice(id, 1);
                res.json(true);
            } else {
                res.json(false);
            }
        });
    });

    server.app = app;
    return server;
};

module.exports = SlipsServer;