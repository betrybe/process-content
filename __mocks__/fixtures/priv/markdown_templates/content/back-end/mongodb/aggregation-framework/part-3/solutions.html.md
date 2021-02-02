## Gabarito dos exercícios

A seguir, encontra-se uma sugestão de solução para os exercícios propostos.

**Exercício 1**: Crie um índice do tipo `2dsphere` no campo `location`.

```language-javascript
db.nycFacilities.createIndex({ location: "2dsphere" });
```

**Exercício 2**: Obtenha uma lista com todos os tipos de `facilities` da coleção. Calcule a quantidade de `facilities` que existe de cada tipo. Ordene o resultado pela quantidade de `facilities`, de forma ascendente.

```language-javascript
db.nycFacilities.aggregate([
  {
    $group: {
      _id: "$type",
      totalPorTipo: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
]);
```

**Exercício 3**: Encontre todos os **aeroportos** próximos do seu hotel. Ordene o resultado pela proximidade.

```language-javascript
db.nycFacilities.aggregate([
  {
    $geoNear: {
      near: {
        type: 'Point',
        coordinates: [-73.9926234, 40.7584905]
      },
      distanceField: 'distanciaDoMeuHotel',
      spherical: true,
      query: { type: "Airport" }
    }
  },
  {
    $sort: { distanciaDoMeuHotel: 1 }
  }
]).pretty();
```

**Exercício 4**: Adicione a todos os documentos retornados no exercício anterior um campo com a distância calculada em `km`, com duas casas decimais.

```language-javascript
db.nycFacilities.aggregate([
  {
    $geoNear: {
      near: {
        type: 'Point',
        coordinates: [-73.9926234, 40.7584905]
      },
      distanceField: 'distanciaDoMeuHotel',
      spherical: true,
      query: { type: "Airport" }
    }
  },
  {
    $sort: { distanciaDoMeuHotel: 1 }
  },
  {
    $addFields: {
      distanciaEmKm: {
        $trunc: [
          { $divide: ["$distanciaDoMeuHotel", 1000] },
          2
        ]
      }
    }
  }
]).pretty();
```

**Exercício 5**: Você quer categorizar os hospitais em `5` grupos, de acordo com a distância da sua localização até o hospital. Os grupos serão delimitados pela distância do hospital até sua localização em intervalos de 1 quilômetro. Por exemplo, no primeiro grupo ficarão os hospitais que estão entre `0` e `1000` metros de distância, no segundo os que ficam de `1000` a `2000` metros, e assim por diante. Em cada grupo, coloque a quantidade de hospitais que existem naquele grupo e uma lista com o nome e endereço de cada hospital, no formato `<rua>, <número> - <cidade>. Zipcode: <zipcode>`.

Dica: Utilize a opção `maxDistance` do operador `$geoNear` para excluir os hospitais que estão muito longe da sua localização.

```language-javascript
db.nycFacilities.aggregate([
  {
    $geoNear: {
      near: {
        type: 'Point',
        coordinates: [-73.9926234, 40.7584905]
      },
      distanceField: 'distanciaDoMeuHotel',
      spherical: true,
      query: { type: "Hospital" },
      maxDistance: 5000
    }
  },
  {
    $bucket: {
      groupBy: "$distanciaDoMeuHotel",
      boundaries: [0, 1000, 2000, 3000, 4000, 5000],
      output: {
        quantidade: { $sum: 1 },
        hospitais: {
          $push: {
            nome: "$name",
            endereco: {
              $concat: [
                "$address.street",
                ", ",
                "$address.number",
                " - ",
                "$address.city",
                ". Zipcode: ",
                "$address.zipcode"
              ]
            }
          }
        }
      }
    }
  }
]).pretty();
```

```language-javascript
db.nycFacilities.aggregate([
  {
    $geoNear: {
      near: {
        type: 'Point',
        coordinates: [-73.9926234, 40.7584905]
      },
      distanceField: 'distanciaDoMeuHotel',
      spherical: true,
      query: { type:"Airport" }
    }
  },
  {
    $sort: {
      distanciaDoMeuHotel: 1
    }
  },
  {
    $addFields: {
      distanciaEmKm: {
        $trunc: [
          { $divide: ["$distanciaDoMeuHotel", 1000] },
          2
        ]
      }
    }
  },
  {
    $count: "Hospitais"
  }
]).pretty();
```

