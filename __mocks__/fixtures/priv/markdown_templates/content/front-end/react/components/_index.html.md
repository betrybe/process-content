## O que vamos aprender?

Na aula passada, você foi introduzido à biblioteca ***React*** e soube como criar um projeto ***React*** com o `create-react-app`. Se abrir um projeto recém-criado pelo `create-react-app`, você vai se deparar com algo similar ao seguinte no arquivo `src/index.js`:

```language-react
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
```

O método `ReactDOM.render` está recebendo como primeiro parâmetro `<App />`. Mas, afinal, o que é esse `<App />`? Ele é um exemplo de **componente** ***React***, e é isso que você estudará a fundo na aula de hoje. 🚀

---

### Você será capaz de:

* Criar componentes React corretamente;

* Fazer uso de `props` corretamente;

* Fazer composição de componentes corretamente;

* Criar múltiplos componentes dinamicamente.

* Utilizar `PropTypes` para checar o tipo de uma `prop` no uso de um componente;

* Utilizar `PropTypes` para garantir a presença de `props` obrigatórias no uso de um componente;

* Utilizar `PropTypes` para checar que uma `prop` é um objeto de formato específico;

* Utilizar `PropTypes` para garantir que uma `prop` é um array com elementos de um determinado tipo.

---

## Por que isso é importante?

Uma aplicação desenvolvida em React é composta de componentes. Ou seja, eles são as peças de lego que serão combinadas de forma a construir toda a aplicação! Logo, saber usar componentes é saber montar do zero uma aplicação React. A checagem de tipos é outra parte disso: ela economiza muito tempo de desenvolvimento, protegendo quem desenvolve de cometer erros facilmente evitáveis na utilização dos componentes.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos


Como já sabemos, componentes são a base de toda aplicação **React**. Eles nos permitem segmentar uma página web em blocos de códigos independentes e **reutilizáveis**, além de tornarem o ambiente de desenvolvimento um local mais organizado. Conceitualmente, componentes **React** são _funções ou classes JavaScript_ que podem aceitar parâmetros, chamados de `props` (do inglês *properties*), e retornam elementos React responsáveis por determinarem o que será renderizado na tela.

Existem duas maneiras de definirmos um componente:

1. Via **função** JavaScript:

```language-react
  function Greeting(props) {
    return (<h1>Hello, {props.name}</h1>);
  }

  export default Greeting;
```
2. Via **classe**:

```language-react
  import React from 'react';
  
  class Greeting extends React.Component {
    render() {
      return (<h1>Hello, {this.props.name}</h1>);
    }
  }

  export default Greeting;
```

Apesar de **ambos os métodos serem equivalentes**, tanto a _função_ quanto a _classe_ possuem recursos  adicionais, os quais nos aprofundaremos em um futuro próximo.

Neste momento, acabamos de aprender os conceitos básicos de um componente. Vamos reforçar cada um deles com este componente de exemplo!

```language-react
import React from 'react';

class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default Greeting;
```

Analisando o código acima, temos:

1. A declaração de um componente chamado `Greeting`.

2. O componente `Greeting` herda da classe `Component` da biblioteca `react`.

3. O componente `Greeting` descreve **o que vai ser mostrado para quem usar a aplicação**, declarado no método **obrigatório** `render`. Nesse caso, `Greeting` retorna: `<h1>Hello, {this.props.name}</h1>`.

4. O componente `Greeting` possui como propriedade um **objeto** chamado `props`, que contém todos os dados passados como parâmetro na hora de chamar um componente. Ou seja, chamar `<Greeting name="Samuel" />` faz com que o componente tenha uma `prop` igual a `{ name: "Samuel" }`.

5. Exportamos o componente `Greeting` de forma que ele possa ser reutilizado na aplicação.


### Props

As `props` são umas das partes mais importantes de um componente. São por elas que você passa os valores para o componente, e é como o torna reutilizável em diferentes contextos. Elas são como os parâmetros de uma função. Observe o exemplo abaixo de como seria uma função que retornaria a mesma mensagem que o componente `Greeting` renderiza:

