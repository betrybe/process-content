## O que vamos aprender?

Hoje você continuará estudando mais estágios e expressões do `aggregation pipeline`. Você vai trabalhar com mais algumas operações matemáticas, mais combinações de projeções e operações em campos e *strings*. Você também conhecerá uma ferramenta chamada **MongoDB Compass** e aprenderá como utilizá-la para montar *pipelines*.

---

### Você será capaz de:

* Fazer operações com dados geo-referenciados;

* Utilizar operadores para busca recursiva de dados relacionados;

* Entender como analisar dados com múltiplas dimensões.

---

## Por que isso é importante?

O `aggregation pipeline` é um conjunto de ferramentas muito complexo. Conhecer os principais estágios, e entender como eles funcionam, requer bastante prática. Hoje você vai ver outros operadores que fogem do uso convencional do *pipeline* e que extendem o poder desse framework para além do que você viu até agora.

Operações com dados geo-referenciados, consultas transversais e múltiplas dimensões são muito poderosas para deixar de serem conhecidas. Hoje você verá isso em detalhes.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### MongoDB Compass

O **MongoDB Compass** é uma interface visual que, entre outras funcionalidades, fornece uma visualização das estruturas dos documentos, permite fazer alguns tipos de *queries*, consultar e analisar índices e fazer o esquema de validação para os documentos.

O recurso específico que será abordado em detalhes hoje fornece uma maneira mais fácil de visualizar *pipelines* e montar operações de agregação.

