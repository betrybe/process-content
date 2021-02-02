## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

## Exercícios de fixação

Sem ter acesso à estrutura interna de como essa tabela foi criada, quero que você tente responder ao seguinte:

1. Quais constraints a coluna address_id poderia ter? Por quê?
    1. **Resposta**: A coluna address_id possui a constraint *Primary Key* para que exista um número identificador único. Além disso, a *Primary Key* não permite que ela seja nula.
2. A coluna `city_id` é um número. Você consegue identificar que tipo de *constraint* foi aplicado nela? 
    1. **Resposta:** A coluna `city_id` é do tipo _Foreign Key_, e nela foi aplicada a constraint _Foreign Key_.
3. A coluna address (endereço) possui uma *constraint*. Acredita que essa coluna possui informação que é relevante para a tabela? Se sim, qual tipo de *constraint* seria interessante ser aplicado a ela para que ela sempre tenha que possuir um valor?
    1. **Resposta**: A restrição aplicada na coluna address é a restrição NOT NULL. Dessa maneira, é interessante que a coluna address (endereço) sempre esteja preenchida em função de ser uma informação crucial para essa tabela, além de a tabela não fazer sentido sem essa informação preenchida.

Temos aqui uma outra tabela:


<%= figure(%{src: "/back-end/sql/images/IntroductionCityTable.png", caption: "", class: "text-center rounded mx-auto d-block", width: "400px", height: "auto"}) %>



1. Que tipo de restrição está aplicado sobre city_id? 
    **Resposta:** A coluna city_id possui a restrição _Primary Key_.
2. Qual é o motivo da coluna `country_id` não possuir nomes de country (país)? 
    **Resposta:** Isso acontece porque a coluna `country_id` é apenas uma referência para a sua tabela original, e o número que é exibido nessa tabela representa uma _Foreign Key_. Caso você queira ver o nome do país, você deve ir até a tabela na qual o `country_id` é uma _Primary Key_.

Na tabela a seguir:

<%= figure(%{src: "/back-end/sql/images/IntroductionFilmTable.png", caption: "", class: "text-center rounded mx-auto d-block", width: "300px", height: "auto"}) %>

1. Qual coluna possui uma _Primary Key_?
    **Resposta:** A coluna `film_id` possui uma _Primary Key_.
2. Qual coluna possui uma _Foreign Key_?
    **Resposta:** A coluna `category_id` possui uma _Foreign Key_.

---

## Exercícios propostos

1. Descubra como fazer uma pesquisa em qualquer tabela sem usar uma linha de código.
    **Resposta:** Basta clicar com botão direito na tabela e clicar em "select rows - limit 1000".

2. Descubra como é possível criar uma tabela sem usar código SQL.
    **Resposta:** Basta clicar em create table usando o botão direito.
3. Feito isso, crie a seguinte tabela com as seguintes restrições:
    **Resposta:** Basta usar o GUI do Mysql Workbench para fazer isso.


**Nome da tabela: Filme**

Colunas: 

* *FilmeId* (Primary Key, tipo int, incrementa por 1 cada vez que um valor é inserido automaticamente)
* *Descricao* (não permite nulos, tipo texto(varchar(100) ))
* *AnoLancamento* (não permite nulos, tipo int)
* *Nota* (permite nulos, tipo int)


<%= figure(%{src: "/back-end/sql/images/introductionCreateTable.png", caption: "", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>


4. Analise a tabela city e encontre a tabela à qual a coluna country_id faz referência.
    **Resposta:** Ela faz referência à tabela country.

5. Depois de encontrada, responda: qual tipo de relacionamento a tabela city faz com a tabela country?
    **Resposta:** N:1

6. Qual tipo de relacionamento a tabela country faz com a tabela city?
    **Resposta:** 1:N

7. Abra tabela por tabela do banco sakila e encontre no mínimo 3 exemplos de um relacionamento 1:N ou N:1 nesse banco de dados.
    **Resposta:** store->staff, language->film, film->language
