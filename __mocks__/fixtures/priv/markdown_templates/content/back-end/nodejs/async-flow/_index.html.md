## O que vamos aprender

Hoje você vai aprender o que é e como funciona uma operação assíncrona e entender também qual a sua importância no NodeJS. Para isso, você irá rever duas formas de realizar operações assíncronas em JavaScript: callbacks e Promises, e quais as diferenças entre elas.

Além disso, você verá como é feito **input** (leitura) e **output** (escrita) em arquivos localmente com NodeJS!

Por último, você vai aprender como reescrever código que utiliza callbacks de forma que ele passe a utilizar Promises.

---

### Você será capaz de:

- Realizar operações assíncronas utilizando callbacks;

- Realizar operações assíncronas utilizando Promises;

- Ler e escrever arquivos localmente com NodeJS;

- Escrever seus próprios scripts que criam e consomem Promises;

- Reescrever código que usa callbacks para que use Promises.

<%= vimeo "507616584" %>

---

## Por que isso é importante?

O JavaScript é uma linguagem _single-threaded_, ou seja, executa apenas uma operação de cada vez. Isso quer dizer que, quando temos uma operação demorada no código, toda vez que essa operação é executada, o JavaScript precisa esperar que ela termine antes de fazer qualquer outra coisa.

Para o navegador, isso significa travar até mesmo a renderização da tela e deixar o usuário sem ação nenhuma durante todo o tempo que essa operação demorar para ser completada. Para o servidor, isso quer dizer não conseguir processar nenhuma outra requisição até que determinada operação termine.

Sendo assim, para que possamos escrever aplicações com boa performance e um boa experiência para o usuário, é importante sabermos como realizar operações demoradas de forma **assíncrona**, ou seja, **fora do contexto de execução do restante do JavaScript**. Esse conhecimento pode ser, muitas vezes, a diferença entre escrever um código bom e performático e escrever um código que não funciona, ou é extremamente lento.

---

## Conteúdo

###### Tempo sugerido para realização: 80 minutos

### Lendo arquivos com métodos síncronos

Os métodos **assíncronos** não esperam o comando atual terminar para iniciar o próximo. Se quisermos ler um arquivo de maneira assíncrona, o Javascript não vai esperar o arquivo inteiro ser lido para só então dar continuidade ao script. Se quisermos esse comportamento, precisamos de um método **síncrono**.

Para começar, vamos criar uma pasta para nosso projeto, chamada `io-local`. Iniciaremos nosso projeto NodeJS usando o comando `npm init`. Feito isso, vamos criar um arquivo chamado `readFileSync.js` e colocar nele o seguinte código:

> io-local/readFileSync.js

```language-javascript
const fs = require('fs');

const nomeDoArquivo = 'meu-arquivo.txt';

try {
  const data = fs.readFileSync(nomeDoArquivo, 'utf8');
  console.log(data);
} catch (err) {
  console.error(`Erro ao ler o arquivo: ${err.path}`);
  console.log(err);
}
```
{: .line-numbers}

Note que estamos importando um módulo chamado `fs` (também conhecido como `file system`), um módulo nativo do NodeJS para manipulação do sistema de arquivos. Usaremos esse módulo para realizar operações de leitura e escrita em arquivos.

Logo após importarmos o módulo `fs`, criamos uma variável chamada `nomeDoArquivo`, contendo o nome (fixo) do arquivo que vamos ler e, em seguida, chamamos o método `fs.readFileSync`.

Rode o script com `node readFileSync.js`. Gerou um erro, certo? Isso aconteceu porque estamos tentando ler um arquivo que não existe! Vamos resolver esse probleminha daqui a pouco!

##### Método `fs.readFileSync`

Esse método é responsável por ler arquivos e trazer seu conteúdo para dentro do NodeJS. Por ser **síncrono**, ele espera a leitura do arquivo terminar para, só então, atribuir o resultado à constante `data`.

O método `readFileSync` recebe dois parâmetros:

- O nome do arquivo;

- Um parâmetro opcional que, quando é uma string, define o _encoding_ que será utilizado durante a leitura do arquivo.

