## O que vamos aprender?

Bem-vindo de volta! Hoje você vai aprender a utilizar os diferentes tipos de `JOIN` para juntar dados relacionados em um banco de dados. Similarmente, vai entender como unir resultados de duas ou mais *queries* em apenas uma, através do `UNION`.

---

### Você será capaz de:

* Utilizar `INNER JOIN` para combinar dados de duas ou mais tabelas
* Utilizar `LEFT JOIN` e `RIGHT JOIN` para combinar dados de duas ou mais tabelas
* Utilizar `SELF JOIN` para fazer join de uma tabela com ela própria
* Unir resultados com `UNION` e `UNION ALL`

---

## Por que isso é importante?

A ideia do `JOIN` é permitir combinar registros de duas ou mais tabelas, através do relacionamento que uma tabela tem com a outra. Já o `UNION` permite acrescentar os resultados de uma *query* à outra.

Todas essas funcionalidades podem ser usadas para diferentes propósitos no seu dia a dia de trabalho, como a criação de relatórios, de novas maneiras de exibir uma informação já cadastrada em uma tabela e adicionar detalhes a tabelas existentes, entre outras possibilidades.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### O que é um `JOIN` ou `LEFT JOIN`?

Até o momento, você já criou consultas para filtrar, ordenar, selecionar, alterar, agrupar, inserir e apagar dados armazenados nas tabelas dos seus bancos de dados. Cada consulta, no entanto, sempre acessava apenas uma tabela.

Em alguns casos, uma tabela pode não possuir toda a informação necessária. Em função disso, existe a opção de usar os diversos tipos de `JOIN` para combinar em um mesmo resultado registros de duas ou mais tabelas. Esses tipos são: `INNER JOIN`, `LEFT JOIN` e `RIGHT JOIN`, para combinar duas ou mais tabelas, e `SELF JOIN`, quando uma tabela precisa ser combinada consigo mesma. Você verá detalhes de cada um desses tipos de `JOIN` a seguir.

<%= figure(%{src: "https:\/\/media.giphy.com/media/MTdHOLBVYpVOLY4gRN/giphy.gif", caption: "O que o banco pensa quando você diz \`JOIN\`", class: "text-center rounded mx-auto d-block", width: "588px", height: "auto"}) %>
