//importações necessárias para o projeto
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 10000;

//configurações para o servidor
app.use(bodyParser.json());
app.use(cors());

//rota para criar um item
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  if (users.length > 0) return res.status(200).send(users);
  return res.send("No users found");
});

app.post("/user", async (req, res) => {
  const data = req.body;
  await prisma.user.create({
    data: {
      nome: data.nome,
    },
  });
  return res.sendStatus(201);
});

//rota para buscar um usuário pelo nome
app.get("/user/:name", async (req, res) => {
  const nome = req.params.name;
  const user = await prisma.user.findMany({
    where: {
      nome: nome,
    },
  });
  if (user.length > 0) return res.status(200).send(user);
  return res.send("No user found");
});


// Inicie o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
