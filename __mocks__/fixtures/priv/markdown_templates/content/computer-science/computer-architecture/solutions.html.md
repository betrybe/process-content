## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

**Exercício 1**: Crie um projeto que irá simular a arquitetura que vimos em aula de uma maneira bem simples, ela terá um arquivo principal para a execução do programa que representará nosso _Sistema Operacional_ e duas classes que representarão a _Memória Principal_ e a _Secundária_.

Cada tipo de memória irá armazenar os dados de fato na memória que ela representa, sendo a Principal armazenando tudo em memória RAM e a secundária no disco através do `fs` (File System) e através do NodeJS estaremos fazendo chamadas ao Sistema Operacional para realizar essas tarefas para gente, pois ele melhor do que ninguém saberá utilizar as memórias. O objetivo do nosso script será realizar a soma de um array de números aleatórios utilizando as duas implementações de memória.

`MainMemory.js`

```language-javascript
class MainMemory {
  constructor() {
    this.loadedMemory = [];
  }

  load(value) {
    this.loadedMemory.push(value);
  }

  get(index) {
    return parseFloat(this.loadedMemory[index]) || 0;
  }

  clean() {
    this.loadedMemory = [];
  }
}

module.exports = MainMemory;
```
{: .line-numbers}

`SecondaryMemory.js`

```language-javascript
const fs = require('fs');

const DISK_PATH = './disk';

class SecondaryMemory {
  load(value) {
    const disk = fs.readdirSync(DISK_PATH);

    const nextFileName = `${DISK_PATH}/cel${disk.length}`;

    fs.writeFileSync(nextFileName, value);
  }

  get(index) {
    const fileName = `${DISK_PATH}/cel${index}`;

    if (!fs.existsSync(fileName)) return 0;

    return parseFloat(fs.readFileSync(fileName));
  }

  clean() {
    fs.rmdirSync(DISK_PATH, { recursive: true });
    fs.mkdirSync(DISK_PATH);
  }
}

module.exports = SecondaryMemory;
```
{: .line-numbers}

`operatingSystem.js`

```language-javascript
const SecondaryMemory = require('./SecondaryMemory')
const MainMemory = require('./MainMemory')

const secondaryMemory = new SecondaryMemory()
const mainMemory = new MainMemory()

// Conjunto de números aleatórios a serem somados
const randomNumbers = [
  '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689',
  '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689',
  '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689',
  '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689', '3212323', '1312312', '26524', '3245143', '47345', '55324', '6824322', '736346', '82355', '9576898', '10345689'
]

// Carregando todos os números em memória (principal e secundária)
randomNumbers.forEach((number) => {
  secondaryMemory.load(number)
  mainMemory.load(number)
})

// Iterando sobre os números carregados na MEMORIA PRINCIPAL e realizando a soma
let initialMainMemoryTime = Date.now()
let mainMemorySum = 0

for (let i = 0; i < randomNumbers.length; i++) {
  mainMemorySum += mainMemory.get(i)
}

console.log(`Memória Principal\nSoma: ${mainMemorySum} Tempo gasto: ${Date.now() - initialMainMemoryTime}ms\n`)

// Iterando sobre os números carregados na MEMORIA SECUNDARIA e realizando a soma
let initialSecondaryMemoryTime = Date.now()
let secondaryMemorySum = 0
for (let i = 0; i < randomNumbers.length; i++) {
  secondaryMemorySum += secondaryMemory.get(i)
}

console.log(`Memória Secundária\nSoma: ${secondaryMemorySum} Tempo gasto: ${Date.now() - initialSecondaryMemoryTime}ms`)
```
{: .line-numbers}

E para executar:

```language-shell
$ node operatingSystem.js
```

**Exercício 2**: Agora vamos explorar o papel do sistema operacional e o gerenciamento de recursos, para isso utilizaremos os módulos nativos do NodeJS, para solicitar chamadas do SO que nos mostre informações dos recursos de nossa máquina. Crie um script chamado `resources.js` e utilize-o para exibir no console as seguintes informações:

1. A _plataforma_ que estamos utilizando, por exemplo: `linux`, `win32`, `darwin`, etc., a arquitetura, por exemplo, `x32` ou `x64`, e a versão (release). Para isso utilize o módulo [os do NodeJS](https://nodejs.org/api/os.html) {: .external-link target="_blank" rel="noreferrer noopener" }

```language-javascript
const os = require('os')

console.log(`Plataforma: ${os.platform()}`)
console.log(`Versão: ${os.release()}`)
console.log(`Arquitetura: ${os.arch()}`)
```
{: .line-numbers}

2. Adicione o código para exibir a quantidade de _cores_ da sua CPU e o modelo e a velocidade em **gigahertz - GHz** de cada um (utilize o valor vindo em `speed` e faça a conversão 😎).

```language-javascript
const os = require('os')

const cpus = os.cpus()
console.log(`CPU ${cpus.length} cores:`)

cpus.forEach((core, index) => {
  console.log(`Core ${index + 1} - Modelo: ${core.model} | Velocidade ${core.speed / 1000}GHz`)
})
```
{: .line-numbers}

3. Exiba também a quantidade total de memória RAM disponível em sua máquina **em gigabytes - GB** (faça a conversão também 😉).

```language-javascript
const os = require('os')

console.log(`Memória total: ${os.totalmem() / 1024 / 1024 / 1024}GB`)
```
{: .line-numbers}

**Exercício 3**: Faça um script que, a cada intervalo de segundo, mostre no console a memória utilizada do sistema operacional _vs_ a memória total (ambos em **megabytes**).

```language-javascript
const os = require('os')

setInterval(() => {
  const totalMemory = os.totalmem() / 1024 / 1024
  const freeMemory = os.freemem() / 1024 / 1024

  const usedMemory = (totalMemory - freeMemory).toFixed(2)

  console.log(`Uso de memória: ${usedMemory}/${totalMemory}MB`)
}, 1000)
```
{: .line-numbers}

**Exercício 4**: Faça um script que exibe o seu respectivo `process id` utilizando o módulo [process do NodeJS](https://nodejs.org/api/process.html) {: .external-link target="_blank" rel="noreferrer noopener" } e então fique em execução por um determinado tempo. Agora utilizando os comandos de monitoramento visto no conteúdo, exiba os processos em execução e então identifique o seu processo.

```language-javascript
console.log(`Process ID: ${process.pid}`)
```
{: .line-numbers}

```language-shell
$ ps aux | grep <PROCESS ID>
```
