## O que vamos aprender?

Hoje você aprenderá a criar APIs que suportam upload de arquivos.

---

### Você será capaz de:

- Fazer upload de arquivos em APIs REST;

- Salvar arquivos no servidor através de uma API REST;

- Consultar arquivos do servidor através de uma api REST.

---

## Por que isso é importante?

Vamos dar só um exemplo: você já precisou enviar um arquivo pelo Google Drive, Whatsapp ou Facebook? Uma foto, um vídeo, uma planilha do Excel... Sabe como isso é importante no dia a dia, né? Então, é sobre isso que vamos aprender hoje!

---

## Conteúdo

###### Tempo sugerido para realização: 80 minutos

### Upload de arquivos com Multer e Express

Imagine que você está usando uma aplicação de um cliente de email e quer enviar um arquivo como anexo, ou que você quer implementar, no blog que desenvolveu na última aula, uma funcionalidade que permite fazer upload de posts através de um arquivo de texto. Em casos como este, é necessário o tráfego de arquivos via rede.

Para isso, vamos implementar uma API que recebe um arquivo e o armazena em uma pasta específica dentro do próprio servidor.

### Show me the code

Para começar, vamos criar uma pasta chamada `io-multer`. Dentro dessa pasta, inicie um novo projeto e instale as dependências necessárias digitando os seguintes comandos no seu terminal:

```language-bash
npm init -y
npm install express multer
```

Seu `package.json` deve se parecer com este:

```language-javascript
  {
    "name": "io-multer",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "express": "^4.17.1",
      "multer": "^1.4.2"
    }
  }
```

Feito isso, crie um arquivo chamado `app.js` e coloque nele o seguinte código:

> io-multer/app.js

```language-javascript
const express = require('express');

const app = express();

app.get('/ping', (req, res) => res.send('pong!'));

module.exports = app;
```

Depois, crie um arquivo chamado `index.js` com o seguinte código:

> io-multer/index.js

```language-javascript
const app = require('./app');

const PORT = 3000;
app.listen(PORT, () => console.log(`Running at port: ${PORT}`));
```
Agora, basta executar o comando `node index.js` dentro da pasta `io-multer` para colocar nosso servidor de pé.

Para testar nossa API, disponibilizamos um endpoint chamado `/ping`. Para fazer uma requisição para essa rota, podemos usar diretamente o browser, como mostrado na imagem abaixo:

<%= figure(%{src: "/back-end/nodejs/multer/images/browserPing.png", class: "text-center rounded mx-auto d-block", width: "788px", height: "auto"}) %>

Agora, é só criar uma rota para receber nossos arquivos. Para isso, vamos utilizar o `Multer`, um middleware que nos ajudará a ler arquivos enviados através de requests HTTP.

##### Multer

Multer é um middleware para manusear requisições do tipo `multipart/form-data` antes que elas cheguem à função callback que você criou para lidar com sua rota. Requisições desse tipo são usadas principalmente para fazer upload de arquivos.

Resumindo, o `Multer`, logo na execução da rota, intercepta os campos e trata os arquivos. Dessa forma, o Multer salva os arquivos e retorna, na requisição, as informações do armazenamento, seja de sucesso ou não. Se tiver sucesso, o Multer retorna as propriedades do arquivo salvo.

Assista ao vídeo abaixo para entender sobre o funcionamento do `Multer`:

<%= youtube_video "FKnDvu_eODY" %>

Você pode ler mais sobre o Multer [aqui.](https://github.com/expressjs/multer) {: .external-link target="_blank" rel="noreferrer noopener" }

Agora que já temos nosso servidor de pé e sabemos o que é o Multer, vamos criar uma instância dele e configurá-lo para tornar a pasta `uploads` como pasta de destino dos uploads realizados. Além disso, vamos também tornar pública essa mesma pasta para que ela possa ser acessada através da nossa API. Assim, poderemos requisitar de volta os arquivos após fazer o upload deles:

> io-multer/index.js

```language-javascript
// const express = require('express');
const multer = require('multer');

// const app = express();

/* Definindo nossa pasta pública, sintaxe: 
  app.use('Caminho para acessar rota na URL do navegador ou ferramenta', 
    express.static('Caminho da pasta pública, ou seja que disponibiliza os arquivos da sua aplicação'));
*/

app.use(express.static(__dirname + '/uploads'));

/* 
  Cria uma instância do multer configurada. O multer recebe um objeto que, nesse caso, 
contém o destino do arquivo enviado.
*/
const upload = multer({ dest: 'uploads' });

// app.get('/ping', (req, res) => res.send('pong!'));

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Running at port: ${PORT}`));
```

**Nota**: As linhas que estão comentadas não sofreram alterações! As linhas não comentadas são novas ou sofreram alterações.

Com tudo configurado, vamos de fato criar uma rota que vai receber e salvar um **único** arquivo na pasta `uploads`:

> io-multer/index.js

```language-javascript
// const express = require('express');
// const multer = require('multer');

