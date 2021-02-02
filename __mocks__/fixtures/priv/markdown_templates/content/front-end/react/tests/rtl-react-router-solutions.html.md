## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

---

Muitas das empresas mais modernas do mundo estão sempre em busca de pessoas desenvolvedoras e uma das formas que você pode fazer para chamar a atenção delas é ter seu próprio Portfólio Web! Que tal refazer o portfólio do início do curso, agora em React e com testes?

Seu Portfólio Web deve ter as seguintes informações:

* Seu nome completo;

* Uma foto atual sua, onde o texto alternativo deve ser a descrição da foto que você está usando;

* Uma breve descrição sobre você, destacando algumas informações como nacionalidade e a cidade/estado onde mora;

* Uma lista de habilidades que você possui e destacar a que você mais se orgulha;

* Um link externo para o seu github, que abra em uma nova aba;

* Um índice com links internos para as diferentes seções do seu portfólio, agora separadas por páginas, utilizando _React Router_;

* Um formulário com campo de e-mail e mensagem para que as pessoas possam entrar em contato com você (utilize [EmailJS](https://www.emailjs.com/docs/introduction/how-does-emailjs-work/) {: .external-link target="_blank" rel="noreferrer noopener" });

* Testes com a React Testing Library, incluindo o uso de *mocks* para o envio de e-mail, testes de rotas e de formulários.

<%= figure(%{src: "/front-end/react/tests/portfolio-solution.gif", caption: "Portfólio", width: "100%", heigh: "auto"}) %>

<%= figure(%{src: "/front-end/react/tests/portfolio-tests.png", caption: "Testes"}) %>

Os pacotes instalados foram:

  * react-router-dom, emailjs-com, prop-types, react-app-env.

`src/images/github.svg`
<%= figure(%{src: "/front-end/react/tests/github.svg", caption: "GitHub Icon", width: "25px", heigh: "auto"}) %>

`src/images/profile-picture.png`
<%= figure(%{src: "/front-end/react/tests/profile-picture.png", caption: "Profile Picture", width: "200px", heigh: "auto"}) %>

`development.env.example`

```language-bash
EMAIL_JS_ID=user_eXAmpLe
EMAIL_JS_SERVICE=gmail
EMAIL_JS_TEMPLATE=template_example
```

`test.env`

```language-bash
EMAIL_JS_ID=user_tEStkEy
EMAIL_JS_SERVICE=gmail
EMAIL_JS_TEMPLATE=template_example
```

`src/index.css`

```language-css
body {
  margin: 0;
  font-family: sans-serif;
}

section, aside {
  padding: 30px;
}
```

`src/index.js`

```language-react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

`src/App.js`

```language-jsx
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { AboutMe, ContactForm, Projects } from './components';

import './App.css';

const NavBar = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to="/">Sobre mim</Link>
        </li>
        <li>
          <Link to="/projects">Projetos</Link>
        </li>
        <li>
          <Link to="/contact">Entre em contato</Link>
        </li>
      </ul>
    </nav>
  </header>
);

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <AboutMe />
    </Route>

    <Route path="/contact">
      <ContactForm />
    </Route>

    <Route path="/projects">
      <Projects />
    </Route>

    <Route>
      <section>
        <h1>Página não encontrada</h1>
      </section>
    </Route>
  </Switch>
);

const App = () => (
  <div>
    <NavBar />
    <Routes />
  </div>
);

export default App;
```

`src/App.css`

```language-css
header {
  background-color: #272121;
  height: 70px;
  width: 100%;
}

nav ul {
  display: flex;
  font-size: 20px;
  justify-content: center;
  list-style-type: none;
  margin: 0px;
}

nav ul li {
  margin: 20px;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}
```

`src/components/index.jsx`

```language-jsx
export { default as AboutMe } from './AboutMe';
export { default as ContactForm } from './ContactForm';
export { default as Projects } from './Projects';
```

`src/components/AboutMe.jsx`

```language-jsx
import React from 'react';

import PersonalInfo from './PersonalInfo';
import Skills from './Skills';

import './AboutMe.css';