Mas e se ocorrer um erro na leitura do arquivo?

Com funções síncronas, como `readFileSync`, você deve tratar explicitamente os erros que puderem acontecer. Nesse exemplo, usamos um bloco `try...catch` para capturar quaisquer erros que possam acontecer durante a leitura do arquivo e imprimimos uma mensagem para o usuário no terminal.

Agora vamos resolver o probleminha que estamos tendo ao tentar ler o arquivo!

**Nota**: Antes de continuar, não se esqueça de criar um arquivo `meu-arquivo.txt` com algum conteúdo dentro!

Ao rodar o script `readFileSync.js` com o comando `node readFileSync.js`, você deverá ver o conteúdo do seu arquivo impresso no terminal.

Mas e se tivéssemos outras partes do script que não deveriam esperar a leitura do arquivo ser feita? Para isso, utilizamos um método **assíncrono**, que veremos a seguir.

### Lendo arquivos com métodos assíncronos

Não existe mais dúvida de que dominar a capacidade de realizar operações assíncronas é muito importante para a pessoa que programa em JavaScript. No entanto, não existe apenas uma forma de fazê-lo. Vamos agora entender as duas principais estruturas de código assíncrono presentes no JavaScript: Callbacks e Promises.

Vamos criar um arquivo chamado `readFile.js` dentro da nossa pasta `io-local` e colocar nele o seguinte código:

> io-local/readFile.js

```language-javascript
const fs = require('fs');

const nomeDoArquivo = 'meu-arquivo.txt';

fs.readFile(nomeDoArquivo, 'utf8', (err, data) => {
  if (err) {
    console.error(`Não foi possível ler o arquivo ${nomeDoArquivo}\n Erro: ${err}`);
    process.exit(1);
  }
  console.log(`Conteúdo do arquivo: ${data}`);
});
```

##### Método `fs.readFile`

Esse método é responsável por ler arquivos e trazer seu conteúdo para dentro do NodeJS.

Ele recebe três parâmetros:

- O nome do arquivo;

- Um parâmetro opcional que, quando é uma string, define o _encoding_ que será utilizado durante a leitura do arquivo;

- Uma callback que permite receber e manipular os dados lidos do arquivo.

A callback é uma função que recebe dois parâmetros: `err` e `data`. Caso ocorra um erro durante a leitura do arquivo, o parâmetro `err` virá preenchido com as informações referentes ao erro. Quando esse parâmetro vier vazio, significa que a leitura do conteúdo do arquivo ocorreu sem problemas. Nesse caso, o segundo parâmetro, `data`, virá preenchido com o conteúdo do arquivo.

Rode o comando `node readFile.js`. Você obterá uma saída semelhante a esta: `Conteúdo do arquivo: Meu texto! Meu texto! Meu texto! Meu texto!`.

O tipo de encoding que escolhemos é muito importante. Se não for especificado, por padrão, o arquivo será lido como _raw buffer_, que é um formato muito útil quando estamos enviando dados através de requisições HTTP. No nosso caso, como queremos manipular o conteúdo do arquivo como uma string, então o certo é especificar o encoding.

**Nota**: É importante lembrar que esses dados ficam armazenados em memória. Ou seja, caso você tenha um arquivo de 1GB de texto, você trará 1GB de dados para a memória RAM.

### Callbacks

Primeiro, vamos começar com um conceito genérico de callback. Conforme o próprio nome diz, callback tem a ver com "chamar de volta". Basicamente, toda vez que precisamos que algo seja processado em segundo plano, deveremos registrar uma callback, que será executada quando a operação que solicitamos for concluída. Podemos pensar em callbacks como sendo uma forma de dizermos pro _runtime_ JavaScript um "vê lá e me avisa". 😆

Vamos usar como exemplo a função `readFile` do módulo `fs` do NodeJS:

```language-javascript
const fs = require('fs');

fs.readFile('./arquivo.txt', (err, content) => {
  if (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
    return;
  }

  console.log(`Arquivo lido com sucesso. Conteúdo: ${content.toString('utf8')}`);
});
```
{: .line-numbers}

