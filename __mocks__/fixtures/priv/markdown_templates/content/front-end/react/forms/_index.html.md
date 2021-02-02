## O que vamos aprender?

Vamos encarar mais um dia de ***React***?

Hoje você vai aprender sobre formulários. Como você já viu, saber capturar eventos e criar formulários que os usam é fundamental para que você esteja preparado para as diferentes demandas do mercado.

Lembra daquela cópia super legal do cadastro do ***Facebook*** que você fez? Então, fazê-la com ***React*** vai ser muito mais legal!

<%= vimeo "458440870" %>

---

### Você será capaz de:

  * Criar formulários utilizando sintaxe ***JSX*** com as `tags`: `input`, `textarea`, `select`, `form`.

  * Transmitir informações de componentes filhos para componentes pais via *callbacks*.

---

## Por que isso é importante?

Aprofundar seus conhecimentos no ***React*** não é uma tarefa fácil. Sabemos que o nível de complexidade que ele traz em um primeiro momento é alto. O importante é que fique claro que essa habilidade vai ser um grande diferencial para vocês no mercado de trabalho e irá ajudar na construção de front-ends ainda mais robustos.

Aí eu te pergunto: qual aplicação que não demanda a captura de eventos com um `onClick`? Qual sistema não tem ao menos um formulário simples, como uma caixa de `Login`? Acho que você mesmo já respondeu qual a importância da aula de hoje! 🚀

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

E aqui vamos novamente aos formulários. 🗒️🤣

Vamos descobrir que os formulários no ***React*** se comportam de forma um pouco diferente do ***HTML*** padrão. Mas por quê? O `state`, que você aprendeu ontem, é a chave para essa charada!

### Componentes controlados

<%= vimeo "458433447" %>

No *JavaScript* "tradicional", que vocês usavam nos primeiros blocos, você fez formulários, certo? Pois bem, se pergunte o seguinte: onde ficavam os dados que vocês inseriam nesses formulários? Os dados dos campos numéricos, de texto, *select*... Eles não ficavam em nenhuma variável declarada por você certo?

Pois então! Se você reparar com um *inspect*, vai ver que os dados dos campos preenchidos sempre aparecem no próprio DOM quando inseridos. Você acredita que **é aí que esses dados são salvos?** Sim! No próprio DOM. Meio estranho, certo? Pensando numa aplicação **React**, onde nós salvaríamos os dados do nosso formulário? Pensando no formulário, lógico, como um componente.

... No *Estado*, correto?

Pois é! Como todos os dados que concernem os componentes do React, os dados de um formulário também devem ser salvos no *Estado*! E eis o pulo do gato: a partir do momento que a informação do forms não é mais salva no próprio elemento, no DOM, mas no *Estado* do componente que o contém, passamos a dizer que esse elemento é um _Componente Controlado!_

```language-react
import React, { Component } from 'react'
import './Form.css'

class Form extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      estadoFavorito: '',
    };
  }


  handleChange(event) {
    this.setState({
      estadoFavorito: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1>Estados e React - Tecnologia fantástica ou reagindo a regionalismos?</h1>
        <form className="form">
          <label>
            Diga qual o seu Estado favorito! De React ou do Brasil, você decide! =)
              <textarea name="estadoFavorito" value={this.state.estadoFavorito} onChange={this.handleChange} />
          </label>
          <input
            type="number"
            name="idade"
          />
          <input
            type="checkbox"
            name="vaiComparecer"
          />
        </form>
      </div>
    );
  }
}

export default Form;
```

💡 _*Atenção!* Essa nomenclatura, oficial do React, é confusa. Estamos dizendo aqui que o **elemento do formulário** é um componente controlado. Não estamos falando dos componentes React aqui, mas dos elementos que compõem o formulário! Cuidado para não confundir._

💡 _A extensão do Google Chrome [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) {: .external-link target="_blank" rel="noreferrer noopener" } é incrívelmente útil para se desenvolver aplicativos React! Não deixe de baixá-la._

##### Para fixar

**1 -** Crie um formulário com um campo `select`, dois `inputs` de tipo diferente, uma `textarea` e faça de um deles um componente controlado, ou seja, elementos do formulário controlados pelo *Estado*

**2 -** Baixe a _React Developer Tools_ e veja, nela, o dado inserido no elemento controlado sendo salvo no Estado.

### `event handlers` genéricos

<%= vimeo "458431865" %>

Uma excelente forma de criarmos formulários 100% com componentes controlados é fazermos um `event handler` genérico, capaz de atualizar o estado de todos os componentes com a mesma lógica.

```language-react
handleChange({ target }) {
  const { name } = target;
  const value = target.type === 'checkbox' ? target.checked : target.value;

  this.setState({
    [name]: value,
  });
}
```

O truque é o seguinte:

- Dê a cada elemento um nome que seja igual à respectiva chave no estado do componente

- No handler, recupere a partir do parâmetro `event` o nome do componente que disparou o evento e o valor associado ao disparo.

- *Interpole* o nome do componente como chave do estado numa sintaxe como a acima.

##### Para fixar

**3 -** Faça todos os seus elementos componentes do formulário ficarem 100% controlados. Faça um _event handler_ genérico para lidar com eles.

**4 -** Acrescente no seu formulário um `input` do tipo `checkbox` e garanta que seu `event handler` esteja tratando este caso corretamente.

