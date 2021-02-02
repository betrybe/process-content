## Soluções

### **Exercício 1**

Crie um endpoint na API usada durante a aula que receba um texto no body da requisição e escreva esse texto em forma de arquivo.

#### Server

```language-javascript
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();

/* Adicionando o bodyParser como middleware */
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static(__dirname + 'uploads/'));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage });

app.post('/files/upload', upload.single('file'), (req, res) =>
  res.send().status(200)
);

/* Criando  uma nota rota  do  tipo POST */
app.post('/files/write', async (req, res) => {
  /* Obtendo o conteudo enviado no body da requisiçao */
  const { conteudo } = req.body;

  /* Escrevendo o arquivo e criando-o  caso nao  exista */
  await fs.writeFile(`./uploads/${Date.now()}.txt`, conteudo, { flag: 'wx' });

  res.send().status(200);
});

app.get('/ping', (req, res) => res.send('pong!'));

const  port = 3000;
app.listen(port, () => console.log(`running at: ${port}`));
```
{: .line-numbers}

#### Client

```language-javascript
const axios = require('axios');

const body = {
  conteudo: "teeeextoooooooooo"
};

axios
  .post('http://localhost:3000/files/write', body)
  .then(response => console.log(response))
  .catch(error => console.log(error));
```
{: .line-numbers}

### **Exercício 2**

Crie um endpoint na API usada durante a aula que receba o nome de um arquivo, leia o arquivo da pasta e devolva o texto em forma de json.

*Recebendo o  nome  do arquivo, lendo e devolvendo o conteudo para o client*

```language-javascript
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static(__dirname + 'uploads/'));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage });

app.post('/files/upload', upload.single('file'), (req, res) =>
  res.send().status(200);
);

app.post('/files/write', async (req, res) => {
  const  { conteudo }  = req.body;

  await fs.writeFile(`./uploads/${Date.now()}.txt`, conteudo, { flag: 'wx' });

  res.send().status(200);
});

/* Criando   uma rota  do  tipo GET com parametro chamado "arquivo" */
app.get('/files/read/:arquivo', async (req, res) => {
  /* Obtendo o nome do arquivo */
  const { arquivo } = req.params;

  /* Lendo o arquivo da pasta uploads */
  const data = await fs.readFile(`uploads/${arquivo}`, 'ascii');

  /* Enviando o conteudo do arquivo para o client */
  res.send(data).status(200);
});

app.get('/ping', (req, res) => res.send('pong!'));

const port = 3000;
app.listen(port, () => console.log(`running at: ${port}`));
```
{: .line-numbers}

### **Exercício 3**

Crie um servidor com Multer que possa receber um arquivo do tipo (.png ou .jpg), após isso crie um script que leia uma imagem local e faça o upload para o servidor salvando essa imagem na pasta uploads.

Essa foi uma pegadinha, queriamos ver se você realmente abstraiu o conteudo da aula e entendeu que apesar de termos usado `text` como material de exemplo, para fazer os uploads, você tambem pode enviar qualquer outro tipo de arquivo, como `.png`, `.pdf`, `.mp4`, etc. No fim, o resultado era o mesmo material que escrevemos nas nossas aulas.

#### Server

```language-javascript
const express = require('express');
const multer = require('multer');

const app = express();

/* Definindo nossa pasta publica */
app.use(express.static(__dirname + 'uploads/'));

/* destination: destino so nosso arquivo.
   filename: nome  do nosso arquivo, no caso vamos
   dar o nome que vem na propriedade fieldname. */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

/* Utiliza a storage para configurar a instância do multer */
const upload = multer({ storage });

app.post('/files/upload', upload.single('file'), (req, res) =>
  res.send().status(200);
);

app.get('/ping', (req, res) => res.send('pong!'));

const port = 3000;
app.listen(port, () => console.log(`running at: ${port}`));
```
{: .line-numbers}

#### Client

```language-javascript
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

const stream = fs.createReadStream('imagem.png');

const form = new FormData();
form.append('file', stream);
const formHeaders = form.getHeaders();

axios
  .post('http://localhost:3000/files/upload', form, {
    headers: {
      ...formHeaders,
    },
  })
  .then(response => response)
  .catch(error => error);
```
{: .line-numbers}

