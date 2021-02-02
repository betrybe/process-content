## O que vamos aprender?

Vamos aumentar o poder de nossas queries no MongoDB através do uso de operadores de filtro e como eles ajudam na recuperação dos dados das coleções.

---

### Você será capaz de:

* Utilizar os operadores de comparação **$lt**, **$lte**, **$gt**, **$gte**, **$eq**, **$ne**, **$in** e **$nin**;

* Utilizar os operadores lógicos **$not** e **$nor**;

* Compor filtros avançados com **$and** e **$or**;

* Utilizar o operador **$exists**;

* Utilizar o método **sort()**;

* Remover documentos.

---

## Por que isso é importante?

Filtrar dados é uma das principais ações realizadas em bancos de dados. Então, para tirar o máximo proveito disso e conseguir fazer boas buscas, é necessário conhecer os diferentes operadores de filtro que podem ser utilizados em suas consultas.

---

## Conteúdos

###### Tempo sugerido para realização: 90 minutos

### Operadores de Comparação

Os **operadores de comparação** servem para que você execute queries comparando os valores de campos dos documentos de uma coleção.

Esses operadores são utilizados como parte do filtro de alguns métodos para leitura de documentos do **MongoDB**. Por exemplo, o `find()` e o `count()`, que vimos no dia anterior, ou o `update()` e o `distinct()`, que veremos mais adiante, aceitam filtros de comparação.