```language-react
function greeting(name){
  return `Hello, ${name}`;
}
console.log(greeting('Samuel'));
```

Lembrando que, assim como podemos ter vários parâmetros em uma função, conseguimos também passar inúmeras propriedades para o componente por meio das `props`. Adicionemos o sobrenome da pessoa à função e ao componente.

```language-react
function greeting(name, lastName){
  return `Hello, ${name} ${lastName}`;
}
console.log(greeting('Samuel', 'Silva'));
```

Ao componente `Greeting`:

```language-react
import React from 'react';

class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name} {this.props.lastName}</h1>;
  }
}

export default Greeting;
```

Agora o chamamos dentro do componente `App`:

```language-react
import Greeting from './Greeting';

function App() {
  return (
    <main>
      <Greeting name="Samuel" lastName="Silva" />
    </main>
  );
}

export default App;
```

Observe como a chamada do componente lembra a chamada de uma função com passagem de parâmetros! Seu retorno, nesse caso, será `<h1>Hello, Samuel Silva</h1>`.

Você pode estar pensando: entendi que o uso de `props` é importante e como passá-las para um componente, mas como funciona exatamente o trâmite das `props`? Para compreender isso melhor, vamos analisar com mais cuidado a *linha 6* do código anterior. Ao atribuir as props `name` e `lastName` ao componente `Greeting`, o React automaticamente monta um objeto contendo as informações passadas e as disponibiliza para o componente montado numa variável chamada *props*, num formato parecido com esse:

```language-react
const props = { name: 'Samuel', lastName: 'Silva' }
```

Esse objeto `props`, por sua vez, é passado para o componente `Greeting`, o qual poderá resgatar tanto o nome como o sobrenome através do `this.props.name` e `this.props.lastName`.

Agora vamos fazer este exercício de fixação!

```language-react
import React from 'react';

class Image extends React.Component {
  render() {
    return <img src={this.props.source} alt={this.props.alternativeText} />;
  }
}

export default Image;
```

Crie uma aplicação ***React*** na sua máquina via `create-react-app` com o nome `fixation-exercises-11-2`. Crie um arquivo `Image.js` no diretório `src` do projeto e copie para esse arquivo o código escrito acima. Uma vez feito isso tudo, responda:

1. Qual o nome do componente declarado acima?

2. Chame o componente `Image`, de forma que seja mostrada [esta imagem,](https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg) {: .external-link target="_blank" rel="noreferrer noopener" } ou o texto `Cute cat staring`, caso a imagem não consiga ser carregada.

### Composição de componentes

Confome dito anteriormente, componentes são utilizados para construir uma aplicação React. Mas como essa construção é feita? Em React, faz-se uso de **composição de componentes**.

Mas antes de nos aprofundarmos no assunto, vamos dar um passo para trás e refletir: de forma geral, o que é composição? São elementos ordenados de forma a constituir algo maior e mais complexo. São, por exemplo, as músicas em um álbum musical, as frutas em uma salada de frutas ou até mesmo os `inputs`, as `labels` e os `buttons` em um `form`. Como você já deve ter percibido, composições já fazem parte do nosso cotidiano e, com o uso do **React**, isso se tornará ainda mais comum.

Componentes **React** podem conter um ou mais componentes! Essa é uma funcionalidade muito importante do **React**, pois permite a **reutilização** e a **redução do nível de complexidade** de códigos. 

Vamos refatorar o código abaixo para poder entender, na prática, sobre **composição de componentes** e seus benefícios. O código a seguir renderiza informações básicas sobre dois albuns do *Coldplay*.

