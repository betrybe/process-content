## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

**Exercício 1**: Crie uma função que retorna uma promise:

1. Essa função deve receber 3 parâmetros, fazendo o tratamento de erro caso algum dos parâmetros não seja um número.
2. Caso algum dos parâmetros não seja do tipo `Number` rejeite a promise e imprima na tela a frase "Digite apenas números".
3. Caso todos os parâmetros sejam do tipo `Number` você deve somar os dois primeiros. 
4. Depois pegue o resultado da soma e multiplique pelo terceiro parâmetro e caso seja menor que 50, rejeite a promise com a mensagem "Valor muito baixo". 
5. Caso contrário, aceite a promise imprimindo o resultado da multiplicação na tela.

```language-js
function mathOperations(x, y, z) {
  return new Promise((resolve, reject) => {
    if ( typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
     return reject(new Error('Digite apenas números');
    } 
    resolve(x + y);
  })
    .then((r) => {
      if (r*z < 50){
        return Promise.reject(new Error('Valor muito baixo'));
      }
      return r*z;
    })
}
```

**Exercício 2**: Agora, pegue a função do exercício 1 e refatore ela para `async/await`.

1. Sua função tem que funcionar exatamente igual a do exercício 1, mas você não pode utilizar nenhum `.then` em seu código.

```language-js
const mathOperations = async (x, y, z) => {
  if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
    return Promise.reject(new Error('Digite apenas números'));
  }
  const sum = x + y;
  const mul = sum * z;
  return mul < 50 ? Promise.reject(new Error('Valor muito baixo')) : mul;
};
```

Para cada exercício, escreva o script primeiro utilizando callbacks, depois promises e, por último, async/await.

**Exerício 3**: Crie um script que, sem utilizar módulos de terceiros:

1. Pergunte ao usuário qual arquivo deseja ler.

2. Leia o arquivo indicado (Não se esqueça de realizar tratamento de erros caso o usuário informe um arquivo que não existe).

3. Escreva na tela o conteúdo do arquivo, a quantidade de bytes e o tempo gasto para ser lido.

**Resolução**

**Utilizando callback**

```language-js
const fs = require('fs');
const path = require('path');
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o caminho do arquivo que deseja ler: ', (answer) => {
  fs.readFile(path.resolve(__dirname, answer), (err, file) => {
    if (err) return console.log(`Erro ao ler arquivo: ${err.message}`);

    console.log(file.toString('utf8'));
    console.log('---------------------');
    console.log(`Arquivo de ${file.byteLength} bytes, lido em ${scriptEnd} ms`);

    rl.close();
  });
});
```

**Utilizando Promises**

```language-js
const fs = require('fs');
const util = require('util');
const path = require('path');
const readline = require('readline');

const readFile = util.promisify(fs.readFile);

function question(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

question('Digite o caminho do arquivo que deseja ler: ')
  .then((answer) => readFile(path.resolve(__dirname, answer)))
  .then((file) => {
    console.log(file.toString('utf8'));
    console.log('---------------------');
    console.log(`Arquivo de ${file.byteLength} bytes, lido em ${scriptEnd} ms`);
  })
  .catch(err => console.log(`Erro ao ler arquivo: ${err.message}`));
```

**Utilizando async/await**

```language-js
const fs = require('fs');
const util = require('util');
const path = require('path');
const readline = require('readline');

const readFile = util.promisify(fs.readFile);

function question(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function start() {
  const answer = await question('Digite o caminho do arquivo que deseja ler: ');

  try {
    const file = await readFile(path.resolve(__dirname, answer));
    console.log(file.toString('utf8'));
    console.log('---------------------');
    console.log(`Arquivo de ${file.byteLength} bytes, lido em ${scriptEnd} ms`);
  } catch (err) {
    console.log(`Erro ao ler arquivo: ${err.message}`);
  }
};

start();
```

**Exercício 4**: Crie um script que, sem utilizar módulos de terceiros, substitua uma palavra por outra em um arquivo escolhido pelo usuário com o seguinte fluxo:

1. Perguntar ao usuário qual arquivo deseja utilizar.

2. Ler o arquivo (Não se esqueça de realizar tratamento de erros caso o usuário informe um arquivo que não exista).

