# Blog React

Projeto de blog desenvolvido com **React**, utilizando **React Router DOM** para navegação, **Axios** para requisições HTTP, **JSON Server** para simular uma API local com persistência de dados e **Zod** para validação dos formulários.

A aplicação permite listar posts, visualizar detalhes, criar novos posts, editar posts existentes, excluir posts e gerenciar o conteúdo em uma área administrativa.

## Funcionalidades

* Listagem de posts em formato de cards
* Página de detalhes para cada post
* Criação de novos posts
* Edição de posts existentes
* Exclusão de posts com confirmação
* Área administrativa para gerenciar posts
* Busca de posts pelo título
* Suporte a imagem por URL nos posts
* Mensagens de sucesso após ações
* Validação de formulários com Zod
* Tema claro e escuro
* Página 404 personalizada
* Footer global
* Layout responsivo
* Persistência local dos dados com JSON Server

## Tecnologias utilizadas

* React
* JavaScript
* Vite
* React Router DOM
* Axios
* JSON Server
* Zod
* CSS

## Como executar o projeto

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Acesse a pasta do projeto:

```bash
cd Blog-React
```

Instale as dependências:

```bash
npm install
```

## Rodando a aplicação

Este projeto utiliza dois servidores durante o desenvolvimento:

1. O **JSON Server**, responsável por simular a API local.
2. O **Vite**, responsável por rodar a aplicação React.

Em um terminal, execute o JSON Server:

```bash
npm run server
```

A API local ficará disponível em:

```bash
http://localhost:3000
```

Em outro terminal, execute a aplicação React:

```bash
npm run dev
```

Depois, acesse no navegador:

```bash
http://localhost:5173
```

## API local

O projeto utiliza o **JSON Server** para simular uma API REST local com persistência dos dados no arquivo `db.json`.

URL base da API:

```bash
http://localhost:3000
```

Rotas utilizadas:

```bash
GET /posts
GET /posts/:id
POST /posts
PUT /posts/:id
DELETE /posts/:id
```

Diferente do JSONPlaceholder, o JSON Server altera o arquivo `db.json`, permitindo que posts criados, editados ou excluídos sejam mantidos enquanto o arquivo local existir.

## Estrutura dos posts

Cada post possui a seguinte estrutura:

```json
{
  "id": "1",
  "title": "Brasil",
  "body": "Texto do post...",
  "imageUrl": "https://exemplo.com/imagem.jpg",
  "userId": 1
}
```

O campo `imageUrl` é usado para exibir uma imagem no card da Home e também na página individual do post.

## Validação com Zod

Os formulários de criação e edição utilizam **Zod** para validar os dados antes do envio para a API.

As principais validações são:

* O título precisa ter pelo menos 3 caracteres.
* O conteúdo precisa ter pelo menos 10 caracteres.
* A URL da imagem precisa ser válida ou pode ficar vazia.

Isso evita o envio de posts incompletos ou com dados inválidos.

## Páginas do projeto

### Home

Exibe a lista de posts em formato de cards. Cada card pode conter uma imagem, título, resumo do conteúdo e botão para acessar a página de detalhes.

Também possui uma barra de pesquisa para filtrar posts pelo título.

### Post

Exibe as informações completas de um post específico, incluindo título, conteúdo e imagem.

A página utiliza o `id` recebido pela URL para buscar o post correspondente na API local.

### NewPost

Página com formulário para criar um novo post.

O usuário pode preencher:

* Título
* Conteúdo
* URL da imagem

Os dados são validados antes de serem enviados para o JSON Server.

### Admin

Página administrativa para gerenciar os posts cadastrados.

Permite:

* Visualizar os posts
* Editar posts
* Excluir posts com confirmação

### EditPost

Página com formulário preenchido com os dados atuais do post, permitindo editar título, conteúdo e URL da imagem.

### NotFound

Página exibida quando o usuário acessa uma rota inexistente.

## Tema claro e escuro

O projeto possui alternância entre tema claro e tema escuro.

As cores foram organizadas com variáveis CSS, facilitando a troca de tema e mantendo o visual consistente entre as páginas.

## Melhorias futuras

Algumas melhorias que podem ser adicionadas futuramente:

* Login de administrador
* Upload real de imagens
* Back-end próprio com Node.js e banco de dados
* Paginação de posts
* Filtros por categoria
* Salvamento da preferência de tema no navegador
* Deploy da aplicação

## Autor

Desenvolvido por **Bruno Mayer**.

ᓚᘏᗢ

