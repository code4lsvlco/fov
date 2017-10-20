// Implements Precise MRM api.
// TODO: API calls left to implement.
// CompanyInformation
// DeviceList
// FleetList
// GetAssetAccumulatedTotalsByCompany
// GetAssetDetails
// GetAssetSwitchAccumulatedTotalsByCompany
// GetCompanyArcgisData
// GetCompanyArcgisDataLastReport
// GetCompanyArcgisDataWithRowCount
// UserList

var http = require('http');
var crypto = require('crypto');

var hashPassword = function(password){
  var md5password = crypto.createHash('md5').update(password).digest('hex').toString();
  return md5password;
};

var initHttpRequest = function(username,md5password,soapBodyInnerXML,soapAction,callback){

  var body = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ser="http://servicesjson.preciseinfox.com">' +
             '<soap:Header>' +
                   '<ser:AuthSoapHeader>' +
                      '<ser:UserName>' + username + '</ser:UserName>' +
                      '<ser:Password>' + md5password + '</ser:Password>' +
                      '<ser:Error></ser:Error>' +
                   '</ser:AuthSoapHeader>' +
                '</soap:Header>' +
                '<soap:Body>' +
                   soapBodyInnerXML +
                '</soap:Body>' +
             '</soap:Envelope>'

  // http://servicesjson.preciseinfox.com/DataRetrieval.asmx?WSDL
  var postRequest = {
    host: "servicesjson.preciseinfox.com",
    path: "/DataRetrieval.asmx?WSDL",
    port: 80,
    method: "POST",
    headers: {
      'Cookie': "cookie",
      'Content-Type': 'text/xml',
      'Content-Length': Buffer.byteLength(body),
      // 'SOAPAction': 'http://servicesjson.preciseinfox.com/AssetList'
      'SOAPAction': 'http://servicesjson.preciseinfox.com/' + soapAction
    },
    // timeout: [milliseconds]
  };

  var buffer = "";

  var req = http.request(postRequest, function(res) {
    console.log(postRequest);
    console.log("Response Status Code: " + res.statusCode);
    var buffer = "";
    res.on( "data", function(data) {
      buffer = buffer + data;
    } );
    res.on("end", function(){
      // console.log(buffer);
      console.log("preciseSOAPXML End HTTP Request")
      callback(buffer);
    });
  });

  req.on('error', function(e) {
    console.log(postRequest);
    console.log("preciseSOAPXML HTTP Request Error")
    console.log("Response Error Message: " + e.message);
  });

  req.write(body);
  req.end();
};

var preciseSOAPXML = function () {};

// AssetList //
preciseSOAPXML.prototype.AssetList = function (username,password,callback) {
  var soapBodyInnerXML = '<ser:AssetList/>';

  initHttpRequest(username,hashPassword(password),soapBodyInnerXML,'AssetList',function(result){
    try {
      var innerXML = result.match(/<AssetListResult>(.*?)<\/AssetListResult>/g).map(function(val){
         return val.replace(/<\/?AssetListResult>/g,'');
      });
    }
    catch(error) {
      console.log(error);
      console.log(result);
      var innerXML = "[]";
    };
    // console.log(innerXML);
    var result = JSON.parse(innerXML);
    // console.log(result.Tables[0].Rows);
    var vehicles = result.Tables[0].Rows;
    var switches = result.Tables[1].Rows;
    // var switchesToString = util.inspect(switches, false, null);
    var vehiclesWithSwitches = [];
    vehicles.forEach(function(vehicle){
      vehicle.Switches = [] ;
      switches.forEach(function(s){
        if (vehicle.AssetID == s.AssetID) vehicle.Switches.push(s);
      });
      vehiclesWithSwitches.push(vehicle);
    });

    callback(vehiclesWithSwitches);
  })
};

// GetAssetData //
preciseSOAPXML.prototype.GetAssetData = function (deviceIdentifier,startUtc,endUtc,username,password,callback) {
  // console.log(startUtc);
  var soapBodyInnerXML = '<ser:GetAssetData>' +
                           '<ser:deviceIdentifier>' + deviceIdentifier + '</ser:deviceIdentifier>' +
                           '<ser:startUtc>' + startUtc + '</ser:startUtc>' +
                           '<ser:endUtc>' + endUtc + '</ser:endUtc>' +
                         '</ser:GetAssetData>'

  initHttpRequest(username,hashPassword(password),soapBodyInnerXML,'GetAssetData',function(result){
    try {
      var innerXML = result.match(/<GetAssetDataResult>(.*?)<\/GetAssetDataResult>/g).map(function(val){
        return val.replace(/<\/?GetAssetDataResult>/g,'');
      });
    }
    catch(error) {
      console.log(error);
      // console.log(result);
      var innerXML = "[]";
    };
    var tripdata = JSON.parse(innerXML);
    if (tripdata.Tables) {
      tripdata = tripdata.Tables[0].Rows;
    };
    callback(tripdata);
  })
};

