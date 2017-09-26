var express = require('express');
var router = express.Router();

var sql = require('mssql');

var config_lucity = {
    user: process.env.LUCITY_USER,
    password: process.env.LUCITY_PASSWORD,
    server: process.env.LUCITY_SERVER_IP, // You can use 'localhost\\instance' to connect to named instance
    port: process.env.LUCITY_SERVER_PORT,
    database: process.env.LUCITY_DATABASE

    // options: {
    //     encrypt: true // Use this if you're on Windows Azure
    // }
};

try {
  console.log("Creating sqlPoolLucity");
  var sqlPoolLucity = new sql.ConnectionPool(config_lucity).connect();
}
catch(e) {
  console.log("api-lucity.js");
  console.log(e);
}

var getTop100 = function(table,res) {
  sqlPoolLucity.then(function(pool) {
    return pool.request().query('SELECT TOP 100 * FROM ' + table + ';')
  }).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    res.json({err: err});
  })
};

var getQuery = function(query,res) {
  sqlPoolLucity.then(function(pool) {
    return pool.request().query(query)
  }).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    res.json({err: err});
  })
};

/* GET index page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'api/lucity' });
});

router.get('/work/request', function(req, res, next) {
  getTop100("dbo.WKREQ",res);
});

router.get('/work/apm', function(req, res, next) {
  getTop100("dbo.WKWOAPM",res);
});

router.get('/work/tasks', function(req, res, next) {
  getTop100("dbo.WKWOTSK",res);
});

router.get('/work/track', function(req, res, next) {
  getTop100("dbo.WKWOTRAK",res);
});

router.get('/work/reports', function(req, res, next) {
  getTop100("dbo.WKRPTS",res);
});

router.get('/work', function(req, res, next) {
  getTop100("dbo.WKORDER",res);
});

router.get('/work/status/open', function(req, res, next) {
  // var field = req.params.field;
  var query = "SELECT WO_STRT_DT, WO_NUMBER, WO_CAT_TY, WO_PROB_TY, WO_ACTN_TY, WO_EMP_TY FROM dbo.WKORDER WHERE WO_STAT_TY = 'New Work Order' ORDER BY WO_STRT_DT DESC;";
  getQuery(query,res);
});

router.get('/work/example/1', function(req, res, next) {
  var field = req.params.field;
  var query = 'SELECT sum("dbo"."WKORDER"."WO_LH_ACT") AS "sum", "dbo"."WKORDER"."WO_ACTN_TY" AS "WO_ACTN_TY"' +
              'FROM "dbo"."WKORDER"' +
              // 'WHERE ("dbo"."WKORDER"."WO_CAT_TY" = ?' +
              // 'OR "dbo"."WKORDER"."WO_CAT_TY" = ? OR "dbo"."WKORDER"."WO_CAT_TY" = ?)' +
              'GROUP BY "dbo"."WKORDER"."WO_ACTN_TY"' +
              'ORDER BY "sum" DESC, "dbo"."WKORDER"."WO_ACTN_TY" ASC'
  getQuery(query,res);
});

router.get('/work/groupby/:field', function(req, res, next) {
  var field = req.params.field;
  var query = 'SELECT ' + field + ', count(*) as count FROM dbo.WKORDER GROUP BY ' + field + ' ORDER BY count DESC;';
  getQuery(query,res);
});

router.get('/work/groupby/:field1/:field2', function(req, res, next) {
  var field1 = req.params.field1;
  var field2 = req.params.field2;
  var select = field1 + ", " + field2;
  var query = 'SELECT ' + select + ', count(*) as count FROM dbo.WKORDER GROUP BY ' + select + ' ORDER BY ' + field1 + ', count ASC;';
  getQuery(query,res);
});

router.get('/request/groupby/:field', function(req, res, next) {
  var field = req.params.field;
  var query = 'SELECT ' + field + ', count(*) as count FROM dbo.WKREQ GROUP BY ' + field + ' ORDER BY count DESC;';
  getQuery(query,res);
});

module.exports = router;
