var selectPrincipio = "Select * from competencia ";
var selectPeliId= "Select * from pelicula where id =  "
var selectCompAll =
  "Select comp.id, comp.nombre, gen.nombre as genero_nombre,act.nombre as actor_nombre,dir.nombre as director_nombre ";
var fromCompAll = "from competencia comp, genero gen, actor act, director dir";
var joinCompAll =
  " and gen.id = comp.genero_id and act.id = comp.actor_id and dir.id = comp.director_id";
var selectCompVar = "Select comp.id, comp.nombre";
var fromCompVar = "from competencia comp";
var espacio = ' " "';
var actorNombre = " as actor_nombre, ";
var directorNombre = " as director_nombre ";
var generoNombre = " as genero_nombre, ";
var SelectCompPeli = "Select peli.id,peli.poster,peli.titulo";
var fromCompPeli = " from pelicula peli, competencia comp";
var fromVoto = " from pelicula peli, voto vot";
var GrouplimitorderVoto = " group by peli.titulo ORDER BY votos Desc LIMIT 3";
var limitOrderCompPeli = "ORDER BY RAND() LIMIT 2";
var insertVoto = "Insert into voto (competencia_id,pelicula_id) VALUES("

//La generica maneja tipo de orden,cantidad y numero de pagina que siempre vienen informados.
function defaultHandler(req) {
  var sql = selectPrincipio;
  return sql;
}
function CompetenciasIdHandler(req) {
  var sql = selectPrincipio + " where id = " + req.params.id;
  return sql;
}

function ComeptenciasPorCamposHandler(result) {
  var sql;
  switch (true) {
    case result[0].genero_id != undefined &&
      result[0].actor_id != undefined &&
      result[0].director_id != undefined:
      sql =
        selectCompAll +
        fromCompAll +
        " where comp.id = " +
        result[0].id +
        joinCompAll;
      break;
    case result[0].genero_id != undefined &&
      result[0].actor_id == undefined &&
      result[0].director_id == undefined:
      sql =
        selectCompVar +
        ", gen.nombre" +
        generoNombre +
        espacio +
        actorNombre +
        espacio +
        directorNombre +
        fromCompVar +
        " ,genero gen " +
        " where comp.id = " +
        result[0].id +
        " and gen.id = comp.genero_id";
      break;
    case result[0].genero_id == undefined &&
      result[0].actor_id != undefined &&
      result[0].director_id == undefined:
      sql =
        selectCompVar +
        ", " +
        espacio +
        generoNombre +
        " act.nombre" +
        actorNombre +
        espacio +
        directorNombre +
        fromCompVar +
        " ,actor act " +
        " where comp.id = " +
        result[0].id +
        " and act.id = comp.actor_id";
      break;
    case result[0].genero_id == undefined &&
      result[0].actor_id == undefined &&
      result[0].director_id != undefined:
      sql =
        selectCompVar +
        ", " +
        espacio +
        generoNombre +
        espacio +
        actorNombre +
        " dir.nombre " +
        directorNombre +
        fromCompVar +
        " ,director dir " +
        " where comp.id = " +
        result[0].id +
        " and dir.id = comp.director_id";
      break;
  }
  return sql;
}

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
  }
  return sql;
}
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
  var sql = SelectCompPeli + 
  " ,count(*) as votos" + 
  fromVoto + 
  " where vot.competencia_id = " +
  result[0].id + 
  " and peli.id = vot.pelicula_id " +
  GrouplimitorderVoto;
  console.log(sql);
  return sql;
}
module.exports = {
  defaultHandler: defaultHandler,
  CompetenciasIdHandler: CompetenciasIdHandler,
  ComeptenciasPorCamposHandler: ComeptenciasPorCamposHandler,
  PeliculasPorCamposHandler: PeliculasPorCamposHandler,
  InsertVotoHandler:InsertVotoHandler,
  PeliById:PeliById,
  ResultadoCompetenciaHandler:ResultadoCompetenciaHandler
};