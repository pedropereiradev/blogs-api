
# Blogs API

Este projeto consiste em uma API RESTful e um banco de dados para a produção de 
conteúdo para um blog. É possível fazer login, e após isso gerenciar os posts
atrelados ao seu user. Além disso, cada post está atrelado a uma ou mais
categorias por meio de uma relaçao N:N.

## Stack utilizada

**Back-end:** Node, Express, Sequelize, JWT, Docker, mySQL


## Variáveis de Ambiente

Para rodar esse projeto sem utilizar Docker, você vai precisar adicionar as 
seguintes variáveis de ambiente no seu .env

`NODE_ENV`
`API_PORT`

`MY_SQL_HOST`
`MY_SQL_USER`
`MY_SQL_PASSWORD`
`MY_SQL_DB_NAME`
`MY_SQL_PORT`

`JWT_SECRET`

## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:pedropereiradev/blogs-api.git
```

Entre no diretório do projeto

```bash
  cd blogs-api
```

+ Utilizando Docker:
```bash
docker-compose up -d --build
docker exec -it blogs_api bash
npm install
npm start
```

+ Rodando Localmente:

Necessário configurar as variáveis de ambiente conforme documentação antes
de rodar o projeto

```bash
  npm install
  npm start
```

## Documentação da API

+ [**Login**](#login)
    + [Logar](#fazer-login)

+ [**User**](#usuario)
    + [Cadastrar](#fazer-cadastro)
    + [Listar todos](#retorna-todos-usuarios)
    + [Listar um](#retorna-um-usuario)
    + [Deletar](#deleta-um-usuario)

+ [**Category**](#categoria)
    + [Criar](#cria-categoria)
    + [Listar todas](#retorna-todas-categorias)

+ [**Post**](#post)
    + [Criar](#cria-blogPost)
    + [Listar todos](#retorna-todos-blogPosts)
    + [Listar um](#retorna-um-blogPost)
    + [Editar](#atualiza-um-blogPost)
    + [Deletar](#deleta-um-blogPost)
    + [Listar pelo searchTerm](#retorna-todos-blogPosts-com-searchTerm)

### Login

#### Fazer login
```http
  POST /login
```

+ Request (application/json)
    + Body

            {
                "email": "email@gmail.com",
                "password": "123456",
            }


+ Response 200 (application/json)
    + Body

            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
            }

+ If request without all filled fields
+ Response 400 (application/json)
    + Body

            {
                "message": "Some required fields are missing"
            }

+ If invalid email or passowrd
+ Response 400 (application/json)
    + Body

            {
                "message": "Invalid fields"
            }


### Usuario
#### Fazer cadastro
```http
  POST /user
```

+ Request (application/json)
    + Body

            {
                "displayName": "Brett Wiltshire",
                "email": "brett@email.com",
                "password": "123456",
                "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
            }


+ Response 200 (application/json)
    + Body

            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
            }

+ If `displayName` less than 8 characters
+ Response 400 (application/json)
    + Body

            {
                 "message": "\"displayName\" length must be at least 8 characters long"
            }

+ If invalid email format
+ Response 400 (application/json)
    + Body

            {
                 "message": "\"email\" must be a valid email"
            }

+ If `password` less than 6 characters
+ Response 400 (application/json)
    + Body

            {
                 "message": "\"password\" length must be at least 6 characters long"
            }

+ If `email` already exists
+ Response 409 (application/json)
    + Body

            {
                 "message": "User already registered"
            }

#### Retorna todos usuarios
```http
  GET /user
```
+ Request (application/json)
     + Headers

            {
                "authorization": "[Token]"
            }

+ Response 200 (application/json)
    + Body
  
            [
                {
                    "id": 1,
                    "displayName": "Lewis Hamilton",
                    "email": "lewishamilton@gmail.com",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
                },

                /* ... */
            ]

+ If does not have Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Token not found"
            }

+ If invalid or expired Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Expired or invalid token"
            }

#### Retorna um usuario
```http
  GET /user/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | User ID |


