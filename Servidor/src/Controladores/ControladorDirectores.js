var DB = require("../lib/conexionbd");
var QueryHandler = require("../Lib/QueryHandler");
function getDirectores(req, res) {
  var sql = QueryHandler.defaultHandler(req);
  executeHandler(sql, res);
}

function executeHandler(sql, res) {
  DB.query(sql, function(error, result, fields) {
    if (error) {
      errorFormat(error);
    } else {
      res.send(JSON.stringify(result));
    }
  });
}
function errorFormat(error) {
  console.log("Error SQL");
  console.log(error.code);
  console.log(error.sqlMessage);
  console.log(error.sqlState);
}

module.exports = {
  getDirectores: getDirectores
};