```language-react
// src/App.js
import React from 'react';

class App extends React.Component {
  render() {
    // Declaração do objeto contendo informações do album01
    const album01 = {
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Coldplay_-_Mylo_Xyloto.JPG/220px-Coldplay_-_Mylo_Xyloto.JPG',
      title: 'Mylo Xyloto',
      releaseDate: {
        year: '2011',
        month: '10',
        day: '24',
      },
      others: {
        recordCompany: 'Capitol, Parlophone',
        formats: 'CD, digital'
      }
    };

    // Declaração do objeto contendo informações do album02
    const album02 = {
      image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/5/5d/Coldplay_-_Ghost_Stories.jpg/220px-Coldplay_-_Ghost_Stories.jpg',
      title: 'Ghost Stories',
      releaseDate: {
        year: '2014',
        month: '05',
        day: '16',
      },
      others: {
        recordCompany: 'Parlophone',
        formats: 'CD, digital'
      }
    };

    // Retorno do que será renderizado
    return (
      <article>
        <section>
          <img src={ album01.image } alt={ album01.title } />
          <h2>{ album01.title }</h2>
          <p>Lançamento: { album01.releaseDate.year }</p>
          <p>Gravadora: { album01.others.recordCompany }</p>
          <p>Formatos: { album01.others.formats }</p>
        </section>
        <section>
          <img src={ album02.image } alt={ album02.title } />
          <h2>{ album02.title }</h2>
          <p>Lançamento: { album02.releaseDate.year }</p>
          <p>Gravadora: { album02.others.recordCompany }</p>
          <p>Formatos: { album02.others.formats }</p>
        </section>
      </article>
    );
  }
}

export default App;
```

Como você deve ter notado, o código, apesar de conter pouca lógica, está **extenso**.  Ambas as `sections`, apesar de possuirem **estruturas semelhantes**, renderizam informações diferentes.  Imagine o tamanho do código se tivéssemos cinco albuns. Ou dez? Percebe-se que, nesse contexto, a `section` é uma excelente candidata a ser transformada em um _componente reutilizável_, dando início à nossa refatoração. Para isso, vamos criar um novo arquivo, chamado `Album.js`, para armazenar o código das `sections` e adaptá-lo para fazer a leitura das `props` que iremos passar futuramente:

```language-react
// /src/components/Album.js
import React from 'react';

class Album extends React.Component {
  render() {
    return (
      <section>
        <img src={ this.props.album.image } alt={ this.props.album.title } />
        <h2>{ this.props.album.title }</h2>
        <p>{ this.props.album.releaseDate.year }</p>
        <p>
          Lançamento:
          { `${ this.props.album.releaseDate.day }/${ this.props.album.releaseDate.month }/${ this.props.album.releaseDate.year }` }
        </p>
        <p>Gravadora: { this.props.album.others.recordCompany }</p>
        <p>Formatos: { this.props.album.others.formats }</p>
      </section>
    );
  }
}

export default Album;
```

Em seguida, vamos refatorar o `App.js`. Para substituirmos as `sections` pelo novo componente criado, temos que:

1. Importá-lo no arquivo `App.js`:

```language-react
  // src/App.js
  import React from 'react';
  import Album from './components/Album'
```
2. Passar as `props` apropriadas:

```language-react
  // src/App.js
   class App extends React.Component {
       ...
       render() {
         return (
           <div>
             <Album album={ album01 } />
             <Album album={ album02 } />
           </div>
         );
       }
   }
   ...
```

Desse modo, o componente `App.js` ficará assim:

```language-react
// src/App.js
import React from 'react';
import Album from './components/Album'

class App extends React.Component {
  render() {
    const album01 = {
      image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Coldplay_-_Mylo_Xyloto.JPG/220px-Coldplay_-_Mylo_Xyloto.JPG',
      title: 'Mylo Xyloto',
      releaseDate: {
        year: '2011',
        month: '10',
        day: '24',
      },
      others: {
        recordCompany: 'Capitol, Parlophone',
        formats: 'CD, digital'
      }
    };

    const album02 = {
      image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/5/5d/Coldplay_-_Ghost_Stories.jpg/220px-Coldplay_-_Ghost_Stories.jpg',
      title: 'Ghost Stories',
      releaseDate: {
        year: '2014',
        month: '05',
        day: '16',
      },
      others: {
        recordCompany: 'Parlophone',
        formats: 'CD, digital'
      }
    };

    return (
      <div>
        <Album album={ album01 } />
        <Album album={ album02 } />
      </div>
    );
  }
}

export default App;
```