Para começar, escolha a versão do MongoDB Compass para o seu sistema operacional. Faça o download e a instalação dele [neste link.](https://www.mongodb.com/download-center/compass) {: .external-link target="_blank" rel="noreferrer noopener" }

Veja também um vídeo sobre como conectar sua instância ao MongoDB Compass.

<%= vimeo "403695629" %>

### Operador $geoNear

O operador `$geoNear` retorna os documentos em uma coleção pela ordem de proximidade de um determinado ponto geográfico.

Dados geo-referenciados fazem muito sentido e podem conter uma riqueza de informações para seu dataset, e o **MongoDB** trabalha muito bem com esses dados. No `aggregation pipeline`, existe um estágio exclusivo para esse tipo de trabalho.

O operador `$geoNear` produz documentos na ordem do mais próximo ao mais distante de um ponto especificado. Os dois parâmetros obrigatórios para uma operação com `$geoNear` são:

* `near`: o tipo e as coordenadas para buscar os documentos próximos;
* `distanceField`: o campo de saída com a distância calculada em metros.

O parâmetro `query` é opcional, mas ajuda na filtragem dos documentos. Somente os documentos que se enquadrarem na *query* especificada serão retornados. Veremos alguns exemplos mais à frente.

O parâmetro `maxDistance`, que também é opcional, especifica a distância máxima em que os documentos podem estar. O **MongoDB** limita o resultado àqueles documentos que estão dentro da distância especificada do ponto central.

Todas as distâncias devem ser especificadas na mesma unidade que as do sistema de coordenadas dos documentos processados.

O `$geoNear` deve ser o primeiro estágio em seu *pipeline* e exige um [índice geo-espacial.](https://docs.mongodb.com/manual/core/geospatial-indexes/) {: .external-link target="_blank" rel="noreferrer noopener" } Se sua coleção tiver mais de um índice desse tipo, você deve especificar qual será utilizado através do parâmetro `keys`.

Considere a coleção `places`, que contém um índice do tipo `2dsphere` e documentos sobre a localização de pontos de interesse na cidade de Nova York. Abaixo, um exemplo de documento dessa coleção:

```language-javascript
{
  "_id" : ObjectId("59a57f72ea2da4c51ef35c52"),
  "name" : "Owl Hollow Park",
  "address" : {
    "number" : "",
    "street" : "",
    "city" : "Staten Island",
    "zipcode" : "10312"
  },
  "borough" : "Staten Island",
  "location" : {
    "type" : "Point",
    "coordinates" : [
      -74.196784,
      40.561112
    ]
  },
  "domain" : "Parks, Gardens, and Historical Sites",
  "group" : "Parks and Plazas",
  "specialty" : "Parks",
  "type" : "Park"
}
```

Com o estágio `$geoNear` é possível calcular a distância entre um ponto determinado e os documentos da coleção. No exemplo abaixo, o ponto é a localização do escritório da MongoDB em NYC, e o campo com a distância (`distanceField`) se chamará `distanceFromMongoDB`:

```language-javascript
db.nycFacilities.aggregate([
  {
    "$geoNear": {
      near: {
        type: "Point",
        coordinates: [-73.98769766092299, 40.757345233626594]
      },
      distanceField: "distanceFromMongoDB",
      spherical: true
    }
  }
]).pretty();
```

Todos os documentos da coleção receberão um novo campo (`distanceFromMongoDB`) com a distância em metros:

```language-javascript
{
  "_id" : ObjectId("59a57f72ea2da4c51ef3942c"),
  "name" : "1500 Broadway",
  "address" : {
    "number" : "1500",
    "street" : "Broadway",
    "city" : "New York",
    "zipcode" : "10036"
  },
  "borough" : "Manhattan",
  "location" : {
    "type" : "Point",
    "coordinates" : [
      -73.985635,
      40.756776
    ]
  },
  "domain" : "Parks, Gardens, and Historical Sites",
  "group" : "Parks and Plazas",
  "specialty" : "Privately Owned Public Space",
  "type" : "Privately Owned Public Space",
  "distanceFromMongoDB" : 185.1117645324543
}
```

Você pode utilizar uma `query` para auxiliar na filtragem dos documentos. Por exemplo, você pode filtrar por localidades que tenham o tipo `Park`:

```language-javascript
db.nycFacilities.aggregate([
  {
    $geoNear: {
      near: {
        type: "Point",
        coordinates: [-73.98769766092299, 40.757345233626594]
      },
      distanceField: "distanceFromMongoDB",
      spherical: true,
      query: { type: "Park" },
    }
  }
]).pretty();
```

### Operador $graphLookup

Com o operador `$graphLookup`, você pode fazer buscas recursivas em uma coleção, com opções de restringir a busca pelo nível de recursividade e por uma *query* de filtro.

Veja resumidamente como o processo do `$graphLookup` funciona:

1. Os documentos de entrada entram no estágio `$graphLookup`;

2. O `$graphLookup` direciona a pesquisa para a coleção especificada no parâmetro `from`;

3. Para cada documento de entrada, a pesquisa se inicia com o valor especificado pelo parâmetro `startWith`;

4. O `$graphLookup` compara o valor do `starWith` com o valor do campo especificado no parâmetro `connectToField` em outros documentos da coleção `from`;

5. Para cada documento correspondente, o `$graphLookup` pega o valor do campo `connectFromField` e checa cada documento na coleção `from` por um valor `connectToField` correspondente. Para cada correspondência, o `$graphLookup` adiciona esse documento correspondente da coleção `from` à um campo *array* denominado pelo parâmetro `as`. Essa etapa continua recursivamente até que não haja mais documentos correspondentes ou o nível de recursão especificado pelo parâmetro `maxDepth` seja atingido.

Um exemplo de aplicação para o `$graphLookup` é uma árvore hierárquica. Na coleção `employees`, temos os seguintes documentos:

```language-javascript
{ _id: 1, name: "Dev", type: "Executive" },
{ _id: 2, name: "Eliot", reportsTo: "Dev", type: "Engineer" },
{ _id: 3, name: "Ron", reportsTo: "Eliot" , type: "Operational"},
{ _id: 4, name: "Andrew", reportsTo: "Eliot", type: "Engineer" },
{ _id: 5, name: "Asya", reportsTo: "Ron", type: "Engineer" },
{ _id: 6, name: "Dan", reportsTo: "Andrew" , type: "Operational" }
```

Aplicando uma agregação, podemos fazer um busca recursiva, cruzando os campos `reportsTo` e `name` para retornar a hierarquia entre os funcionários:

```language-javascript
db.employees.aggregate([
  {
    $graphLookup: {
      from: "employees",
      startWith: "$reportsTo",
      connectFromField: "reportsTo",
      connectToField: "name",
      as: "reportingHierarchy"
    }
  }
]).pretty();
```

Gerando o seguinte resultado:

```language-javascript
{
  "_id" : 1,
  "name" : "Dev",
  "type" : "Executive",
  "reportingHierarchy" : [ ]
}
{
  "_id" : 2,
  "name" : "Eliot",
  "reportsTo" : "Dev",
  "type" : "Engineer",
  "reportingHierarchy" : [
    {
      "_id" : 1,
      "name" : "Dev",
      "type" : "Executive"
    }
  ]
}
{
  "_id" : 3,
  "name" : "Ron",
  "reportsTo" : "Eliot",
  "type" : "Operational",
  "reportingHierarchy" : [
    {
      "_id" : 1,
      "name" : "Dev",
      "type" : "Executive"
    },
    {
      "_id" : 2,
      "name" : "Eliot",
      "reportsTo" : "Dev",
      "type" : "Engineer"
    }
  ]
}
{
  "_id" : 4,
  "name" : "Andrew",
  "reportsTo" : "Eliot",
  "type" : "Engineer",
  "reportingHierarchy" : [
    {
      "_id" : 1,
      "name" : "Dev",
      "type" : "Executive"
    },
    {
      "_id" : 2,
      "name" : "Eliot",
      "reportsTo" : "Dev",
      "type" : "Engineer"
    }
  ]
}
{
  "_id" : 5,
  "name" : "Asya",
  "reportsTo" : "Ron",
  "type" : "Engineer",
  "reportingHierarchy" : [
    {
      "_id" : 1,
      "name" : "Dev",
      "type" : "Executive"
    },
    {
      "_id" : 3,
      "name" : "Ron",
      "reportsTo" : "Eliot",
      "type" : "Operational"
    },
    {
      "_id" : 2,
      "name" : "Eliot",
      "reportsTo" : "Dev",
      "type" : "Engineer"
    }
  ]
}
{
  "_id" : 6,
  "name" : "Dan",
  "reportsTo" : "Andrew",
  "type" : "Operational",
  "reportingHierarchy" : [
    {
      "_id" : 1,
      "name" : "Dev",
      "type" : "Executive"
    },
    {
      "_id" : 4,
      "name" : "Andrew",
      "reportsTo" : "Eliot",
      "type" : "Engineer"
    },
    {
      "_id" : 2,
      "name" : "Eliot",
      "reportsTo" : "Dev",
      "type" : "Engineer"
    }
  ]
}
```

Caso ainda não tenha ficado claro como se chegou a esse resultado, siga os passos descritos anteriormente para cada documento na coleção `employees`, de forma recursiva.

Você pode restringir a busca aplicando um filtro através do parâmetro `restrictSearchWithMatch`. Vamos aplicar a mesma busca recursiva, mas agora só nos documentos do tipo `Engineer`:

```language-javascript
db.employees.aggregate([
  {
    $graphLookup: {
      from: "employees",
      startWith: "$reportsTo",
      connectFromField: "reportsTo",
      connectToField: "name",
      as: "reportingHierarchy",
      restrictSearchWithMatch: { type: "Engineer" }
    }
  }
]).pretty();
```

O que gera o seguinte resultado:

```language-javascript
{
  "_id" : 1,
  "name" : "Dev",
  "type" : "Executive",
  "reportingHierarchy" : [ ]
}
{
  "_id" : 2,
  "name" : "Eliot",
  "reportsTo" : "Dev",
  "type" : "Engineer",
  "reportingHierarchy" : [ ]
}
{
  "_id" : 3,
  "name" : "Ron",
  "reportsTo" : "Eliot",
  "type" : "Operational",
  "reportingHierarchy" : [
    {
      "_id" : 2,
      "name" : "Eliot",
      "reportsTo" : "Dev",
      "type" : "Engineer"
    }
  ]
}
{
  "_id" : 4,
  "name" : "Andrew",
  "reportsTo" : "Eliot",
  "type" : "Engineer",
  "reportingHierarchy" : [
    {
      "_id" : 2,
      "name" : "Eliot",
      "reportsTo" : "Dev",
      "type" : "Engineer"
    }
  ]
}
{
  "_id" : 5,
  "name" : "Asya",
  "reportsTo" : "Ron",
  "type" : "Engineer",
  "reportingHierarchy" : [ ]
}
{
  "_id" : 6,
  "name" : "Dan",
  "reportsTo" : "Andrew",
  "type" : "Operational",
  "reportingHierarchy" : [
    {
      "_id" : 4,
      "name" : "Andrew",
      "reportsTo" : "Eliot",
      "type" : "Engineer"
    },
    {
      "_id" : 2,
      "name" : "Eliot",
      "reportsTo" : "Dev",
      "type" : "Engineer"
    }
  ]
}
```

### Operador $bucket

Com o operador `$bucket`, você pode categorizar documentos em grupos, chamados *buckets*, baseadas em expressões e em limites de *buckets*. A saída será um documento por *bucket*. Cada documento de saída contém um campo `_id` cujo valor especifica o limite inferior do _bucket. A opção `output` especifica os campos incluídos em cada documento de saída.

`$bucket` só produz documentos de saída para *buckets* que contenham ao menos um documento de entrada.

Como exemplo, considere a coleção `artists` com os seguintes documentos:

```language-javascript
{
  _id: 1,
  last_name: "Bernard",
  first_name: "Emil",
  year_born: 1868,
  year_died: 1941,
  nationality: "France"
},
{
  _id: 2,
  last_name: "Rippl-Ronai",
  first_name: "Joszef",
  year_born: 1861,
  year_died: 1927,
  nationality: "Hungary"
},
{
  _id: 3,
  last_name: "Ostroumova",
  first_name: "Anna",
  year_born: 1871,
  year_died: 1955,
  nationality: "Russia"
},
{
  _id: 4,
  last_name: "Van Gogh",
  first_name: "Vincent",
  year_born: 1853,
  year_died: 1890,
  nationality: "Holland"
},
{
  _id: 5,
  last_name: "Maurer",
  first_name: "Alfred",
  year_born: 1868,
  year_died: 1932,
  nationality: "USA"
},
{
  _id: 6,
  last_name: "Munch",
  first_name: "Edvard",
  year_born: 1863,
  year_died: 1944,
  nationality: "Norway"
},
{
  _id: 7,
  last_name: "Redon",
  first_name: "Odilon",
  year_born: 1840,
  year_died: 1916,
  nationality: "France"
},
{
  _id: 8,
  last_name: "Diriks",
  first_name: "Edvard",
  year_born: 1855,
  year_died: 1930,
  nationality: "Norway"
}
```

A operação a seguir agrupa os documentos em *buckets* de acordo com o ano de nascimento (`year_born`) e filtra baseado no total de documentos dos *buckets*:

```language-javascript

db.artists.aggregate([
  // Primeiro Estágio
  {
    $bucket: {
      groupBy: "$year_born",                        // Campo para agrupamento
      boundaries: [1840, 1850, 1860, 1870, 1880],   // Limites para os buckets
      default: "Other",                             // Bucket id para os documentos que não se enquadrarem em nenhum bucket
      output: {                                     // Saída de cada bucket
        count: { $sum: 1 },
        artists : {
          $push: {
            name: { $concat: ["$first_name", " ", "$last_name"] },
            year_born: "$year_born"
          }
        }
      }
    }
  },
  // Segundo Estágio
  {
    $match: { count: { $gt: 3 } }
  }
]).pretty();
```

Após o primeiro estágio, são criados `5` *buckets*: um para cada par de valores consecutivos do *array* `boundaries` e um extra para todos os documentos que não se enquadrarem no critério de agrupamento. Esse critério, definido pela opção `groupBy`, é o valor do campo `year_born`. O `_id` desse *bucket* extra será `"Other"` e é definido pela opção `default`.

Como dito, haverá um documento de saída para cada *bucket*. Esse documento conterá o campo `count`, com o total de documentos do *bucket*, e o campo `artists`, que será um array de subdocumentos. Esses subdocumentos possuirão os campos `name` e `year_born`, contendo, respectivamente, o nome completo e o ano de nascimento de cada artista.

A saída do primeiro estágio é a seguinte:

```language-javascript
{
  "_id" : 1840,
  "count" : 1,
  "artists" : [
    {
      "name" : "Odilon Redon",
      "year_born" : 1840
      }
  ]
}
{
  "_id" : 1850,
  "count" : 2,
  "artists" : [
    {
      "name" : "Vincent Van Gogh",
      "year_born" : 1853
    },
    {
      "name" : "Edvard Diriks",
      "year_born" : 1855
    }
  ]
}
{
  "_id" : 1860,
  "count" : 4,
  "artists" : [
    {
      "name" : "Emil Bernard",
      "year_born" : 1868
    },
    {
      "name" : "Joszef Rippl-Ronai",
      "year_born" : 1861
    },
    {
      "name" : "Alfred Maurer",
      "year_born" : 1868
    },
    {
      "name" : "Edvard Munch",
      "year_born" : 1863
    }
  ]
}
{
  "_id" : 1870,
  "count" : 1,
  "artists" : [
    {
      "name" : "Anna Ostroumova",
      "year_born" : 1871
    }
  ]
}
```

Como esperado, cada *bucket* só contém dados de artistas cujo ano de nascimento está dentro dos limites inferior e supoerior do *bucket*.

Em seguida, os documentos serão passados para o estágio `$match`, que retornará apenas os *buckets* com mais de `3` artistas:

```language-javascript
{
  "_id" : 1860,
  "count" : 4,
  "artists" : [
    { "name" : "Emil Bernard", "year_born" : 1868 },
    { "name" : "Joszef Rippl-Ronai", "year_born" : 1861 },
    { "name" : "Alfred Maurer", "year_born" : 1868 },
    { "name" : "Edvard Munch", "year_born" : 1863 }
  ]
}
```

### Estágio $facet

Com o estágio `$facet`, você consegue processar múltiplos *pipelines* em um único estágio com os mesmos documentos de entrada. Cada *sub-pipeline* tem seu próprio campo no documento de saída, onde os resultados são armazenados como um *array* de documentos.

Com o `$facet`, fica muito mais fácil criar saídas com múltiplas visões. Cada uma dessas visões pode ter seus próprios filtros e mostrar seus resultados. Um uso muito comum são as pesquisas em sites de e-commerce, onde, após uma pesquisa específica, temos diversos tipos de filtros: faixa de preços, marcas, cores etc.

Considere a coleção `artwork` com os seguintes documentos:

```language-javascript
{
  _id: 1,
  title: "The Pillars of Society",
  artist: "Grosz",
  year: 1926,
  price: NumberDecimal("199.99"),
  tags: ["painting", "satire", "Expressionism", "caricature"]
},
{
  _id: 2,
  title: "Melancholy III",
  artist: "Munch",
  year: 1902,
  price: NumberDecimal("280.00"),
  tags: ["woodcut", "Expressionism"]
},
{
  _id: 3,
  title: "Dancer",
  artist: "Miro",
  year: 1925,
  price: NumberDecimal("76.04"),
  tags: ["oil", "Surrealism", "painting"]
},
{
  _id: 4,
  title: "The Great Wave off Kanagawa",
  artist: "Hokusai",
  price: NumberDecimal("167.30"),
  tags: ["woodblock", "ukiyo-e"]
},
{
  _id: 5,
  title: "The Persistence of Memory",
  artist: "Dali",
  year: 1931,
  price : NumberDecimal("483.00"),
  tags: ["Surrealism", "painting", "oil"]
},
{
  _id: 6,
  title: "Composition VII",
  artist: "Kandinsky",
  year: 1913,
  price: NumberDecimal("385.00"),
  tags: ["oil", "painting", "abstract"]
},
{
  _id: 7,
  title: "The Scream",
  artist: "Munch",
  year: 1893,
  tags: ["Expressionism", "painting", "oil"]
},
{
  _id: 8,
  title: "Blue Flower",
  artist: "O'Keefe",
  year: 1918,
  price: NumberDecimal("118.42"),
  tags: ["abstract", "painting"]
}
```

Podemos criar três visualizações em uma única operação de agregação: visão por `tags`, por faixa de preço (`price`) e por ano (`year`). Para esse último, será utilizado o operador `$bucketAuto`, que utilizará os valores do campo `year` e criará automaticamente os *buckets*:

```language-javascript
db.artwork.aggregate( [
  {
    $facet: {
      "categorizedByTags": [
        { $unwind: "$tags" },
        { $sortByCount: "$tags" }
      ],
      "categorizedByPrice": [
        // Filtra documentos sem preço. Ex.: _id: 7
        { $match: { price: { $exists: 1 } } },
        {
          $bucket: {
            groupBy: "$price",
            boundaries: [0, 150, 200, 300, 400],
            default: "Other",
            output: {
              "count": { $sum: 1 },
              "titles": { $push: "$title" }
            }
          }
        }
      ],
      "categorizedByYears(Auto)": [
        {
          $bucketAuto: {
            groupBy: "$year",
            buckets: 4
          }
        }
      ]
    }
  }
])
```

A primeira visualização, por `tags`, define um *pipeline* de dois estágios. O primeiro estágio utiliza o operador `$unwind` para descontruir o *array* `tags`. Como visto anteriormente, o resultado dessa operação é a criação de múltiplos documentos. Cada documento de saída é o documento de entrada com o valor *array* substituído pelo elemento.

O segundo estágio utiliza o operador `$sortByCount`, especificando o campo `tags`. Esse operador agrupa documentos de entrada baseado no valor da expressão especificada (o campo `tags`, no caso), e então calcula a quantidade de documentos em cada grupo.

Cada documento de saída possui um campo `_id`, com o valor de agrupamento, e um campo `count`, contendo o número de documentos pertencentes àquele grupo.

Os documentos são ordenados pela contagem em ordem decrescente.

A segunda visualização é feita pelo campo `price` e também possui dois estágios. O primeiro estágio filtra os documentos que não possuem um preço. O segundo utiliza o operador de agregação `$bucket` para realizar o agrupamento. Cada documento de saída contém o número de documentos no campo `count` e um *array* com os títulos de cada documento daquele grupo no campo `titles`.

Por fim, a terceria visualização utiliza o operador de agregação `$bucketAuto`. Esse operador é semelhante ao operador `$bucket`. Contudo, os limites de cada *bucket* são determinados automaticamente e os documentos são distribuídos de forma uniforme pelo número especificado de *buckets*. No exemplo, como existem 8 documentos, serão criados 4 *buckets*, cada um contendo 2 documentos.

O resultado dessa operação é o seguinte:

```language-javascript
{
  "categorizedByTags" : [
    {
      "_id" : "painting",
      "count" : 6
    },
    {
      "_id" : "oil",
      "count" : 4
    },
    {
      "_id" : "Expressionism",
      "count" : 3
    },
    {
      "_id" : "Surrealism",
      "count" : 2
    },
    {
      "_id" : "abstract",
      "count" : 2
    },
    {
      "_id" : "woodcut",
      "count" : 1
    },
    {
      "_id" : "ukiyo-e",
      "count" : 1
    },
    {
      "_id" : "woodblock",
      "count" : 1
    },
    {
      "_id" : "satire",
      "count" : 1
    },
    {
      "_id" : "caricature",
      "count" : 1
    }
  ],
  "categorizedByPrice" : [
    {
      "_id" : 0,
      "count" : 2,
      "titles" : [
        "Dancer",
        "Blue Flower"
      ]
    },
    {
      "_id" : 150,
      "count" : 2,
      "titles" : [
        "The Pillars of Society",
        "The Great Wave off Kanagawa"
      ]
    },
    {
      "_id" : 200,
      "count" : 1,
      "titles" : [
        "Melancholy III"
      ]
    },
    {
      "_id" : 300,
      "count" : 1,
      "titles" : [
        "Composition VII"
      ]
    },
    {
      "_id" : "Other",
      "count" : 1,
      "titles" : [
        "The Persistence of Memory"
      ]
    }
  ],
  "categorizedByYears(Auto)" : [
    {
      "_id" : {
        "min" : null,
        "max" : 1902
      },
      "count" : 2
    },
    {
      "_id" : {
        "min" : 1902,
        "max" : 1918
      },
      "count" : 2
    },
    {
      "_id" : {
        "min" : 1918,
        "max" : 1926
      },
      "count" : 2
    },
    {
      "_id" : {
        "min" : 1926,
        "max" : 1931
      },
      "count" : 2
    }
  ]
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

### Agora a prática

O MongoDb possui diversas ferramentas como por exemplo, `mongo`, `mongosh`, `Compass` e outras ferramentas de terceiros.
Você pode utilizar o que achar melhor para executar as *queries*, o importante é realizá-las.

Para realizar os exercícios a seguir, faça o download do arquivo [nycFacilities.json](nycFacilities.json) {: .external-link target="_blank" rel="noreferrer noopener" } e o importe para a sua instância local utilizando o comando abaixo:

```language-bash
mongoimport --db aggregations --collection nycFacilities <caminho_do_arquivo_nycFacilities.json>
```

---

Você está planejando sua viagem para Nova York e, para isso, quer conhecer melhor os arredores do hotel onde você ficará hospedado, o `HOTEL New York`, que tem a seguinte geo-localização: `[-73.9926234, 40.7584905]`.

**Exercício 1**: Crie um índice do tipo `2dsphere` no campo `location`.

**Exercício 2**: Obtenha uma lista com todos os tipos de `facilities` da coleção. Calcule a quantidade de `facilities` que existe de cada tipo. Ordene o resultado pela quantidade de `facilities`, de forma ascendente.

**Exercício 3**: Encontre todos os **aeroportos** próximos do seu hotel. Ordene o resultado pela proximidade.

**Exercício 4**: Adicione a todos os documentos retornados no exercício anterior um campo com a distância calculada em `km`, com duas casas decimais.

**Exercício 5**: Você quer categorizar os hospitais em `5` grupos, de acordo com a distância da sua localização até o hospital. Os grupos serão delimitados pela distância do hospital até sua localização em intervalos de 1 quilômetro. Por exemplo, no primeiro grupo ficarão os hospitais que estão entre `0` e `1000` metros de distância, no segundo os que ficam de `1000` a `2000` metros, e assim por diante. Em cada grupo, coloque a quantidade de hospitais que existem naquele grupo e uma lista com o nome e endereço de cada hospital, no formato `<rua>, <número> - <cidade>. Zipcode: <zipcode>`.

Dica: Utilize a opção `maxDistance` do operador `$geoNear` para excluir os hospitais que estão muito longe da sua localização.

**Exercício 6**: Utilizando somente um estágio, crie duas visões para os dados da coleção `nycFacilities` para trazer o total de localidades. A primeira visão deve agrupada por categoria (`type`) e ser ordenada pela categoria em ordem alfabética. A segunda deve ser agrupada por categoria (`type`) e bairro (`borough`) e ser ordenada por categorias e bairros em ordem alfabética e pela contagem em ordem descendente.

**Exercício 7**: Você gosta de parques e museus, então crie visões que agrupem essas duas categorias (`type`) por bairros (`borough`). Em ambas as visões, conte quantas localidades há em cada bairro e ordene o resultado pela quantidade de localidades em ordem decrescente.

**Exercício 8**: Depois de uma viagem de 9 horas, você chegará cansado, mas não vai querer perder o dia. Selecione um parque e um museu que fiquem até `800` metros de seu hotel.

Dica: Utilize a opção `maxDistance` do operador `$geoNear`.

---

Agora vamos praticar um pouco utilizando o operador `$graphLookup`. Para isso, faça o download do arquivo [parent_reference.json](parent_reference.json) {: .external-link target="_blank" rel="noreferrer noopener" } e o importe para a sua instância local:

```language-bash
mongoimport --db aggregations --collection parent_reference <caminho_do_arquivo_parent_reference.json>
```

Essa coleção possui 11 documentos. Monte a árvore utilizando os campos `reports_to` e `_id`.

**Exercício 9**: Monte a árvore hierárquica da coleção `parent_reference` utilizando o `$graphLookup`.

**Exercício 10**: Encontre todas as pessoas que reportam para o `Eliot`.

**Exercício 11**: Encontre todos os superiores da `Shannon`.

---

## Recursos adicionais (opcional)

* [$geoNear](https://docs.mongodb.com/manual/reference/operator/aggregation/geoNear/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [2dsphere indexes](https://docs.mongodb.com/manual/core/2dsphere/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [$graphLookup](https://docs.mongodb.com/manual/reference/operator/aggregation/graphLookup/index.html) {: .external-link target="_blank" rel="noreferrer noopener" }

* [$bucketAuto](https://docs.mongodb.com/manual/reference/operator/aggregation/bucketAuto/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [$sortByCount](https://docs.mongodb.com/manual/reference/operator/aggregation/sortByCount/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Geospatial Indexes](https://docs.mongodb.com/manual/geospatial-queries/#index-feature-geospatial) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
