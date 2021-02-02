## O que vamos aprender?

Hoje vamos começar a aprender sobre os cinco princípios que abrangem o **SOLID**. 🎉

Esses princípios, ou boas práticas, ditam como seu código deve ser escrito e como ele deve ser organizado para otimizar manutenção, legibilidade e testabilidade.

### Você será capaz de:

- Escrever funções que tenham uma única responsabilidade no domínio do seu programa.

- Escrever classes com funções que estão abertas para extensão e fechadas para modificação.

- Injetar dependências para dar a quem chama o controle sobre como uma função faz o que precisa.

---

## Por que isso é importante?

Falar de SOLID significa falar de **qualidade de código**. Desde o começo do curso você vê que, na Trybe, reforçamos muito a necessidade de se escrever um bom código. Desde o começo o _Code Climate_ está aí para ajudar nisso. A arquitetura SOLID é vastamente usada pelo mundo para criar aplicações de software fáceis de se manter e alterar ao longo do tempo. Embora parte dos princípios seja voltada especificamente para Programação Orientada a Objeto, que nem sempre praticamos em JavaScript, parte do que eles propõem é aplicável em qualquer cenário! Sabe quando você lê um código _bonito_? Simples, que faz o que precisa, de bater o olho e entender tudo? Muitas vezes nos vem o pensamento de que "eu nunca conseguiria bolar um código assim". Isso é exatamente o que as lições do SOLID nos ajudam a conseguir!

Criar e manter um código de excelência durante todo o processo de desenvolvimento de um produto é o principal objetivo de um desenvolvedor de software que preza pela qualidade **no longo prazo**. Ao aplicar um bom padrão de design no seu código, você:

- Facilita a manutenção do código;

- Facilita a escrita de testes;

- Melhora a legibilidade e a navegação;

- Evita trechos de código muito complexos ou duplicados.

Escrever código complexo é uma tarefa simples, mas escrever código simples é uma tarefa muito complexa. Manter o código simples requer muita prática. Como Sandy Metz diz, aplicações bem-sucedidas evoluem e mudam com o tempo sempre. Sem seguir bons princípios, seu código fica uma bagunça e fica impossível "encostar nele" sem alguma coisa parar de funcionar. **A arquitetura SOLID existe para que as partes do seu código sejam tão independentes umas das outras quanto possível, para facilitar sua evolução no futuro.**

Em outras palavras: qualidade de código é mais do que respeitar o Code Climate! Vamos começar a ver isso aqui e agora! 🚀

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### O que exatamente é SOLID?

Se você tem alguma familiariadade com inglês, a palavra **solid** significa sólido, mas não é exatamente da palavra que estamos falando aqui. SOLID é um acrônimo para cinco princípios. Ele é mais focado em programação orientada a objetos, mas também é aplicável em outros cenários similares. É importante ressaltar, no entanto, que o conceito de SOLID ao pé da letra é bem complicado de ser entendido. Se definirmos todos os princípios como propostos no [artigo científico](https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf) {: .external-link target="_blank" rel="noreferrer noopener" } escrito por Robert C. Martin, nos arriscamos a criar mais confusão do que qualquer coisa. Portanto, **ensinaremos aqui uma versão de SOLID mais adequada à nossa realidade.** Posteriormente no curso, no módulo de Ciência da Computação, vamos estudar SOLID novamente com mais detalhes, então não se preocupe! Dito isso, nas definições originais, SOLID significa o seguinte (se prepare para ter dúvidas):

- **S**ingle responsibility principle (_Princípio da responsabilidade única_): uma classe deve ter apenas uma única responsabilidade;

- **O**pen/Closed principle (_Princípio aberto/fechado_): entidades de software devem ser abertas para extensão, mas fechadas para modificação;

- **L**iskov substitution principle (_Princípio de substituição de Liskov_): objetos em um programa devem ser substituíveis por instâncias de seus subtipos, sem alterar a funcionalidade do programa;

- **I**nterface segregation principle (_Princípio da segregação da interface_): muitas interfaces de clientes específicas são melhores do que uma para todos os propósitos;

