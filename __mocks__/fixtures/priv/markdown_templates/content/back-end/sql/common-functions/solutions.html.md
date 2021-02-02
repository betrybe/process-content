## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

## Exercícios de fixação

### Manipulação de strings

**Exercício 1:** Faça uma *query* que exiba a palavra `'trybe'` em CAIXA ALTA.

```language-sql
SELECT UCASE('trybe');
```

**Exercício 2:** Faça uma *query* que transforme a frase `'Você já ouviu falar do DuckGoGo?'` em `'Você já ouviu falar do Google?'`.

```language-sql
SELECT replace('Você já ouviu falar do DuckGoGo?', 'DuckGoGo', 'Google');
```

**Exercício 3:** Utilizando uma *query*, encontre quantos caracteres temos em `'Uma frase qualquer'`.

```language-sql
SELECT LENGTH('Uma frase qualquer');
```

**Exercício 4:** Extraia a palavra "JavaScript" da frase `'A linguagem JavaScript está entre as mais usadas'`.

```language-sql
SELECT SUBSTRING('A linguagem JavaScript está entre as mais usadas', 13, 10);
-- OU
SELECT SUBSTRING('A linguagem JavaScript está entre as mais usadas', -36, 10);
```

**Exercício 5:** Por fim, padronize a string `'RUA NORTE 1500, SÃO PAULO, BRASIL'` para que suas informações estejam todas em caixa baixa.

```language-sql
SELECT LCASE('RUA NORTE 1500, SÃO PAULO, BRASIL');
```

### Condicionais

**Exercício 1:** Usando o `IF` na tabela `sakila.film`, exiba o **id do filme**, o **título** e uma coluna extra chamada **'conheço o filme?'**, em que deve-se avaliar se o nome do filme é '**ACE GOLDFINGER**'. Caso seja, exiba "Já assisti esse filme". Caso contrário, exiba "Não conheço o filme". Não esqueça de usar um alias para renomear a coluna da condicional.

```language-sql
SELECT
    film_id,
    title,
    IF(title = 'ACE GOLDFINGER', 'Já assistí o filme', 'Não conheço o filme') AS 'conheço o filme?'
FROM sakila.film;
```

**Exercício 2:** Usando o `CASE` na tabela `sakila.film`, exiba o **título**, a **classificação indicativa** (`rating`) e uma coluna extra que vamos chamar de **'público alvo'**, em que classificaremos o filme de acordo com as seguintes siglas:

  * **G:** "Livre para todos";
  * **PG:** "Não recomendado para menores de 10 anos";
  * **PG-13:** "Não recomendado para menores de 13 anos";
  * **R:** "Não recomendado para menores de 17 anos";
  * **Se não cair em nenhuma das classificações anteriores:** "Proibido para menores de idade".

```language-sql
SELECT
    title,
    rating,
    CASE
        WHEN rating = 'G' THEN 'Livre para todos'
        WHEN rating = 'PG' THEN 'Não recomendado para menores de 10 anos'
        WHEN rating = 'PG-13' THEN 'Não recomendado para menores de 13 anos'
        WHEN rating = 'R' THEN 'Não recomendado para menores de 17 anos'
        ELSE 'Proibido para menores de idade'
    END AS 'público Alvo'
FROM sakila.film;
```

### Desafios DIV e MOD

Dica antes de iniciar: Um valor par pode ser classificado assim quando você o divide por 2 e o restante dessa divisão é 0.

**Exercício 1:** Monte uma *query* usando o `MOD` juntamente com o `IF` para descobrir se o valor 15 é par ou ímpar. Chame essa coluna de **'Par ou Ímpar'**, onde ela pode dizer 'Par' ou 'Impar'.

```language-sql
SELECT IF(15 MOD 2 = 0, 'Par', 'Ímpar') AS 'Par ou Ímpar';
```

**Exercício 2:** Monte uma *query* usando o `MOD` juntamente com o `IF` para descobrir se o valor 20 é par ou ímpar. Chame essa coluna de **'Par ou Ímpar'**, onde ela pode dizer 'Par' ou 'Impar'.

```language-sql
SELECT IF(20 MOD 2 = 0, 'Par', 'Ímpar') AS 'Par ou Ímpar';
```

**Exercício 3:** Temos uma sala de cinema que comporta 220 pessoas. Quantos grupos completos de 12 pessoas podemos levar ao cinema sem que ninguém fique de fora?

```language-sql
SELECT 220 DIV 12;
```

**Exercício 4:** Utilizando o resultado anterior, responda à seguinte pergunta: Temos lugares sobrando? Se sim, quantos?

```language-sql
SELECT 220 MOD 12;
```

### Gerando valores aleatórios

**Exercício 1:** Monte uma *query* que gere um valor entre **15** e **20**.

