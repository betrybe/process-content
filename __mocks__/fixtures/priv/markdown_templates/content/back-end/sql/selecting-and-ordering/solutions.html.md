## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

---

### Solução dos exercícios `SELECT` e `AS`

1. Monte uma query que exiba seu nome da tela;

```language-sql
SELECT 'jhonatan';
```
2. Monte uma query que exiba seu nome, sobrenome, cidade natal e idade na tela;

```language-sql
SELECT 'amanda', 'santos', 'Belo Horizonte', 19;
```
3. Monte uma query que, além de exibir todas as informações acima, identifica cada coluna usando o `AS`, que é chamado de `alias` na linguagem SQL (alias é como um **apelido** no português);

```language-sql
SELECT 'amanda' AS Nome, 'santos' AS Sobrenome, 'Belo Horizonte' AS 'Cidade Natal', 19 AS Idade;
```
4. Qual é o resultado de `13 * 8`? Descubra usando apenas o `SELECT`;

```language-sql
SELECT 13*8;
```
5. Monte uma query que exiba a data e hora atuais e dê a essa coluna o nome 'Data Atual'.

```language-sql
SELECT now() as 'Data Atual';
```


### Soluções Select Coluna

1. Escreva uma query que selecione todas as colunas da tabela ***city***

```language-sql
SELECT * FROM SAKILA.CITY;
```
2. Escreva uma query que exiba apenas coluna ***first_name***, ***last_name*** da tabela ***customer***

```language-sql
SELECT FIRST_NAME, LAST_NAME FROM SAKILA.CUSTOMER;
```
3. Escreva uma query que exiba todas as colunas da tabela ***rental***

```language-sql
SELECT * FROM SAKILA.RENTAL;
```
4. Escreva uma query que exiba o ***título***, ***descrição*** e ***data de lançamento*** dos filmes registrados na tabela ***Filme***

```language-sql
SELECT TITLE, DESCRIPTION, RELEASE_YEAR FROM SAKILA.FILM;
```
5. Explore, usando o select, todas as tabelas do banco de dados

---

### Soluções CONCAT

1. Na tabela `sakila.film`, monte uma query que exiba o **título** e o **ano de lançamento** dos filmes em uma única coluna e dê a ela o nome 'Lançamento do Filme'.

```language-sql
SELECT CONCAT(title, ' ', release_year) AS 'Lançamento do Filme' FROM sakila.film;
```
2. Na tabela `sakila.film`, crie uma query que exiba o **título** do filme e sua **classificação indicativa** (PG, G, NC-17) em apenas uma coluna. Dê a ela o nome 'Classificação'. Não se esqueça de deixar um espaço entre as palavras para que fiquem legíveis.

```language-sql
SELECT CONCAT(title, ' ', rating) AS Classificação FROM sakila.film;
```
3. Na tabela `sakila.address`, monte uma query que exiba a rua e distrito de cada registro em uma coluna apenas, e dê a ela o nome 'Endereço'.

```language-sql
SELECT CONCAT(address, ' ', district) AS Endereço FROM sakila.address;
```

---

### Soluções DISTINCT

1. Monte uma query para encontrar somente os **nomes** e **idades**, ambos ***únicos***

```language-sql
SELECT DISTINCT Nome, Idade FROM Alunos;
```
2. Quantas linhas vocês encontraria no query anterior?
4
3. Monte uma query para encontrar somente os ***nomes únicos***

```language-sql
SELECT DISTINCT Nome FROM Alunos;
```
4. Quantas linhas vocês encontraria no query anterior?
4
5. Monte uma query para encontrar somente as ***idades únicas***

```language-sql
SELECT DISTINCT Idade FROM Alunos;
```
6. Quantas linhas vocês encontraria no query anterior?
4

### Soluções Count

1. **Quantas senhas** temos cadastradas nessa tabela?
1

```language-sql
SELECT COUNT(password) FROM sakila.staff;
```
2. **Quantas pessoas** temos, no total, trabalhando para nossa empresa?
2

```language-sql
SELECT COUNT(*) FROM sakila.staff;
```
3. **Quantas fotos** temos cadastradas nessa tabela?
1

```language-sql
SELECT COUNT(picture) FROM sakila.staff;
```

Tranquilo, não é? Agora, olhando a resultado a seguir, qual query eu teria que montar para trazer os 10 primeiros resultados, a partir da Jennifer?

