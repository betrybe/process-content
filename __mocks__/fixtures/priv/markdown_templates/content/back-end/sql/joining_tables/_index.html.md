## O que vamos aprender?

Bem-vindo de volta! Hoje você vai aprender a utilizar os diferentes tipos de `JOIN` para juntar dados relacionados em um banco de dados. Similarmente, vai entender como unir resultados de duas ou mais _queries_ em apenas uma através do `UNION` e a construir queries aninhadas através do conceito de `SUBQUERIES`.

---

### Você será capaz de:

* Utilizar `INNER JOIN` para combinar dados de duas ou mais tabelas
* Utilizar `LEFT JOIN` e `RIGHT JOIN` para combinar dados de duas ou mais tabelas
* Utilizar `SELF JOIN` para fazer join de uma tabela com ela própria
* Unir resultados com `UNION` e `UNION ALL`
* Utilizar `SUBQUERIES`
* Criar queries mais eficientes através do `EXISTS`

---

## Por que isso é importante?

A ideia do `JOIN` é permitir combinar registros de duas ou mais tabelas, através do relacionamento que uma tabela tem com a outra. Já o `UNION` permite acrescentar os resultados de uma _query_ à outra.

Os conceitos de `EXISTS` e `SUBQUERY` são altamente importantes para criar queries cada vez mais eficientes e dinâmicas. Enquanto a cláusula `EXISTS` funciona como um filtro para verificar se existem dados no resultado de uma consulta, uma `SUBQUERY` é um subconsulta, ou seja, uma instrução do tipo `SELECT` dentro de uma outra instrução `SQL` como `UPDATE`, `DELETE` ou outro `SELECT`.

Todas essas funcionalidades podem ser usadas para diferentes propósitos no seu dia a dia de trabalho, como a criação de relatórios, de novas maneiras de exibir uma informação já cadastrada em uma tabela e adicionar detalhes a tabelas existentes, entre outras possibilidades.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### O que é um `JOIN`?

Até o momento, você já criou consultas para filtrar, ordenar, selecionar, alterar, agrupar, inserir e apagar dados armazenados nas tabelas dos seus bancos de dados. Cada consulta, no entanto, sempre acessava apenas uma tabela.

Em alguns casos, uma tabela pode não possuir toda a informação necessária. Em função disso, existe a opção de usar os diversos tipos de `JOIN` para combinar em um mesmo resultado registros de duas ou mais tabelas. Esses tipos são: `INNER JOIN`, `LEFT JOIN` e `RIGHT JOIN`, para combinar duas ou mais tabelas, e `SELF JOIN`, quando uma tabela precisa ser combinada consigo mesma. Você verá detalhes de cada um desses tipos de `JOIN` a seguir.

<%= figure(%{src: "https:\/\/media.giphy.com/media/MTdHOLBVYpVOLY4gRN/giphy.gif", caption: "O que o banco pensa quando você diz \`JOIN\`", class: "text-center rounded mx-auto d-block", width: "588px", height: "auto"}) %>

### Como utilizar o `INNER JOIN`

Assista ao vídeo a seguir para entender como usar o `INNER JOIN`.

<%= vimeo "391601017" %>

Como foi visto no vídeo, o `INNER JOIN` permite retornar todos os resultados em que a condição da cláusula `ON` for satisfeita. A sintaxe de um `INNER JOIN` é a seguinte:

```language-sql
SELECT t1.coluna, t2.coluna
FROM tabela1 AS t1
INNER JOIN tabela2 AS t2
ON t1.coluna_em_comum = t2.coluna_em_comum;
```

Veja uma representação visual do `INNER JOIN` abaixo:

<%= figure(%{src: "/back-end/sql/images/innerjoin.jpg", caption: "INNER JOIN. Fonte: Wikipedia", class: "text-center rounded mx-auto d-block", width: "200px", height: "auto"}) %>

##### Por que usamos o _alias_ (`AS`)?