Veja como o código ficou mais limpo e melhor de ler. Aqui, **o nosso componente App contém dois componentes Album**. Isso é composição de componentes! Cada um desses componentes **recebe um objeto diferente através da prop `album`. Importante notar que os dois componentes irmãos `<Album />`, são, na realidade, o mesmo componente, porém **reutilizados** com base nas `props` recebidas. Ou seja, apesar de serem o mesmo componente, renderizam informações diferentes, uma vez que recebem `props` diferentes.

À primeira vista, componentizar a aplicação em uma **combinação de componentes React** pode parecer um processo pesado e complexo. No entanto, conforme a aplicação cresce, ter à disposição uma gama de *componentes reutilizáveis* e de baixo nível de complexidade individual facilitará muito o trabalho!

Agora, vamos reforçar o que você acabou de aprender com este exemplo:

```language-react
// arquivo Image.js
import React from 'react';

class Image extends React.Component {
  render() {
    return <img src={this.props.source} alt={this.props.alternativeText} />;
  }
}

export default Image;
```

```language-react
// arquivo UserProfile.js
import React from 'react';
import Image from './Image';

class UserProfile extends React.Component {
  render() {
    return (
      <div>
        <p> {this.props.user.name} </p>
        <p> {this.props.user.email} </p>
        <Image source={this.props.user.avatar} alternativeText="User avatar" />
      </div>
    );
  }
}

export default UserProfile;
```

```language-react
// arquivo App.js, criado pelo create-react-app, modificado
import React from 'react';
import './App.css';
import UserProfile from './UserProfile';

class App extends React.Component {
  render() {
    const joao = {
      id: 102,
      name: "João",
      email: "joao@gmail.com",
      avatar: "https:\/\/cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_640.png"
    };

    const amelia = {
      id: 77,
      name: "Amélia",
      email: "amelia@gmail.com",
      avatar: "https:\/\/cdn.pixabay.com/photo/2017/01/31/13/05/cameo-2023867_640.png"
    };

    return (
      <div className="App">
        <UserProfile user={joao} />
        <UserProfile user={amelia} />
      </div>
    );
  }
}

export default App;
```

Analisando o código acima, temos:

1. O componente `App` é **composto** por dois componentes `UserProfile`. Em outras palavras, o componente `App` é **pai** dos dois componentes `UserProfile`. Além disso, `<UserProfile user={joao} />` e `<UserProfile user={amelia} />` são componentes **irmãos**, e eles dois são **filhos** do componente `App`.

2. O componente `UserProfile`, por sua vez, possui um componente `Image`. Ou seja, `UserProfile` tem `Image` como filho.

3. Os dados são repassados de componente pai para componente(s) filho(s). Olhando para o código acima, o componente `App`, que é pai dos dois componentes `UserProfile`, passa para cada um de seus filhos um objeto com as informações de um perfil. O mesmo pode ser dito olhando para `UserProfile`, que passa para seu componente filho `Image` a origem de uma imagem.

Agora, realize este exercício de fixação:

Suponha que você abra uma aplicação ***React*** e se depare com os seguintes componentes:

```language-react
// arquivo Order.js
import React from 'react';

class Order extends React.Component {
  render() {
    const { user, product, price } = this.props.order;

    return (
      <div className="order">
        <p> {user} bought {product} for {price.value} {price.currency} </p>
      </div>
    );
  }
}

export default Order;
```

```language-react
// arquivo App.js, criado pelo create-react-app, modificado
import React from 'react';
import './App.css';
import Order from './Order';

class App extends React.Component {
  render() {
    const headphone = {
      id: 102,
      user: "cena@gmail.com",
      product: "Razer Headphone",
      price: {
        value: 99.99,
        currency: "dollars"
      }
    };

    const energyDrink = {
      id: 77,
      user: "cena@gmail.com",
      product: "Monster 500mL",
      price: {
        value: 9.99,
        currency: "dollars"
      }
    };

    return (
      <div className="App">
        <h1> Orders recently created </h1>
         {/*  adicione os componentes aqui */}
      </div>
    );
  }
}

export default App;
```