- **D**ependency inversion principle (_Princípio da inversão da dependência_): deve-se depender de abstrações, não de objetos concretos.

Primeiramente, é importante esclarecer que os princípios **L** e **I** não serão abordados hoje! Eles funcionam melhor quando aplicados à orientação por objeto, então falaremos mais deles futuramente, no módulo de Ciência da Computação. Os demais nos são úteis mesmo em JavaScript! Primeiramente, vamos traduzir as definições deles para português legível:

- **S**ingle responsibility principle (_Princípio da responsabilidade única_): uma classe ou função deve ter uma, e apenas uma, tarefa a realizar dentro do seu código;

- **O**pen/Closed principle (_Princípio aberto/fechado_): você deve ser capaz de estender um comportamento de uma função sem modificar seus comportamentos já existentes;

- ~~**L**iskov substitution principle (_Princípio de substituição de Liskov_): _Não se aplica. Estudaremos este depois!_~~

- ~~**I**nterface segregation principle (_Princípio da segregação da interface_): _Não se aplica. Estudaremos este depois!_~~

- **D**ependency inversion principle (_Princípio da inversão da dependência_): quem usa uma função deve ser capaz de determinar quais outros módulos ela usa em sua lógica.

Uma palavra bastante importante e que deve ser ressaltada é a **princípio**. Isso quer dizer que nada do que está aqui pode ser taxado de **sempre bom** ou **sempre ruim**, mas sim como **recomendado** ou **não recomendado**. Ou seja, são boas práticas. Existem situações em que pode fazer sentido ignorar um desses princípios. Por isso, não seja radical. Sempre reflita sobre o porquê de estar usando/fazendo algo. Nunca se esqueça: ao escrever um código, o objetivo é torná-lo **fácil de ser entendido** e **fácil de ser mantido**. Regra nenhuma, princípio nenhum e caso especial nenhum deve piorar a legibilidade do seu código.

Dito isso, princípios como o SOLID, regras como as do Code Climate geralmente vêm para o bem. Escrever código _realmente bom_ é difícil! Seguir as regras, e confiar nelas, nos coloca  num caminho que, quando concluído, vai nos dar um bom código! O objetivo da aula de hoje é entender como isso acontece e por quê.

Não se preocupe se não tiver entendido os príncipios ainda. A seguir vamos nos aprofundar com mais detalhes em cada um deles.

### Single responsibility principle

