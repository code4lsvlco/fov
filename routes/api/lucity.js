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
    // SELECT TOP 100 * FROM dbo.WKORDER ORDER BY WO_STRT_DT DESC
    // SELECT TOP 100 * FROM dbo.WKORDER ORDER BY WO_STRT_DT DESC;
    return pool.request().query('SELECT TOP 100 * FROM ' + table)
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

// {
// "WO_ID": 3794,
// "WO_NUMBER": "17-02971",
// "WO_INV_ID": 31,
// "WO_CAT_CD": "ST-Sign",
// "WO_CAT_TY": "Signs",
// "WO_PROB_CD": "ST-15",
// "WO_PROB_TY": "Miscellaneous",
// "WO_CAUS_CD": null,
// "WO_CAUS_TY": null,
// "WO_ACTN_CD": "ST-3002",
// "WO_ACTN_TY": "Repair or Straighten Sign",
// "WO_SUPR_CD": "natel",
// "WO_SUPR_TY": "Nate Lanphere",
// "WO_CREW_CD": null,
// "WO_CREW_TY": null,
// "WO_STAT_CD": 999,
// "WO_STAT_TY": "Complete",
// "WO_PROJ_NO": null,
// "WO_TOTCOST": 63.56,
// "WO_OWN_CD": null,
// "WO_OWN_TY": null,
// "WO_ADR_BDG": null,
// "WO_ADR_DIR": null,
// "WO_ADR_STR": "PINE",
// "WO_ADR_TY": "ST",
// "WO_ADR_SFX": null,
// "WO_ADR_APT": null,
// "WO_CITY": null,
// "WO_STATE": null,
// "WO_END_DT": "2017-09-26T00:00:00.000Z",
// "WO_END_TM": null,
// "WO_STRT_DT": "2017-09-26T00:00:00.000Z",
// "WO_STRT_TM": "1900-01-01T08:00:00.000Z",
// "WO_MOD_BY": "jmanian",
// "WO_MOD_DT": "2017-09-26T00:00:00.000Z",
// "WO_USER1CD": null,
// "WO_USER1TY": null,
// "WO_USER2CD": null,
// "WO_USER2TY": null,
// "WO_USER3CD": null,
// "WO_USER3TY": null,
// "WO_USER4": null,
// "WO_USER5": null,
// "WO_USER6": false,
// "WO_USER7": false,
// "WO_USER8": false,
// "WO_DOC_FLG": false,
// "WO_USER9": null,
// "WO_USER10": null,
// "WO_USER11": null,
// "WO_USER12": null,
// "WO_USER13": null,
// "WO_USER14": null,
// "WO_USER15": null,
// "WO_ADRDIR2": null,
// "WO_ADRSTR2": null,
// "WO_ADRTY2": null,
// "WO_ADRSFX2": null,
// "WO_QUANT": 0,
// "WO_ACCOUNT": null,
// "WO_PNUMACT": null,
// "WO_LH_EST": 0,
// "WO_LC_EST": 0,
// "WO_EQ_EST": 0,
// "WO_MAT_EST": 0,
// "WO_TC_EST": 0,
// "WO_LH_ACT": 2,
// "WO_LC_ACT": 47.56,
// "WO_EQ_ACT": 16,
// "WO_MAT_ACT": 0,
// "WO_LH_DIF": 0,
// "WO_LC_DIF": 0,
// "WO_EQ_DIF": 0,
// "WO_MAT_DIF": 0,
// "WO_TC_DIF": 0,
// "WO_PRIORCD": 1,
// "WO_PRIORTY": "High",
// "WO_UCOST": 0,
// "WO_WOHRS": 0,
// "WO_TSK_EST": true,
// "WO_INIDATE": "2017-09-18T00:00:00.000Z",
// "WO_INITIME": "1900-01-01T13:48:00.000Z",
// "WO_INISTAF": "AngelaN",
// "WO_POSTAL": null,
// "WO_OID": null,
// "WO_MBL_ID": null,
// "WO_HANDHELD": null,
// "WO_TIMESTAMP": "2017-09-18T00:00:00.000Z",
// "WO_AC_ID": null,
// "WO_CT_ID": 63,
// "WO_PT_ID": null,
// "WO_EA_ID": null,
// "WO_EP_ID": null,
// "WO_EM_ID": 23,
// "WO_STAT_DT": "2017-09-26T00:00:00.000Z",
// "WO_STAT_TM": "1900-01-01T14:21:00.000Z",
// "WO_EMP_CD": "jmanian",
// "WO_EMP_TY": "Jack Manian",
// "WO_REAS_CD": null,
// "WO_REAS_TY": null,
// "WO_ASGN_CD": null,
// "WO_ASGN_TY": null,
// "WO_ASN_DT": null,
// "WO_ASN_TM": null,
// "WO_ODO_MTR": 0,
// "WO_HR_MTR": 0,
// "WO_OTH_MTR": 0,
// "WO_DEPT_CD": "9",
// "WO_DEPT_TY": "Public Works",
// "WO_DIV_CD": "5",
// "WO_DIV_TY": "Streets",
// "WO_SDIV_CD": null,
// "WO_SDIV_TY": null,
// "WO_AREA_CD": null,
// "WO_AREA_TY": null,
// "WO_SAREACD": null,
// "WO_SAREATY": null,
// "WO_LOC_CD": null,
// "WO_LOC_TY": null,
// "WO_CLASSCD": null,
// "WO_CLASSTY": null,
// "WO_PRJ_DT": null,
// "WO_PRJ_TM": null,
// "WO_REP_CD": null,
// "WO_REP_TY": null,
// "WO_SUBCON": null,
// "WO_PRO_CD": null,
// "WO_PRO_TY": null,
// "WO_UOM_CD": "2",
// "WO_UOM_TY": "Each",
// "WO_TSK_ACT": true,
// "WO_DUR_EST": 0,
// "WO_DUR_ACT": 0,
// "WO_DUR_DIF": 0,
// "WO_FLUDCST": 0,
// "WO_FLUDEST": 0,
// "WO_FLUDDIF": 0,
// "WO_CONCST": 0,
// "WO_CONEST": 0,
// "WO_CONDIF": 0,
// "WO_MISCCST": 0,
// "WO_MISCEST": 0,
// "WO_MISCDIF": 0,
// "WO_BCUSTID": null,
// "WO_BCUSTNO": null,
// "WO_BFIRST": null,
// "WO_BLAST": null,
// "WO_BADDR1": null,
// "WO_BCITY": null,
// "WO_BSTATE": null,
// "WO_BPOSTAL": null,
// "WO_BPHONE": null,
// "WO_BINVNO": null,
// "WO_BINACCT": null,
// "WO_BILLAMT": null,
// "WO_BSNT_DT": null,
// "WO_BRCV_DT": null,
// "WO_BPMT_CD": null,
// "WO_BPMT_TY": null,
// "WO_BILLFLAG": false,
// "WO_BPROCCES": false,
// "WO_FIMPORT": false,
// "WO_USER16C": null,
// "WO_USER16T": null,
// "WO_USER17C": null,
// "WO_USER17T": null,
// "WO_USER18C": null,
// "WO_USER18T": null,
// "WO_USER19C": null,
// "WO_USER19T": null,
// "WO_USER20C": null,
// "WO_USER20T": null,
// "WO_USER21C": null,
// "WO_USER21T": null,
// "WO_USER22": null,
// "WO_USER23": null,
// "WO_USER24": null,
// "WO_U25_DT": null,
// "WO_U25_TM": null,
// "WO_USER26": false,
// "WO_USER27": false,
// "WO_USER28": false,
// "WO_USER29": false,
// "WO_USER30": false,
// "WO_QLOCK": false,
// "WO_MOD_TM": "1900-01-01T14:21:00.000Z",
// "WO_OOD_FLG": false,
// "WO_OSU_FLG": false,
// "WO_OLD_FLG": false,
// "WO_OPN_FLG": false,
// "WO_OTK_FLG": false,
// "WO_MW_ID": 156,
// "WO_BCNAME": null,
// "WO_BFAX": null,
// "WO_BEMAIL": null,
// "WO_BCELL": null,
// "WO_JT_ID": null,
// "WO_ROWVER": "2017-09-26T14:21:16.040Z",
// "WO_PMTRG_CD": null,
// "WO_PMTRG_TY": null,
// "WO_USER31CD": null,
// "WO_USER31TY": null,
// "WO_USER32CD": null,
// "WO_USER32TY": null,
// "WO_USER33CD": null,
// "WO_USER33TY": null,
// "WO_USER34C": null,
// "WO_USER34T": null,
// "WO_USER35C": null,
// "WO_USER35T": null,
// "WO_USER36C": null,
// "WO_USER36T": null,
// "WO_USER37C": null,
// "WO_USER37T": null,
// "WO_USER38C": null,
// "WO_USER38T": null,
// "WO_USER39C": null,
// "WO_USER39T": null,
// "WO_USER40": null,
// "WO_USER41": null,
// "WO_USER42": null,
// "WO_USER43": null,
// "WO_USER44": null,
// "WO_USER45": null,
// "WO_USER46": null,
// "WO_USER47": null,
// "WO_USER48": null,
// "WO_LINK1": null,
// "WO_PCLOCK": false,
// "WO_ADR_PT": null,
// "WO_ADR_B2": null,
// "WO_ADESC1": null,
// "WO_ADESC2": null,
// "WO_USER50C": null,
// "WO_USER50T": null,
// "WO_USER51C": null,
// "WO_USER51T": null,
// "WO_CRT_BY": "AngelaN",
// "WO_CRT_DTTM": "2017-09-18T13:48:00.000Z",
// "WO_HLWO_FLG": false,
// "WO_RBY_CD": null,
// "WO_RBY_TY": null,
// "WO_IBY_CD": null,
// "WO_IBY_TY": null,
// "WO_CONT_CD": null,
// "WO_CONT_TY": null,
// "WO_MZONE_CD": null,
// "WO_MZONE_TY": null,
// "WO_AZONE_CD": null,
// "WO_AZONE_TY": null,
// "WO_ADR2_PT": null,
// "WO_USER52CD": null,
// "WO_USER52TY": null,
// "WO_USER53CD": null,
// "WO_USER53TY": null,
// "WO_USER54CD": null,
// "WO_USER54TY": null,
// "WO_USER55CD": null,
// "WO_USER55TY": null,
// "WO_USER56CD": null,
// "WO_USER56TY": null,
// "WO_USER57CD": null,
// "WO_USER57TY": null,
// "WO_USER58CD": null,
// "WO_USER58TY": null,
// "WO_USER59CD": null,
// "WO_USER59TY": null,
// "WO_USER60CD": null,
// "WO_USER60TY": null,
// "WO_USER61CD": null,
// "WO_USER61TY": null,
// "WO_USER62CD": null,
// "WO_USER62TY": null,
// "WO_USER63CD": null,
// "WO_USER63TY": null,
// "WO_USER64CD": null,
// "WO_USER64TY": null,
// "WO_USER65CD": null,
// "WO_USER65TY": null,
// "WO_USER66CD": null,
// "WO_USER66TY": null,
// "WO_USER67CD": null,
// "WO_USER67TY": null,
// "WO_USER68CD": null,
// "WO_USER68TY": null,
// "WO_USER69CD": null,
// "WO_USER69TY": null,
// "WO_USER70CD": null,
// "WO_USER70TY": null,
// "WO_USER71CD": null,
// "WO_USER71TY": null,
// "WO_USER72": null,
// "WO_USER73": null,
// "WO_USER74": null,
// "WO_USER75": null,
// "WO_USER76": null,
// "WO_USER77": null,
// "WO_USER78": null,
// "WO_USER79": null,
// "WO_USER80": null,
// "WO_USER81": null,
// "WO_USER82": null,
// "WO_USER83": null,
// "WO_USER84": null,
// "WO_USER85": null,
// "WO_USER86": null,
// "WO_USER87": null,
// "WO_USER88": null,
// "WO_USER89": null,
// "WO_USER90": null,
// "WO_USER91": null,
// "WO_USER92_DT": null,
// "WO_USER93_DT": null,
// "WO_USER94_DT": null,
// "WO_USER95_DT": null,
// "WO_USER96_DT": null,
// "WO_USER97_DT": null,
// "WO_USER98_DT": null,
// "WO_USER99_DT": null,
// "WO_USER100_DT": null,
// "WO_USER101_DT": null,
// "WO_USER92_TM": null,
// "WO_USER93_TM": null,
// "WO_USER94_TM": null,
// "WO_USER95_TM": null,
// "WO_USER96_TM": null,
// "WO_USER97_TM": null,
// "WO_USER98_TM": null,
// "WO_USER99_TM": null,
// "WO_USER100_TM": null,
// "WO_USER101_TM": null,
// "WO_USER102": false,
// "WO_USER103": false,
// "WO_USER104": false,
// "WO_USER105": false,
// "WO_USER106": false,
// "WO_USER107": false,
// "WO_USER108": false,
// "WO_USER109": false,
// "WO_USER110": false,
// "WO_USER111": false,
// "WO_PROJECTID": null,
// "WO_PROJECTNAME": null
// }

