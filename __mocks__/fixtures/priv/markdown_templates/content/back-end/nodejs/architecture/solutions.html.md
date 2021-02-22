## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

**Exercício 1**: Utilizando apenas funções síncronas, crie um script que leia dois arquivos e:

1. Escreva, no terminal, para cada arquivo, qual foi o tempo necessário para lê-lo do disco;
2. Escreva, no terminal, para cada arquivo, seu tamanho em bytes;
3. Escreva, no terminal, ao final do processo, qual o tempo total necessário para a execução completa do script.

Dica: utiliza a função `readFileSync` do módulo `fs` do Node.js.

**Resolução**:

1. Criar um novo pacote Node.js, conforme vimos na aula passada;

2. Criar os dois arquivos que serão lidos. O conteúdo pode ser extraído de um gerador de lorem-ipsum. Chamaremos os arquivos de `file1.txt` e `file2.txt`;

3. Criar, na mesma pasta, o script que realizará a leitura do arquivo, que deve ficar parecido com o seguinte script:

```language-javascript
const fs = require('fs');

const startScript = Date.now();

const startFile1 = Date.now();
const file1 = fs.readFileSync('./file1.txt');
const timeFile1 = Date.now() - startFile1;

const startFile2 = Date.now();
const file2 = fs.readFileSync('./file2.txt');
const timeFile2 = Date.now() - startFile2;

const timeScript = Date.now() - startScript;

console.log(`file1.txt: lidos ${file1.byteLength} bytes em ${timeFile1} milissegundos`);
console.log(`file2.txt: lidos ${file2.byteLength} bytes em ${timeFile2} milissegundos`);
console.log(`script concluído em ${timeScript} milissegundos`);
```

**Exercício 2**: Crie um script que realize as mesmas funcionalidades que o script do exercício 1, mas utilizando apenas funções assíncronas, de forma que os dois arquivos sejam lidos ao mesmo tempo.

Dica: utiliza a função `readFile` do módulo `fs` do Node.js.

**Resolução**:

1. Criar um novo pacote Node.js;

2. Criar os dois arquivos que serão lidos (você pode utilizar os mesmos arquivos de antes);

3. Criar o script, que deve ser mais ou menos assim:

```language-javascript
const fs = require('fs');

const startScript = Date.now();
let timeFile1;
let timeFile2;
let timeScript;

function printScriptEnd () {
  if (timeFile1 && timeFile2) {
    timeScript = Date.now() - startScript;
    console.log(`script concluído em ${timeScript} milissegundos`);
  }
}

const startFile1 = Date.now();

fs.readFile('./file1.txt', (err, file1) => {
  timeFile1 = Date.now() - startFile1;
  console.log(`file1.txt: lidos ${file1.byteLength} bytes em ${timeFile1} milissegundos`);
  printScriptEnd();
});

const startFile2 = Date.now();

fs.readFile('./file2.txt', (err, file2) => {
  timeFile2 = Date.now() - startFile2;
  console.log(`file2.txt: lidos ${file2.byteLength} bytes em ${timeFile2} milissegundos`);
  printScriptEnd();
});
```

**Exercício 3**: Crie um script NodeJS que, utilizando apenas funções síncronas e módulos padrão do NodeJS, receba o nome de uma pasta e:

1. Escreva a quantidade de arquivos existentes dentro dela;
2. Escreva a soma do tamanho de todos os arquivos presentes nela;
3. Escreva no terminal o tempo total de execução do script.

Dica: utiliza a função `readdirSync` do módulo `fs` do Node.js.

**Resolução**:

1. Criar um novo pacote Node.js;

2. Criar uma pasta com alguns arquivos dentro (podem ser cópias dos arquivos utilizados nos exercícios anteriores);

3. Criar o script, que deve ficar assim:

```language-javascript
const fs = require('fs');

const scriptStart = Date.now();

const fileNames = fs.readdirSync('./folder');

console.log(`encontrados ${fileNames.length} arquivos`);

let fileSizeTotal = 0;

for (const fileName of fileNames) {
  const file = fs.readFileSync(`./folder/${fileName}`);
  fileSizeTotal += file.byteLength;
}

console.log(`tamanho total dos arquivos: ${fileSizeTotal} bytes`);

const scriptTime = Date.now() - scriptStart;
console.log(`script concluído em ${scriptTime} milissegundos`);
```

**Exercício 4**: Recrie o script do exercício 3 utilizando apenas funções assíncronas.

Dica: utiliza a função `readdir` do módulo `fs` do Node.js.

**Resolução**:

1. Criar um novo pacote Node.js;

2. Criar uma pasta com alguns arquivos dentro (pode ser a mesma pasta do exercício anterior);

3. Criar o script com um resultado final parecido com esse:

```language-javascript
const fs = require('fs');

const scriptStart = Date.now();

fs.readdir('./folder', (err, fileNames) => {
  console.log(`encontrados ${fileNames.length} arquivos`);
  const fileSizes = [];

  function logEnd() {
    if (fileSizes.length === fileNames.length) {
      const fileLengthSum = fileSizes.reduce((total, size) => total + size);
      const scriptTime = Date.now() - scriptStart;

      console.log(`lidos ${fileLengthSum} bytes em ${scriptTime} milissegundos`)
    }
  }

  fileNames.forEach((fileName) => {
    fs.readFile(`./folder/${fileName}`, (err, file) => {
      fileSizes.push(file.byteLength);
      logEnd();
    });
  });
});
```
