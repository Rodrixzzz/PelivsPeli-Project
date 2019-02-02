var DB = require("../lib/conexionbd");
var QueryHandler = require("../Lib/QueryHandler");

function getCompetencias(req, res) {
  var sql = QueryHandler.defaultHandler(req);
  executeHandler(sql, res);
}

function getCompetenciasById(req, res) {
  var sql = QueryHandler.CompetenciasIdHandler(req);
  executeHandlerCompetencias(sql, res);
}

function getPeliculasCompetencia(req, res) {
  var sql = QueryHandler.CompetenciasIdHandler(req);
  executeHandlerPeliculas(sql, res);
}
function PostVotar(req, res) {
  var sql = QueryHandler.InsertVotoHandler(req);
  executeVotoHandler(sql, res);
}
function getResultadosCompetencia(req, res) {
  var sql = QueryHandler.CompetenciasIdHandler(req);
  executeVotoHandler(sql, res);
}

function executeHandler(sql, res) {
  DB.query(sql, function(error, result, fields) {
    if (error) {
      errorFormat(error);
    }
    res.send(JSON.stringify(result));
  });
}

function executeHandlerCompetencias(sql, res) {
  DB.query(sql, function(error, result, fields) {
    if (error) {
      errorFormat(error);
    } else {
      if (result.length > 0) {
        sql = QueryHandler.ComeptenciasPorCamposHandler(result);
        DB.query(sql, function(errorCamp, resultCamp, fieldsCamp) {
          if (errorCamp) {
            errorFormat(errorCamp);
          }
          res.send(JSON.stringify(resultCamp));
        });
      } else {
        // res.sendStatus(404);
        res.send("404");
      }
    }
  });
}
function executeHandlerPeliculas(sql, res) {
  DB.query(sql, function(error, result, fields) {
    if (error) {
      errorFormat(error);
    } else {
      if (result.length > 0) {
        sql = QueryHandler.PeliculasPorCamposHandler(result);
        DB.query(sql, function(errorPeli, resultPeli, fieldsPeli) {
          if (errorPeli) {
            errorFormat(errorPeli);
          }
          var Response = {
            competencia: result[0].nombre,
            peliculas: resultPeli
          };
          res.send(JSON.stringify(Response));
        });
      } else {
        // res.sendStatus(404);
        res.send("404");
      }
    }
  });
}

function executeVotoHandler(sql, res) {
  DB.query(sql, function(error, result, fields) {
    if (error) {
      errorFormat(error);
    } else {
      if (result.length > 0) {
        sql = QueryHandler.ResultadoCompetenciaHandler(result);
        DB.query(sql, function(errorComp, resultComp, fieldsComp) {
          if (errorComp) {
            errorFormat(errorComp);
          }
          var Response = {
            competencia: result[0].nombre,
            resultados: resultComp
          };
          res.send(JSON.stringify(Response));
        });
      } else {
        // res.sendStatus(404);
        res.send("404");
      }
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
  getCompetencias: getCompetencias,
  getCompetenciasById: getCompetenciasById,
  getPeliculasCompetencia: getPeliculasCompetencia,
  PostVotar: PostVotar,
  getResultadosCompetencia: getResultadosCompetencia
};
