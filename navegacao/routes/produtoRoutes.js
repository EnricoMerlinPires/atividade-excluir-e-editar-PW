const express = require("express")
const router = express.Router()

const produtos = [
    {
        id: 1,
        nome: "Celular",
        preco: 840.50
    }, 
    {
        id: 2,
        nome: "estojo",
        preco: 23.80
    }
]

router.get("/", (req, res) => {
    res.render("produtos/index",{
        produtos: produtos
    })
})

router.get("/cadastro", (req, res) => {
    res.render("produtos/form-cadastro", {
        erro: null
    })
})

router.post("/", (req, res) => {
    const { nome, preco } = req.body

    if (nome === "" || String(preco) === "") {
        return res.render("produtos/form-cadastro", {
            erro: "Preencha todos os campos"
        })
    }
    else if(!Number.isFinite(Number(preco)) || Number(preco) < 0){
        return res.render("produtos/form-cadastro", {
            erro: "O preço só deve conter números!"
        })
    }

    let novoProduto = {
        id: Math.max(0, ...produtos.map(item => item.id)) + 1,
        nome,
        preco: Number(preco).toFixed(2)
    }

    produtos.push(novoProduto)

    res.redirect("/produtos")
})


// Excluir um registro pelo ID
router.post("/excluir/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = produtos.findIndex(item => item.id === id);
  if (indice === -1) return res.status(404).send("Registro não encontrado");
  produtos.splice(indice, 1);
  res.redirect("/produtos");
});

// Exibir a tela de edição
router.get("/editar/:id", (req, res) => {
  const produto = produtos.find(item => item.id === Number(req.params.id));
  if (!produto) return res.status(404).send("Registro não encontrado");
  res.render("produtos/editar", { produto, erro: null });
});

// Salvar as alterações
router.post("/editar/:id", (req, res) => {
  const produto = produtos.find(item => item.id === Number(req.params.id));
  if (!produto) return res.status(404).send("Registro não encontrado");
  const { nome, preco } = req.body;
  if (!nome || preco === undefined || String(preco).trim() === "" || !Number.isFinite(Number(preco)) || Number(preco) < 0) return res.status(400).render("produtos/editar", { produto, erro: "Informe um nome e um preço válido" });
  produto.nome = nome.trim(); produto.preco = Number(preco).toFixed(2);
  res.redirect("/produtos");
});

module.exports = router;