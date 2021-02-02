## O que vamos aprender?

Bem-vindo a mais uma aula! Hoje você completará o seu arsenal de ferramentas úteis para lidar com a criação e manipulação de tabelas, com o intuito de te capacitar para os principais passos de uma modelagem de banco de dados.

---

### Você será capaz de:

* Clonar tabelas existentes;

* Lidar com `VIEWs`;

* Alterar tabelas existentes;

* Deletar uma tabela;

* Usar um `INDEX`.

---

## Por que isso é importante?

É importante que você tenha o conhecimento necessário para lidar com os diferentes aspectos da modelagem de dados e tarefas relacionadas. Para se capacitar nesse sentido, você aprenderá a trabalhar com `VIEWs`, **alteração** e **exclusão** de tabelas, além de lidar com a **criação de índices**.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Clonar tabelas existentes

Antes de trabalhar com a alteração ou manipulação de tabelas existentes, existe uma operação que é extremamente útil e simples: clonar tabelas.

Para clonar uma tabela, é preciso fazer apenas um comando:

```language-sql
-- Sintaxe:
CREATE TABLE nome_para_nova_tabela LIKE tabela_a_ser_clonada;

-- Exemplo:
CREATE TABLE actor_clone LIKE sakila.actor;
```

Ao fazer isso, você terá criado uma tabela com a estrutura exatamente igual (chave primária, chave estrangeira, tipos, restrições etc.) usando apenas uma linha de código!

**Pontos de Atenção**

* Esse comando não copia os dados, apenas a estrutura;

* Caso não especifique qual banco de dados utilizar, a nova tabela será inserida no banco que estiver ativo no momento da execução. Sendo assim, sempre especifique o banco de dados antes.

```language-sql
USE nome_do_banco_de_dados;
CREATE TABLE nome_para_nova_tabela LIKE tabela_a_ser_clonada;
```

**Dê um pause aqui** na lição e clone alguma tabela do banco de dados `sakila` para ver na prática o resultado do comando acima.

### O que é e como lidar com uma `VIEW`

Agora que você já sabe como clonar a estrutura de uma tabela, imagine ter que ficar montando a mesma query repetidamente. Deve haver uma maneira mais esperta de fazer isso, não é?

Claro, pode-se criar uma `VIEW`.

##### O que é uma `VIEW`?

Uma `VIEW` é nada mais nada menos que uma tabela temporária no seu banco de dados, que pode ser consultada como qualquer outra. Porém, por ser uma tabela temporária, ela é criada a partir de uma query que você definir.

Uma `VIEW` te permite:

* Ter uma tabela que pode ser usada em relatórios;

* Ter uma tabela para usar como base para montar novas queries;

* Reduzir a necessidade de recriar queries utilizadas com frequência.

##### Anatomia de uma `VIEW`

```language-sql
USE nome_do_banco_de_dados; -- Defina em qual banco a view será criada
CREATE VIEW nome_da_view AS query;
```

##### Um exemplo de uso

Suponha que a gerência quer ter uma maneira simples para sempre saber quem são os top 10 clientes que mais compram com a empresa. Pode-se criar uma view para resolver isso!

```language-sql
CREATE VIEW top_10_customers AS
    SELECT c.customer_id, c.first_name, SUM(p.amount) AS total_amount_spent
    FROM sakila.payment p
    INNER JOIN sakila.customer c ON p.customer_id = c.customer_id
    GROUP BY customer_id
    ORDER BY total_amount_spent DESC
    LIMIT 10;
```

Agora, caso alguém precise ter acesso a essa informação, você pode consultar a tabela temporária (`VIEW`) diretamente, sem a necessidade de montar uma nova query.

```language-sql
SELECT * FROM top_10_customers;
```

<%= figure(%{src: "/back-end/sql/images/top10customers.png", caption: "Resultado de \`SELECT * FROM top_10_customers;\`", class: "text-center rounded mx-auto d-block", width: "350px", height: "auto"}) %>

Para excluir uma `VIEW`, use o seguinte comando:

```language-sql
DROP VIEW nome_da_view;
```