3. Solicitar a palavra a ser substituída.

4. Solicitar a nova palavra, que deve substituir a palavra anterior.

5. Mostrar o novo conteúdo do arquivo e realizar a substituição.

6. Perguntar o nome do arquivo de destino.

7. Salvar o novo arquivo no caminho de destino (Caso o usuário informe um arquivo já existente, confirmar antes de sobrescrever).

**Resolução**

**Utilizando callbacks**

```language-js
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Informe o caminho do arquivo: ', (sourcePath) => {
  fs.readFile(path.resolve(__dirname, sourcePath), (err, file) => {
    if (err) return console.log(`Erro ao ler arquivo: ${err.message}`);

    rl.question('Informe o texto que deseja substituir: ', (oldText) => {
      rl.question('Informe o novo texto: ', (newText) => {
        const newContent = file.toString('utf8').replace(new RegExp(oldText, 'g'), newText);

        console.log('Novo conteúdo');
        console.log('-----------------');
        console.log(newContent);

        rl.question('Digite o caminho do arquivo de destino: ', (destPath) => {
          fs.readFile(path.join(__dirname, destPath), (err, file) => {
            if (!err) {
              rl.question('Deseja realmente sobrescrever o arquivo? (s/n): ', (proceed) => {
                if (proceed !== 's') return rl.close();

                fs.writeFile(path.join(__dirname, destPath), newContent, () => {
                  rl.close();
                });
              });
              return;
            }

            fs.writeFile(path.join(__dirname, destPath), newContent, () => {
              rl.close();
            });
          });
        });
      });
    });
  });
});
```

**Utilizando Promises**

```language-js
const fs = require('fs');
const util = require('util');
const path = require('path');
const readline = require('readline');

const readFile = util.promisify(fs.readFile);

function question(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

question('Informe o caminho do arquivo: ')
  .then((sourcePath) => {
    return readFile(path.join(__dirname, sourcePath));
  })
  .then((file) => {
    question('Informe o texto que deseja substituir: ')
      .then((oldText) => {
        question('Informe o novo texto: ')
          .then((newText) => {
            const newContent = file.toString('utf8').replace(new RegExp(oldText, 'g'), newText);

            console.log('Novo conteúdo');
            console.log('-----------------');
            console.log(newContent);

            question('Digite o caminho do arquivo de destino: ')
              .then((destPath) => {
                readFile(path.join(__dirname, destPath))
                  .then((file) => {
                    question('Deseja realmente sobrescrever o arquivo? (s/n): ')
                      .then((proceed) => {
                        if (proceed !== 's') return;

                        fs.writeFile(path.join(__dirname, destPath), newContent, () => { });

                        return;
                      });
                  })
                  .catch(() => {
                    fs.writeFile(path.join(__dirname, destPath), newContent, () => { });
                  });;
              });
          });
      });
  })
  .catch(err => console.log(`Erro ao ler arquivo: ${err.message}`));
```

**Utilizando async / await**

```language-js
const fs = require('fs');
const util = require('util');
const path = require('path');
const readline = require('readline');

const readFile = util.promisify(fs.readFile);

function question(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function start() {
  const sourcePath = await question('Informe o caminho do arquivo: ');

  try {
    const file = await readFile(path.join(__dirname, sourcePath));
    const oldText = await question('Informe o texto que deseja substituir: ');
    const newText = await question('Informe o novo texto: ');

    const newContent = file.toString('utf8').replace(new RegExp(oldText, 'g'), newText);

    console.log('Novo conteúdo');
    console.log('-----------------');
    console.log(newContent);

    const destPath = await question('Digite o caminho do arquivo de destino: ');
    const destFile = await readFile(path.join(__dirname, destPath))
      .then(async (file) => {
        const proceed = await question('Deseja realmente sobrescrever o arquivo? (s/n): ');

        if (proceed !== 's') return;

        fs.writeFile(path.join(__dirname, destPath), newContent, () => { });

        return;
      })
      .catch(() => {
        fs.writeFile(path.join(__dirname, destPath), newContent, () => { });
      });
  } catch (err) {
    console.log(`Erro ao ler arquivo: ${err.message}`);
  }
}

start();
```
