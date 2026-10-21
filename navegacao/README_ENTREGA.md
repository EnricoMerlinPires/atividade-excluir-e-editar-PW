# Sistema de Gerenciamento — Node.js

## Requisitos da atividade
- Clientes, Fornecedores e Produtos: cadastro, listagem, edição e exclusão.
- Botões Editar e Excluir na listagem. Exclusão exige confirmação.
- Integrantes na página principal (nomes originais do arquivo enviado).

## Rodar localmente
1. Instale Node.js.
2. Dentro da pasta, execute `npm install`.
3. Execute `npm start` e acesse `http://localhost:3000`.

## Deploy no Render
1. Coloque o conteúdo desta pasta em um repositório GitHub (não envie node_modules).
2. Render > New > Web Service > conecte o repositório.
3. Environment: Node; Build Command: `npm install`; Start Command: `npm start`.
4. Depois do deploy, copie a URL pública do Render e entregue no Teams.

**Atenção:** os registros ficam em arrays na memória: reiniciar o servidor restaura os dados iniciais. Para persistência permanente seria necessário um banco de dados.