Vale lembrar que, para comparações de **BSON types** diferentes, você deve entender a [ordem de comparação.](https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#bson-types-comparison-order) {: .external-link target="_blank" rel="noreferrer noopener" }

Os operadores seguem uma sintaxe padrão que é composta por um subdocumento, como no exemplo abaixo.

```language-js
{ <campo>: { <operador>: <valor> } }
```

Além disso, os operadores são identificados pelo prefixo **$**.

##### Operador `$lt`

O operador `$lt` seleciona os documentos em que o valor do **campo** filtrado é **menor do que (<)** o **valor** especificado.

Veja o exemplo abaixo:

```language-js
db.inventory.find({ qty: { $lt: 20 } })
```

Essa query selecionará todos os documentos na coleção `inventory` cujo valor do campo `qty` é **menor do que 20**.

##### Operador `$lte`

O operador `$lte` seleciona os documentos em que o valor do **campo** filtrado é **menor ou igual (<=)** ao **valor** especificado.

Veja o exemplo abaixo:

```language-js
db.inventory.find({ qty: { $lte: 20 } })
```

Essa query selecionará todos os documentos na coleção `inventory` cujo valor do campo `qty` é **menor ou igual a 20**.

##### Operador `$gt`

O operador `$gt` seleciona os documentos em que o valor do **campo** filtrado é **maior do que (>)** o **valor** especificado.

Veja o exemplo abaixo:

```language-js
db.inventory.find({ qty: { $gt: 20 } })
```

Essa query selecionará todos os documentos na coleção `inventory` cujo valor do campo `qty` é **maior do que 20**.

##### Operador `$gte`

O operador `$gte` seleciona os documentos em que o valor do **campo** filtrado é **maior ou igual (>=)** ao **valor** especificado.

Veja o exemplo abaixo:

```language-js
db.inventory.find({ qty: { $gte: 20 } })
```

Essa query selecionará todos os documentos na coleção `inventory` cujo valor do campo `qty` é **maior ou igual a 20**.

##### Operador `$eq`

O operador `$eq` seleciona os documentos em que o valor do **campo** filtrado é **igual** ao valor especificado. Esse operador é equivalente ao filtro `{ campo: <valor> }` e não tem nenhuma diferença de performance.

Veja o exemplo abaixo:

```language-js
db.inventory.find({ qty: { $eq: 20 } })
```

A query acima é exatamente equivalente a:

```language-js
db.inventory.find({ qty: 20 })
```

Durante a aula você verá mais exemplos que mostrarão que o `$eq` é apenas uma maneira de explicitar o operador.

##### Operador `$ne`

Esse operador é o contrário do anterior. Ao utilizar o `$ne`, o MongoDB seleciona os documentos em que o valor do **campo** filtrado **não é igual** ao valor especificado.

```language-js
db.inventory.find({ qty: { $ne: 20 } })
```

A query acima retorna os documentos da coleção `inventory` cujo valor do campo `qty` é **diferente de 20**, incluindo os documentos em que o campo **qty** não existe.

##### Operador `$in`

A query abaixo retorna todos os documentos da coleção `inventory` em que o valor do campo `qty` é **5** ou **15**. E embora você também possa executar essa consulta utilizando o operador `$or`, que você verá mais à frente no conteúdo, escolha o operador `$in` para executar comparações de igualdade com mais de um valor no mesmo campo.

```language-js
db.inventory.find({ qty: { $in: [ 5, 15 ] } })
```

##### Operador `$nin`

O operador `$nin` seleciona os documentos em que o valor do **campo** filtrado não é igual ao especificado no **array**, ou o campo não existe.

```language-js
db.inventory.find( { qty: { $nin: [ 5, 15 ] } } )
```

Essa query seleciona todos os documentos da coleção `inventory` em que o valor do campo `qty` é **diferente** de **5** e **15**. Esse resultado também inclui os documentos em que o campo `qty` não existe.

### Operadores Lógicos

Assim como os operadores de comparação, os **operadores lógicos** também podem ser utilizados nos mesmos métodos para leitura e atualização de documentos do **MongoDB**. Eles também ajudam a elaborar queries mais complexas, juntando cláusulas para retornar documentos que satisfaçam os filtros.

##### Operador `$not`

Sintaxe:

```language-js
{ campo: { $not: { <operador ou expressão> } } }
```

O operador `$not` executa uma operação lógica de **NEGAÇÃO** no **< operador ou expressão >** especificado e seleciona os documentos que **não** correspondam ao **< operador ou expressão >**. Isso também inclui os documentos que **não** contêm o **campo**.

Veja o exemplo abaixo:

```language-js
db.inventory.find({ price: { $not: { $gt: 1.99 } } })
```

Essa query seleciona todos os documentos na coleção `inventory` em que o valor do campo `price` é menor ou igual a **1.99** (em outras palavras, não é maior que **1.99**), ou em que o campo **price** não exista.

É importante destacar que a expressão `{ $not: { $gt: 1.99 } }` retorna um resultado diferente do operador `$lte`. Ao utilizar `{ $lte: 1.99 }`, os documentos retornados serão somente aqueles em que o campo `price` existe e cujo valor é menor ou igual a **1.99**.

##### Operador `$or`

O operador `$or` executa a operação lógica **OU** em um array de uma ou mais expressões e seleciona os documentos que satisfaçam **ao menos** uma das expressões.

Sintaxe:

```language-js
{ $or: [{ <expression1> }, { <expression2> }, ... , { <expressionN> }] }
```

Considere o exemplo a seguir:

```language-js
db.inventory.find({ $or: [{ qty: { $lt: 20 } }, { price: 10 }] })
```

Essa query seleciona todos os documentos da coleção `inventory` em que o valor do campo `qty` é menor do que **20** ou o valor do campo `price` é igual a **10**.

##### Operador `$nor`

O operador `$nor` também executa uma operação lógica de **NEGAÇÃO**, porém, em um array de uma ou mais expressões, e seleciona os documentos em que todas essas expressões **falhem**, ou seja, seleciona os documentos em que todas as expressões desse array sejam falsas.

Sintaxe:

```language-js
{ $nor: [ { <expressão1> }, { <expressão2> }, ...  { <expressãoN> } ] }
```

Veja o exemplo abaixo:

```language-js
db.inventory.find({ $nor: [{ price: 1.99 }, { sale: true }] })
```

Essa query retorna todos os documentos da coleção `inventory` que:

* Contêm o campo `price` com valor diferente de **1.99** e o campo `sale` com valor diferente de **true**;

* Ou contêm o campo `price` com valor diferente de **1.99** e **não** contêm o campo `sale`;

* Ou **não** contêm o campo `price` e contêm o campo `sale` com valor diferente de **true**;

* Ou **não** contêm o campo `price` e **nem** o campo `sale`.

Pode parecer complexo, mas você fará mais exercícios para praticar mais esse operador.

##### Operador `$and`

O operador `$and` executa a operação lógica **E** num array de uma ou mais expressões e seleciona os documentos que satisfaçam **todas** as expressões no array. O operador `$and` usa o que chamamos de **avaliação em curto-circuito** (_short-circuit evaluation_). Se alguma expressão for avaliada como **falsa**, o MongoDB não avaliará as expressões restantes, pois a expressão como um todo será **falsa** independentemente delas.

Sintaxe:

```language-js
{ $and: [{ <expressão1> }, { <expressão2> } , ... , { <expressãoN> }] }
```

##### Múltiplas expressões especificando o mesmo campo

Considere o exemplo abaixo:

```language-js
db.inventory.find({
    $and: [
        { price: { $ne: 1.99 } },
        { price: { $exists: true } }
    ]
})
```

Essa query seleciona todos os documentos da coleção `inventory` em que o valor do campo `price` é diferente de **1.99** e o campo `price` existe.

##### Múltiplas expressões especificando o mesmo operador

Considere o exemplo abaixo:

```language-js
db.inventory.find({
    $and: [
        {
            $or: [
                { price: { $gt: 0.99, $lt: 1.99 } }
            ]
        },
        {
            $or: [
                { sale : true },
                { qty : { $lt : 20 } }
            ]
        }
    ]
})
```

Essa query seleciona todos os documentos da coleção `inventory` em que o valor do campo `price` é maior que **0.99** ou menor que **1.99**, **e** o valor do campo **sale** é igual a **true ou** o valor do campo `qty` é menor do que **20**. Ou seja, essa expressão é equivalente a (price > 0.99 **ou** price < 1.99) **e** (sale = true **ou** qty < 20).

### Operador `$exists`

_Sintaxe_:

```language-js
{ campo: { $exists: <boolean> } }
```

Quando o `<boolean>` é verdadeiro (`true`), o operador `$exists` encontra os documentos que contêm o **campo**, incluindo os documentos em que o valor do campo é `null`. Se o `<boolean>` é falso (`false`), a query retorna somente os documentos que não contêm o campo.

Veja o exemplo abaixo:

```language-js
db.inventory.find({ qty: { $exists: true } })
```

Essa query retorna todos os documentos da coleção `inventory` em que o campo `qty` existe.

Você também pode combinar operadores, como no exemplo abaixo:

```language-js
db.inventory.find({ qty: { $exists: true, $nin: [ 5, 15 ] } })
```

Essa query seleciona todos os documentos da coleção `inventory` em que o campo `qty` existe **e** seu valor é diferente de **5** e **15**.

### Método `sort()`

_Sintaxe_:

```language-js
db.colecao.find().sort({ "campo": "1 ou -1"})
```

Quando existe a necessidade de ordenar os documentos por algum campo o método `sort` se mostra muito útil. Usando um valor positivo, `1`, como valor do campo os documentos da `query` são ordenados de forma crescente ou alfabética (Ele também ordena por campos com `strings`). Em complemento, usando um valor negativo,`-1`, os documentos de saída em ordem decrescente ou contra alfabética.
Ele pode ser combinado com o um `find` assim: `db.example.find({}, { value, name }).sort({ value: -1 }, { name: 1 })`.
O sort só pode ser usado se tiver algum resultado de busca antes, como `db.colecao.find().sort({ "campo": -1})`, mas não `db.colecao.sort({ campo: 1 })`.
Vamos ver um exemplo?

```language-js
db.example.insertMany([
    { "name": "Mandioquinha Frita", "price": 14 },
    { "name": "Litrão", "price": 8 },
    { "name": "Torresmo", "price": 16 }
])
```

```language-js
db.example.find().sort({ "price": 1 }).pretty()
```

```language-js
// Resultado esperado:
{
        "_id" : ObjectId("5f7dd0582e2738debae74d6c"),
        "name" : "Litrão",
        "price" : 8
}
{
        "_id" : ObjectId("5f7dd0582e2738debae74d6b"),
        "name" : "Mandioquinha Frita",
        "price" : 14
}
{
        "_id" : ObjectId("5f7dd0582e2738debae74d6d"),
        "name" : "Torresmo",
        "price" : 16
}
```

```language-js
db.example.find().sort({ "price": -1 }, { "name" : 1 }).pretty()
```

```language-js
// Resultado esperado:
{
        "_id" : ObjectId("5f7dd0582e2738debae74d6d"),
        "name" : "Torresmo",
        "price" : 16
}
{
        "_id" : ObjectId("5f7dd0582e2738debae74d6b"),
        "name" : "Mandioquinha Frita",
        "price" : 14
}
{
        "_id" : ObjectId("5f7dd0582e2738debae74d6c"),
        "name" : "Litrão",
        "price" : 8
}
```


### Removendo documentos

Para remover documentos de uma coleção, temos dois métodos que são utilizados para níveis de remoção diferentes: o `db.colecao.deleteOne()` e o `db.colecao.deleteMany()`. Os dois métodos aceitam um documento como parâmetro, que pode conter um filtro simples ou até mesmo um conjunto de expressões para atender aos critérios de seleção.

##### db.colecao.deleteOne()

Esse método remove apenas um documento, que deve satisfazer o critério de seleção, mesmo que múltiplos outros documentos também se enquadrem no critério de seleção. Se nenhum valor for passado como parâmetro, a operação removerá o primeiro documento.

O exemplo abaixo remove o primeiro documento da coleção `inventory` em que o campo `status` é igual a **D**:

```language-js
db.inventory.deleteOne({ status: "D" })
```

##### db.colecao.deleteMany()

Esse método remove todos os documentos que satisfaçam o critério de seleção.

O exemplo abaixo remove todos os documentos da coleção `inventory` em que o campo `status` é igual a **A**:

```language-js
db.inventory.deleteMany({ status : "A" })
```

Para remover todos os documentos da coleção, basta não passar parâmetros para o método `db.colecao.deleteMany()`:

```language-js
db.inventory.deleteMany( {} )
```

### Bora treinar tudo!

##### Criando dataset

Para treinar todos os comandos, utilizaremos uma nova dataset, que tem informações sobre filmes. Para importar essa dataset, siga os seguintes passos:

1) Clique no [link](/back-end/mongodb/aula-filter-operators.js) {: .external-link target="_blank" rel="noreferrer noopener" }.

