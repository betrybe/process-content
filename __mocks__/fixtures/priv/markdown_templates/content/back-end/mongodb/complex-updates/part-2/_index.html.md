## O que vamos aprender?

Hoje você chega à última parte do conteúdo sobre `update` no **MongoDB**. Você continuará estudando sobre outros operadores de *update* que podem ser utilizados em *arrays*. Também verá outros operadores para *queries* mais complexas.

---

### Você será capaz de:

* Utilizar o operador `$all` para filtrar documentos;

* Utilizar o operador `$elemMatch` para filtrar documentos;

* Utilizar o operador `$size` para filtrar documentos pelo tamanho de *arrays*;

* Utilizar o operador `$expr` para criar expressões de agregação;

* Utilizar expressões regulares e o operador `$regex` para buscar documentos;

* Utilizar o índice textual e o operador `$text`;

* Utilizar o operador `$mod`.

---

## Por que isso é importante?

É crucial reforçar que *arrays* são uma estrutura muito relevante no modelo de documentos. Você viu no dia anterior que com eles você pode armazenar desde estruturas simples até documentos compostos por vários níveis.

Os operadores que você viu no dia anterior já permitem que você escreva *queries* diversificadas em *arrays*. Hoje, você aprenderá sobre operadores mais avançados, que facilitarão muito a escrita de *queries* que exijam operações complexas em *arrays*.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Operador $all

O operador `$all` seleciona todos os documentos em que o valor do campo é um *array* que contenha todos os elementos especificados. Em se tratando-se de *array*, esse operador é equivalente ao operador `$and`, pois fará a comparação de todos os valores especificados.

Utiliza-se `$all` sempre que é preciso passar mais de um valor de comparação, e é irrelevante tanto a existência de mais elementos no *array* quanto a ordem em que esses elementos estão.

Entenda essa diferença com estas duas *queries*:

```language-javascript
db.inventory.find({ tags: ["red", "blank"] });

db.inventory.find({ tags: { $all: ["red", "blank"] } });
```

A primeira *query* retornará somente os documentos em que o *array* `tags` seja **exatamente** igual ao passado como parâmetro no filtro, ou seja, contenha apenas esses dois elementos, na mesma ordem.

Já a segunda analisará o mesmo *array*, **independentemente** da existência de outros valores ou a ordem em que os elementos estejam.

Utilizar o `$all` poupa um pouco de código. Veja um exemplo utilizando o `$all`:

```language-javascript
db.inventory.find(
  { tags: { $all: [ "ssl", "security" ] } }
);
```

E seu equivalente, utilizando o `$and`:

```language-javascript
db.inventory.find(
  {
    $and: [
      { tags: "ssl" },
      { tags: "security" }
    ]
  }
);
```

### Operador $elemMatch

O operador `$elemMatch` seleciona os documentos que contêm um campo do tipo *array* com pelo menos **um** elemento que satisfaça **todos** os critérios de seleção especificados. Ou seja, com esse operador você pode especificar várias *queries* para um mesmo *array*.

Veja um exemplo considerando a coleção `scores` com os seguintes documentos:

```language-javascript
{ _id: 1, results: [82, 85, 88] },
{ _id: 2, results: [75, 88, 89] }
```

A *query* abaixo seleciona somente os documentos em que o *array* `results` contém **ao menos um elemento** que seja **maior ou igual a 80** e **menor que 85**:

```language-javascript
db.scores.find(
  { results: { $elemMatch: { $gte: 80, $lt: 85 } } }
);
```

Como resultado, apenas o documento com o `_id` igual a `1` será retornado.

Você pode utilizar o operador `$elemMatch` em *arrays* que contenham subdocumentos e especificar vários campos desses subdocumentos como filtro. Veja os seguintes documentos na coleção `survey`:

```language-javascript
{
  _id: 1,
  results: [
    { product: "abc", score: 10 },
    { product: "xyz", score: 5 }
  ]
},
{
  _id: 2,
  results: [
    { product: "abc", score: 8 },
    { product: "xyz", score: 7 }
  ]
},
{
  _id: 3,
  results: [
    { product: "abc", score: 7 },
    { product: "xyz", score: 8 }
  ]
}
```

