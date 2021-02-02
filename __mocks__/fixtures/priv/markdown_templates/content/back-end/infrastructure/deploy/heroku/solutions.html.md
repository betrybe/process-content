## Gabarito dos exercícios

A seguir, encontra-se sugestões de solução para os exercícios propostos.

**Exercício 1**: Crie uma API simples que responda com "Está vivo!!!" utilizando *express* e faça o deploy no `Heroku` utilizando o CLI.

**Resolução**

1. Crie uma nova pasta para o projeto.

2. Inicialize o projeto com `npm init`.  Adicione o script `"start": "node index.js"` ao seu `pacakge.json`. Ele deverá ficar parecido com esse:

```language-json
{
  "name": "test-heroku",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

3. Inicialize um novo repositório git:

```language-bash
git init
git add .
git commit -m 'First commit'
```

4. Instale o express com o npm:

```language-bash
npm install express
```

5. Adicione um arquivo `index.js` na raiz do projeto. Ele deverá ser parecido com o abaixo:

```language-javascript
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Está vivo!!!')
});

const port = process.env.PORT || 3000;

app.listen(port);
console.log(`Escutando na porta ${port}`);
```

5. Inicialize o Heroku com o comando `heroku create`.

6. Crie um arquivo `.gitignore` na raiz do projeto com o conteúdo `node_modules/`.

7. Commite as alterações:

```language-bash
git add .
git commit -m 'Install express and add index.js'
```

8. Publicar no Heroku

```language-bash
git push heroku master
```

10. Aguarde o deploy terminar e acesse o link exibido no terminal. Ao abri-lo no browser, deverá aparecer a mensagem `Está vivo!!!`.

<br>

**Exercício 2**: Agora, modifique a API para responder uma nova mensagem:

1. Crie uma nova variável de ambiente com um texto qualquer;

2. Modifique o código da sua API para que ela responda com o texto contido na variável criada no passo anterior.


**Resolução**

1. Adicine a variável com o seguinte comando no terminal:

```language-bash
heroku config:set MESSAGE='Variáveis funcionam!!!' --app nome-do-seu-app-12345
```

2. Modifice o arquivo `index.js` como abaixo:

```language-javascript
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
const message = process.env.MESSAGE || 'Está vivo!!!';

app.get('/', (req, res) => {
  res.send(message);
});

app.listen(port);
console.log(`Escutando na porta ${port}`);
```

3. Adicione e commite as alterações:

```language-bash
git add .
git commit -m "Adiciona mensagem de response por variável de ambiente"
```

4. Faça deploy das alterações:

```language-bash
git push heroku master
```

5. Após o deploy terminar, recarregue a página e deverá aparecer no navegador a mensagem `Variáveis funcionam!!!`.

<br>

**Exercício 3**: Agora vamos criar um Procfile.

1. Crie uma cópia do arquivo `index.js` com o nome `indexProcfile.js`;

2. No novo arquivo, altere a mensagem de resposta da API para `"Procfile funciona mesmo!"`;

3. Crie um `Procfile` para startar sua aplicação a partir do novo arquivo de `indexProcfile.js`.

**Resolução**

1. Copie o arquivo `index.js` para um novo arquivo `indexProcfile.js`. No terminal, pode ser usado o comando `cp index.js indexProcfile.js`.

2. Altere o arquivo `indexProcfile.js` para algo como:

```language-javascript
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
const message = process.env.MESSAGE || 'Está vivo!!!';

app.get('/', (_req, res) => {
  res.send(message + ' E o Procfile também!!! =D');
});

app.listen(port);
console.log(`Escutando na porta ${port}`);
```

3. Crie um arquivo Procfile com o seguinte conteúdo: `web: node indexProcfile.js`

4. Adicione e commite as alterações:

```language-bash
git add .
git commit -m "Adiciona Procfile"
```

5. Faça deploy da nova versão com `git push heroku master`.

6. Abra no navegador após o build concluir. Deverá aparecer a mensagem: `Variáveis funcionam!!! E o Procfile também!!! =D`.

<br>

**Exerício 4**. Simule o deploy em multi ambientes (produção e homolação). Para isso:

1. Renomeie o *remote* do *deploy* dos exercícios anteriores para `homolog`;

2. Crie um novo *remote* a partir do mesmo projeto. Dessa vez, o *remote* deverá se chamar `prod`;

3. Em seguida, configure as variáveis de ambiente para terem valores diferentes por ambiente.

**Resolução**

1. Renomeie o *remote* padrão:

```language-bash
git remote rename heroku homolog
```

2. Criar um novo *remote* chamado `prod`

```language-bash
heroku create --remote prod
```

3. Altere a variável de ambiente de `homolog` para uma mensagem específica para o ambiente:

```language-bash
heroku config:set MESSAGE="HOMOLOG: Variáveis de ambiente funcionam" --app NOME-DO-APP-DE-HOMOLOG
```

4. Crie a variável de ambietne de `prod` com uma mensagem específica para o ambiente:

```language-bash
heroku config:set MESSAGE="PROD: Variáveis de ambiente funcionam" --app NOME-DO-APP-DE-PROD
```

5. Faça deploy do *app* de `prod`:

```language-bash
git push prod master
```

6. Abre no navegador os dois apps. Cada um vai exibir uma mensagem diferente, descrevendo qual ambiente está: `homolog` ou `PROD`.

<br>

**Exercício 5**: Faça deploy de uma aplicação React.

1. Crie uma aplicação React utilizando `create-react-app`;

2. Crie um novo *app* utilizando o *buildpack* [mars/create-react-app;](https://github.com/mars/create-react-app-buildpack#quick-start) {: .external-link target="_blank" rel="noreferrer noopener" }

3. Então, faça o deploy do *app* no Heroku.

**Resolução**

1. Com o `create-react-app` devidamente instalado, inicie um novo app:

```language-bash
npx create-react-app my-app
```

2. Entre na pasta do projeto. Se necessário, inicie o um novo repositório git e commite os arquivos. Enfim, crie um novo _Heroku app_:

```language-bash
cd my-app

# Só necessário se CRA não criar automaticamente um novo repositório
git init
git add .
git commit -m 'react-create-app on Heroku'

heroku create -b https://github.com/mars/create-react-app-buildpack.git
```

3. Publique o *app*

```language-bash
git push heroku master
```

### Bônus

**Exercício 6**: Agora que você chegou até aqui, pegue os projetos que você criou anteriormente e faça deploy deles no Heroku! Compartilhe suas URLs com a turma para que as pessoas possam acessá-los de outros lugares.

<br>

**Exercício 7**: Simule a estratégia de se ter multi-ambientes utilizando variáveis de ambiente específicas. Para isso:

1. Crie outros ambientes a partir dos códigos do exercícios anteriores;

2. Faça alterações para que os projetos se comportem de maneiras diferentes em ambientes diferentes de acordo com uma variável de ambiente. Pode ser uma mensagem diferente, ou um comportamento alterado, por exemplo;

3. Teste seus *apps* acessando cada um dos ambientes.

**Resolução**

Para os exercícios Bônus, serão replicadas as mesmas técnicas aprendidas e praticadas nos exercícios anteriores com outros projetos.