### **Exercício 4**

Crie um servidor com Multer que receba múltiplos arquivos, e retorne, como JSON, o novo nome gerado pelo multer para cada arquivo.

```language-javascript
const multer = require('multer');
const express = require('express');

const app = express();

const upload = multer({ dest: 'uploads' });

app.post('/files', upload.array('files'), (req, res, next) => {
  const fileNames = req.files.map(({ filename }) => filename);

  return res.status(200).json({ fileNames });
})

app.listen(3000, () => { console.log('Listening on 3000') });
```
{: .line-numbers}

### **Exercício 5**

Utilizando o método `fs.readdir`, crie um endpoint no servidor do exercício anterior que retorna, num array como JSON, links para todos os arquivos da pasta `uploads` e que permita o download desses arquivos quando os links forem acessados.

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

```language-javascript
const fs = require('fs').promises;
const path = require('path');
// const multer = require('multer');
// const express = require('express');

// const app = express()

// const upload = multer({ dest: 'uploads' })

// app.post('/files', upload.array('files'), (req, res, next) => {
//   const fileNames = req.files.map(({ filename }) => filename)

//   return res.status(200).json({ fileNames })
// })

/* Endpoint que lista os arquivos */
app.get('/files', async (req, res, next) => {
  const fileNames = await fs.readdir(path.resolve(__dirname, 'uploads'))

  const files = fileNames.map(fileName => `http://localhost:3000/uploads/${fileName}`)

  res.status(200).json({ files })
})

/* Middleware que permite o download dos arquivos */
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

// app.listen(3000, () => { console.log('Listening on 3000') });
```
{: .line-numbers}

### **Bônus**

Crie uma API que atenda aos seguintes requisitos:

- Ter um endpoint que receba, além do arquivo num campo `file`, o nome do arquivo num campo `fileName`.

- Caso o arquivo ou o nome não sejam enviados, a API deve retornar erro com status `422 - UNPROCESSABLE ENTITY`.

- Se um arquivo com o nome informado já existir, a API deve retornar erro com status HTTP `409 - CONFLICT`.

- Salvar o arquivo na pasta `uploads`, com o nome enviado no campo `fileName`.

- Ter um endpoint que mostre a listagem dos arquivos em `files`.

- Ter um endpoint `/files/:fileName` que permita o download dos arquivos.

```language-javascript
const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
  destination: path
});

/* Configura o middleware de upload do multer */
const upload = multer({ dest: 'uploads' });

/* Recebe o nome do arquivo e retorna seu caminho na pasta uploads */
function getFilePath (fileName) {
  return path.resolve(__dirname, 'uploads', fileName)
}

/* Retorna uma Promise que resolve para um boolean indicando se o arquivo já existe */
async function fileExists (fileName) {
  try {
    await fs.readFile(getFilePath(fileName));
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false
    throw err;
  }
}

/* Recebe o nome e o conteúdo do arquivo, verifica se o arquivo já existe e, caso não exista, salva com o nome informado */
app.post('/files', upload.single('file'), async (req, res, next) => {
  /* Garante que recebemos tanto o nome quanto o conteúdo do arquivo */
  if (!req.file || !req.body.fileName) {
    return res.status(422).json({ message: 'Missing file or fileName' });
  }

  /* Verifica se o arquivo já existe. Caso não exista, dá erro */
  if (await fileExists(req.body.fileName)) {
    await fs.unlink(getFilePath(req.file.filename));
    return res.status(409).json({ message: 'File already exists' });
  }

  /* Renomeia o arquivo criado pelo multer com o nome informado na request */
  await fs.rename(getFilePath(req.file.filename), getFilePath(req.body.fileName));

  return res.status(200).json({ message: 'File successfully uploaded' });
});

/* Lista os arquivos existentes na pasta de uploads */
app.get('/files', async (req, res, next) => {
  const fileNames = await fs.readdir(path.join(__dirname, 'uploads'));
  res.status(200).json(fileNames);
})

/* Permite o download dos arquivos da pasta uploads através da rota `GET /files/:fileName` */
app.use('/files', express.static(path.resolve(__dirname, 'uploads')));

app.listen(3000, () => { console.log('Listening on 3000') });
```
{: .line-numbers}
