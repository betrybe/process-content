## O que vamos aprender?

Bem-vindo de volta! Hoje você vai começar a juntar as peças da sua jornada! Elas te levarão a aprender a manipular e a transformar dados em informação, e informação em conhecimento!

<%= vimeo "506179211" %>

---

### Você será capaz de:

- Compreender o que é uma _query_ SQL e quais são seus tipos de comando
- Gerar valores com `SELECT`
- Selecionar colunas individualmente com `SELECT`
- Renomear e gerar colunas em uma consulta com `AS`
- Concatenar colunas e valores com `CONCAT`
- Remover dados duplicados em uma consulta com `DISTINCT`
- Contar a quantidade de resultados em uma consulta com `COUNT`
- Limitar a quantidade de resultados em uma consulta com `LIMIT`
- Pular resultados em uma consulta com `OFFSET`
- Ordernar os resultados de uma consulta com `ORDER BY`

---

## Por que isso é importante?

A razão pela qual uma base de dados existe é para que alguém, ou algum programa, faça pesquisas nela. As pesquisas, principalmente o comando `SELECT`, são como o café da manhã para alguém que tem costume de tomá-lo todo dia: sem ele você não vai muito longe.

Como foi dito na aula anterior, quando você se conecta a um banco de dados, você tem a opção de fazer boa parte das suas pesquisas e manipulação de dados usando ferramentas gráficas, que estão disponíveis para uso e download. O **MySQL Workbench**, visto na última aula, faz exatamente isso. No entanto, é importante que você tenha uma base sólida do **SQL** para que possa entregar **resultados bem específicos** e fazer pesquisas em situações em que você não disponha de uma ferramenta gráfica.

Para ser capaz de montar suas pesquisas personalizadas, você **precisa** saber usar o comando `SELECT`. Então vamos lá!

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### O que é uma _query_ e quais são os principais tipos de _queries_

Inquirir, ou ***query***, em inglês, é o nome dado aos comandos que você digita dentro de uma janela ou linha de comando com a intenção de interagir de alguma maneira com uma base de dados. No mundo de banco de dados, você pode tanto trazer dados quanto alterá-los, atribuir permissões de acesso e manipulação e muito mais. Vamos dar um olhada nos principais tipos de _queries_ a seguir:

- ***DDL***: Data Definition Language - todos os comandos que lidam com o esquema, a descrição e o modo como os dados devem existir em um banco de dados:
    - `CREATE` - Para criar bancos de dados, tabelas, índices, views, procedures, functions e triggers
    - `ALTER` - Para alterar a estrutura de qualquer objeto
    - `DROP` - Permite deletar objetos
    - `TRUNCATE` - Apenas esvazia os dados dentro de uma tabela, mas a mantém no banco de dados

- ***DML***: Data Manipulation Language - Comandos que são usados para manipular dados. São utilizados para armazenar, modificar, buscar e excluir dados em um banco de dados. Os comandos e usos mais comuns nesta categoria são:
    - `SELECT`: usado para buscar dados em um banco de dados
    - `INSERT`: insere dados em uma tabela
    - `UPDATE`: altera dados dentro de uma tabela
    - `DELETE`: exclui dados de uma tabela

- ***DCL***: Data Control Language - Focado mais nos comandos que concedem direitos, permissões e outros tipos de controle ao sistema de banco de dados.
    - `GRANT`: concede acesso a um usuário
    - `REVOKE`: remove acessos concedidos através do comando GRANT

- ***TCL***: Transactional Control Language - Lida com as transações dentro de suas pesquisas.
    - `COMMIT`: muda suas alterações de temporárias para permanentes no seu banco de dados
    - `ROLLBACK`: desfaz todo o impacto realizado por um comando
    - `SAVEPOINT`: define pontos para os quais uma transação pode voltar. É uma maneira de voltar para pontos específicos de sua _query_
    - `TRANSACTION`: comandos que definem onde, como e em que escopo suas transações são executadas

### **SELECT**, o primeiro passo

