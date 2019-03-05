var selectPrincipioComp = "Select * from competencia ";
var selectPrincipio = "Select * from ";
var selectPeliId = "Select * from pelicula where id =  ";
var selectCompJoin =
  "Select comp.id, comp.nombre, gen.nombre as genero_nombre,act.nombre as actor_nombre,dir.nombre as director_nombre from competencia comp Left JOIN genero gen ON gen.id = comp.genero_id Left JOIN actor act ON act.id = comp.actor_id Left JOIN director dir ON dir.id = comp.director_id where comp.id = ";
var SelectCompPeli = "Select peli.id,peli.poster,peli.titulo";
var fromCompPeli = " from pelicula peli, competencia comp";
var fromVoto = " from pelicula peli, voto vot";
var GrouplimitorderVoto = " group by peli.titulo ORDER BY votos Desc LIMIT 3";
var limitOrderCompPeli = "ORDER BY RAND() LIMIT 2";
var insertVoto = "Insert into voto (competencia_id,pelicula_id) VALUES(";
var InsertCompetencia =
  "Insert into competencia (nombre, genero_id, actor_id, director_id) VALUES(";
var DeleteVoto = "Delete from voto where competencia_id = ";
var DeleteCompetencia = "Delete from competencia where id = ";
var EditCompentencia = "Update competencia set nombre =";

