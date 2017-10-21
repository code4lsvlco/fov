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

try {
  console.log("Creating sqlPoolMuLive");
  var sqlPoolMuLive = new sqlIan.ConnectionPool(config_mulive).connect();
}
catch(e) {;
  console.log("ian.js");
  console.log(e);
  // console.log("Closing sqlPoolMuLive");
  // sqlIan.close();
  // console.log("Creating sqlPoolMuLive");
  // var sqlPoolMuLive = new sqlIan.connect(config_mulive);
}

var getTop100 = function(table, res, select) {
  // new sqlIan.Request(sqlPoolMuLive).query('SELECT TOP 100 * FROM ' + table + ';', function(err, recordset) {
  //   if (err) return res.json(err);
  //   res.json(recordset);
  // });
  if (!select) select = '*';
  sqlPoolMuLive.then(function(pool) {
    return pool.request().query('SELECT TOP 100 ' + select + ' FROM ' + table + ';')
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

var queryAccountBudgetAmounts = function(queryParams = {}, res) {
  // ["A.AccountType = 'E'"]
  let where = "";
  if (queryParams.where) where = queryParams.where.map((and) => {return ` AND ${and}`})
  var query = "SELECT DISTINCT" +
    " AD.AccountId, AD.LongDescription, AD.ShortDescription," +
    " AD.OrganizationCode, AD.OrgLongDescription, AD.OrgShortDescription," +
    " AD.ObjectCode, AD.ObjLongDescription, AD.ObjShortDescription," +
    " AD.ProjectCode, AD.ProjectTitle," +
    " AD.SegmentOne, AD.SegmentOneDescription," +
    " AD.SegmentTwo, AD.SegmentTwoDescription," +
    " AD.SegmentThree, AD.SegmentThreeDescription," +
    " AD.SegmentFour, AD.SegmentFourDescription," +
    " AD.SegmentFive, AD.SegmentFiveDescription," +
    " AD.SegmentSix, AD.SegmentSixDescription," +
    " AD.SegmentSeven, AD.SegmentSevenDescription," +
    " AD.SegmentEight, AD.SegmentEightDescription," +
    " A.FullAccount, A.Status, A.AccountType," +
    " A.Revised_CY, A.Revised_NY, A.Revised_LY1," +
    " A.OriginalBudget_CY, A.OriginalBudget_NY, A.OriginalBudget_LY1," +
    " A.MemoBalance_CY, A.MemoBalance_NY, A.MemoBalance_LY1," +
    " A.Encumbrance_CY, A.Encumbrance_NY, A.Encumbrance_LY1," +
    " A.TransferIn_CY, A.TransferIn_NY, A.TransferIn_LY1," +
    " A.TransferOut_CY, A.TransferOut_NY, A.TransferOut_LY1" +
    " FROM dbo.AccountDescriptions AD" +
    " INNER JOIN dbo.Accounts A ON AD.AccountId = A.Id" +
    " WHERE A.Status = 'A'" + where +
    // " AND A.AccountType = 'E'" +
    // " WHERE AD.OrganizationCode = 101600" +
    // " AND AD.ObjLongDescription LIKE 'Lucity%'" +
    " ORDER BY AD.OrganizationCode, AD.ObjectCode" +
    ";"
    console.log(query);
    getQuery(query,res);
}

/* GET index page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'api/ian' });
  // new sql.Request().query(query, function(err, recordset) {
  //   res.json(recordset);
  // });
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

// Library Example
// OrganizationCode [101600] => 101-SegmentOne,Fund 600-SegmentFive,Division
// ObjectCode [526210] => 526-xxx,xxx 210-xxx,Object
// Fund-SegmentOne
// Department-SegmentTwo
// Program-SegmentThree
// SubProgram-SegmentFour
// Division-SegmentFive
router.get('/budget', function(req, res, next) {
  queryAccountBudgetAmounts({},res);
});

router.get('/budget/expenses', function(req, res, next) {
  queryAccountBudgetAmounts({ where: ["A.AccountType = 'E'"]},res);
});

router.get('/budget/revenues', function(req, res, next) {
  queryAccountBudgetAmounts({ where: ["A.AccountType = 'R'"]},res);
});

// Library Example
// "AccountId": 7271
// OrganizationCode [101600] => 101-SegmentOne,Fund 600-SegmentFive,Division
// ObjectCode [526210] => 526-xxx,xxx 210-xxx,Object
router.get('/test', function(req, res, next) {
  var query = "SELECT TOP 100 *" +
    // " FROM dbo.gl_history"
    " From dbo.Accounts WHERE AccountType = 'E' AND Status = 'A'" +
    " AND FullAccount LIKE '%-520100-%'"
    // " AND OrganizationCode = '101110' And ObjectCode = '520100'"
    // " FROM dbo.Accounts WHERE Id = 7271" +
    // " FROM dbo.MasterBals WHERE AccountId = 7271" +
    // " FROM dbo.MasterBalHistories WHERE AccountId = 7271" +
    " ORDER BY OrganizationCode, ObjectCode" +
    ";"
  getQuery(query,res);
});

// {
// "AccountId": 4894,
// "LongDescription": "Equity in Pooled Cash",
// "ShortDescription": "Equity in",
// "OrganizationCode": "501000",
// "OrgLongDescription": "Water Bal Sheet",
// "OrgShortDescription": "Water Bal",
// "ObjectCode": "100007",
// "ObjLongDescription": "Equity in Pooled Cash",
// "ObjShortDescription": "Equity in",
// "ProjectCode": " ",
// "ProjectTitle": " ",
// "SegmentOne": "501",
// "SegmentOneDescription": "Water Utility Fund",
// "SegmentOneShortDescription": "Water",
// "SegmentTwo": "0",
// "SegmentTwoDescription": "Non Functional",
// "SegmentTwoShortDescription": "No Funct",
// "SegmentThree": "00",
// "SegmentThreeDescription": "Non-Programmatic",
// "SegmentThreeShortDescription": "No Prog",
// "SegmentFour": "000",
// "SegmentFourDescription": "Non-Programmatic",
// "SegmentFourShortDescription": "No Prog",
// "SegmentFive": "000",
// "SegmentFiveDescription": "Balance Sheet Account",
// "SegmentFiveShortDescription": "Bal Sheet",
// "SegmentSix": " ",
// "SegmentSixDescription": " ",
// "SegmentSixShortDescription": " ",
// "SegmentSeven": " ",
// "SegmentSevenDescription": " ",
// "SegmentSevenShortDescription": " ",
// "SegmentEight": " ",
// "SegmentEightDescription": " ",
// "SegmentEightShortDescription": " "
// }

router.get('/account/descriptions', function(req, res, next) {
  var query = "SELECT TOP 100 *" +
    " FROM dbo.AccountDescriptions" +
    " WHERE SegmentOne = 501" +
    " ORDER BY OrganizationCode, ObjectCode" +
    ";"
  getQuery(query,res);
});

// {
// "Id": 4876,
// "AccountType": "B",
// "SegmentOne": "101",
// "SegmentTwo": "0",
// "SegmentThree": "00",
// "SegmentFour": "000",
// "SegmentFive": "000",
// "SegmentSix": null,
// "SegmentSeven": null,
// "SegmentEight": null,
// "OrganizationCode": "101000",
// "ObjectCode": "100000",
// "ProjectCode": null
// }

// router.get('/account/segments', function(req, res, next) {
//   getTop100("dbo.AccountSegments",res);
// });

// {
// "Id": 170,
// "AccountId": 4876,
// "Year": 2016,
// "OriginalBudget": 0,
// "TransferIn": 0,
// "TransferOut": 0,
// "CarryForward": 0,
// "CarryForwardTransfer": 0,
// "Revised": 0,
// "MemoBalance": 1795,
// "Actuals": 1795,
// "Statistics": 0,
// "ActualCarryForwardFromLY": 0,
// "Encumbrance": 0,
// "EncumbranceCarryForwardFromLY": 0,
// "Requisition": 0,
// "InceptionToSoy": 0,
// "InceptionOriginalBudget": 0,
// "InceptionRevisedBudget": 0,
// "CarryForwardUnusedBudget": 0,
// "Filler": "                                                  ",
// "Version": {
// "type": "Buffer",
// "data": [
// 0,
// 0,
// 0,
// 0,
// 0,
// 137,
// 53,
// 234
// ]
// },
// "MYOriginalBudgetFY": 0,
// "MYTransferInFY": 0,
// "MYTransferOutFY": 0,
// "MYRevisedFY": 0,
// "MYOriginalBudgetLTD": 0,
// "MYTransferInLTD": 0,
// "MYTransferOutLTD": 0,
// "MYRevisedLTD": 0
// }

router.get('/account/histories', function(req, res, next) {
  getTop100("dbo.AccountHistories",res);
});

// {
// "Id": 5014,
// "OrganizationId": 373,
// "ObjectId": 1597,
// "ProjectId": null,
// "SegX": "000000000000000000000000000000",
// "ShortDescription": "Allow for",
// "LongDescription": "Allow for Fair Value of Invest",
// "AccountType": "B", => B,E,R
// "FullAccount": "502-0-00-000-000-102001-     ",
// "EntityCode": "1",
// "Status": "A", => A,I
// "BalanceType": "A", => A,L,U,null,' '
// "IsBudgetary": false,
// "ReferenceOrgId": null,
// "ReferenceObjId": null,
// "ReferenceProjId": null,
// "AccountLastUpdate": "2017-03-22T00:00:00.000Z",
// "NormalBalanceType": "D",
// "BudgetYear": 0,
// "NextYearDescription": null,
// "BudgetFactor": 0,
// "WarningLevel": 0,
// "RequireBudgetDetail": false,
// "ClosingBalance": "C",
// "ControlAccountType": null,
// "CmAcctWarning": "N",
// "IsContraAccount": false,
// "SpendingPlan": null,
// "BeginningEffectiveDate": null,
// "EndEffectiveDate": null,
// "AutoEncumber": false,
// "PayrollEncumbrance": false,
// "IsProjectAccountRequired": false,
// "InceptionToSoy": 0,
// "Budget_NY5": 0,
// "Statistics_NY5": 0,
// "Budget_NY4": 0,
// "Statistics_NY4": 0,
// "Budget_NY3": 0,
// "Statistics_NY3": 0,
// "Budget_NY2": 0,
// "Statistics_NY2": 0,
// "Budget_Request1_NY1": 0,
// "Budget_Request2_NY1": 0,
// "Budget_Request3_NY1": 0,
// "Budget_Request4_NY1": 0,
// "Budget_Request5_NY1": 0,
// "Statistics1_NY1": 0,
// "Statistics2_NY1": 0,
// "Statistics3_NY1": 0,
// "Statistics4_NY1": 0,
// "Statistics5_NY1": 0,
// "Budget_Request1_CY": 0,
// "Budget_Request2_CY": 0,
// "Budget_Request3_CY": 0,
// "Budget_Request4_CY": 0,
// "Budget_Request5_CY": 0,
// "OriginalBudget_CY": 0,
// "TransferIn_CY": 0,
// "TransferOut_CY": 0,
// "CarryForward_CY": 0,
// "CarryForwardTransfer_CY": 0,
// "Revised_CY": 0,
// "MemoBalance_CY": 0,
// "Actuals_CY": 0,
// "ActualPOCarryForward_CY": 0,
// "Estimate_CY": 0,
// "Statistics_CY": 0,
// "Encumbrance_CY": 0,
// "EncumbPOCarryForward_CY": 0,
// "Requisition_CY": 0,
// "OriginalBudget_LY1": 0,
// "TransferIn_LY1": 0,
// "TransferOut_LY1": 0,
// "CarryForward_LY1": 0,
// "Revised_LY1": 0,
// "MemoBalance_LY1": 0,
// "Actuals_LY1": 0,
// "Close_LY1": 0,
// "Statistics_LY1": 0,
// "Encumbrance_LY1": 0,
// "OriginalBudget_LY2": 0,
// "Revised_LY2": 0,
// "Actuals_LY2": 0,
// "Statistics_LY2": 0,
// "OriginalBudget_LY3": 0,
// "Revised_LY3": 0,
// "Actuals_LY3": 0,
// "Statistics_LY3": 0,
// "Actuals_LY4": 0,
// "Actuals_LY5": 0,
// "Actuals_LY6": 0,
// "Actuals_LY7": 0,
// "Actuals_LY8": 0,
// "Actuals_LY9": 0,
// "Actuals_LY10": 0,
// "InceptionOriginalBudget": 0,
// "InceptionRevisedBudget": 0,
// "MemoBalance_NY": 0,
// "Encumbrance_NY": 0,
// "Requisition_NY": 0,
// "Revised_NY": 0,
// "CarryForwardUnusedBudget": 0,
// "ActualPOCarryForward_LY2": 0,
// "EncumbPOCarryForward_LY2": 0,
// "Budget_Request2_NY2": 0,
// "Budget_Request3_NY2": 0,
// "Budget_Request4_NY2": 0,
// "Budget_Request5_NY2": 0,
// "Statistics2_NY2": 0,
// "Statistics3_NY2": 0,
// "Statistics4_NY2": 0,
// "Statistics5_NY2": 0,
// "Budget_NY6": 0,
// "Statistics_NY6": 0,
// "Budget_NY7": 0,
// "Statistics_NY7": 0,
// "Budget_NY8": 0,
// "Statistics_NY8": 0,
// "Budget_NY9": 0,
// "Statistics_NY9": 0,
// "Budget_NY10": 0,
// "Statistics_NY10": 0,
// "OriginalBudget_NY": 0,
// "Filler": null,
// "Version": {
// "type": "Buffer",
// "data": [
// 0,
// 0,
// 0,
// 0,
// 0,
// 138,
// 245,
// 85
// ]
// },
// "MYOriginalBudget_FY": 0,
// "MYTransferIn_FY": 0,
// "MYTransferOut_FY": 0,
// "MYRevised_FY": 0,
// "MYOriginalBudget_LTD": 0,
// "MYTransferIn_LTD": 0,
// "MYTransferOut_LTD": 0,
// "MYRevised_LTD": 0,
// "RollAvailableBudget": false,
// "TransferIn_NY": 0,
// "TransferOut_NY": 0,
// "GrantId": null,
// "Notes": null,
// "BudgetRollupCode": null,
// "BudgetSubRollupCode": null
// }

router.get('/accounts', function(req, res, next) {
  getTop100("dbo.Accounts",res);
  // var query = "SELECT DISTINCT * FROM dbo.Accounts;"
  // getQuery(query,res);
});

router.get('/addresses', function(req, res, next) {
  getTop100("dbo.Addresses",res, "Id, Line1, Line2 ,Line2,Line4, City, State, ZIP, CountyCode, CountryCode");
});

// Account Sets/Projections
router.get('/gl/versions', function(req, res, next) {
  getTop100("dbo.glbdprom",res);
});

// Actual GL - Example
router.get('/gl/versions/current', function(req, res, next) {
  var query = "SELECT TOP 100 * FROM dbo.glbdprod" +
              " WHERE glbd_prono = 20174" +
              " AND glbd_org LIKE '501%'" +
              " ORDER BY glbd_prono DESC, glbd_org, glbd_object;"
  getQuery(query,res);
});

// {
// "Id": 11252,
// "JournalId": 179,
// "AccountId": 4876,
// "Sequence": 3,
// "Reference1": "0630be",
// "Reference2": "          ",
// "Reference3": "                ",
// "Reference4": "0630beg   ",
// "Source": "GNI",
// "TransactionType": "1",
// "BudgetType": "1",
// "Comment": "2016 BEG BAL                  ",
// "OverBudget": false,
// "AutoManual": "M",
// "DebitCredit": "D",
// "EffectiveDate": "2016-06-01T00:00:00.000Z",
// "Gross": 1795,
// "Entity": "1",
// "PAApplied": false,
// "Debit": 1795,
// "Credit": 0,
// "EntryClerk": "GrahamC             ",
// "Version": {
// "type": "Buffer",
// "data": [
// 0,
// 0,
// 0,
// 0,
// 0,
// 21,
// 74,
// 106
// ]
// },
// "AdditionalDescription": null
// }

router.get('/gl/journal/lineitems', function(req, res, next) {
  getTop100("dbo.JournalLineItems",res);
});

// {
// "Id": 2367,
// "AccountId": 4876,
// "Year": 2016,
// "Period": 0,
// "BudgetTransfer": 0,
// "Budget": 0,
// "Encumbrance": 0,
// "Actual": 0,
// "Expend_PY": 0,
// "Encumb_PY": 0,
// "Filler": "                                                  ",
// "Version": {
// "type": "Buffer",
// "data": [
// 0,
// 0,
// 0,
// 0,
// 0,
// 137,
// 53,
// 236
// ]
// },
// "MYBudgetFY": 0,
// "MYBudgetTransferFY": 0,
// "MYBudgetLTD": 0,
// "MYBudgetTransferLTD": 0
// }

router.get('/gl/journal/master/balance/histories', function(req, res, next) {
  getTop100("dbo.MasterBalHistories",res);
});

// {
// "Id": 68951,
// "AccountId": 4876,
// "Period": 0,
// "BudgetPercent": 0,
// "BudgetPercentNY": 0,
// "BudgetNY": 0,
// "BudgetCY": 0,
// "BudgetTransferCY": 0,
// "EncumbranceCY": 0,
// "ActualCY": 1795,
// "BudgetLY": 0,
// "EncumbranceLY": 0,
// "ActualLY": 0,
// "PriorYearCarryForwardExpense": 0,
// "PriorYearCarryForwardEncumbrance": 0,
// "BudgetTransferLY": 0,
// "BudgetLY2": 0,
// "BudgetTransferLY2": 0,
// "EncumbranceLY2": 0,
// "ActualLY2": 0,
// "BudgetLY3": 0,
// "BudgetTransferLY3": 0,
// "EncumbranceLY3": 0,
// "ActualLY3": 0,
// "Version": {
// "type": "Buffer",
// "data": [
// 0,
// 0,
// 0,
// 0,
// 0,
// 137,
// 53,
// 237
// ]
// },
// "MYBudgetFY": 0,
// "MYBudgetTransferFY": 0,
// "MYBudgetLTD": 0,
// "MYBudgetTransferLTD": 0,
// "BudgetTransferNY": 0
// }

router.get('/gl/journal/master/balance', function(req, res, next) {
  getTop100("dbo.MasterBals",res);
});

// dbo.PurchaseOrders
// dbo.Requisitions
// dbo.RequisitionItems
// dbo.RequisitionItemAllocations
// dbo.RequisitionNotes
// dbo.Vendors
// dbo.uthistry
// dbo.utcharge

module.exports = router;
