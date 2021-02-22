## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

## Exercícios de fixação

### Tabela **vazia**? Vamos resolver isso ae! `INSERT` na prática

**Exercício 1:** Insira um novo funcionário na tabela `sakila.staff`.

Para saber quais campos são obrigatórios, clique com o botão direito na tabela `sakila.staff` e selecione "Table Inspector". Clique na aba "columns" e verifique quais campos aceitam nulos para te guiar. Lembre-se de que valores que são gerados automaticamente não precisam ser inseridos manualmente. Boa explorada!

```language-sql
INSERT INTO `sakila`.`staff`
    (first_name, last_name, address_id, email, store_id, active, username, password)
VALUES
    ('Geralt', 'of Rivia', 2, 'tossacoin@gmail.com', 1, 1, 'geralt', 'theWhiteWolf');
```

**Exercício 2:** Feito o exercício anterior, vamos agora para o nível 2. Insira 2 funcionários novos em apenas uma _query_.

```language-sql
INSERT INTO `sakila`.`staff`
    (first_name, last_name, address_id, email, store_id, active, username, password)
VALUES
    ('Jeff', 'Bezos', 2, 'jeffbezos@gmail.com', 1, 1, 'jeffb', 'ImTheChamp'),
    ('Sekiro', 'Okami', 2, 'sekirowolf@gmail.com', 1, 1, 'okami', 'SekiroTheSamurai');
```

**Exercício 3:** Selecione os 5 primeiros nomes e sobrenomes da tabela `sakila.customer` e cadastre essas pessoas como atores na tabela `sakila.actor`.

```language-sql
INSERT INTO sakila.actor(first_name, last_name)
	SELECT first_name, last_name
    FROM sakila.customer
    ORDER BY customer_id
    LIMIT 5;
```

**Exercício 4:** Cadastre 3 categorias de uma vez só na tabela `sakila.category`.

```language-sql
INSERT INTO sakila.category (name)
VALUES
    ('Sci-Fi'),
    ('Fantasy'),
    ('Biography');
```

**Exercício 5:** Cadastre 1 nova loja na tabela `sakila.store`.

```language-sql
INSERT INTO sakila.store (manager_staff_id, address_id)
VALUES (3, 3);
```

### Digitou algo errado? De boa, vamos dar um `UPDATE`

Rode o seguinte comando em uma janela de _query_ dentro do MySQL Workbench **sempre** que abri-lo, para desabilitar essa funcionalidade antes de executar seus comandos `UPDATE` ou `DELETE`:

```language-sql
SET SQL_SAFE_UPDATES = 0;
```

**Exercício 1:** Atualize o primeiro nome de todas as pessoas da tabela `sakila.actor`, que possuem o primeiro nome "JULIA", para "JULES".

```language-sql
UPDATE sakila.actor
SET first_name = 'JULES'
WHERE first_name = 'JULIA';
```

**Exercício 2:** Foi exigido que a categoria "Sci-Fi" seja alterada para "Science Fiction".

```language-sql
UPDATE sakila.category
SET name = 'Science Fiction'
WHERE name = 'Sci-Fi';
```

**Exercício 3:** Atualize o valor do aluguel para $25 de todos os filmes com duração maior que 100 minutos e que possuem a classificações **"G"**, **"PG"** ou **"PG-13"** e um custo de substituição maior que $20.

```language-sql
UPDATE sakila.film
SET rental_rate = 25
WHERE length > 100
AND (rating = 'G' OR rating = 'PG' OR rating = 'PG-13')
AND replacement_cost > 20;
```

**Exercício 4:** Foi determinado pelo setor financeiro que haverá um reajuste em todos os preços dos filmes, com base em sua duração. Para todos os filmes com duração entre 0 e 100, o valor do aluguel passará a ser $10,00, e o aluguel dos filmes com duração acima de 100 passará a ser de $20,00.

```language-sql
UPDATE sakila.film
SET rental_rate = (
    CASE
        WHEN length BETWEEN 1 AND 100 THEN 10
        WHEN length > 100 THEN 20
    END
);
```

### Como assim, alguém te cadastrou **sem você deixar**? Vamos dar um `DELETE` nisso!

**Exercício 1:** Exclua do banco de dados o ator com o nome de "KARL".

```language-sql
-- Primeiro descubra os IDs relacionados ao nome
SELECT actor_id
FROM sakila.actor
WHERE first_name = 'KARL';

-- Em seguida, apague suas referências
DELETE FROM sakila.film_actor
WHERE actor_id = 12;

-- Depois exclua o item original
DELETE FROM sakila.actor
WHERE first_name = 'KARL';
```

**Exercício 2:** Exclua do banco de dados o ator com o nome de "MATTHEW".

```language-sql
-- Primeiro descubra os IDs relacionados ao nome
SELECT actor_id
FROM sakila.actor
WHERE first_name = 'MATTHEW';

-- Em seguida, apague as referências
DELETE FROM sakila.film_actor
WHERE actor_id IN (8, 103, 181);

-- Depois exclua o item original
DELETE FROM sakila.actor
WHERE first_name = 'MATTHEW';
```

**Exercício 3:** Exclua da tabela `film_text` todos os registros que possuem a palavra "saga" em suas descrições.

```language-sql
DELETE FROM sakila.film_text
WHERE DESCRIPTION LIKE '%saga%';
```

**Exercício 4:** Apague da maneira mais performática possível todos os registros das tabelas `film_actor` e `film_category`.

```language-sql
TRUNCATE sakila.film_actor;
TRUNCATE sakila.film_category;
```

**Exercício 5:** Inspecione todas as tabelas do banco de dados `sakila` e analise quais restrições `ON DELETE` foram impostas em cada uma. Use o Table Inspector para fazer isso (aba DDL).