+ Request (application/json)
     + Headers

            {
                "authorization": "[Token]"
            }

+ Response 200 (application/json)
    + Body
  
            {
                "id": 1,
                "displayName": "Lewis Hamilton",
                "email": "lewishamilton@gmail.com",
                "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
            }


+ If does not have Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Token not found"
            }

+ If invalid or expired Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Expired or invalid token"
            }

#### Deleta um usuario
```http
  DELETE /user/me
```

+ Request (application/json)
     + Headers

            {
                "authorization": "[Token]"
            }

+ Response 204 (application/json)

+ If does not have Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Token not found"
            }

+ If invalid or expired Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Expired or invalid token"
            }

### Categoria
#### Cria categoria
```http
  POST /categories
```
+ Request (application/json)
     + Headers

            {
                "authorization": "[Token]"
            }
     + Body

            {
                "name": "category_name"
            }

+ Response 201 (application/json)
    + Body
  
            {
                "id": "category_id",
                "name": "category_name"
            }

+ If request without `name`
+ Response 400 (application/json)
     + Body

            {
                 "message": "\"name\" is required"
            }

+ If does not have Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Token not found"
            }

+ If invalid or expired Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Expired or invalid token"
            }

#### Retorna todas categorias
```http
  GET /categories
```

+ Request (application/json)
     + Headers

            {
                "authorization": "[Token]"
            }

+ Response 200 (application/json)
    + Body

            [
                {
                    "id": 1,
                    "name": "Inovação"
                },
                {
                    "id": 2,
                    "name": "Escola"
                },

                /* ... */
            ]

+ If does not have Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Token not found"
            }

+ If invalid or expired Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Expired or invalid token"
            }

### Post
#### Cria blogPost
```http
  POST /post
```

+ Request (application/json)
     + Headers

            {
                "authorization": "[Token]"
            }
    + Body

            {
                "title": "Latest updates, August 1st",
                "content": "The whole text for the blog post goes here in this key",
                "categoryIds": [1, 2]
            }
+ Response 201 (application/json)
    + Body

            {
                "id": 3,
                "title": "Latest updates, August 1st",
                "content": "The whole text for the blog post goes here in this key",
                "userId": 1,
                "updated": "2022-05-18T18:00:01.196Z",
                "published": "2022-05-18T18:00:01.196Z"
            }

+ If has some empty field
+ Response 400 (application/json)
    + Body

            {
                "message": "Some required fields are missing"
            }

+ If category does not exist
+ Response 400 (application/json)
    + Body

            {
                "message": "\"categoryIds\" not found"
            }

+ If does not have Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Token not found"
            }

+ If invalid or expired Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Expired or invalid token"
            }

#### Retorna todos blogPosts
```http
  GET /post
```

+ Request (application/json)
     + Headers

            {
                "authorization": "[Token]"
            }

+ Response 200 (application/json)
    + Body

            [
                {
                    "id": 1,
                    "title": "Post do Ano",
                    "content": "Melhor post do ano",
                    "userId": 1,
                    "published": "2011-08-01T19:58:00.000Z",
                    "updated": "2011-08-01T19:58:51.000Z",
                    "user": {
                        "id": 1,
                        "displayName": "Lewis Hamilton",
                        "email": "lewishamilton@gmail.com",
                        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
                    },
                    "categories": [
                        {
                            "id": 1,
                            "name": "Inovação"
                        }
                    ]
                },
                
                /* ... */
            ]

+ If does not have Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Token not found"
            }

+ If invalid or expired Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Expired or invalid token"
            }

