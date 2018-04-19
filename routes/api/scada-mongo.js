var express = require('express');
var router = express.Router();

var WtpScadaData = require('../../models/wtpscadadata');

// var simplify = require('simplify-js')

var getTop100 = function(table, res, select) {
  // if (!select) select = '*';
  // sqlPoolSCADA.then(function(pool) {
  //   return pool.request().query('SELECT TOP 100 ' + select + ' FROM ' + table + ';')
  // }).then(function(result) {
  //   res.json(result);
  // }).catch(function(err) {
  //   res.json({err: err});
  // })
};

var getQuery = function(query,res) {
  // sqlPoolSCADA.then(function(pool) {
  //   return pool.request().query(query)
  // }).then(function(result) {
  //   result.recordset = result.recordset.map((record) => {
  //     record.TagName = record.TagName.split('/').pop();
  //     console.log(record.TagName);
  //     return record
  //   })
  //   res.json(result);
  // }).catch(function(err) {
  //   res.json({err: err});
  // })
};

router.get('/', function(req, res, next) {
  res.json({ title: 'api/scada/mongo' });
});

// router.get('/totals/north_plant_flow_pd', function(req, res, next) {
//   let table = "totals";
//   let tag = "north_plant_flow_pd";
//   let regexTagName = new RegExp("/" + table + "/" + tag,"i");
//   // console.log(regexTagName);
//   WtpScadaData.find({TagName: { $regex: regexTagName }}).sort({ Timestamp: -1 }).exec(function(err,result){
//     res.json({recordset: result});
//   });
// });

// router.get('/npminutes/highzone_flow', function(req, res, next) {
//   let table = "npminutes";
//   let tag = "highzone_flow";
//   tag = "2mg_tank_level_ft";
//   tag = "3mg_tank_level_ft";
//   tag = "AlgaeMeter";
//   // tag = "nfilter4_loh";
//   let regexTagName = new RegExp("/" + table + "/" + tag,"i");
//   // console.log(regexTagName);
//   WtpScadaData.find({TagName: { $regex: regexTagName }}).sort({ Timestamp: -1 }).exec(function(err,result){
//     res.json({recordset: result});
//   });
// });

// url='/api/lucity/work/groupby/WO_END_DT' category="WO_END_DT" series="count"

// router.get('/:facility/:tag_name/:timeframe', function(req, res, next) {

// router.get('/work/groupby/:field', function(req, res, next) {
//   var field = req.params.field;
//   var query = 'SELECT ' + field + ', count(*) as count FROM dbo.WKORDER GROUP BY ' + field + ' ORDER BY count DESC;';
//   getQuery(query,res);
// });

// scwtp/recent
// scwtp/tag_name/all
// scwtp/tag_name/current
router.get('/:facility/:tag_name/:timeframe', function(req, res, next) {
  const facility = req.params.facility;
  const tag_name = req.params.tag_name;
  const timeframe = req.params.timeframe;
  let table = facility.includes('scwtp') || facility.includes('nwtp') ? 'npminutes' : false;
  if (table === false) table = facility.includes('hbwtp') || facility.includes('swtp') ? 'spminutes' : false;
  if (table === false) table = facility.includes('eldo') ? 'eldo' : false;
  if (table === false) table = facility.includes('particles') ? 'particles' : false;
  if (table === false) table = facility.includes('totals') ? 'totals' : false;
  if (!table) res.json({err: `${facility} does not exist.`});
  let regexTagName = new RegExp("/" + table + "/" + tag_name,"i");
  // if (tag_name === "recent") {
  //   WtpScadaData.find({TagName: { $regex: regexTagName }}).sort({ Timestamp: -1 }).exec(function(err,result){
  //     res.json({recordset: result});
  //   });
  // } else {
    if (timeframe === "current") {
      WtpScadaData.find({TagName: { $regex: regexTagName }}).sort({ Timestamp: -1 }).limit(1).exec(function(err,result){
        res.json({recordset: result});
      });
    } else {
      WtpScadaData.find({TagName: { $regex: regexTagName }}).sort({ Timestamp: -1 }).exec(function(err,result){
        res.json({recordset: result});
      });
    };
  // }
});

module.exports = router;