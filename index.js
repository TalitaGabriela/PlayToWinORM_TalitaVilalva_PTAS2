// Importaçõoes dos módulos
require("dotenv").config();
const conn = require("./db/conn");
const express = require("express");
const exphbs = require("express-handlebars");

// Instanciação do servidor
const app = express();

// Vinculação do Handlebars ao Express
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Configurações no express para facilitar a captura de dados recebidos de formulários
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json());

const Usuario = require("./models/Usuario");

app.get("/", (req,res) => {
  res.render("home");
});

app.get("/usuarios/novo", (req, res) => {
  res.render("formUsuario");
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.findAll({
    raw:true });

  res.render("usuarios",{usuarios});
});

app.post("/usuarios/novo", async (req, res) => {
  const nickname = req.body.nickname;
  const nome = req.body.nome;

  
  const dadosUsuario = {
    nickname,
    nome,
  };

  const usuario = await Usuario.create(dadosUsuario);
  res.send("Usuário inserido: " + usuario.id)
});

app.listen(3000);

conn
  .sync()
  .then(() => {
    console.log("Conectado com sucesso :)");
  })
  .catch((err) => {
    console.log("Erro ao conectar: " + err);
  });