No exemplo acima, vemos que a função callback recebe dois parâmetros: o primeiro, que chamamos de `err`, é um erro que pode ter ocorrido durante a leitura do arquivo; caso nenhum erro tenha ocorrido, esse parâmetro será `undefined`. O segundo parâmetro é, nesse caso, o conteúdo do arquivo, em forma de uma sequência de bytes, que chamamos de `content`. Caso ocorra um erro na leitura do arquivo, esse parâmetro será `undefined`.

Sabendo disso, já deve dar pra começar a entender o que esse código faz:

1. Primeiro, pedimos que o NodeJS leia o arquivo, e passamos uma função de callback;

2. Quando a leitura do arquivo é concluída ou um erro acontece, nossa função é chamada;

3. Dentro dela, a primeira coisa que fazemos é verificar se existe um erro. Caso exista, escrevemos ele no console e encerramos a execução com o `return`;

4. Caso nenhum erro tenha acontecido, sabemos que nosso arquivo foi lido com sucesso e, portanto, seu conteúdo está no segundo parâmetro, que chamamos de `content`.

Esse formato de callback que recebe dois parâmetros, erro e resultado, não foi utilizado por acaso. Callbacks desse tipo são chamadas de **node-style** callbacks e são, por convenção, a melhor maneira de se estruturar uma callback. **Toda API de módulos nativos do NodeJS utiliza esse mesmo formato de callbacks**. Guarde essa informação, pois ela vai ser importante mais tarde. 😉

#### O lado ruim dos callbacks

A principal desvantagem das callbacks vem do fato de que o resultado de uma operação só existe dentro daquela callback; ou seja: se precisamos executar uma coisa depois da outra, precisamos colocar uma callback dentro da outra. À medida que vamos fazendo isso, vamos aumentando o nível de indentação necessária e, portanto, aumentamos a dificuldade de ler e até mesmo de dar manutenção no código. Vamos ver um exemplo:

Suponhamos que precisamos ler, sequencialmente, três arquivos, e que vamos fazê-lo de forma assíncrona, para não travar nosso servidor. O código para isso ficaria mais ou menos assim:

```language-javascript
const fs = require('fs');

fs.readFile('file1.txt', (err, file1Content) => {
  if (err) return console.log(`Erro ao ler arquivo 1: ${err.message}`);

  console.log(`Lido file1.txt com ${file1Content.byteLength} bytes`);

  fs.readFile('file2.txt', (err, file2Content) => {
    if (err) return console.log(`Erro ao ler o arquivo 2: ${err.message}`);

    console.log(`Lido file2.txt com ${file2Content.byteLength} bytes`);

    fs.readFile('file3.txt', (err, file3Content) => {
      if (err) return console.log(`Erro ao ler o arquivo 3: ${err.message}`);

      console.log(`Lido file3.txt com ${file3Content.byteLength} bytes`);
    });
  });
});
```
{: .line-numbers}

Com três níveis de indentação, já dá pra perceber que o código começa a ficar menos legível. Imagina como seria se tivéssemos ainda mais níveis de callbacks aninhadas?

A isso damos o nome de **callback hell**, que é quando temos uma callback dentro de outra, dentro de outra, dentro da outra etc., de forma que o código fica horrível de ler. Uma imagem que ilustra muito bem a callback hell é essa:

<%= figure(%{src: "/back-end/nodejs/async-flow/images/callback_hell.png", class: "text-center rounded mx-auto d-block", width: "788px", height: "auto"}) %>

Uma forma de "resolver" o problema é quebrar o código em infinitas funções menores, que não fazem nada além de chamar a próxima callback, mas isso também não é tão simples, organizado, ou mesmo bonito.

Mas então como resolvemos isso?

### Promises

Promises foram introduzidas à especificação do JavaScript em 2015 como uma forma de resolver a potencial *bagunça* trazida pelas callbacks. Sua ideia é um tanto quanto simples, mas faz uma grande diferença quando o assunto é melhorar a legibilidade do código.

