## O que vamos aprender?

Testes automatizados são parte fundamental de qualquer software de qualidade, e com React não é diferente. Sendo React uma biblioteca recente, a melhor forma de se escrever testes automatizados para ele não é um assunto dado como encerrado, ainda que o _runner_ mais usado e recomendado seja o Jest. A biblioteca de testes para React com [maior adoção](https://www.npmtrends.com/react-testing-library-vs-enzyme) {: .external-link target="_blank" rel="noreferrer noopener" } é a [_enzyme_](https://github.com/airbnb/enzyme) {: .external-link target="_blank" rel="noreferrer noopener" }, desenvolvida pela Airbnb. A biblioteca [recomendada pela documentação](https://reactjs.org/docs/testing.html) {: .external-link target="_blank" rel="noreferrer noopener" }, por outro lado, é a [react-testing-library](https://github.com/testing-library/react-testing-library) {: .external-link target="_blank" rel="noreferrer noopener" }, desenvolvida por Kent C. Dodds. Por razões que ficarão claras ao longo do dia de hoje, nós aprenderemos a usar a `react-testing-library`, mas desde já mantenha a `enzyme` no seu radar, pois você pode trombar com ela no futuro!

Assim sendo, hoje você vai aprender a **escrever testes automatizados em React**! Vai aprender a usar as ferramentas que a `react-testing-library` oferece para testar componentes e comportamentos inteiros, simulando a ocorrência de eventos e lidando com lógica assíncrona.

Tudo isso, naturalmente, virá acompanhado de uma discussão acerca do que são boas práticas de teste e quais são os _tradeoffs_ de diferentes abordagens de teste.

Bora?!

<%= vimeo "465703103" %>

---

### Você será capaz de:

- Utilizar os seletores (queries) da React-Testing-Library em testes automatizados;

- Simular eventos com a React-Testing-Library em testes automatizados;

- Testar fluxos lógicos assíncronos com a React-Testing-Library;

- Escrever testes que permitam a refatoração da estrutura dos componentes da aplicação sem necessidade de serem alterados.

---

## Por que isso é importante?

A vantagem de testes automatizados é evidente. Em React não é diferente, então é muito importante ser capaz de escrever bons testes automatizados para ele. A biblioteca `react-testing-library` tem as seguintes vantagens quando comparada com a `enzyme`, a opção de maior adoção no mercado:

- É muito mais simples de usar;

- Tem muitos menos _caveats_, ou seja, situações que podem causar probleminhas e dores de cabeça inesperadas;

- Reforça o bom uso das melhores práticas de testes ao incentivar e facilitar o teste de **comportamentos** e não de **implementação**;

- Permitir a refatoração da sua arquitetura de componentes - com Enzyme qualquer mudança nela quebra parte dos testes.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

Antes de mais nada, vamos ler um artigo provocativo. O convite é não pensar nos testes em termos de _quais funções testar_, mas em termos de _quais casos de uso_ testar.

E o que são **casos de uso**, você pergunta? Citando o dicionário de Oxford (tradução livre):

> Uma situação específica em que um produto ou serviço pode, potencialmente, ser usado.

Pense nos projetos anteriores do curso. Por exemplo:

- No e-commerce, uma pessoa pode filtrar por uma categoria, adicionar um produto ao carrinho e finalizar a compra. Isso é um caso de uso;

- A pessoa pode, por outro lado, não filtrar por categoria alguma, adicionar vários produtos ao carrinho de uma vez e não finalizar a compra. Isso é outro caso de uso.

- Numa todo list, adicionar uma tarefa nova é um caso de uso.

- Deletar uma tarefa é um caso de uso.

- Marcar uma tarefa é um caso de uso.

- Desmarcar uma tarefa é um caso de uso.

Está ficando mais evidente? Vamos entender se há ferramentas que podem nos auxiliar.

##### Cobertura de Código e Cobertura com Testes Automatizados

O principal objetivo da **Cobertura de Código** (_code coverage_), ou **Cobertura do Testes** é evidenciar quais linhas do código foram testadas e quais não estão sendo exploradas nos testes. É importante salientar que um projeto com cobertura de código alta não significa necessariamente que os testes não podem melhorar: cobertura alta é somente o primeiro passo!

Existem diversos softwares que checam para nós a cobertura de código. Em linhas gerais, os resultados podem evidenciar:

- a proporção de linhas do seu código que são executadas; 

- se há linhas que “nunca” serão executadas - problemas com `if else`, por exemplo;

- a quantidade de funções externas que são chamadas;

- blocos de código repetitivos e/ou códigos inalcançáveis.

Se o resultado nos mostra que há uma cobertura alta, podemos dizer que o código foi bastante testado e tem uma chance menor de conter erros, mas não diz nada sobre a qualidade do código, o que só pode ser medido pela **Cobertura dos Casos de Uso**.


**Casos de uso x Cobertura de código**

Casos de uso são possibilidades de usos do sistema. Exemplo: quais passos a pessoa usuária precisa seguir para fazer um login no sistema e o que é esperado ao final do login tanto no sucesso quanto na falha? E se a pessoa não digitar o user? Ou a senha? E se a senha estiver incorreta? Cada uma dessas situações é um **caso de uso diferente**. Mais importante do que garantir a cobertura do código, algo que já é crucial, é garantir que seus testes abordam todos os **casos de uso** da sua aplicacão. Para isto é preciso criar testes automatizados simulam uma pessoa acessando a página fazendo uma sequência de ações que resulta naquele caso de uso.



A seguir, vamos conhecer a `react-testing-library`, ferramenta de testes automatizados recomendada pela documentação do React. Nela, faremos testes sempre pensando em **casos de uso**!

### Introdução ao RTL

No conteúdo de testes já visto no curso, funções eram testadas. Já no `RTL` o objetivo é testar comportamento, como se algo aparece ou não na tela. Por exemplo:

  - Podemos testar se a nossa página possui um título específico (igual aos requisitos que se pedem no projeto!);

  - Em uma lista de tarefas, como o projeto `Todo list`, precisamos verificar, por exemplo, se a funcionalidade de adicionar uma nova tarefa funciona. Para isso, devemos simular o comportamento de quem usa, que seria adicionar um texto no campo de texto alvo e clicar no botão que adiciona a nova tarefa. Para testar se funcionou, verificamos se o texto aparece em algum lugar da página. O `RTL` nos dá as ferramentas necessárias para realizar essa simulação!

Esses são apenas alguns dentre muitos exemplos! Agora veremos a estrutura desses testes e suas ferramentas:

* Crie uma nova aplicação com o comando `npx create-react-app testes-react`.
  * Não se preocupe! A biblioteca RTL já vem instalada nos novos projetos.

* Abra a aplicação no `VSCode` e abra o arquivo `App.test.js`. Ele está dentro do diretório `src`.

* Observe o arquivo `App.test.js`:

```language-react
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

O que ele está fazendo é verificar se algum elemento dentro do componente `App` possui o texto "learn react". Para rodar os testes vá para a pasta `src`, e execute `npm test`.

Caso apareça a mensagem abaixo basta clicar a tecla "a".

<%= figure(%{src: "/front-end/react/tests/test.png", caption: "Terminal mostrando que não encontrou nenhum teste.", width: "600em", heigh: "auto"}) %>

Após clicar a tecla "a", esse deve ser o resultado:

<%= figure(%{src: "/front-end/react/tests/testAll.png", caption: "Terminal mostrando quais testes passaram ou não passaram da aplicação", width: "600em", heigh: "auto"}) %>

Como pode ver, o nosso único teste passou. Quer dizer que existe o texto "learn react" dentro do componente `App`! Se rodar aplicação com o `npm start`, você encontrará o texto "learn react", conforme indicado pelo teste.

Agora vamos provocar um erro ou uma falha. Mude o texto "learn react" para "algo que não aparece" e rode o teste. Seu terminal acusará este erro:

<%= figure(%{src: "/front-end/react/tests/fail-test.png", caption: "Parte inicial do erro", width: "600em", heigh: "auto"}) %>

Ele está falando que não foi possível encontrar um elemento que possui o texto "/algo que não aparece/i".

Dê uma olhada na [cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet) {: .external-link target="_blank" rel="noreferrer noopener" } da `react-testing-library`. Ela explica de forma resumida como a biblioteca funciona. Nos aprofundaremos nas explicações ao longo deste bloco!

> 💡 _Você ja reparou no arquivo `setupTests.js`? Por padrão ele é criado junto ao comando `npx create-react-app`, dentro dele temos comentários e uma importação, essa importação fornece para nossos testes o que chamamos de `custom jest matchers`. O `.toBeInTheDocument()` no exemplo acima é um deles, e você pode consultar outros na documentação do [jest-dom](https://github.com/testing-library/jest-dom) {: .external-link target="_blank" rel="noreferrer noopener" } sempre que precisar._

<%= vimeo "465707338" %>

Agora veremos cada parte do código para entender como que a biblioteca de teste funciona. Para testar uma aplicação precisamos seguir alguns passos:

##### Renderização

Testar um componente significa, em poucas palavras, renderizá-lo um browser real ou numa simulação de um browser e testar nele o comportamento desejado. Na `RTL`, é necessário o uso da função `render()` para fazer isso. Ela simula a renderização de um componente e retorna um objeto com alguns métodos para que se possa simular interações com esse componente. Para ver melhor modifique o teste do arquivo `App.test.js`:

```language-react
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const meuApp = render(<App />);
  const linkElement = meuApp.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

Modificamos a linha que utiliza `render`(linha 5 do código acima), ela não está mais realizando o `object destructuring`. Estamos agora salvando todo o conteúdo retornado do `render` para a variável `meuApp`.

Agora, para usar o seletor/query `getByText`, precisamos usar o `meuApp.getByText`. Observe que ele é muito parecido com os seletores do DOM, como o `document.getElementById()` ou  `document.querySelector()`. Seguindo a mesma lógica, ao usar o `meuApp.getByText()`, ele retornará um elemento html.

Para não ter que sempre salvar o retorno da função do render podemos realizar o `object destructuring` no retorno do `render()`. Como segue abaixo:

<%= figure(%{src: "/front-end/react/tests/img-render.png", caption: "Object destructuring no retorno do render", width: "600em", heigh: "auto"}) %>

##### Seletores

<%= vimeo "465703650" %>

`Seletores` ou `Queries` são métodos que usamos para indicar ao RTL algum elemento da nossa aplicação e assim podermos realizar nossos testes e comparações.

Veremos agora algumas formas de buscar por algum elemento HTML. No exemplo foi visto apenas o `getByText` que busca por um elemento que possui um determinado texto.

Todos os seletores (queries) estão disponíveis nessa [lista de queries](https://testing-library.com/docs/dom-testing-library/api-queries) {: .external-link target="_blank" rel="noreferrer noopener" } da `react-testing-library`, mas não é necessário ler toda a documentação! Use-a para tirar dúvidas ou procurar algum assunto específico. Veremos algumas queries durante a aula.

Mas como fazer para buscar um elemento que não possui um texto? Como um input? Para isso, existem outros seletores.

Queremos selecionar para o nosso teste um input de email, portanto vamos acrescentar um ao arquivo `App.js`:

```language-react
    // App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <label htmlFor="id-email">
        Email
      </label>
      <input id="id-email" type="email" />
    </div>
  );
}

export default App;
```

Mudamos a estrutura e adicionamos um campo email com uma label. Precisamos testar se ele está de fato aparecendo na tela. Como ele não possui um texto não podemos usar o `getByText`, mas podemos usar o `getByLabelText`, onde ele pegará o input de acordo com o texto da `label` que está associado a ele. Nesse caso o input está relacionado com a label `Email`.

```language-react
    // App.test.js
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Verificando se existe o campo Email.', () => {
  const { getByLabelText } = render(<App />);
  const inputEmail = getByLabelText('Email');
  expect(inputEmail).toBeInTheDocument();
  expect(inputEmail.type).toBe('email');
});
```

Como pode ver mudamos os `expects` também, verificando se o elemento é do tipo correto e se ele está na tela.

Mas e se um campo não tiver texto e nem label? Podemos usar o `getByRole`. Ele busca pelo atributo role. No caso de um botão, o _role_ é definido pela propriedade `type="button"`. O _role_ serve, por exemplo, para buscar por um elemento `<button>Enviar<button/>` ou `<input type="button" value="Enviar" />`.

Adicione um botão ao `App.js`.

```language-react
  // App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <label htmlFor="id-email">
        Email
      </label>
      <input id="id-email" type="email" />
      <input id="btn-send" type="button" value="Enviar" />
    </div>
  );
}

export default App;
```

Adicione ao arquivo de `App.test.js` o teste abaixo:

```language-react
test('Verificando se existe um botão', () => {
  const { getByRole } = render(<App />);
  const btn = getByRole('button');
  expect(btn).toBeInTheDocument();
});
```

Agora adicione um novo botão na aplicação.

```language-react
  // App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <label htmlFor="id-email">
        Email
      </label>
      <input id="id-email" type="email" />
      <input id="btn-send" type="button" value="Enviar" />
      <input id="btn-back" type="button" value="Voltar" />
    </div>
  );
}

export default App;
```

Rode os testes verá que ocorre um erro. O que acontece é que o `getByRole` espera apenas encontrar um elemento, mas acaba encontrando dois, o botão de `Enviar` e o de `Voltar`, pois os dois possuem o _role_ `button`. Para resolver esse problema precisamos usar outro seletor, o `getAllByRole`, que armazenará todos os valores encontrados pelo seletor em um array. Para testar precisamos mudar o teste para:

```language-react
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Verificando se existe o campo Email.', () => {
  const { getByLabelText } = render(<App />);
  const inputEmail = getByLabelText('Email');
  expect(inputEmail).toBeInTheDocument();
  expect(inputEmail.type).toBe('email');
});

// test('Verificando se existe um botão', () => {
//   const { getByRole } = render(<App />);
//   const btn = getByRole('button');
//   expect(btn).toBeInTheDocument();
// });

test('Verificando se existe dois botões', () => {
  const { getAllByRole } = render(<App />);
  const buttons = getAllByRole('button');
  expect(buttons.length).toBe(2);
});
```

Observe que usamos o tamanho do `buttons` para verificar se foram encontrados dois botões. Não precisamos apenas usar o `.toBeInTheDocument` para realizar a verificação de presença no documento!

Foi necessário comentar o nosso segundo teste para não ocorrer um erro. Vamos modifica-lo para verificar se existe um botão de enviar. Para isso usaremos a query `getByTestId`. Devemos, para usar esse seletor, adicionar uma propriedade ao nosso botão de enviar, o `data-testid`.

```language-react
  // App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <label htmlFor="id-email">
        Email
      </label>
      <input id="id-email" type="email" />
      <input id="btn-send" type="button" data-testid="id-send" value="Enviar" />
      <input id="btn-back" type="button" value="Voltar" />
    </div>
  );
}

export default App;
```

O teste ficará assim:

```language-react
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Verificando se existe o campo Email.', () => {
  const { getByLabelText } = render(<App />);
  const inputEmail = getByLabelText('Email');
  expect(inputEmail).toBeInTheDocument();
  expect(inputEmail.type).toBe('email');
});

test('Verificando se existe um botão de enviar', () => {
  const { getByTestId } = render(<App />);
  const btn = getByTestId('id-send');
  expect(btn).toBeInTheDocument();
  expect(btn.type).toBe('button');
  expect(btn).toHaveValue('Enviar');
});

test('Verificando se existe dois botões', () => {
  const { getAllByRole } = render(<App />);
  const btn = getAllByRole('button');
  expect(btn.length).toBe(2);
});
```

Buscamos o elemento pelo `data-testid` e depois verificamos se ele está na tela e se é um botão com o texto `Enviar`.

##### Testando eventos

<%= vimeo "465697770" %>

Por enquanto estamos apenas testando se as coisas estão sendo renderizadas, mas precisamos testar o comportamento do usuário, como um clique em um botão. Para isso se usa o [`fireEvent`](https://testing-library.com/docs/dom-testing-library/api-events) {: .external-link target="_blank" rel="noreferrer noopener" }. Ele pode ser usado para simular os eventos capturados pelos event listeners dos elementos, como `change`, `keyDown`, `click` e outros. A lista completa de eventos suportados pelo `fireEvent` é [essa](https://github.com/testing-library/dom-testing-library/blob/master/src/event-map.js) {: .external-link target="_blank" rel="noreferrer noopener" }. Modificaremos nosso `App.js` para quem usa poder inserir o seu email no campo, salvá-lo e mostrá-lo na tela:

```language-react
  // App.js
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      saveEmail: '',
    };
  }

  changeEmail(value) {
    this.setState({ email: value });
  }

  changeSaveEmail(value) {
    this.setState({ saveEmail: value, email: '' });
  }

  render() {
    const { email, saveEmail } = this.state;
    return (
      <div className="App">
        <label htmlFor="id-email">
          Email
        </label>
        <input
          id="id-email"
          value={email}
          type="email"
          onChange={(e) => this.changeEmail(e.target.value)}
        />
        <input
          id="btn-enviar"
          type="button"
          data-testid="id-send"
          value="Enviar"
          onClick={() => this.changeSaveEmail(email)}
        />
        <input id="btn-id" type="button" value="Voltar" />
        <h2 data-testid="id-email-user">{`Valor: ${saveEmail}`}</h2>
      </div>
    );
  }
}

export default App;
```

Observe as mudanças que foram feitas.

Rode a aplicação e a teste à mão, adicionando seu email no campo e clicando no botão de enviar. Veja se seu email foi salvo.

Agora iremos automatizar cada passo que você fez no código usando os `fireEvent`, para não ter que toda vez que mudar o código precisar testar a mão cada passo desses. Bastará, ao invés disso, apenas rodar o `npm test`. Observe cada linha do teste:

```language-react
// modifique o import abaixo
import { render, fireEvent } from '@testing-library/react';

// Adicione esse teste.
test('Verificando se o botão e o campo email estão funcionando.', () => {
  const { getByTestId, getByLabelText } = render(<App />);

  const EMAIL_USER = 'email@email.com';

  const textEmail = getByTestId('id-email-user');
  expect(textEmail).toBeInTheDocument();
  expect(textEmail).toHaveTextContent('Valor:');

  const btnSend = getByTestId('id-send');
  const inputEmail = getByLabelText('Email');
  fireEvent.change(inputEmail, { target: { value: EMAIL_USER } });
  fireEvent.click(btnSend);
  expect(inputEmail).toHaveValue('');
  expect(textEmail).toHaveTextContent(`Valor: ${EMAIL_USER}`);
});
```

Passo a passo:

  - Primeiro renderizamos a aplicação, depois salvamos o email do usuário em uma variável (o que é uma boa prática).

  - Depois, verificamos se o `h2` onde o email aparece na tela está apenas com o texto `Valor:`,

  - Depois procuramos pelo o campo de email e o botão que enviará os dados.

  - Simulamos a digitação do usuário no campo de email com o `fireEvent.change(inputEmail, { target: { value: EMAIL_USER } });`. Quando se passa um segundo parâmetro para a função `fireEvent.change` estamos adicionando valores às propriedades do evento, nesse caso adicionamos o valor `'email@email.com'` ao `event.target.value`.

  - Simulamos um clique no botão com o `fireEvent.click(btnSend)`, o que simula o clique de quem usa no botão.

  - Verificamos o campo de email se está vazio e se o `h2` onde o valor do email deveria aparecer tem o conteúdo desejado, que é `Valor: email@email.com`.

### Reforçando o conteúdo

Acabamos de aprender um pouco sobre os seletores, tire alguns minutos para confirir o Cheatsheet na documentação oficial, lembrando que não é necessário ler todo o documento, mas sim confirir algumas das queries usadas e reforçar os conceitos!

[RTL Cheatsheet](https://testing-library.com/docs/dom-testing-library/cheatsheet) {: .external-link target="_blank" rel="noreferrer noopener" }

É muito importante criarmos o hábito de ler as documentações e os artigos sobre os temas que estamos estudando ou desenvolvendo. A maioria está em inglês, você pode aproveitar para desenvolver a habilidade de leitura nessa língua também! Mas, caso precise, pode usar as ferramentas de tradução, como a extensão `translate` do Google.

### Testando apenas um componente.

Agora imagine que está escrevendo teste para a aplicação, mas precisa apenas testar um componente que você criou ou vai criar. Não precisamos renderizar toda a nossa aplicação para realizar um teste: podemos renderizar apenas aquele componente específico e criar os testes para ele.

Usaremos a mesma aplicação anterior e criaremos um componente que mostra se o email é valido ou não. Crie o componente `ValidEmail.js`:

```language-react
import React from 'react';

const verifyEmail = (email) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return emailRegex.test(email);
};

const ValidEmail = (props) => {
  const { email } = props;
  return (
    <div>
      <h2 data-testid="id-email-user">{`Valor: ${email}`}</h2>
      <h3>{(verifyEmail(email) ? 'Email Valido' : 'Email Inválido')}</h3>
    </div>
  );
};

export default ValidEmail;
```

Substitua uma linha no `App.js`, e não esqueça de importar o `ValidEmail` para o `App.js`:

```language-react
<h2 data-testid="id-email-user">{`Valor: ${saveEmail}`}</h2>
// Substitua a linha de cima pela a debaixo.
<ValidEmail email={saveEmail}/>
```

Rode os teste e observe que mesmo sem mudar nenhum teste, todos eles passaram, assegurando que nossa aplicação continua funcionando mesmo após essa mudança (super conveniente, certo?!). Agora falta testar essa funcionalidade nova que adicionamos. Mas testaremos apenas renderizando o nosso componente `ValidEmail`. Crie um arquivo `ValidEmail.test.js`.

```language-react
import React from 'react';
import { render } from '@testing-library/react';
import ValidEmail from './ValidEmail';

test('Testando um componente, caso o email seja valido.', () => {
  const EMAIL_USER = 'email@email.com';
  const { getByText } = render(<ValidEmail email={EMAIL_USER} />);
  const isValid = getByText('Email Valido');
  expect(isValid).toBeInTheDocument();
});
```

Observe que a estrutura é bem parecida com a dos outros testes. O que foi modificado é o que está sendo renderizado. No lugar de `render(<App />)`, colocamos `render(<ValidEmail email={EMAIL_USER} />)`. O componente que queremos renderizar precisa de uma props para funcionar, portanto precisamos passar um valor para ela, que no caso é `email={EMAIL_USER}`. O teste verifica se, com a prop passada, o nosso teste passará.

Como já estamos testando o caso do email valido, precisamos criar o teste que cobre o cenário do email ser inválido. Para isso, basta copiar o teste anterior e criar um novo, além de mudar o valor que passaremos para a prop e o nome que buscamos para 'Email Invalido' ou algo parecido. Adicione o teste abaixo e rode os testes:

```language-react
test('Testando um componente, caso o email seja inválido.', () => {
  const EMAIL_USER = 'emailerrado';
  const { getByText } = render(<ValidEmail email={EMAIL_USER} />);
  const isValid = getByText('Email Inválido');
  expect(isValid).toBeInTheDocument();
});
```

Agora, para você começar a fixar o assunto, faça o seguinte exercício: adicione novas funcionalidades a esse componente, como não aparecer a mensagem caso nenhum email ainda tenha sido enviado, e realize os testes para ela. Pode usar o `.not` para negar o `expect` (`.not.toBeInTheDocument()`). Adicione uma funcionalidade que muda a cor do texto caso seja valido ou invalido o email.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Na aula de hoje vamos escrever testes para uma aplicação React pronta.

Vamos para o Slack onde o link da aula ao vivo estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 120 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

Para os exercícios de hoje é necessário realizar um `fork` de um repositório.

Esse comando copia um repositório do GitHub para a sua conta. Quando realizamos o `git clone` apenas o código é copiado para a nossa máquina, e qualquer alteração que fizer e _pushar_ será adicionada ao repositório original. Com o `fork` um novo repositório é criado. Logo, todas as alterações que _pushar_ serão feitas no novo repositório, e não no original. Veja este [tutorial de como realizar um `fork`.](https://github.com/UNIVALI-LITE/Portugol-Studio/wiki/Fazendo-um-Fork-do-reposit%C3%B3rio) {: .external-link target="_blank" rel="noreferrer noopener" }

Após realizar o `fork`, realize o `git clone` desse seu repositório para a sua máquina.

O _readme_ desse repositório contém as instruções de como realizar os exercícios, basta entrar na branch correta e começar a realizá-los, quando terminar abra um PR para ele!

### Exercício 1: Todo List.

Para esse inicio testaremos uma aplicação mais simples, uma lista de tarefas, como a que já fez num projeto do curso!

O _README_ do [repositório do todo list](https://github.com/tryber/exercise-todo-list) {: .external-link target="_blank" rel="noreferrer noopener" } tem as instruções mais detalhadas para o exercício.


### Exercício 2 (Bônus): Jogo da Velha

Agora desenvolveremos e testaremos uma aplicação, um jogo da velha. Os teste dela são mais robustos. Como a aplicação completa terá mais funcionalidades, mais coisas deverão ser testadas.

O _README_ do [repositório do jogo da velha](https://github.com/tryber/exercise-tic-tac-toe) {: .external-link target="_blank" rel="noreferrer noopener" } tem as instruções mais detalhadas para o exercício.


## Recursos adicionais (opcional)

* [Confident React - Webinar de Kent C. Dodds apresentando a React Testing Library e comparando-a com o Enzyme](https://applitools.com/blog/react-kent-c-dodds-frontend-visual-testing?utm_referrer=https://github.com/frontendbr/forum/issues/1501) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Documentação do React - Testing Overview](https://reactjs.org/docs/testing.html) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Code Sandbox - React Testing Library Examples](https://codesandbox.io/s/github/kentcdodds/react-testing-library-examples) {: .external-link target="_blank" rel="noreferrer noopener" }

* [GitHub da React Testing Library](https://github.com/testing-library/react-testing-library) {: .external-link target="_blank" rel="noreferrer noopener" }

* [My experience moving from Enzyme to react-testing-library](https://medium.com/@boyney123/my-experience-moving-from-enzyme-to-react-testing-library-5ac65d992ce) {: .external-link target="_blank" rel="noreferrer noopener" }

* [FAQ da react-testing-library](https://testing-library.com/docs/react-testing-library/faq) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Na próxima aula vamos nos aprofundar mais na `react-testing-library`!

<%= next_button(@conn) %>