### Tudo que você deve saber sobre o `ALTER TABLE`

Algo extremamente comum durante o ciclo de desenvolvimento de software é a necessidade constante de fazer melhorias na estrutura do banco de dados. As tabelas são uma dessas estruturas que são alteradas com frequência.

Ao executar o bloco de código abaixo, a tabela `noticia` será criada. Essa tabela será utilizada como exemplo para testar modificações em sua estrutura.

```language-sql
USE sakila;
CREATE TABLE noticia(
    noticia_id INT PRIMARY KEY,
    titulo VARCHAR(100),
    historia VARCHAR(300)
) engine = InnoDB;
```

Abaixo, pode-se ver as alterações que podem ser feitas em uma tabela.

```language-sql
-- Adicionar uma nova coluna
ALTER TABLE noticia ADD COLUMN data_postagem date NOT NULL;

-- Modificar o tipo e propriedades de uma coluna
ALTER TABLE noticia MODIFY noticia_id BIGINT;

-- Adicionar incremento automático a uma coluna
-- (especifique o tipo da coluna + auto_increment)
ALTER TABLE noticia MODIFY noticia_id BIGINT auto_increment;

-- Alterar o tipo e nome de uma coluna
ALTER TABLE noticia CHANGE historia conteudo_postagem VARCHAR(1000) NOT NULL;

-- Dropar/Excluir uma coluna
ALTER TABLE noticia DROP COLUMN data_postagem;

-- Adicionar uma nova coluna após outra
ALTER TABLE noticia ADD COLUMN data_postagem DATETIME NOT NULL AFTER titulo;
```

Com os comandos acima, foram cobertas as operações mais comuns que você deve saber para alterar uma tabela. Para confirmar se a estrutura da sua tabela foi alterada corretamente, você pode usar o comando `SHOW COLUMNS FROM nome_da_tabela;`. Veja o exemplo abaixo:

```language-sql
SHOW COLUMNS FROM sakila.noticia;
```

<%= figure(%{src: "/back-end/sql/images/showcolumn.png", caption: "Visualizando a estrutura da tabela \`noticia\`", class: "text-center rounded mx-auto d-block", width: "650px", height: "auto"}) %>

### DROPando uma tabela

Para excluir uma tabela existente, você pode utilizar o comando `DROP TABLE`.

```language-sql
DROP TABLE nome_da_tabela;
```

##### Ponto Importante

Você não conseguirá dropar (excluir) uma tabela que é referenciada por uma restrição de chave estrangeira. A chave estrangeira ou a tabela que a contém deve ser excluída antes.

Por exemplo, tente dropar a tabela `sakila.language` com o comando abaixo:

```language-sql
DROP TABLE sakila.language;
```

Ao executar o comando, você verá que ele não funciona, retornando a seguinte mensagem de erro:

> Error Code: 3730. Cannot drop table 'language' referenced by a foreign key constraint 'fk_film_language' on table 'film'