**5 -** Busque na documentação de React acerca de formulários (primeiro link da seção de Recursos Adicionais!) como se deve adicionar um `input` para **arquivos**. Acrescente um ao seu formulário.

**6 -** Encapsule alguns dos seus campos num `fieldset`. Entenda como ele funciona lendo uma [documentação](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/fieldset) {: .external-link target="_blank" rel="noreferrer noopener" }.

### Transmitindo informações de componente filho para componente pai

<%= vimeo "458436715" %>

A transmissão de informações de um componente filho para um componente pai é um dos conceitos primordiais de React. Ele se baseia nos seguintes pilares:

- O componente pai **detém o *Estado* e controla completamente como ele será atualizado.** Isso significa que as funções que manipularão o estado devem ser declaradas sempre nele mesmo.

- Quando algum componente filho deve passar alguma informação ao componente pai, ele deve receber como `props` a função que atualiza o estado do pai e dar a ela, como parâmetro, a informação pedida.

- A informação transmitida dessa forma será inserida no estado do componente pai.

No código abaixo vemos um exemplo disso acontecendo numa aplicação diferente do formulário que estamos vendo: o contador de cliques do qual falamos no primeiro dia do bloco.

```language-react
import React from 'react';

class Button extends React.Component {
  render() {
    /* A função que altera o estado do componente pai chega
       ao componente filho via `props`! */
    const { handleClick } = this.props;

    return (<button type="button" onClick={handleClick} >Contar clique!</button>);
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);

    // O componente pai é o dono do estado!
    this.state = {
      numeroDeCliques: 0,
    };
  }

  /* A função de alterar o estado é definida no componente pai*/
  handleClick() {
    this.setState((estadoAnterior) => ({
      numeroDeCliques: estadoAnterior.numeroDeCliques + 1,
    }));
  }

  /* O componente filho recebe a função de alterar estado do pai via `props`,
     na forma de uma callback */
  render() {
    return (
      <div>
        <h1>{`${this.state.numeroDeCliques} cliques!`}</h1>
        <Button handleClick={this.handleClick} />
      </div>
    );
  }
}

export default App
```

##### Para fixar

**7 -** Faça dois de seus campos serem componentes filhos do seu componente de formulário. Garanta que seu estado ainda pertence ao componente pai.

**8 -** Faça duas validações em um desses componentes filhos e uma em um outro.

**9 -** Crie, no estado do componente pai, um campo `formularioComErros` que deve ser `true` caso algum desses componentes tenha erros e `false` caso contrário.

🦜 **Dica:** Se algum dos componentes transmitir `true` para a função que fará o `handle` dos erros, qual valor deve ser armazenado no *Estado*?

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Hoje, na aula ao vivo, você irá ver uma biblioteca que facilita muito a criação de formulários em ***React*** e também a manipulação de eventos.

O link estará disponível no Slack.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

<%= versioning_your_code(@conn) %>

### Criando um formulário em ***React***.

Lembra do formulário que você criou usando JavaScript _"clássico"_? Vamos criar um parecido em React, e você verá como suas habilidades evoluíram desde então!

* Crie um novo projeto, utilizando `npx create-react-app my-form-2.0`

* Caso julgue necessário, crie estilos ***CSS*** para seu formulário, de acordo com a sua imaginação.

* Faça tudo utilizando as abstrações do ***React***.

Vamos criar um formulário de cadastro de currículo com base na especificação seguintes:

1. Crie um `<fieldset>` para os dados pessoais a seguir:

    * Nome - Texto

        * Limite de 40 caracteres

        * Todos os caracteres devem ser transformados para `UPPER CASE` assim que forem digitados.

        * Campo obrigatório

    * Email - Texto

        * Limite de 50 caracteres

        * Campo obrigatório

    * CPF - Texto

        * Limite de 11 caracteres

        * Campo obrigatório

    * Endereço - Texto

        * Limite de 200 caracteres

        * Remover qualquer caracter especial que seja digitado

        * Campo obrigatório

    * Cidade - Texto

        * Limite de 28 caracteres

        * Ao remover o foco desse campo (evento `onBlur`), verificar se o nome da cidade começa com números. Caso comece, limpar o campo.

        * Campo obrigatório.

    * Estado - ComboBox

        * Todos os estados do Brasil

        * Campo obrigatório.

    * Tipo - Radio Button

        * Casa, Apartamento

        * Campo obrigatório.

2. Crie outro `<fieldset>` para dados do seu último emprego:

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

Por último, vá até o formulário que você criou na aula `HTML & CSS - Forms` e veja as diferenças no código.

### Bônus

- Utilize [regex](https://www.regextester.com/100026) {: .external-link target="_blank" rel="noreferrer noopener" } para validar o campo email.

    * O formato esperado é: `trybe@gmail.com`.

    * **Dica: Para estudar como o `regex` funciona, utilize o [link](https://regexone.com/) {: .external-link target="_blank" rel="noreferrer noopener" }.**


---
## Recursos adicionais (opcional)

* [Formulários em React](https://pt-br.reactjs.org/docs/forms.html) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Mais conteúdo sobre `event handlers`](https://medium.com/javascript-in-plain-english/declaring-event-handlers-d63b17e170d9) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Referência sobre como é o funcionamento por baixo dos panos dos eventos em ***React***](https://pt-br.reactjs.org/docs/events.html) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Vídeo que ensina a criar um formulário em ***React***](https://www.youtube.com/watch?v=Nd69RXF41kA) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
