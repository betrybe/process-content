## O que vamos aprender?

Hoje você vai aprender a usar duas importantes ferramentas para garantir o **bom reuso** dos componentes. A `props.children` permite a você flexibilizar a lógica de um componente, garantindo que ele pode ser usado de várias formas e em vários contextos diferentes, sempre de forma legível e com sintaxe simples.

A `checagem de tipos com PropTypes` garante que não ocorram erros de lógica facilmente evitáveis, relacionados aos tipos das `props` passadas para um componente.

Mãos à obra!

---

### Você será capaz de:

* Utilizar o `props.children` para acessar os filhos de um componente React e interagir com eles;

* Utilizar `PropTypes` para checar o tipo de uma `prop` no uso de um componente;

* Utilizar `PropTypes` para garantir a presença de `props` obrigatórias no uso de um componente;

* Utilizar `PropTypes` para checar que uma `prop` é um objeto de formato específico;

* Utilizar `PropTypes` para garantir que uma `prop` é um array com elementos de um determinado tipo.

---

## Por que isso é importante?

A boa utilização da `props.children` é essencial no desenvolvimento de Apps complexos e reutilizáveis. A checagem de tipos é outra parte disso: ela economiza muito tempo de desenvolvimento, protegendo quem desenvolve de cometer erros facilmente evitáveis na utilização dos componentes.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### props.children

Primeiramente, leia o artigo abaixo para aprender o que é a `props.children`!

**Atenção!** Recomendamos a leitura até a parte "Contando .children". O conteúdo fica mais específico e complicado a partir desse ponto, e ainda temos mais conteúdo para ser visto por aqui.

