## O que vamos aprender?

Depois de entender e praticar bastante como inserir e buscar dados no **MongoDB**, você vai aprender como alterar esses dados através dos métodos e operadores disponíveis para isso.

---

### Você será capaz de:

* Utilizar o método `updateOne()`;

* Utilizar o método `updateMany()`;

* Utilizar os operadores `$set`, `$mul`, `$inc`, `$min`, `$max` e `$currentDate`;

* Renomear campos;

* Remover campos.

---

### Por que isso é importante?

Não adianta apenas armazenar dados e recuperá-los. Certamente você vai precisar alterá-los também de forma adequada! Updates vão te ajudar a dar manutenção contínua e deixar seus dados sempre atualizados.

Outro ponto muito importante, do ponto de vista do **MongoDB**, é saber utilizar os métodos, operadores e modificadores corretos para cada necessidade, evitando que operações complexas sobrecarreguem seu banco de dados.

---

## Conteúdos

A operação *update* é a que você utiliza quando quer alterar documentos de uma coleção no **MongoDB**. Para isso, o **MongoDB** tem uma série de operadores de atualização (_update operators_) para modificar os valores dos campos.

Dois métodos para modificar documentos serão vistos:

* `db.colecao.updateOne(<filtro>, <update>, <opcoes>)`;

* `db.colecao.updateMany(<filtro>, <update>, <opcoes>)`.

Um método de update pode receber como parâmetro vários operadores diferentes em uma mesma operação:

```language-javascript
{
  <operador>: { <campo1>: <valor1>, ... },
  <operador>: { <campo2>: <valor2>, ... },
  ...
}
```

### Alterando um único documento

Nos próximos exemplos utilizaremos a _dataset_ `inventory`. Caso queira fazer testes em sua máquina, você pode copiar o _dataset_ para seu computador a partir desse [link](/back-end/mongodb/inventory.js) {: .external-link target="_blank" rel="noreferrer noopener" }.

Para alterar um único documento, você pode utilizar o método `updateOne()`. Como o nome do método diz, ele altera apenas o **primeiro** documento que satisfaça o critério de filtro.

No exemplo abaixo, o método `db.colecao.updateOne()` é utilizado para alterar o **primeiro** documento na coleção `inventory` em que o campo `item` seja igual a `"paper"`:

```language-javascript
db.inventory.updateOne(
  { item: "paper" },
  { $set: { "size.uom": "cm", status: "P" } }
);
```

Note que dois parâmetros foram passados no método:

* O primeiro deles é o filtro. Nesse caso, um filtro simples de igualdade, mas outros operadores podem ser utilizados aqui;

* O segundo é a operação de _update_ em si. Nesse caso, foi utilizado o operador de atualização `$set` para alterar o valor do campo `size.uom` para `cm` e o valor do campo `status` para `P`.

⚠️ Chamando o método `db.colecao.updateOne()` com o parâmetro de filtro vazio `{ }`, o resultado é a atualização **do primeiro documento presente em `colecao`.** ⚠️

### Alterando múltiplos documentos

O método `db.colecao.updateMany()` permite que vários documentos que satisfaçam o critério de filtro sejam alterados de uma única vez.

No exemplo abaixo, o método `db.colecao.updateMany()` é utilizado para alterar todos os documentos da coleção `inventory` em que o valor do campo `qty` seja menor do que `50`:

```language-javascript
db.inventory.updateMany(
  { "qty": { $lt: 50 } },
  { $set: { "size.uom": "in", status: "P" } }
);
```

A operação acima utiliza o operador `$set` para alterar o valor do campo `size.uom` para `in` e o valor do campo `status` para `P`.

Ou seja, se você tiver 10 documentos na coleção `inventory` em que o valor do campo `qty` seja menor do que `50` (esse valor foi passado como parâmetro do filtro e utilizou o operador `$lt`), todos esses documentos serão alterados em uma única operação.

