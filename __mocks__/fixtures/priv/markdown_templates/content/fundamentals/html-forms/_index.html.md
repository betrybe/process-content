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

<%= vimeo "476922702" %>

### Parte II - input tag, types e attributes

Agora veremos esse vídeo com os principais campos de entrada e exibição de texto de um formulário.

<%= vimeo "476939805" %>

Você observou no vídeo que temos uma grande quantidade de `types` e atributos para o `<input>` para usar em formulários.

Neste momento, não há necessidade de gravar todas as informações, no entanto é importante que você extraia o conceito e consulte sempre as referências nos recursos adicionais.

De modo geral, estes são os `types` que podem ser usados de acordo com a aplicação do campo input:

* `button`: define um botão;
* `checkbox`: permite que o usuário selecione ZERO ou MAIS opções de um número limitado de escolhas;
* `color`: campos de entrada que devem conter uma cor para selecionar;
* `date`: campos de entrada que devem conter uma data;
* `datetime-local`: campo de entrada de data e hora, sem fuso horário;
* `email`: campos de entrada que devem conter um endereço de e-mail;
* `file`: campo de seleção de arquivo e um botão "Procurar" para uploads de arquivos;
* `month`: permite ao usuário selecionar um mês e ano;
* `number`: define um campo de entrada numérico;
* `password`: os caracteres do campo de senha são mascarados (mostrados como asteriscos ou círculos);
* `radio`: permite que um usuário selecione **APENAS UMA** de um número limitado de opções;
* `range`: define um controle para inserir um número (como um controle deslizante). Intervalo padrão é de 0 a 100;
* `reset`: redefinirá todos os valores do formulário para seus valores padrão;
* `search`: usado para campos de pesquisa;
* `submit`: envia dados de formulário a um manipulador de formulários(especificado na`action` do `form`);
* `tel`: campos de entrada que devem conter um número de telefone;
* `text`: campo de entrada de texto de linha única;
* `time`: permite que o usuário selecione um horário (sem fuso horário);
* `url`: campos de entrada que devem conter um endereço URL;
* `week`: permite ao usuário selecionar uma semana e um ano.

O valor default de um `type`, sempre será `text`. Portanto, é preciso especificar de acordo com a sua necessidade.

Como complemento, temos os atributos que são propriedades inseridas para seus input `HTML`. Com elas você poderá adicionar funcionalidades ao seus formulário. Temos os seguintes atributos abaixos:

* `value`: especifica um valor inicial para um campo de entrada;
* `readonly`: especifica que um campo de entrada é somente leitura;
* `disabled`: especifica que um campo de entrada deve ser desativado;
* `size`: especifica a largura visível, em caracteres, de um campo de entrada;
* `maxlength`: especifica o número máximo de caracteres permitidos em um campo de entrada;
* `min` e `max`: especificam os valores mínimo e máximo para um campo de entrada;
* `multiple`: especifica que o usuário tem permissão para inserir mais de um valor em um campo de entrada;
* `pattern`: especifica uma expressão regular em relação à qual o valor do campo de entrada é verificado;
* `placeholder`: especifica uma dica curta que descreve o valor esperado de um campo de entrada;
* `required`: especifica que um campo de entrada deve ser preenchido antes de enviar o formulário;
* `step`: especifica os intervalos de números válidos para um campo de entrada;
* `autofocus`: especifica que um campo de entrada deve obter foco automaticamente quando a página é carregada;
* `height` e `width`: especificam a altura e a largura de um elemento;
* `autocomplete`: especifica se um campo de entrada deve ter o preenchimento automático ativado ou desativado.

Vamos praticar um pouco, criando uma tela de login? 🔥

1. Adicione os campos de entrada para email e senha.

2. Adicione um checkbox com o texto _Lembre-me_.

3. Adicione um botão com o texto _Entrar_.

4. Adicione os placeholder _Digite seu email_ e _Digite sua senha_ para os campos de email e senha.

5. Adicione o atributo `required` para os campos de email e senha.

6. Adicione o atributo `autocomplete="off"` para o campo de email.

7. Adicione o atributo `autofocus` para o campo de email.

---

### Parte III - Criando um formulário completo

Na parte final, você verá um vídeo ensinando a criar um formulário completo.

<%= vimeo "476951248" %>

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

* [Referência para Input Types HTML](https://www.w3schools.com/html/html_form_input_types.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Referência para Atributos HTML](https://www.w3schools.com/html/html_form_attributes.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

No próximo passo, você irá aprender como deixar suas páginas melhores com as famosas `libs`.

<%= next_button(@conn) %>