<%= figure(%{src: "https:\/\/i.paste.pics/904dc3192d809605e8ee99ea1fecc8a6.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", alt: "query result"}) %>

```language-sql
SELECT * FROM sakila.actor
LIMIT 10 OFFSET 5;
```

### Soluções Desafios Gerais (montar o bolo)

Escreva uma query que exiba **todos os filmes** cadastrados no banco de dados

```language-sql
SELECT * FROM sakila.film;
```

Escreva uma query que exiba apenas o **nome dos filmes**, **ano de lançamento** e **classificação**

```language-sql
SELECT title, rating, release_year FROM sakila.film;
```

Escreva uma query que exiba apenas os **sobrenomes únicos** cadastrados no banco sakila

```language-sql
SELECT distinct(last_name) from sakila.actor;
```

Crie queries para descobrir o seguinte:
 **Quantos filmes** temos cadastrados?

```language-sql
SELECT COUNT(*) FROM sakila.film;
```

**Quantos clientes** temos registrados?

```language-sql
SELECT COUNT(*) from sakila.customer;
```

**Quantos sobrenomes únicos** temos no banco de dados?

```language-sql
SELECT COUNT( DISTINCT last_name) FROM sakila.actor;
```

**Quantas categorias de filmes** o banco sakila possui?

```language-sql
SELECT COUNT(*) FROM sakila.category;
```

**Quantos países** são atendidos pela sakila?

```language-sql
SELECT COUNT(*) FROM sakila.country;
```

Vá até à tabela language do Sakila e crie uma pesquise que mostre os **5 idiomas cadastrados**, mas **não mostre** o idioma "english"

```language-sql
SELECT * FROM sakila.language LIMIT 5 OFFSET 1;
```

Agora vamos tentar fazer o seguinte: Crie uma query para encontrar os **20 primeiros filmes**, incluindo o **título**, o **ano** de lançamento, a **duração** e a **classificação**, ordenando pelos filmes com a maior duração e depois pelo menor custo de substituição.

```language-sql
SELECT title,release_year,length, replacement_cost, rating FROM sakila.film
ORDER BY length DESC, replacement_cost ASC
LIMIT 20;
```

### Soluções Encontrando dados em um banco de dados

**Exercício 1**: Faça as tarefas de 1 a 15.

1. Escreva uma query para exibir a string "This is SQL Exercise, Practice and Solution".

```language-sql
USE Scientists;
SELECT ‘This is SQL Exercise, Practice and Solution’;
```

2. Escreva uma query para exibir três números em três colunas.

```language-sql
SELECT 1, 2, 3;
```

3. Escreva uma query para exibir a soma dos números 10 e 15.

```language-sql
SELECT 10 + 15;
```

4. Escreva uma query para exibir o resultado de uma expressão aritmética qualquer.

```language-sql
SELECT (3 * 4) + 12;
```

5. Escreva uma query para exibir todas as informações de todos os cientistas.

```language-sql
SELECT * FROM Scientists;
```

6. Escreva uma query para exibir o nome e as horas de cada projeto.

```language-sql
SELECT Name AS 'Nome do Projeto', Hours AS 'Tempo de Trabalho' FROM Projects;
```

6. Escreva uma query para exibir o nome dos cientistas em ordem alfabética ascendente.

```language-sql
SELECT Name FROM Scientists
ORDER BY Name ASC;
```

8. Escreva uma query para exibir o nome dos Projetos em ordem alfabética descendente.

```language-sql
SELECT Name FROM Projects
ORDER BY Name DESC;
```

9. Escreva uma query que exiba a string "O projeto `Name` precisou de `Hours` horas para ser concluído." para cada projeto.

```language-sql
SELECT CONCAT('O projeto ', Name, ' precisou de ', Hours, ' horas para ser concluído.') FROM Projects;
```

10. Escreva uma query para exibir o nome e as horas dos três projetos com a maior quantidade de horas.

```language-sql
SELECT Name, Hours FROM Projects
ORDER BY Hours DESC LIMIT 3;
```

11. Escreva uma query para exibir o código de todos os projetos da tabela AssignedTo sem que haja repetições.

```language-sql
SELECT DISTINCT Project FROM AssignedTo;
```