A *query* abaixo selecionará apenas os documentos em que o *array* `results` contenha ao menos um elemento subdocumento com o campo `product` igual a `xyz` **e** o campo `score` maior ou igual a `8`:

```language-javascript
db.survey.find(
  { results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }
);
```

Será retornado apenas o documento com o `_id` igual a `3`.

Você não precisa utilizar o operador `$elemMatch` se estiver utilizando uma condição para apenas um campo do documento *embedado*. Veja:

```language-javascript
db.survey.find(
  { results: { $elemMatch: { product: "xyz" } } }
);
```

Como a operação acima só tem uma condição, o operador `$elemMatch` não se faz necessário e você pode utilizar a *query* abaixo:

```language-javascript
db.survey.find(
  { "results.product": "xyz" }
);
```

### Operador $size

O operador `$size` seleciona documentos em que um *array* contenha um **número de elementos** especificado.

Considere a coleção `products` a seguir, contendo documentos em que o campo `tags` pode ser um *array*:

```language-javascript
{ _id: 1, tags: ["red", "green"] },
{ _id: 2, tags: ["apple", "lime"] },
{ _id: 3, tags: "fruit" },
{ _id: 4, tags: ["orange", "lemon", "grapefruit"] }
```

Ao executar a *query* abaixo, apenas os documentos com o `_id` igual `1` e `2` serão retornados, pois seus campos `tags` são *arrays* e contêm exatamente **2 elementos**:

```language-javascript
db.products.find(
  { tags: { $size: 2 } }
);
```

É importante saber que o operador `$size` não aceita *ranges* de valores. Se você precisar selecionar documentos com base em valores diferentes, a solução é criar um campo que se incremente quando elementos forem adicionados ao *array*.

### Operador $where

O operador `$where` pode ser utilizado para passar uma *string* contendo uma expressão ou função **JavaScript**. Esse operador é muito flexível, mas requer que o banco de dados processe a expressão ou função passada para cada documento na coleção. O documento é referenciado na expressão ou função usando `this` ou `obj`.

O operador `$where` não será explorado porque, na versão `3.6` do **MongoDB**, um outro operador, `$expr`, que será visto a seguir, passou a suportar expressões de agregação. O operador `$expr` é mais rápido do que o `$where` porque não executa **JavaScript**. Você deve preferir utilizá-lo sempre que possível!