class AboutMe extends React.Component {
  render() {
    return (
      <section id="about-me">
        <PersonalInfo />
        <Skills />
      </section>
    );
  }
}

export default AboutMe;
```

`src/components/AboutMe.css`

```language-css
#about-me {
  display: flex;
}
```

`src/components/PersonalInfo.jsx`

```language-jsx
import React from 'react';

import profileImg from '../images/profile-picture.png';
import githubIcon from '../images/github.svg';

import './PersonalInfo.css';

const PersonalInfo = () => (
  <aside id="personal-info">
    <img src={profileImg} alt="Minha Foto" width="200px" />
    <h2>Nome Completo</h2>
    <p>Rua da Minha Casa, N, Centro - Belo Horizonte - MG</p>
    <p>(31) 98765-4321</p>
    <p>nome.completo@email.com</p>
    <p>
      <a href="https://github.com/nome.completo" target="_blank" rel="noopener noreferrer">
        <img src={githubIcon} alt="GitHub" width="25px" />
      </a>
    </p>
  </aside>
);

export default PersonalInfo;
```

`src/components/PersonalInfo.css`

```language-css
#personal-info {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 40%;
}

#personal-info img {
  border-radius: 100%;
}

#personal-info p {
  margin: 5px;
}
```

`src/components/Skills.jsx`

```language-react
import React from 'react';

import './Skills.css';

const Skills = () => (
  <section id="skills">
    <h3>Habilidade 1</h3>
    <div className="progress">
      <div className="step complete">Básico</div>
      <div className="step complete">Intermediário</div>
      <div className="step complete">Avançado</div>
    </div>

    <h3>Habilidade 2</h3>
    <div className="progress">
      <div className="step complete">Básico</div>
      <div className="step complete">Intermediário</div>
      <div className="step">Avançado</div>
    </div>

    <h3>Habilidade 3</h3>
    <div className="progress">
      <div className="step complete">Básico</div>
      <div className="step ">Intermediário</div>
      <div className="step">Avançado</div>
    </div>

    <h3>Habilidade 4</h3>
    <div className="progress">
      <div className="step complete">Básico</div>
      <div className="step complete">Intermediário</div>
      <div className="step complete">Avançado</div>
    </div>

    <h3>Habilidade 5</h3>
    <div className="progress">
      <div className="step complete">Básico</div>
      <div className="step complete">Intermediário</div>
      <div className="step">Avançado</div>
    </div>
  </section>
);

export default Skills;
```

`src/components/Skills.css`

```language-css
#skills .progress {
  background: #DDD;
  border: 1px solid black;
  border-radius: 4px;
  display: flex;
  height: 25px;
  width: 600px;
}

#skills .progress .step {
  align-items: center;
  display: flex;
  flex-grow: 1;
  font-weight: bold;
  justify-content: center;
}

#skills .progress .step:not(:last-child) {
  border-right: 1px solid black;
}

#skills .progress .step.complete {
  background: #FF4D00;
  color: white;
}
```

`src/components/Projects.jsx`

```language-jsx
import React from 'react';

import './Projects.css';

const Projects = () => (
  <section id="projects">
    <ul>
      <li>
        <img src="https://picsum.photos/id/1/100/100" alt="Imagem do Projeto 1" />
        <h3>Projeto 1</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </li>
      <li>
        <img src="https://picsum.photos/id/2/100/100" alt="Imagem do Projeto 2" />
        <h3>Projeto 2</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </li>
      <li>
        <img src="https://picsum.photos/id/3/100/100" alt="Imagem do Projeto 3" />
        <h3>Projeto 3</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </li>
    </ul>
  </section>
);

export default Projects;
```

`src/components/Projects.css`

```language-css
#projects {
  display: flex;
  justify-content: center;
}

#projects ul {
  list-style-type: none;
  max-width: 1000px;
}

#projects li {
  padding: 10px;
}

#projects li:hover {
  background: #DDD;
  cursor: pointer;
}

#projects li img {
  float: left;
  margin-right: 15px;
}

#projects li p {
  font-family: serif;
  font-size: 12px;
}
```

`src/components/ContactForm.jsx`

```language-jsx
import React from 'react';
import * as emailjs from 'emailjs-com';