// const app = express();

/* Definindo nossa pasta pública */
// app.use(express.static(__dirname + '/uploads'));

/* Cria uma instância do multer configurada */
// const upload = multer({ dest: 'uploads' });

// app.get('/ping', (req, res) => res.send('pong!'));

app.post('/files/upload', upload.single('file'), (req, res) =>
  res.send().status(200)
);

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Running at port: ${PORT}`));
```

Note que, na rota `/files/upload`, passamos um middleware criado pelo `multer` como parâmetro, através da chamada `upload.single('file')`e depois passamos nosso próprio middleware, que recebe os parâmetros `req` e `res`.

O Multer adiciona um objeto `body` e um objeto `file` ao objeto `request` recebido na callback. Os objetos `body` e `file` contêm os valores dos campos de texto e o arquivo enviados pelo formulário, respectivamente.

O parâmetro passado na chamada de `upload.single('este')` indica o nome do input do formulário enviado que conterá o arquivo. No caso desse exemplo, o nome é `file`, mas poderia ter outro nome em outros formulários.

Por exemplo, se o formulário fosse construído desta forma:

```language-html
<form action="/post" method="post" enctype="multipart/form-data">
  <input type="file" name="post" />
</form>
```

Seria necessário especificar o nome do input com `upload.single('post')`, pois o atributo `name` do input está preenchido com `post`.

Além disso, estamos especificando, com o método `single`, que queremos apenas **um** arquivo. Ou seja, qualquer pessoa que nos enviar uma requisição deverá informar uma propriedade chamada `file`, e só poderá enviar um arquivo por requisição.

#### Exercício de Fixação

Crie um arquivo que receba arquivos enviados para `http://localhost:3000/envios` e os armazene na pasta `envios`. 
Dica: você pode usar a pasta `io-multer` criando um novo arquivo, pois ela já tem os pacotes necessários, e o `io-multer/index.js` como exemplo.

##### Axios

Chegou a hora de testarmos nossa API. Para isso, vamos introduzir o **Axios**, uma biblioteca que nos ajudará a realizar requisições HTTP para APIs REST.