2) Copie todo o conteúdo do link e depois abra o Mongo Shell.

3) Cole todo o conteúdo no CLI do Mongo Shell e confirme com `ENTER`.

Para confirmar que está tudo funcionando, rode o seguinte comando:

```language-js
db.filmes.find().count()
```

Deve retornar o valor 37, que é o número de filmes dentro dessa dataset.

##### Apagando uma dataset já alterada

Caso você altere a dataset, faça o seguinte:

1) Faça o drop da database em que você fez as alterações, com o comando:

```language-js
db.dropDatabase()
```

2) Refaça todos os passos de criação de uma nova dataset mostrados acima.

Esses passos são importantes porque trabalharemos na aula ao vivo com essa dataset, assegurando que todos terão os mesmos resultados.

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Vamos para o Slack, onde estará disponível o link da nossa aula ao vivo de hoje.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

---

### Agora, a prática!

##### Antes de iniciar os exercícios

Para os exercícios a seguir, utilizaremos um dataset que contém dados de Super-Heróis. Faça o download do arquivo JSON [aqui](/back-end/mongodb/superheroes.json) {: .external-link target="_blank" rel="noreferrer noopener" }.

Após fazer o download do arquivo, importe-o para o **MongoDB** através da ferramenta `mongoimport`. No seu terminal, utilize o seguinte comando (lembre-se de substituir o caminho do arquivo):

