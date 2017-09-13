var express = require('express');
var router = express.Router();

var sql = require('mssql');

sql.close();

var config_lucity = {
    user: process.env.LUCITY_USER,
    password: process.env.LUCITY_PASSWORD,
    server: process.env.LUCITY_SERVER_IP, // You can use 'localhost\\instance' to connect to named instance
    port: process.env.LUCITY_SERVER_PORT,
    database: process.env.LUCITY_DATABASE_LIVE

    // options: {
    //     encrypt: true // Use this if you're on Windows Azure
    // }
};

/* GET index page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'api/lucity' });
});

router.get('/work/request', function(req, res, next) {
  sql.connect(config_lucity).then(function() {
    new sql.Request().query('SELECT TOP 100 * FROM dbo.WKREQ;', function(err, recordset) {
      sql.close();
      res.json(recordset);
    });
  }).catch(function(err) {
      res.json(err);
  });
});

router.get('/work/apm', function(req, res, next) {
  sql.connect(config_lucity).then(function() {
    new sql.Request().query('SELECT TOP 100 * FROM dbo.WKWOAPM;', function(err, recordset) {
      sql.close();
      res.json(recordset);
    });
  }).catch(function(err) {
      res.json(err);
  });
});

router.get('/work/tasks', function(req, res, next) {
  sql.connect(config_lucity).then(function() {
    new sql.Request().query('SELECT TOP 100 * FROM dbo.WKWOTSK;', function(err, recordset) {
      sql.close();
      res.json(recordset);
    });
  }).catch(function(err) {
      res.json(err);
  });
});

router.get('/work/track', function(req, res, next) {
  sql.connect(config_lucity).then(function() {
    new sql.Request().query('SELECT TOP 100 * FROM dbo.WKWOTRAK;', function(err, recordset) {
      sql.close();
      res.json(recordset);
    });
  }).catch(function(err) {
      res.json(err);
  });
});

router.get('/work/reports', function(req, res, next) {
  sql.connect(config_lucity).then(function() {
    new sql.Request().query('SELECT TOP 100 * FROM dbo.WKRPTS;', function(err, recordset) {
      sql.close();
      res.json(recordset);
    });
  }).catch(function(err) {
      res.json(err);
  });
});

router.get('/work', function(req, res, next) {
  sql.connect(config_lucity).then(function() {
    new sql.Request().query('SELECT TOP 100 * FROM dbo.WKORDER;', function(err, recordset) {
      sql.close();
      res.json(recordset);
    });
  }).catch(function(err) {
      res.json(err);
  });
});

module.exports = router;
