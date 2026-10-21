const express = require("express");
const router = express.Router();

let clientes = [
    {
        id: 1,
        nome: "Pedro",
        email: "zaguipedro03@gmail.com"
    },
    {
        id: 2,
        nome: "Lucas",
        email: "lucasacamargo2010@gmail.com"
    }
];

router.get("/", (req, res) => {
    res.render("clientes/index", {
        clientes: clientes
    })
});

router.get("/cadastro", (req, res) => {
    res.render("clientes/form-cadastro", {
        erro: null
    })
})

router.post("/", (req, res) => {
    const {nome, email} = req.body;

    if(nome === "" || email === ""){
        return res.render("clientes/form-cadastro", {
            erro: "Preencha todos os campos!"
        })
    }

    let novoCliente = {
        id: Math.max(0, ...clientes.map(item => item.id)) + 1,
        nome,
        email
    }

    clientes.push(novoCliente);
    res.redirect("/clientes")
})


// Excluir um registro pelo ID
router.post("/excluir/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = clientes.findIndex(item => item.id === id);
  if (indice === -1) return res.status(404).send("Registro não encontrado");
  clientes.splice(indice, 1);
  res.redirect("/clientes");
});

// Exibir a tela de edição
router.get("/editar/:id", (req, res) => {
  const cliente = clientes.find(item => item.id === Number(req.params.id));
  if (!cliente) return res.status(404).send("Registro não encontrado");
  res.render("clientes/editar", { cliente, erro: null });
});

// Salvar as alterações
router.post("/editar/:id", (req, res) => {
  const cliente = clientes.find(item => item.id === Number(req.params.id));
  if (!cliente) return res.status(404).send("Registro não encontrado");
  const { nome, email } = req.body;
  if (!nome || !email) return res.status(400).render("clientes/editar", { cliente, erro: "Preencha todos os campos" });
  cliente.nome = nome.trim(); cliente.email = email.trim();
  res.redirect("/clientes");
});

module.exports = router;