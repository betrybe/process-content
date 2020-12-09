## O que vamos aprender?

Na aula de hoje, vamos aprender sobre formulários em ***HTML***, que são uma forma de enviar informações para outra página do seu site ou para um servidor.

---

### Você será capaz de:

* Criar formulários em ***HTML*** com as `tags`: `input`, `button`, `textarea`, `select`, `form`.

---

## Por que isso é importante?

Quantas vezes você já se deparou com um formulário de cadastro, uma página de login, ou até mesmo precisou enviar um arquivo para o servidor? Isso é bem comum, não é mesmo? A tag `<form>` do ***HTML***, juntamente com seus elementos, te permite criar todos esses tipos de interação com o usuário.

Após o curso da Trybe, no seu dia a dia de trabalho, será comum encontrar tarefas que, no fim das contas, são de criação de formulário. Por isso, é importante entender como um formulário funciona.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

Agora vamos ver como criar formulários em ***HTML***, **are you ready**?

---

### Parte I - Introdução

Neste vídeo, você vai aprender o que é um formulário.
Não se preocupe com a parte sobre requisições `GET` e `POST`, que são brevemente abordadas no vídeo. Esse conteúdo será visto mais à frente em nosso curso.

<%= youtube_video "uVmQDw115pg" %>

### Parte II - input tag, types e attributes

Agora veremos essa playlist com os principais campos de entrada e exibição de texto de um formulário.

<%= youtube_playlist "PLP6Z8YhN_d5Qgk5QHCC5G3SQHiFFhneMl" %>

**Importante: Para os próximos dois links, não há a necessidade de ler e anotar tudo de uma vez só. Você pode pegar a ideia geral do texto e voltar a essas referências quando quiser.**

[Aqui você verá mais informações sobre os diferentes tipos de `<input>` de um formulário](https://www.w3schools.com/html/html_form_input_types.asp) {: .external-link target="_blank" rel="noreferrer noopener" }.

[Outra referência importante é a dos atributos possíveis de um formulário](https://www.w3schools.com/html/html_form_attributes.asp) {: .external-link target="_blank" rel="noreferrer noopener" }.

Vamos praticar um pouco? 🔥

* [Exercício de input type 1](https://www.w3schools.com/html/exercise.asp?filename=exercise_html_form_input_types1) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Exercício de input type 2](https://www.w3schools.com/html/exercise.asp?filename=exercise_html_form_input_types2) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Exercício de input type 3](https://www.w3schools.com/html/exercise.asp?filename=exercise_html_form_input_types3) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Exercício de input type 4](https://www.w3schools.com/html/exercise.asp?filename=exercise_html_form_input_types4) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Exercício de input type 5](https://www.w3schools.com/html/exercise.asp?filename=exercise_html_form_input_types5) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Exercício de atributos 1](https://www.w3schools.com/html/exercise.asp?filename=exercise_html_form_attributes1) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Exercício de atributos 2](https://www.w3schools.com/html/exercise.asp?filename=exercise_html_form_attributes2) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Exercício de atributos 3](https://www.w3schools.com/html/exercise.asp?filename=exercise_html_form_attributes3) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Exercício de atributos 4](https://www.w3schools.com/html/exercise.asp?filename=exercise_html_form_attributes4) {: .external-link target="_blank" rel="noreferrer noopener" }

---

### Parte III - Criando um formulário completo

Na parte final, você verá um vídeo ensinando a criar um formulário completo.

<%= youtube_video "vJoCnzEucCc" %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já aprendeu sobre formulários em ***HTML***, é hora de praticarmos juntos!

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

Agora que você já sabe como criar um formulário, é hora de colocar a mão na massa! 👩‍💻

<%= versioning_your_code(@conn) %>

### Criando um formulário de currículo.

* Crie um arquivo ***HTML*** chamado `form.html` para o formulário.

* Caso julgue necessário, crie estilos ***CSS*** para o seu formulário, de acordo com a sua imaginação. Coloque-os em um arquivo `styles.css`.

* Crie também um arquivo `script.js` para seu código ***JavaScript***.

Vamos criar um formulário de cadastro de currículo com base na especificação a seguir:

1. Crie um `<fieldset>` para os seguintes dados pessoais:

    * Nome - Texto

        * Limite de 40 caracteres

        * Campo obrigatório

    * Email - Texto

        * Limite de 50 caracteres

        * Campo obrigatório

    * CPF - Texto

        * Limite de 11 caracteres

        * Campo obrigatório

    * Endereço - Texto

        * Limite de 200 caracteres

        * Campo obrigatório

    * Cidade - Texto

        * Limite de 28 caracteres

        * Campo obrigatório

    * Estado - ComboBox

        * Todos os estados do Brasil

        * Utilize estruturas de repetição via ***JavaScript*** para gerar os `<option>`

        * Campo obrigatório

    * Tipo - Radio Button

        * Casa, Apartamento

        * Campo obrigatório

2. Crie outro `<fieldset>` para dados do seu último emprego

    * Resumo do currículo - TextArea

        * Limite de 1000 caracteres

        * Campo obrigatório

    * Cargo - Texto

        * Limite de 40 caracteres

        * Campo obrigatório

    * Descrição do cargo - Texto

        * Limite de 500 caracteres

        * Campo obrigatório

    * Data de início - Texto

        * Verificar o formato da data `dd/mm/aaaa`.

        * O dia deve ser > 0 e <= 31.

        * O mês deve ser > 0 e <= 12.

        * O ano não pode ser negativo.

        * Caso alguma das condições for inválida no momento do envio do formulário, exibir mensagem de erro contextualizada.

        * Campo obrigatório

3. Logo abaixo do formulário, crie um botão que:

    * Chame uma função ***JavaScript*** e interrompa o fluxo automático do form utilizando o [preventDefault()](https://developer.mozilla.org/pt-BR/docs/Web/API/Event/preventDefault) {: .external-link target="_blank" rel="noreferrer noopener" }.

    * Execute as validações que foram pedidas ao longo da montagem do formulário.

    * Monte uma `<div>` com o consolidado dos dados que foram inseridos no formulário.

4. Crie um botão `Limpar` que limpa todos os campos do formulário e a `<div>` com seu currículo também.

---

## Recursos adicionais (opcional)

* [Como criar um formulário de registro?](https://www.w3schools.com/howto/howto_css_register_form.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Guia para ***HTML*** forms](https://www.freecodecamp.org/news/a-step-by-step-guide-to-getting-started-with-html-forms-7f77ae4522b5/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

No próximo passo, você irá aprender como deixar suas páginas melhores com as famosas `libs`.

<%= next_button(@conn) %>
