var sql = require('mssql');
var config = {
    server: 'DHYANI',
    database: 'TodoDb',
    user: 'sa',
    password: 'jaylem1983',
    port: 1433
};

exports.executeSql = function (sqlQuery, callback) {
    var dbConn = new sql.Connection(config);
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
        request.query(sqlQuery).then(
            function (err, recordSet) {
                if (err) {
                    callback(err, null);
                }
                else {
                    callback(null, recordSet);
                }
                dbConn.close();
            }
        ).catch(function (err) {
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });
};

exports.executeSp = function (sqlSp, param, callback) {
    var dbConn = new sql.Connection(config);
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
       
        for(var key in param){
            if (param.hasOwnProperty(key)) {
             request.input(key,sql.VarChar(1000), param[key]);
            }
        }
        request.execute(sqlSp).then(function (err, recordSet) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, recordSet);
            }
            dbConn.close();

        }).catch(function (err) {
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });
};