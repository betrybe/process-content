## O que vamos aprender?

Hoje, você vai conhecer uma parte muito interessante e importante para vários tipos de operações no **MongoDB**. Você vai entender o que é, para que serve e como utilizar o `Aggregation Framework`.

---

### Você será capaz de:

* Filtrar documentos com o estágio `$match`;

* Limitar os resultados com `$limit`;

* Juntar dados de uma ou mais coleções com o `$lookup`;

* Fazer agrupamentos com o `$group`;

* Trabalhar com _arrays_ com o `$unwind`;

* Controlar a exibição de campos com o `$project`.

---

## Por que isso é importante?

Você deve ter notado que até aqui não foram feitas operações de agrupamento. Isso não foi feito até o momento porque o **MongoDB** não permite que operações desse tipo sejam feitas simplesmente através do método `find()`. Para isso, e para muitas outras coisas, existe o `Aggregation Framework`.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Introdução

O **Aggregation Framework** é um recurso muito interessante do **MongoDB**. Totalmente nativo e escrito em **C++**, ele oferece um conjunto de ferramentas para realizar operações muito mais complexas do que as vistas até aqui.

Basicamente, as operações de **agregação** processam dados e retornam resultados calculados. Essas operações podem agrupar valores de múltiplos **documentos** ou **coleções**, executar uma variedade de operações nesses dados agrupados e, por fim, retornar um único resultado. O **MongoDB** fornece três caminhos para executar operações de agregação: **aggregation pipeline**, **map-reduce function** e **single purpose aggregation methods**. Neste módulo, você se aprofundará no aggregation pipeline, o método mais utilizado e recomendado pela **MongoDB**.

### Aggregation Pipeline

