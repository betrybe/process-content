## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

Inserindo os documentos de exemplo na coleção `movies` do banco de dados `class`:

```language-javascript
use class;
db.movies.insertMany([
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
]);
```

Verificando que existem três documentos na coleção:

```language-javascript
db.movies.count()
```

---

**Exercício 1**: Altere o `imdbRating` para `7.7` no filme `Batman`.

```language-javascript
db.movies.updateOne(
  { title: "Batman" },
  {
    $set: {
      imdbRating: 7.7
    }
  }
);
```

**Exercício 2**: Altere `budget` para `1` no filme `Godzilla`.

```language-javascript
db.movies.updateOne(
  { title: "Godzilla" },
  {
    $set: {
      budget: 1
    }
  }
);
```

**Exercício 3**: Altere `budget` para `15` e `imdbRating` para `5.5` no filme `Home Alone`.

```language-javascript
db.movies.updateOne(
  { title: "Home Alone"},
    {
      $set: {
        budget: 15,
        imdbRating: 5.5
      }
    }
);
```

**Exercício 4**: Aumente em `2` o `imdbRating` do filme `Batman`.

```language-javascript
db.movies.updateOne(
  { title: "Batman" },
  {
    $inc: { imdbRating: 2 }
  }
);
```

**Exercício 5**: Aumente em `5` o `budget` do filme `Home Alone`.

```language-javascript
db.movies.updateOne(
  { title: "Home Alone" },
  {
    $inc: { budget: 5 }
  }
);
```

**Exercício 6**: Multiplique por `4` o `imdbRating` do filme `Batman`.

```language-javascript
db.movies.updateOne(
  { title: "Batman" },
  {
    $mul: { imdbRating: 4 }
  }
);
```

**Exercício 7**: Renomeie o campo `budget` para `estimatedBudget` do filme `Batman`.

```language-javascript
db.movies.updateOne(
  { title: "Batman" },
  {
    $rename: {
      budget: "estimatedBudget"
    }
  }
);
```

**Exercício 8**: Utilize o operador `$min` para alterar o `budget` para `5` do filme `Home Alone`.

```language-javascript
db.movies.updateOne(
  { title: "Home Alone" },
  {
    $min: { budget: 5 }
  }
);
```

**Exercício 9**: Utilize o operador `$max` para alterar o `imdbRating` para `8.6` do filme `Godzilla`. Além disso, altere a categoria `"adventure"` para `"thriller"` do filme `Godzilla`.

```language-javascript
db.movies.updateOne(
  { title: "Godzilla" },
  {
    $max: { imdbRating: 8.6 },
    $set: { "category.1": "thriller" }
  }
);
```

**Exercício 10**: Utilizando o operador `$currentDate`, crie um campo chamado `lastUpdated` com o tipo `timestamp` no filme `Home Alone`.

```language-javascript
db.movies.updateOne(
  { title: "Home Alone" },
  {
    $currentDate: {
      lastUpdated: { $type: "timestamp" }
    }
  }
);
```

**Exercício 11**: Utilizando uma única operação, crie um campo chamado `sequels` e atribua a ele o valor `0` em todos os documentos.

```language-javascript
db.movies.updateMany(
  {},
  {
    $set: {
      sequels: 0
    }
  }
);
```

**Exercício 12**: Utilizando uma única operação, remova os campos `budget` e `estimatedBudget` em todos os documentos.

```language-javascript
db.movies.updateMany(
  {},
  {
    $unset: {
      budget: "",
      estimatedBudget: ""
    }
  }
);
```

**Exercício 13**: Para os filmes `Batman` ou `Home Alone`, atribua a `imdbRating` o valor `17` caso o valor de `imdbRating` seja menor que `17`.

```language-javascript
db.movies.updateMany(
  {
    $or: [
      { title: "Batman" },
      { title: "Home Alone" }
    ]
  },
  {
    $max: {
      imdbRating: 17
    }
  }
);
```

Inserindo os documentos de exemplo na coleção `xmen` do banco de dados `class`:

```language-javascript
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
    "origin":"unknown",
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
    "name": ["Anjo","Archangel"],
    "true_name": "Warren Kenneth Worthington III",
    "origin":"Centerport, Nova York",
    "occupation": ["Assistente","Recrutador"],
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

**Exercício 14**: Remova o campo class dos documentos que possuem esse campo com o valor `unknown`.

```language-javascript
  db.xmen.updateMany(
    { class: "unknown" },
    { 
      $unset: { class: "" }
    }
  );
```

**Exercício 15**: Produza **uma** query que renomeie os campos de `name` para `hero_name`, e de `true_name` para `full_name` e adicione o campo `power` com valor 100, em todos os documentos.

```language-javascript
  db.xmen.updateMany({},
    {
      $rename: { 
        "name":"hero_name",
        "true_name":"full_name"
      }, 
      $set:{ power: 100 }
    }
  );
```

**Exercício 16**: Produza **uma** _query_ onde, os mutantes `class` omega ou gama passam a ter seu poder de 500 **somente se seu poder for menor que 500**.

```language-javascript
  db.xmen.updateMany(
    {
    class: { $in: ["omega", "gama"] } 
    },
    { 
      $max: { power: 500 }
    }
  );
```

**Exercício 17**: Produza **uma** _query_ onde, os mutantes `class` gama passam a ter seu poder de 300 **somente se seu poder for maior que 300**.

```language-javascript
  db.xmen.updateMany(
    {
      class: "gama" 
    },
    { 
      $min: { power: 300 }
    }
  );
```

**Exercício 18**: Decremente em 100 o poder dos mutantes não contém a propriedade `class`.

```language-javascript
  db.xmen.updateMany(
    {
      class: { $exists: false }
    },
    { 
      $inc: { power: -100 }
    }
  );
```

**Exercício 19**: Em apenas **uma** query adicione o campo area com o seguinte array como valor: [Students Room] a todos os mutantes que são Senior Staff que tenham poder acima de 100 e para todos os Junior staff com poder acima de 200.

```language-javascript
  db.xmen.updateMany(
    {
      $or:
        [
            { 
              $and: [
                { occupation: "Senior Staff" }, { power: { $gt: 100 } } 
              ] 
            },
            { 
              $and: [
              { occupation: "Junior Staff" }, { power:{ $gt: 200 } } 
              ] 
            }
        ]
    },
    {
      $set: { "areas": ["Students Rooms"] }
    }
  );
```

**Exercício 20**: Em apenas uma query adicione o campo áreas com [ "outside" ] a todos os Junior Staff que não tenham o campo áreas definido.

```language-javascript
  db.xmen.updateMany(
    {
      $and:[
        { occupation: "Junior Staff" },
        { areas:{ $exists: false } } ]
    },
    { $set: { "areas": [ "Outside" ] } }
  );
```