// GetAssetDataWithRowCount //
preciseSOAPXML.prototype.GetAssetDataWithRowCount = function (deviceIdentifier,startUtc,endUtc,rowCount,username,password,callback) {
  // console.log(startUtc);
  var soapBodyInnerXML = '<ser:GetAssetDataWithRowCount>' +
                           '<ser:deviceIdentifier>' + deviceIdentifier + '</ser:deviceIdentifier>' +
                           '<ser:startUtc>' + startUtc + '</ser:startUtc>' +
                           '<ser:endUtc>' + endUtc + '</ser:endUtc>' +
                           '<ser:rowCount>' + rowCount + '</ser:rowCount>' +
                         '</ser:GetAssetDataWithRowCount>'

  initHttpRequest(username,hashPassword(password),soapBodyInnerXML,'GetAssetDataWithRowCount',function(result){
    // console.log(result);
    try {
      var innerXML = result.match(/<GetAssetDataWithRowCountResult>(.*?)<\/GetAssetDataWithRowCountResult>/g).map(function(val){
        return val.replace(/<\/?GetAssetDataWithRowCountResult>/g,'');
      });
    }
    catch(error) {
      console.log(error);
      console.log(result);
      var innerXML = "[]";
    };
    var tripdata = JSON.parse(innerXML);
    if (tripdata.Tables) {
      tripdata = tripdata.Tables[0].Rows;
    };
    callback(tripdata);
  })
};

// GetCompanyDataByDatabaseCreatedTime //
preciseSOAPXML.prototype.GetCompanyDataByDatabaseCreatedTime = function (startUtc,endUtc,username,password,callback) {
  // console.log(startUtc);
  var soapBodyInnerXML = '<ser:GetCompanyDataByDatabaseCreatedTime>' +
                          //  '<ser:deviceIdentifier>' + deviceIdentifier + '</ser:deviceIdentifier>' +
                           '<ser:startUtc>' + startUtc + '</ser:startUtc>' +
                           '<ser:endUtc>' + endUtc + '</ser:endUtc>' +
                          //  '<ser:rowCount>' + rowCount + '</ser:rowCount>' +
                         '</ser:GetCompanyDataByDatabaseCreatedTime>'
  console.log(soapBodyInnerXML);
  initHttpRequest(username,hashPassword(password),soapBodyInnerXML,'GetCompanyDataByDatabaseCreatedTime',function(result){
    // console.log(result);
    try {
      var innerXML = result.match(/<GetCompanyDataByDatabaseCreatedTimeResult>(.*?)<\/GetCompanyDataByDatabaseCreatedTimeResult>/g).map(function(val){
        return val.replace(/<\/?GetCompanyDataByDatabaseCreatedTimeResult>/g,'');
      });
    }
    catch(error) {
      console.log(error);
      console.log(result);
      var innerXML = "[]";
    };
    var companydata = JSON.parse(innerXML);
    if (companydata.Tables) {
      companydata = companydata.Tables[0].Rows;
    };
    callback(companydata);
  })
};

// GetCompanyDataByDatabaseCreatedTimeWithRowCount //
preciseSOAPXML.prototype.GetCompanyDataByDatabaseCreatedTimeWithRowCount = function (startUtc,endUtc,rowCount,username,password,callback) {
  // console.log(startUtc);
  var soapBodyInnerXML = '<ser:GetCompanyDataByDatabaseCreatedTimeWithRowCount>' +
                          //  '<ser:deviceIdentifier>' + deviceIdentifier + '</ser:deviceIdentifier>' +
                           '<ser:startUtc>' + startUtc + '</ser:startUtc>' +
                           '<ser:endUtc>' + endUtc + '</ser:endUtc>' +
                           '<ser:rowCount>' + rowCount + '</ser:rowCount>' +
                         '</ser:GetCompanyDataByDatabaseCreatedTimeWithRowCount>'
  console.log(soapBodyInnerXML);
  initHttpRequest(username,hashPassword(password),soapBodyInnerXML,'GetCompanyDataByDatabaseCreatedTimeWithRowCount',function(result){
    // console.log(result);
    try {
      var innerXML = result.match(/<GetCompanyDataByDatabaseCreatedTimeWithRowCountResult>(.*?)<\/GetCompanyDataByDatabaseCreatedTimeWithRowCountResult>/g).map(function(val){
        return val.replace(/<\/?GetCompanyDataByDatabaseCreatedTimeWithRowCountResult>/g,'');
      });
    }
    catch(error) {
      console.log(error);
      console.log(result);
      var innerXML = "[]";
    };
    var companydata = JSON.parse(innerXML);
    if (companydata.Tables) {
      companydata = companydata.Tables[0].Rows;
    };
    callback(companydata);
  })
};

