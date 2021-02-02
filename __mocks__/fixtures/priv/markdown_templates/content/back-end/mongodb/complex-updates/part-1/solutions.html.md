## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

**Exercício 1:** Adicione a categoria `"superhero"` ao filme `Batman`.

```language-javascript
db.movies.updateOne(
  { "title": "Batman" },
  {
    $push: { "category": "superhero" }
  }
);
```

**Exercício 2:** Utilizando o modificador `$each`, adicione as categorias `"villain"` e `"comic-based"` ao filme `Batman`.

```language-javascript
db.movies.updateOne(
  { "title": "Batman" },
  {
    $push: {
      "category": {
        $each: ["villain", "comic-based"]
      }
    }
  }
);
```

**Exercício 3:** Remova a categoria `"action"` do filme `Batman`.

```language-javascript
db.movies.updateOne(
  { "title": "Batman" },
  {
    $pull: { "category": "action" }
  }
);
```

**Exercício 4:** Remova o primeiro elemento do *array* `category` do filme `Batman`.

```language-javascript
db.movies.updateOne(
  { "title": "Batman" },
  {
    $pop: { "category": -1 }
  }
);
```

**Exercício 5:** Remova o último elemento do *array* `category` do filme `Batman`.

```language-javascript
db.movies.updateOne(
  { "title": "Batman" },
  {
    $pop: { "category": 1 }
  }
);
```

**Exercício 6:** Adicione o elemento `"action"` ao *array* `category` do filme `Batman`, garantindo que esse valor não se duplique.

```language-javascript
db.movies.updateOne(
  { "title": "Batman" },
  {
    $addToSet: { "category": "action" }
  }
);
```

**Exercício 7:** Adicione a categoria `"90's"` aos filmes `Batman` e `Home Alone`.

```language-javascript
db.movies.updateMany(
  {
    title: {
      $in: ["Batman", "Home Alone"]
    }
  },
  {
    $push: { "category": "90's" }
  }
);
```

**Exercício 8:** Crie um *array* de documentos chamado `cast` para o filme `Home Alone` com os seguintes dados:

```language-javascript
{
  "actor": "Macaulay Culkin",
  "character": "Kevin"
},
{
  "actor": "Joe Pesci",
  "character": "Harry"
},
{
  "actor": "Daniel Stern"
}
```

Reposta:

```language-javascript
db.movies.updateOne(
  { "title": "Home Alone" },
  {
    $push: {
      "cast": {
        $each: [
          {
            "actor": "Macaulay Culkin",
            "character": "Kevin"
          },
          {
            "actor": "Joe Pesci",
            "character": "Harry"
          },
          {
            "actor": "Daniel Stern"
          }
        ]
      }
    }
  }
);
```

**Exercício 9:** Adicione o campo `character` com o valor `Marv` ao *array* de `cast` em que o campo `actor` seja igual a `Daniel Stern` no filme `Home Alone`.

```language-javascript
db.movies.updateOne(
  {
    "title": "Home Alone",
    "cast.actor": "Daniel Stern"
  },
  {
    $set: { "cast.$.character": "Marv" }
  }
);
```

**Exercício 10:** Crie um *array* de documentos chamado `cast` para o filme `Batman` com os seguintes dados:

```language-javascript
db.movies.updateOne(
  { "title": "Batman" },
  {
    $push: {
      "cast": {
        $each: [
          {
            "character": "Batman"
          },
          {
            "character": "Alfred"
          },
          {
            "character": "Coringa"
          }
        ]
      }
    }
  }
);
```

**Exercício 11:** Produza três *querys* para o filme `Batman` onde:

* Adicione o campo `actor`que deve ser um *array* com o valor `"Christian Bale"` ao *array* de `cast` em que o campo `character` seja igual a `Batman`;

```language-javascript
db.movies.updateOne(
  {
    "title": "Batman",
    "cast.character": "Batman"
  },
  {
    $push: { "cast.$.actor": "Christian Bale" }
  }
);
```

* Adicione o campo `actor` que deve ser um *array* com o valor `"Michael Caine"` ao *array* de `cast` em que o campo `character` seja igual a `Alfred`;

```language-javascript
db.movies.updateOne(
  {
    "title": "Batman",
    "cast.character": "Alfred"
  },
  {
    $push: { "cast.$.actor": "Michael Caine" }
  }
);
```

* Adicione o campo `actor` que deve ser um *array* com o valor `"Heath Ledger"` ao *array* de `cast` em que o campo `character` seja igual a `Coringa`;

```language-javascript
db.movies.updateOne(
  {
    "title": "Batman",
    "cast.character": "Coringa"
  },
  {
    $push: { "cast.$.actor": "Heath Ledger" }
  }
);
```

**Exercício 12:** Adicione aos atores de `cast` do `character` `Batman` do filme `Batman` os valores `"Michael Keaton"`, `"Val Kilmer"` e	`"George Clooney"`, e deixe o array em ordem alfabética.

```language-javascript
db.movies.updateOne(
  {
    "title": "Batman",
    "cast.character": "Batman"
  },
  {
    $push: { 
      "cast.$.actor": { 
        $each: ["Michael Keaton", "Val Kilmer", "George Clooney"],
        $sort: 1
      }
    }
  }
);
```