Antes da aula a seguir, temos dois conceitos importantes que podem ser utilizados já no início do seu aprendizado de **SQL**. Esses conceitos são usar o `SELECT` para gerar valores e usar o `AS` para dar nomes às suas colunas, como nos exemplos a seguir. Rode cada um deles em uma janela de _query_ para verificar os resultados:

```language-sql
SELECT 'Olá, bem-vindo ao SQL!';
SELECT 10;
SELECT now();
SELECT 20 * 2;
SELECT 50 / 2;
SELECT 18 AS idade;
SELECT 2019 AS ano;
SELECT 'Rafael', 'Martins', 25, 'Desenvolvedor Web';
SELECT 'Rafael' AS nome, 'Martins' AS sobrenome, 25 AS idade, 'Desenvolvedor Web' AS 'Área de atuação';
```

Depois de rodar cada um desses comandos, vemos que é possível fazer algumas coisas apenas usando o `SELECT`, ainda sem alterar o banco de dados.

* É possível gerar e calcular valores usando apenas `SELECT valor_a_ser_calculado_ou_exibido`;
* Perceba que a palavra-chave `AS` permite que você dê nome às suas colunas para que elas façam mais sentido quando estiver lendo os resultados. Lembre-se de que, caso o nome tenha mais de uma palavra, devemos usar aspas simples para nomear as colunas;
* Note que sempre finalizamos uma _query_ usando o ponto e vírgula (`;`);
* Observe também que as palavras-chave (reservadas) estão em maiúsculo. Isso é uma convenção para facilitar a leitura da _query_. É recomendado que faça o mesmo.

##### Já vamos praticar? Aham!

1. Monte uma _query_ que exiba seu nome na tela;
2. Monte uma _query_ que exiba seu nome, sobrenome, cidade natal e idade na tela;
3. Monte uma _query_ que, além de exibir todas as informações já mencionadas, identifique cada coluna usando o `AS`, que é chamado de `alias` na linguagem **SQL** (_alias_ é como um **apelido** no português);
4. Qual é o resultado de `13 * 8` ? Descubra usando apenas o `SELECT`;
5. Monte uma _query_ que exiba a data e hora atuais. Dê a essa coluna o nome "Data Atual".

Agora, vamos aprender um pouco mais sobre como usar o `SELECT` assistindo a esta aula:

<%= vimeo "391606543" %>

Tranquilo, não é? Então vamos fixar isso?

Vamos agora entrar no banco de dados `sakila` e encontrar as seguintes informações, montando uma _query_ para cada uma:

1. Escreva uma _query_ que selecione todas as colunas da tabela `city`;
2. Escreva uma _query_ que exiba apenas as colunas `first_name` e `last_name` da tabela `customer`;
3. Escreva uma _query_ que exiba todas as colunas da tabela `rental`;
4. Escreva uma _query_ que exiba o título, a descrição e a data de lançamento dos filmes registrados na tabela `film`;
5. Utilize o `SELECT` para explorar todas as tabelas do banco de dados.

### Juntando duas ou mais colunas usando o `CONCAT`

Dê uma pesquisada agora na tabela `sakila.actor` usando o comando `SELECT * FROM sakila.actor` e veja que temos uma coluna `first_name` e outra chamada `last_name`. Vamos imaginar que é necessário criar um relatório com o nome completo de um ator. Como podemos fazer isso? É fácil, basta usar a função `CONCAT`.

Para compreender seu uso, execute os exemplos a seguir no **MySQL Workbench**:

```language-sql
SELECT CONCAT (first_name, last_name) FROM sakila.actor;

-- Seu resultado ficou estranho? Eu também achei! Tente agora a query a seguir.

SELECT CONCAT(first_name, ' ', last_name) FROM sakila.actor;

-- Muito melhor, certo? Mas dá para melhorar? Dá!

SELECT CONCAT(first_name, ' ', last_name) AS 'Nome Completo' FROM sakila.actor;
```

Então, como podemos ver no exemplo acima, é possível concatenar mais de uma coluna em apenas uma. Para isso, usamos a função `CONCAT`, que cria novos dados e informações a partir dos dados já existentes em uma tabela.