O conceito de uma Promise, ou um objeto Promise, não é muito diferente da ideia de uma *promessa* na vida real: alguém se compromete com outra pessoa a fazer algo; essa promessa pode ser cumprida e, portanto, **resolvida**, ou algo pode dar errado, fazendo com que não seja possível cumprir a promessa, que será então **rejeitada**. Promises no JavaScript funcionam do mesmo jeito: uma promessa é criada, e dentro dela existe código a ser executado. Se o código é executado sem nenhum problema, a Promise é resolvida através da função `resolve`, que veremos daqui a pouco. Se algo dá errado durante a execução do código, a Promise é rejeitada através da função `reject`.

<big>OK, mas o que isso tem a ver com callbacks e com fluxo assíncrono?</big>

A grande sacada das Promises está em como tratamos o sucesso ou o erro. Enquanto com callbacks temos apenas uma função que recebe tanto o sucesso quanto o erro, nas promises temos uma forma de registrar uma callback para sucesso e outra forma de registrar uma callback para erros.

Antes de continuar assista o vídeo abaixo para entender como utilizar promises.

<%= vimeo "507621383" %>

Exemplos feito no vídeo:

Exemplo 1: Tratando erros de forma síncrona.

```language-javascript
function dividirNumeros(num1, num2) {
  if (num2 == 0) throw new Error("Não pode ser feito uma divisão por zero");

  return num1 / num2;
}

try {
  const resultado = dividirNumeros(2, 1);
  console.log("resultado: %s", resultado);
} catch (e) {
  console.log(e.message);
}
```
{: .line-numbers}

Exemplo 2: Tratando erros de forma assíncrona.

```language-javascript
function dividirNumeros(num1, num2) {
  const promise = new Promise((resolve, reject) => {
    if (num2 == 0) reject(Error("Não pode ser feito uma divisão por zero"));

    const resultado = num1 / num2;
    resolve(resultado)
  });

  return promise;
}

dividirNumeros(2, 1)
  .then(result => console.log("sucesso: %s", result))
  .catch(err => console.log("erro: %s", err.message));
```
{: .line-numbers}


Pra entender melhor, vamos dar uma olhada num exemplo prático: vamos escrever uma função capaz de ler arquivos utilizando Promises. Antes de começar, no entanto, vamos dar uma olhada na sintaxe da criação de uma Promise.

Sempre que precisarmos criar uma nova Promise, invocaremos o construtor através da palavra-chave `new`. Para esse construtor, devemos passar uma função. Essa função recebe outras duas funções como parâmetros: `resolve` e `reject`. É aqui, dentro dessa função, que escreveremos o código que será executado de forma assíncrona dentro da Promise, e essa função será responsável por resolvê-la ou rejeitá-la. Isso tudo fica mais ou menos assim:

```language-javascript
const p = new Promise((resolve, reject) => {
  // Aqui é onde vamos realizar a lógica que precisamos
  // para resolver ou rejeitar a promise
});
```
{: .line-numbers}

Feito isso, o próximo passo é escrever o código que, de fato, resolve a Promise. Para isso, vamos criar uma função que retorna uma Promise, para que possamos usar essa função depois. Vamos colocar, dentro da Promise, o código de que precisamos para realizar a leitura do arquivo.

```language-javascript
const fs = require('fs');

function readFilePromise (fileName) {
  return new Promise((resolve, reject) => {

    fs.readFile(fileName, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });

  });
}
```
{: .line-numbers}

Vamos entender o que estamos fazendo aqui:

- Recebemos, como parâmetro, o nome do arquivo que queremos ler, na linha 3;

- Criamos e retornamos uma nova Promise, na linha 4;

- Chamamos o módulo nativo do node, `fs`, para realizar a leitura desse arquivo, na linha 6;

- Na linha 7, dentro da callback que passamos para a função `readFile`, verificamos se ocorreu um erro. Se sim, **rejeitamos** a Promise e encerramos a execução;

- Caso não tenha acontecido nenhum erro, **resolvemos** a Promise com o resultado da leitura do arquivo.

Dessa forma, quem chamar nossa função poderá consumir os resultados da leitura do arquivo ou tratar qualquer erro que ocorrer utilizando Promises.