**Exercício 6**: Utilizando somente um estágio, crie duas visões para os dados da coleção `nycFacilities` para trazer o total de localidades. A primeira visão deve ser agrupada por categoria (`type`) e ser ordenada pela categoria em ordem alfabética. A segunda deve ser agrupada por categoria (`type`) e bairro (`borough`) e ser ordenada por categorias e bairros em ordem alfabética e pela contagem em ordem descendente.

```language-javascript
db.nycFacilities.aggregate([
  {
    $facet: {
      categoria: [
        {
          $group: {
            _id: "$type",
            total: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ],
      categoriasPorBairro: [
        {
          $group: {
            _id: {
              "categoria": "$type",
              "bairro": "$borough"
            },
            total: { $sum: 1 }
          }
        },
        {
          $sort: {
            "_id.bairro": 1,
            "_id.categoria": 1,
            "total": -1
          }
        }
      ]
    }
  }
]).pretty();
```

**Exercício 7**: Você gosta de parques e museus, então crie visões que agrupem essas duas categorias (`type`) por bairros (`borough`). Em ambas as visões, conte quantas localidades há em cada bairro e ordene o resultado pela quantidade de localidades em ordem decrescente.

```language-javascript
db.nycFacilities.aggregate([
  {
    $facet: {
      Museus: [
        {
          $match: {
            "type": "Museum"
          }
        },
        {
          $group: {
            _id: "$borough",
            total: { $sum: 1 }
          }
        },
        {
          $sort: { total: -1 }
        },
        {
          $project: {
            _id: 0,
            bairro: "$_id",
            total: "$total"
          }
        }
      ],
      Parques: [
        {
          $match: {
            "type": "Park"
          }
        },
        {
          $group: {
            _id: "$borough",
            total: { $sum: 1 }
          }
        },
        {
          $sort: { total: -1 }
        },
        {
          $project: {
            _id: 0,
            bairro: "$_id",
            total: "$total"
          }
        }
      ]
    }
  }
]).pretty();
```

**Exercício 8**: Depois de uma viagem de 9 horas, você chegará cansado, mas não vai querer perder o dia. Selecione um parque e um museu que fiquem até `800` metros de seu hotel.

Dica: Utilize a opção `maxDistance` do operador `$geoNear`.

```language-javascript
db.nycFacilities.aggregate( [
  {
    $geoNear: {
      near: {
        type: 'Point',
        coordinates: [-73.9926234,40.7584905]
      },
      distanceField: 'distanciaDoMeuHotel',
      spherical: true,
      query: {
        type:{ $in: ["Museum", "Park"] }
      },
      maxDistance: 800
    }
  },
  {
    $facet: {
      Museu: [
        {
          $match: {
            "type": "Museum"
          }
        },
        {
          $sort: {
            "distanciaDoMeuHotel": 1
          }
        },
        { $limit: 1 }
      ],
      Parque: [
        {
          $match: {
            "type": "Park"
          }
        },
        {
          $sort: {
            "distanciaDoMeuHotel": 1
          }
        },
        { $limit: 1 }
      ]
    }
  }
]);
```

**Exercício 9**: Monte a árvore hierárquica da coleção `parent_reference` utilizando o `$graphLookup`.

```language-javascript
db.parent_reference.aggregate([
  {
    $graphLookup: {
      from: "parent_reference",
      startWith: "$_id",
      connectFromField: "_id",
      connectToField: "reports_to",
      as: "hierarquia"
    }
  }
]).pretty();
```

**Exercício 10**: Encontre todas as pessoas que reportam para o `Eliot`.

```language-javascript
db.parent_reference.aggregate([
  {
    $match: {
      name: "Eliot"
    }
  },
  {
    $graphLookup: {
      from: "parent_reference",
      startWith: "$_id",
      connectFromField: "_id",
      connectToField: "reports_to",
      as: "hierarquia"
    }
  },
  {
    $project: {
      _id: 0,
      hierarquia: 1
    }
  }
]).pretty();
```

**Exercício 11**: Encontre todos os superiores da `Shannon`.

```language-javascript
db.parent_reference.aggregate([
  {
    $match: {
      name: "Shannon"
    }
  },
  {
    $graphLookup: {
      from: "parent_reference",
      startWith: "$reports_to",
      connectFromField: "reports_to",
      connectToField: "_id",
      as: "chefes"
    }
  }
]).pretty();
```
