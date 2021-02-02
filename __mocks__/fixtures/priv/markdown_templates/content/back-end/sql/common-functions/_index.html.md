## O que vamos aprender?

Hoje você vai aprender como facilitar **MUITO** sua vida através das principais funções que lidam com números, strings, datas e agregação de dados no **MySQL**.

### Você será capaz de:

* Criar condicionais no SQL usando `IF` e `CASE`;
* Manipular strings no SQL;
* Usar as diversas **funções matemáticas** do **MySQL**;
* Extrair informações específicas sobre **datas** de uma tabela;
* Utilizar as funções de agregação `AVG`, `MIN`, `MAX`, `SUM` e `COUNT`;
* Exibir e filtrar dados de forma agrupada com `GROUP BY` e `HAVING`.

---

## Por que isso é importante?

Isso é importante porque os comandos e funcionalidades que você vai ver hoje te permitirão encontrar informações estatísticas e temporais sobre seus dados. Além disso, ao saber controlar o fluxo de uma _query_ utilizando condicionais, você será capaz de tratar diferentes cenários em uma única consulta.

---

## Conteúdos:

###### Tempo sugerido para realização: 120 minutos

### Manipulação de strings

Uma das responsabilidades das pessoas que lidam com o registro de informações em um banco de dados é se certificar de que esses dados estão coerentes, normalizados e cadastrados no formato correto. O **MySQL** possui algumas funções de manipulação de **string** que facilitam essas tarefas.

As principais podem ser vistas a seguir:

```language-sql
-- Converte o texto da string para CAIXA ALTA
SELECT UCASE('Oi, eu sou uma string');

-- Converte o texto da string para caixa baixa
SELECT LCASE('Oi, eu sou uma string');

-- Substitui as ocorrências de uma substring em uma string
SELECT REPLACE('Oi, eu sou uma string', 'string', 'cadeia de caracteres');

-- Retorna a parte da esquerda de uma string de acordo com o
-- número de caracteres especificado
SELECT LEFT('Oi, eu sou uma string', 3);

-- Retorna a parte da direita de uma string de acordo com o
-- número de caracteres especificado
SELECT RIGHT('Oi, eu sou um string', 6);

-- Exibe o tamanho, em caracteres, da string
SELECT LENGTH('Oi, eu sou uma string');

-- Extrai parte de uma string de acordo com o índice de um caractere inicial
-- e a quantidade de caracteres a extrair
SELECT SUBSTRING('Oi, eu sou uma string', 5, 2);

-- Se a quantidade de caracteres a extrair não for definida,
-- então a string será extraída do índice inicial definido, até o seu final
SELECT SUBSTRING('Oi, eu sou uma string', 5);
```

Para fixar melhor, que tal explorar na prática o que cada comando faz? Rode cada um deles no **MySQL Workbench** e veja os resultados.

Observe que, apesar de ter usado strings temporárias nos exemplos acima, também é possível fazer essas operações diretamente nas colunas de uma tabela. Para testar, execute o código abaixo no seu ambiente local, brinque com as linhas a seguir e depois volte aqui.

```language-sql
SELECT UCASE(title) FROM sakila.film LIMIT 10;
SELECT LCASE(title) FROM sakila.film LIMIT 10;
SELECT REPLACE(title, 'ACADEMY', 'FOO') FROM sakila.film WHERE film_id = 1;
SELECT LEFT(title, 7) FROM sakila.film WHERE film_id = 1;
SELECT RIGHT(title, 8) FROM sakila.film WHERE film_id = 1;
SELECT LENGTH(title) FROM sakila.film WHERE film_id = 1;
SELECT SUBSTRING(title, 5, 2) FROM sakila.film WHERE film_id = 1;
SELECT SUBSTRING(title, 5) FROM sakila.film WHERE film_id = 1;
```

Algo importante a se notar sobre strings em SQL é que, diferente de várias linguagens de programação, no SQL *strings* são **indexadas a partir do índice 1** e não no índice 0. Caso tenha resultados inesperados, essa pode ser uma das razões.

Agora, vamos fixar os aprendizados com alguns desafios:

1. Faça uma _query_ que exiba a palavra `'trybe'` em CAIXA ALTA.

2. Faça uma _query_ que transforme a frase `'Você já ouviu falar do DuckDuckGo?'` em `'Você já ouviu falar do Google?'`.

3. Utilizando uma _query_, encontre quantos caracteres temos em `'Uma frase qualquer'`.

