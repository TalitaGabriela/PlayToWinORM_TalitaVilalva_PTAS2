// Importaçõoes dos módulos
require("dotenv").config();
const conn = require("./db/conn");
const express = require("express");
const exphbs = require("express-handlebars");

const Usuario = require("./models/Usuario");
const Jogo = require("./models/Jogo");
const Conquista = require("./models/Conquista");

Jogo.belongsToMany(Usuario, { through: "aquisicoes" });
Usuario.belongsToMany(Jogo, { through: "aquisicoes" });


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

app.get("/", (req, res) => {
  res.render("home");
});

//USUÁRIOS//

app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.findAll({
    raw: true
  });
  res.render("usuarios", { usuarios });
});

app.get("/usuarios/novo", (req, res) => {
  res.render("formUsuario");
});

app.post("/usuarios/novo", async (req, res) => {
  const dadosUsuario = {
    nickname: req.body.nickname,
    nome: req.body.nome,
  };

  const usuario = await Usuario.create(dadosUsuario);
  res.send("Usuário inserido: " + usuario.id);
});

app.get("/usuarios/:id/update",async (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = await Usuario.findByPk(id, { raw: true });

  res.render("formUsuario", { usuario });

  //const usuario = Usuario.findOne({
  // where: {id: id},
  //raw: true,
  //});
});

app.post("/usuarios/:id/update", async (req, res) => {
  const id = parseInt(req.params.id);

  const dadosUsuario = {
    nickname: req.body.nickname,
    nome: req.body.nome,
  };

  const retorno = await Usuario.update(dadosUsuario, {
     where: { id: id }, 
    });

  if (retorno > 0) {
    res.redirect("/usuarios");
  } else {
    res.send("Erro ao atualizar usuário");
  }

});

app.post("/usuarios/:id/delete", async (req, res) => {
  const id = parseInt(req.params.id);
  const retorno = await Usuario.destroy({ where: { id: id } });

  if (retorno > 0) {
    res.redirect("/usuarios");
  } else {
    res.send("Erro ao excluir usuário");
  }
});


//JOGOS//

app.get("/jogos", async (req, res) => {
  const jogos = await Jogo.findAll({
    raw: true
  });
  res.render("jogos", { jogos });
});

app.get("/jogos/novo", (req, res) => {
  res.render("formJogo");
});

app.post("/jogos/novo", async (req, res) => {
  const dadosJogo = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    preco: req.body.preco,
  };

  const jogo = await Jogo.create(dadosJogo);
  res.send("Jogo inserido: " + jogo.id);
});

app.get("/jogos/:id/update",async (req, res) => {
  const id = parseInt(req.params.id);
  const jogo = await Jogo.findByPk(id, { raw: true });

  res.render("formJogo", { jogo });

  //const jogo = Jogo.findOne({
  // where: {id: id},
  //raw: true,
  //});
});

app.post("/jogos/:id/update", async (req, res) => {
  const id = parseInt(req.params.id);

  const dadosJogo = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    preco: req.body.preco,
  };

  const retorno = await Jogo.update(dadosJogo, {
     where: { id: id }, 
    });

  if (retorno > 0) {
    res.redirect("/jogos");
  } else {
    res.send("Erro ao atualizar jogo");
  }

});

app.post("/jogos/:id/delete", async (req, res) => {
  const id = parseInt(req.params.id);
  const retorno = await Jogo.destroy({ where: { id: id } });

  if (retorno > 0) {
    res.redirect("/jogos");
  } else {
    res.send("Erro ao excluir jogo");
  }
});

//CONQUISTAS//

app.get("/jogos/:id/conquistas", async (req, res) => {
  const id = parseInt(req.params.id);
  const jogo = await Jogo.findByPk(id, { raw: true });

  const conquistas = await Conquista.findAll({
    raw: true,
    where: { JogoId: id },
  });

  res.render("conquistas.handlebars", { jogo, conquistas });
});

app.get("/jogos/:id/novaConquista", async (req, res) => {
  const id = parseInt(req.params.id);
  const jogo = await Jogo.findByPk(id, { raw: true });

  res.render("formConquista", { jogo });
});

app.post("/jogos/:id/conquistas/novaConquista", async (req, res) => {
  const id = parseInt(req.params.id);

  const dadosConquista = {  
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    JogoId: id,
  };

  await Conquista.create(dadosConquista);

  res.redirect(`/jogos/${id}/conquistas`);
});

app.get("/jogos/:jogoId/conquistas/:id/update",async (req, res) => {
  const id = parseInt(req.params.id);
  const jogoId = parseInt(req.params.jogoId)
  const conquista = await Conquista.findByPk(id, { raw: true });

  res.render("formConquista", { conquista, jogoId });

  //const conquista = Conquista.findOne({
  // where: {id: id},
  //raw: true,
  //});
});

app.post("/jogos/:jogoId/conquistas/:id/update", async (req, res) => {
  const id = parseInt(req.params.id);
  const jogoId = parseInt(req.params.jogoId)

  const dadosConquista = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
  };

  const retorno = await Conquista.update(dadosConquista, {
     where: { id: id }, 
    });

  if (retorno > 0) {
    res.redirect(`/jogos/${jogoId}/conquistas`);
  } else {
    res.send("Erro ao atualizar conquista");
  }

});

app.post("/jogos/:jogoId/conquistas/:id/delete", async (req, res) => {
  const id = parseInt(req.params.id);
  const jogoId = parseInt(req.params.jogoId)
  const retorno = await Conquista.destroy({ where: { id: id } });

  if (retorno > 0) {
    res.redirect(`/jogos/${jogoId}/conquistas`);
  } else {
    res.send("Erro ao excluir jogo");
  }
});



app.listen(3000, () => {
  console.log("O servidor está rodando na porta 3000.")
});

conn
  .sync()
  .then(() => {
    console.log("Conectado com sucesso :)");
  })
  .catch((err) => {
    console.log("Erro ao conectar: " + err);
  });