O **Aggregation Framework** foi modelado sob o conceito de processamento de dados por meio de _pipelines_, ou seja, um **"funil"**. Um _pipeline_ contém múltiplos estágios. Os documentos entram nesse "funil" e vão se transformando à medida que vão passando por esses estágios até chegarem ao estágio final, com um resultado "agregado". Veja um exemplo desses estágios [neste vídeo.](https://docs.mongodb.com/manual/_images/agg-pipeline.mp4) {: .external-link target="_blank" rel="noreferrer noopener" }

No exemplo do vídeo, temos a seguinte operação:

```language-javascript
db.orders.aggregate([
  { $match: { status: "A" } },
  { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
]);
```

Essa operação possui dois estágios:

**Primeiro Estágio**: O estágio `$match` filtra os documentos pelo campo `status`, e passam para o próximo estágio somente os documentos que têm `status` igual a `"A"`.

**Segundo Estágio**: O estágio `$group` agrupa os documentos pelo campo `cust_id` para calcular a **soma** dos valores do campo `amount` para cada `cust_id` único.

Note que a sintaxe é como a de uma _query_ em **MQL**. O que aparece de novo é justamente o método `aggregate`. Esse método recebe como primeiro parâmetro um _array_ de documentos, que nada mais são do que os estágios do _pipeline_. Você pode ter quantos estágios forem necessários dentro do mesmo `aggregate`.

Um estágio do _pipeline_, por mais básico que seja, já consegue fornecer filtros que atuam como _queries_ e podem realizar **transformações de documentos** que modificam a forma de saída do documento no estágio.

Outras operações do _pipeline_ fornecem ferramentas para agrupamento e ordenação de documentos por campos específicos, bem como ferramentas para agregar conteúdos de _arrays_ (incluindo _arrays_ de documentos). Os estágios do _pipeline_ podem utilizar [operadores](https://docs.mongodb.com/manual/reference/operator/aggregation/#aggregation-expression-operators) {: .external-link target="_blank" rel="noreferrer noopener" } para tarefas que calculam médias ou concatenam _strings_, por exemplo.

Para melhorar a performance durante os estágios, o **aggregation pipeline** pode utilizar índices e tem também uma fase interna de otimização.

Antes de começar, crie um banco de dados chamado `agg_example` e rode a `query` abaixo. Ele será necessário para os exercícios de fixação.

```language-javascript
db.transactions.insertMany([
  { value: 5900, from: "Dave America", to: "Ned Flanders", bank: 'International' },
  { value: 1000, from: "Mark Zuck", to: "Edna Krabappel", bank: 'FloridaBank' },
  { value: 209, from: "Lisa Simpson", to: "Dave America", bank: 'bankOfAmerica' },
  { value: 10800, from: "Arnold Schuz", to: "Mark Zuck", bank: 'JPMorgan' },
  { value: 850, from: "Barney Gumble", to: "Lisa Simpson", bank: 'Citigroup' },
  { value: 76000, from: "Ned Flanders", to: "Edna Krabappel", bank: 'JPMorgan' },
  { value: 1280, from: "Dave America", to: "Homer Simpson", bank: 'Citigroup' },
  { value: 7000, from: "Arnold Schuz", to: "Ned Flanders", bank: 'International' },
  { value: 59020, from: "Homer Simpson", to: "Lisa Simpson", bank: 'International' },
  { value: 100, from: "Mark Zuck", to: "Barney Gumble", bank: 'floridaBank' },
]);
```

Agora que você já tem uma boa ideia do que é o **aggregation pipeline**, vamos explorar alguns de seus estágios para ver todo o seu poder! 😉

### Operador $match

O estágio representado pelo operador `$match` filtra os documentos da mesma maneira que os filtros no método `find()`.

É recomendado sempre priorizar o `$match` o mais "cedo" possível no `pipeline`. Isso melhora muito a performance, uma vez que o `$match` limita o número de documentos passados para o próximo estágio. E se o `$match` for utilizado bem no começo do _pipeline_, a _query_ tem a vantagem da utilização de índices.

Veja esses documentos na coleção `articles`:

```language-javascript
{ _id: ObjectId("512bc95fe835e68f199c8686"), author: "dave", score: 80, views: 100 },
{ _id: ObjectId("512bc962e835e68f199c8687"), author: "dave", score: 85, views: 521 },
{ _id: ObjectId("55f5a192d4bede9ac365b257"), author: "ahn", score: 60, views: 1000 },
{ _id: ObjectId("55f5a192d4bede9ac365b258"), author: "li", score: 55, views: 5000 },
{ _id: ObjectId("55f5a1d3d4bede9ac365b259"), author: "annT", score: 60, views: 50 },
{ _id: ObjectId("55f5a1d3d4bede9ac365b25a"), author: "li", score: 94, views: 999 },
{ _id: ObjectId("55f5a1d3d4bede9ac365b25b"), author: "ty", score: 95, views: 1000 }
```

##### Exemplo 1: Igualdade simples

Vamos fazer uma operação utilizando o operador `$match` com igualdade simples:

```language-javascript
db.articles.aggregate(
  [{ $match : { author : "dave" } }]
);
```

A operação citada seleciona todos os documentos em que o campo `author` seja igual a `dave`. Note que a sintaxe do filtro é exatamente igual à utilizada como filtro no método `find()`. A **agregação** retornará os seguintes documentos:

```language-javascript
{ _id: ObjectId("512bc95fe835e68f199c8686"), author: "dave", score: 80, views: 100 }
{ _id: ObjectId("512bc962e835e68f199c8687"), author: "dave", score: 85, views: 521 }
```

##### Exemplo 2: Igualdade complexa

É possível, dentro do `match`, utilizar operadores como `or`, `and`, `in` etc.

```language-javascript
db.articles.aggregate(
  [
    {
      $match: {
        $or: [
          { score: { $gt: 70, $lt: 90 } },
          { views: { $gte: 1000 } }
        ]
      }
    }
  ]
);
```

Nessa operação de agregação, o primeiro estágio seleciona todos os documentos da coleção `articles` em que o `score` seja maior que `70` e menor que `90`, ou o campo `views` seja maior ou igual a `1000`:

```language-javascript
{ "_id" : ObjectId("512bc95fe835e68f199c8686"), "author" : "dave", "score" : 80, "views" : 100 }
{ "_id" : ObjectId("512bc962e835e68f199c8687"), "author" : "dave", "score" : 85, "views" : 521 }
{ "_id" : ObjectId("55f5a192d4bede9ac365b257"), "author" : "ahn", "score" : 60, "views" : 1000 }
{ "_id" : ObjectId("55f5a192d4bede9ac365b258"), "author" : "li", "score" : 55, "views" : 5000 }
{ "_id" : ObjectId("55f5a1d3d4bede9ac365b25b"), "author" : "ty", "score" : 95, "views" : 1000 }
```

### Operador $limit

O operador `$limit` limita o número de documentos que será passado para o próximo estágio do pipeline. Ele sempre recebe um valor do tipo inteiro e positivo.

Limitar o número de documentos numa operação de agregação na coleção `articles` é bem simples:

```language-javascript
db.articles.aggregate(
  [
    { $limit : 5 }
  ]
);
```

Essa operação retorna apenas `5` documentos.

#### Exercícios de fixação

Utilizando o banco de dados `agg_example`, faça os seguintes exercícios:

1. Selecione todas as transações feitas pelo cliente chamado "Dave America";

2. Selecione todas as transações com o valor entre 700 e 6000, ou que sejam recebidas pela cliente "Lisa Simpson";

3. Selecione três transações com o valor acima de 1000.

### Operador $lookup

O operador `$lookup` foi introduzido na versão `3.2` do **MongoDB** e vem evoluindo desde então. Com ele, é possível juntar documentos de outra coleção (`join`). Como resultado dessa junção, um elemento do tipo _array_ é adicionado a cada documento da coleção de entrada, contendo os documentos que deram "match" na coleção com a qual se faz o "join".

Existem quatro parâmetros básicos para montar um `$lookup`:

* `from`: uma coleção no mesmo database para executar o `join`;
* `localField`: o campo da coleção de onde a operação de agregação está sendo executada. Será comparado por igualdade com o campo especificado no parâmetro `foreingField`;
* `foreingField`: o campo da coleção especificada no parâmetro `from` que será comparado com o campo `localField` por igualdade simples;
* `as`: o nome do novo _array_ que será adicionado.

##### Join com igualdade simples

Considere os seguintes documentos nas coleções `orders` e `inventory`:

```language-javascript
// orders
{ _id: 1, item: "almonds", price: 12, quantity: 2 },
{ _id: 2, item: "pecans", price: 20, quantity: 1 },
{ _id: 3 }
```

```language-javascript
// inventory
{ _id: 1, sku: "almonds", description: "product 1", instock: 120 },
{ _id: 2, sku: "bread", description: "product 2", instock: 80 },
{ _id: 3, sku: "cashews", description: "product 3", instock: 60 },
{ _id: 4, sku: "pecans", description: "product 4", instock: 70 },
{ _id: 5, sku: null, description: "Incomplete" },
{ _id: 6 }
```

Imagine que você queria retornar em uma única _query_ os documentos das duas coleções mencionadas. A primeira coisa é encontrar um campo em comum entre elas. Nesse caso, seriam os campos `item` (coleção `orders`) e `sku` (coleção `inventory`). Quando cruzados na operação a seguir, um novo campo, chamado `inventory_docs`, será adicionado ao resultado final:

```language-javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "inventory",
      localField: "item",
      foreignField: "sku",
      as: "inventory_docs"
    }
  }
]);
```

Como resultado do _pipeline_, os documentos abaixo serão retornados:

```language-javascript
{
  "_id" : 1,
  "item" : "almonds",
  "price" : 12,
  "quantity" : 2,
  "inventory_docs" : [
    {
      "_id" : 1,
      "sku" : "almonds",
      "description" : "product 1",
      "instock" : 120
    }
  ]
}
{
  "_id" : 2,
  "item" : "pecans",
  "price" : 20,
  "quantity" : 1,
  "inventory_docs" : [
    {
      "_id" : 4,
      "sku" : "pecans",
      "description" : "product 4",
      "instock" : 70
    }
  ]
}
{
  "_id" : 3,
  "inventory_docs" : [
    {
      "_id" : 5,
      "sku" : null,
      "description" : "Incomplete"
    },
    {
      "_id" : 6
    }
  ]
}
```

Embora não seja possível realizar uma operação idêntica, uma _query_ equivalente em `SQL` seria algo do tipo:

```language-sql
SELECT *, inventory_docs
FROM orders
WHERE inventory_docs IN (
  SELECT *
  FROM inventory
  WHERE sku = orders.item
);
```

##### Aplicando condições ao Join

Você pode incrementar ainda mais o `$lookup` adicionando a ele expressões mais elaboradas e aplicando vários operadores que você já conhece. Também pode referenciar campos dos documentos de entrada para serem utilizados nas condições e até mesmo montar um _pipeline_ dentro dele.

Para isso, existem mais dois parâmetros, ambos opcionais:

* `let`: define as variáveis que serão utilizadas no estágio _pipeline_ dentro do `$lookup`. É necessário porque o estágio _pipeline_ não consegue acessar diretamente os campos dos documentos de entrada, então esses campos precisam ser definidos previamente e transformados em variáveis;

* `pipeline`: define as condições ou o _pipeline_ que será executado na coleção de junção. Se você quiser todos os documentos da coleção de junção, é só especificá-lo como vazio (`[]`).

Considere os seguintes documentos na coleção `orders`:

```language-javascript
{ _id: 1, item: "almonds", price: 12, ordered: 2 },
{ _id: 2, item: "pecans", price: 20, ordered: 1 },
{ _id: 3, item: "cookies", price: 10, ordered: 60 }
```

E os seguintes documentos na coleção `warehouses`:

```language-javascript
{ _id: 1, stock_item: "almonds", warehouse: "A", instock: 120 },
{ _id: 2, stock_item: "pecans", warehouse: "A", instock: 80 },
{ _id: 3, stock_item: "almonds", warehouse: "B", instock: 60 },
{ _id: 4, stock_item: "cookies", warehouse: "B", instock: 40 },
{ _id: 5, stock_item: "cookies", warehouse: "A", instock: 80 }
```

A operação a seguir junta todos os documentos da coleção `orders` com a coleção `warehouse` através do campo `item` se a quantidade em estoque (`instock`) for suficiente para cobrir a quantidade vendida (`ordered`). Os documentos que dão _match_ são colocados no campo `stockdata`.

```language-javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "warehouses",
      let: { order_item: "$item", order_qty: "$ordered" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: [ "$stock_item",  "$$order_item" ] },
                { $gte: [ "$instock", "$$order_qty" ] }
              ]
            }
          }
        },
        { $project: { stock_item: 0, _id: 0 } }
      ],
      as: "stockdata"
    }
  }
]);
```

Note que, dentro do estágio _pipeline_, temos um operador `$match` que utiliza uma expressão (`$expr`). Esta, por sua vez, utiliza o operador `$and`. Dentro do `$and`, são utilizados operadores de igualdade (`$eq`) e de comparação (`$gte`). O símbolo `$` é utilizado para se referir aos campos da coleção `warehouse` (a coleção de junção), enquanto `$$` se refere às variáveis definidas no estágio `let` (os campos da coleção `orders`). Os campos `_id` e `stock_item` da coleção de join (`warehouse`) são excluídos com o uso do operador `$project`.

Como resultado, os documentos abaixo serão retornados:

```language-javascript
{
  "_id" : 1,
  "item" : "almonds",
  "price" : 12,
  "ordered" : 2,
  "stockdata" : [
    {
      "warehouse" : "A",
      "instock" : 120
    },
    {
      "warehouse" : "B",
      "instock" : 60
    }
  ]
}
{
  "_id" : 2,
  "item" : "pecans",
  "price" : 20,
  "ordered" : 1,
  "stockdata" : [
    {
      "warehouse" : "A",
      "instock" : 80
    }
  ]
}
{
  "_id" : 3,
  "item" : "cookies",
  "price" : 10,
  "ordered" : 60,
  "stockdata" : [
    {
      "warehouse" : "A",
      "instock" : 80
    }
  ]
}
```

Em um novo paralelo com a linguagem `SQL`, teríamos algo como o seguinte:

```language-sql
SELECT *, stockdata
FROM orders
WHERE stockdata IN (
  SELECT warehouse, instock
  FROM warehouses
  WHERE stock_item = orders.item
  AND instock >= orders.ordered
);
```

#### Exercícios de fixação

Utilizando o banco de dados `agg_example`, adicione a seguinte `collection` e faça os exercícios:

```language-javascript
db.clients.insertMany([
  { name: "Dave America", State: "Florida" },
  { name: "Ned Flanders", State: "Alasca" },
  { name: "Mark Zuck", State: "Texas" },
  { name: "Edna Krabappel", State: "Montana" },
  { name: "Arnold Schuz", State: "California" },
  { name: "Lisa Simpson", State: "Florida" },
  { name: "Barney Gumble", State: "Texas" },
  { name: "Homer Simpson", State: "Florida" },
]);
```

1. Selecione todos os clientes com as suas respectivas transações feitas;

2. Selecione quatro clientes com as suas respectivas transações recebidas;

3. Selecione todos os cliente do estado da "Florida" e suas respectivas transações recebidas.

### Operador $group

Este é provavelmente o operador que você mais utilizará nas operações de agregação. Com ele é possível agrupar valores de diversas formas, desde um "distinct" simples até cálculos mais elaborados com a ajuda de outros operadores.

O principal parâmetro do `$group` é o `_id` (que não tem nada a ver com o campo `_id` das coleções). Neste caso, ele é responsável por conter o campo ou os campos que serão utilizados no agrupamento.

No documento de saída, o `_id` contém um agrupamento exclusivo para cada valor. Esses documentos de saída também podem conter campos **calculados**, que conterão valores de alguma [expressão de acumulação.](https://docs.mongodb.com/manual/reference/operator/aggregation/group/index.html#accumulators-group) {: .external-link target="_blank" rel="noreferrer noopener" }

##### Operador de Acumulação

A seguir há uma lista com alguns dos operadores de acumulação mais utilizados:

* `$addToSet`: retorna um _array_ com os valores únicos da expressão para cada grupo;
* `$avg`: retorna a média de valores numéricos. Valores não numéricos são ignorados;
* `$first`: retorna um valor do primeiro documento de cada grupo;
* `$last`: retorna um valor do último documento de cada grupo;
* `$max`: retorna o maior valor de cada grupo;
* `$sum`: retorna a soma de valores numéricos. Valores não numéricos são ignorados.

Veja alguns exemplos considerando os seguintes documentos na coleção `sales`:

```language-javascript
{
  _id: 1,
  item: "abc",
  price: NumberDecimal("10"),
  quantity: NumberInt("2"),
  date: ISODate("2014-03-01T08:00:00Z")
},
{
  _id: 2,
  item: "jkl",
  price: NumberDecimal("20"),
  quantity: NumberInt("1"),
  date: ISODate("2014-03-01T09:00:00Z")
},
{
  _id: 3,
  item: "xyz",
  price: NumberDecimal("5"),
  quantity: NumberInt( "10"),
  date: ISODate("2014-03-15T09:00:00Z")
},
{
  _id: 4,
  item: "xyz",
  price: NumberDecimal("5"),
  quantity:  NumberInt("20"),
  date: ISODate("2014-04-04T11:21:39.736Z")
},
{
  _id: 5,
  item: "abc",
  price: NumberDecimal("10"),
  quantity: NumberInt("10"),
  date: ISODate("2014-04-04T21:23:13.331Z")
},
{
  _id: 6,
  item:"def",
  price: NumberDecimal("7.5"),
  quantity: NumberInt("5" ),
  date: ISODate("2015-06-04T05:08:13Z")
},
{
  _id: 7,
  item: "def",
  price: NumberDecimal("7.5"),
  quantity: NumberInt("10"),
  date: ISODate("2015-09-10T08:43:00Z")
},
{
  _id: 8,
  item: "abc",
  price: NumberDecimal("10"),
  quantity: NumberInt("5" ),
  date: ISODate("2016-02-06T20:20:13Z")
}
```

##### Exemplo 1: Contando o número de documentos

Você pode utilizar o operador `$group` para contar o número de documentos da coleção `sales`:

```language-javascript
db.sales.aggregate([
  {
    $group: {
      _id: null,
      count: { $sum: 1 }
    }
  }
]);
```

Note que o `_id` está setado como `null`, porque nesse caso queremos todos os documentos. O retorno dessa operação é:

```language-javascript
{ "_id" : null, "count" : 8 }
```

Você também poderia utilizar o método `count()` para realizar essa operação:

```language-javascript
db.sales.count();
```

O equivalente em `SQL` para essa operação seria:

```language-sql
SELECT COUNT(*) AS count FROM sales;
```

##### Exemplo 2: Retornando valores distintos

O operador `$group` também pode ser utilizado para encontrar os valores distintos de um campo. Por exemplo, se quiser saber todos os valores únicos do campo `item` e quantos são, faça como o exemplo seguinte:

```language-javascript
db.sales.aggregate([
  {
    $group : {
      _id : "$item",
      count: { $sum: 1}
    }
  }
]);
```

Note que o campo deve ser precedido de `$`. O resultado da operação é:

```language-javascript
{ "_id" : "abc", "count" : 3 }
{ "_id" : "def", "count" : 2 }
{ "_id" : "xyz", "count" : 2 }
{ "_id" : "jkl", "count" : 1 }
```

##### Exemplo 3: Somando valores

Para saber o valor das vendas, você deve utilizar o operador `$sum`, que, por sua vez, aceita mais modificadores. No exemplo que se segue, multiplica-se o valor do campo `price` pelo valor do campo `quantity`:

```language-javascript
db.sales.aggregate([
  {
    $group : {
      _id : "$item",
      totalSaleAmount: {
        $sum: {
          $multiply: ["$price", "$quantity"]
        }
      }
    }
  }
]);
```

Retornando os seguintes documentos:

```language-javascript
{ "_id" : "def", "totalSaleAmount" : NumberDecimal("112.5") }
{ "_id" : "abc", "totalSaleAmount" : NumberDecimal("170") }
{ "_id" : "jkl", "totalSaleAmount" : NumberDecimal("20") }
{ "_id" : "xyz", "totalSaleAmount" : NumberDecimal("150") }
```

O equivalente em `SQL` seria:

```language-sql
SELECT item, SUM(price * quantity) AS totalSaleAmount
FROM sales
GROUP BY item;
```

##### Exemplo 4: Having

Também é possível realizar operações equivalentes ao `HAVING` do `SQL`, que nada mais é que um filtro depois de um agrupamento. Por exemplo, se você quiser manter o agrupamento anterior, mas saber apenas as vendas que possuem valores maiores do que `100`, é só adicionar mais um estágio no `pipeline`:

```language-javascript
db.sales.aggregate([
  // Primeiro Estágio
  {
    $group: {
      _id : "$item",
      totalSaleAmount: {
        $sum: {
          $multiply: ["$price", "$quantity"]
        }
      }
    }
  },
  // Segundo Estágio
  {
    $match: { "totalSaleAmount": { $gte: 100 } }
  }
]);
```

 Trazendo apenas os seguintes documentos:

```language-javascript
{ "_id" : "abc", "totalSaleAmount" : NumberDecimal("170") }
{ "_id" : "xyz", "totalSaleAmount" : NumberDecimal("150") }
{ "_id" : "def", "totalSaleAmount" : NumberDecimal("112.5") }
```

Em `SQL`, seria algo como:

```language-sql
SELECT item, SUM(price * quantity) AS totalSaleAmount
FROM sales
GROUP BY item
HAVING totalSaleAmount >= 100;
```

##### Exemplo 5: Agrupando por `null`

Você pode executar operações matemáticas em todos os documentos de uma coleção. Basta passar `null` no `_id` e seguir com os operadores de acumulação.

No exemplo a seguir, a operação de agregação retornará um documento com o valor total da venda, a quantidade média de itens vendidos e o total de vendas:

```language-javascript
db.sales.aggregate([
  {
    $group : {
      _id : null,
      totalSaleAmount: {
        $sum: { $multiply: ["$price", "$quantity"] }
      },
      averageQuantity: { $avg: "$quantity" },
      count: { $sum: 1 }
    }
  }
]);
```

O retorno então será:

```language-javascript
{
  "_id" : null,
  "totalSaleAmount" : NumberDecimal("452.5"),
  "averageQuantity" : 7.875,
  "count" : 8
}
```

E seu equivalente em `SQL`:

```language-sql
SELECT SUM(price * quantity) AS totalSaleAmount,
       AVG(quantity)         AS averageQuantity,
       COUNT(*)              AS count
FROM sales;
```

#### Exercícios de fixação

Utilizando o banco de dados `agg_example`, faça os exercícios:

1. Selecione todos os bancos;

2. Selecione o valor total das transações em cada banco e quantas são;

3. Selecione o valor total de transações;

4. Selecione os bancos que têm o valor total de transações maior que 1000.

### Operador $unwind

O operador `$unwind` "desconstrói" um campo _array_ do documento de entrada e gera como saída um documento para cada elemento do _array_. Cada documento de saída é o documento de entrada com o valor do campo _array_ substituído por um elemento do _array_.

Na prática fica mais fácil de entender. Insira o seguinte documento na coleção `inventory`:

```language-javascript
db.inventory.insertOne({ _id: 7, item: "ABC1", sizes: ["S", "M", "L"] });
```

E agora, utilizando o `$unwind` como um estágio do `pipeline`:

```language-javascript
db.inventory.aggregate([{ $unwind : "$sizes" }]);
```

O retorno é o seguinte:

```language-javascript
{ "_id" : 7, "item" : "ABC1", "sizes" : "S" }
{ "_id" : 7, "item" : "ABC1", "sizes" : "M" }
{ "_id" : 7, "item" : "ABC1", "sizes" : "L" }
```

Note que temos a "expansão" do _array_ `sizes`, e a saída são três documentos com os valores `_id` e `item` preservados.

Você verá mais exemplos com o operador `$unwind` quando "juntarmos" tudo em vários estágios!

### Operador $project

O operador `$project` tem como uma de suas funções passar adiante no `pipeline` apenas alguns campos dos documentos vindos do estágio anterior, fazendo isso por meio de uma "projeção", como no método `find()`. Mas aqui temos uma diferença: esses campos podem ser novos, sendo resultado de um cálculo ou de uma concatenação.

Assim como numa projeção comum, o único campo que precisa ser negado explicitamente é o `_id`.

Se você especificar um campo que não existe, o `$project` simplesmente ignorará esse campo, sem afetar em nada a projeção.

Veja alguns exemplos, considerando este documento da coleção `books`.

```language-javascript
{
  _id: 1,
  title: "abc123",
  isbn: "0001122223334",
  author: { last: "zzz", first: "aaa" },
  copies: 5
}
```


##### Exemplo 1: Incluindo campos específicos

Para incluir apenas os campos `_id`, `title` e `author` no documento de saída, utilize o operador `$project` da seguinte maneira:

```language-javascript
db.books.aggregate(
  [
    {
      $project : {
        title : 1,
        author : 1
      }
    }
  ]
);
```

##### Exemplo 2: Excluindo o campo `_id`

Como você já viu, o campo `_id` é padrão e é o único que necessita de uma negação explícita para que não seja incluído no documento de saída:

```language-javascript
db.books.aggregate([
  {
    $project : {
      _id: 0,
      title : 1,
      author : 1
    }
  }
]);
```

##### Exemplo 3: Excluindo outros campos

Quando você nega um campo específico, todos os outros serão incluídos no documento de saída. O exemplo abaixo exclui do documento de saída apenas o campo `copies`:

```language-javascript
db.books.aggregate([
  {
    $project : {
      copies: 0
    }
  }
]);
```

##### Exemplo 4: Excluindo campos em subdocumentos

Para documentos _embedados_, seguimos os mesmos conceitos de _dot notation_:

```language-javascript
db.books.aggregate([
  {
    $project : {
      "author.first": 0,
      copies: 0
    }
  }
]);
```

Para inclusão de campos _embedados_, utilize a mesma lógica, apenas substituindo o `0` por `1`.

##### Exemplo 5: Incluindo campos calculados

A operação a seguir adiciona os **novos** campos `isbn`, `lastname` e `copiesSold`:

```language-javascript
db.books.aggregate([
  {
    $project: {
      title: 1,
      isbn: {
        prefix: { $substr: ["$isbn", 0, 3] },
        group: { $substr: ["$isbn", 3, 2] },
        publisher: { $substr: ["$isbn", 5, 4] },
        title: { $substr: ["$isbn", 9, 3] },
        checkDigit: { $substr: ["$isbn", 12, 1] }
      },
      lastName: "$author.last",
      copiesSold: "$copies"
    }
  }
]);
```

Depois disso, o documento terá o seguinte formato:

```language-javascript
{
  "_id" : 1,
  "title" : "abc123",
  "isbn" : {
    "prefix" : "000",
    "group" : "11",
    "publisher" : "2222",
    "title" : "333",
    "checkDigit" : "4"
  },
  "lastName" : "zzz",
  "copiesSold" : 5
}
```

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Vamos para o Slack, onde estará disponível o link da nossa aula ao vivo de hoje.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

---

### Agora, a prática

Para esta etapa, utilizaremos um _dataset_ que contém três coleções: `clientes`, `produtos` e `vendas`. Utilize os comandos abaixo para importar essas coleções para o banco `erp`:

1. Faça o download dos arquivos `json`, clicando com o botão direito e escolhando a opção "Salvar como":
  * [clientes](/back-end/mongodb/aggregation-framework/part-1/clientes.json) {: .external-link target="_blank" rel="noreferrer noopener" }
  * [produtos](/back-end/mongodb/aggregation-framework/part-1/produtos.json) {: .external-link target="_blank" rel="noreferrer noopener" }
  * [vendas](/back-end/mongodb/aggregation-framework/part-1/vendas.json) {: .external-link target="_blank" rel="noreferrer noopener" }

2. Faça a importação para sua instância do MongoDB:

```language-bash
mongoimport --db erp <caminho_do_arquivo_clientes.json>
mongoimport --db erp <caminho_do_arquivo_produtos.json>
mongoimport --db erp <caminho_do_arquivo_vendas.json>
```

3. Conecte-se à sua instância e confira o número de documentos em cada coleção:

```language-javascript
use erp;
db.clientes.count(); // 499
db.produtos.count(); // 499
db.vendas.count(); // 4900
```

Com o dataset importado, é hora de colocar a mão na massa!

---

O MongoDb possui diversas ferramentas, como, por exemplo, `mongo`, `mongosh`, `Compass` e outras ferramentas de terceiros.
Você pode utilizar o que achar melhor para executar as _queries_, o importante é realizá-las.

**Exercício 1:** Utilizando o estágio `$match`, escreva uma agregação para retornar somente os clientes do sexo `"MASCULINO"`.

**Exercício 2:** Utilizando o estágio `$match`, escreva uma agregação para retornar somente os clientes do sexo `"FEMININO"` e com data de nascimento entre os anos de `1995` e `2005`.

**Exercício 3:** Utilizando o estágio `$match`, escreva uma agregação para retornar somente os clientes do sexo `"FEMININO"` e com data de nascimento entre os anos de `1995` e `2005`, limitando a quantidade de documentos retornados em `5`.

**Exercício 4:** Conte quantos clientes do estado `SC` existem na coleção. Retorne um documento em que o campo `_id` contenha a UF e outro campo com o total.

**Exercício 5:** Agrupe os clientes por `sexo`. Retorne o total de clientes de cada sexo no campo `total`.

**Exercício 6:** Agrupe os clientes por `sexo` e `uf`. Retorne o total de clientes de cada sexo no campo `total`.

**Exercício 7**: Utilizando a mesma agregação do exercício anterior, adicione um estágio de projeção para modificar os documentos de saída, de forma que se pareçam com o documento a seguir (não se importe com a ordem dos campos):

```language-javascript
{
  "estado": "SP",
  "sexo": "MASCULINO",
  "total": 100
}
```

**Exercício 8**: Descubra quais são os `5` clientes que gastaram o maior valor.

**Exercício 9**: Descubra quais são os `10` clientes que gastaram o maior valor no ano de `2019`.

**Exercício 10**: Descubra quantos clientes compraram mais de `5` vezes. Retorne um documento que contenha somente o campo `clientes` com o total de clientes.

Dica: O operador [`$count`](https://docs.mongodb.com/manual/reference/operator/aggregation/count/#pipe._S_count) {: .external-link target="_blank" rel="noreferrer noopener" } pode simplificar sua _query_.

**Exercício 11**: Descubra quantos clientes compraram menos de **três** vezes entre os meses de `Janeiro de 2020` e `Março de 2020`.

**Exercício 12**: Descubra quais as **três** `uf`s que mais compraram no ano de `2020`. Retorne os documentos no seguinte formato:

```language-javascript
{
  "totalVendas": 10,
  "uf": "SP"
}
```

**Exercício 13**: Encontre qual foi o total de vendas e a média de vendas de cada `uf` no ano de `2019`. Ordene os resultados pelo nome da `uf`. Retorne os documentos no seguinte formato:

```language-javascript
{
  "_id": "MG",
  "mediaVendas": 9407.129225352113,
  "totalVendas": 142
}
```

---

## Recursos adicionais (opcional)

* [Pipeline Operators and Indexes](https://docs.mongodb.com/manual/core/aggregation-pipeline/#aggregation-pipeline-operators-and-performance) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Aggregation Pipeline Optimization](https://docs.mongodb.com/manual/core/aggregation-pipeline-optimization/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Perform a Single Equality Join with $lookup](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/index.html#lookup-single-equality) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Use $lookup with an Array](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/index.html#unwind-example) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Projection](https://docs.mongodb.com/manual/reference/operator/aggregation/project/index.html) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
