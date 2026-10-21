const express = require("express");
const router = express.Router();
const {cnpj: cnpjValidate} = require("cpf-cnpj-validator");


let fornecedores = [
    {
        id: 1,
        cnpj: "25.546.722/0001-77",
        email: "zaguipedro03@gmail.com"
    },
    {
        id: 2,
        cnpj: "14.513.979/0001-06",
        email: "lucasacamargo2010@gmail.com"
    }
]

router.get("/", (req, res) => {
    res.render("fornecedores/index", {
        fornecedores:fornecedores
    });
})

router.get("/cadastro", (req,res) => {
    res.render("fornecedores/form-cadastro", {
        erro: null
    });
})

router.post("/", (req, res) => {
    const {cnpj, email} = req.body;
    
    if(cnpj === "" || email === ""){
        return res.render("fornecedores/form-cadastro", {
            erro: "Preencha todos os campos"
        })
    }

    if(!cnpjValidate.isValid(cnpj)){
        return res.render("fornecedores/form-cadastro",{
            erro: "CNPJ inválido"
        })
    }


    let novoFornecedor = {
        id: Math.max(0, ...fornecedores.map(item => item.id)) + 1,
        cnpj: cnpjValidate.format(cnpj),
        email
    }

    fornecedores.push(novoFornecedor);
    console.log(fornecedores);
    res.redirect("/fornecedores");
})


// Excluir um registro pelo ID
router.post("/excluir/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = fornecedores.findIndex(item => item.id === id);
  if (indice === -1) return res.status(404).send("Registro não encontrado");
  fornecedores.splice(indice, 1);
  res.redirect("/fornecedores");
});

// Exibir a tela de edição
router.get("/editar/:id", (req, res) => {
  const fornecedor = fornecedores.find(item => item.id === Number(req.params.id));
  if (!fornecedor) return res.status(404).send("Registro não encontrado");
  res.render("fornecedores/editar", { fornecedor, erro: null });
});

// Salvar as alterações
router.post("/editar/:id", (req, res) => {
  const fornecedor = fornecedores.find(item => item.id === Number(req.params.id));
  if (!fornecedor) return res.status(404).send("Registro não encontrado");
  const { cnpj, email } = req.body;
  if (!cnpj || !email || !cnpjValidate.isValid(cnpj)) return res.status(400).render("fornecedores/editar", { fornecedor, erro: "Informe um CNPJ válido e o e-mail" });
  fornecedor.cnpj = cnpjValidate.format(cnpj); fornecedor.email = email.trim();
  res.redirect("/fornecedores");
});

module.exports = router;