Há uma regra do Code Climate que certamente já te assombrou no passado: a regra de [complexidade cognitiva](https://docs.codeclimate.com/docs/cognitive-complexity#:~:text=Cognitive%20Complexity%20is%20a%20measure,be%20to%20read%20and%20understand.) {: .external-link target="_blank" rel="noreferrer noopener" }. Em poucas palavras, essa regra garante que nenhuma de suas funções é complicada demais. Se ela é muito grande e/ou muito confusa, a regra te alerta para que deixe seu código menor e mais simples.

Mas muitas vezes isso é meio desafiador, certo? "Como raios eu deixo essa função do tamanho que se pede?!". Uma forma de se orientar a fazer isso é justamente o **princípio da responsabilidade única**.

<%= figure(%{src: "/back-end/architecture/solid/images/SRP.jpeg", class: "text-center rounded mx-auto d-block", caption: "'Só porque você pode, não significa que você deveria'", width: "600px", height: "auto"}) %>

Vamos a um exemplo. Suponha que você deve construir uma aplicação para gerenciar a situação de estudantes numa escola. A sua primeira tarefa é criar uma função que, ao ser chamada, determina a aprovação ou não de uma pessoa estudante e atualiza seu status no banco de dados como `Aprovada` ou `Reprovada`. Além disso, as notas marcadas de 0% a 100% (0.0 a 1.0) devem ser convertidas para os conceitos de `A` a ` F`. Aí você escreve o seguinte:

```language-js
function setApproved(students) {
  const studentsWithLetterGrade = students.map(student => {
    const disciplinesWithLetterGrade = student.disciplines.map(discipline => {
      if (discipline.grade >= 0.9) discipline["letterGrade"] = "A";
      else if (discipline.grade >= 0.8) discipline["letterGrade"] = "B";
      else if (discipline.grade >= 0.7) discipline["letterGrade"] = "C";
      else if (discipline.grade >= 0.6) discipline["letterGrade"] = "D";
      else if (discipline.grade >= 0.1) discipline["letterGrade"] = "E";
      else discipline["letterGrade"] = "F";

      return discipline;
    });

    return {
      name: student.name,
      disciplines: disciplinesWithLetterGrade
    };
  });

  const approvedStudents = studentsWithLetterGrade.filter(({ disciplines }) =>
    disciplines.every(discipline => discipline.grade > 0.7)
  );

  /* Finja que o console.log é algo que atualiza uma base de dados */
  approvedStudents.map(({ name, disciplines }) => {
    console.log(`A pessoa com nome ${name} foi aprovada!`);
    disciplines.map(({ name, letterGrade }) =>
      console.log(`${name}: ${letterGrade}`)
    );
  });
}

/* Abaixo temos um exemplo de execução */
const students = [
  {
    name: "Lee",
    disciplines: [
      { name: "matemática", grade: 0.8 },
      { name: "história", grade: 0.6 }
    ]
  },
  {
    name: "Clementine",
    disciplines: [
      { name: "matemática", grade: 0.8 },
      { name: "história", grade: 0.9 }
    ]
  }
];

setApproved(students);
```

Veja bem: nossas variáveis e funções têm bons nomes, o código faz o que se pede, usa _Higher Order Functions_ e outros recursos do ES6, mas ele está tão... difícil de entender! Não está? Podemos nem exatamente saber o motivo, mas definitivamente precisamos quebrar a cabeça para acompanhar seu funcionamento. Não por acaso, esse código dispara no Code Climate o alerta de alta complexidade cognitiva!

Certo, então como escrevemos um código melhor? É aí que podemos **acionar** o **single responsability principle**. O primeiro passo para acionar o princípio é **ler atentamente o que foi pedido.** No nosso caso, foi isso: _"A sua primeira tarefa é criar uma função que, ao ser chamada, **determina** a aprovação ou não de uma pessoa estudante e **atualiza** seu status no banco de dados como `Aprovada` ou `Reprovada`. Além disso, as notas marcadas de 0% a 100% (0.0 a 1.0) **devem ser convertidas** para os conceitos de `A` a ` F`"_.

Observe com atenção os grifos: a especificação pede que nosso código **determine** a aprovação, **atualize** seu status e **converta** as notas para conceitos de `A` a `F`. Fazemos tudo o que foi pedido, mas repare que a especificação descreve o que deve ser feito com três verbos: determinar, atualizar e converter. Daí já temos ~~um code smell~~ uma pista. Devemos fazer **três coisas diferentes!**

Vamos tentar, então. Vamos separar esses três comportamentos em funções diferentes.

```language-javascript
/* "Converter" */
const percentageGradesIntoLetters = ({ name, disciplines }) => ({
  name,
  disciplines: disciplines.map(({ name, grade }) => {
    let letterGrade;

    if (grade >= 0.9) letterGrade = "A";
    else if (grade >= 0.8) letterGrade = "B";
    else if (grade >= 0.7) letterGrade = "C";
    else if (grade >= 0.6) letterGrade = "D";
    else if (grade >= 0.1) letterGrade = "E";
    else letterGrade = "F";

    return { name, grade, letterGrade };
  })
});

/* "Determinar" */
const approvedStudents = ({ disciplines }) =>
  disciplines.every(({ grade }) => grade > 0.7);

/* "Atualizar" */
const updateApprovalData = ({ name, disciplines }) => {
  console.log(`A pessoa com nome ${name} foi aprovada!`);

  disciplines.map(({ name, letterGrade }) =>
    console.log(`${name}: ${letterGrade}`)
  );
};

function setApproved(students) {
  students
    .map(percentageGradesIntoLetters)
    .filter(approvedStudents)
    .map(updateApprovalData);
}

/* Abaixo temos um exemplo de execução */
// ...
```

Tudo que fizemos aqui foi jogar cada parte da lógica para uma função diferente. Pode parecer pouco, mas releia a função `setApproved`. Compare com a versão anterior. Só de separarmos nosso código em várias funções a leitura da função fica muito mais fácil! Sem falar que a separação nos abriu espaço para usar mais features do _ES6_ para deixar o código mais simples.

E agora não precisamos entender o código para saber exatamente o que a função faz! Deixamos o nosso código muito melhor de ser lido, o que é ótimo! Mas, ainda assim, o Code Climate levanta o alerta para a _complexidade cognitiva_. Agora ele acusa a função `percentageGradesIntoLetters` de ser complexa demais.

E, bem, ela é mesmo. É complicado entendê-la. Vamos dividi-la, então, em partes ainda menores! Para isso, descreva textualmente o que a função faz e observe os verbos. Por exemplo: _"A função **itera** sobre cada pessoa estudante e, a cada iteração, **itera** sobre todas as disciplinas delas. Para cada disciplina ela **faz a conversão** de porcentagem para letra e, ao final, **monta e retorna** o objeto com o nome da pessoa estudante e com suas disciplinas"_.

Vemos na nossa descrição quatro verbos! Significa que precisamos dividir nossa função em quatro funções menores? Talvez sim, mas talvez não. Vamos *passo a passo* para ver o que acontece. Primeiro, vamos extrair o verbo **faz a conversão**:

```language-javascript
const getLetterGrades = ({ name, grade }) => {
  let letterGrade;

  if (grade >= 0.9) letterGrade = "A";
  else if (grade >= 0.8) letterGrade = "B";
  else if (grade >= 0.7) letterGrade = "C";
  else if (grade >= 0.6) letterGrade = "D";
  else if (grade >= 0.1) letterGrade = "E";
  else letterGrade = "F";

  return { name, grade, letterGrade };
};

const percentageGradesIntoLetters = ({ name, disciplines }) => ({
  name,
  disciplines: disciplines.map(getLetterGrades)
});

// ...
```

E pronto! A função `percentageGradesIntoLetters` está ou não está mais legível agora?! A cada iteração estamos fazendo pequenas melhorias no código separando suas responsabilidades, mas ao fazer isso estamos, aos poucos, deixando ele melhor! E, simplesmente fazendo um esforço para separar responsabilidades, a complexidade cognitiva sumiu! No que se refere ao _Single Responsability Principle_, nossa missão está concluída! Compare o código do começo com o de agora. O entendimento está ou não está melhor? Se precisasse fazer alguma alteração no código, ou escrever testes, em qual dos dois códigos você preferiria trabalhar?

Atenção! Você pode estar se perguntando agora: "Ora, mas era possível eu separar as funções em ainda mais responsabilidades diferentes! Eu não deveria fazer isso?". Não necessariamente! Como toda e qualquer técnica, esse princípio *não é uma bala de prata*. Ele não vai resolver todos os problemas do seu código. Além disso, o exercício de descrever o que a função faz e separar seus comportamentos de acordo com os verbos sempre será carregado de certa subjetividade, sempre será possível dividir a sua função em partes menores. Então lembre-se: o objetivo é ter código legível! Use o princípio para que ele te ajude a melhorar seu código e nunca o use com radicalismo. É só pensar que um código com várias funções pequenas demais também fica confuso e também dispara o alerta de _complexidade cognitiva_. Simplicidade! É isso que você precisa buscar sempre.

### Open/Closed principle

Imagine, para o nosso exemplo, o seguinte cenário: somos uma empresa que administra notas de escolas. Cada escola tem seu corte de aprovação (no nosso caso, `0.7`). Ótimo. Fizemos nosso produto, ele funcionou, e agora uma segunda escola quer ser nossa cliente! Mas o corte de aprovação dela é `0.8`. Precisamos que nosso sistema contemple essa nova realidade. Aí fazemos assim:

```language-javascript
// ...

const percentageGradesIntoLetters = ({ name, school, disciplines }) => ({
  name,
  school,
  disciplines: disciplines.map(getLetterGrades)
});

const approvedStudents = ({ school, disciplines }) =>
  disciplines.every(({ grade }) =>
    school == "Standard" ? grade >= 0.7 : grade >= 0.8
  );

// ...

const students = [
  {
    name: "Lee",
    school: "Standard",
    disciplines: [
      { name: "matemática", grade: 0.8 },
      { name: "história", grade: 0.9 }
    ]
  },
  {
    name: "Albus",
    school: "Hogwarts",
    disciplines: [
      { name: "divination", grade: 0.8 },
      { name: "potions", grade: 0.9 }
    ]
  }
];

setApproved(students);
```

Essa solução funciona, mas não está boa! Nós tivemos que **mudar nossa função** para acrescentar o novo comportamento a ela! O que acontecerá quando surgir uma terceira escola? E uma quarta...?

Pois bem! Conforme estabelecemos no início, o que esse princípio nos diz é o seguinte:

> Você deve ser capaz de estender um comportamento de uma função sem modificar seus comportamentos já existentes.

Beleza, mas o que isso significa? Significa que, caso você precise acrescentar um comportamento ao seu código e isso não for possível sem mudar trechos de códigos que já existem, temos um problema. Veja bem: quando um código funciona e está em produção numa aplicação enorme, queremos evitar mudar o que já existe e funciona.

Mas **todo código precisa ser atualizado com o tempo**. Como podemos, então, atualizar o nosso código sem alterar o que já existe? O que se deve buscar fazer é escrever o código de modo que, no futuro, você possa **acrescentar comportamentos sem mudar os que já existem**.

No nosso caso, seria ser capaz de obter o corte de aprovação e os nomes dos conceitos de quaisquer escolas sem alterar a lógica da nossa aplicação! Isso requer que refatoremos o nosso código para deixá-lo **aberto para extensões**, mantendo-o **fechado para modificações**:

```language-js
const SCHOOL_DATA = {
  Standard: {
    approvalGrade: 0.7
  },
  Hogwarts: {
    approvalGrade: 0.8
  }
};

// ...

const approvedStudents = ({ school, disciplines }) => {
  const { approvalGrade } = SCHOOL_DATA[`${school}`];

  return disciplines.every(({ grade }) => grade >= approvalGrade);
};

// ...
```

Observe que, agora, a nossa função `approvedStudents` está **totalmente genérica**. Quando quisermos acrescentar mais uma escola, ou duas, ou cem, basta adicionar os dados dela à nossa "base" (aqui, simulamos com o objeto `SCHOOL_DATA`). Conseguiremos, assim, estender o nosso comportamento sem modificar a função mais. Agora ela respeita o `Open/Closed`!

Ou seja: no momento em que você está escrevendo uma função para resolver um problema, é importante se perguntar se é possível que, futuramente, essa função seja usada para resolver outros problemas similares ao atual. Se sim, se esforce para deixá-la **aberta a extensões** para poder mantê-la **fechada a modificações**. Como em qualquer princípio, não há necessidade de radicalismo aqui: se uma função não deve ser usada em outros contextos, ela não precisa estar aberta a extensão. Se no futuro isso mudar, você faz uma refatoração. Mas pense com cuidado! A função deixada aberta hoje é uma refatoração a menos para amanhã!

### Dependency Inversion Principle

Suponha que você quer escrever um programa em _JavaScript_ que faz uma requisição para a [API de dad jokes](https://icanhazdadjoke.com/api) {: .external-link target="_blank" rel="noreferrer noopener" }. Assim sendo, você escreve o seguinte programa:

```language-js
const fetch = require('node-fetch');

const url = 'https://icanhazdadjoke.com';

const requestWithFetch = () => {
  fetch(url, {
    headers: new fetch.Headers({
      Accept: 'application/json',
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data.joke))
    .catch((err) => console.log(err));
};

const getJokes = (numberOfJokes) => {
  for (let i = 0; i < numberOfJokes; i += 1) requestWithFetch();
};

getJokes(5);
```

Problema resolvido! Mas agora vamos pensar na questão que está nos acompanhando por todo o dia de hoje: como podemos reusar esse código no futuro para outros contextos sem alterar o código que já existe? Olhe para esse nosso exemplo: aí, estamos usando o `fetch` para fazer uma requisição à API. A função depende do `fetch` para funcionar. O `fetch`, portanto, é uma dependência da função! E o que seria, então, a **inversão de dependência? Conforme foi dito lá em cima**

> Quem usa uma função deve ser capaz de determinar quais outros módulos ela usa em sua lógica.

Em outras palavras, "quem usa decide como se usa". Como assim? Imagine que, no futuro, decide-se abolir o uso de `fetch` no seu projeto em favor do [axios](https://github.com/axios/axios) {: .external-link target="_blank" rel="noreferrer noopener" }. Não queremos alterar o nosso código antigo (vai que ele quebra 😬), mas código novo deve vir com a API nova.

Só que nós queremos usar a nossa função `getJokes` numa funcionalidade nova que estamos fazendo, mas sem utilizar o `fetch`! Como fazemos? Assim:

```language-js
const axios = require('axios').default;
const fetch = require('node-fetch');

const url = 'https://icanhazdadjoke.com';

const requestWithAxios = () => {
  axios
    .get(url, {
      headers: { Accept: 'text/plain' },
    })
    .then((response) => console.log(response.data));
};

// const requestWithFetch = () => {
// ...

const getOneJoke = (numberOfJokes, jokeRequester = requestWithFetch) => {
  for (let i = 0; i < numberOfJokes; i += 1) jokeRequester();
};

getOneJoke(5, requestWithAxios);
```

Repare que, agora, **quem chama a função decide qual dependência a função terá**, seja o Axios ou o Fetch. E ao colocarmos a `requestWithFetch` como valor padrão para o parâmetro que acrescentamos à função, garantimos que, em todos os lugares onde essa função já era usada, tudo continuará funcionando.

Isso que fizemos foi a chamada **inversão de dependência**. Quem usa decide qual dependência a função terá.

### Conclusão

Hoje nós começamos a entender três dos cinco princípios de qualidade de código do SOLID: o princípio da responsabilidade única, o princípio aberto/fechado e o princípio da inversão de dependência. É muito importante ficar claro: esses princípios são complexos no seu entendimento e na sua aplicação, e nós hoje só começamos a arranhar as possibilidades que eles nos têm a oferecer!

No módulo de Ciência da Computação, no contexto de Programação Orientada a Objeto, estudaremos o SOLID com mais profundidade. Por hora, tenha esse entendimento parcial em mente e busque sempre recorrer aos princípios quando escrever código. Acione-os, pergunte-se se o seu código o segue. _Acredite nos princípios_ e implemente-os passo a passo. No final, você terá feito a **difícil** tarefa de escrever um código simples de se entender e estender.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos, vamos para a aula ao vivo, em que a pessoa especialista irá explicá-los com detalhes e tirar todas as suas dúvidas!

Bora pro Slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>

### Agora, a prática

Vamos seguir a linha de refatoração neste exercício também! O exercício será em dupla. Junte-se com a sua e mande ver! Vamos começar criando uma aplicação pequena e aplicando os princípios de SOLID nela para que possamos transformar esse módulo em uma API.

O código que você vai usar como base é o seguinte:

> index.js

```language-js
const defaultPlants = [
  {
    id: 1,
    breed: "Bromelia",
    needsSun: false,
    origin: "Argentina",
    size: 102,
    specialCare: {
      waterFrequency: 3,
    },
  },
  {
    id: 2,
    breed: "Orquidea",
    size: 99,
    needsSun: false,
    origin: "Brazil",
  },
];

let createdPlants = 0;

const initPlant = (id, breed, needsSun, origin, specialCare, size) => {
  const waterFrequency = needsSun ? size *  0.77 + (origin === 'Brazil' ? 8 : 7)
    : (size / 2) *  1.33 + (origin === 'Brazil' ? 8 : 7)
  const newPlant = {
    id,
    breed,
    needsSun,
    origin,
    specialCare: {
      waterFrequency,
      ...specialCare,
    },
    size,
  };
  return newPlant;
};

const savePlants = () => {
  const plants = JSON.stringify(defaultPlants);
  localStorage.setItem("plants", plants);
};

const getPlants = () => {
  const plants = JSON.parse(localStorage.getItem("plants"));
  return plants;
};

const getPlantById = (id) => {
  return defaultPlants.filter((plant) => plant.id === id);
};

const removePlantById = (id) => {
  const newPlants = defaultPlants.filter((plant) => plant.id !== id);
  localStorage.setItem("plants", JSON.stringify(newPlants));
};

const getPlantsThatNeedsSunWithId = (id) => {
  const filteredPlants = defaultPlants.filter((plant) => {
    if (plant.needsSun && plant.id === id) {
      if (plant.specialCare.waterFrequency > 2) {
        return plant;
      }
    }
  });
  localStorage.setItem("plants", JSON.stringify(filteredPlants));
  return filteredPlants;
};

const editPlant = (plantId, newPlant) => {
  return defaultPlants.map((plant) => {
    if (plant.id === plantId) {
      return newPlant;
    }
    return plant;
  });
};

const createNewPlant = (plant) => {
  const mappedPlant = initPlant({ ...plant });
  defaultPlants.push(mappedPlant);
  createdPlants++;
  localStorage.setItem("createdPlants", String(createdPlants));
  localStorage.setItem("plants", JSON.stringify(defaultPlants));
  return defaultPlants;
};
```

Esse módulo, basicamente, controla um catálogo de plantas para um instituto de ciências. Esse código precisa ser adaptado para o padrão SOLID para transformá-lo em uma API, e é isso que você irá fazer.

- Foque em dois princípios: `Single Responsibility` e `Dependency Inversion`, esses são os mais importantes.

#### Iniciando

Inicie um projeto `Express`:

```language-bash
$ npm init -y
$ npm install express body-parser
```

Crie um arquivo separado para as funções, um `plants.js` (elas virarão nossos controllers).

Remova as interações com `localStorage` e manipule apenas a variável `defaultPlants`.

Precisamos ter os endpoints:

- `GET /plants`: retorna todas as plantas;

- `GET /plant/:id`: retorna uma planta com o id;

- `DELETE /plant/:id`: deleta uma planta com o id;

- `POST /plant/:id`: sobrescreve a planta com id;

- `POST /plant`: cria uma planta nova;

- `GET /sunny/:id`: retorna uma planta que precisa de sol com o id.

#### Bônus

Crie um banco de dados para persistir os dados das plantas, ao invés de utilizar uma variável.

Divida a aplicação em camadas.

---

## Recursos adicionais

- [SRP em JavaScript](https://medium.com/@felipecesr/princ%C3%ADpios-solid-princ%C3%ADpio-da-responsabilidade-%C3%BAnica-srp-4033232e4abd) {: .external-link target="_blank" rel="noreferrer noopener" }

- [JavaScript Clean Code with SOLID](https://levelup.gitconnected.com/javascript-clean-code-solid-9d135f824180) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Who said SOLID is applicable only in OO languages?](https://hackernoon.com/who-said-solid-is-applicable-only-in-oo-languages-heres-how-you-can-do-it-in-javascript-yyyo3590) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Guia Completo de SOLID](https://medium.com/joaorobertopb/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - SOLID Object-Oriented Design by Sandy Metz](https://www.youtube.com/watch?v=v-2yFMzxqwU) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - Single Responsibility Principle Explained - SOLID Design Principles by Web Dev Simplified](https://www.youtube.com/watch?v=UQqY3_6Epbg) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - Dependency Inversion Principle Explained - SOLID Design Principles by Web Dev Simplified](https://www.youtube.com/watch?v=9oHY5TllWaU) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - Open/Closed Principle Explained - SOLID Design Principles by Web Dev Simplified](https://www.youtube.com/watch?v=-ptMtJAdj40) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Design Principles and Design Patterns - Artigo que cunhou o termo SOLID](https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