Caso você seja uma pessoa bem perceptiva, deve ter reparado que todos **os nomes de componentes React são iniciados com letra maíuscula**. É uma simples, porém importante, regra de sintaxe do React.

Essa norma de sintaxe se dá devido ao modo como o **React** diferencia _tags do DOM_ dos _componentes React_: quando iniciados com letra minúscula, como `<div />` e `<input />`, serão tratadas como _tags do DOM_. Por sua vez, quando iniciados com letra maiúscula, como `<Greeting />`, serão entendidos como _componentes React_.

Vamos agora ver um vídeo que recapitula a aula de ontem e passa por tudo que já vimos! **Atenção: até a marca 9m40s o vídeo recapitula o conteúdo da aula anterior. Se não sentir necessidade de recapitular, pule para essa marca!**

<%= vimeo "456161268" %>

Crie os componentes acima dentro do diretório `src` do projeto `fixation-exercises-11-2`, para poder fazer o exercício a seguir.

Agora, responda ao seguinte, no que diz respeito à composição de componentes:

* O que o componente `App` é em relação a `Order`?

* Complete o código acima de forma que os pedidos referentes aos produtos `headphone` e `energyDrink` sejam filhos de `App`.


### Lista de componentes e chaves

Agora que você já sabe o que é componente e como compô-lo, suponha que você precise implementar um componente que renderiza uma lista de compras. Entretanto, você não sabe de antemão os elementos dessa lista. Como você renderizaria dinamicamente essa lista de compras?

Imagine que temos a seguinte lista a ser renderizada de maneira dinâmica:

```language-react
const shoppingList = ['leite', 'arroz', 'feijão', 'banana', 'carne'];
```

O primeiro passo é criar uma coleções de elementos. Para isso, iteramos sobre `shoppingList` com uma **HOF** que retorne, **em um novo array**, cada item  da lista envolvido por um elemento `<li>`. A seguir, atribuímos o array resultante para a variável `items`.

```language-react
// o console log foi adicionado para facilitar a compreensão
const items = shoppingList.map((item) => {
  console.log("item: ", item);
  return (<li>{ item }</li>);
});
```

Agora, só nos resta renderizar a lista que acabamos de criar! Para isso, dentro do escopo do `return`, devemos fazer o uso das chaves `{ }` e utilizar, dentro dela, a constante de elementos criada anteriormente. É por meio das chaves que o React irá diferenciar o que é código a ser executado e o que deve ser apenas impresso para leitura:

```language-react
import React from 'react';

class App extends React.Component {
  render() {
    const shoppingList = ['leite', 'arroz', 'feijão', 'banana', 'carne'];
    const items = shoppingList.map((item) => {
      console.log("item: ", item);
      return (<li>{ item }</li>);
    });

    return (
      <div>
        <h2>Lista de compras</h2>
        <ul>
          { items }
        </ul>
      </div>
    );
  }
}

export default App;
```

Pronto! Agora já podemos a renderizar múltiplos componentes de forma dinâmica, sem quaisquer problemas, certo? Quase! Ao executar o código acima, receberemos, pelo `console`, um alerta de que uma *key* deve ser definida para cada item renderizado. Essas *keys* são importantes para o **React** indentificar, com precisão, quais itens foram adicionados, removidos ou alterados.

Então, como atribuímos e quais devem ser os valores dessas *keys*? O melhor valor para uma *key* é um que seja único para cada item da lista, como, por exemplo, um `ID`. No entanto, nem sempre dispomos de um `ID` estável em mãos, tal qual o caso do nosso código acima. Para solucionarmos esse problema, utilizamos o índice gerado no segundo parâmetro da nossa **HOF**. E, para atribuirmos a *key*, adicionamos na `<li>` um atributo `key` com o valor escolhido:

```language-react
const items = shoppingList.map((item, index) => (<li key={ index }>{ item }</li>));
```