Basta inspecionar e analisar uma a uma.

**Exercício 6:** Exclua o banco de dados e o recrie (use as instruções do início desta aula).

1. Abra o **MySQL Workbench** e se conecte a ele.

2. Selecione o banco `sakila` na lista de bancos de dados com o botão direito e clique em "**Drop Schema**".

3. Selecione **"Drop Now"**.

4. Clique com o botão direito [neste link](/back-end/sakila.sql) {: .external-link target="_blank" rel="noreferrer noopener" } e salve como arquivo `.sql`.

5. Selecione todo o conteúdo do arquivo **(CTRL + A)** e cole-o dentro de uma janela de nova _query_ no **MySQL Workbench**.

6. Clique em executar para restaurar o banco de dados.

    <%= figure(%{src: "/back-end/sql/images/RestoringDatabase.png", caption: "Restaurando o banco \`sakila\`", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>


## Exercícios

**Exercício 1**: Insira as produções da Pixar abaixo na tabela `Movies`:

- Monstros SA, de Pete Docter, lançado em 2001, com 92 minutos de duração.
- Procurando Nemo, de John Lasseter, lançado em 2003, com 107 minutos de duração.
- Os Incríveis, de Brad Bird, lançado em 2004, com 116 minutos de duração.
- WALL-E, de Pete Docter, lançada em 2008, com 104 minutos de duração.

```language-sql
USE Pixar;

INSERT INTO Movies(title, director, year, length_minutes)
  VALUES ('Monstros SA', 'Pete Docter', 2001, 92),
         ('Procurando Nemo', 'Jon Lasseter', 2003, 107),
         ('Os Incríveis', 'Brad Bird', 2004, 116),
         ('WALL-E', 'Pete Docter', 2008, 104);
```

**Exercício 2**: Procurando Nemo foi aclamado pela crítica! Foi classificado em 6.8, fez 450 milhões no mercado interno e 370 milhões no mercado internacional. Adicione as informações à tabela `BoxOffice`.

```language-sql
INSERT INTO BoxOffice(movie_id, rating, domestic_sales, international_sales)
  VALUE (9, 6.8, 450000000, 370000000);
```

**Exercício 3**: O diretor do filme "Procurando Nemo" está incorreto, na verdade ele foi dirigido por Andrew Staton. Corrija esse dado utilizando o `UPDATE`.

```language-sql
SET SQL_SAFE_UPDATES = 0;

UPDATE Movies
SET director = 'Andrew Staton'
WHERE title = 'Procurando Nemo';
```

**Exercício 4**: O título do filme "Ratatouille" esta escrito de forma incorreta na tabela `Movies`, além disso, o filme foi lançado em 2007 e não em 2010. Corrija esses dados utilizando o `UPDATE`.

```language-sql
UPDATE Movies
SET title = 'Ratatouille', year = 2007
WHERE title = 'ratatui';
```

**Exercício 5**: Insira as novas classificações abaixo na tabela `BoxOffice`, lembre-se que a coluna `movie_id` é uma foreign key referente a coluna `id` da tabela `Movies`:

- Monsters SA, classificado em 8.5, lucrou 300 milhões no mercado interno e 250 milhões no mercado internacional.
- Os Incríveis, classificado em 7.4, lucrou 460 milhões no mercado interno e 510 milhões no mercado internacional.
- WALL-E, classificado em 9.9, lucrou 290 milhões no mercado interno e 280 milhões no mercado internacional.

```language-sql
INSERT INTO BoxOffice(movie_id, rating, domestic_sales, international_sales)
  VALUES (8, 8.5, 300000000, 250000000),
         (10, 7.4, 460000000, 510000000),
         (11, 9.9, 290000000, 280000000);
```

**Exercício 6**: Exclua da tabela `Movies` o filme "WALL-E". P.S.: Lembrando que existe uma relação de Primary key-Foreign Key, portanto devemos excluir primeiro a referencia da tabela BoxOffice, para depois exluir da tabela Movies.

```language-sql
DELETE FROM BoxOffice
WHERE movie_id = 11; -- este é o id do filme WALL-E

DELETE FROM Movies 
WHERE title = 'WALL-E';
```

**Exercício 7**: Exclua da tabela `Movies` todos os filmes dirigidos por "Andrew Staton".

```language-sql
SELECT id FROM Movies
WHERE director = 'Andrew Staton';
-- primeiro é utilizada essa query para selecionar os ids dos filmes a serem excluídos (2 e 5)

DELETE FROM BoxOffice
WHERE movie_id IN (2, 9);
 
DELETE FROM Movies
WHERE director = 'Andrew Staton';
```

## Bônus

**Exercício 8**: Altere a classificação da tabela `BoxOffice` para 9.0 de todos os filmes que lucraram mais de 400 milhões no mercado interno.

```language-sql
UPDATE BoxOffice
SET rating = 9.0
WHERE domestic_sales > 400000000;
```

**Exercício 9**: Altere a classificação da tabela `BoxOffice` para 6.0 de todos os filmes que lucraram menos de 300 milhões no mercado internacional e mais de 200 milhões no mercado interno.

```language-sql
UPDATE BoxOffice
SET rating = 6.0
WHERE domestic_sales > 200000000 AND international_sales < 300000000;
```

**Exercício 10**: Exclua da tabela `Movies` todos os filmes com menos de 100 minutos de duração.

```language-sql
SELECT id, length_minutes FROM Movies
WHERE length_minutes < 100;
-- primeiro é utilizada essa query para selecionar os ids dos filmes a serem excluídos

 DELETE FROM BoxOffice
 WHERE movie_id IN (1, 6, 7, 8, 12);
 
DELETE FROM Movies
WHERE length_minutes < 100;
```
