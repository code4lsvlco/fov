var express = require('express');
var router = express.Router();

var sqlSCADA = require('mssql');
var config_scada = {
    user: process.env.NWTP_SCADA_SERV_USER,
    password: process.env.NWTP_SCADA_SERV_PASSWORD,
    server: process.env.NWTP_SCADA_SERV_IP, // You can use 'localhost\\instance' to connect to named instance
    port: process.env.NWTP_SCADA_SERV__PORT,
    database: process.env.NWTP_SCADA_SERV_DATABASE
};

try {
  console.log("Creating sqlPoolSCADA");
  var sqlPoolSCADA = new sqlSCADA.ConnectionPool(config_scada).connect();
}
catch(e) {;
  console.log("scada.js");
  console.log(e);
}

var getTop100 = function(table, res, select) {
  if (!select) select = '*';
  sqlPoolSCADA.then(function(pool) {
    return pool.request().query('SELECT TOP 100 ' + select + ' FROM ' + table + ';')
  }).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    res.json({err: err});
  })
};

var getQuery = function(query,res) {
  sqlPoolSCADA.then(function(pool) {
    return pool.request().query(query)
  }).then(function(result) {
    result.recordset = result.recordset.map((record) => {
      record.TagName = record.TagName.split('/').pop();
      console.log(record.TagName);
      return record
    })
    res.json(result);
  }).catch(function(err) {
    res.json({err: err});
  })
};

router.get('/', function(req, res, next) {
  res.json({ title: 'api/scada' });
});

// {
//   "TagName": "ua:HyperHistorian\\\\Configuration/nphst/npminutes/nesludge_travel_count",
//   "Timestamp": "2017-10-19T07:32:05.893Z",
//   "Value": 56813,
//   "Quality": "0"
// }

// router.get('/eldo', function(req, res, next) {
//   getTop100("dbo.eldo",res);
// });
// 
// router.get('/nwtp', function(req, res, next) {
//   getTop100("dbo.npminutes",res);
// });
//
// router.get('/swtp', function(req, res, next) {
//   getTop100("dbo.spminutes",res);
// });
//
// router.get('/particles', function(req, res, next) {
//   getTop100("dbo.particles",res);
// });
//
// router.get('/ReportTags', function(req, res, next) {
//   getTop100("dbo.ReportTags",res);
// });
//
// router.get('/totals', function(req, res, next) {
//   getTop100("dbo.totals",res);
// });

// scwtp/recent
// scwtp/tag_name/all
// scwtp/tag_name/current
router.get('/:facility/:tag_name/:timeframe', function(req, res, next) {
  const facility = req.params.facility;
  const tag_name = req.params.tag_name;
  const timeframe = req.params.timeframe;
  let table = facility.includes('scwtp') || facility.includes('nwtp') ? 'dbo.npminutes' : false;
  if (table === false) table = facility.includes('hbwtp') || facility.includes('swtp') ? 'dbo.spminutes' : false;
  if (table === false) table = facility.includes('eldo') ? 'dbo.eldo' : false;
  if (table === false) table = facility.includes('particles') ? 'dbo.particles' : false;
  if (table === false) table = facility.includes('totals') ? 'dbo.totals' : false;
  if (!table) res.json({err: `${facility} does not exist.`});
  let query = "";
  if (tag_name === "recent") {
    query += `SELECT TagName, Value, Timestamp `;
    query += `FROM ${table} AS t1 `;
    query += `WHERE Timestamp = (SELECT MAX(Timestamp) FROM ${table} AS t2 WHERE t1.TagName = t2.TagName) `;
    query += `ORDER BY Timestamp DESC`;
    // res.json({query: query});
    // query = `SELECT DISTINCT TagName FROM ${table} ORDER BY Timestamp DESC`;
  } else {
    let selectOne = "";
    if (timeframe === "current")  selectOne += "TOP 1";
    query = `SELECT ${selectOne} * FROM ${table} WHERE TagName LIKE '%/${tag_name}' ORDER BY Timestamp DESC`;
  }
  getQuery(query,res)
  // res.json({params: req.params, facility: facility, tag_name: tag_name});
  // getTop100("dbo.totals",res);
});

module.exports = router;

// Tag Names for SCADA

// eldo