Isso acontece em função de as informações da tabela `language` serem utilizadas na tabela `film`. Caso tente dropar a tabela `film`, você perceberá que ela também possui restrições. Essas restrições estão relacionadas ao conceito de [**integridade referencial,**](https://pt.wikipedia.org/wiki/Integridade_referencial) {: .external-link target="_blank" rel="noreferrer noopener" } que deve ser considerado quando se cria um banco de dados. Elas têm o intuito de evitar que tabelas sejam excluídas acidentalmente.

Então, lembre-se: nem todas as tabelas podem (ou devem) ser dropadas diretamente. É necessário avaliar as restrições existentes naquela tabela para entender o que pode ser feito e como deve ser feito, caso precise excluí-la.

### Como usar um `INDEX`

Quando se fala em otimização de queries, o termo índice (ou `INDEX`) pode vir a ser mencionado como solução para problemas de performance. Mas o que são índices, e quando se deve usá-los?

Hora de conferir no vídeo a seguir:

<%= vimeo "394462599" %>

No vídeo acima você viu que há algumas opções diferentes quanto ao uso de índices. É possível conferir um resumo dessas opções logo abaixo:

```language-sql
-- Criando um índice em uma coluna
CREATE [INDEX | FULLTEXT INDEX | UNIQUE INDEX] nome_indice
ON tabela (coluna);

-- Criando um índice composto, em duas ou mais colunas
CREATE [INDEX | FULLTEXT INDEX | UNIQUE INDEX] nome_indice
ON tabela (coluna1, coluna2);

-- Excluindo índices
DROP INDEX nome_do_indice ON tabela;
```

##### Entenda o impacto do `INDEX`

Para entender o impacto de um `INDEX`, hora de comparar o antes e o depois da adição de um `INDEX` à coluna `first_name` da tabela `sakila.actor` e verificar seu impacto no custo de uma query.

Execute o comando abaixo para criar um índice na coluna `first_name` dentro da tabela `actor`.

```language-sql
CREATE INDEX index_first_name ON sakila.actor(first_name);
```

Execute a query abaixo e verique seu custo através do execution plan.

```language-sql
SELECT *
FROM sakila.actor
WHERE first_name = 'RITA';
```

<%= figure(%{src: "/back-end/sql/database-modeling/images/SelectActorAfterindex.png", caption: "Custo da query \`SELECT * FROM sakila.actor WHERE first_name = 'RITA'\` com índice", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

Agora, exclua o índice para fazer a comparação:

```language-sql
DROP INDEX index_first_name ON sakila.actor;
```

Veja o custo da mesma query, quando executada sem um índice na coluna `first_name`:

```language-sql
SELECT *
FROM sakila.actor
WHERE first_name = 'RITA';
```

<%= figure(%{src: "/back-end/sql/database-modeling/images/SelectActorBeforeindex.png", caption: "Custo da query \`SELECT * FROM sakila.actor WHERE first_name = 'RITA'\` sem índice", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

Como se vê, neste caso o índice possui uma melhor performance.

##### Entenda o impacto do `FULLTEXT INDEX`

Hora de fazer outro exemplo para analisar o impacto que um `FULLTEXT INDEX`, em conjunto com uma [**full-text search,**](https://www.mysqltutorial.org/mysql-natural-language-search.aspx) {: .external-link target="_blank" rel="noreferrer noopener" }, possui na performance de uma query. Para esse exemplo será alterada a coluna `address` da tabela `sakila.address`. Veja a criação do índice logo abaixo:

```language-sql
CREATE FULLTEXT INDEX index_address ON sakila.address(address);
```

Para verificar a diferença na performance, deve-se utilizar os comandos `MATCH` e `AGAINST`, conforme foi visto anteriormente no texto sobre [full-text search.](https://www.mysqltutorial.org/mysql-natural-language-search.aspx) {: .external-link target="_blank" rel="noreferrer noopener" }. Execute a query abaixo e verifique seu custo através do execution plan:

```language-sql
SELECT *
FROM sakila.address
WHERE MATCH(address) AGAINST('drive');
```

<%= figure(%{src: "/back-end/sql/database-modeling/images/trigger2Result.png", caption: "Custo da query \`SELECT * FROM sakila.address WHERE MATCH(address) AGAINST('drive')\` com índice em \`address\`", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

Agora, exclua o índice para fazer a comparação:

```language-sql
DROP INDEX index_address ON sakila.address;
```

Veja o custo da query, quando executada sem um índice na coluna `address`:

```language-sql
SELECT *
FROM sakila.address
WHERE address LIKE '%drive%';
```

<%= figure(%{src: "/back-end/sql/database-modeling/images/trigger4Result.png", caption: "Custo da query \`SELECT * FROM sakila.address WHERE address LIKE '%drive%'\` sem índice", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

Novamente, houve uma melhoria na performance.

##### Entenda o impacto do `UNIQUE INDEX`

A Sintaxe para *criar* um `UNIQUE INDEX` é a seguinte:

```language-sql
CREATE UNIQUE INDEX nome_do_indice ON nome_tabela(nome_coluna);
```

Para *dropar* (excluir), pode-se usar:

```language-sql
DROP INDEX nome_do_indice ON nome_tabela;
```

O `UNIQUE INDEX` é utilizado em uma coluna para, principalmente, prevenir a duplicação de dados em uma tabela e, secundariamente, melhorar a performance de busca.

Colunas que fazem uso dessa restrição podem receber valores *nulos*. É importante lembrar também que a restrição `PRIMARY KEY`, quando aplicada a uma coluna, insere por padrão as restrições `UNIQUE INDEX` + `NOT NULL` naquela coluna.

Logo, pode-se entender que a `PRIMARY KEY` também é um `UNIQUE INDEX` que não permite valores *nulos*.

Isso pode ser confirmado usando o comando `SHOW INDEX`, que lista os detalhes sobre um índice em uma tabela. Veja abaixo um exemplo de uso do comando.

```language-sql
SHOW INDEX FROM sakila.actor;
```

<%= figure(%{src: "/back-end/sql/database-modeling/images/sakila_actor_table_with_primary_and_unique_key_index.png", caption: "Coluna \`actor_id\`, que possui um \`UNIQUE INDEX\`", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

Como se pode ver acima, embora nenhum índice tenha sido criado ainda, todas as colunas do banco de dados que usam a restrição `PRIMARY KEY` possuem internamente um `UNIQUE INDEX`. Isso pode ser confirmado na coluna `actor_id` pelo `Non_Unique = 0`, que quer dizer que a coluna possui um índice único.

**Um exemplo de uso do `UNIQUE INDEX`**

Hora de verificar a performance de uma query antes de inserir um `UNIQUE INDEX` na coluna `name` da tabela `language`.

```language-sql
CREATE UNIQUE INDEX unique_name_index ON sakila.language(name);

SELECT *
FROM sakila.language
WHERE name = 'Mandarin';
```

<%= figure(%{src: "/back-end/sql/database-modeling/images/unique_result2.png", caption: "Resultado da busca COM uso do \`UNIQUE INDEX\`", class: "text-center rounded mx-auto d-block", width: "300px", height: "auto"}) %>

```language-sql
DROP INDEX unique_name_index ON sakila.language;

SELECT * FROM sakila.language
WHERE name = 'Mandarin';
```

<%= figure(%{src: "/back-end/sql/database-modeling/images/unique_result1.png", caption: "Resultado da busca SEM uso do \`UNIQUE INDEX\`", class: "text-center rounded mx-auto d-block", width: "300px", height: "auto"}) %>

Aqui, mais uma vez, teve-se uma melhoria na performance.

##### Quando não utilizar índices

Mesmo notando que os resultados foram favoráveis para o uso de índices nesses exemplos, é importante ressaltar que eles nem sempre devem ser utilizados. Abaixo, segue uma lista das situações em que o uso de índices deve ser evitado:

* Em tabelas pequenas, pois a diferença de performance será mínima, se houver;

* Em colunas que retornarão uma grande quantidade dados quando filtradas. Por exemplo, você não adicionaria os artigos "o" e "a" ao índice de um livro;

* Em tabelas que frequentemente têm atualizações em grande escala, uma vez que a performance dessas atualizações será afetada;

* Em colunas que são frequentemente manipuladas, haja vista que a manutenção do índice dessa coluna pode demandar muito tempo quando feita em excesso;

* Em colunas que possuem muitos valores nulos.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Vamos bater um papo sobre SQL? Hora da aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 40 minutos

<%= versioning_your_code(@conn) %>

---

### Agora, a prática:

##### Desafios sobre `VIEW`

1. Crie uma view chamada `film_with_categories` utilizando as tabelas `category`, `film_category` e `film` do banco de dados `sakila`. Essa view deve exibir o `título` do filme, o `id` da categoria e o `nome` da categoria, conforme a imagem abaixo. Os resultados devem ser ordenados pelo `título` do filme.

    <%= figure(%{src: "/back-end/sql/images/viewexercise1.png", caption: "Resultado de exemplo para uma consulta na view do exercício 1", class: "text-center rounded mx-auto d-block", width: "400px", height: "auto"}) %>

2. Crie uma view chamada `film_info` utilizando as tabelas `actor`, `film_actor` e `film` do banco de dados `sakila`. Sua view deve exibir o `actor_id`, o nome completo do ator ou da atriz em uma coluna com o `ALIAS` `actor` e o título dos filmes. Os resultados devem ser ordenados pelos nomes de atores e atrizes. Use a imagem a seguir como referência.

    <%= figure(%{src: "/back-end/sql/images/view_challenge2.png", caption: "Resultado de exemplo para uma consulta na view do exercício 2", class: "text-center rounded mx-auto d-block", width: "400px", height: "auto"}) %>

3. Crie uma view chamada `address_info` que faça uso das tabelas `address` e `city` do banco de dados `sakila`. Sua view deve exibir o `address_id`, o `address`, o `district`, o `city_id` e a `city`. Os resultados devem ser ordenados pelo nome das cidades. Use a imagem abaixo como referência.

    <%= figure(%{src: "/back-end/sql/images/view_challenge3.png", caption: "Resultado de exemplo para uma consulta na view do exercício 3", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

4. Crie uma view chamada `movies_languages`, usando as tabelas `film` e `language` do banco de dados `sakila`. Sua view deve exibir o **título do filme**, o **id do idioma** e o **idioma do filme**, como na imagem a seguir.

<%= figure(%{src: "/back-end/sql/images/view_challenge1.png", caption: "Resultado de \`SELECT * FROM movies_languages\`", class: "text-center rounded mx-auto d-block", width: "350px", height: "auto"}) %>

##### Desafios sobre `INDEX`

1. Verifique o impacto de um `FULLTEXT INDEX` na tabela `category` (banco de dados `sakila`), adicionando-o na coluna `name`. Após ter adicionado o índice, mensure o custo da query utilizando o execution plan, como já foi feito em lições anteriores. Após ter criado e mensurado o custo da query, exclua o índice e mensure novamente esse custo.

```language-sql
-- Após ter criado o índice, mensure o custo com a seguinte query:
SELECT *
FROM sakila.category
WHERE MATCH(name) AGAINST('action');

-- Após ter excluído o índice, mensure o custo com a seguinte query:
SELECT *
FROM sakila.category
WHERE name LIKE '%action%';
```

2. Verifique o impacto de um `INDEX` na tabela `address` (banco de dados `sakila`) adicionando-o na coluna `postal_code`. Após ter adicionado o índice, mensure o custo da query utilizando o execution plan, como já foi feito em lições anteriores. Após ter criado e mensurado o custo da query, exclua o índice e mensure novamente esse custo.

```language-sql
-- Mensure o custo com a seguinte query:
SELECT *
FROM sakila.address
WHERE postal_code = '36693';
```

##### Desafios sobre `ALTER TABLE`

**Restaure o banco de dados `HR` abaixo antes de continuar, caso não o tenha restaurado em alguma lição anterior:**

O banco de dados usado como base para os próximos exercícios pode ser restaurado através [deste arquivo SQL.](/back-end/sql/hr.sql) {: .external-link target="_blank" rel="noreferrer noopener" }

1. Baixe o conteúdo do arquivo `.sql` linkado acima;

2. Copie todo o código SQL;

3. Abra o MySQL Workbench e abra uma nova janela de query;

4. Cole o SQL para dentro dessa janela;

5. Selecione todo o código usando CTRL + A;

6. Execute-o teclando CTRL + ENTER.

**Desafios:**

1. Escreva uma query SQL para alterar o nome da coluna `street_address` para `address`, mantendo o mesmo tipo e tamanho de dados.

2. Escreva uma query SQL para alterar o nome da coluna `region_name` para `region`, mantendo o mesmo tipo e tamanho de dados.

3. Escreva uma query SQL para alterar o nome da coluna `country_name` para `country`, mantendo o mesmo tipo e tamanho de dados.

---

## Recursos adicionais (opcional)

* [MySQL Create Index - w3resource](https://www.w3resource.com/mysql/creating-table-advance/create-index.php) {: .external-link target="_blank" rel="noreferrer noopener" }

* [MySQL Views - w3resource](https://www.w3resource.com/mysql/mysql-views.php) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Integridade referencial](https://pt.wikipedia.org/wiki/Integridade_referencial) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