Vale ressaltar que, não é recomendado o uso de índices como *keys* em listas que possibilitam a **alteração na ordem dos itens**, pois pode impactar negativamente o desempenho da aplicação ou gerar problemas relacionados ao estado do componente. Caso esteja curioso e deseje entender mais a fundo  esse debate e como o uso do índice pode afetar a aplicação, leia *"Index as a key is ananti-pattern", por Robin Pakorny*, na sessão de `Recursos Adicionais`.

Agora vamos fazer este exercício de fixação:

Lembra do código de exemplo da seção anterior, referente à composição de componentes? Crie os componentes `Image`, `UserProfile` e `App` no diretório `src` do projeto `fixation-exercises-11-2`, e vamos olhar especificamente para o arquivo `App.js`:

```language-react
// arquivo App.js, criado pelo create-react-app, modificado
import React from 'react';
import './App.css';
import UserProfile from './UserProfile';

class App extends React.Component {
  render() {
    const joao = {
      id: 102,
      name: "João",
      email: "joao@gmail.com",
      avatar: "https:\/\/cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_640.png"
    };

    const amelia = {
      id: 77,
      name: "Amélia",
      email: "amelia@gmail.com",
      avatar: "https:\/\/cdn.pixabay.com/photo/2017/01/31/13/05/cameo-2023867_640.png"
    };

    return (
      <div className="App">
        <UserProfile user={joao} />
        <UserProfile user={amelia} />
      </div>
    );
  }
}

export default App;
```

O componente `App` possui dois componentes `UserProfile` como filho. Que tal gerar esses componentes filhos dinamicamente? Isso poderia ser feito da seguinte forma:

```language-react
// arquivo App.js, criado pelo create-react-app, modificado
import React from 'react';
import './App.css';
import UserProfile from './UserProfile';

class App extends React.Component {
  render() {
    const users = [
      {
        id: 102,
        name: "João",
        email: "joao@gmail.com",
        avatar: "https:\/\/cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_640.png"
      },
      {
        id: 77,
        name: "Amélia",
        email: "amelia@gmail.com",
        avatar: "https:\/\/cdn.pixabay.com/photo/2017/01/31/13/05/cameo-2023867_640.png"
      }
    ];

    return (
      <div className="App">
        {users.map(user => <UserProfile user={user} />)}
      </div>
    );
  }
}

export default App;
```

Entretanto, a geração dinâmica dos componentes está incompleta, haja vista que é preciso passar uma `key` para `UserProfile`. Você pode averiguar isso copiando o código acima e entrando no console do _Google Chrome_, que lá vai estar presente um `warning` levantado pelo ***React***.

Dito isso, altere a chamada do componente de `UserProfile` de forma que a lista seja gerada dinamicamente de maneira adequada.

### PropTypes, checagem de tipos.

Agora você vai estudar outro importante fundamento do **React**: a **checagem de tipos**! Imagine que você criou um componente reutilizável e que ele, para funcionar corretamente, precisa receber determinadas _props_ de tipos específicos, caso contrário a aplicação quebrará. A checagem de tipos ajuda a previnir cenários como esse, pois verifica os tipos das `props` passadas para um componente durante o desenvolvimento e levanta um _warning_ se algo não estiver como planejado. Como deve ter notado, essa verificação previne inúmeros erros, economizando muito tempo de desenvolvimento!

A melhor forma para compreender o uso dessa ferramenta é visualizar um exemplo prático e destrinchá-lo:

```language-react
import React from 'react';
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (<h1>Hello, {this.props.name} {this.props.lastName}</h1>);
  }
}

Greeting.propTypes = {
  name: PropTypes.string,
  lastName: PropTypes.string,
};

export default Greeting;
```

  1. O primeiro passo para utilizar o *prop-types* é importá-lo no componente:

```language-react
    import PropTypes from 'prop-types';
```
  Caso **não** tenha utilizado o `create-react-app` para preparar o aplicativo **React**, será necessário o *download* da depedência externa do **PropTypes** através do seguinte comando:
  `npm install --save-dev prop-types`.

  2. Em seguida, para executarmos a checagem de tipos no componente `Greeting`, adicionamos a
  seguinte estrutura antes do `export default`:

```language-react
    Greeting.propTypes = {
      name: PropTypes.string,
      lastName: PropTypes.string,
    };
```

É dentro dessa estrutura que ocorre a checagem das `props`. Basta pegarmos o nome da `prop` que queremos *tipar*, e usar a sintaxe de identificação apropriada para o caso. À primeira vista, pode parecer confuso, por isso vamos ao exemplo:

  1. A primeira `prop` que queremos *tipar* é a `name`. Queremos ter certeza que ela sempre será uma `prop` do tipo `string`, **caso ao contrário nossa aplicação pode quebrar**. Para isso:

```language-react
    ...
    name: PropTypes.string,
    ...
```

  2. A outra `prop` que falta ser _tipada_, `lastName`, se encontra em uma situação bem semelhante à anterior. Então repetimos o processo, trocando apenas o nome da `prop`:

```language-react
    ...
    name: PropTypes.string,
    lastName: PropTypes.string,
    ...
```

Agora podemos ter certeza que, caso o componente seja renderizado com alguma `prop` de tipo inválido, o **console disparará um aviso**, facilitando muito o processo de _debugging_.

E caso o nosso componente seja renderizado sem nenhum valor numa `prop`, ainda será disparado o aviso? Em casos como esse, no qual as `props` são *essenciais* para o bom funcionamento do componente, é importante acrescentar o `.isRequired` - inglês para _"é obrigatório"_ - após a definição do tipo da `prop`:

```language-react
Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};
```

Desse modo, sempre que o componente for renderizado sem uma das `props` ou com alguma do tipo errado, um aviso será disparado.

Abaixo segue alguns dos principais validadores oferecidos pela **PropTypes**. Caso esteja revisitando o conteúdo e nenhum dos validadores abaixo consigam te ajudar, ou esteja apenas curioso para saber mais sobre outros validadores que a biblioteca oferece, acesse _"React - PropTypes"_ na sessão de `Recursos Adicionais`.

```language-react
MeuComponente.propTypes = {
  // Todos os validadores aqui são, por padrão, validadores opcionais.
  // Para torná-los obrigatórios basta adicionar .isRequired 
  numeroObrigatório: PropTypes.number.isRequired,
    
  // Tipos básico do JS.
  stringOpcional: PropTypes.string,
  numeroOpcional: PropTypes.number,
  booleanoOpcional: PropTypes.bool,
  funcaoOpcional: PropTypes.func,
  objetoOpcional: PropTypes.object,
  arrayOpcional: PropTypes.array,
  
  // Um array de determinado tipo básico
  arrayDe: PropTypes.arrayOf(PropTypes.number),
  
  // Um objeto de determinado tipo básico
  objetoDe: PropTypes.objectOf(PropTypes.number),
  
  // Um objeto com forma específica
  objetoComForma: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }),
    
  // Um objeto que não permite props extras
  objetoComFormatoRigoroso: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number,
    avaibility: PropTypes.bool,
  }), 
};
```

Por fim, consolide todo o conhecimento adquirido assistindo o vídeo a seguir:

<%= vimeo "456361665" %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. 💪 Vamos ver como utilizar tudo o que aprendemos até então sobre componentes.

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Instruções para realização dos exercícios

Crie um novo projeto utilizando `npx create-react-app my-pokedex`

Para realizar esse exercício, crie um arquivo chamado `data.js` no diretório `.src/` do projeto que você acabou de criar. Copie para esse arquivo o seguinte conteúdo:

```language-javascript
const pokemons = [
  {
      id: 25,
      name: "Pikachu",
      type: 'Electric',
      averageWeight: {
          value: 6.0,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)"
  },
  {
      id: 4,
      name: "Charmander",
      type: 'Fire',
      averageWeight: {
          value: 8.5,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)"
  },
  {
      id: 10,
      name: "Caterpie",
      type: 'Bug',
      averageWeight: {
          value: 2.9,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)"
  },
  {
      id: 23,
      name: "Ekans",
      type: 'Poison',
      averageWeight: {
          value: 6.9,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn.bulbagarden.net/upload/1/18/Spr_5b_023.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)"
  },
  {
      id: 65,
      name: "Alakazam",
      type: 'Psychic',
      averageWeight: {
          value: 48.0,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)"
  },
  {
      id: 151,
      name: "Mew",
      type: 'Psychic',
      averageWeight: {
          value: 4.0,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn.bulbagarden.net/upload/4/43/Spr_5b_151.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)"
  },
  {
      id: 78,
      name: "Rapidash",
      type: 'Fire',
      averageWeight: {
          value: 95.0,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn.bulbagarden.net/upload/5/58/Spr_5b_078.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)"
  },
  {
      id: 143,
      name: "Snorlax",
      type: 'Normal',
      averageWeight: {
          value: 460.0,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn.bulbagarden.net/upload/4/40/Spr_5b_143.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)"
  },
  {
      id: 148,
      name: "Dragonair",
      type: 'Dragon',
      averageWeight: {
          value: 16.5,
          measurementUnit: "kg"
      },
      image: "https:\/\/cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png",
      moreInfo: "https:\/\/bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)"
  }
];

export default pokemons;
```

### Agora, a prática

Você vai implementar de forma simplificada uma [Pokedex!!](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9dex) {: .external-link target="_blank" rel="noreferrer noopener" } Para os que não estão familiarizados com o universo `Pokemon`, a `Pokedex` é uma enciclopédia de todos os pokemons na natureza. Para o seu caso, a sua aplicação precisa mostrar todos os pokemons presentes no arquivo `data.js` mencionado acima.

Você pode usar a imaginação para estilizar a sua aplicação. Entretanto, é **obrigatório** que você implemente **pelo menos** estes dois componentes:

1. `Pokemon`: como o próprio nome diz, esse componente representa um pokemon. Esse componente recebe como entrada um objeto que contém informações referentes a um pokemon específico. Esse componente precisa retornar as seguintes informações obrigatórias para serem mostradas para quem usar a aplicação, essas informações devem ser validadas utilizando PropTypes:

  *  nome do pokemon;

  *  tipo do pokemon;

  *  peso médio do pokemon, acompanhado da unidade de medida usada;

  *  imagem do pokemon.

2. `Pokedex`: esse componente representa a enciclopédia de pokemons. Esse componente recebe como entrada uma lista de pokemons para serem mostrados na tela. Para cada um desses pokemons recebidos, `Pokedex` chama o componente `Pokemon`.

Segue uma sugestão de implementação da aplicação:

<img class="rounded mx-auto d-block" src="/front-end/react/components/my-pokedex-project.gif" alt="Gif exibindo uma sugestão de implementação da aplicação my-pokedex" width="auto" height="300px">

---

## Recursos adicionais (opcional)

* [Index as a key is an anti-pattern, por Robin Pakorny](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) {: .external-link target="_blank" rel="noreferrer noopener" }

* [React - PropTypes](https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html#proptypes) {: .external-link target="_blank" rel="noreferrer noopener" }

* [ReactJS - Documentação oficial do React](https://pt-br.reactjs.org/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [W3Schools - React Components](https://www.w3schools.com/react/react_components.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [W3Schools - React Props](https://www.w3schools.com/react/react_props.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Medium - React JS — Understanding Functional & Class Components](https://codeburst.io/react-js-understanding-functional-class-components-e65d723e909) {: .external-link target="_blank" rel="noreferrer noopener" }

* [FullStack React - Repeating Elements](https://www.fullstackreact.com/30-days-of-react/day-13/#repeating-elements) {: .external-link target="_blank" rel="noreferrer noopener" }

* [freeCodeCamp - Exercise](https://www.freecodecamp.org/learn/front-end-libraries/react/write-a-react-component-from-scratch) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Bit - Discover Components](https://bit.dev/components) {: .external-link target="_blank" rel="noreferrer noopener" }

* [React Basics - Understanding React PropTypes - Episode #8](https://www.youtube.com/watch?v=XLthy2j_CCQ) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
