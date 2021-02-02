## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

### InsertOne

##### Exercício 1

Agora crie um documento na **coleção** `products`, no **database** `sample` com os seguintes atributos e valores:

```language-javascript
use sample
db.products.insertOne(
    {
        "productName": "Caixa",
        "price": 20
    }
)
```

##### Exercício 2

Agora assuma o controle do campo `_id`, passando um valor qualquer para ele e crie um novo documento com os mesmos atributos e valores do documento anterior.

```language-javascript
db.products.insertOne(
    {
        "_id": 100,
        "productName": "Caixa",
        "price": 20
    }
)
```

---

### InsertMany

##### Exercício 1

Insira mais três documentos na coleção `products` em uma única operação:

```language-javascript
db.products.insertMany(
    [
        { "productName": "Lapis", "stock": 10, "price": 20, "status":"A"},
        { "productName": "Tesoura", "price": 5, "status": "B" },
        { "productName": "Borracha", "price": 15, "status": "A" }
    ]
)
```

### Exercícios coleção bios

**Exercício 1**: Retorne o documento com `_id` igual a 8.

```language-js
db.bios.find({ _id: 8 })
```

**Exercício 2**: Retorne o documento com `_id` igual a 8, mas só exiba os campos: `_id` e  `name`.

```language-js
db.bios.find({ _id: 8 }, { name: 1 })
```

**Exercício 3**: Retorne apenas os campos `name` e `birth` do documento com `_id` igual a 8.

```language-js
db.bios.find({ _id: 8 }, { name: 1, birth: 1, _id: 0 })
```

**Exercício 4**: Retorne todos os documentos em que o campo `name.first` seja igual a **John**, utilizando o método `pretty()`.

```language-js
db.bios.find({ "name.first": "John" }).pretty()
```

**Exercício 5**: Retorne os 3 primeiros documentos da coleção `bios` utilizando o método `pretty()`.

```language-js
db.bios.find().limit(3).pretty()
```

**Exercício 6**: Retorne 2 documentos da coleção `bios` pulando os 5 primeiros documentos.

```language-js
db.bios.find().skip(5).limit(2)
```

##### Como importar o arquivo books.json

Para importar a coleção `books` para um banco chamado `class`, utilize o comando abaixo:

```language-js
mongoimport --db class books.json
```

Apost a importação, selecione o banco `class` no seu cliente:

```language-js
use class
```

**Exercício 7**: Retorne a quantidade de documentos da coleção `books`.

```language-js
db.books.count()
```

**Exercício 8**: Conte quantos livros existem com o `status` `"PUBLISH"`.

```language-js
db.books.count(
    { status: "PUBLISH" }
)
```

**Exercício 9**: Exiba os campos `title`, `isbn` e `pageCount` dos 3 primeiros livros. NÃO retorne o campo `_id`.

```language-js
db.books.find(
    {},
    {
        _id: 0,
        title: 1,
        isbn: 1,
        pageCount: 1
    }
).limit(3).pretty()
```

**Exercício 10:** Pule 5 documentos e exiba os campos `_id`, `title`, `authors` e `status` do livros com `status` `"MEAP"`, limitando a 10 documentos.

```language-js
db.books.find(
    {
        status: "MEAP"
    },
    {
        title: 1,
        authors: 1,
        status: 1
    }
).skip(5).limit(10).pretty()
```
