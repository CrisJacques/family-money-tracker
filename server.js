/**
 * Construindo um pequeno servidor de arquivos usando Node.js + Express que entregará o conteúdo estático do ReactJS a cada requisição à aplicação na Heroku
 */
const path = require("path");
const express = require("express");

const app = express();

/**
 * Este servidor está entregando arquivos da pasta build, que é a pasta onde fica o build da aplicação depois de compilada
 */
app.use(express.static(path.join(__dirname, "build")));

/**
 * Uso de uma variável de ambiente para a porta, esta é uma exigência da Heroku, pois lá as portas são dinâmicas
 */
app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), function () {
  console.log("listening on port ", server.address().port);
});