12. Escreva uma query para exibir o nome do projeto com maior quantidade de horas.

```language-sql
SELECT Name FROM Projects
ORDER BY Hours DESC
LIMIT 1;
```

13. Escreva uma query para exibir o nome do segundo projeto com menor quantidade de horas.

```language-sql
SELECT Name FROM Projects
ORDER BY Hours ASC
LIMIT 1
OFFSET 1;
```

14. Escreva uma query para exibir todas as informações dos cinco projetos com a menor quantidade de horas.

```language-sql
SELECT * FROM Projects
ORDER BY Hours ASC LIMIT 5;
```

15. Escreva uma query que exiba a string "Existem `Number` cientistas na tabela Scientists.", em que `Number` se refira a quantidade de cientistas.

```language-sql
SELECT CONCAT('Existem ', COUNT(Name), ' cientistas na tabela Scientists.') FROM Scientists;
```

**Bônus**

**Exercício 2:** Tarefas do 1 ao 4:

1. Escreva uma query para ordernar o nome das empresas de forma alfabética descendente e que retorne somente o código e o nome da primeira empresa.

```language-sql
USE PiecesProviders;

SELECT Code, Name FROM Providers
ORDER BY Name DESC
LIMIT 1;
```

2. Escreve uma query para exibir todas as informações das cinco peças com os maiores preços.

```language-sql
SELECT Piece, Price FROM Provides
ORDER BY Price DESC LIMIT 5;
```

3. Escreva uma query para exibir o nome das empresas e preço das peças com os quatro maiores preços, começando a lista a partir do 3º item.

```language-sql
SELECT DISTINCT Provider, Price FROM Provides
ORDER BY Price DESC LIMIT 4 OFFSET 3;
```

4. Escreva uma query para exibir a string "A peça mais cara é a: `Piece` , provida pela empresa `Provider` e custa `Price` reais.", essa query deve retornar somene uma única string, sendo que `Price` se refere ao maior preço.

```language-sql
SELECT CONCAT('A peça mais cara é a: ', Piece, ', provida pela empresa ', Provider, ' e custa ', Price, ' reais.') FROM Provides
ORDER BY Price DESC
LIMIT 1;
```


### Soluções LIKE

1. Encontre todos os detalhes dos filmes que contêm a palavra "**ace**" no nome

```language-sql
    SELECT * FROM sakila.film
    WHERE title LIKE '%ace%';
```

2. Encontre todos os detalhes dos filmes cuja descrição finaliza com "**china**"

```language-sql
    SELECT * FROM sakila.film
    WHERE description LIKE '%china'
```

3. Encontre todos os detalhes dos 2 filmes cuja descrição contém a palavra "**girl**" e o título finaliza com a palavra "**lord**"

```language-sql
    SELECT * FROM sakila.film
    WHERE description LIKE '%Girl%' AND title LIKE '%lord'
```

4. Encontre os dois casos em que, a partir do 4° caratere no título do filme, tem-se a palavra "**gon**"

```language-sql
    SELECT * FROM sakila.film
    WHERE title LIKE '___gon%'
```

5. Encontre os dois casos nos quais, a partir do 4° caractere no título do filme, tem-se a palavra "**gon**" e a descrição contém a palavra "**Documentary**"

```language-sql
    SELECT * FROM sakila.film
    WHERE title like '___gon%' AND description like '%documentary%'
```

6. Encontre os 2 filmes cujos títulos finalizam com "**academy**" ou iniciam com "**mosquito**"

```language-sql
    SELECT * FROM sakila.film
    WHERE title like '%academy' or title like 'mosquito%'
```

7. Encontre os 6 filmes que contêm as palavras "**monkey**" e "**sumo**" em suas descrições

```language-sql
    SELECT * FROM sakila.film
    WHERE description like '%monkey%' AND description like '%sumo%'
```

### Soluções `IN` e `BETWEEN`

Como eu faria, então, para encontrar, usando o `IN`, todos os detalhes sobre o aluguel dos clientes com os seguintes ids: 269,239,126,399,142?

```language-sql
SELECT * FROM sakila.rental
WHERE customer_id IN (269,239,126,399,142);
```

Como encontraria todas as informações sobre os endereços que estão registrados nos distritos de QLD, Nagasaki, California, Attika, Mandalay, Nantou e Texas?