router.get('/work', function(req, res, next) {
  getTop100("dbo.WKORDER",res);
});

// "WO_CRT_BY": "AngelaN",
// "WO_CRT_DTTM": "2017-09-18T13:48:00.000Z",
// "WO_DIV_TY": "Streets",
// "WO_DEPT_TY": "Public Works",
// "WO_EMP_CD": "jmanian",
// "WO_EMP_TY": "Jack Manian",
// "WO_INIDATE": "2017-09-18T00:00:00.000Z",
// "WO_INITIME": "1900-01-01T13:48:00.000Z",
// "WO_END_DT": "2017-09-26T00:00:00.000Z",
// "WO_END_TM": null,
// "WO_STRT_DT": "2017-09-26T00:00:00.000Z",
// "WO_STRT_TM": "1900-01-01T08:00:00.000Z",
// "WO_SUPR_CD": "natel",
// "WO_SUPR_TY": "Nate Lanphere",
// "WO_STAT_TY": "Complete",
// "WO_TOTCOST": 63.56,
// "WO_ADR_BDG": null,
// "WO_ADR_DIR": null,
// "WO_ADR_STR": "PINE",
// "WO_ADR_TY": "ST",
// "WO_ADR_SFX": null,
// "WO_ADR_APT": null,
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
  var query = 'SELECT ' + select + ', count(*) as count FROM dbo.WKORDER GROUP BY ' + select + ' ORDER BY count DESC;';
  getQuery(query,res);
});

router.get('/request/groupby/:field', function(req, res, next) {
  var field = req.params.field;
  var query = 'SELECT ' + field + ', count(*) as count FROM dbo.WKREQ GROUP BY ' + field + ' ORDER BY count DESC;';
  getQuery(query,res);
});

module.exports = router;
