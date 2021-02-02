## Gabarito dos exercícios

A seguir, encontra-se sugestões de soluções para os exercícios propostos.

**Exercício 1**: Crie uma API simples que retorne uma mensagem. Feito isso, gerencie seus processos da seguinte maneira:

1. Crie **UM** processo no PM2 utilizando o CLI;

```language-bash
$ pm2 start index.js --name <NOME_DO_PROCESSO>
```

2. Restart e recarregue o processo utilizando o CLI do PM2 (lembre-se que há comandos distintos para cada um);

```language-bash
$ pm2 restart <NOME_DO_PROCESSO>
```

```language-bash
$ pm2 reload <NOME_DO_PROCESSO>
```

3. Pare o processo;

```language-bash
$ pm2 stop <NOME_DO_PROCESSO>
```

4. (Bônus) - Escalone para **mais 5** processos;

```language-bash
$ pm2 scale <NOME_DO_PROCESSO> +5
```

5. (Bônus) - Defina para **3** a quantidade de processos;

```language-bash
  $ pm2 scale <NOME_DO_PROCESSO> 3
```

6. Remova o processo da listagem do `PM2`;

```language-bash
$ pm2 delete <NOME_DO_PROCESSO>
```

<br>

**Exercício 2**: Crie um arquivo `ecosystem`. O arquivo configurará o PM2 para:

1. Observar alterações no diretório da aplicação e, caso ocorram, reiniciar automaticamente sua aplicação;

2. Escalonar o número de processos para a quantidade de *cores* de sua máquina;

3. Reiniciar o processo sempre que o ele alcançar o consumo de 100MB de memória.

**Resolução**

```language-yml
apps:
  - name: app
    script: ./index.js
    exec_mode: cluster
    instances: max
    watch: true
    max_memory_restart: 100M
```

<br>

**Exercício 3**: Explorando variáveis de ambiente:

1. Adicione à API o uso de uma variável de ambiente que altere a mensagem exibida em sua resposta ou outro comportamento que preferir;

2. Adicione ao arquivo `ecosystem` do exercício anterior dois contextos de variáveis: `env_prod` e `env_homolog`.

```language-yml
apps:
  - name: app
    script: ./index.js
    exec_mode: cluster
    instances: max
    watch: true
    max_memory_restart: 100M
    env_prod:
      ENVIRONMENT: PRODUCTION
    env_homolog:
      ENVIRONMENT: HOMOLOG
```

3. Execute o processo utilizando o contexto `prod`. Em seguida, execute o processo utilizando o contexto `homolog`. Valide se o comportamento foi alterado.

```language-bash
$ pm2 start ecosystem.config.yaml --env prod
```

```language-bash
$ pm2 start ecosystem.config.yaml --env homolog
```

<br>

**Exercício 4**: Adicione monitoramento à sua API:

1. Crie uma conta no PM2;

2. Adicione o monitoramento à API dos exercícios anteriores, utilizando o comando do CLI do PM2;

3. Verifique se o dashboard web está exibindo as informações de sua API.

   **Resolução**

```language-bash
   $ pm2 plus
```

### Bônus

**Exercício 5**: Adicione à API criada um endpoint que simule um erro de produção. Para isso, pode ser utilizado o comando `process.exit`. O objetivo é fazer com que o processo pare e então o PM2 entre em ação para restartá-lo.

**Resolução**

Adicione um trecho semelhante à API:

```language-javascript
app.get('/break', (req, res) => {
  res.send('Quebrando...');

  process.exit(1);
});
```

<br>

**Exercício 6** Adicione mais de um processo a ser iniciado pelo seu arquivo `ecosystem`. Para isso, pode se adicionar dois processos com comportamentos diferentes, através do mesmo código fonte, ou adicionar mais uma API ou script ao projeto. A ideia é, ao executar utilizando o `ecosystem`, o PM2 suba processos com **nomes** e características diferentes.

**Resolução**

Adicione um trecho semelhante ao seu arquivo `ecosystem`:

```language-yml
apps:
  - name: app-1
    script: ./app-1/index.js
    exec_mode: cluster
    instances: 2
  - name: app-2
    script: ./app-2/index.js
    exec_mode: cluster
    instances: 2
```

<br>

**Exerícico 7**: Execute sua API utilizando o `runtime` do PM2. Para isso:

1. Adicione o módulo do pm2 às dependências do projeto;

```language-bash
$ npm install pm2
```

2. Altere o script de `start` do seu *app* (`package.json`) para utilizar o `runtime` do pm2. Lembre-se de referenciar seu arquivo `ecosystem`;

```language-javascript
// ...
"scripts": {
  "start": "pm2-runtime start ecosystem.config.yml",
}
// ...
```

3. Execute o script através do `npm` ou `yarn`.

```language-bash
$ npm start
```