#### Retorna um blogPost
```http
  GET /post/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | Post ID |

+ Request (application/json)
     + Headers

            {
                "authorization": "[Token]"
            }

+ Response 200 (application/json)
    + Body

            {
                "id": 1,
                "title": "Post do Ano",
                "content": "Melhor post do ano",
                "userId": 1,
                "published": "2011-08-01T19:58:00.000Z",
                "updated": "2011-08-01T19:58:51.000Z",
                "user": {
                    "id": 1,
                    "displayName": "Lewis Hamilton",
                    "email": "lewishamilton@gmail.com",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
                },
                "categories": [
                    {
                        "id": 1,
                        "name": "Inovação"
                    }
                ]
            }


+ If does not have Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Token not found"
            }

+ If invalid or expired Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Expired or invalid token"
            }

#### Atualiza um blogPost
```http
  PUT /post/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | Post ID |


+ Request (application/json)
    + Headers

            {
                "authorization": "[Token]"
            }
    + Body

            {
                "title": "Latest updates, August 1st",
                "content": "The whole text for the blog post goes here in this key"
            }

+ Response 200 (application/json)
    + Body

            {
                "id": 3,
                "title": "Latest updates, August 1st",
                "content": "The whole text for the blog post goes here in this key",
                "userId": 1,
                "published": "2022-05-18T18:00:01.000Z",
                "updated": "2022-05-18T18:07:32.000Z",
                "user": {
                    "id": 1,
                    "displayName": "Lewis Hamilton",
                    "email": "lewishamilton@gmail.com",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
                },
                "categories": [
                    {
                    "id": 1,
                    "name": "Inovação"
                    },
                    {
                    "id": 2,
                    "name": "Escola"
                    }
                ]
            }

+ If user is not post owner
+ Response 401 (application/json)
    + Body

            {
                "message": "Unauthorized user"
            }
+ If has some empty field
+ Response 400 (application/json)
    + Body

            {
                "message": "Some required fields are missing"
            }
+ If does not have Token
+ Response 401 (application/json)
    + Body

            {
                 "message": "Token not found"
            }

+ If invalid or expired Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Expired or invalid token"
            }

#### Deleta um blogPost
```http
  DELETE /post/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | Post ID |

+ Request (application/json)
     + Headers

            {
                "authorization": "[Token]"
            }

+ Response 204 (application/json)

+ If blogPost does not exist
+ Response 404 (application/json)
    + Body

            {
                "message": "Post does not exist"
            }
+ If user is not post owner
+ Response 401 (application/json)
    + Body

            {
                "message": "Unauthorized user"
            }
+ If does not have Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Token not found"
            }

+ If invalid or expired Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Expired or invalid token"
            }

#### Retorna todos blogPosts com searchTerm
```http
  GET /post/search?q=:searchTerm
```

| Query   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `searchTerm` | `string` | Term included in the title or content |

```http
  GET /post/search?q=vamos
```
+ Response (application/json)
    + Body

            [
                {
                    "id": 2,
                    "title": "Vamos que vamos",
                    "content": "Foguete não tem ré",
                    "userId": 1,
                    "published": "2011-08-01T19:58:00.000Z",
                    "updated": "2011-08-01T19:58:51.000Z",
                    "user": {
                        "id": 1,
                        "displayName": "Lewis Hamilton",
                        "email": "lewishamilton@gmail.com",
                        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
                    },
                    "categories": [
                        {
                            "id": 2,
                            "name": "Escola"
                        }
                    ]
                }
            ]

```http
  GET /post/search?q=
```
+ Response (application/json)
    + Body

            [
                {
                "id": 1,
                "title": "Post do Ano",
                "content": "Melhor post do ano",
                "userId": 1,
                "published": "2011-08-01T19:58:00.000Z",
                "updated": "2011-08-01T19:58:51.000Z",
                "user": {
                    "id": 1,
                    "displayName": "Lewis Hamilton",
                    "email": "lewishamilton@gmail.com",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
                },
                "categories": [
                    {
                    "id": 1,
                    "name": "Inovação"
                    }
                ]
                },
                
                /* ... */
            ]

+ If `searchTerm` does not exist
+ Response 200 (application/json)
    + Body

            []

+ If does not have Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Token not found"
            }

+ If invalid or expired Token
+ Response 401 (application/json)
     + Body

            {
                 "message": "Expired or invalid token"
            }