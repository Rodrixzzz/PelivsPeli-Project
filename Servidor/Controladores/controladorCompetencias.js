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
  executeResultadosHandler(sql, res);
}
function PostCompetencia(req, res) {
  var sql = QueryHandler.InsertCompetenciasHandler(req);
  executeInsertCompetenciaHandler(sql, res);
}
function DeleteVotar(req, res) {
  var sql = QueryHandler.DeleteVotoHandler(req);
  executeDeleteCompetenciaVotoHandler(sql, res);
}
function DeleteCompetencia(req, res) {
  var sql = QueryHandler.DeleteCompetenciaHandler(req);
  executeDeleteCompetenciaHandler(sql, res);
}
function EditCompetencia(req,res) {
  var sql = QueryHandler.EditCompetenciasHandler(req);
  executeEditCompetenciaHandler(sql,res);
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
          res.send(JSON.stringify(resultCamp[0]));
        });
      } else {
        res.status(404).send("No existe la competencia");
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
        res.status(404).send("No existe la competencia");
      }
    }
  });
}

function executeVotoHandler(sql, res) {
  DB.query(sql[0], function(error, result, fields) {
    if (error) {
      errorFormat(error);
    } else {
      if (result.length > 0) {
        DB.query(sql[1], function(errorPeli, resultPeli, fieldsPeli) {
          if (errorPeli) {
            errorFormat(errorPeli);
          } else {
            if (resultPeli.length > 0) {
              DB.query(sql[2], function(errorVoto, resultVoto, fieldsVoto) {
                if (errorVoto) {
                  errorFormat(errorVoto);
                } else {
                  res.status(201).send("OK");
                }
              });
            } else {
              res.status(404).send("No existe la pelicula");
            }
          }
        });
      } else {
        res.status(404).send("No existe la competencia");
      }
    }
  });
}

function executeResultadosHandler(sql, res) {
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
        res.status(404).send("No existe la competencia");
      }
    }
  });
}

function executeInsertCompetenciaHandler(sql, res) {
  DB.query(sql[0], function(error, result, fields) {
    if (error) {
      errorFormat(error);
    } else {
      if (result.length == 0) {
        DB.query(sql[1], function(errorComp, resultComp, fieldsComp) {
          if (errorComp) {
            errorFormat(errorComp);
          } else {
            res.status(201).send("OK");
          }
        });
      } else {
        res.status(422).send("Ya existe una competencia con ese nombre");
      }
    }
  });
}

function executeDeleteCompetenciaVotoHandler(sql, res) {
  DB.query(sql[0], function(error, result, fields) {
    if (error) {
      errorFormat(error);
    } else {
      if (result.length > 0) {
        DB.query(sql[1], function(errorVoto, resultVoto, fieldsVoto) {
          if (errorVoto) {
            errorFormat(errorVoto);
          } else {
            res.status(200).send("OK");
          }
        });
      } else {
        res.status(404).send("No existe la competencia");
      }
    }
  });
}
function executeDeleteCompetenciaHandler(sql, res) {
  DB.query(sql[0], function(error, result, fields) {
    if (error) {
      errorFormat(error);
    } else {
      if (result.length > 0) {
        DB.query(sql[1], function(errorVoto, resultVoto, fieldsVoto) {
          if (errorVoto) {
            errorFormat(errorVoto);
          } else {
            DB.query(sql[2], function(errorComp, resultComp, fieldsComp) {
              if (errorComp) {
                errorFormat(errorComp);
              } else {
                res.status(200).send("OK");
              }
            });
          }
        });
      } else {
        res.status(404).send("No existe la competencia");
      }
    }
  });
}
function executeEditCompetenciaHandler(sql, res) {
  DB.query(sql[0], function(error, result, fields) {
    if (error) {
      errorFormat(error);
    } else {
      if (result.length > 0) {
        DB.query(sql[1], function(errorComp, errorComp, errorComp) {
          if (errorComp) {
            errorFormat(errorComp);
          } else {
            res.status(200).send("OK");
          }
        });
      } else {
        res.status(404).send("No existe la competencia");
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
  getResultadosCompetencia: getResultadosCompetencia,
  PostCompetencia: PostCompetencia,
  DeleteVotar: DeleteVotar,
  DeleteCompetencia: DeleteCompetencia,
  EditCompetencia:EditCompetencia
};
