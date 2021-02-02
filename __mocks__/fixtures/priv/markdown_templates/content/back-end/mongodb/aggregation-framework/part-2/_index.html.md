## O que vamos aprender?

Hoje você continuará estudando mais estágios e expressões do `aggregation pipeline`. Você trabalhará com operações matemáticas, verá mais combinações de projeções e operações em campos e *strings*.

---

### Você será capaz de:

* Executar operações de soma e subtração de valores em um *pipeline*;
* Trabalhar com datas em *pipelines*, adicionando ou subtraindo tempo;
* Executar operações de multiplicação e divisão em *pipelines*, utilizando valores fixos ou variáveis;
* Adicionar novos campos aos documentos durante um *pipeline*.

---

## Por que isso é importante?

As operações de agregação são parte essencial no dia a dia de uma aplicação. Saber como utilizar bem os operadores para formatar os dados e tirar leituras e *insights* deles deve fazer parte do seu conhecimento. Operações aritméticas também são importantes para não sobrecarregar a aplicação com uma carga desnecessária de dados para processamento. Com o `aggregation pipeline`, é possível utilizar a camada de banco de dados para realizar esse processamento!

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

Antes de começar, crie um banco de dados chamado `storage` e rode a `query` abaixo. Ele será necessário para os exercícios de fixação.

```language-javascript
db.products.insertMany([
  { "name": "Ball", "purchase_price": 7.6, "taxes": 1.9, "sale_price": 12.5, "quantity": 5 },
  { "name": "Baseball bat", "purchase_price": 18.5, "taxes": 5.3, "sale_price": 39.9, "quantity": 12 },
  { "name": "Sneakers", "purchase_price": 10.4, "taxes": 1.50, "sale_price": 14.9, "quantity": 3 },
  { "name": "Gloves", "purchase_price": 2.85, "taxes": 0.90, "sale_price": 5.70, "quantity": 34 },
  { "name": "Jacket", "purchase_price": 28.9, "taxes": 10.80, "sale_price": 59.9, "quantity": 20 },
  { "name": "Mousepad", "purchase_price": 16.6, "taxes": 3.40, "sale_price": 29.9, "quantity": 8 },
  { "name": "Monitor", "purchase_price": 119.9, "taxes": 39.20, "sale_price": 240.6, "quantity": 11 },
]);
```

### Expressão $add

Com a expressão `$add`, é possível somar valores numéricos ou datas. Se um dos argumentos for do tipo `date`, o outro argumento será tratado como milissegundos e adicionado à data.

Considere os seguintes documentos na coleção `sales`:

```language-javascript
{ _id: 1, item: "abc", price: 10, fee: 2, date: ISODate("2014-03-01T08:00:00Z") },
{ _id: 2, item: "jkl", price: 20, fee: 1, date: ISODate("2014-03-01T09:00:00Z") },
{ _id: 3, item: "xyz", price: 5,  fee: 0, date: ISODate("2014-03-15T09:00:00Z") }
```

Utilizando a expressão `$add` no estágio `$project`, você pode criar um novo campo com o valor total somando os campos `price` e `fee`:

```language-javascript
db.sales.aggregate([
  { $project: { item: 1, total: { $add: ["$price", "$fee"] } } }
]);
```

A operação retorna o seguinte resultado:

```language-javascript
{ "_id" : 1, "item" : "abc", "total" : 12 }
{ "_id" : 2, "item" : "jkl", "total" : 21 }
{ "_id" : 3, "item" : "xyz", "total" : 5 }
```

Para valores do tipo `date`, um dos argumentos sempre será tratado como milissegundos. Imagine que você queira adicionar `3` dias ao valor do campo `date`. Você consegue fazer de duas maneiras. A primeira é passar em um dos argumentos o número equivalente a 3 dias em milissegundos (`2,592e+8`). A segunda é criar uma expressão que devolva esse número:

```language-javascript
db.sales.aggregate([
  { $project: { item: 1, billing_date: { $add: ["$date", 2.592e+8] } } }
]);
```

```language-javascript
db.sales.aggregate([
  { $project: { item: 1, billing_date: { $add: ["$date", 3 * 24 * 60 * 60000] } } }
]);
```

Note que as duas operações retornam o mesmo valor para o novo campo `billing_date`.

#### Exercício de fixação

Utilizando o banco de dados `storage`, faça o seguinte exercício:

1. Calcule qual o custo total de cada produto, considerando o preço de compra e os impostos.

### Expressão $subtract

Com a expressão `subtract`, podemos subtrair dois valores numéricos para retornar a diferença entre eles, ou duas datas para retornar a diferença entre elas em milissegundos. **O segundo argumento sempre será subtraído do primeiro**.

Considere os seguintes documentos na coleção `sales`:

