
# Backend for Order and products app. 


## Autores

- [@Jjooaogab](https://www.instagram.com/_jjooaogab)

#### Retorna todos os itens

Claro, aqui estão as descrições das rotas que criamos anteriormente:

## GET /orders

Retorna todos os pedidos.

```http
GET /orders
```

## GET /order/:id

Retorna um pedido específico pelo ID.

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | ID do pedido que foi colocado na URL.        |

```http
GET /order/1234abcd
```

## POST /order/open/max-12

Cria um novo pedido com um número máximo de 12.

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `number`  | `number` | Número do pedido (inteiro de 1 a 12).        |

```http
POST /order/open/max-12
{
  "number": 5
}
```

## GET /order/:id/products

Retorna todos os produtos de um pedido específico pelo ID.

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | ID do pedido que foi colocado na URL.        |

```http
GET /order/1234abcd/products
```

## POST /order/:id/products

Adiciona um produto a um pedido específico.

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | ID do pedido que foi colocado na URL.        |
| `productId` | `string` | ID do produto (UUID).                        |
| `name`    | `string` | Nome do produto.                             |
| `qntd`    | `number` | Quantidade do produto (inteiro mínimo 1).    |

```http
POST /order/1234abcd/products
{
  "productId": "abcd1234",
  "name": "Produto X",
  "qntd": 2
}
```

## DELETE /order/:id

Exclui um pedido específico pelo ID.

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | ID do pedido que foi colocado na URL.        |

```http
DELETE /order/1234abcd
```

## GET /products

Retorna todos os produtos.

```http
GET /products
```

## GET /product/:id

Retorna um produto específico pelo ID.

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | ID do produto que foi colocado na URL.       |

```http
GET /product/1234abcd
```

## POST /product

Cria um novo produto.

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `name`    | `string` | Nome do produto.                             |
| `value`   | `number` | Valor do produto (número, padrão 0).         |

```http
POST /product
{
  "name": "Produto X",
  "value": 10.5
}
```

## PUT /product/:id

Atualiza um produto específico.

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | ID do produto que foi colocado na URL.       |
| `name`    | `string` | Novo nome do produto.                        |
| `value`   | `number` | Novo valor do produto (número, padrão 0).    |

```http
PUT /product/1234abcd
{
  "name": "Produto Y",
  "value": 20.5
}
```

## DELETE /product/:id

Exclui um produto específico pelo ID.

| Parâmetro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | ID do produto que foi colocado na URL.       |

```http
DELETE /product/1234abcd
```



## Usado por

Esse projeto é usado pelas seguintes empresas:

- Adega do Galego



