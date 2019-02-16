var DB = require("../lib/conexionbd");
var QueryHandler = require("../Lib/QueryHandler");
// Funcion para devolver todas las peliculas, manejando los distintos filtros.
function getPeliculas(req, res) {
  var sql = [];
  executeHandler(sql, res);
}

function executeHandler(sql, res) {
  DB.query(sql[0], function(error, result, fields) {
    if (error) {
      errorFormat(error);
    } else {
      DB.query(sql[1], function(errorCant, resultCant, fieldsCant) {
        if (errorCant) {
          errorFormat(errorCant);
        }
        var response = { peliculas: result, total: resultCant[0].total };
        res.send(JSON.stringify(response));
      });
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
  getPeliculas: getPeliculas
};