// GatePosition
// Intake_Level_FT
// IntakeFlow_CFS

// npminutes

// 2mg_tank_level_ft
// 3mg_tank_level_ft
// AlgaeMeter
// harper_lake_level
// highzone_flow
// louisville_lake_level
// lowzone_flow
// midzone_flow
// nalum_scd
// nbackwash_flow
// nbasin_level_ft
// nbasin_level_output
// nbasin_ph
// nbasin_turb
// nchlorine_dioxide_ppm
// nchlorine_effluent
// nclearwell_level_ft
// nesludge_travel_count
// nfilter_flow
// nfilter1_flow
// nfilter1_loh
// nfilter1_turb
// nfilter2_flow
// nfilter2_loh
// nfilter2_turb
// nfilter3_flow
// nfilter3_loh
// nfilter3_turb
// nfilter4_flow
// nfilter4_loh
// nfilter4_turb
// nhighzone_flow
// nhighzone_psi
// nhighzone_turb
// north_ACH_Gal
// northern_coloado_flow
// nph_effluent
// nraw_flow
// nraw_flow_ao
// nrecycle_flow
// nrecycle_tank_ft
// nsludge_ph
// nturb_effluent
// nturb_raw
// nwaste_flow
// nwsludge_travel_count
// s35mg_tank_level
// total_system_demand

// spminutes

// salum_scd
// sbackwash_flow
// sbackwash_turb
// sbasin_level
// sbasin_level_output
// sbasin_ph
// sbasin_turb
// schlorine_dioxide_ppm
// schlorine_effluent
// sclearwell_level
// sfilter_flow
// sfilter1_flow
// sfilter1_loh
// sfilter1_turb
// sfilter2_flow
// sfilter2_loh
// sfilter2_turb
// sftw_flow
// sftw_turb
// sgolf_flow
// shighzone_flow
// sph_effluent
// spine_prv_flow
// sraw_flow
// sraw_flow_output
// sraw_turb
// srec_prv_flow
// srecycle_flow
// srecycle_tank
// srecycle_waste_flow
// ssanitary_level
// ssludge_ph
// ssludge_recycle_flow
// ssludge_travel_count
// ssludge_waste_flow
// sturb_effluent

// particles

// nparticle_f1_log_r
// nparticle_f1a
// nparticle_f1b
// nparticle_f1c
// nparticle_f1d
// nparticle_f2_log_r
// nparticle_f2a
// nparticle_f2b
// nparticle_f2c
// nparticle_f2d
// nparticle_f3_log_r
// nparticle_f3a
// nparticle_f3b
// nparticle_f3c
// nparticle_f3d
// nparticle_f4_log_r
// nparticle_f4a
// nparticle_f4b
// nparticle_f4c
// nparticle_f4d
// nparticle_rawa
// nparticle_rawb
// nparticle_rawc
// nparticle_rawd
// sparticle_f1_log_r
// sparticle_f1a
// sparticle_f1b
// sparticle_f1c
// sparticle_f1d
// sparticle_f2_log_r
// sparticle_f2a
// sparticle_f2b
// sparticle_f2c
// sparticle_f2d
// sparticle_rawa
// sparticle_rawb
// sparticle_rawc
// sparticle_rawd

// totals

// eldo_flow_pd
// harper_flow_pd
// highzone_flow_pd
// midzone_flow_pd
// nbackwash_flow_pd
// ncwcd_flow_pd
// nfilter_flow_pd
// nfilter1_flow_pd
// nfilter2_flow_pd
// nfilter3_flow_pd
// nfilter4_flow_pd
// nhighzone_flow_pd
// nlowzone_flow_pd
// north_plant_flow_pd
// nraw_flow_pd
// nrecycle_flow_pd
// nwaste_flow_pd
// pretretment_ach_gal
// sbackwash_flow_pd
// sfilter_flow_pd
// sfilter1_flow_pd
// sfilter2_flow_pd
// sftw_flow_pd
// sgolf_flow_pd
// shighzone_flow_pd
// south_plant_flow_pd
// sp_recycle_to_HW_PD
// sp_WasteValve_Flow_PD
// sraw_flow_pd
// srecycle_flow_pd
// ssludge_recycle_flow_pd
// ssludge_waste_flow_pd