O _alias_ `AS` é usado para apelidar qualquer parte da sua query. Isso ajuda o sistema de banco de dados a identificar a qual coluna estamos nos referindo, evitando erros de ambiguidade de nome de colunas, além de tornar suas queries mais concisas e legíveis.

Por exemplo, observe as queries a seguir:

<details>
  <summary>
  **Código sem** `alias`
  </summary>

```language-sql
SELECT sakila.actor.first_name, actor_id, sakila.film_actor.actor_id
FROM sakila.actor
INNER join film_actor
ON sakila.actor.actor_id = sakila.film_actor.actor_id;
```

O código acima, além de ser muito extenso, não permite que o banco de dados descubra de qual tabela deve trazer o `actor_id`, uma vez que ambas as tabelas, `actor` e `filme_actor`, possuem uma coluna `actor_id`. O seguinte erro será gerado ao tentar executar essa query:

<%= figure(%{src: "/back-end/sql/images/aliaserror.png", caption: "Erro de ambiguidade de coluna", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

</details>

<details>
  <summary>
  **Código com** `alias`
  </summary>

Podemos tornar a query mais legível com um _alias_, além de evitar o erro de ambiquidade de coluna:

```language-sql
SELECT a.first_name, a.actor_id, f.actor_id
FROM sakila.actor AS a
INNER JOIN film_actor AS f
ON a.actor_id = f.actor_id;
```

**OBS.:** A palavra-chave `AS` pode ser omitida. Nesse caso, o _alias_ é passado diretamente, após o nome da tabela:

```language-sql
SELECT a.first_name, a.actor_id, f.actor_id
FROM sakila.actor a
INNER JOIN film_actor f
ON a.actor_id = f.actor_id;
```
</details>

##### Dicas sobre como escolher o tamanho do *alias*

Sua _query_ é composta de poucas linhas? Então use apenas letras ou a primeira sílaba para representar a coluna. Por exemplo, **"actor"** se tornaria **"A"** ou **"act"**.

Caso esteja montando `JOINS` com muitas linhas, é recomendado usar um _alias_ mais descritivo para tornar a leitura e interpretação da _query_ mais simples.

<%= figure(%{src: "https:\/\/kwize.com/pics/Linus-Torvalds-quote-about-talking-1a9797.jpg", caption: "Ok, Linus, it's coding time!", class: "text-center rounded mx-auto d-block", width: "588px", height: "auto"}) %>

Vamos ver agora alguns desafios para consolidar esse conhecimento sobre o `INNER JOIN`, utilizando o banco de dados `sakila`. Antes de começar a escrever suas _queries_, identifique quais tabelas contêm as informações de que você precisa e como elas estão relacionadas.

1. Monte uma _query_ que exiba o **id do ator**, **nome do ator** e **id do filme** em que ele já atuou usando as tabelas `actor` e `film_actor`.

2. Use o `JOIN` para exibir o **nome**, **sobrenome** e **endereço** de cada um dos funcionários do banco. Use as tabelas `staff` e `address`.

3. Exiba o **id do cliente**, **nome** e **email** dos primeiros 100 clientes, ordenados pelo nome em ordem decrescente, juntamente com o **id do endereço** e o **nome da rua** onde o cliente mora. Essas informações podem ser encontradas nas tabelas `customer` e `address`.

4. Exiba o **nome**, **email**, **id do endereço**, **endereço** e **distrito** dos clientes que moram no distrito da California e que contêm "rene" em seus nomes. As informações podem ser encontradas nas tabelas `address` e `customer`.

5. Exiba o **nome** e a **quantidade de endereços** dos clientes cadastrados. Ordene seus resultados por nomes de forma decrescente. Exiba somente os clientes ativos. As informações podem ser encontradas na tabela `address` e `customer`.

6. Monte uma _query_ que exiba o **nome**, **sobrenome** e a **média de valor** (`amount`) paga aos funcionários no ano de 2006. Use as tabelas `payment` e `staff`. Os resultados devem estar agrupados pelo nome e sobrenome do funcionário.

7. Monte uma _query_ que exiba o **id do ator**, **nome**, **id do filme** e **título do filme**, usando as tabelas `actor`, `film_actor` e `film`. Dica: você precisará fazer mais de um `JOIN` na mesma _query_.

Até o momento, temos produzido resultados apenas quando temos valores correspondentes em ambas as colunas de referência. Porém, o que devemos fazer quando possivelmente apenas uma das tabelas possui um valor correspondente existente? É possível que você tenha que usar o `LEFT JOIN` ou `RIGHT JOIN` nessas situações.

### Como utilizar o `LEFT JOIN` e o `RIGHT JOIN`

Você precisa encontrar um conjunto de registros, mas não tem certeza se uma das colunas de referência envolvidas possui ou não essa informação. Para que você encontre registros nessa situação, podemos usar o `LEFT JOIN` ou `RIGHT JOIN`. Vamos entender melhor com o vídeo a seguir:

<%= vimeo "391603586" %>

O conceito de `JOIN` pode levar um certo tempo para ser compreendido. Sendo assim, vá no seu ritmo, reveja o conteúdo deste dia quantas vezes forem necessárias para compreender bem esse conceito. Pense em perguntas que você gostaria de responder sobre algum de seus bancos de dados que utilizem dados de mais de uma tabela. Abra o **Workbench** e tente fazer uma _query_ que responda a elas.

##### Três queries e uma pergunta

Vamos visualizar a diferença entre os três joins já vistos até o momento. Rode e analise cada uma das três _queries_ a seguir. Busque notar a diferença entre as colunas da direita e da esquerda e a quantidade de dados retornados em cada _query_, como foi mostrado no vídeo. Gaste de 2 a 5 minutos aqui e depois continue.

`LEFT JOIN`

```language-sql
SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    a.actor_id,
    a.first_name,
    a.last_name
FROM customer c
LEFT JOIN actor a
ON c.last_name = a.last_name
ORDER BY c.last_name;
```

`RIGHT JOIN`

```language-sql
SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    a.actor_id,
    a.first_name,
    a.last_name
FROM customer c
RIGHT JOIN actor a
ON c.last_name = a.last_name
ORDER BY c.last_name;
```

`INNER JOIN`

```language-sql
SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    a.actor_id,
    a.first_name,
    a.last_name
FROM customer c
INNER JOIN actor a
ON c.last_name = a.last_name
ORDER BY c.last_name;
```

##### Notando as diferenças

Depois de ter analisado as _queries_ acima, note que, de fato, a única diferença entre os três joins é a questão do foco. Vamos explorar essa ideia abaixo.

Quando utilizamos o `LEFT JOIN`, focamos a tabela da esquerda. São retornados todos os registros da tabela esquerda e valores correspondentes da tabela da direita, **caso existam**. Valores que não possuem correspondentes são exibidos como nulos.

Veja uma representação visual do `LEFT JOIN` abaixo:

<%= figure(%{src: "/back-end/sql/images/leftjoin.jpg", caption: "LEFT JOIN. Fonte: Wikipedia", class: "text-center rounded mx-auto d-block", width: "200px", height: "auto"}) %>

Veja um pouco mais sobre o `LEFT JOIN` no [W3Schools](https://www.w3schools.com/sql/sql_join_left.asp) {: .external-link target="_blank" rel="noreferrer noopener" } e no [MySQLTutorial](https://www.mysqltutorial.org/mysql-left-join.aspx) {: .external-link target="_blank" rel="noreferrer noopener" }.

Quando utilizamos o `RIGHT JOIN`, focamos a tabela da direita. São retornados todos os registros da tabela da direita e valores correspondentes da tabela da esquerda, **caso existam**. Valores que não possuem correspondentes são exibidos como nulos.

Veja uma representação visual do `RIGHT JOIN` abaixo:

<%= figure(%{src: "/back-end/sql/images/rightjoin.jpg", caption: "RIGHT JOIN. Fonte: Wikipedia", class: "text-center rounded mx-auto d-block", width: "200px", height: "auto"}) %>

Você pode ver mais exemplos sobre `RIGHT JOIN` no [W3Schools](https://www.w3schools.com/sql/sql_join_right.asp) {: .external-link target="_blank" rel="noreferrer noopener" } e no [MySQLTutorial](https://www.mysqltutorial.org/mysql-right-join/) {: .external-link target="_blank" rel="noreferrer noopener" }.

Finalmente, temos o `INNER JOIN`, que foca em trazer somente os registros que possuem valores correspondentes **em ambas as tabelas**.

Novamente, você pode ver uma representação visual do `INNER JOIN` abaixo:

<%= figure(%{src: "/back-end/sql/images/innerjoin.jpg", caption: "INNER JOIN. Fonte: Wikipedia", class: "text-center rounded mx-auto d-block", width: "200px", height: "auto"}) %>

Até o momento, temos usado mais de uma tabela para analisar dados e gerar informação. No entanto, a informação a ser analisada pode estar concentrada em apenas uma tabela. Nesse cenário, o `SELF JOIN` pode ser usado para criar resultados relevantes.

### O que é `SELF JOIN` e quando utilizá-lo

Há certos cenários nos quais faz sentido pesquisar e tirar alguma conclusão analisando apenas uma única tabela. Os tipos de `JOIN` que você viu até agora precisam necessariamente que mais de uma tabela seja incluída em uma _query_ para que um resultado possa ser gerado. O `SELF JOIN` não possui esse requisito. Vamos ver a seguir algumas das aplicações do `SELF JOIN`.

<%= vimeo "391604253" %>

Como foi visto no vídeo acima, podemos fazer pesquisas e comparações dentro da própria tabela através do `SELF JOIN`. Lembre-se dessa opção sempre que a informação que você precisa filtrar ou comparar para encontrar algo estiver em uma única tabela.

Leia mais sobre `SELF JOIN` no [W3Schools](https://www.w3schools.com/sql/sql_join_self.asp) {: .external-link target="_blank" rel="noreferrer noopener" } e no [W3Resource](https://www.w3resource.com/sql/joins/perform-a-self-join.php) {: .external-link target="_blank" rel="noreferrer noopener" }.

Note que um `SELF JOIN` não é um tipo diferente de `JOIN`. É apenas um caso em que uma tabela faz join consigo mesma. Você pode utilzar qualquer dos tipos de `JOIN` vistos ao realizar um `SELF JOIN`.

Para fixar esses conceitos, tente encontrar as seguintes informações:

1. Queremos saber os **ids** e **custos de substituição** dos filmes que possuem o mesmo custo de substituição.

2. Exiba o **título** e a **duração de empréstimo** dos filmes que possuem a mesma duração. Exiba apenas os filmes com a duração de empréstimo entre 2 e 4 dias.

Lembre-se de usar o `SELF JOIN` em situações em que as informações que estiver buscando estejam armazenadas em apenas uma tabela.

A seguir, veremos como é possível combinar os resultados de uma _query_ com outra por meio do `UNION`.

### Como unir resultados com o `UNION` e o `UNION ALL`

Imagine que temos duas tabelas, `morning_events` e `night_events`, e que essas tabelas possuem os nomes das pessoas que compareceram a esses dois tipos diferentes de eventos. Porém, queremos uma lista agregada de todas as pessoas que estão cadastradas, independente do tipo de evento a que compareceram.

Essa situação é um dos cenários que podem ser resolvidos através do `UNION`. O `UNION` nos permite unir os registros de uma tabela com outra, desde que usemos a mesma quantidade de colunas. Vamos explorar outras possibilidades no vídeo a seguir:

<%= vimeo "391604719" %>

Como foi visto no vídeo, podemos utilizar este comando de duas maneiras: `UNION` e `UNION ALL`.

O `UNION` remove os dados duplicados, enquanto o `UNION ALL` os mantém. Observe que, para usar o comando corretamente, a mesma quantidade de colunas deve ser utilizada.

Vamos trabalhar agora com alguns desafios sobre o `UNION`:

1. Todos os funcionários foram promovidos a atores. Monte uma _query_ que exiba a união da tabela `staff` com a tabela `actor`, exibindo apenas o `nome` e o `sobrenome`. Seu resultado não deve excluir nenhum funcionário ao unir as tabelas.

2. Monte uma _query_ que una os resultados das tabelas `customer` e `actor`, exibindo os nomes que contêm a palavra "tracy" na tabela `customer` e os que contêm "je" na tabela `actor`. Exiba apenas os resultados únicos.

3. Monte uma _query_ que exiba a união dos cinco últimos **nomes** da tabela `actor`, o primeiro nome da tabela `staff` e cinco **nomes** a partir da 15ª posição da tabela `customer`. Não permita que dados repetidos sejam exibidos. Ordene os resultados em ordem alfabética.

4. Você quer exibir uma lista paginada com os **nomes** e **sobrenomes** de todos os clientes e atores do banco de dados, em ordem alfabética. Considere que a paginação está sendo feita de 15 em 15 resultados e que você está na 4ª página. Monte uma _query_ que simule esse cenário.

Hoje você teve o seu primeiro contato com o mundo dos `JOINS` e `UNIONS`. Por ser um tema extenso e muito utilizado no dia a dia de desenvolvimento de software, é recomendado que você pratique o máximo possível.

Revise e pratique os conceitos de `UNION` através [destes exercícios](https://www.w3schools.com/sql/exercise.asp?filename=exercise_join1) {: .external-link target="_blank" rel="noreferrer noopener" }.

### Como utilizar uma `SUBQUERY`

Caso não tenha percebido, estamos usando subqueries há algumas aulas.

Uma `SUBQUERY` é uma query aninhada que é avaliada dentro de um par de parênteses. Ela pode conter expressões simples, como adições e subtrações, mas não se limita a isso, uma vez que podemos utilizar praticamente todos os comandos já vistos até o momento dentro de uma `SUBQUERY`.

Algo a se lembrar é que a subquery não é a única maneira de encontrar resultados de tabelas relacionadas. Quando se trata de SQL, os `JOINs` podem ser usados para encontrar os mesmos resultados.

É recomendado tomar a decisão sobre qual opção utilizar (subquery ou `JOIN`) baseando-se na performance da sua query.

##### Diferentes maneiras de utilizar uma `SUBQUERY`

1. Usando uma `SUBQUERY` como fonte de dados para o `FROM`.

```language-sql
SELECT f.title, f.rating
FROM (
    SELECT *
    FROM sakila.film
    WHERE rating = 'R'
) AS f;
```

    <%= figure(%{src: "/back-end/sql/images/subquery_result_1.png", caption: "Resultado da subquery usada no \`FROM\`", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

2. Preenchendo uma coluna de um `SELECT` por meio de uma `SUBQUERY`.

```language-sql
SELECT
    address,
    district,
    (
        SELECT city
        FROM sakila.city
        WHERE city.city_id = sakila.address.city_id
    ) AS city
FROM sakila.address;
```

    <%= figure(%{src: "/back-end/sql/images/subquery_result_2.png", caption: "Resultado da subquery como uma coluna do \`SELECT\`", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

3. Filtrando resultados com `WHERE` usando como base os dados retornados de uma `SUBQUERY`.

```language-sql
SELECT address, district
FROM sakila.address
WHERE city_id in (
    SELECT city_id
    FROM sakila.city
    WHERE city in ('Sasebo', 'San Bernardino', 'Athenai', 'Myingyan')
);
```

    <%= figure(%{src: "/back-end/sql/images/subquery_result_3.png", caption: "Resultado da subquery com o \`WHERE\`", class: "text-center rounded mx-auto d-block", width: "350px", height: "auto"}) %>

4. Usando uma tabela externa, de fora da `SUBQUERY`, dentro dela.

```language-sql
SELECT
    first_name,
    (
        SELECT address
        FROM sakila.address
        WHERE address.address_id = tabela_externa.address_id
    ) AS address
FROM sakila.customer AS tabela_externa;
```

<%= figure(%{src: "/back-end/sql/images/subquery_result_4.png", caption: "Resultado da subquery usando tabela externa", class: "text-center rounded mx-auto d-block", width: "350px", height: "auto"}) %>

##### SUBQUERY ou JOIN

Talvez você esteja se perguntando se seria possível resolver as queries anteriores através de um `JOIN`. De fato, podemos, como é exemplificado a seguir.

Usando `SUBQUERY`

```language-sql
SELECT
    first_name,
    (
        SELECT address
        FROM sakila.address
        WHERE address.address_id = tabela_externa.address_id
    ) AS address
FROM sakila.customer AS tabela_externa;
```

Usando `INNER JOIN`

```language-sql
SELECT c.first_name, ad.address
FROM sakila.customer c
INNER JOIN sakila.address ad ON c.address_id = ad.address_id;
```

Sabendo disso, como decidir entre as duas abordagens? Decida qual usar através de testes de performance e, em seguida, por afinidade.

##### Uma maneira simples de mensurar a performance e decidir sobre qual abordagem utilizar (Execution Plan)

Diferente da maioria dos problemas que as pessoas desenvolvedoras resolvem, é possível decidir por queries melhores que outras através da medição do seu custo de execução.

Existem [diversas maneiras](https://dev.mysql.com/doc/refman/8.0/en/optimization.html) {: .external-link target="_blank" rel="noreferrer noopener" } para mensurar a performance e otimizar queries no MySQL Server. Temos carreiras inteiras baseadas nisso. Nesta aula, iremos abordar apenas uma delas: o **execution plan**.

Ele mensura o custo de uma query e exibe o tipo de [scan](https://www.java67.com/2017/12/difference-between-table-scan-index.html) {: .external-link target="_blank" rel="noreferrer noopener" } efetuado em cada tabela incluída na query e seu custo total. Seu uso na prática pode ser visto da seguinte forma:

Tomando como exemplo as duas últimas queries desta página, crie dois novos arquivos SQL no seu MySQl Workbench. Em um deles, cole a query em que utilizamos a solução usada como `SUBQUERY` e, no outro, a que se utilizou como `INNER JOIN`.

Em seguida, execute uma das queries e depois clique em **Execution Plan**, como na imagem abaixo, e observe o valor de "Query Cost". Quanto menor o valor, em comparação com outra versão da query, melhor a performance. Assim você pode simplesmente escolher a query que tem o menor custo.

<%= figure(%{src: "/back-end/sql/images/execution_plan_sql2.png", caption: "Como acessar o execution plan", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

Execute os comandos acima e verifique o custo de cada query. Ficou claro que, nesse caso específico, a `SUBQUERY` tem uma performance melhor que o `JOIN`, em razão de ter o custo de query mais baixo.

### Criando queries mais dinâmicas através do `EXISTS`

**Antes de iniciar essa seção:**

Os bancos de dados utilizados no vídeo podem ser acessados nos links a seguir.

Banco de dados `praticando`: [link](/back-end/sql/praticando.sql) {: .external-link target="_blank" rel="noreferrer noopener" }.

Banco de dados `hotel`: [link](/back-end/sql/hotel.sql) {: .external-link target="_blank" rel="noreferrer noopener" }.

Para usá-los em seu computador, copie o código disponilizado em cada link e restaure cada um utilizando o MySQL Workbench, selecionando todo código e clicando no botão de raio para executar o script de restauração.

<%= figure(%{src: "/back-end/sql/images/how_to_restore.png", caption: "Restaurando um banco de dados a partir de um script", class: "text-center rounded mx-auto d-block", width: "670px", height: "auto"}) %>

Vamos entender melhor como utilizar o `EXISTS` no vídeo a seguir:

<%= vimeo "394798097" %>

Após a explicação acima, é bom enfatizar aqui que o intuito principal do `EXISTS` é:

> Retornar os registros da tabela A que possuem um relacionamento com os registros da tabela B.

Para mais exemplos sobre como utilizar o `EXISTS`, recomendamos a [seguinte leitura](https://www.w3resource.com/sql/special-operators/sql_exists.php) {: .external-link target="_blank" rel="noreferrer noopener" }.

##### Vamos Praticar um pouco mais sobre o exists

Use o [banco de dados hotel](/back-end/sql/hotel.sql) {: .external-link target="_blank" rel="noreferrer noopener" } para realizar os desafios a seguir:

1. Usando o `EXISTS` na tabela `books_lent` e `books`, exiba o **id** e **título** dos livros que ainda não foram emprestados.

2. Usando o `EXISTS` na tabela `books_lent` e `books`, exiba o **id** e **título** dos livros estão atualmente emprestados e que contêm a palavra "lost" no título.

3. Usando a tabela `carsales` e `customers`, exiba apenas o nome dos clientes que ainda não compraram um carro.

4. Usando o comando `EXISTS` em conjunto com `JOIN` e as tabelas `cars`, `customers` e `carsales`, exiba o **nome do cliente** e o **modelo do carro** de todos os clientes que fizeram compras de carros.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Vamos bater um papo sobre SQL? Hora da aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 80 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

**Exercício 1:** Praticando `INNER JOIN`. Faça os exercícios [deste link](https://sqlbolt.com/lesson/select_queries_with_joins) {: .external-link target="_blank" rel="noreferrer noopener" }.

**Exercício 2:** Praticando `OUTER JOIN`. Faça os exercícios [deste link](https://sqlbolt.com/lesson/select_queries_with_outer_joins) {: .external-link target="_blank" rel="noreferrer noopener" }.

**Exercício 3:** Siga os passos a seguir.

1. Acesse [este link](https://github.com/XD-DENG/SQL-exercise/tree/master/SQL_exercise_01) {: .external-link target="_blank" rel="noreferrer noopener" }.

2. Considere a estrutura da imagem a seguir:
<%= figure(%{src: "/back-end/sql/images/sqlexercises.png", caption: "", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

    Baixe o script chamado `1_build_schema.sql`. Copie seu conteúdo, cole-o em uma janela de _query_ dentro do **MySQL Workbench** e acrescente as seguintes linhas **no início** do código:

```language-sql
    CREATE database IF NOT EXISTS praticando;
    USE praticando;
```

3. Selecione todo o código e execute-o.

4. Agora que você restaurou o banco de dados `praticando`, faça os exercícios 1.10 a 1.14.

**Exercício 4:** Siga os passos a seguir.

1. Acesse [este link](https://github.com/XD-DENG/SQL-exercise/tree/master/SQL_exercise_02) {: .external-link target="_blank" rel="noreferrer noopener" }.

2. Considere a estrutura da imagem a seguir:
<%= figure(%{src: "/back-end/sql/images/sqlexercises.png", caption: "", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

    Baixe o script chamado `2_build_schema.sql`. Copie seu conteúdo, cole-o em uma janela de _query_ dentro do **MySQL Workbench** e acrescente as seguintes linhas **no início** do código:

```language-sql
    CREATE database IF NOT EXISTS praticando;
    USE praticando;
```

3. Selecione todo o código e execute-o.

4. Agora que você restaurou o banco de dados `praticando`, faça os exercícios 2.10, 2.11, 2.12 2.14.

**Exercício 5:** Siga os passos a seguir.

1. Acesse [este link](https://github.com/XD-DENG/SQL-exercise/tree/master/SQL_exercise_03) {: .external-link target="_blank" rel="noreferrer noopener" }.

2. Considere a estrutura da imagem a seguir:
<%= figure(%{src: "/back-end/sql/images/sqlexercises.png", caption: "", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

    Baixe o script chamado `3_build_schema.sql`. Copie seu conteúdo, cole-o em uma janela de _query_ dentro do **MySQL Workbench** e acrescente as seguintes linhas **no início** do código:

```language-sql
    CREATE database IF NOT EXISTS praticando;
    USE praticando;
```

3. Selecione todo o código e execute-o.

4. Agora que você restaurou o banco de dados `praticando`, faça os exercícios 3.7 a 3.10.

**Exercício 6:** Siga os passos a seguir.

1. Acesse [este link](https://github.com/XD-DENG/SQL-exercise/tree/master/SQL_exercise_04) {: .external-link target="_blank" rel="noreferrer noopener" }.

2. Considere a estrutura da imagem a seguir:
<%= figure(%{src: "/back-end/sql/images/sqlexercises.png", caption: "", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

    Baixe o script chamado `4_build_schema.sql`. Copie seu conteúdo, cole-o em uma janela de _query_ dentro do **MySQL Workbench** e acrescente as seguintes linhas **no início** do código:

```language-sql
    CREATE database IF NOT EXISTS praticando;
    USE praticando;
```

3. Selecione todo o código e execute-o.

4. Agora que você restaurou o banco de dados `praticando`, faça os exercícios 4.5 a 4.7.

**Exercício 7:**

Caso encontre exercícios sobre o `NATURAL JOIN`, consulte [este link](https://www.w3resource.com/mysql/advance-query-in-mysql/mysql-natural-join.php) {: .external-link target="_blank" rel="noreferrer noopener" } para aprender como utilizá-lo.

Para fazer os exercícios da página abaixo, restaure o back-up do banco de dados `HR` que está disponível clicando [neste link](/back-end/sql/hr.sql) {: .external-link target="_blank" rel="noreferrer noopener" }. Em seguida, siga estes passos:

1. Execute o conteúdo deste arquivo `.sql` em seu banco de dados local.
2. Acesse os exercícios [deste link](https://www.w3resource.com/mysql-exercises/join-exercises/write-a-query-to-find-the-addresses-of-all-the-departments.php) {: .external-link target="_blank" rel="noreferrer noopener" }
3. Leia o enunciado do exercício.
4. Monte uma _query_ em seu banco local, que você acabou de restaurar, e veja se seu resultado resolve o desafio.
5. Caso não consiga resolver os exercícios, consulte as respostas clicando em "Click me to see the solution" na página do desafio.

**Exercício 8:**

Usando o banco de dados `sakila`, pratique o `JOIN` com os exercícios 6a a 6b [deste link](https://gist.github.com/Jhonatan-de-Souza/99a384d430402913df1d20de216ece5f) {: .external-link target="_blank" rel="noreferrer noopener" }. As respostas podem ser conferidas [neste link](https://gist.github.com/Jhonatan-de-Souza/b1f1e9257900b2db6bf09b61fe02e011) {: .external-link target="_blank" rel="noreferrer noopener" }.

### Bônus

**Exercício 9:**

Para uma lista completa de exercícios, do básico ao avançado, siga as instruções abaixo acessando [este link](https://github.com/XD-DENG/SQL-exercise) {: .external-link target="_blank" rel="noreferrer noopener" }. Siga os passos descritos nos exercícios 3, 4, 5 e 6 para criar e restaurar o banco de dados.

## Recursos adicionais (opcional)

- Como utilizar `INNER JOIN`, `LEFT LEFT` e `RIGHT JOIN`, por [Dev Media](https://www.devmedia.com.br/clausulas-inner-join-left-join-e-right-join-no-sql-server/18930) {: .external-link target="_blank" rel="noreferrer noopener" }

- Entenda mais sobre o `INNER JOIN` no [MySQLTutorial](https://www.mysqltutorial.org/mysql-inner-join.aspx) {: .external-link target="_blank" rel="noreferrer noopener" } e no [W3Schools](https://www.w3schools.com/sql/sql_join_inner.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

- Aprenda SQL `JOINS` na prática com o [SQL Bolt](https://sqlbolt.com/lesson/select_queries_with_joins) {: .external-link target="_blank" rel="noreferrer noopener" }

- Explicação detalhada sobre `UNION` no [Macoratti](http://www.macoratti.net/13/05/sql_uni1.htm) {: .external-link target="_blank" rel="noreferrer noopener" }

- UNION desconstruido com exemplos no [SQLServerTutorial.net](https://www.sqlservertutorial.net/sql-server-basics/sql-server-union/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