4. Extraia e retorne a palavra "JavaScript" da frase `'A linguagem JavaScript está entre as mais usadas'`.

5. Por fim, padronize a string `'RUA NORTE 1500, SÃO PAULO, BRASIL'` para que suas informações estejam todas em caixa baixa.

### Condicionais

Em [linguagens de alto nível](https://woliveiras.com.br/posts/o-que-e-linguagem-de-programacao-de-alto-nivel/) {: .external-link target="_blank" rel="noreferrer noopener" } como *Python*, *JavaScript* e outras, as condicionais são a base para a criação de algorítimos dinâmicos que se adaptam de acordo com a necessidade do programa. O SQL não fica para trás nesse quesito, sendo possível nele também usar os principais comandos de controle de fluxo, como o `IF` e o `CASE`.

Para entender como isso pode ser feito, assista ao vídeo e veja os exemplos abaixo:

<%= vimeo "504557269" %>

```language-sql
-- Sintaxe:
SELECT IF(condicao, valor_se_verdadeiro, valor_se_falso);

SELECT IF(idade >= 18, 'Maior de idade', 'Menor de Idade')
FROM pessoas;

SELECT IF(aberto, 'Entrada permitida', 'Entrada não permitida')
FROM estabelecimentos;

-- Exemplo utilizando o banco sakila:
SELECT first_name, IF(active, 'Cliente Ativo', 'Cliente Inativo') AS status
FROM sakila.customer
LIMIT 20;
```

Em situações em que é preciso comparar mais de uma condição, é preferível utilizar o `CASE`.

```language-sql
-- Sintaxe:
SELECT CASE
  WHEN condicao THEN valor
  ELSE valor padrao
END;

SELECT
    nome,
    nivel_acesso,
    CASE
        WHEN nivel_acesso = 1 THEN 'Nível de acesso 1'
        WHEN nivel_acesso = 2 THEN 'Nível de acesso 2'
        WHEN nivel_acesso = 3 THEN 'Nível de acesso 3'
        ELSE 'Usuário sem acesso'
    END AS nivel_acesso
FROM permissoes_usuario;

-- Exemplo utilizando a tabela sakila.film:
SELECT
    first_name,
    email,
    CASE
        WHEN email = 'MARY.SMITH@sakilacustomer.org' THEN 'Cliente de baixo valor'
        WHEN email = 'PATRICIA.JOHNSON@sakilacustomer.org' THEN 'Cliente de médio valor'
        WHEN email = 'LINDA.WILLIAMS@sakilacustomer.org' THEN 'Cliente de alto valor'
        ELSE 'não classificado'
    END AS valor
FROM sakila.customer
LIMIT 10;
```

É melhor aprender esse tema ~~quebrando a cabeça~~ praticando, então vamos fazer isso.

1. Usando o `IF` na tabela `sakila.film`, exiba o **id do filme**, o **título** e uma coluna extra chamada **'conheço o filme?'**, em que deve-se avaliar se o nome do filme é '**ACE GOLDFINGER**'. Caso seja, exiba "Já assisti a esse filme". Caso contrário, exiba "Não conheço o filme". Não esqueça de usar um alias para renomear a coluna da condicional.

2. Usando o `CASE` na tabela `sakila.film`, exiba o **título**, a **classificação indicativa** (`rating`) e uma coluna extra que vamos chamar de **'público-alvo'**, em que classificaremos o filme de acordo com as seguintes siglas:
    * **G:** "Livre para todos";
    * **PG:** "Não recomendado para menores de 10 anos";
    * **PG-13:** "Não recomendado para menores de 13 anos";
    * **R:** "Não recomendado para menores de 17 anos";
    * **Se não cair em nenhuma das classificações anteriores:** "Proibido para menores de idade".

### Funções matemáticas do MySQL

Até o momento, focamos em como **buscar** e **exibir** informações já existentes em uma tabela. Agora, vamos ver como podemos utilizar essa informação para calcular e gerar novos dados com as principais funções matemáticas disponíveis no **MySQL**.

##### Adição, Subtração, Multiplicação e Divisão

Para as operações matemáticas mais comuns, podemos empregar os operadores matemáticos usuais. Vamos testar cada um deles?

Execute os seguintes comandos dentro do Workbench:

```language-sql
SELECT 5 + 5;
SELECT 5 - 5;
SELECT 5 * 5;
SELECT 5 / 5;
```

Podemos, também, usar as colunas diretamente como base para os cálculos, caso necessário.

```language-sql
SELECT rental_duration + rental_rate FROM sakila.film LIMIT 10;
SELECT rental_duration - rental_rate FROM sakila.film LIMIT 10;
SELECT rental_duration / rental_rate FROM sakila.film LIMIT 10;
SELECT rental_duration * rental_rate FROM sakila.film LIMIT 10;
```

##### Divisão de inteiros com `DIV` e como encontrar seus restos com o `MOD`

O `DIV` retorna o resultado inteiro de uma divisão, ignorando as casas decimais de um número. Veja os exemplos abaixo:

```language-sql
SELECT 10 DIV 3; -- 3
SELECT 10 DIV 2; -- 5
SELECT 14 DIV 3; -- 4
SELECT 13 DIV 2; -- 6
```

Já o operador `MOD` retorna o resto de uma divisão como resultado. Por exemplo:

```language-sql
SELECT 10 MOD 3; -- 1
SELECT 10 MOD 2; -- 0
SELECT 14 MOD 3; -- 2
SELECT 13 MOD 2; -- 1
SELECT 10.5 MOD 2; -- 0.5, ou seja, 2 + 2 + 2 + 2 + 2 = 10, restando 0.5
```

##### Desafios com DIV e MOD

**Dica:** Números pares são aqueles que podem ser divididos em duas partes iguais. Ou seja, são aqueles cuja divisão por 2 retorna resto 0.

1. Monte uma _query_ usando o `MOD` juntamente com o `IF` para descobrir se o valor 15 é par ou ímpar. Chame essa coluna de **'Par ou Ímpar'**, onde ela pode dizer 'Par' ou 'Ímpar'.

2. Temos uma sala de cinema que comporta 220 pessoas. Quantos grupos completos de 12 pessoas podemos levar ao cinema sem que ninguém fique de fora?

3. Utilizando o resultado anterior, responda à seguinte pergunta: temos lugares sobrando? Se sim, quantos?

##### Arredondando Valores

Ter a capacidade de encontrar aproximações de valores é algo extremamente valioso na criação de relatórios e gráficos, que são utilizados por softwares de todos os tipos. O MySQL tem algumas funções que te ajudam a resolver isso. Vamos conhecê-las agora.

O `ROUND` arredonda os números de acordo com sua parte decimal. Se for maior ou igual a 0.5, o resultado é um arredondamento para cima. Caso contrário, ocorre um arredondamento para baixo. Veja os exemplos abaixo:

```language-sql
-- Podemos omitir ou especificar quantas casas decimais queremos
SELECT ROUND(10.4925); -- 10
SELECT ROUND(10.5136); -- 11
SELECT ROUND(-10.5136); -- -11
SELECT ROUND(10.4925, 2); -- 10.49
SELECT ROUND(10.4925, 3); -- 10.493
```

O arredondamento **sempre** para cima pode ser feito com o `CEIL`:

```language-sql
SELECT CEIL(10.51); -- 11
SELECT CEIL(10.49); -- 11
SELECT CEIL(10.2); -- 11
```

O arredondamento **sempre** para baixo pode ser feito com o `FLOOR`:

```language-sql
SELECT FLOOR(10.51); -- 10
SELECT FLOOR(10.49); -- 10
SELECT FLOOR(10.2); -- 10
```

##### Exponenciação e Raiz Quadrada

Para cálculos de exponenciação e raiz quadradas, podemos utilizar as funções `POW` e `SQRT`, respectivamente.

Elevando um número X à potência Y usando a função `POW`:

```language-sql
SELECT POW(2, 2); -- 4
SELECT POW(2, 4); -- 16
```

Encontrando a raiz quadrada de um valor usando `SQRT`:

```language-sql
SELECT SQRT(9); -- 3
SELECT SQRT(16); -- 4
```

##### Gerando valores aleatórios

Para situações em que se faz necessário gerar valores aleatórios, podemos usar a função `RAND`, em conjunto com as funções anteriores.

```language-sql
-- Para gerar um valor aleatório entre 0 e 1:
SELECT RAND();

-- Para gerar um valor entre 7 e 13:
SELECT ROUND(7 + (RAND() * 6));

-- O cálculo que é feito é o seguinte: (7 + (0.0 a 1.0 * 6))
```

##### Consolidando seu conhecimento

1. Monte uma _query_ que gere um valor entre **15** e **20**.

2. Monte uma _query_ que exiba o valor arredondado de **15.75** com uma precisão de 5 casas decimais.

3. Estamos com uma média de 39.494 de vendas de camisas por mês. Qual é o **valor aproximado** para baixo dessa média?

4. Temos uma taxa de inscrição de 85.234% no curso de fotografia para iniciantes. Qual é o **valor aproximado** para cima dessa média?

### Trabalhando com datas

Podemos consultar a data e hora atuais usando as seguintes funções:

```language-sql
SELECT CURRENT_DATE(); -- YYYY-MM-DD
SELECT NOW(); -- YYYY-MM-DD HH:MM:SS
```

Podemos descobrir a diferença em dias entre duas datas usando o `DATEDIFF` e a diferença de tempo entre dois horários usando o `TIMEDIFF`. Em ambos os casos, o segundo valor é subtraído do primeiro para calcular o resultado.

```language-sql
-- 30, ou seja, a primeira data é 30 dias depois da segunda
SELECT DATEDIFF('2020-01-31', '2020-01-01');

-- -30, ou seja, a primeira data é 30 dias antes da segunda
SELECT DATEDIFF('2020-01-01', '2020-01-31');

-- -01:00:00, ou seja, há 1 hora de diferença entre os horários
SELECT TIMEDIFF('08:30:10', '09:30:10');
```

E por fim, podemos extrair qualquer parte de uma data de uma coluna:

```language-sql
SELECT DATE(data_cadastro); -- YYYY-MM-DD
SELECT YEAR(data_cadastro); -- Ano
SELECT MONTH(data_cadastro); -- Mês
SELECT DAY(data_cadastro); -- Dia
SELECT HOUR(data_cadastro); -- Hora
SELECT MINUTE(data_cadastro); -- Minuto
SELECT SECOND(data_cadastro); -- Segundo
```

Também podemos usar `CURRENT_DATE()` e `NOW()` em conjunto com os comandos acima para encontrar resultados dinâmicos da seguinte maneira:

```language-sql
SELECT YEAR(CURRENT_DATE()); -- retorna o ano atual
SELECT HOUR(NOW()); -- retorna a hora atual
```

Para fixar, responda como seria possível encontrar as seguintes informações:

1. Monte uma _query_ que exiba a diferença de dias entre `'2030-01-20'` e hoje.

2. Monte uma _query_ exiba a diferença de horas entre `'10:25:45'` e `'11:00:00'`.

### Utilizando as funções de agregação `AVG`, `MIN`, `MAX`, `SUM` e `COUNT`

Existem certos tipos de cálculos que são usados muito frequentemente e não devem ser feitos manualmente toda vez. Por isso temos as seguintes funções que analisam todos os registros de uma determinada coluna e retornam um valor depois de comparar e avaliar todos os registros.

```language-sql
-- Usando a coluna replacement_cost (valor de substituição) vamos encontrar:
SELECT AVG(replacement_cost) FROM sakila.film; -- 19.984000 (Média entre todos registros)
SELECT MIN(replacement_cost) FROM sakila.film; -- 9.99 (Menor valor encontrado)
SELECT MAX(replacement_cost) FROM sakila.film; -- 29.99 (Maior valor encontrado)
SELECT SUM(replacement_cost) FROM sakila.film; -- 19984.00 (Soma de todos registros)
SELECT COUNT(replacement_cost) FROM sakila.film; -- 1000 registros encontrados (Quantidade)
```

Para praticar, vamos encontrar algumas informações sobre os filmes cadastrados em nossa base de dados.

1. Monte um _query_ que exiba:
    * A **média de duração** dos filmes e dê o nome da coluna de 'Média de Duração';
    * A **duração mínima** dos filmes como 'Duração Mínima';
    * A **duração máxima** dos filmes como 'Duração Máxima';
    * A **soma de todas** as durações como 'Tempo de Exibição Total';
    * E finalmente, a **quantidade total** de filmes cadastrados na tabela `sakila.film` como 'Filmes Registrados'.

### Exibindo e filtrando dados de forma agrupada com `GROUP BY` e `HAVING`

Os resultados de uma _query_ podem ser agrupados por uma ou mais colunas usando o `GROUP BY`, o que faz com que todos os registros que têm o mesmo valor para tais colunas sejam exibidos juntos. O `GROUP BY` também pode ser usado em conjunto com as funções de agregação que vimos anteriormente.

O `GROUP BY` pode ser construído da seguinte forma:

```language-sql
SELECT coluna(s) FROM tabela
GROUP BY coluna(s);
```

Uma das formas como podemos utilizar o `GROUP BY` é agrupar os registros pelo valor de uma coluna, exibindo apenas um registro de cada valor, como é feito com a coluna `first_name` a seguir.

```language-sql
SELECT first_name FROM sakila.actor
GROUP BY first_name;
```

<%= figure(%{src: "/back-end/sql/images/groupby2.png", caption: "Tabela sakila.actor", class: "text-center rounded mx-auto d-block", width: "150px", height: "auto"}) %>

Se você executar a _query_ anterior no seu banco de dados `sakila`, verá que são retornados 108 resultados. Porém, se retirar o `GROUP BY`, como na _query_ abaixo, notará que existem 200 registros na tabela `actor`:

```language-sql
SELECT first_name FROM sakila.actor;
```

Como dito, o `GROUP BY`, utilizado dessa forma, retorna apenas um valor da coluna usada no agrupamento. Em outras palavras, o `GROUP BY` removerá duplicações.

Porém é mais comum utilizar o `GROUP BY` em conjunto com o `AVG`, `MIN`, `MAX`, `SUM` ou `COUNT`. Por exemplo, caso queiramos encontrar quantas vezes cada nome foi registrado, podemos usar o `COUNT()`. Assim, teremos uma informação mais fácil de ser compreendida.

```language-sql
SELECT first_name, COUNT(*) FROM sakila.actor
GROUP BY first_name;
```

<%= figure(%{src: "/back-end/sql/images/groupby1.png", caption: "Tabela sakila.actor", class: "text-center rounded mx-auto d-block", width: "250px", height: "auto"}) %>

Tendo visto isso, agora vamos explorar como utilizar o `GROUP BY` em conjunto com as diversas funções de agregação que foram estudadas até aqui, através alguns exemplos feitos com o nosso banco de dados `sakila`.

```language-sql
-- Média de duração de filmes agrupados por classificação indicativa
SELECT rating, AVG(length)
FROM sakila.film
GROUP BY rating;

-- Valor mínimo de substituição dos filmes agrupados por classificação indicativa
SELECT rating, MIN(replacement_cost)
FROM sakila.film
GROUP BY rating;

-- Valor máximo de substituição dos filmes agrupados por classificação indicativa
SELECT rating, MAX(replacement_cost)
FROM sakila.film
GROUP BY rating;

-- Custo total de substituição de filmes agrupados por classificação indicativa
SELECT rating, SUM(replacement_cost)
FROM sakila.film
GROUP by rating;
```

<%= figure(%{src: "/back-end/sql/images/groupbyavg.png", caption: "Média de duração dos filmes por classificação indicativa", class: "text-center rounded mx-auto d-block", width: "179px", height: "auto"}) %>

<%= figure(%{src: "/back-end/sql/images/groupbymin.png", caption: "Valores mínimos de substituição dos filmes por classificação indicativa", class: "text-center rounded mx-auto d-block", width: "261px", height: "auto"}) %>

<%= figure(%{src: "/back-end/sql/images/groupbymax.png", caption: "Valores máximos de substituição dos filmes por classificação indicativa", class: "text-center rounded mx-auto d-block", width: "238px", height: "auto"}) %>

<%= figure(%{src: "/back-end/sql/images/groupbysum.png", caption: "Soma total do custo de substituição dos filmes por classificação indicativa", class: "text-center rounded mx-auto d-block", width: "270px", height: "auto"}) %>

##### Vamos praticar

1. Monte uma query que exiba a quantidade de clientes cadastrados na tabela `sakila.customer` que estão ativos e a quantidade que estão inativos.

2. Monte uma query para a tabela `sakila.customer` que exiba a quantidade de clientes ativos e inativos por loja. Os resultados devem conter o **ID da loja**, o **status dos clientes** (ativos ou inativos) e a **quantidade de clientes por status**.

3. Monte uma query que exiba a **média de duração** por **classificação indicativa** (`rating`) dos filmes cadastrados na tabela `sakila.film`. Os resultados devem ser agrupados pela classificação indicativa e ordenados da maior média para a menor.

4. Monte uma query para a tabela `sakila.address` que exiba o **nome do distrito** e a **quantidade** de endereços registrados nele. Os resultados devem ser ordenados da maior quantidade para a menor.

Assista ao vídeo para ver outros exemplos de utilização do GROUP BY e também como funciona o HAVING:

<%= vimeo "504556000" %>

##### Filtrando Resultados do `GROUP BY` com `HAVING`

Podemos usar o `HAVING` para filtrar resultados agrupados, assim como usamos o  `SELECT...WHERE` para filtrar resultados individuais.

A query a seguir busca o nome e a quantidade de nomes cadastrados na tabela `sakila.actor` e os agrupa por quantidade. Por fim, filtramos os resultados agrupados usando o `HAVING`, para que somente os nomes que estão cadastrados duas ou mais vezes sejam exibidos.

```language-sql
SELECT first_name, COUNT(*)
FROM sakila.actor
GROUP BY first_name
HAVING COUNT(*) > 2;

-- Ou, melhor ainda, usando o AS para dar nomes às colunas de agregação,
-- melhorando a leitura do resultado
SELECT first_name, COUNT(*) AS nomes_cadastrados
FROM sakila.actor
GROUP BY first_name
HAVING nomes_cadastrados > 2;

-- Observação: o alias não funciona com strings para o HAVING,
-- então use o underline ("_") para separar palavras
-- Ou seja, o exemplo abaixo não vai funcionar
SELECT first_name, COUNT(*) AS 'nomes cadastrados'
FROM sakila.actor
GROUP BY first_name
HAVING 'nomes cadastrados' > 2;
```

É importante entender que quando usamos o `HAVING` estamos filtrando **somente** os resultados gerados **após** o `GROUP BY` ter sido executado.

##### Brincando um pouco com o HAVING

1. Usando a query a seguir, exiba apenas as durações médias que estão entre 115.0 a 121.50. Além disso, dê um `alias` (apelido) à coluna gerada por `AVG(length)`, de forma que deixe a query mais legível. Finalize ordenando os resultados de forma decrescente.

```language-sql
    SELECT rating, AVG(length)
    FROM sakila.film
    GROUP BY rating;
```

2. Usando a query a seguir, exiba apenas os valores de **total de substituição de custo** que estão acima de $3950.50. Dê um `alias` que faça sentido para `SUM(replacement_cost)`, de forma que deixe a query mais legível. Finalize ordenando os resultados de forma crescente.

```language-sql
    SELECT rating, SUM(replacement_cost)
    FROM sakila.film
    GROUP by rating;
```

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Woohoo é isso ae, parabéns por ter finalizado o conteúdo de hoje! Vamos bater um papo agora na aula ao vivo. O link estará disponível no Slack.

<%= figure(%{src: "https:\/\/media.giphy.com/media/eoxomXXVL2S0E/giphy.gif", caption: "You win the internet by Giphy", class: "text-center rounded mx-auto d-block", width: "279px", height: "auto"}) %>

---

## Exercícios

###### Tempo sugerido para realização: 40 minutos

**Exercício 1:** Exercícios sobre funções de agregação [neste link](https://sqlbolt.com/lesson/select_queries_with_aggregates) {: .external-link target="_blank" rel="noreferrer noopener" }.

**Exercício 2:** Exercícios sobre funções de agregação parte 2 [neste link](https://sqlbolt.com/lesson/select_queries_with_aggregates_pt_2) {: .external-link target="_blank" rel="noreferrer noopener" }.

**Restaure o banco de dados abaixo antes de continuar:**

O banco de dados usado como base para os próximos exercícios pode ser restaurado usando [este arquivo SQL](/back-end/sql/hr.sql) {: .external-link target="_blank" rel="noreferrer noopener" }.

1. Baixe o conteúdo do arquivo `.sql` linkado acima;
2. Copie todo o código SQL;
3. Abra o MySQL Workbench e abra uma nova janela de query;
4. Copie todo o código para dentro dessa janela;
5. Selecione todo o código usando Ctrl + a;
6. Execute o código teclando Ctrl + ENTER.

##### Instruções de como fazer os exercícios a seguir

1. Clique no link do exercício;
2. Leia o exercício;
3. Desenvolva a solução eu seu banco de dados local (banco de dados `HR`);
4. Verifique a solução voltando no link do exercício e clicando em "Click me to see the solution" do exercício que está fazendo.

**Exercício 3:** Exercícios sobre funções de agregação parte 3 [neste link](https://www.w3resource.com/mysql-exercises/aggregate-function-exercises/) {: .external-link target="_blank" rel="noreferrer noopener" }.

**Exercício 4:** Exercícios sobre manipulação de strings [neste link](https://www.w3resource.com/mysql-exercises/string-exercises/) {: .external-link target="_blank" rel="noreferrer noopener" }.

**Exercício 5:** Exercícios sobre datas e tempo [neste link](https://www.w3resource.com/mysql-exercises/date-time-exercises/) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

## Próximo

<%= next_button(@conn) %>