Vamos brincar um pouco mais com isso?

1. Na tabela `sakila.film`, monte uma _query_ que exiba o **título** e o **ano de lançamento** dos filmes em uma coluna e dê a ela o nome `Lançamento do Filme`.

2. Na tabela `sakila.film`, crie uma _query_ que exiba o **título** do filme e sua **classificação indicativa** (PG, G, NC-17) em apenas uma coluna. Dê a ela o nome `Classificação`. Não se esqueça de deixar um espaço entre as palavras para que fiquem legíveis.

3. Na tabela `sakila.address`, monte uma _query_ que exiba a **rua** e o **distrito** de cada registro em uma coluna apenas, e dê a essa coluna o nome `Endereço`.

Espero que tenha sido tranquilo. Caso precise, veja o vídeo novamente.

### Dados repetidos? Aqui Não! Como usar o `DISTINCT`

<%= vimeo "391604849" %>

Perfeito! Então, depois de ter assistido ao vídeo sobre `DISTINCT`, dê uma olhada nesta tabela:

<%= figure(%{src: "/back-end/sql/images/sampleTable1.png", caption: "Tabela fictícia", class: "text-center rounded mx-auto d-block", width: "200px", height: "auto"}) %>

Para criá-la no seu banco de dados, abra uma nova janela de _query_ no **MySQL Workbench** e execute o seguinte código:

```language-sql
CREATE DATABASE `Escola`;
CREATE TABLE IF NOT EXISTS Escola.Alunos (
    `Nome` VARCHAR(7) CHARACTER SET utf8,
    `Idade` INT
);
INSERT INTO Escola.Alunos VALUES
    ('Rafael', 25),
    ('Amanda', 30),
    ('Roberto', 45),
    ('Carol', 19),
    ('Amanda', 25);
```

Feito isso, você terá acesso à tabela `Alunos` do banco de dados `Escola`. Levando em conta a explicação que você acabou de ver, como você montaria uma _query_ para encontrar os seguintes dados?

1. Monte uma _query_ para encontrar pares únicos de **nomes** e **idades**.
2. Quantas linhas você encontraria na _query_ anterior?
3. Monte uma _query_ para encontrar somente os **nomes** únicos.
4. Quantas linhas você encontraria na _query_ anterior?
5. Monte uma _query_ para encontrar somente as **idades** únicas.
6. Quantas linhas você encontraria na _query_ anterior?

### Contando resultados com o `COUNT`

Um dos principais objetivos de se usar um banco de dados é responder a perguntas como: "Que quantidade de um certo tipo de dados existe na tabela?". Ou, em um caso mais próximo ao nosso: "Quantas pessoas temos cadastradas no sistema?". Ou ainda: "Em quantos estados temos clientes?".

Vamos entender melhor isso assistindo a este vídeo:

<%= vimeo "391604597" %>

Nosso kit de ferramentas só está crescendo! Imagine que cada comando que você for aprendendo é como se fosse um novo acessório para o seu dia a dia.