import FormErrors from './FormErrors';

import './ContactForm.css';

class ContactForm extends React.Component {
  static validateField(field, value) {
    switch (field) {
      case 'name':
        return ContactForm.validatePresence('Nome', value);
      case 'message':
        return ContactForm.validatePresence('Mensagem de contato', value);
      case 'email': {
        const isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2})$/i);
        return isValid ? '' : 'E-mail inválido.';
      }
      default:
        return '';
    }
  }

  static validatePresence(fieldName, value) {
    return value.trim() ? '' : `O campo "${fieldName}" é obrigatório.`;
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      formErrors: { name: '', email: '', message: '' },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.validateForm()) return;

    const { name, email, message } = this.state;
    this.sendEmail({ message_html: message, from_name: name, reply_to: email });
  }

  validateForm() {
    let isValid = true;
    const errors = {};
    const { state } = this;

    Object.keys(state.formErrors).forEach((field) => {
      const errorMessage = ContactForm.validateField(field, state[field]);
      errors[field] = errorMessage;

      if (errorMessage) isValid = false;
    });

    this.setState({ formErrors: errors });

    return isValid;
  }

  sendEmail(data) {
    const {
      REACT_APP_EMAIL_JS_ID,
      REACT_APP_EMAIL_JS_SERVICE,
      REACT_APP_EMAIL_JS_TEMPLATE,
    } = process.env;

    emailjs
      .send(REACT_APP_EMAIL_JS_SERVICE, REACT_APP_EMAIL_JS_TEMPLATE, data, REACT_APP_EMAIL_JS_ID)
      .then(() => this.setState({ name: '', email: '', message: '' }))
      .catch(() => this.setState((previousState) => ({
        formErrors: {
          ...previousState.formErrors,
          unexpected: 'Ocorreu um erro durante o envio. Tente novamente.',
        },
      })));
  }

  render() {
    const {
      name, email, message, formErrors,
    } = this.state;

    return (
      <section id="contact">
        <h1>Entre em contato</h1>

        <FormErrors formErrors={formErrors} />

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={this.handleInputChange}
          />

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={this.handleInputChange}
          />

          <label htmlFor="message">Mensagem de contato</label>
          <textarea
            id="message"
            name="message"
            rows="10"
            value={message}
            onChange={this.handleInputChange}
          />

          <input type="submit" value="Enviar" />
        </form>
      </section>
    );
  }
}

export default ContactForm;
```

`src/components/ContactForm.css`

```language-css
#contact {
  margin: auto;
  width: 50%;
}

#contact form {
  display: flex;
  flex-direction: column;
}

#contact form label {
  font-weight: bold;
  margin: 10px 0;
}

#contact form input[type=submit] {
  background-color: #007BFF;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 1em;
  line-height: 1.5;
  margin: 10px 0;
  padding: 6px 12px;
  text-align: center;
  width: 20%;
}

#contact form input[type=submit]:disabled {
  background-color: #DDD;
  cursor: auto;
}
```

`src/components/FormErrors.jsx`

```language-jsx
import React from 'react';
import PropTypes from 'prop-types';

import './FormErrors.css';

const FormErrors = ({ formErrors }) => (
  <section id="form-errors">
    {Object.keys(formErrors).filter((fieldName) => (
      formErrors[fieldName].length > 0
    )).map((fieldName) => (
      <p className="error-message" key={fieldName}>{formErrors[fieldName]}</p>
    ))}
  </section>
);

FormErrors.propTypes = {
  formErrors: PropTypes.exact({
    name: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
    unexpected: PropTypes.string,
  }).isRequired,
};

export default FormErrors;
```

`src/components/FormErrors.css`

```language-css
#form-errors {
  padding: 0;
}