```language-javascript
{
  _id: 1,
  item: "abc",
  price: 10,
  fee: 2,
  discount: 5,
  date: ISODate("2014-03-01T08:00:00Z")
},
{
  _id: 2,
  item: "jkl",
  price: 20,
  fee: 1,
  discount: 2,
  date: ISODate("2014-03-01T09:00:00Z")
}
```

Em uma única operação no estágio `$project`, podemos montar uma expressão um pouco mais complexa, utilizando `$add` para calcular o total e o `$subtract` para aplicar um desconto no subtotal:

```language-javascript
db.sales.aggregate([
  {
    $project: {
      item: 1,
      total: {
        $subtract: [
          { $add: ["$price", "$fee"] },
          "$discount"
        ]
      }
    }
  }
]);
```

Observe que um dos argumentos do `$subtract` é o resultado de uma expressão (`$add`) que soma dois campos da coleção (`price` e `fee`). O segundo argumento (valor a ser subtraído) recebe o campo `$discount`. Os seguintes documentos serão retornados:

```language-javascript
{ "_id" : 1, "item" : "abc", "total" : 7 }
{ "_id" : 2, "item" : "jkl", "total" : 19 }
```

É possível subtrair duas datas também. A operação a seguir utiliza a expressão `$subtract` para subtrair o valor do campo `date` da data corrente, utilizando a variável de sistema `NOW` (disponível a partir da versão 4.2 do **MongoDB**) e retorna a diferença em milissegundos:

```language-javascript
db.sales.aggregate([
  {
    $project: {
      item: 1,
      dateDifference: {
        $subtract: ["$$NOW", "$date"]
      }
    }
  }
]);
```

Alternativamente, você pode utilizar a função `Date()` para obter a data corrente:

```language-javascript
db.sales.aggregate([
  {
    $project: {
      item: 1,
      dateDifference: {
        $subtract: [new Date(), "$date"]
      }
    }
  }
]);
```

Você também pode utilizar milissegundos como argumento da subtração. A operação seguinte subtrai `5` minutos do campo `date`:

```language-javascript
db.sales.aggregate([
  {
    $project: {
      item: 1,
      dateDifference: {
        $subtract: ["$date", 5 * 60 * 1000]
      }
    }
  }
]);
```

#### Exercício de fixação

Utilizando o banco de dados `storage`, faça o seguinte exercício:

1. Calcule qual o lucro total de cada produto, considerando o preço de compra, os impostos e seu valor de venda.

### Expressão $ceil