// GetCompanyData //
preciseSOAPXML.prototype.GetCompanyData = function (startUtc,endUtc,username,password,callback) {
  // console.log(startUtc);
  var soapBodyInnerXML = '<ser:GetCompanyData>' +
                          //  '<ser:deviceIdentifier>' + deviceIdentifier + '</ser:deviceIdentifier>' +
                           '<ser:startUtc>' + startUtc + '</ser:startUtc>' +
                           '<ser:endUtc>' + endUtc + '</ser:endUtc>' +
                          //  '<ser:rowCount>' + rowCount + '</ser:rowCount>' +
                         '</ser:GetCompanyData>'
  console.log(soapBodyInnerXML);
  initHttpRequest(username,hashPassword(password),soapBodyInnerXML,'GetCompanyData',function(result){
    // console.log(result);
    try {
      var innerXML = result.match(/<GetCompanyDataResult>(.*?)<\/GetCompanyDataResult>/g).map(function(val){
        return val.replace(/<\/?GetCompanyDataResult>/g,'');
      });
    }
    catch(error) {
      console.log(error);
      console.log(result);
      var innerXML = "[]";
    };
    var company_data = JSON.parse(innerXML);
    if (company_data.Tables) {
      company_data = company_data.Tables[0].Rows;
    };
    callback(company_data);
  })
};

// GetCompanyDataWithRowCount //
preciseSOAPXML.prototype.GetCompanyDataWithRowCount = function (startUtc,endUtc,rowCount,username,password,callback) {
  // console.log(startUtc);
  var soapBodyInnerXML = '<ser:GetCompanyDataWithRowCount>' +
                          //  '<ser:deviceIdentifier>' + deviceIdentifier + '</ser:deviceIdentifier>' +
                           '<ser:startUtc>' + startUtc + '</ser:startUtc>' +
                           '<ser:endUtc>' + endUtc + '</ser:endUtc>' +
                           '<ser:rowCount>' + rowCount + '</ser:rowCount>' +
                         '</ser:GetCompanyDataWithRowCount>'
  console.log(soapBodyInnerXML);
  initHttpRequest(username,hashPassword(password),soapBodyInnerXML,'GetCompanyDataWithRowCount',function(result){
    // console.log(result);
    try {
      var innerXML = result.match(/<GetCompanyDataWithRowCountResult>(.*?)<\/GetCompanyDataWithRowCountResult>/g).map(function(val){
        return val.replace(/<\/?GetCompanyDataWithRowCountResult>/g,'');
      });
    }
    catch(error) {
      console.log(error);
      console.log(result);
      var innerXML = "[]";
    };
    var company_data = JSON.parse(innerXML);
    if (company_data.Tables) {
      company_data = company_data.Tables[0].Rows;
    };
    callback(company_data);
  })
};

// GetAssetData //
preciseSOAPXML.prototype.GetPreCiseQueryInfo = function (deviceIdentifier,startUtc,endUtc,username,password,callback) {
  var soapBodyInnerXML = '<ser:GetPreCiseQueryInfo>' +
                           '<ser:deviceIdentifier>' + deviceIdentifier + '</ser:deviceIdentifier>' +
                           '<ser:startUtc>' + startUtc + '</ser:startUtc>' +
                           '<ser:endUtc>' + endUtc + '</ser:endUtc>' +
                         '</ser:GetPreCiseQueryInfo>'

  initHttpRequest(username,hashPassword(password),soapBodyInnerXML,'GetPreCiseQueryInfo',function(result){
    try {
      var innerXML = result.match(/<GetPreCiseQueryInfoResult>(.*?)<\/GetPreCiseQueryInfoResult>/g).map(function(val){
        return val.replace(/<\/?GetPreCiseQueryInfoResult>/g,'');
      });
    }
    catch(error) {
      console.log(error);
      console.log(result);
      var innerXML = "[]";
    };
    var query_info = JSON.parse(innerXML);
    // if (tripdata.Tables) {
    //   tripdata = tripdata.Tables[0].Rows;
    // };
    callback(query_info);
  })
};

module.exports = new preciseSOAPXML();

// var soapBody = '<ser:GetCompanyArcgisData>' +
//                  '<ser:startUtc>' + startUtc + '</ser:startUtc>' +
//                  '<ser:endUtc>' + endUtc + '</ser:endUtc>' +
//                '</ser:GetCompanyArcgisData>';