⚠️ Chamando o método `db.colecao.updateMany()` com o parâmetro de filtro vazio `{ }`, o resultado é a atualização **de todos os documentos presentes em `colecao`.** ⚠️

### Operador $set

Como você viu nos exemplos acima, o `$set` altera o valor de um campo específico.

Se o campo não existir, o operador `$set` **adiciona** um novo campo com o valor especificado. Se você especificar campos com [_dot notation_](https://docs.mongodb.com/manual/core/document/#document-dot-notation-embedded-fields) {: .external-link target="_blank" rel="noreferrer noopener" }, os documentos _embedados_ necessários **serão criados** para suprir o caminho do campo.

Você pode especificar múltiplos pares de _campos-valores_ que o operador `$set` alterará ou criará cada um desses campos.

Veja alguns exemplos considerando a coleção `products` com o seguinte documento:

```language-javascript
use conteudo_trybe;
db.products.insertOne({
  _id: 100,
  sku: "abc123",
  quantity: 250,
  instock: true,
  reorder: false,
  details: { model: "14Q2", make: "xyz" },
  tags: [ "apparel", "clothing" ],
  ratings: [ { by: "ijk", rating: 4 } ]
})
```

##### Exemplo 1: Alterando campos no primeiro nível (top-level)

Para o documento que corresponder ao critério de filtro em que o campo `_id` seja igual a `100`, a operação a seguir altera o valor dos campos `quantity`, `details` e `tags`:

```language-javascript
db.products.update(
  { _id: 100 },
  { $set: {
      quantity: 500,
      details: { model: "14Q3", make: "xyz" },
      tags: [ "coats", "outerwear", "clothing" ]
    }
  }
);
```

A operação acima altera o valor de `quantity` para `500`, `details` para um novo documento _embedado_ e `tags` para um novo _array_.

No exemplo acima, vários campos foram agrupados e, com isso, são alterados em um mesmo comando! Assim, você pode alterar vários campos de uma única vez.

##### Exemplo 2: Alterando campos em documentos _embedados_

Para alterar campos dentro de subdocumentos, você deve utilizar o mesmo conceito de [dot notation](https://docs.mongodb.com/manual/core/document/#document-dot-notation) {: .external-link target="_blank" rel="noreferrer noopener" } visto durante as operações de `find()`.

A operação abaixo altera o valor do campo `make` dentro do subdocumento `details` em que o campo `_id` seja igual a `100`:

```language-javascript
db.products.update(
  { _id: 100 },
  { $set: { "details.make": "zzz" } }
);
```

##### Exemplo 3: Alterando valores em _arrays_

Como visto, _arrays_ são uma estrutura muito importante na modelagem de dados do **MongoDB**, e em algum momento você precisará fazer _updates_ nessas estruturas.

A _query_ abaixo tem como critério de seleção o campo `_id` igual a `100`. Ela altera o segundo elemento (índice `1`) do _array_ `tags` e o campo `rating` no primeiro elemento (índice `0`) do _array_ `ratings`:

```language-javascript
db.products.update(
  { _id: 100 },
  { $set: {
      "tags.1": "rain gear",
      "ratings.0.rating": 2
    }
  }
);
```

Na operação acima, a **posição** no _array_ está especificada explicitamente. Mais à frente, você verá como fazer para que esse valor seja dinâmico, dependendo de um critério de seleção. Verá também a utilização de outros operadores mais específicos para operações em _arrays_.

### Operador $mul

O operador `$mul` multiplica o **valor** de um campo por um número especificado, persistindo o resultado dessa operação sem a necessidade do operador `$set`.

Considere a coleção `products` com o novo documento descrito abaixo:

```language-javascript
db.products.insertOne(
  { "_id": 1, "item": "ABC", "price": NumberDecimal("10.99"), "qty": 25 }
);
```

A query abaixo altera esse documento, utilizando o operador `$mul` para multiplicar os valores dos campos `price` e `qty`:

```language-javascript
db.products.update(
  { _id: 1 },
  { $mul: { price: NumberDecimal("1.25"), qty: 2 } }
);
```

O resultado dessa operação é o documento abaixo, em que o novo valor do campo `price` é o valor original `10.99` multiplicado por `1.25`, e o valor do campo `qty`, que originalmente era `25`, é multiplicado por `2`:

```language-javascript
{ "_id": 1, "item": "ABC", "price": NumberDecimal("13.7375"), "qty": 50 }
```

Você pode utilizar o `$mul` em um campo que não exista no documento. Nesse caso, o operador criará o campo e atribuirá a ele o valor **zero** do mesmo tipo numérico do **multiplicador**.

Considerando um outro documento na coleção `products`:

```language-javascript
db.products.insertOne(
  { _id: 2, item: "Unknown" }
);
```

A _query_ abaixo faz um _update_ no documento, aplicando o operador `$mul` no campo `price`, que não existe neste documento:

```language-javascript
db.products.update(
  { _id: 2 },
  { $mul: { price: NumberLong("100") } }
);
```

Como resultado, temos o campo `price` criado no documento com valor **zero** do mesmo tipo numérico do multiplicador. Nesse caso, o tipo é `NumberLong`:

```language-javascript
{ "_id": 2, "item": "Unknown", "price": NumberLong(0) }
```

Você também pode multiplicar valores com tipos diferentes. Veja o documento abaixo:

```language-javascript
db.products.insertOne(
  { _id: 3,  item: "XYZ", price: NumberLong("10") }
);
```

A _query_ abaixo faz um _update_, multiplicando o valor do campo `price`, que é do tipo `NumberLong("10")`, por `NumberInt(5)`:

```language-javascript
db.products.update(
  { _id: 3 },
  { $mul: { price: NumberInt(5) } }
);
```

E como resultado temos o seguinte:

```language-javascript
{ "_id": 3, "item": "XYZ", "price": NumberLong(50) }
```

Saiba mais sobre as [Regras de Conversão de Tipos em Multiplicações.](https://docs.mongodb.com/manual/reference/operator/update/mul/#multiplication-type-conversion) {: .external-link target="_blank" rel="noreferrer noopener" }

### Operador $inc

Com o operador `$inc`, você pode incrementar ou decrementar valores em um campo específico, utilizando tanto valores positivos quanto negativos.

Esse operador é bastante útil para fazer alterações em campos numéricos sem a necessidade prévia de uma consulta para retornar o valor atual do campo. Com o `$inc`, em uma única operação isso é possível!

Considere que você tenha o seguinte documento na coleção `increment`:

```language-javascript
db.increment.insertOne(
  {
    _id: 1,
    sku: "abc123",
    quantity: 10,
    metrics: {
      orders: 2,
      ratings: 3.5
    }
  }
)
```

Na operação de _update_ a seguir, o operador `$inc` é utilizado para decrementar o valor do campo `qty` em `2` (incrementa em `-2`) e incrementar o valor do campo `metrics.orders` em `1`:

```language-javascript
db.increment.update(
  { sku: "abc123" },
  { $inc: { quantity: -2, "metrics.orders": 1 } }
);
```

O documento alterado ficará assim:

```language-javascript
{
  "_id": 1,
  "sku": "abc123",
  "quantity": 8,
  "metrics": {
    "orders": 3,
    "ratings": 3.5
  }
}
```

Note que, em uma única chamada ao operador `$inc`, você consegue aumentar e diminuir os valores de campos diferentes.

### Operadores $min e $max

Aqui temos dois operadores que também são bastante interessantes. Ambos fazem o mesmo tipo de comparação antes de executar a operação, porém em "sentidos" diferentes:

* `$min` altera o valor do campo para o valor especificado **se** esse valor especificado é **menor do que** o atual valor do campo;

* `$max` faz o mesmo, porém altera o valor do campo **se** o valor especificado é **maior do que** o atual valor do campo.

Ambos podem comparar valores de diferentes tipos, utilizando sempre a [ordem de comparação BSON.](https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#faq-dev-compare-order-for-bson-types) {: .external-link target="_blank" rel="noreferrer noopener" }

Vamos ver alguns exemplos para ficar mais claro, utilizando o seguinte documento na coleção `scores`:

```language-javascript
use conteudo_trybe;
db.scores.insertOne(
  { _id: 1, highScore: 800, lowScore: 200 }
);
```

##### Exemplo 1: Comparando números

No documento de exemplo, o valor atual do campo `lowscore` é `200`. A operação abaixo utiliza o `$min` para comparar `200` com o valor especificado `150` e altera o valor do campo `lowscore` para `150` porque `150` é menor do que `200`:

```language-javascript
db.scores.update({ _id: 1 }, { $min: { lowScore: 150 } });
```

Agora o documento modificado na coleção `scores` ficou assim:

```language-javascript
{ _id: 1, highScore: 800, lowScore: 150 }
```

Se você executar a operação abaixo, ela não terá efeito no documento porque o valor do campo `lowscore` é menor do que `250`, e o documento não será alterado:

```language-javascript
db.scores.update({ _id: 1 }, { $min: { lowScore: 250 } })
```

Atualmente, o campo `highscore` tem o valor `800`. A operação abaixo usa o `$max` para comparar `800` e o valor especificado `950`, e então altera o valor do campo `highscore` para `950` porque `950` é maior que `800`:

```language-javascript
db.scores.update({ _id: 1 }, { $max: { highScore: 950 } });
```

E o documento agora fica assim:

```language-javascript
{ _id: 1, highScore: 950, lowScore: 150 }
```

Assim como no exemplo utilizando o operador `$min`, a operação abaixo também não afetará em nada o documento porque o valor de `highscore` é maior do que `870`:

```language-javascript
db.scores.update({ _id: 1 }, { $max: { highScore: 870 } });
```

##### Exemplo 2: Comparando datas

Você pode utilizar os operadores `$min` e `$max` para comparar valores do tipo `Date`.

Considere o seguinte documento da coleção `tags`:

```language-javascript
use conteudo_trybe;
db.tags.insertOne(
  {
    _id: 1,
    desc: "crafts",
    dateEntered: ISODate("2019-10-01T05:00:00Z"),
    dateExpired: ISODate("2019-10-01T16:38:16Z")
  }
);
```

A operação abaixo utiliza o operador `$min` para comparar o valor do campo `dateEntered` e altera seu valor porque `25/09/2019` é uma data menor (anterior) do que o valor atual, ao mesmo tempo em que o operador `$max` também é usado para comparar o valor do campo `dateExpired` e altera esse valor porque `02/10/2019` é uma data maior (posterior) do que o valor atual:

```language-javascript
db.tags.update(
  { _id: 1 },
  {
    $min: { dateEntered: new Date("2019-09-25") },
    $max: { dateExpired: new Date("2019-10-02") }
  }
);
```

### Operador $currentDate

O operador `$currentDate` atribui ao valor de um campo a **data corrente**, utilizando um tipo `Date` ou `timestamp`. Se você não especificar o tipo, por padrão, o **MongoDB** atribuirá o valor do tipo `Date`. O operador `$currentDate` tem a seguinte forma:

```language-javascript
{ $currentDate: { <campo>: <typeSpecification>, ... } }
```

`typeSpecification` pode ser:

* um valor booleano `true` para atribuir o valor da data corrente ao campo utilizando o tipo `Date`; ou

* um documento que especifica o tipo do campo. Esse documento pode ser `{ $type: "timestamp" }` ou `{ $type: "date" }`. Esse operador é _case-sensitive_ e aceita somente letras minúsculas: `timestamp` ou `date`.

Veja o funcionamento do operador `$currentDate`, considerando o seguinte documento da coleção `customers`:

```language-javascript
use conteudo_trybe;
db.customers.insertOne(
  { _id: 1, status: "a", lastModified: ISODate("2013-10-02T01:11:18.965Z") }
);
```

Com a operação abaixo, é possível alterar o valor do campo `lastModified` para a data corrente e criar o campo `cancellation.date` com o _timestamp_ corrente, utilizando o operador `$currentDate`, e ainda alterar o campo `status` para `D` e criar o campo `cancellation.reason` com o valor `"user request"`, utilizando o operador `$set`:

```language-javascript
db.customers.updateOne(
  { _id: 1 },
  { $currentDate: {
      lastModified: true,
      "cancellation.date": { $type: "timestamp" }
    }, $set: {
      "cancellation.reason": "user request",
      status: "D"
    }
  }
);
```

E então, como resultado, o documento se parecerá com algo assim:

```language-javascript
{
  "_id": 1,
  "status": "D",
  "lastModified": ISODate("2020-01-22T21:21:41.052Z"),
  "cancellation": {
    "date": Timestamp(1579728101, 1),
    "reason": "user request"
  }
}
```

### Renomeando campos com o operador $rename

Você pode querer renomear um determinado atributo de um ou mais documentos. Para isso, utilize o operador `$rename`.

Esse operador recebe um documento contendo o nome atual do campo e o novo nome. Pode ser utilizado com os métodos `updateOne()` ou `updateMany()`, e também pode receber um critério de seleção de documentos.

Considerando o seguinte documento da coleção `fruits`:

```language-javascript
use conteudo_trybe;
db.fruits.insertOne(
  { _id: 100, name: "Banana", quantity: 100, inStock: true }
);
```

A operação a seguir altera o nome do campo `name` para `productName` no documento em que o valor do campo `name` seja igual a `Banana`:

```language-javascript
db.fruits.updateOne(
  { name: "Banana" },
  { $rename: {
      "name": "productName"
    }
  }
);
```

Agora o documento tem a seguinte estrutura:

```language-javascript
{ _id: 100, quantity: 100, inStock: true, productName: 'Banana' }
```

### Removendo campos com o operador $unset

Para remover um ou mais campos de um documento, utilize o operador `$unset`.

Considerando o documento abaixo na coleção `fruits`:

```language-javascript
{
  _id: 100,
  productName: "Banana",
  quantity: 100,
  inStock: true
}
```

A operação abaixo remove o campo `quantity` do documento em que o valor do campo `productName` seja igual a `Banana`:

```language-javascript
db.fruits.updateMany(
  { productName: "Banana" },
  { $unset: { quantity: "" } }
);
```

E, como resultado, o documento ficará assim:

```language-javascript
{
  _id: 100,
  productName: "Banana",
  inStock: true
}
```

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Vamos para o Slack, onde estará disponível o link da nossa aula ao vivo de hoje.

---

## Exercícios

<%= versioning_your_code(@conn) %>

### Agora, a prática!

Para os exercícios, você utilizará um dataset pequeno com alguns filmes.

Conecte-se à sua instância do **MongoDB** local e insira os seguintes documentos na coleção `movies` do banco de dados `class`:

```language-javascript
{
  "title": "Batman",
  "category": [ "action", "adventure" ],
  "imdbRating": 7.6,
  "budget": 35
},
{
  "title": "Godzilla",
  "category": [ "action", "adventure", "sci-fi" ],
  "imdbRating": 6.6
},
{
  "title": "Home Alone",
  "category": [ "family", "comedy" ],
  "imdbRating": 7.4
}
```

Verifique se você tem três documentos na coleção.

---

###### Para cada execução, utilize o método find() para conferir as alterações nos documentos

O MongoDb possui diversas ferramentas, como, por exemplo, `mongo`, `mongo sh`, `Compass` e outras ferramentas de terceiros.
Você pode utilizar o que achar melhor para executar as _queries_, o importante é realizá-las.

**Exercício 1**: Altere o `imdbRating` para `7.7` no filme `Batman`.

**Exercício 2**: Altere `budget` para `1` no filme `Godzilla`.

**Exercício 3**: Altere `budget` para `15` e `imdbRating` para `5.5` no filme `Home Alone`.

**Exercício 4**: Aumente em `2` o `imdbRating` do filme `Batman`.

**Exercício 5**: Aumente em `5` o `budget` do filme `Home Alone`.

**Exercício 6**: Multiplique por `4` o `imdbRating` do filme `Batman`.

**Exercício 7**: Renomeie o campo `budget` para `estimatedBudget` do filme `Batman`.

**Exercício 8**: Utilize o operador `$min` para alterar o `budget` para `5` do filme `Home Alone`.

**Exercício 9**: Utilize o operador `$max` para alterar o `imdbRating` para `8.6` do filme `Godzilla`. Além disso, altere a categoria `"adventure"` para `"thriller"` do filme `Godzilla`.

**Exercício 10**: Utilizando o operador `$currentDate`, crie um campo chamado `lastUpdated` com o tipo `timestamp` no filme `Home Alone`.

**Exercício 11**: Utilizando uma única operação, crie um campo chamado `sequels` e atribua a ele o valor `0` em todos os documentos.

**Exercício 12**: Utilizando uma única operação, remova os campos `budget` e `estimatedBudget` em todos os documentos.

**Exercício 13**: Para os filmes `Batman` ou `Home Alone`, atribua a `imdbRating` o valor `17`, caso o valor de `imdbRating` seja menor que `17`.

### Bônus

Copie e cole os dados abaixo no mongo shell:

```language-javascript
use class;
db.xmen.insertMany([
  {
      "name": "Tempestade",
      "true_name": "Ororo Munroe",
      "origin": "Cidade de Nova York - Nova York",
      "occupation": "Headmistress",
      "powers": [
        "Atmocinese",
        "Hidrocinese",
        "Pirocinese",
        "Aerocinese",
        "Voo",
        "Criocinese",
        "Eletrocinese",
        "Resistência Mental",
        "Eletrólise",
        "Electromagnetismo",
        "Manipulação de Energia Eólica",
        "Potencial Mágico",
        "Combate e roubo",
        "Capacidades físicas e traços",
        "Manipulação nervosa"
        ],
      "class": "omega"
    },
    {
      "name": "Fera",
      "true_name": "Henry Phillip McCoy",
      "origin": "Dundee - Illinois",
      "occupation": "Vice-Principal",
      "powers": [
        "Intelecto nível gênio",
        "garras afiadas",
        "dentes afiados",
        "Força, agilidade,Resistência e velocidade sobre-humanas"
      ],
      "class": "unknown"
    },
    {
      "name": "Vampira",
      "true_name": "Anna Marie LeBeau",
      "origin": "Caldecott County -Mississippi",
      "occupation": "Senior Staff",
      "powers": [
        "sugar energia vital , memórias e poderes de outros mutantes através da pele"
      ],
      "class": "omega"
    },
    {
      "name": "Homem de Gelo ",
      "true_name": "Robert Louis Drake",
      "origin": "Fort Washington, Long Island, New York",
      "occupation": "Senior Staff",
      "powers": [
        "manipular a umidade do ar para transformar o vapor em gelo",
        "transformar seu corpo em gelo"
      ],
      "class": "alfa"
    },
    {
      "name": "Garota Marvel",
      "true_name": "Rachel Anne Grey-Summers",
      "origin": "Norte americana",
      "occupation": "Senior Staff",
      "powers": [
        "Telepatia",
        "Telecinese",
        "Rajadas energéticas",
        "residuos da Força Fênix"
      ],
      "class": "omega"
    },
    {
      "name": "Estrela Polar",
      "true_name": "Jean-Paul",
      "origin": "Canadá",
      "occupation": "Senior Staff",
      "powers": [
        "Vôo",
        "Durabilidade",
        "Super Velocidade",
        "Geração de luz",
        "Equilíbrio",
        "agilidade",
        "reflexos acima do normal",
        "Força"
      ],
      "class": "unknown"
    },
    {
      "name": "Firestar",
      "true_name": "Angelica 'Angel' Jones",
      "origin": "americana",
      "occupation": "Senior Staff",
      "powers": [
        "Capacidade de explorar o campo eletromagnético da Terra"
      ],
      "class": "unknown"
    },
    {
      "name": "Câmara",
      "true_name": "Jonothon 'Jono' Evan Starsmore",
      "origin": "britânico",
      "occupation": "Junior Staff",
      "powers": [
        "Poderosa energia psicocinética expelida por seu tórax",
        "Comunicação telepatica"
      ],
      "class": "unknown"
    },
    {
      "name": "Frenesi",
      "true_name": "Joanna Cargill",
      "origin": "americana",
      "occupation": "Junior Staff",
      "powers": [
        "Pele Rígida Como Aço",
        "Super-Força"
      ],
      "class": "unknown"
    },
    {
      "name": "Karma",
      "true_name": "Xi'an Coy Manh",
      "origin": "the central highlands of Vietnam",
      "occupation": "Junior Staff",
      "powers": [
        "Posse mental",
        "Posse remota",
        "Elenco de ilusão",
        "Escudo psíquico",
        "Análise sensorial",
        "Controle mental"
      ],
      "class": "unknown"
    },
    {
      "name": "Escalpo",
      "true_name": "Paige Elisabeth Guthrie",
      "origin": "Americana, Krakoana",
      "occupation": "Junior Staff",
      "powers": [
        "Força Sobre-Humana",
        "Velocidade Sobre-Humana",
        "Durabilidade sobre-humana",
        "Projeção de chama (forma magma)",
        "Elasticidade de absorção de impacto",
        "Talentos anfíbios"
      ],
      "class": "unknown"
    },
    {
      "name": "Rapina",
      "true_name": "Ava'Dara Naganandin",
      "origin": "Chandilar,Shi'ar",
      "occupation": "Junior Staff",
      "powers": [
        "Força Sobre-Humana",
        "Vigor Sobre-Humano"
      ],
      "class": "unknown"
    },
    {
      "name": "Deathlok",
      "true_name": "Luther Manning",
      "origin": "unknown",
      "occupation": "Adjunct Staff/Campus Guard",
      "powers": [
        "Aprimoramentos cibernéticos que garantem velocidade, força, durabilidade e reflexos sobre-humanos "
      ],
      "class": "unknown"
    },
    {
      "name": "Doop",
      "true_name": "Doop",
      "origin": "EUA",
      "occupation": "Adjunct Staff",
      "powers": [
        "Vôo",
        "Fator de cicatrização acelerado Força",
        "durabilidade sobre-humana",
        "Maleabilidade física",
        "Capacidade de replicar objetos físicos",
        "Vazio extra-dimensional dentro do corpo que pode armazenar objetos e pessoas"
      ],
      "class": "unknown"
    },
    {
      "name": "Colossus",
      "true_name": "Piotr 'Peter' Nikolaievitch",
      "origin": "Lake Baikal, Siberia",
      "occupation": "Member",
      "powers": [
        "Transmutação em Aço Orgânico",
        "Super-Força",
        "Resistência Sobre-Humana",
        "Super-Vigor",
        "Agilidade e Velocidade Aumentadas",
        "Incapacidade de Sangrar"
      ],
      "class": "100"
    },
    {
      "name": "Noturno",
      "true_name": "Kurt Wagner",
      "origin":"Bavaria,Alemanha",
      "occupation": "Member",
      "powers": [
        "Teletransporte",
        "Super Agilidade",
        "Aderência física",
        "Habilidade de fundir-se com as sombras"
      ],
      "class": "gama"
  },
  {
      "name": "Kid Omega",
      "true_name": "Quentin Quire",
      "origin":"unknow",
      "occupation": "Member",
      "powers": [
        "Telepatia nivel-omega",
        "Telecinese",
        "Intelecto Genial"
      ],
      "class": "omega"
  },
  {
      "name": "Fada",
      "true_name": "Megan Gwynn",
      "origin":"Abergylid,Pais de Gales",
      "occupation": "Member",
      "powers": [
        "Asas",
        "Poeira Alucinógena",
        "Teletransporte",
        "Magia"
      ],
      "class": "gama"
  },
  {
      "name": "Armadura",
      "true_name": "Hisako Ichiki",
      "origin":"Abergylid,Pais de Gales",
      "occupation": "Member",
      "powers": ["Armadura Psionica"],
      "class": "unknown"
  },
  {
      "name": "Jubileu",
      "true_name": "Jubilation Lee",
      "origin":"Beverly Hills, California",
      "occupation": "Member",
      "powers": [
        "Energia Plasmatica",
        "Imunidade Telepatica"
      ],
      "class": "unknown"
  },
  {
      "name": "Kavita Rao",
      "true_name": "Kavita Rao",
      "origin":"Calcuta,India",
      "occupation": "Medica Residente",
      "powers": [],
      "class": "unknown"
  },
  {
      "name": "Cecilia Reyes",
      "true_name": "Cecilia Reyes",
      "origin":"Bronx,Nova York",
      "occupation": "Medica Residente",
      "powers": [
        "Campo de força"
      ],
      "class": "unknown"
  },
  {
      "name": ["Anjo", "Archangel"],
      "true_name": "Warren Kenneth Worthington III",
      "origin":"Centerport, Nova York",
      "occupation": ["Assistente", "Recrutador"],
      "powers": [
        "Campo de força"
      ],
      "class": "Beta"
  },
  {
      "name": "Homem Aranha",
      "true_name": "Peter Parker",
      "origin":"Queens, Nova York",
      "occupation": ["Conselheiro","Corpo Adjunto"],
      "powers": [
        "Força Sobrehumana",
        "Sensor-Aranha",
        "Aderencia Fisica"
      ],
      "class": "unknown"
  }
]);
```

As informações acima são sobre a Escola Jean Grey de Ensino Superior. Para todas as alterações realizadas, você deve sempre atualizar ou adicionar o campo **lastUpdate**, que armazena a data da última alteração com o tipo **timestamp**. Os exercícios devem ser realizados na ordem.


**Exercício 14**: Remova o campo `class` dos documentos que possuem esse campo com o valor `unknown`.


**Exercício 15**: Produza **uma** _query_ que renomeie os campos de `name` para `hero_name`, e de `true_name` para `full_name`; adicione o campo `power` com valor 100, em todos os documentos.


**Exercício 16**: Produza **uma** _query_ onde os mutantes `class` ômega ou gama passam a ter seu poder de 500 **somente se seu poder for menor que 500**.


**Exercício 17**: Produza **uma** _query_ onde os mutantes `class` gama passam a ter seu poder de 300 **somente se seu poder for maior que 300**.


**Exercício 18**: Decremente em 100 o poder dos mutantes não contêm a propriedade `class`.

**Exercício 19**: Em apenas **uma** query adicione o campo `area` com o seguinte array como valor: `[ "Students Room" ]` a todos os mutantes que são `Senior Staff` que tenham poder acima de 100 e para todos os `Junior Staff` com poder acima de 200.

**Exercício 20**: Em apenas **uma** query, adicione o campo áreas com `[ "outside" ]` a todos os `Junior Staff` que não tenham o campo `area` definido.

---

## Recursos Adicionais

* [Update Methods](https://docs.mongodb.com/manual/reference/update-methods/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Field Update Operators](https://docs.mongodb.com/manual/reference/operator/update-field/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