```language-bash
mongoimport --db class --collection superheroes <caminho_do_arquivo>
```

Pronto! Você já tem uma base de dados com 734 super-heróis. Para conferir, conecte-se à instância do seu banco de dados utilizando o **Mongo Shell** e execute os seguintes comandos:

```language-js
use class;

db.superheroes.count();
```

Os documentos têm a seguinte estrutura:

```language-js
{
    "_id" : ObjectId("5e4ed2b2866be74b5b26ebf1"),
    "name" : "Abin Sur",
    "alignment" : "good",
    "gender" : "Male",
    "race" : "Ungaran",
    "aspects" : {
        "eyeColor" : "blue",
        "hairColor" : "No Hair",
        "skinColor" : "red",
        "height" : 185,
        "weight" : 40.82
    },
    "publisher" : "DC Comics"
}
```

##### Exercícios

O MongoDb possui diversas ferramentas, como, por exemplo, `mongo`, `mongosh`, `Compass` e outras ferramentas de terceiros.
Você pode utilizar o que achar melhor para executar as _queries_, o importante é realizá-las.

**Exercício 1:** Inspecione um documento para que você se familiarize com eles. Entenda os campos e os níveis existentes no documento escolhido.

**Exercício 2:** Selecione todos os super-heróis com menos de 1.80m de altura. Lembre-se de que essa informação está gravada em centímetros.