function defaultHandler(req) {
  var sql;
  var path = req.url;
  if (path == "/competencias" || path == "/generos") {
    path = path.slice(1, path.length - 1);
  } else {
    path = path.slice(1, path.length - 2);
  }
  sql = selectPrincipio + path;
  return sql;
}
function CompetenciasIdHandler(req) {
  var sql = selectPrincipioComp + " where id = " + req.params.id;
  return sql;
}
function competenciasPorNombre(req) {
  var sql = selectPrincipioComp + "where nombre=" + '"' + req.body.nombre + '"';
  return sql;
}
//#region ComeptenciasPorCampos
function ComeptenciasPorCamposHandler(result) {
  var sql = selectCompJoin + result[0].id;
  return sql;
}
//#endregion
//#region PeliculasPorCampos
function PeliculasPorCamposHandler(result) {
  var sql;
  switch (true) {
    case result[0].genero_id != undefined &&
      result[0].actor_id != undefined &&
      result[0].director_id != undefined:
      sql =
        SelectCompPeli +
        fromCompPeli +
        " where comp.id = " +
        result[0].id +
        " and peli.genero_id = comp.genero_id" +
        " and peli.id IN (Select pelicula_id from actor_pelicula where actor_id = " +
        result[0].actor_id +
        " ) " +
        " and peli.id IN (select pelicula_id from director_pelicula where director_id = " +
        result[0].director_id +
        " ) " +
        limitOrderCompPeli;
      break;
    case result[0].genero_id != undefined &&
      result[0].actor_id == undefined &&
      result[0].director_id == undefined:
      sql =
        SelectCompPeli +
        fromCompPeli +
        " where comp.id = " +
        result[0].id +
        " and peli.genero_id = comp.genero_id " +
        limitOrderCompPeli;
      break;
    case result[0].genero_id == undefined &&
      result[0].actor_id != undefined &&
      result[0].director_id == undefined:
      sql =
        SelectCompPeli +
        fromCompPeli +
        " where comp.id = " +
        result[0].id +
        " and peli.id IN (Select pelicula_id from actor_pelicula where actor_id = " +
        result[0].actor_id +
        " ) " +
        limitOrderCompPeli;
      break;
    case result[0].genero_id == undefined &&
      result[0].actor_id == undefined &&
      result[0].director_id != undefined:
      sql =
        SelectCompPeli +
        fromCompPeli +
        " where comp.id = " +
        result[0].id +
        " and peli.id IN (select pelicula_id from director_pelicula where director_id = " +
        result[0].director_id +
        " ) " +
        limitOrderCompPeli;
      break;
    case result[0].genero_id != undefined &&
      result[0].actor_id != undefined &&
      result[0].director_id == undefined:
      sql =
        SelectCompPeli +
        fromCompPeli +
        " where comp.id = " +
        result[0].id +
        " and peli.genero_id = comp.genero_id" +
        " and peli.id IN (Select pelicula_id from actor_pelicula where actor_id = " +
        result[0].actor_id +
        " ) " +
        limitOrderCompPeli;
      break;
    case result[0].genero_id != undefined &&
      result[0].actor_id == undefined &&
      result[0].director_id != undefined:
      sql =
        SelectCompPeli +
        fromCompPeli +
        " where comp.id = " +
        result[0].id +
        " and peli.genero_id = comp.genero_id" +
        " and peli.id IN (select pelicula_id from director_pelicula where director_id = " +
        result[0].director_id +
        " ) " +
        limitOrderCompPeli;
      break;
    case result[0].genero_id == undefined &&
      result[0].actor_id != undefined &&
      result[0].director_id != undefined:
      sql =
        SelectCompPeli +
        fromCompPeli +
        " where comp.id = " +
        result[0].id +
        " and peli.id IN (Select pelicula_id from actor_pelicula where actor_id = " +
        result[0].actor_id +
        " ) " +
        " and peli.id IN (select pelicula_id from director_pelicula where director_id = " +
        result[0].director_id +
        " ) " +
        limitOrderCompPeli;
      break;
  }
  return sql;
}
//#endregion
function PeliById(req) {
  var sql = selectPeliId + req.body.idPelicula;
  return sql;
}
function InsertVotoHandler(req) {
  var sql = [];
  sql[0] = CompetenciasIdHandler(req);
  sql[1] = PeliById(req);
  sql[2] = insertVoto + req.params.id + " , " + req.body.idPelicula + " )";
  return sql;
}
function ResultadoCompetenciaHandler(result) {
  var sql =
    SelectCompPeli +
    " ,count(*) as votos" +
    fromVoto +
    " where vot.competencia_id = " +
    result[0].id +
    " and peli.id = vot.pelicula_id " +
    GrouplimitorderVoto;
  return sql;
}
//#region InsertCompetencias
function InsertCompetenciasHandler(req) {
  var sql = [];
  sql[0] = competenciasPorNombre(req);
  switch (true) {
    case req.body.genero != 0 && req.body.director != 0 && req.body.actor != 0:
      sql[1] =
        InsertCompetencia +
        '"' +
        req.body.nombre +
        '"' +
        "," +
        req.body.genero +
        "," +
        req.body.actor +
        "," +
        req.body.director +
        ")";
      break;
    case req.body.genero != 0 && req.body.director == 0 && req.body.actor == 0:
      sql[1] =
        InsertCompetencia +
        '"' +
        req.body.nombre +
        '"' +
        "," +
        req.body.genero +
        "," +
        null +
        "," +
        null +
        ")";
      break;
    case req.body.genero == 0 && req.body.director != 0 && req.body.actor == 0:
      sql[1] =
        InsertCompetencia +
        '"' +
        req.body.nombre +
        '"' +
        "," +
        null +
        "," +
        null +
        "," +
        req.body.director +
        ")";
      break;
    case req.body.genero == 0 && req.body.director == 0 && req.body.actor != 0:
      sql[1] =
        InsertCompetencia +
        '"' +
        req.body.nombre +
        '"' +
        "," +
        null +
        "," +
        req.body.actor +
        "," +
        null +
        ")";
      break;
    case req.body.genero != 0 && req.body.director == 0 && req.body.actor != 0:
      sql[1] =
        InsertCompetencia +
        '"' +
        req.body.nombre +
        '"' +
        "," +
        req.body.genero +
        "," +
        req.body.actor +
        "," +
        null +
        ")";
      break;
    case req.body.genero != 0 && req.body.director != 0 && req.body.actor == 0:
      sql[1] =
        InsertCompetencia +
        '"' +
        req.body.nombre +
        '"' +
        "," +
        req.body.genero +
        "," +
        null +
        "," +
        req.body.director +
        ")";
      break;
    case req.body.genero == 0 && req.body.director != 0 && req.body.actor != 0:
      sql[1] =
        InsertCompetencia +
        '"' +
        req.body.nombre +
        '"' +
        "," +
        null +
        "," +
        req.body.actor +
        "," +
        req.body.director +
        ")";
      break;
  }
  return sql;
}
//#endregion
function DeleteVotoHandler(req) {
  var sql = [];
  sql[0] = CompetenciasIdHandler(req);
  sql[1] = DeleteVoto + req.params.id;
  return sql;
}

function DeleteCompetenciaHandler(req) {
  var sql = [];
  sql[0] = CompetenciasIdHandler(req);
  sql[1] = DeleteVoto + req.params.id;
  sql[2] = DeleteCompetencia + req.params.id;
  return sql;
}
function EditCompetenciasHandler(req) {
  var sql = [];
  sql[0] = CompetenciasIdHandler(req);
  sql[1] =
    EditCompentencia +
    '"' +
    req.body.nombre +
    '"' +
    " where id = " +
    req.params.id;
  return sql;
}
module.exports = {
  defaultHandler: defaultHandler,
  CompetenciasIdHandler: CompetenciasIdHandler,
  ComeptenciasPorCamposHandler: ComeptenciasPorCamposHandler,
  PeliculasPorCamposHandler: PeliculasPorCamposHandler,
  InsertVotoHandler: InsertVotoHandler,
  PeliById: PeliById,
  ResultadoCompetenciaHandler: ResultadoCompetenciaHandler,
  DeleteVotoHandler: DeleteVotoHandler,
  DeleteCompetenciaHandler: DeleteCompetenciaHandler,
  InsertCompetenciasHandler: InsertCompetenciasHandler,
  EditCompetenciasHandler: EditCompetenciasHandler
};
