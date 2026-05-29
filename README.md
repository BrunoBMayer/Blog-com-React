# Blog React

Projeto de blog desenvolvido com **React**, utilizando **React Router DOM** para navegação entre páginas e **Axios** para consumo de API.

A aplicação permite listar posts, visualizar detalhes de um post, criar novos posts, editar posts existentes e gerenciar posts em uma área administrativa.

## Funcionalidades

* Listagem de posts
* Página de detalhes para cada post
* Criação de novos posts
* Edição de posts
* Exclusão de posts
* Navegação entre páginas com React Router
* Requisições HTTP com Axios
* Organização de rotas e componentes

## Tecnologias utilizadas

* React
* JavaScript
* React Router DOM
* Axios
* Vite
* CSS
* JSONPlaceholder API

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

Execute o projeto:

```bash
npm run dev
```

Depois, acesse no navegador:

```bash
http://localhost:5173
```

## API utilizada

Este projeto utiliza a API pública **JSONPlaceholder** para simular as operações de um blog.

URL base:

```bash
https://jsonplaceholder.typicode.com
```

Rotas usadas no projeto:

```bash
GET /posts
GET /posts/:id
POST /posts
PUT /posts/:id
DELETE /posts/:id
```

Observação: como o JSONPlaceholder é uma API de testes, as operações de criação, edição e exclusão são simuladas. Elas retornam uma resposta, mas não alteram os dados permanentemente no servidor.

## Páginas do projeto

### Home

Exibe a lista de posts vindos da API. Cada post possui um botão para acessar a página de detalhes.

### Post

Exibe as informações completas de um post específico, usando o `id` recebido pela URL.

### NewPost

Página com formulário para criar um novo post.

### Admin

Página administrativa para listar posts e acessar ações como editar ou excluir.

### EditPost

Página com formulário preenchido com os dados atuais do post, permitindo editar título e conteúdo.

ᓚᘏᗢ