Antes de prosseguir, para entender como podemos consumir uma Promise, vamos nos atentar a alguns detalhes:

- A função que passamos para a Promise só consegue retornar um resultado através da função `resolve` que ela recebe. Por isso, o fato de chamarmos `return reject(err)` na linha 7 não faz diferença, já que a Promise será rejeitada, e o retorno da callback passada para `readFile` é simplesmente ignorado. Na verdade, isso geralmente é válido para qualquer callback. Como callbacks geralmente são chamadas para lidar com resultados, o que acontece dentro delas raramente importa para a função que a chamou ou que recebeu esses resultados.

- `resolve` e `reject` são os nomes das funções que a promise passa para a função que recebe. No entanto, para nós, elas são apenas parâmetros que são passados pra nossa função; logo, não importa muito o nome que damos a elas, pois para o JavaScript isso é indiferente. De qualquer forma, chamar essas funções de qualquer outra coisa não é considerado uma prática muito boa, pois pode dificultar a legibilidade do código.

Dito isso, vamos agora entender como podemos consumir essa Promise. Vimos antes que Promises permitem que a callback de erro seja registrada de determinada forma e que callbacks de sucesso sejam registradas de outra forma. Note o uso do plural aqui: utilizando Promises, podemos definir mais de uma callback de sucesso.

Vamos a um exemplo de como podemos consumir a Promise que estamos retornando da nossa função logo acima:

```language-javascript
// ...

readFilePromise('./file.txt')
  .then((content) => {
    console.log(`Lido arquivo com ${content.byteLength} bytes`);
  })
  .catch((err) => {
    console.error(`Erro ao ler arquivo: ${err.message}`);
  });
```
{: .line-numbers}

Pode parecer algo simples e bobo no exemplo acima, mas essa funcionalidade nos permite criar estruturas de *pipeline*, em que uma operação recebe como entrada o resultado da operação anterior, e esses resultados todos podem ser compostos e formar um único resultado de forma extremamente fácil!

Para demonstrar isso, e como Promises tornam o código mais legível, vamos reescrever o código que nos levou ao callback hell mas, dessa vez, utilizando Promises:

```language-javascript
const fs = require('fs');

function readFilePromise (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
}

readFilePromise('file1.txt')
  .then((content) => {
    console.log(`Lido file1.txt com ${content.byteLength} bytes`);
    return readFilePromise('file2.txt');
  })
  .then(content => {
    console.log(`Lido file2.txt com ${content.byteLength} bytes`);
    return readFilePromise('file3.txt');
  })
  .then((content) => {
    console.log(`Lido file3.txt com ${content.byteLength} bytes`);
  })
  .catch((err) => {
    console.log(`Erro ao ler arquivos: ${err.message}`);
  });
```
{: .line-numbers}

E nada mais de callback hell! Agora temos um código muito mais simples de interpretar e que não vai nos dar dor de cabeça quando precisarmos modificar. 😁

Além do `new Promise`, há também outras maneiras de se criar uma promise. Para demonstrá-las, vamos usar como exemplo a função `writeFile` do módulo `fs` do NodeJS.

### Escrevendo dados em arquivos

Escrever arquivos de texto é tão fácil quanto lê-los! Assim como o módulo `fs` tem o método `readFile`, há também o método `writeFile`.

> io-local/writeFile.js

```language-javascript
const fs = require('fs');

fs.writeFile('./meu-arquivo.txt', 'Meu textão', (err) => {
  if (err) {
    throw err;
  }
  console.log('Arquivo salvo');
});
```

Rode o script com `node writeFile.js`. Repare que o conteúdo do `meu-arquivo.txt` foi alterado para "Meu textão".

Como dito anteriormente, há também outras maneiras de se criar uma promise. Uma delas que você já viu diversas vezes é utilizando o `async/await`:

```language-javascript
const fs = require('fs');

const text = 'Texto teste 2';

async function writingFiles() {
  await fs.writeFile('./meu-arquivo.txt', text, (err) => {
    if (err) return console.log(err);
    console.log(text);
  })
}

writingFiles();
```

