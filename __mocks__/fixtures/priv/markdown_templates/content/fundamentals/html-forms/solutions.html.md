## Gabarito dos exercícios

A seguir, temos possíveis soluções para os exercícios:

### Exercícios

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

```language-html
<!--index.html-->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario-curriculo</title>
    <link href="style.css" rel="stylesheet" type="text/css">
  </head>
  <body>
    <header class="form-header">
      <h1>Formulário para cadastro de currículo</h1>
      <p>Preencha os campos abaixo.</p>
    </header>
    <form id="cv-form">
      <div class="form-row">
        <fieldset>
          <div class="line-content">
            <label for="name">Nome: </label>
            <input type="text" name="name" id="name" maxlength="40" required>
          </div>
          <div class="line-content">
            <label for="email">Endereço de e-mail: </label>
            <input class="email-input" type="email" name="email" id="email" maxlength="50" required>
          </div>
          <div class="line-content">
            <label for="cpf-number">CPF: </label>
            <input type="text" name="cpf" id="cpf-number" maxlength="11" required>
          </div>
          <div class="line-content">
            <label for="address">Endereço: </label>
            <input type="text" name="address" id="address" maxlength="200" required>
          </div>
          <div class="line-content">
            <label for="city">Cidade: </label>
            <input type="text" name="city" id="city" maxlength="200" required>
          </div>
          <div class="line-content">
            <label for="state">Estado: </label>
            <select name="state" id="state" value = "" required>
            </select>
          </div>
          <div class="line-content">
            <label for="house-apartment">Tipo de imóvel: </label>
            <input type="radio" name="house-apartment" id="house" value="house" required> <span>Casa</span>
            <input type="radio" name="house-apartment" id="apartment" value="apartment" required > <span>Apartamento</span>
          </div>
        </fieldset>
        <fieldset>
          <div class="line-content">
            <label for="cv-resume">Resumo do currículo: </label>
            <textarea id="cv-resume" name="cv-resume" maxlength="1000" cols="100" rows="20" required></textarea>
          </div>
          <div class="line-content">
            <label for="position">Cargo: </label>
            <input type="text" name="position" id="position" maxlength="40" required >
          </div>
          <div class="line-content">
            <label for="description">Descrição do cargo: </label>
            <input type="text" id="description" name="description" required>
          </div>
          <div class="line-content">
            <label for="start-date">Data de início: </label>
            <input type="text" class="input-data" name="start-date" value="" required>
          </div>
        </fieldset>
        <button class="submit-button" type="button">Enviar</button>
        <button class="clear-button" type="button">Limpar</button>
      </div>
      </form>
    <section class="form-data"></section>
    <script src="script.js"></script>
  </body>
</html>
```

```language-javascript
// style.css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  color: rgb(93, 96, 99);
  line-height: 1.3;
  font-size: 16px;
  font-family: 'Helvetica', 'Arial', 'Sans-serif';
}

.form-header {
  text-align: center;
  background-color: rgb(246, 247, 248);
  border: 1px solid rgb(214, 217, 220);
  border-radius: 3px;
  width: 80%;
  margin: 40px 0;
  padding: 50px;
  margin-right: auto;
  margin-left: auto;
}

.line-content {
margin: 12px;
}

.button {
width: 200px;
text-align: center;
}
```

```language-javascript
// script.js
const states = document.getElementById('state');
function createStateOptions() {
  const stateOptions = ['Selecione seu estado', 'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
  let value = 1;
  for (let index = 0; index < stateOptions.length; index += 1) {
    const createOptions = document.createElement('option');
    states.appendChild(createOptions).innerText = stateOptions[index];
    states.appendChild(createOptions).value = stateOptions[index];
  }
}

function validateData(data) {
  if (data.indexOf('/') === 2 || data.indexOf('/') === 5) {
    const day = data.substr(0, 2);
    const month = data.substr(3, 2);
    const year = data.substr(6, 4);
    if ((day > 0 && day < 31) && (month > 0 && month <= 12) && (year > 0 && year.length === 4)) {
      return true;
    }
  }
  return false;
}

function checkData() {
  const inputData = document.querySelector('.input-data');
  let data = inputData.value;
  const userData = validateData(data);
  if (!userData && data.length) {
    inputData.value = '';
    alert('data invalida');
    return false;
  }
  return userData;
}

function checkEmail() {
  const email = document.querySelector('.email-input');
  let insertedEmail = email.value;
  const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(insertedEmail);
  if (!emailFormat && insertedEmail.length) {
    email.value = '';
    alert('email inválido');
    return false;
  }
  return emailFormat
}

function renderCurriculum(event) {
  event.preventDefault();
  const formElements = document.querySelectorAll('input');
  for (let index = 0; index < formElements.length; index += 1) {
    if (formElements[index].type === 'radio' && !formElements[index].checked) {
      continue;
    }
    const userInput = formElements[index].value;
    const dataUser = document.querySelector('.form-data');
    if (checkEmail() && checkData()) {
      const div = document.createElement('div');
      div.className = 'div-curriculum';
      div.innerHTML = userInput;
      dataUser.appendChild(div);
    }
  }
}

const clearButton = document.querySelector('.clear-button');
function clearFields() {
  const formElements = document.querySelectorAll('input');
  const textArea = document.querySelector('textarea')
  const div = document.querySelectorAll('.div-curriculum');
  for (let index = 0; index < formElements.length && index < div.length; index += 1) {
    const userInput = formElements[index];
    userInput.value = '';
    textArea.value = '';
    div[index].innerText = '';
  }
}

const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', renderCurriculum);
clearButton.addEventListener('click', clearFields);

window.onload = function () {
  createStateOptions();
}
```