[Utilizando “props.children” como função de primeira classe.](https://medium.com/@oieduardorabelo/react-avan%C3%A7ado-utilizando-props-children-como-fun%C3%A7%C3%A3o-de-primeira-classe-f6be8acdfaf1) {: .external-link target="_blank" rel="noreferrer noopener" }

Se tiver fluência em inglês, este pequeno [vídeo](https://www.youtube.com/watch?v=Sq0FoUPxj_c) {: .external-link target="_blank" rel="noreferrer noopener" } explica bem o assunto.

Agora criaremos um componente reutilizável, uma simples lista. Crie um app react com o `create-react-app` e use o código abaixo como base:

- App.js

```language-react
import React, { Component } from 'react';
import MyList from './MyList';

class App extends Component {
  render() {
    return (
      <div className='main'>
        <h1>Minha Lista de Componentes</h1>
        <MyList>
          SUPIMPA
        </MyList>
      </div>
    )
  }
}
export default App;
```

Crie um arquivo na própria pasta src chamado MyList.js com o código.

- MyList.js

```language-react
import React from 'react';
const MyList = (props) => {
  return (
    <div className='list'>
      <ul>
        <li>Item Lista</li>
      </ul>
    </div>
  )
}
export default MyList;
```

Como pode ver, o componente `MyList` recebeu como filho a palavra `SUPIMPA`, mas ainda não a está utilizando. Se rodar o programa, verá que ela não aparece na tela. Para o componente renderizar o seu filho, é necessário chamá-lo com o `props.children`. Adicionando o `props.children` ao `MyList.js`, o código fica assim:

- MyList.js

```language-react
import React from 'react';
const MyList = (props) => {
  return (
    <div className='list'>
      <ul>
        <li>{props.children}</li>
      </ul>
    </div>
  )
}
export default MyList;
```

O texto `SUPIMPA` está como o conteúdo do primeiro `li` da Lista e está aparecendo na tela. Agora, no lugar de `SUPIMPA`, passaremos o elemento como um todo,`<li>SUPIMPA</li>`.

- App.js

```language-react
import React, { Component } from 'react';
import MyList from './MyList';

class App extends Component {
  render() {
    return (
      <div className='main'>
        <h1>Minha Lista de Componentes</h1>
        <MyList>
          <li>SUPIMPA</li>
        </MyList>
      </div>
    )
  }
}
export default App;
```

- MyList.js

```language-react
import React from 'react';
const MyList = (props) => {
  return (
    <div className='list'>
      <ul>
        {props.children}
      </ul>
    </div>
  )
}
export default MyList;
```

Nada mudou visualmente na aplicação, mas, como pode ver, o `MyList` recebeu um elemento HTML inteiro como filho, `props.children`. Ele pode receber vários valores distintos como filho, e até mais de um. Vamos passar mais dois elementos ao `MyList`: um botão e um texto.

- App.js

```language-react
import React, { Component } from 'react';
import MyList from './MyList';

class App extends Component {
  render() {
    return (
      <div className='main'>
        <h1>Minha Lista de Componentes</h1>
        <MyList>
          <li>SUPIMPA</li>
          SUPIMPA 2.0 - Melhor palavra!
          <button type="button" onClick={() => console.log('show')}>SHOW</button>
        </MyList>
      </div>
    )
  }
}
export default App;
```

Quando adicionamos mais de um elemento no `props.children`, ele é transformado em um array. Adicione um `console.log(props.children)` dentro do `MyList` para ver melhor.

Como pode ter visto, alguns filhos não estão dentro de um elemento `<li>`. Em função disso, a lista está quebrada. Para arrumar esse problema, precisamos mudar um pouco a lógica do elemento `MyList`:

- MyList.js

```language-react
import React from 'react';
const MyList = (props) => {
  return (
    <ul className='list'>
      {props.children.map((child) => {
        if (child.type && child.type === 'li' ) return child;
        return <li>{child}</li>;
      })}
    </ul>
  )
}
export default MyList;
```

Para resolver esse problema, executamos um map sobre `children.props`, para cada filho, e verificamos se já é um `<li>`. Se for, ele retornará apenas o filho; caso não seja, ele retornará o filho dentro da tag `<li>`. Rode essa lógica localmente para entender como ela funciona!

Vejamos o último caso, de quando passamos um outro elemento como filho. Criaremos um componente para substituir o botão que já está sendo passado. Adicionaremos, também, uma nova funcionalidade ao componente `App`.

- Novo componente `ShowButton.js`:

```language-react
import React from 'react';
const ShowButton = (props) => {
  const { changeTitle, value } = props;
  return (
    <button type="button" onClick={() => changeTitle(value)}>SHOW</button>
  )
}
export default ShowButton;
```

- App.js

```language-react
import React, { Component } from 'react';
import MyList from './MyList';
import ShowButton from './ShowButton';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Minha Lista de Componentes',
    }
  }

  changeTitle = (value) => {
    this.setState({ title: value })
  }

  render() {
    return (
      <div className='main'>
        <h1>{this.state.title}</h1>
        <MyList>
          <li>SUPIMPA</li>
          SUPIMPA 2.0 - Melhor palavra!
          <ShowButton changeTitle={this.changeTitle} value='Título Show' />
        </MyList>
      </div>
    )
  }
}
export default App;
```

Como você pode ver, adicionamos uma nova funcionalidade ao componente `App`, uma função que muda o título. E passamos essa função para dentro do novo componente `ShowButton`; ao clicá-lo, ele muda o título da nossa lista.

Para fixar, adicione um novo componente como filho de App. Esse componente deve receber alguns valores:
uma imagem, uma propriedade alt para o texto alternativo, sua altura e uma legenda. Como no exemplo abaixo:

```language-react
<Pictures
  height="200"
  src="https://course.betrybe.com/front-end/react/children-and-proptypes/images/trybe-logo.png"
  alt="Logo da Trybe"
  legenda="Lista feita na Trybe"
/>
```

### PropTypes, checagem de tipos.

Entendido?! Agora você vai estudar outro importante fundamento do **React**: a **checagem de tipos**! Imagine que você criou um componente reutilizável e que ele, para funcionar corretamente, precisa receber determinadas *props*. A checagem de tipos checa as props passadas para um componente durante o desenvolvimento e levanta uma *warning* se algo não está como planejado. Ela é essencial para quem desenvolve criar e utilizar componentes reutilizáveis e previne inúmeros erros, economizando muito
tempo de desenvolvimento!

Para entender melhor do que se trata, veja o vídeo a seguir! Depois disso, reforce o seu conhecimento lendo o artigo seguinte.

**Atenção! A sintaxe para usar propTypes do vídeo está um pouco desatualizada. O artigo mostra a sintaxe correta.**

<%= youtube_video "MkPMV4M_aqM" %>

- [Checagem de tipos(Typechecking) com PropTypes](https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html) {: .external-link target="_blank" rel="noreferrer noopener" }

**Não se esqueça de instalar o PropTypes com o comando `npm install --save prop-types`**

Como fixação, pegue o código do exercício de fixação anterior  e adicione ao componente `Picture` uma  checagem de tipos da seguinte forma:

1. Acrescente uma prop `alt` e garanta que ela seja uma `string` obrigatória;

2. Acrescente uma prop `height` e garanta que ela seja um `number`, e adicione um valor default para ela de 400;

3. Garanta que a prop `children` da imagem seja obrigatória;

4. Crie um elemento `PicturesList` que receba, na prop `children`, uma array de `Pictures` e as renderize dentro de uma lista. Faça a checagem de tipos de `children`. _Esse exercício é para rever um pouco o conteúdo de aulas passadas também!_ O elemento precisará ocupar a posição de `Pictures` no componente `App`.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Na aula ao vivo de hoje, vamos revisar os conceitos de `props.children` e `checagem de tipos` e fazer, juntos, um exercício **que ajudará nas práticas de hoje**

Vamos para o *Slack*, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora, a prática:

Você vai praticar vários dos conceitos do **React** que viu até agora criando um **componente de Dropdown**. Nesse exercício, somando todos os bônus, será possível praticar `props.children`, `checagem de tipos`, `bind`, `default props`, `estado` e `eventos`.

1. O código abaixo é um protótipo de [modal](https://react-bootstrap.github.io/components/modal/) {: .external-link target="_blank" rel="noreferrer noopener" }. Crie a checagem de tipo para todas as props dos componentes. Crie um app react com o `create-react-app` e adicione o código abaixo para começar.

  - App.js

```language-react
import React, { Component } from 'react';
import Button from './Button';
import Alert from './Alert';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      isDisableButton: false,
    }
  }

  changeTitle = (value) => {
    this.setState({ title: value })
  }

  changeShowComponent = () => {
    this.setState((state) => (
      {
        showModal: !state.showModal,
        isDisableButton: !state.isDisableButton
      }
    ))
  }

  render() {
    return (
      <div className='main'>
        <Button content="Clique aqui" isDisable={this.state.isDisableButton} showComponent={this.changeShowComponent} value='Título Show' />
        {this.state.showModal &&
          <Alert
            hideComponent={this.changeShowComponent}
            contentTitle="Modal"
            content="Coloque qualquer coisa aqui."
          />}
      </div>
    )
  }
}

export default App;
```

  - Alert.js

```language-react
import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = (props) => {
  const { hideComponent, contentTitle, content } = props;
  setTimeout(() => hideComponent(), 3000);
  return (
    <div className='Alert'>
      <h1>{contentTitle}</h1>
      <p>{content}</p>
    </div>
  )
}

export default Alert;
```

  - Button.js

```language-react
import React from 'react';
const Button = (props) => {
  const { showComponent, isDisable, content } = props;
  return (
    <button
      type="button"
      disabled={isDisable}
      onClick={() => showComponent()}
    >
      {content}
    </button>
  )
}
export default Button;
```

  - Alert.css

```language-css
.Alert{
  background: gray;
  padding: 20px;
  border-radius: 10px;
}
```


2. Usando o código anterior, refatore a aplicação para que o `Alert` funcione com qualquer informação. O componente deverá receber, como filho, um objeto com a estrutura `{title: "Algum título", content: "Algum conteúdo", timeSeconds: 3 }`. O filho é quem definirá o tempo que o modal permanece na tela com o valor da chave `timeSeconds`. Use PropTypes para realizar a validação do formato do objeto.

3. Agora vamos criar o **componente de Dropdown**! Observe o gif abaixo, que já está com todos os bônus feitos:

<%= figure(%{src: "/front-end/react/children-and-proptypes/solution.gif", caption: "Exemplo dos exercícios feitos com todos os bônus", class: "rounded mx-auto d-block", width: "400px", height: "auto"}) %>

Entendeu? O conceito é simples. O componente será uma lista de coisas preferidas suas. Por exemplo, os seus livros prediletos. Dado que estamos utilizando uma lista de letras (a, b, c, d), o componente deverá ter:

 - Um título. O componente deve recebê-lo como `children`.

 - Uma caixa, na forma de uma `div` para ser clicada. Seu valor deve ser o primeiro item da lista, como no gif a letra `a`.

 - Ao clicar na caixa, ela se expande em uma lista de opções. Cada opção deve possuir um valor. Esses valores devem estar dentro de um array de objetos, e devem ser passados para dentro de uma props `list={content}`. Exemplo do array:

```language-react
 const content = [
    {id: 1, item: 'a'},
    {id: 2, item: 'b'},
    {id: 3, item: 'c'},
    {id: 4, item: 'd'},
  ];
```

 - Ao clicar na caixa novamente, ela inteira é ocultada.

 - Adicione as `checagem de tipos` para todas as props passadas.

**Dicas:**

- Lembre-se de dividir o seu problema em problemas menores para lidar com um desafio de cada vez;

- Procure usar _Higher Order Functions_! Elas vão deixar sua lógica muito mais simples;

- Para realizar o item 3, você deverá usar `eventos`, `bind` e `state` para alternar os estilos do dropdown entre "escondido" e "exibido". Será necessário utilizar o estado anterior para alterar o seguinte e evitar erros.

### Bônus:

 - Ao clicar em alguma das opções, o valor da caixa deve ser mudado para a opção clicada.

 - Seu componente deve renderizar um título padrão, caso nenhum seja passado como filho do componente.

---

## Recursos adicionais

* [React Children API](https://www.youtube.com/watch?v=DJ53-G8EbxE) {: .external-link target="_blank" rel="noreferrer noopener" }

* [React Basics - Understanding React PropTypes - Episode #8](https://www.youtube.com/watch?v=XLthy2j_CCQ) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Na próxima aula, você irá aprender sobre o ciclo de vida do React!

<%= next_button(@conn) %>
