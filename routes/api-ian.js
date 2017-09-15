var express = require('express');
var router = express.Router();

var sqlIan = require('mssql');

var config_mulive = {
    user: process.env.IAN_USER,
    password: process.env.IAN_PASSWORD,
    server: process.env.IAN_SERVER_IP, // You can use 'localhost\\instance' to connect to named instance
    port: process.env.IAN_SERVER_PORT,
    database: process.env.IAN_DATABASE_LIVE

    // options: {
    //     encrypt: true // Use this if you're on Windows Azure
    // }
};

var config_mutest = {
    user: process.env.IAN_USER,
    password: process.env.IAN_PASSWORD,
    server: process.env.IAN_SERVER_IP, // You can use 'localhost\\instance' to connect to named instance
    port: process.env.IAN_SERVER_PORT,
    database: process.env.IAN_DATABASE_TEST

    // options: {
    //     encrypt: true // Use this if you're on Windows Azure
    // }
};

try {
  console.log("Creating sqlPoolMuLive");
  var sqlPoolMuLive = new sqlIan.ConnectionPool(config_mulive).connect();
}
catch(e) {;
  console.log("api-ian.js");
  console.log(e);
  // console.log("Closing sqlPoolMuLive");
  // sqlIan.close();
  // console.log("Creating sqlPoolMuLive");
  // var sqlPoolMuLive = new sqlIan.connect(config_mulive);
}

var getTop100 = function(table,res) {
  // new sqlIan.Request(sqlPoolMuLive).query('SELECT TOP 100 * FROM ' + table + ';', function(err, recordset) {
  //   if (err) return res.json(err);
  //   res.json(recordset);
  // });
  sqlPoolMuLive.then(function(pool) {
    return pool.request().query('SELECT TOP 100 * FROM ' + table + ';')
  }).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    res.json({err: err});
  })
};

var getQuery = function(query,res) {
  // new sqlIan.Request(sqlPoolMuLive).query(query, function(err, recordset) {
  //   if (err) return res.json(err);
  //   res.json(recordset);
  // });
  sqlPoolMuLive.then(function(pool) {
    return pool.request().query(query)
  }).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    res.json({err: err});
  })
};

/* GET index page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'api/ian' });
});

// router.get('/gl_history', function(req, res, next) {
//   sql.connect(config_mulive).then(function() {
//     new sql.Request().query('SELECT TOP 100 * FROM dbo.gl_history;', function(err, recordset) {
//       sql.close();
//       res.json(recordset);
//     });
//   }).catch(function(err) {
//       res.json(err);
//   });
// });

router.get('/account/descriptions', function(req, res, next) {
  var query = "SELECT DISTINCT LongDescription, OrganizationCode, ObjectCode, SegmentOneDescription, SegmentTwoDescription, SegmentThreeDescription, SegmentFourDescription, SegmentFiveDescription" +
    " FROM dbo.AccountDescriptions" +
    " WHERE SegmentOne = 501" +
    " ORDER BY OrganizationCode, ObjectCode" +
    ";"
  getQuery(query,res);
  // new sql.Request().query(query, function(err, recordset) {
  //   res.json(recordset);
  // });
});

router.get('/accounts', function(req, res, next) {
  getTop100("dbo.Accounts",res);
});

router.get('/account/segments', function(req, res, next) {
  getTop100("dbo.AccountSegments",res);
});

// Account Sets/Projections
router.get('/gl/versions', function(req, res, next) {
  getTop100("FROM dbo.glbdprom",res);
});

// Actual GL
router.get('/gl/versions/current', function(req, res, next) {
  var query = "SELECT TOP 100 * FROM dbo.glbdprod" +
              " WHERE glbd_prono = 20174" +
              " AND glbd_org LIKE '501%'" +
              " ORDER BY glbd_prono DESC, glbd_org, glbd_object;"
  getQuery(query,res);
  // sql.connect(config_mulive).then(function() {
  //   new sql.Request().query(query, function(err, recordset) {
  //     sql.close();
  //     res.json(recordset);
  //   });
  // }).catch(function(err) {
  //     res.json(err);
  // });
});

module.exports = router;