```language-sql
SELECT FLOOR(15 + (RAND() * 5));
```

**Exercício 2:** Monte uma *query* que exiba o valor arredondado de **15.75** com uma precisão de 5 casas decimais.

```language-sql
SELECT ROUND(15.75, 5);
```

**Exercício 3:** Estamos com uma média de 39.494 de vendas de camisas por mês. Qual é o **valor aproximado** para baixo dessa média?

```language-sql
SELECT FLOOR(39.494);
```

**Exercício 4:** Temos uma taxa de inscrição de 85.234% no curso de fotografia para iniciantes. Qual é o **valor aproximado** para cima dessa média?

```language-sql
SELECT CEIL(85.234);
```

### Trabalhando com datas

**Exercício 1:** Monte uma *query* que exiba a diferença de dias entre `'2030-01-20'` e hoje.

```language-sql
SELECT DATEDIFF('2030-01-20', NOW());
-- OU
SELECT DATEDIFF('2030-01-20', CURRENT_DATE());
```

**Exercício 2:** Monte uma *query* exiba a diferença de horas entre `'10:25:45'` e `'11:00:00'`.

```language-sql
SELECT TIMEDIFF('10:25:45', '11:00:00');
```

### Utilizando as funções de agregação `AVG`, `MIN`, `MAX`, `SUM` e `COUNT`

**Exercício 1:** Monte um *query* que exiba:

  * A **média de duração** dos filmes e dê o nome da coluna de 'Média de Duração';
  * A **duração mínima** dos filmes como 'Duração Mínima';
  * A **duração máxima** dos filmes como 'Duração Máxima';
  * A **soma de todas** as durações como 'Tempo de Exibição Total';
  * E finalmente, a **quantidade total** de filmes cadastrados na tabela `sakila.film` como 'Filmes Registrados'.

```language-sql
SELECT AVG(length) AS 'Média de Duração',
       MIN(length) AS 'Duração Mínima',
       MAX(length) AS 'Duração Máxima',
       SUM(length) AS 'Tempo de Exibição Total',
       COUNT(*) AS 'Filmes Registrados'
FROM sakila.film;
```

### Exibindo e filtrando dados de forma agrupada com `GROUP BY` e `HAVING`

**Exercício 1:** Monte uma query que exiba a quantidade de clientes cadastrados na tabela `sakila.customer` que estão ativos e a quantidade que estão inativos.

```language-sql
SELECT active, COUNT(*)
FROM sakila.customer
GROUP BY active;
```

**Exercício 2:** Monte uma query para a tabela `sakila.customer` que exiba a quantidade de clientes ativos e inativos por loja. Os resultados devem conter o **ID da loja**, o **status dos clientes** (ativos ou inativos) e a **quantidade de clientes por status**.

```language-sql
SELECT store_id, active, COUNT(*)
FROM sakila.customer
GROUP BY store_id, active;
```

**Exercício 3:** Monte uma query que exiba a **média de duração** por **classificação indicativa** (`rating`) dos filmes cadastrados na tabela `sakila.film`. Os resultados devem ser agrupados pela classificação indicativa e ordenados da maior média para a menor.

```language-sql
SELECT AVG(rental_duration) AS avg_rental_duration, rating
FROM sakila.film
GROUP BY rating
ORDER BY avg_rental_duration DESC;
```

**Exercício 4:** Monte uma query para a tabela `sakila.address` que exiba o **nome do distrito** e a **quantidade** de endereços registrados nele. Os resultados devem ser ordenados da maior quantidade para a menor.

```language-sql
SELECT district, COUNT(*)
FROM sakila.address
GROUP BY district
ORDER BY COUNT(*) DESC;
```

### Filtrando Resultados do `GROUP BY` com `HAVING`

**Exercício 1:** Usando a query a seguir, exiba apenas as durações médias que estão entre 115.0 a 121.50. Além disso, dê um `alias` (apelido) à coluna gerada por `AVG(length)`, de forma que deixe a query mais legível. Finalize ordenando os resultados de forma decrescente.

```language-sql
SELECT rating, AVG(length) duracao_media
FROM sakila.film
GROUP BY rating
HAVING duracao_media BETWEEN 115.0 AND 121.50
ORDER BY duracao_media DESC;
```

**Exercício 2:** Usando a query a seguir, exiba apenas os valores de **total de substituição de custo** que estão acima de $3950.50. Dê um `alias` que faça sentido para `SUM(replacement_cost)`, de forma que deixe a query mais legível. Finalize ordenando os resultados de forma crescente.

```language-sql
SELECT rating, SUM(replacement_cost) as custo_de_substituicao
FROM sakila.film
GROUP BY rating
HAVING custo_de_substituicao  > 3950.50
ORDER BY custo_de_substituicao;
```