```language-sql
SELECT * FROM sakila.address
WHERE district IN('QLD', 'Nagasaki', 'California', 'Attika', 'Mandalay', 'Nantou','Texas')
```

1. Encontre o nome, sobrenome e e-mail dos clientes com os seguintes sobrenomes: hicks, crawford, henry, boyd, mason, morales e kennedy, ordenados por nome em ordem alfabética.

```language-sql
SELECT first_name, last_name, email FROM SAKILA.CUSTOMER
WHERE last_name IN ('HICKS', 'CRAWFORD', 'HENRY', 'BOYD', 'MASON', 'MORALES', 'KENNEDY')
ORDER BY first_name
```

2. Encontre o e-mail dos clientes com os seguintes address_id: 172 ,173 ,174 ,175 ,176, ordenados em ordem alfabética.

```language-sql
SELECT	email FROM SAKILA.CUSTOMER
WHERE address_id IN (172 ,173 ,174 ,175 ,176)
ORDER BY email
```

3. Descubra quantos pagamentos foram feitos entre 01/05/2005 e 01/08/2005. Lembre-se de que, no banco de dados, as datas estão armazenadas no formato ano/mês/dia, diferente do formato brasileiro, que é dia/mês/ano.

```language-sql
SELECT count(*) FROM sakila.payment
WHERE payment_date BETWEEN CAST('2005-05-01' AS DATE) AND CAST('2005-08-01' AS DATE);
```
4. Encontre o título, ano de lançamento e duração do empréstimo de todos os filmes com a duração de empréstimo de 3 a 6. Os resultados devem ser classificados por filmes com maior duração de empréstimo primeiro.

```language-sql
SELECT title, release_year, rental_duration  FROM sakila.film
WHERE rental_duration BETWEEN 3 AND 6 ORDER BY rental_duration DESC
--Ou
SELECT title, release_year, rental_duration  FROM sakila.film
WHERE rental_duration IN(3,4,5,6) ORDER BY rental_duration DESC
```

5. Monte um relatório que exiba o título e classificação dos 500 primeiros filmes direcionados para menores de idade. Os resultados devem estar ordenados por classificação mais abrangente primeiro.

```language-sql
SELECT title, rating FROM sakila.film
WHERE rating IN ('G','PG','PG-13')
ORDER BY rating
LIMIT 50
```

### Encontrando e separando resultados que incluem datas

1. Quantos aluguéis temos na seguinte data de retorno: "2005-08-29" (múltiplas maneiras possíveis de encontrar a resposta)?

```language-sql
    SELECT count(*) FROM sakila.rental
    WHERE date(return_date) = '2005-08-29';
    SELECT * FROM sakila.rental;
    -- Ou
    SELECT count(*) FROM sakila.rental
    WHERE return_date like '2005-08-29%';
    SELECT * FROM sakila.rental;
```


2. Quantos filmes foram alugados entre 01/07/2005 e 22/08/2005?

```language-sql
    SELECT count(*) FROM sakila.rental
    WHERE rental_date BETWEEN '2005-07-01' AND '2005-08-22';
```
3. Usando a tabela Rental, extraia a data, ano, mês, dia, hora, minuto e segundo do rental_id 10330

```language-sql
    -- Data
    SELECT DATE(rental_date) FROM sakila.rental
    WHERE rental_id = 10330;
    -- Ano
    SELECT YEAR(rental_date) FROM sakila.rental
    WHERE rental_id = 10330;
    -- Mês
    SELECT MONTH(rental_date) FROM sakila.rental
    WHERE rental_id = 10330;
    -- Dia
    SELECT DAY(rental_date) FROM sakila.rental
    WHERE rental_id = 10330;
    -- Hora
    SELECT HOUR(rental_date) FROM sakila.rental
    WHERE rental_id = 10330;
    -- Minuto
    SELECT MINUTE(rental_date) FROM sakila.rental
    WHERE rental_id = 10330;
    -- Segundo
    SELECT SECOND(rental_date) FROM sakila.rental
    WHERE rental_id = 10330;
```

4. Monte uma query que encontre o id e data de aluguel do filme que foi alugado no dia 18/08/2005 às 00:14:03.

```language-sql
    SELECT rental_id,rental_date FROM sakila.rental
    WHERE rental_date like '2005-08-18 00:14:03%'
```
