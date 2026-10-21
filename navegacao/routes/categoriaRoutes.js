const { render } = require("ejs");
const express = require("express");

const router = express.Router();

// ========================================
// DADOS
// ========================================

let categorias = [
  {
    id: 1,
    nome: "Informática",
    descricao: "Produtos e serviços de informática"
  },
  {
    id: 2,
    nome: "Eletrônicos",
    descricao: "Produtos eletrônicos"
  },
  {
    id: 3,
    nome: "Roupas",
    descricao: "Roupas e acessórios"
  }
];

router.get("/", (req, res) => {
    res.render("categorias/index", {
        categorias: categorias
    })
});

router.get("/cadastro", (req,res) => {
    res.render("categorias/form-cadastro", {
      erro: null
    })

})

router.post("/", (req,res) => {
    const {nome, descricao} = req.body

    if(nome === "" || descricao === ""){
      return res.render("categorias/form-cadastro", {
        erro: "Preencha todos os campos"
      })
    }


    let novaCategoria ={
        id: categorias.length + 1,
        nome,
        descricao
    }

    categorias.push(novaCategoria)
    res.redirect("/categorias")
})

router.get("/excluir/:id", (req, res) => {
  let id = req.params.id;

  for(let i in categorias) {
    if(categorias[i].id == id){
      categorias.splice(1, id)
    }
  }
  res.redirect("/categorias")
})

router.get("/editar/:id", (req, res) => {
  let id = req.params.id;
  let categoria = categorias.find(c => c.id == id);

  res.render("categorias/editar", {categoria});

//   res.render("/categorias/editar", {
//     categoria: categorias[id]
//   })
});

router.post("/editar/:id", (req, res) => {
  let {nome, descricao} = req.body;
  let id = req.params.id;

  for(let i in categorias){
    if(categorias[i].id == id){

      categorias[i].nome = nome
      categorias[i].descricao = descricao

    }
  }
  res.redirect("/categorias")
})

module.exports = router;