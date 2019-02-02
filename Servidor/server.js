var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var peliculas = require("./Controladores/controladorPeliculas");
var generos = require("./Controladores/controladorGeneros");
var Competencias = require("./Controladores/controladorCompetencias");
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
//Manejo request de Competencias
//GET
app.get("/competencias", Competencias.getCompetencias);
app.get("/competencias/:id/peliculas", Competencias.getPeliculasCompetencia);
app.get("/competencias/:id/resultados", Competencias.getResultadosCompetencia);
app.get("/competencias/:id", Competencias.getCompetenciasById);
//Post
app.post("/competencias/:id/voto",Competencias.PostVotar);
//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = "8080";

app.listen(puerto, function() {
  console.log("Escuchando en el puerto " + puerto);
});
