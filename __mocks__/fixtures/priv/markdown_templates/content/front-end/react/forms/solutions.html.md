## Enunciado do exercício

### Criando um formulário em ***React***.

Lembra do formulário que você criou na aula do dia 6.1? Vamos criar um parecido, e você verá como suas habilidades evoluíram!

* Crie um novo projeto utilizando `npx create-react-app my-form-2.0`

* Caso julgue necessário, crie estilos ***CSS*** para seu formulário, de acordo com a sua imaginação.

* Não toque no `DOM`, faça tudo utilizando as abstrações do ***React***.

Vamos criar um formulário de cadastro de currículo com base na especificação seguinte:

1. Crie um `<fieldset>` para os dados pessoais a seguir:

    * Nome - Texto

        * Limite de 40 caracteres

        * Todos os caracteres devem ser transformados para `UPPER CASE` assim que forem digitados.

        * Campo obrigatório

    * Email - Texto

        * Limite de 50 caracteres

        * Campo obrigatório

        * Bônus: Utilize [regex](https://www.regextester.com/100026) {: .external-link target="_blank" rel="noreferrer noopener" } para validar o campo email.

          * O formato esperado é: `texto@texto.texto`.

          * **Dica: Para estudar como o `regex` funciona, utilize o [link](https://regexone.com/) {: .external-link target="_blank" rel="noreferrer noopener" }.**

    * CPF - Texto

        * Limite de 11 caracteres

        * Campo obrigatório

    * Endereço - Texto

        * Limite de 200 caracteres

        * Remover qualquer caracter especial que seja digitado

        * Campo obrigatório

    * Cidade - Texto

        * Limite de 28 caracteres

        * Ao remover o foco deste campo (evento `onBlur`), verificar se o nome da cidade começa com números. Caso comece, limpar o campo.

        * Campo obrigatório.

    * Estado - ComboBox

        * Todos os estados do Brasil

        * Campo obrigatório.

    * Tipo - Radio Button

        * Casa, Apartamento

        * Campo obrigatório.

2. Crie outro `<fieldset>` para dados do seu último emprego

    * Resumo do currículo - TextArea

        * Limite de 1000 caracteres

        * Campo obrigatório.

    * Cargo - TextArea

        * Limite de 40 caracteres

        * Quando o mouse passar por cima deste campo (evento `onMouseEnter`), exibir um alerta dizendo 'Preencha com cuidado esta informação.'. Exiba essa mensagem apenas uma vez.

        * Campo obrigatório

    * Descrição do cargo - Texto

        * Limite de 500 caracteres

        * Campo obrigatório

3. Crie um botão que, ao ser clicado, monta uma `<div>` com o consolidado dos dados que foram inseridos no formulário.

4. Crie um botão `Limpar` que limpa todos os campos do formulário e a `<div>` com seu currículo também.

```js
import React, { Component } from 'react';
import './App.css';
import FormErrors from './FormErrors';

const states = ['Rio de Janeiro', 'Minas Gerais', 'Amapá', 'Amazonas', 'São Paulo', 'Ceará', 'Distrito Federal'];

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      cpf: '',
      address: '',
      city: '',
      countryState: '',
      addressType: '',
      resume: '',
      role: '',
      roleDescription: '',
      hasEntered: false,
      formErrors: {email: '', password: ''},
    };
  }

  changeHandler = event => {
    let { name, value } = event.target;

    if(name === 'name') value = value.toUpperCase()

    if(name === 'address') value = this.validateAddress(value)

    this.updateState(name, value)
  }

  onBlurHandler = event => {
    let { name, value } = event.target;

    if(name === 'city') value = value.match(/^\d/) ? '' : value

    this.updateState(name, value)
  }

  updateState(name, value) {
    this.setState((state) => ({
      [name]: value,
      formErrors: {
        ...state.formErrors,
        [name]: this.validateField(name, value)
      }
    }));
  }

  validateAddress = address => address.replace(/[^\w\s]/gi, '')

  handleSubmit = event => {
    event.preventDefault();
  }

  validateField(fieldName, value) {

    switch(fieldName) {
      case 'email':
        const isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2})$/i)
        return isValid ? '' : ' is invalid';
      default:
        break;
    }

    return '';
  }

  render () {
    return (
      <div>
        <form>
          <fieldset>
            <legend>Dados pessoais</legend>
            <div className="container">
              Nome:
              <input
                type="name"
                name="name"
                maxLength="40"
                required
                value={this.state.name}
                onChange={this.changeHandler}
              />
            </div>
            <div className="container">
              Email:
              <input
                type="email"
                name="email"
                maxLength="50"
                required
                value={this.state.email}
                onChange={this.changeHandler}
              />
            </div>
            <div className="container">
              CPF:
              <input
                type="text"
                name="cpf"
                maxLength="11"
                required
                value={this.state.cpf}
                onChange={this.changeHandler}
              />
            </div>
            <div className="container">
              Endereço:
              <input
                type="text"
                name="address"
                maxLength="200"
                required
                value={this.state.address}
                onChange={this.changeHandler}
              />
            </div>
            <div className="container">
              Cidade:
              <input
                type="text"
                name="city"
                maxLength="28"
                required
                value={this.state.city}
                onBlur={this.onBlurHandler}
                onChange={this.changeHandler}
              />
            </div>
            <div className="container">
              Estado:
              <select
                name="countryState"
                required
                value={this.state.countryState}
                onChange={this.changeHandler}
              >
                  {states.map((value, key) =>
                    <option key={key}>{value}</option>
                    )
                  }
              </select>
            </div>
          </fieldset>
          <fieldset>
            <legend>Dados profissionais:</legend>
              <div className="container">
                Resumo do currículo:
                <textarea
                  name="resume"
                  maxLength="1000"
                  required
                  value={this.state.resume}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="container">
                Cargo:
                <input
                  type="text"
                  name="role"
                  maxLength="40"
                  required
                  value={this.state.role}
                  onChange={this.changeHandler}
                  onMouseEnter={() => {
                    alert('Preencha com cuidado esta informação.');
                  }}
                />
              </div>
              <div className="container">
                Descrição do cargo:
                <textarea
                  name="roleDescription"
                  maxLength="500"
                  value={this.state.roleDescription}
                  onChange={this.changeHandler}
                />
              </div>
            </fieldset>
          </form>
        <div className="container">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
      </div>
    );
  }
}

export default App;
```

```js
import React, { Component } from 'react';

class FormErrors extends Component {
  render() {
    const { formErrors } = this.props;
    return (
      <div>
        {Object.keys(formErrors).filter((fieldName) => (
          formErrors[fieldName].length > 0
        )).map((fieldName) => (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        ))};
      </div>
    );
  }
}

export default FormErrors;
```