Para saber um pouco mais sobre o operador `$where`, clique [aqui.](https://docs.mongodb.com/manual/reference/operator/query/where/index.html) {: .external-link target="_blank" rel="noreferrer noopener" }

### Operador $expr

O operador `$expr` permite que você utilize [expressões de agregação](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions) {: .external-link target="_blank" rel="noreferrer noopener" } e construa *queries* que comparem campos no mesmo documento.

Considere os documentos abaixo na coleção `monthlyBudget`:

```language-javascript
{ _id: 1, category: "food", budget: 400, spent: 450 },
{ _id: 2, category: "drinks", budget: 100, spent: 150 },
{ _id: 3, category: "clothes", budget: 100, spent: 50 },
{ _id: 4, category: "misc", budget: 500, spent: 300 },
{ _id: 5, category: "travel", budget: 200, spent: 650 }
```

A query abaixo utiliza o operador `$expr` para buscar os documentos em que o valor de `spent` exceda o valor de `budget`:

```language-javascript
db.monthlyBudget.find(
  {
    $expr: { $gt: [ "$spent", "$budget" ] }
  }
);
```

Apenas os seguintes documentos serão retornados:

```language-javascript
{ "_id" : 1, "category" : "food", "budget" : 400, "spent" : 450 }
{ "_id" : 2, "category" : "drinks", "budget" : 100, "spent" : 150 }
{ "_id" : 5, "category" : "travel", "budget" : 200, "spent" : 650 }
```

Note que, na *query*, nenhum valor foi especificado explicitamente. O que acontece é que o operador `$expr` entende que deve comparar os valores dos dois campos. Por isso o `$` é utilizado, indicando que a *string* entre aspas referencia um campo.

Mais à frente no curso, você verá muito mais aplicações para o operador `$expr` dentro do tópico sobre `Aggregation Framework`, e verá que suas *queries* ficarão muito mais poderosas!

### Operador $regex

O operador `$regex` fornece os "poderes" das **expressões regulares** (_regular expressions_) para seleção de *strings*. **MongoDB** utiliza expressões regulares compatíveis com [Perl](https://www.perl.org/) {: .external-link target="_blank" rel="noreferrer noopener" } ([PCRE](https://www.pcre.org/) {: .external-link target="_blank" rel="noreferrer noopener" }), versão 8.42, e com suporte a `UTF-8`.

Um uso muito comum para o operador `$regex` é fazer consultas como o `LIKE` do `SQL`. Considere os seguintes documentos na coleção `products`:

```language-javascript
{ _id: 100, sku: "abc123", description: "Single line description." },
{ _id: 101, sku: "abc789", description: "First line\nSecond line" },
{ _id: 102, sku: "xyz456", description: "Many spaces before     line" },
{ _id: 103, sku: "xyz789", description: "Multiple\nline description" }
```

A *query* abaixo seleciona todos os documentos em que o campo `sku` termine com `"789"`:

```language-javascript
db.products.find({ sku: { $regex: /789$/ } });
```

O exemplo acima equivale ao comando `LIKE` do `SQL`:

```language-sql
SELECT * FROM products WHERE sku LIKE "%789";
```

Você pode especificar opções na regex. Por exemplo, você pode especificar a opção *case-insensitive*, fazendo com que o **MongoDB** ignore letras maiúsculas ou minúsculas. Veja:

```language-javascript
db.products.find({ sku: { $regex: /^ABC/i } });
```

O caractere `i` ao lado da expressão indica a opção *case-insensitive*. Dessa forma, apenas os documentos que contenham `ABC` no campo `sku` serão retornados, sem se importar se está em maiúsculo ou minúsculo:

```language-javascript
{ "_id" : 100, "sku" : "abc123", "description" : "Single line description." }
{ "_id" : 101, "sku" : "abc789", "description" : "First line\nSecond line" }
```

Basicamente, tudo o que você pode construir com expressões regulares em outras linguagens de programação funcionará também em suas *queries* no **MongoDB**. Saiba mais sobre o operador `$regex` clicando [aqui.](https://docs.mongodb.com/manual/reference/operator/query/regex/index.html) {: .external-link target="_blank" rel="noreferrer noopener" }

### Operador $text

O operador `$text` faz uma busca "textual" em um campo indexado por um [text index.](https://docs.mongodb.com/manual/core/index-text/) {: .external-link target="_blank" rel="noreferrer noopener" } A expressão para utilizar o `$text` tem a seguinte sintaxe:

```language-javascript
{
  $text:
    {
      $search: <string>,
      $language: <string>,
      $caseSensitive: <boolean>,
      $diacriticSensitive: <boolean>
    }
}
```

Em que:

* `$search`: Uma *string* com **os termos** que o **MongoDB** utilizará para fazer o *parse* e utilizará como filtro. Internamente, o **MongoDB** faz uma busca lógica (`OR`) sobre os termos, a menos que seja especificado como uma frase inteira;

* `$language`: Opcional. Esse campo determina a lista de [_stop words_](https://pt.wikipedia.org/wiki/Palavra_vazia) {: .external-link target="_blank" rel="noreferrer noopener" } que será utilizada na *tokenização* da busca. Veja a [lista](https://docs.mongodb.com/manual/reference/text-search-languages/#text-search-languages) {: .external-link target="_blank" rel="noreferrer noopener" } de idiomas suportados. Se você passar o valor `none`, a busca utilizará uma *tokenização* simples sem utilizar nenhuma lista de _stop words_;

* `$caseSensitive`: Opcional. Recebe um valor booleano para habilitar ou desabilitar buscas _case sensitive_. O valor *default* é `false`, o que faz com que as buscas sejam _`case-insensitive`_. Veja mais informações sobre _`case-insensitive`_ [aqui;](https://docs.mongodb.com/manual/reference/operator/query/text/index.html#text-operator-case-sensitivity) {: .external-link target="_blank" rel="noreferrer noopener" }

* `$diacriticSensitive`: Opcional. Recebe um valor booleano para habilitar ou desabilitar busca [_diacritic sensitive_.](https://docs.mongodb.com/manual/reference/operator/query/text/index.html#text-operator-diacritic-sensitivity) {: .external-link target="_blank" rel="noreferrer noopener" } O valor *default* também é `false`.

O operador `$text`, por padrão, não retorna os resultados ordenados pelas pontuações (_`score`_). Veja mais informações sobre ordenação por `scores` [aqui.](https://docs.mongodb.com/manual/reference/operator/query/text/index.html#text-operator-text-score) {: .external-link target="_blank" rel="noreferrer noopener" }

O `score` é atribuído a cada documento que contenha o termo procurado no campo. Esse `score` representa a relevância do documento para a busca textual aplicada. O `score` pode ser parte do método `sort()` ou parte de uma `projeção`.

Hora de ver alguns exemplos considerando a coleção `articles` e um índice textual no campo `subject`.

Primeiro, o comando para criar o índice do tipo `text`:

```language-javascript
db.articles.createIndex({ subject: "text" });
```

Tendo os seguintes documentos na coleção `articles`:

```language-javascript
{ _id: 1, subject: "coffee", author: "xyz", views: 50 },
{ _id: 2, subject: "Coffee Shopping", author: "efg", views: 5 },
{ _id: 3, subject: "Baking a cake", author: "abc", views: 90  },
{ _id: 4, subject: "baking", author: "xyz", views: 100 },
{ _id: 5, subject: "Café Com Leite", author: "abc", views: 200 },
{ _id: 6, subject: "Сырники", author: "jkl", views: 80 },
{ _id: 7, subject: "coffee and cream", author: "efg", views: 10 },
{ _id: 8, subject: "Cafe com Leite", author: "xyz", views: 10 }
```

##### Exemplo 1: Procurando um único termo

A *query* abaixo utiliza os operadores `$text` e `$search` para buscar todos os documentos que contenham o termo `coffee`:

```language-javascript
db.articles.find({ $text: { $search: "coffee" } });
```

##### Exemplo 2: Procurando qualquer um dos termos especificados

Você pode procurar por vários termos passando uma string **delimitada por espaços**. O operador `$text` fará uma busca lógica `OR` por cada um desses termos, retornando os documentos que contenham qualquer um deles.

A *query* abaixo especifica três termos (`"bake coffee cake"`) para a *string* `$search`:

```language-javascript
db.articles.find({ $text: { $search: "bake coffee cake" } });
```

##### Exemplo 3: Procurando por uma frase

Procurar por frases também é possível. A *query* abaixo procura pela frase `"coffee shop"`:

```language-javascript
db.articles.find({ $text: { $search: "\"coffee shop\"" } });
```

Você verá mais exemplos e utilizações para o `$text` nos exercícios. Verá também como esse operador se comporta muito bem com o **Português do Brasil**!

### Operador $mod

Saindo um pouco dos operadores textuais, existe o operador `$mod`, que seleciona todos os documentos em que o valor do campo dividido por um divisor seja igual ao valor especificado (ou seja, executa a [operação módulo](https://pt.wikipedia.org/wiki/Opera%C3%A7%C3%A3o_m%C3%B3dulo) {: .external-link target="_blank" rel="noreferrer noopener" }).

Considere os seguintes documentos na coleção `inventory`:

```language-javascript
{ _id: 1, item: "abc123", qty: 0 },
{ _id: 2, item: "xyz123", qty: 5 },
{ _id: 3, item: "ijk123", qty: 12 }
```

A *query* a seguir seleciona todos os documentos da coleção em que o valor do campo `qty` módulo `4` seja `0`:

```language-javascript
db.inventory.find({ qty: { $mod: [4, 0] } });
```

Então, apenas os seguintes documentos serão retornados:

```language-javascript
{ "_id" : 1, "item" : "abc123", "qty" : 0 }
{ "_id" : 3, "item" : "ijk123", "qty" : 12 }
```

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Vamos para o Slack, onde estará disponível o link da nossa aula ao vivo de hoje.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora, a prática!

Você continuará utilizando o mesmo *dataset* de filmes do dia anterior. Por isso, hora de voltar a coleção `movies` para o seu estado original:

```language-javascript
db.movies.drop();
db.movies.insertMany([
  {
    title: "Batman",
    category: [
      "action",
      "adventure"
    ],
    imdbRating: 7.7,
    budget: 35
  },
  {
    title: "Godzilla",
    category: [
      "action",
      "adventure",
      "sci-fi"
    ],
    imdbRating: 6.6,
    budget: 10
  },
  {
    title: "Home Alone",
    category: [
      "family",
      "comedy"
    ],
    imdbRating: 7.4
  }
]);
```

---

###### Para cada execução, utilize o método find() para conferir as alterações nos documentos

O MongoDb possui diversas ferramentas como por exemplo, `mongo`, `mongosh`, `Compass` e outras ferramentas de terceiros.
Você pode utilizar o que achar melhor para executar as *queries*, o importante é realizá-las.

1. Utilizando o operador `$all`, retorne todos os filmes que contenham `action` e `adventure` no *array* `category`.

2. Agora retorne os filmes que contenham `action` no *array* `category` e possuem nota do **IMDB** maior do que `7`.

3. Adicione um *array* chamado `ratings` ao filme `Batman` com os seguintes valores: `[85, 100, 102, 105]`. Dica: lembre-se do operador `$each` visto no dia anterior.

4. Adicione um *array* chamado `ratings` ao filme `Godzilla` com os seguintes valores: `[78, 52, 95, 102]`.

5. Adicione um *array* chamado `ratings` ao filme `Home Alone` com os seguintes valores: `[200, 99, 65]`.

6. Retorne todos os filmes com `ratings` maior do que `103`, exibindo apenas os campos `title` e `ratings`.

7. Retorne todos os filmes com `ratings` entre `100` e `105`, exibindo apenas os campos `title` e `ratings`.

8. Retorne todos os filmes com `ratings` entre `64` e `105` e divisíveis por `9`, exibindo apenas os campos `title` e `ratings`.

9. Retorne os filmes da categoria `adventure` e com `ratings` maior do que `103`, exibindo apenas os campos `title`, `ratings` e `category`.

10. Retorne somente o título de todos os filmes com dois elementos no *array* `category`.

11. Retorne somente o título de todos os filmes com quatro elementos no *array* `ratings`.

12. Busque os filmes em que o módulo 5 do campo `budget` seja 0 e que o array `category` tenha tamanho `2`.

13. Retorne os filmes da categoria `"sci-fi"` ou que possua o `ratings` maior do que `199`, exibindo apenas os campos `title`, `ratings` e `category`.

14. Retorne os filmes em que o `ratings` possua tamanho 4 e que seja da `category` `"adventure"` ou `"family"`, mas que não tenha o `imdbRating` menor que 7.

15. Adicione o campo `description` no filme `Batman` com o seguinte valor: `"The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker."`.

16. Adicione o campo `description` no filme `Godzilla` com o seguinte valor: `"The world is beset by the appearance of monstrous creatures, but one of them may be the only one who can save humanity."`.

17. Adicione o campo `description` no filme `Home Alone` com o seguinte valor: `"An eight-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation."`.

18. Utilizando o operador `$regex`, retorne todos os filmes em que a descrição comece com a palavra `"The"`.

19. Utilizando o operador `$regex`, retorne todos os filmes em que a descrição termine com a palavra `"humanity."`.

20. Crie um índice do tipo `text` no campo `description`.

21. Utilizando o operador `$text`, busque por filmes que contenham o termo `"vacation"`.

22. Utilizando o operador `$text`, busque por filmes que contenham os termos `"monstrous"` e `"criminal"`.

23. Utilizando o operador `$text`, busque por filmes que contenham a **frase** `"when he is accidentally"`.


---

## Recursos adicionais

* [Queries em Arrays](https://docs.mongodb.com/manual/tutorial/query-arrays/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Query em Arrays de Documentos Embedados](https://docs.mongodb.com/manual/tutorial/query-array-of-documents/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Busca Textual](https://docs.mongodb.com/manual/reference/operator/query/text/index.html#match-operation-stemmed-words) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