Note que bastou adicionar o `async` na declaração da função principal, e o `await` na função `writeFile`.

Há também um método nativo do módulo `fs` que transforma suas funções em promises. Para utilizá-lo, basta modificar a importação do módulo, como no exemplo abaixo:

```language-javascript
const fs = require('fs').promises;

const text = 'Texto teste 3';

function writingFiles() {
  fs.writeFile('./meu-arquivo.txt', text);
}

writingFiles();
```

Por último, há também, no módulo `util`, uma propriedade chamada `promisify`. Ela transforma o parâmetro recebido em uma promise. Veja no exemplo:

```language-javascript
const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

const text = 'Texto teste 4';

function writingFiles() {
  writeFile('./meu-arquivo.txt', text);
}

writingFiles();
```

**Nota:** não estamos utilizando tratamento de erro nos exemplos acima por fins didáticos. É recomendável que isso sempre seja feito.

Ainda sobre o `writeFile`, você pode especificar algumas opções na escrita de arquivos passando um terceiro parâmetro opcional para os métodos `writeFile` e `writeFileSync`. A opção `flag` especifica como o arquivo deve ser aberto e manipulado. O padrão é `'w'`, que especifica que o arquivo deve ser aberto para escrita. Se o arquivo não existir, ele é criado. Caso contrário, ele é reescrito, ou seja, tem seu conteúdo apagado antes de o novo conteúdo ser escrito. A flag `'wx'`, por exemplo, funciona como `'w'`, mas lança um erro caso o arquivo já exista:

```language-javascript
const fs = require('fs');

fs.writeFile('./meu-arquivo.txt', 'Eu estive aqui :eyes:', { flag: 'wx' }, function (err) {
  // A flag wx abre o arquivo para escrita caso ele não exista
  /*
    Flag =>
      w: write
      x: exclusive
  */
  // Se o arquivo existir, um erro é retornado
  if (err) throw err;
  console.log('Arquivo salvo');
});
```
{: .line-numbers}

Note que, quando rodamos o código com a flag `wx`, tentando escrever no arquivo `meu-arquivo.txt`, é gerado o seguinte erro:

```language-bash
[...]
[Error: EEXIST: file already exists, open './meu-arquivo.txt'] {
  errno: -17,
  code: 'EEXIST',
  syscall: 'open',
  path: './meu-arquivo.txt'
}
```

No código, mude o nome do arquivo para `meu-novo-arquivo.txt` e rode novamente o script com `node writeFileSync.js`. Repare que foi criado um novo arquivo com o nome que utilizamos e com o conteúdo `Eu estive aqui :eyes:`.