[Axios](https://github.com/axios/axios) {: .external-link target="_blank" rel="noreferrer noopener" } é uma biblioteca que fornece um cliente HTTP que funciona tanto no browser quanto no NodeJS. Ela consegue interagir tanto com [XMLHttpRequest](https://developer.mozilla.org/pt-BR/docs/Web/API/XMLHTTPRequest) {: .external-link target="_blank" rel="noreferrer noopener" } quanto com a interface HTTP nativa do NodeJS. Por isso, uma das vantagens de se usar o `Axios` é que ele permite que o mesmo código utilizado para fazer requisições Ajax no browser também funcione no servidor. Além disso, as requisições feitas através da biblioteca retornam uma Promise compatível com a versão ES6 do JavaScript.

**Nota**: o Axios é parecido com o `fetch`, que você já aprendeu. Porém, é sempre interessante aprender a manipular diferentes bibliotecas, mesmo que elas tenham o mesmo objetivo!

Como um exemplo prático de sua utilização, vamos criar um script para saber se nossa API está de pé. Para isso, vamos criar uma outra pasta chamada `ping`, **fora** da nossa pasta `io-multer`, e, dentro dela, vamos criar um arquivo chamado `ping.js`.

**Nota**: Por se tratar de mais um projeto NodeJS, temos que lembrar sempre de executar `npm init -y` no começo.

Feito isso, vamos instalar o axios com o comando:

```language-bash
npm install axios
```

Seu `package.json` deve se parece com este:

```language-javascript
{
  "name": "ping",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.19.2"
  }
}
```

Dentro do arquivo `ping.js`, vamos usar o Axios para fazer uma requisição ao nosso servidor, que está rodando na porta 3000:

> ping/ping.js

```language-javascript
const axios = require('axios');

/* Faz uma requisição do tipo GET */
axios
  .get('http://localhost:3000/ping/')
  .then((response) => {
    console.log(response.data);
    console.log(response.status);
  })
  .catch((error) => {
    console.log(error);
  });
```

Certifique que o `io-multer/index.js` esteja de pé para receber sua requisição `axios` e rode esse script, com `node ping.js`, dentro da pasta `ping`, e veja a saída. Você deverá ver no console a mensagem `pong! 200`.

Explicando melhor o que aconteceu: o axios fez uma requisição HTTP, assim como as que o `Postman` faz, e assim como as que o `browser` faz.

Existem outras formas de se fazer requisições HTTP através do axios:

**GET**

```language-javascript
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  })
  .then(() => {
    // sempre executa no final, independente do que aconteça
  });

// Você pode usar métodos async também
const getUser = async () => {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```


**POST**

```language-javascript
const body = {
  firstName: 'Fred',
  lastName: 'Flintstone'
};

axios.post('/user', body)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
```

Você pode conferir mais exemplos na [documentação do axios.](https://github.com/axios/axios) {: .external-link target="_blank" rel="noreferrer noopener" }

##### Fazendo o upload de arquivos para uma API

Agora que já sabemos como utilizar o axios, vamos usá-lo para enviar um arquivo, lido localmente com o NodeJS, para a nossa API. Para isso, vamos criar mais uma pasta chamada `send-files`, **fora** das pastas criadas anteriormente. Lá dentro, criaremos dois arquivos: `send.js` e `meu-arquivo.txt`. Dentro de `meu-arquivo.txt`, coloque um texto qualquer. Lembre-se sempre de criar um novo projeto node com `npm init`.

Para esse projeto, precisamos instalar as seguintes dependências:

```language-bash
npm install axios form-data
```

`form-data` é uma biblioteca que nos ajudará a montar uma requisição do tipo `multipart/form-data`. Diferente dos tipos de requisições que vimos até agora, ele nos permite trafegar uma stream de dados conforme ela é lida do disco local. Ela pode ser usada para submeter formulários e fazer upload de arquivos para outras aplicações web.

Dentro de `send.js`, colocamos o código abaixo:

> send-file/send.js

```language-javascript
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

// Criamos um stream de um arquivo
const stream = fs.createReadStream('./meu-arquivo.txt');

// Aqui, criamos um formulário com um campo chamado 'file' que carregará
// o stream do nosso arquivo
const form = new FormData();
form.append('file', stream);

// Esse arquivo não será enviado no body da requisição como de costume.
// Em ambientes NodeJS, é preciso setar o valor de boundary no header
// 'Content-Type' chamando o método `getHeaders`
const formHeaders = form.getHeaders();

axios
  .post('http://localhost:3000/files/upload', form, {
    headers: {
      ...formHeaders,
    },
  })
  .then((response) => {
    console.log(response.status)
  })
  .catch((error) => {
    console.error(error)
  });
```

Agora, reinicie o servidor da aplicação `io-multer` com `node index.js` dentro da pasta `io-multer`.

Em seguida, execute o arquivo `send.js`. Caso nenhum erro tenha ocorrido, verifique a pasta `/uploads` do nosso servidor que fica no projeto `io-multer`, lembra? Você verá que existe um arquivo com um nome como `f9556c41394ad1885b7f6e3d60b7d997`. Dentro dele, haverá o conteúdo do seu arquivo `meu-arquivo.txt`.

##### Dando nome aos bois com Multer Storage

Como você percebeu, foi gerado um arquivo com um nome bizarro, não é mesmo? Como é que podemos fazer para dar um nome a esse arquivo?

Dentro no script do nosso servidor, vamos criar um **Multer Storage**. Um storage nos permite ter um controle mais detalhado do upload de nossos arquivos. Podemos extrair o valor do nome original do arquivo enviado pelo formulário através da propriedade `originalname`:

> io-multer/index.js

```language-javascript
// const express = require('express');
// const multer = require('multer');

// const app = express();

// Definindo nossa pasta pública
// app.use(express.static(__dirname + '/uploads'));

/* destination: destino do nosso arquivo
   filename: nome do nosso arquivo.
   No caso, vamos dar o nome que vem na
   propriedade originalname, ou seja,
   o mesmo nome que o arquivo tem no
   computador do usuário */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
});

/* Cria uma instância do multer configurada */
const upload = multer({ storage });

// app.get('/ping', (req, res) => res.send('pong!'));

// app.post('/files/upload', upload.single('file'), (req, res) =>
//   res.send().status(200)
// );

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Running at port: ${PORT}`));
```

Reinicie novamente o servidor do projeto `io-multer`, com `node index.js`. Em seguida, execute o script `send.js`, com `node send.js`, várias vezes e confira sua pasta `uploads/` na pasta `io-multer`, no caso, seu servidor.

Reparou que agora foi gerado um outro arquivo, porém com o nome `meu-arquivo.txt`? 😉 Você executou várias vezes, certo? Nada aconteceu desde que o arquivo `meu-arquivo.txt` foi gerado a primeira vez. Caso você altere o texto que está dentro do `meu-arquivo.txt`, e execute novamente, não será gerado um novo arquivo `meu-arquivo.txt`, ele será apenas atualizado com o novo valor do conteúdo!

#### Exercício de Fixação

Seguindo o exemplo anterior, crie um arquivo que salve os arquivos enviados para `http://localhost:3000/uploads`, o formato dos arquivos salvos deve ser a seguinte: `nome-do-arquivo-enviado${data-de-agora}`, sem a extensão do arquivo enviado.