#form-errors .error-message {
  background-color: #F2DEDE;
  border: 1px solid #EBCCD1;
  color: #A94442;
  padding: 6px 12px;
}
```

`src/App.test.js`

```language-jsx
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import App from './App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('routes', () => {
  test('navigating from home to projects', () => {
    const { getByText } = renderWithRouter(<App />);

    const personalInfo = getByText(/Nome Completo/i);
    expect(personalInfo).toBeInTheDocument();

    fireEvent.click(getByText(/Projetos/i));

    const project = getByText(/Projeto 1/i);
    expect(project).toBeInTheDocument();
  });

  test('navigating from home to getInTouch', () => {
    const { getByText } = renderWithRouter(<App />);

    const personalInfo = getByText(/Nome Completo/i);
    expect(personalInfo).toBeInTheDocument();

    fireEvent.click(getByText(/Entre em contato/i));

    const getInTouch = getByText(/Mensagem de contato/i);
    expect(getInTouch).toBeInTheDocument();
  });

  test('landing on a bad page shows error 404', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/some/bad/route' });

    const pageNotFound = getByText(/Página não encontrada/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
```

`src/components/ContactForm.test.js`

```language-jsx
import React from 'react';
import * as emailjs from 'emailjs-com';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ContactForm from './ContactForm';

jest.mock('emailjs-com', () => ({
  send: jest.fn(() => Promise.resolve())}));

afterEach(() => jest.clearAllMocks());

describe('when the form is filled out correctly', () => {
  test('sends the email', async () => {
    const testData = { from_name: 'foo', reply_to: 'foo@email.com', message_html: 'bar' };
    const { container, findByLabelText, findByText } = render(<ContactForm />);
    const nameField = await findByLabelText(/Nome/i);
    const emailField = await findByLabelText(/E-mail/i);
    const messageField = await findByLabelText(/Mensagem de contato/i);

    fireEvent.change(nameField, { target: { value: testData.from_name } });
    fireEvent.change(emailField, { target: { value: testData.reply_to } });
    fireEvent.change(messageField, { target: { value: testData.message_html } });

    expect(nameField.value).toEqual(testData.from_name);
    expect(emailField.value).toEqual(testData.reply_to);
    expect(messageField.value).toEqual(testData.message_html);

    fireEvent.click(await findByText(/Enviar/i));

    expect(await emailjs.send)
      .toHaveBeenCalledWith('gmail', 'template_example', testData, 'user_tEStkEy');

    expect(container.querySelector('.error-message')).toBeNull();

    expect(nameField.value).toEqual('');
    expect(emailField.value).toEqual('');
    expect(messageField.value).toEqual('');
  });
});

describe('when the form has fields with errors', () => {
  test('shows error messages', async () => {
    const { findByText } = render(<ContactForm />);

    fireEvent.click(await findByText(/Enviar/i));

    expect(await emailjs.send).not.toHaveBeenCalled();

    expect(await findByText(/O campo "Nome" é obrigatório./i)).toBeInTheDocument();
    expect(await findByText(/E-mail inválido./i)).toBeInTheDocument();
    expect(await findByText(/O campo "Mensagem de contato" é obrigatório./i)).toBeInTheDocument();
  });
});

describe('when the emailjs send returns an error', () => {
  test('shows error message and keep fields values', async () => {
    emailjs.send.mockImplementation(() => Promise.reject());

    const testData = { from_name: 'foo', reply_to: 'foo@email.com', message_html: 'bar' };
    const { findByLabelText, findByText } = render(<ContactForm />);
    const nameField = await findByLabelText(/Nome/i);
    const emailField = await findByLabelText(/E-mail/i);
    const messageField = await findByLabelText(/Mensagem de contato/i);

    fireEvent.change(nameField, { target: { value: testData.from_name } });
    fireEvent.change(emailField, { target: { value: testData.reply_to } });
    fireEvent.change(messageField, { target: { value: testData.message_html } });

    fireEvent.click(await findByText(/Enviar/i));

    expect(await emailjs.send)
      .toHaveBeenCalledWith('gmail', 'template_example', testData, 'user_tEStkEy');

    expect(await findByText(/Ocorreu um erro durante o envio. Tente novamente./i))
      .toBeInTheDocument();

    expect(nameField.value).toEqual(testData.from_name);
    expect(emailField.value).toEqual(testData.reply_to);
    expect(messageField.value).toEqual(testData.message_html);
  });
});
```
