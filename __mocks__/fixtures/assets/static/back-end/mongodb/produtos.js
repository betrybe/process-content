db.produtos.insertMany(
  [
      {
          nome: "Big Mac",
          ingredientes: [
              "hamburguer",
              "alface",
              "queijo",
              "molho especial",
              "cebola",
              "picles",
              "pão com gergelim"
          ],
          tags: [
              "bovino",
              "pão"
          ],
          valoresNutricionais: [
              {
                  tipo: "calorias",
                  quantidade: 502,
                  unidadeMedida: "kcal",
                  percentual: 25
              },
              {
                  tipo: "carboidratos",
                  quantidade: 45,
                  unidadeMedida: "gramas",
                  percentual: 15
              },
              {
                  tipo: "sódio",
                  quantidade: 1047,
                  unidadeMedida: "miligramas",
                  percentual: 44
              },
              {
                  tipo: "proteínas",
                  quantidade: 27,
                  unidadeMedida: "gramas",
                  percentual: 36
              },
              {
                  tipo: "lipídios",
                  quantidade: 25,
                  unidadeMedida: "gramas",
                  percentual: 45
              }
          ],
          descricao: "Não existe nada igual\nDois hambúrgures, alface, queijo, molho especial, cebola e picles num pão com gergelim",
          curtidas: 145,
          vendidos: 137
      },
      {
          nome: "Quarteirão com Queijo",
          ingredientes: [
              "hamburguer",
              "queijo",
              "cebola",
              "picles",
              "pão com gergelim",
              "ketchup",
              "mostarda"
          ],
          valoresNutricionais: [
              {
                  tipo: "calorias",
                  quantidade: 528,
                  unidadeMedida: "kcal",
                  percentual: 26
              },
              {
                  tipo: "carboidratos",
                  quantidade: 33,
                  unidadeMedida: "gramas",
                  percentual: 11
              },
              {
                  tipo: "sódio",
                  quantidade: 1072,
                  unidadeMedida: "miligramas",
                  percentual: 35
              },
              {
                  tipo: "proteínas",
                  quantidade: 30,
                  unidadeMedida: "gramas",
                  percentual: 40
              },
              {
                  tipo: "lipídios",
                  quantidade: 31,
                  unidadeMedida: "gramas",
                  percentual: 56
              }
          ],
          descricao: "Inigualável. Perfeito.\nUm hambúrguer feito com pura carne bovina, envolvida por duas fatias de queijo temperado com ketchup, mostarda, cebola e picles.",
          curtidas: 13,
          vendidos: 39
      },
      {
          nome: "Cheddar McMelt",
          ingredientes: [
              "hamburguer",
              "queijo cheddar",
              "molho shoyu",
              "cebola grelhada",
              "pão escuro com gergelim"
          ],
          valoresNutricionais: [
              {
                  tipo: "calorias",
                  quantidade: 468,
                  unidadeMedida: "kcal",
                  percentual: 23
              },
              {
                  tipo: "carboidratos",
                  quantidade: 30,
                  unidadeMedida: "gramas",
                  percentual: 10
              },
              {
                  tipo: "sódio",
                  quantidade: 819,
                  unidadeMedida: "miligramas",
                  percentual: 34
              },
              {
                  tipo: "proteínas",
                  quantidade: 28,
                  unidadeMedida: "gramas",
                  percentual: 37
              },
              {
                  tipo: "lipídios",
                  quantidade: 27,
                  unidadeMedida: "gramas",
                  percentual: 48
              }
          ],
          descricao: "Sem palavras para descrever.\nFeito com carne bovina, delicioso queijo tipo cheddar derretido, cebola grelhada ao molho shoyu e para completar um pão escuro com gergelim.",
          curtidas: 36,
          vendidos: 97
      },
      {
          nome: "McChicken",
          ingredientes: [
              "frango empanado",
              "molho suave",
              "alface",
              "pão com gergelim"
          ],
          valoresNutricionais: [
              {
                  tipo: "calorias",
                  quantidade: 404,
                  unidadeMedida: "kcal",
                  percentual: 20
              },
              {
                  tipo: "carboidratos",
                  quantidade: 36,
                  unidadeMedida: "gramas",
                  percentual: 12
              },
              {
                  tipo: "sódio",
                  quantidade: 718,
                  unidadeMedida: "miligramas",
                  percentual: 24
              },
              {
                  tipo: "proteínas",
                  quantidade: 17,
                  unidadeMedida: "gramas",
                  percentual: 22
              },
              {
                  tipo: "lipídios",
                  quantidade: 22,
                  unidadeMedida: "gramas",
                  percentual: 39
              }
          ],
          tags: ["ave"],
          descricao: "O sabor que você adora.\nFrango empanado e dourado com molho suave e cremoso, acompanhado de alface crocante num pão com gergelim.",
          curtidas: 108,
          vendidos: 85
      },
      {
          nome: "Extra Chicken",
          ingredientes: [
              "frango empanado",
              "maionese",
              "alface",
              "pão com gergelim",
              "tomate"
          ],
          valoresNutricionais: [
              {
                  tipo: "calorias",
                  quantidade: 345,
                  unidadeMedida: "kcal",
                  percentual: 17
              },
              {
                  tipo: "carboidratos",
                  quantidade: 35,
                  unidadeMedida: "gramas",
                  percentual: 12
              },
              {
                  tipo: "sódio",
                  quantidade: 662,
                  unidadeMedida: "miligramas",
                  percentual: 20
              },
              {
                  tipo: "proteínas",
                  quantidade: 13,
                  unidadeMedida: "gramas",
                  percentual: 18
              },
              {
                  tipo: "lipídios",
                  quantidade: 17,
                  unidadeMedida: "gramas",
                  percentual: 29
              }
          ],
          tags: ["ave"],
          descricao: "Quem ama frango pede.\nPão com gergelim, frango empanado e crocante, alface crespa, tomate fresquinho e a famosa maionese do McDonald's",
          curtidas: 64,
          vendidos: 71
      }
  ]
)
