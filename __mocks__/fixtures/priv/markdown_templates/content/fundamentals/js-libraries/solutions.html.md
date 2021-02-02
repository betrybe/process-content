## Gabarito dos exercícios

A seguir, temos possíveis soluções para os exercícios:

1. Adicione um _framework_ ***CSS*** de sua escolha ao formulário que você construiu na última aula e o utilize para estilizar o formulário.
  * Sugestões: [Bulma](https://bulma.io/) {: .external-link target="_blank" rel="noreferrer noopener" }, [Bootstrap](https://getbootstrap.com) {: .external-link target="_blank" rel="noreferrer noopener" }, [Semantic UI](https://semantic-ui.com) {: .external-link target="_blank" rel="noreferrer noopener" } e [Materialize](https://materializecss.com) {: .external-link target="_blank" rel="noreferrer noopener" }.

2. Adicione uma biblioteca ***JavaScript*** de _date picker_ ao formulário que você construiu na última aula. Utilize essa biblioteca no campo "Data de início" do formulário. Você pode remover as validações de data que adicionou, uma vez que a biblioteca se encarregará de permitir somente datas válidas.
  * Sugestões: [DatePickerX](https://github.com/AvroraTeam/DatePickerX) {: .external-link target="_blank" rel="noreferrer noopener" } e [Pickaday](https://github.com/Pikaday/Pikaday) {: .external-link target="_blank" rel="noreferrer noopener" }.

3. Adicione uma biblioteca ***JavaScript*** de validações ao formulário que você construiu na última aula. Utilize essa biblioteca para substituir as validações que você fez manualmente.
  * Sugestões: [Just-validate](https://github.com/horprogs/Just-validate) {: .external-link target="_blank" rel="noreferrer noopener" } e [popup-validation](https://github.com/AntonLapshin/popup-validation) {: .external-link target="_blank" rel="noreferrer noopener" }

```language-html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="style.css" rel="stylesheet" type="text/css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="pikaday.css">
    <title>Formulario-curriculo</title>
  </head>
  <body>
    <header class="form-header">
      <h1>Formulário para cadastro de currículo</h1>
      <p>Preencha os campos abaixo.</p>
    </header>
    <form method="GET" action="" class="js-form">
        <fieldset class="form-group">
          <div class="mb-3">
            <label class="form-label" for="name">Nome: </label>
            <input autocomplete="off" data-validate-field="name" placeholder="Nome completo" class="form-control" type="text" name="name" id="name" maxlength="40" required>
          </div>
          <div class="mb-3">
            <label class="form-label" for="email">Endereço de e-mail: </label>
            <input autocomplete="off" data-validate-field="email" placeholder="Digite seu email" class="form-control" class="email-input" type="email" name="email" id="email" maxlength="50" required aria-describedby="emailHelp">
              <div id="emailHelp" class="form-text">Seu e-mail não será compartilhado.</div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="cpf-number">CPF: </label>
            <input autocomplete="off" data-validate-field="cpf" placeholder="000.000.000-00" class="form-control" type="text" name="cpf" id="cpf-number" maxlength="11" required required aria-describedby="cpf-info">
              <div id="cpf-info" class="form-text">Seu CPF não será compartilhado.</div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="address">Endereço: </label>
            <input autocomplete="off" data-validate-field="address" placeholder="Endereço" class="form-control" type="text" name="address" id="address" maxlength="200" required>
          </div>
          <div class="mb-3">
            <label class="form-label" for="city">Cidade: </label>
            <input autocomplete="off" data-validate-field="city" placeholder="Cidade" class="form-control" type="text" name="city" id="city" maxlength="200" required>
          </div>
          <div class="mb-3">
            <label class="form-label" for="state">Estado: </label>
            <select class="form-select" data-validate-field="state" name="state" id="state" required>
            </select>
          </div>
          <div class="form-group">
            <label for="type" class="form-label">Tipo:</label>
            <div class="form-check">
              <input class="form-check-input" data-validate-field="radio" type="radio" name="flexRadioDefault" id="casa" name="type">
              <label class="form-check-label" for="casa">
                Casa
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" data-validate-field="radio" type="radio" name="flexRadioDefault" id="apartamento" name="type" checked>
              <label class="form-check-label" for="apartamento">
                Apartamento
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset class="form-group">
          <div class="mb-3">
            <label class="form-label" for="cv-resume">Resumo do currículo: </label>
            <textarea class="form-control" data-validate-field="text" id="cv-resume" name="cv-resume" maxlength="1000" rows="3" required></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label" for="position">Cargo: </label>
            <input autocomplete="off" data-validate-field="position" class="form-control" type="text" name="position" id="position" maxlength="40" required >
          </div>
          <div class="mb-3">
            <label class="form-label" for="description">Descrição do cargo: </label>
            <input autocomplete="off" data-validate-field="description" class="form-control" type="text" id="description" name="description" required>
          </div>
          <div class="mb-3">
            <label class="form-label" for="start-date">Data de início: </label>
            <input autocomplete="off" data-validate-field="date" class="form-control" type="text" placeholder="DD/MM/AAAA" id="datepicker" name="start-date" required>
          </div>
        </fieldset>
        <button type="submit" class="btn btn-primary submit-button" type="button">Enviar</button>
        <button type="button" class="btn btn-danger clear-button">Limpar</button>
      </form>
    <section class="form-data"></section>
    <script src="moment.js"></script>
    <script src="pikaday.js"></script>
    <script src="just-validate.min.js"></script>
    <script src="script.js"></script>
  </body>
</html>
```

```language-css
// style.css

@import './node_modules/pikaday/css/pikaday.css';

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
```

```language-javascript
  // script.js

  function createStateOptions() {
  const states = document.getElementById('state');
  const stateOptions = ['Selecione seu estado', 'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
  for (let index = 0; index < stateOptions.length; index += 1) {
    const createOptions = document.createElement('option');
    states.appendChild(createOptions).innerText = stateOptions[index];
    states.appendChild(createOptions).value = stateOptions[index];
  }
}

const picker = new Pikaday({
  field: document.getElementById('datepicker'),
  format: 'D/M/YYYY',
  toString(date, format) {
    // you should do formatting based on the passed format,
    // but we will just return 'D/M/YYYY' for simplicity
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  },
  parse(dateString, format) {
    // dateString is the result of `toString` method
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
});

const clearButton = document.querySelector('.clear-button');
function clearFields() {
  const formElements = document.querySelectorAll('input');
  const textArea = document.querySelector('textarea')
  for (let index = 0; index < formElements.length; index += 1) {
    const userInput = formElements[index];
    userInput.value = '';
    textArea.value = '';
  }
}

clearButton.addEventListener('click', clearFields);

new JustValidate('.js-form', {
  rules: {
    name: {
      required: true,
      minLength: 3,
      maxLength: 40
    },
    email: {
      required: true,
      email: true,
      maxLength: 50
    },
    cpf: {
      required: true,
      maxLength: 11
    },
    address: {
      required: true,
      maxLength: 200
    },
    city: {
      required: true,
      maxLength: 28
    },
    state: {
      required: true,
    },
    radio: {
      required: true,
    },
    text: {
      required: true,
      maxLength: 1000
    },
    position: {
      required: true,
      maxLength: 40
    },
    description: {
      required: true,
      maxLength: 500
    },
    date: {
      required: true,
    }
  },
  messages: {
    name: {
      required: 'O campo de nome é obrigatório.',
      maxLength: 'O limite é de 40 caracteres.'
    },
    email: {
      required: 'O campo de email é obrigatório.',
      email: 'O email digitado não é válido.',
      maxLength: 'O limite é de 50 caracteres.'
    },
    cpf: {
      required: 'O campo de CPF é obrigatório.',
      maxLength: 'O limite é de 11 caracteres.'
    },
    address: {
      required: 'O campo endereço é obrigatório.',
      maxLength: 'O limite é de 200 caracteres.'
    },
    city: {
      required: 'O campo cidade é obrigatório.',
      maxLength: 'O limite é de 28 caracteres.'
    },
    state: {
      required: 'O campo estado é obrigatório.',
    },
    radio: {
      required: 'A escolha de um item é obrigatória.',
    },
    text: {
      required: 'Este campo é obrigatório.',
      maxLength: 'O limite é de 1000 caracteres.'
    },
    position: {
      required: 'Este campo é obrigatório.',
      maxLength: 'O limite é de 40 caracteres.'
    },
    description: {
      required: 'Este campo é obrigatório.',
      maxLength: 'O limite é de 500 caracteres.'
    },
    date: {
      required: 'Este campo é obrigatório.',
    }
  },
  submitHandler: function (form, values) {
    console.log(form, values);
  }});

window.onload = function () {
  createStateOptions();
}
```