**Exercício 3:** Retorne o total de super-heróis menores que 1.80m.

**Exercício 4:** Retorne o total de super-heróis com até 1.80m.

**Exercício 5:** Selecione um super-herói com 2.00m ou mais de altura.

**Exercício 6:** Retorne o total de super-heróis com 2.00m ou mais.

**Exercício 7:** Selecione todos os super-heróis que têm olhos verdes.

**Exercício 8:** Retorne o total de super-heróis com olhos azuis.

**Exercício 9:** Utilizando o operador `$in`, selecione todos os super-heróis com cabelos pretos ou carecas (`"No Hair"`).

**Exercício 10:** Retorne o total de super-heróis com cabelos pretos ou carecas (`"No Hair"`).

**Exercício 11:** Retorne o total de super-heróis que não tenham cabelos pretos ou não sejam carecas.

**Exercício 12:** Utilizando o operador `$not`, retorne o total de super-heróis que não tenham mais de 1.80m de altura.

**Exercício 13:** Selecione todos os super-heróis que **não** sejam **humanos** e **não** sejam maiores do que **1.80m**.

**Exercício 14:** Selecione todos os super-heróis com **1.80m** ou **2.00m** de altura e que **sejam publicados** pela **Marvel Comics**.

**Exercício 15:** Selecione todos os super-heróis que **pesem** entre **80kg** e **100kg**, sejam **Humanos** ou **Mutantes** e **não sejam publicados** pela **DC Comics**.

**Exercício 16:** Retorne o total de documentos que **não** contêm o campo **race**.

**Exercício 17:** Retorne o total de documentos que **contêm** o campo **hairColor**.

**Exercício 18:** Remova **apenas um** documento publicado pela **Sony Pictures**.

**Exercício 19:** Remova todos os documentos **publicados** pelo **George Lucas**.

---

## Recursos adicionais (opcional)

* [Query and Projection Operators](https://docs.mongodb.com/manual/reference/operator/query/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Collection Methods](https://docs.mongodb.com/manual/reference/method/js-collection/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