Você pode ler mais sobre as flags disponíveis [aqui.](https://nodejs.org/api/fs.html#fs_file_system_flags) {: .external-link target="_blank" rel="noreferrer noopener" }

#### Rodando tudo junto

Como vimos agora há pouco, Promises são executadas assim que são criadas. Isso quer dizer que, no código abaixo, todos os arquivos serão lidos ao mesmo tempo e, portanto, não teremos uma forma de saber quando cada um vai terminar de ser lido. Mas e se precisarmos do resultado da leitura dos três arquivos?

Entra no palco: `Promise.all`!

O `Promise.all` é um método da Promise que nos permite passar um array de Promises e receber, de volta, uma única Promise, que será resolvida com os resultados de todas as Promises, assim que todas elas forem resolvidas. Ele também nos permite utilizar um único `catch`, que será chamado caso qualquer uma das Promises seja rejeitada.

Vamos reescrever quase o mesmo código que fizemos acima, mas, desta vez, vamos escrever, no final, a soma do tamanho de todos os arquivos.

```language-javascript
const fs = require('fs');

function readFilePromise (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
}

Promise.all([
  readFilePromise('file1.txt'),
  readFilePromise('file2.txt'),
  readFilePromise('file3.txt')
])
.then(([file1, file2, file3]) => {
  const fileSizeSum = file1.byteLength + file2.byteLength + file3.byteLength;
  console.log(`Lidos 3 arquivos totalizando ${fileSizeSum} bytes`);
})
.catch((err) => {
  console.error(`Erro ao ler arquivos: ${err.message}`);
})
```
{: .line-numbers}

Ótimo! Agora, o NodeJS lê todos os arquivos ao mesmo tempo, ao invés de esperar para que o anterior termine de ser lido para que a leitura do próximo comece. Isso faz com que nosso código fique mais rápido no final das contas, pois estamos fazendo mais de uma coisa de cada vez.

---

## Vamos fazer juntos!

Agora que entendemos como funciona o fluxo assíncrono no NodeJS, e como podemos utilizar callbacks e promises para manipular esse fluxo, vamos ver na prática como isso torna nossa vida mais fácil!

Bora pro slack, onde vai estar o link do Zoom. 😉

---

## Exercícios

**Exercício 1**: Crie uma função que retorna uma promise.

1. Essa função deve receber três parâmetros, fazendo o tratamento de erro caso algum dos parâmetros não seja um número.
2. Caso algum dos parâmetros não seja do tipo `Number`, rejeite a promise e imprima na tela a frase "Digite apenas números".
3. Caso todos os parâmetros sejam do tipo `Number`, você deve somar os dois primeiros. 
4. Depois, pegue o resultado da soma e multiplique pelo terceiro parâmetro, e caso seja menor que 50, rejeite a promise com a mensagem "Valor muito baixo". 
5. Caso contrário, aceite a promise, imprimindo o resultado da multiplicação na tela.


**Exercício 2**: Agora, pegue a função do exercício 1 e refatore ela para `async/await`.

1. Sua função tem que funcionar exatamente igual à do exercício 1, mas você não pode utilizar nenhum `.then` em seu código.

Para cada exercício abaixo, escreva o script primeiro utilizando callbacks, depois promises e, por último, async/await.

**Exercício 3**: Crie um script que, sem utilizar módulos de terceiros:

**DICA**: Leia sobre o módulo [readline do node](https://nodejs.org/api/readline.html) {: .external-link target="_blank" rel="noreferrer noopener" }.

1. Pergunte ao usuário qual arquivo deseja ler.

2. Leia o arquivo indicado (Não se esqueça de realizar tratamento de erros caso o usuário informe um arquivo que não existe).

3. Escreva na tela o conteúdo do arquivo e a quantidade de bytes.

**Exercício 4**: Crie um script que, sem utilizar módulos de terceiros, substitua uma palavra por outra em um arquivo escolhido pelo usuário com o seguinte fluxo:

**DICA**: Leia sobre o módulo [readline do node](https://nodejs.org/api/readline.html) {: .external-link target="_blank" rel="noreferrer noopener" }.

1. Perguntar ao usuário qual arquivo deseja utilizar.

2. Ler o arquivo (Não se esqueça de realizar tratamento de erros caso o usuário informe um arquivo que não exista).

3. Solicitar a palavra a ser substituída.

4. Solicitar a nova palavra, que deve substituir a palavra anterior.

5. Mostrar o novo conteúdo do arquivo e realizar a substituição.

6. Perguntar o nome do arquivo de destino.

7. Salvar o novo arquivo no caminho de destino (caso o usuário informe um arquivo já existente, confirmar antes de sobrescrever).

Dica: Utilize a classe RegExp do JS para substituir todas as ocorrências da palavra com `replace(new RegExp(palavra, 'g'), novaPalavra)`.

---

## Recursos Adicionais

- [Asynchrony: Under the Hood - Shelley Vohr - JSConf EU](https://www.youtube.com/watch?v=SrNQS8J67zc) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Entendendo Promises de uma vez por todas](https://medium.com/trainingcenter/entendendo-promises-de-uma-vez-por-todas-32442ec725c2) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Using Promises | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Promises | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Entenda tudo sobre Async/Await](https://showmethecode.com.br/async-await/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Entendendo funções callback em JavaScript](https://medium.com/totvsdevelopers/entendendo-funções-callback-em-javascript-7b500dc7fa22) {: .external-link target="_blank" rel="noreferrer noopener" }

- [ECMAScript proposal: Top-level await](https://github.com/tc39/proposal-top-level-await) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