##### Acessando os arquivos enviados pela API

Como já tornamos pública a pasta `/uploads`, que é onde guardamos os arquivos enviados, não precisamos fazer mais nada para deixá-los disponíveis através da API.

Se você acessar `http://localhost:3000/meu-arquivo.txt`, deverá ver o conteúdo do seu arquivo no browser. 😃 Que tal testar com outros tipos de arquivo, como uma imagem? Só não se esqueça de mudar o nome do arquivo lido no arquivo `io-multer/index.js`.

Melhor ainda, você pode modificar esse script para pedir que o usuário digite na linha de comando o nome do arquivo que quer fazer upload. 😉

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. 💪 Vamos ver alguns exemplos de Input & Output em ação.

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>

### Agora, a prática

Vamos juntar tudo o que aprendemos até aqui e exercitar mais ainda nosso aprendizado!

**Exercício 1**: Crie um endpoint na API usada durante a aula que receba um texto no body da requisição e escreva esse texto em forma de arquivo.

**Exercício 2**: Crie um endpoint na API usada durante a aula que receba o nome de um arquivo, leia o arquivo da pasta e devolva o texto em forma de json.

**Exercício 3**: Crie um servidor com Multer que possa receber um arquivo do tipo (.png ou .jpg); após isso, crie um script que leia uma imagem local e faça o upload para o servidor salvando essa imagem na pasta uploads.

**Exercício 4**: Crie um servidor com Multer que receba múltiplos arquivos, e retorne, como JSON, o novo nome gerado pelo multer para cada arquivo.

**Exercício 5**: Utilizando o método `fs.readdir`, crie um endpoint no servidor do exercício anterior que retorna, num array como JSON, links para todos os arquivos da pasta `uploads` e que permita o download desses arquivos quando os links forem acessados.

O JSON deve ter um formato parecido com esse:

```language-json
{
  "files": [
    "http://localhost:3000/uploads/f9556c41394ad1885b7f6e3d60b7d997",
    "http://localhost:3000/uploads/dbad52b95173c9bd6be6306bb1b87e92",
    "http://localhost:3000/uploads/b786ee16bd1a5cc233cb8edf443590bd",
    "http://localhost:3000/uploads/3ce491ea5f901e9edcd69891ae24e5fa",
    "http://localhost:3000/uploads/9ba8a52e9285c48d43dc63b86d03b869",
    "http://localhost:3000/uploads/09a7bacdbcf8eac74fce614d4f2ce41d",
    "http://localhost:3000/uploads/490c3301fe9c583158e2f5df06bfc9f5",
    "http://localhost:3000/uploads/02c34d63d5af13ee64267dc4e2722177",
    "http://localhost:3000/uploads/793d417883b2e0aaeaa1256a8ad18510",
    "http://localhost:3000/uploads/cfd8756f144f798de1ab17228599bb16",
    "http://localhost:3000/uploads/09950c14c38092752ba7e9e7031f6cdb"
  ]
}
```

**Bônus**: Crie uma API que atenda aos seguintes requisitos:

- Ter um endpoint que receba, além do arquivo num campo `file`, o nome do arquivo num campo `fileName`.

- Caso o arquivo ou o nome não sejam enviados, a API deve retornar erro com status `422 - UNPROCESSABLE ENTITY`.

- Se um arquivo com o nome informado já existir, a API deve retornar erro com status HTTP `409 - CONFLICT`.

- Salvar o arquivo na pasta `uploads`, com o nome enviado no campo `fileName`.

- Ter um endpoint que mostre a listagem dos arquivos na rota `GET /files`.

- Ter um endpoint `GET /files/:fileName` que permita o download dos arquivos.

**Dica**: Para salvar o arquivo com o nome enviado na request, você precisará renomear o arquivo criado pelo `multer` utilizando `fs.rename`

---

## Recursos adicionais

- [Documentação do método `readFile`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação do método `readFileSync`](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação do método `writeFile`](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação do método `writeFileSync`](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options) {: .external-link target="_blank" rel="noreferrer noopener" }

- [How to Use Buffers in NodeJS](https://nodejs.org/en/knowledge/advanced/buffers/how-to-use-buffers/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [File System Flags](https://nodejs.org/api/fs.html#fs_file_system_flags) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação do Multer](https://github.com/expressjs/multer) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação do Axios](https://github.com/axios/axios) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Como realmente entender Streams?](https://pt.stackoverflow.com/questions/49831/como-realmente-entender-streams) {: .external-link target="_blank" rel="noreferrer noopener" }

- [What is the boundary in multipart/form-data?](https://stackoverflow.com/questions/3508338/what-is-the-boundary-in-multipart-form-data) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