A expressão `$ceil` retorna o menor número inteiro maior ou igual ao número especificado. Ela executa a [operação matemática `teto`](https://pt.wikipedia.org/wiki/Parte_inteira) {: .external-link target="_blank" rel="noreferrer noopener" }. Basicamente, é um arredondamento para "cima"!

Considere os seguintes documentos na coleção `samples`:

```language-javascript
{ _id: 1, value: 9.25 },
{ _id: 2, value: 8.73 },
{ _id: 3, value: 4.32 },
{ _id: 4, value: -5.34 }
```

A operação a seguir utiliza a expressão `$ceil` no estágio `$project` para retornar um novo campo chamado `ceilingValue`:

```language-javascript
db.samples.aggregate([
  { $project: { value: 1, ceilingValue: { $ceil: "$value" } } }
]);
```

O valor original também é retornado:

```language-javascript
{ "_id" : 1, "value" : 9.25, "ceilingValue" : 10 }
{ "_id" : 2, "value" : 8.73, "ceilingValue" : 9 }
{ "_id" : 3, "value" : 4.32, "ceilingValue" : 5 }
{ "_id" : 4, "value" : -5.34, "ceilingValue" : -5 }
```

### Expressão $floor

Já a expressão `$floor` retorna o maior número inteiro menor ou igual ao número especificado, ou seja, faz um arredondamento para baixo.

Considere os mesmos documentos da coleção `sample` utilizados no exemplo anterior. Se você aplicar a expressão `$floor` no estágio `$project`:

```language-javascript
db.samples.aggregate([
  { $project: { value: 1, floorValue: { $floor: "$value" } } }
]);
```

Terá o retorno do valor original e o calculado:

```language-javascript
{ "_id" : 1, "value" : 9.25, "floorValue" : 9 }
{ "_id" : 2, "value" : 8.73, "floorValue" : 8 }
{ "_id" : 3, "value" : 4.32, "floorValue" : 4 }
{ "_id" : 4, "value" : -5.34, "floorValue" : -6 }
```

Funções de arredondamento podem ser úteis em vários casos de cálculos na camada de banco de dados.

#### Exercícios de fixação

Utilizando o banco de dados `storage`, faça os seguintes exercícios:

1. Retorne o menor número inteiro relativo ao preço de venda de cada produto;

2. Retorne o maior número inteiro relativo ao lucro total sobre cada produto.

### Expressão $abs

A expressão `$abs` retorna o [valor absoluto](https://en.wikibooks.org/wiki/Arithmetic/Absolute_Values) {: .external-link target="_blank" rel="noreferrer noopener" } de um número.

Essa expressão é muito útil para encontrar a diferença entre dois valores. Veja um exemplo considerando os documentos da coleção `ratings`:

```language-javascript
{ _id: 1, start: 5, end: 8 },
{ _id: 2, start: 4, end: 4 },
{ _id: 3, start: 9, end: 7 },
{ _id: 4, start: 6, end: 7 }
```

Aplicando a expressão `$abs` combinada com a expressão `$subtract` no estágio `$project`, podemos retornar a diferença entre os valores dos campos `start` e `end`:

```language-javascript
db.ratings.aggregate([
  {
    $project: {
      delta: {
        $abs: { $subtract: ["$start", "$end"] }
      }
    }
  }
]);
```

```language-javascript
{ "_id" : 1, "delta" : 3 }
{ "_id" : 2, "delta" : 0 }
{ "_id" : 3, "delta" : 2 }
{ "_id" : 4, "delta" : 1 }
```

#### Exercício de fixação

Utilizando o banco de dados `storage`, faça o seguinte exercício:

1. Calcule o valor absoluto do lucro total de cada produto.

### Expressão $multiply

A expressão `$multiply` multiplica dois valores numéricos. Esses valores devem ser passados num *array*, como nas outras expressões anteriores.

Vamos considerar os seguintes documentos na coleção `sales`:

```language-javascript
{ _id: 1, item: "abc", price: 10, quantity: 2, date: ISODate("2014-03-01T08:00:00Z") },
{ _id: 2, item: "jkl", price: 20, quantity: 1, date: ISODate("2014-03-01T09:00:00Z") },
{ _id: 3, item: "xyz", price: 5, quantity: 10, date: ISODate("2014-03-15T09:00:00Z") }
```

Na agregação a seguir, utilizamos o `$multiply` no estágio `$project` para projetar um novo campo chamado `total`, que conterá o valor da multiplicação entre os campos `price` e `quantity`:

```language-javascript

db.sales.aggregate([
  {
    $project: {
      date: 1,
      item: 1,
      total: {
        $multiply: ["$price", "$quantity"]
      }
    }
  }
]);
```

Retornando o seguinte resultado:

```language-javascript
{ "_id" : 1, "item" : "abc", "date" : ISODate("2014-03-01T08:00:00Z"), "total" : 20 }
{ "_id" : 2, "item" : "jkl", "date" : ISODate("2014-03-01T09:00:00Z"), "total" : 20 }
{ "_id" : 3, "item" : "xyz", "date" : ISODate("2014-03-15T09:00:00Z"), "total" : 50 }
```

#### Exercícios de fixação

Utilizando o banco de dados `storage`, faça os seguintes exercícios:

1. Calcule qual o valor total em estoque de cada produto, considerando o preço de venda e a quantidade;

2. Calcule qual será o lucro total de cada produto caso todo o estoque seja vendido.

### Expressão $divide

A expressão `$divide`, como o próprio nome sugere, divide dois valores. O primeiro argumento é o **dividendo**, e o segundo é o **divisor**.

Considere os seguintes documentos na coleção `planning`:

```language-javascript
{ _id: 1, name: "A", hours: 80, resources: 7 },
{ _id: 2, name: "B", hours: 40, resources: 4 }
```

A agregação abaixo utiliza o `$divide` para dividir o valor do campo `hours` por `8` e calcular o número de dias de trabalho (`workdays`):

```language-javascript
db.planning.aggregate([
  {
    $project: {
      name: 1,
      workdays: {
        $divide: ["$hours", 8]
      }
    }
  }
]);
```

Retornando os seguintes documentos:

```language-javascript
{ "_id" : 1, "name" : "A", "workdays" : 10 }
{ "_id" : 2, "name" : "B", "workdays" : 5 }
```

#### Exercício de fixação

Utilizando o banco de dados `storage`, faça o seguinte exercício:

1. Calcule qual será o preço de venda de cada produto caso haja uma promoção de 50% de desconto.

### Estágio $addFields

O `$addFields` é um estágio que adiciona novos campos aos documentos. A saída desse estágio conterá todos os campos existentes nos documentos de entrada e adicionará os novos campos especificados.

Você pode incluir subdocumentos ou *arrays* de subdocumentos, utilizando o conceito de _dot notation_. Um *pipeline* pode conter mais de um estágio `$addFields`.

Considere os documentos abaixo na coleção `scores`:

```language-javascript
{
  _id: 1,
  student: "Maya",
  homework: [10, 5, 10],
  quiz: [10, 8],
  extraCredit: 0
},
{
  _id: 2,
  student: "Ryan",
  homework: [5, 6, 5],
  quiz: [8, 8],
  extraCredit: 8
}
```

A operação de agregação abaixo utiliza o `$addFields` duas vezes para incluir três novos campos nos documentos de saída:

```language-javascript
db.scores.aggregate([
  {
    $addFields: {
      totalHomework: { $sum: "$homework" } ,
      totalQuiz: { $sum: "$quiz" }
    }
  },
  {
    $addFields: {
      totalScore: {
        $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ]
      }
    }
  }
]);
```

O primeiro estágio adiciona o campo `totalHomework` somando os valores contidos no *array* `homework`. Também adiciona outro campo chamado `totalQuiz` somando os valores do *array* `quiz`.

O segundo estágio adiciona o campo `totalScore`, que, por sua vez, soma os valores dos campos `totalHomework`, `totalQuiz` e `extraCredit`.

Note que o resultado mantém os campos originais do documento de entrada, juntamente com os três novos campos adicionados:

```language-javascript
{
  "_id" : 1,
  "student" : "Maya",
  "homework" : [ 10, 5, 10 ],
  "quiz" : [ 10, 8 ],
  "extraCredit" : 0,
  "totalHomework" : 25,
  "totalQuiz" : 18,
  "totalScore" : 43
}
{
  "_id" : 2,
  "student" : "Ryan",
  "homework" : [ 5, 6, 5 ],
  "quiz" : [ 8, 8 ],
  "extraCredit" : 8,
  "totalHomework" : 16,
  "totalQuiz" : 16,
  "totalScore" : 40
}
```

#### Exercício de fixação

Utilizando o banco de dados `storage`, faça o seguinte exercício:

1. Calcule o valor total do estoque, considerando que cada produto valha o mesmo que seu preço de venda. Lembre-se da quantidade.

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

O MongoDb possui diversas ferramentas, como, por exemplo, `mongo`, `mongosh`, `Compass` e outras ferramentas de terceiros.
Você pode utilizar o que achar melhor para executar as *queries*, o importante é realizá-las.

Você continuará utilizando o banco de dados `erp` do dia anterior. Nos exercícios **1** a **8**, você utilizará o mesmo *pipeline*. A ideia é começar com um *pipeline* pequeno e ir adicionando estágios à medida que você for evoluindo nos exercícios. Vamos lá?

**Exercício 1**: Utilize uma combinação das expressões aritméticas e adicione um campo chamado `idade` à coleção `clientes`. Algumas dicas:

* arredonde para baixo o valor da idade;
* calcule a idade usando a diferença entre a data corrente e a data de nascimento;
* 1 dia é igual a 86400000 milissegundos.

**Exercício 2**: Utilizando o novo campo `idade`, conte quantos clientes têm entre `18` e `25` anos.

**Exercício 3**: Remova os estágios `$count` e `$match` do exercício anterior e adicione um estágio no *pipeline* que coloque as compras do cliente no campo `compras`.

**Exercício 4**: Selecione TODOS os clientes que compraram entre `Junho de 2019` e `Março de 2020`.

**Exercício 5**: Confira o número de documentos retornados pelo *pipeline* com o método `itcount()`. Até aqui, você deve ter `486` documentos sendo retornados.

**Exercício 6**: Deixe apenas os `top 10` clientes com mais compras nesse período.

**Exercício 7**: Para esses clientes, adicione um campo chamado `compras.valorComDesconto` em todas as compras do período, aplicando `10%` de desconto sobre o valor total da compra (`valorTotal`).

**Exercício 8**: Ainda nesse *pipeline*, descubra os `5` estados com mais compras.

**Exercício 9**: Descubra o cliente que mais consumiu `QUEIJO PRATO`. Retorne um documento com a seguinte estrutura:

```language-javascript
{
  "nomeCliente": "NOME",
  "uf": "UF DO CLIENTE",
  "totalConsumido": 100
}
```

**Exercício 10**: Selecione todas as vendas do mês de `Março de 2020`, com `status` `EM SEPARACAO`. Acrescente um campo chamado `dataEntregaPrevista` com valor igual a três dias após a data da venda. Retorne apenas os campos `clienteId`, `dataVenda` e `dataEntregaPrevista`.

### Bônus

**Exercício 11**: Calcule a diferença absoluta em dias entre a data da primeira entrega prevista e a última, considerando o *pipeline* do exercício 10.

---

## Recursos adicionais (opcional)

* [SQL to Aggregation Mapping Chart](https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Aggregation Pipeline Quick Reference](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Aggregation Commands](https://docs.mongodb.com/manual/reference/operator/aggregation/interface/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Aggregation Commands Comparison](https://docs.mongodb.com/manual/reference/aggregation-commands-comparison/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