<%= figure(%{src: "/back-end/sql/images/arsenal.png", caption: "Os comandos (SQL) são como os acessórios: quando perceber, já vai ter juntado um monte.", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

Percebeu que você pode usar o `COUNT` de maneiras bem criativas, certo? Legal, então vamos pensar no seguinte cenário:

<%= figure(%{src: "/back-end/sql/images/sampleSelect1.png", caption: "tabela staff", class: "text-center rounded mx-auto d-block", width: "850px", height: "auto"}) %>

Essa é a tabela `staff` do banco de dados `sakila`. Como você poderia responder às seguintes questões?

1. **Quantas senhas** temos cadastradas nessa tabela?
2. **Quantas pessoas** temos no total trabalhando para nossa empresa?
3. **Quantas fotos** temos cadastradas nessa tabela?

Até agora, trabalhamos principalmente com tabelas que têm poucas linhas de resultados (média de 200), e até aí tudo bem. Porém, em muitos cenários reais, você pode se deparar com milhares ou até centenas de milhares de resultados, e é aqui que vamos `LIMIT`*ar* elas!

### Pesquisas gigantes? `LIMIT` isso ae!

Se você abrir agora o nosso banco de dados de prática `sakila` e executar a _query_ a seguir, verá que o resultado é 16044, ou seja, existem 16044 linhas na tabela `rental`.

```language-sql
SELECT COUNT(*) FROM sakila.rental;
```

Uma curiosidade é que, usando o **MySQL Workbench**, caso você faça uma consulta que inclui todas as linhas da tabela e rolar a listagem até o fim, verá que o resultado da consulta são 16044 linhas (desde que o **Workbench** não limite os resultados da sua consulta, como você verá na próxima seção).

```language-sql
SELECT * FROM sakila.rental;
```

Isso não é sempre necessário e pode até ser um problema em bancos de dados gigantes, em que as tabelas podem conter milhares ou milhões de linhas. Resolver isso é bem simples: tudo que você precisa fazer é limitar o resultado usando o `LIMIT`:

```language-sql
# Query + LIMIT quantidade_de_resultados
SELECT * FROM sakila.rental LIMIT 10;
```

<%= figure(%{src: "/back-end/sql/images/limit1.png", caption: "Tabela rental limitada a 10 linhas", class: "text-center rounded mx-auto d-block", width: "850px", height: "auto"}) %>

### LIMIT OFFSET - Pulando linhas desnecessárias

Para pular uma certa quantidade de linhas do seu resultado, você pode usar o comando `OFFSET`.

```language-sql
# Query + LIMIT quantidade_de_linhas OFFSET quantidade_de_linhas
SELECT * FROM sakila.rental LIMIT 10 OFFSET 3;
```

<%= figure(%{src: "/back-end/sql/images/limit2.jpg", caption: "Tabela staff", class: "text-center rounded mx-auto d-block", width: "900px", height: "auto"}) %>

Você poderia também limitar os resultados de forma gráfica, usando as opções do **Workbench**, que, por padrão, não impõe limites aos resultados de suas pesquisas.

<%= figure(%{src: "/back-end/sql/images/limit3.png", caption: "", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

Tranquilo, não é? Agora, olhando o resultado a seguir, qual _query_ eu teria que montar para trazer os 10 primeiros resultados, a partir de JOHNNY?

<%= figure(%{src: "/back-end/sql/images/limit4.png", caption: "", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

Ótimo, tomara que tenha conseguido achar o resultado do último desafio. Você está quase lá! Vamos fechar este dia de aprendizado descobrindo como gerar resultados do tipo que todo chefe gosta de ter: "Tudo bem organizado", usando o `ORDER BY`.

### Gerando resultados elegantes e organizados com o `ORDER BY`

Vamos aprender agora como criar resultados elegantes usando o `ORDER BY`:

<%= vimeo "391605980" %>

### Vamos montar o bolo com todos os ingredientes que vimos hoje

- Escreva uma _query_ que exiba **todos os filmes** cadastrados no banco de dados.
- Escreva uma _query_ que exiba apenas o **nome** dos filmes, seu **ano de lançamento** e sua **classificação**.
- Escreva uma _query_ que exiba apenas os **sobrenomes únicos** cadastrados no banco `sakila`.
- Crie _queries_ para descobrir o seguinte:
    - **Quantos filmes** temos cadastrados?
    - **Quantos clientes** temos registrados?
    - **Quantos sobrenomes únicos** temos no banco de dados?
    - **Quantas categorias de filmes** o banco `sakila` possui?
    - **Quantos países** são atendidos pela sakila?
- Vá até a tabela `language` do `sakila` e crie uma pesquisa que mostre os **5 idiomas cadastrados**, mas **não mostre** o idioma `english`.
- Vá até a tabela `film` e selecione todos os dados da tabela. Pronto, fez isso?
- Agora vamos tentar fazer o seguinte: Crie uma _query_ para encontrar os **20 primeiros filmes**, incluindo o **título**, o **ano de lançamento**, a **duração**, a **classificação indicativa** e o **custo de substituição**. Ordene os resultados pelos filmes com a maior duração e depois pelo menor custo de substituição.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Vamos bater um papo sobre **SQL**? Hora da aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 40 minutos

**Exercício 1**: Faça as tarefas de 1 a 15.

> Para realizar os exercícios do 1 ao 15, restaure o banco de dados seguinte.

```language-sql
DROP SCHEMA IF EXISTS Scientists;
CREATE SCHEMA Scientists;
USE Scientists;

CREATE TABLE Scientists (
  SSN INT,
  Name CHAR(30) NOT NULL,
  PRIMARY KEY (SSN)
);

CREATE TABLE Projects (
  Code CHAR(4),
  Name CHAR(50) NOT NULL,
  Hours INT,
  PRIMARY KEY (Code)
);

CREATE TABLE AssignedTo (
  Scientist INT NOT NULL,
  Project CHAR(4) NOT NULL,
  PRIMARY KEY (Scientist, Project),
  FOREIGN KEY (Scientist) REFERENCES Scientists (SSN),
  FOREIGN KEY (Project) REFERENCES Projects (Code)
);

INSERT INTO Scientists(SSN,Name) 
  VALUES(123234877, 'Michael Rogers'),
    (152934485, 'Anand Manikutty'),
    (222364883, 'Carol Smith'),
    (326587417, 'Joe Stevens'),
    (332154719, 'Mary-Anne Foster'),	
    (332569843, 'George ODonnell'),
    (546523478, 'John Doe'),
    (631231482, 'David Smith'),
    (654873219, 'Zacary Efron'),
    (745685214, 'Eric Goldsmith'),
    (845657245, 'Elizabeth Doe'),
    (845657246, 'Kumar Swamy');

 INSERT INTO Projects (Code, Name, Hours)
  VALUES ('AeH1' ,'Winds: Studying Bernoullis Principle', 156),
    ('AeH2', 'Aerodynamics and Bridge Design', 189),
    ('AeH3', 'Aerodynamics and Gas Mileage', 256),
    ('AeH4', 'Aerodynamics and Ice Hockey', 789),
    ('AeH5', 'Aerodynamics of a Football', 98),
    ('AeH6', 'Aerodynamics of Air Hockey', 89),
    ('Ast1', 'A Matter of Time', 112),
    ('Ast2', 'A Puzzling Parallax', 299),
    ('Ast3', 'Build Your Own Telescope', 6546),
    ('Bte1', 'Juicy: Extracting Apple Juice with Pectinase', 321),
    ('Bte2', 'A Magnetic Primer Designer', 9684),
    ('Bte3', 'Bacterial Transformation Efficiency', 321),
    ('Che1', 'A Silver-Cleaning Battery', 545),
    ('Che2', 'A Soluble Separation Solution', 778);

 INSERT INTO AssignedTo (Scientist, Project)
  VALUES (123234877, 'AeH1'),
    (152934485, 'AeH3'),
    (222364883, 'Ast3'),	   
    (326587417, 'Ast3'),
    (332154719, 'Bte1'),
    (546523478, 'Che1'),
    (631231482, 'Ast3'),
    (654873219, 'Che1'),
    (745685214, 'AeH3'),
    (845657245, 'Ast1'),
    (845657246, 'Ast2'),
    (332569843, 'AeH4');
```

> Esse banco de dados é de uso livre, sendo licenciado de acordo com os termos [deste link](https://creativecommons.org/licenses/by-sa/3.0/) {: .external-link target="_blank" rel="noreferrer noopener" }. 

1. Escreva uma query para exibir a string "This is SQL Exercise, Practice and Solution".
2. Escreva uma query para exibir três números em três colunas.
3. Escreva uma query para exibir a soma dos números 10 e 15.
4. Escreva uma query para exibir o resultado de uma expressão aritmética qualquer.
5. Escreva uma query para exibir todas as informações de todos os cientistas.
6. Escreva uma query para exibir o nome como "Nome do Projeto" e as horas como "Tempo de Trabalho" de cada projeto.
7. Escreva uma query para exibir o nome dos cientistas em ordem alfabética.
8. Escreva uma query para exibir o nome dos Projetos em ordem alfabética descendente.
9. Escreva uma query que exiba a string "O projeto `Name` precisou de `Hours` horas para ser concluído." para cada projeto.
10. Escreva uma query para exibir o nome e as horas dos três projetos com a maior quantidade de horas.
11. Escreva uma query para exibir o código de todos os projetos da tabela `AssignedTo` sem que haja repetições.
12. Escreva uma query para exibir o nome do projeto com maior quantidade de horas.
13. Escreva uma query para exibir o nome do segundo projeto com menor quantidade de horas.
14. Escreva uma query para exibir todas as informações dos cinco projetos com a menor quantidade de horas.
15. Escreva uma query que exiba a string "Existem `Number` cientistas na tabela Scientists.", em que `Number` se refira a quantidade de cientistas.

### Bônus

**Exercício 2**: Para realizar as tarefas do 1 ao 4, restaure o seguinte banco de dados:

```language-sql
DROP SCHEMA IF EXISTS PiecesProviders;
CREATE SCHEMA PiecesProviders;
USE PiecesProviders;

CREATE TABLE Pieces (
  Code INTEGER PRIMARY KEY NOT NULL,
  Name TEXT NOT NULL
);

CREATE TABLE Providers (
  Code VARCHAR(40) PRIMARY KEY NOT NULL,  
  Name TEXT NOT NULL
);

CREATE TABLE Provides (
  Piece INTEGER,
  FOREIGN KEY (Piece) REFERENCES Pieces (Code),
  Provider VARCHAR(40),
  FOREIGN KEY (Provider) REFERENCES Providers (Code),
  Price INTEGER NOT NULL,
  PRIMARY KEY (Piece , Provider)
);
 
INSERT INTO Providers(Code, Name)
  VALUES ('HAL', 'Clarke Enterprises'),
    ('RBT', 'Susan Calvin Corp.'),
    ('TNBC', 'Skellington Supplies');

INSERT INTO Pieces(Code, Name)
  VALUES (1, 'Sprocket'),
    (2, 'Screw'),
    (3, 'Nut'),
    (4, 'Bolt');

INSERT INTO Provides(Piece, Provider, Price)
  VALUES (1, 'HAL', 10),
    (1, 'RBT', 15),
    (2, 'HAL', 20),
    (2, 'RBT', 25),
    (2, 'TNBC', 14),
    (3, 'RBT', 50),
    (3, 'TNBC', 45),
    (4, 'HAL', 5),
    (4, 'RBT', 7);
```

> Esse banco de dados é de uso livre, sendo licenciado de acordo com os termos [deste link](https://creativecommons.org/licenses/by-sa/3.0/) {: .external-link target="_blank" rel="noreferrer noopener" }.

1. Escreva uma query para ordernar o nome das empresas de forma alfabética descendente e que retorne somente o código e o nome da primeira empresa.
2. Escreve uma query para exibir todas as informações das cinco peças com os maiores preços.
3. Escreva uma query para exibir o nome das empresas e preço das peças, começando a lista a partir do 3º item, e exibindo o preço das quatro peças mais caras.
4. Escreva uma query para exibir a string "A peça mais cara é a: `Piece` , provida pela empresa `Provider` e custa `Price` reais.", essa query deve retornar somene uma única string, sendo que `Price` se refere ao maior preço.

---

## Recursos adicionais(Opcional)

- [Introdução ao básico do SQL com prática](https://sqlzoo.net/wiki/SELECT_basics) {: .external-link target="_blank" rel="noreferrer noopener" }

- [W3Schools - Curso SQL online](https://www.w3schools.com/sql/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação Oficial MySQL](https://dev.mysql.com/doc/refman/8.0/en/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Tutorial sobre tipos de comando SQL do W3Schools](https://www.w3schools.in/mysql/ddl-dml-dcl/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Tutorial sobre tipos de comando SQL do Java T Point](https://www.javatpoint.com/dbms-sql-command) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
