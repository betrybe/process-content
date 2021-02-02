## O que vamos aprender?

No conteúdo de hoje, você vai aprender como gerenciar o ciclo de vida de suas aplicações e a importância disso para um ambiente de **produção**. Além disso, você verá o que são _Gerenciadores de Processos_ (Process Managers) e como instalá-los e utilizá-los para rodar seus códigos.

### Você será capaz de:

- Entender o que são _process managers_;

- Entender o porquê de utilizar ferramentas mais sofisticadas em produção;

- Instalar, utilizar e aproveitar os principais recursos do **PM2**;

- Fazer deploy no **Heroku** aproveitando recursos de um _process manager_.

---

## Por que isso é importante?

Conforme vimos no conteúdo sobre **Heroku**, "damos vida" às nossas aplicações quando as publicamos. Nesse processo, novos desafios surgem.

No conteúdo anterior, vimos que, normalmente, precisamos lidar com multiambientes. Ou seja, geralmente temos um ambiente específico para a fase de desenvolvimento, outro para a fase de testes e, por último, mas não menos importante, um para produção.

Seu código deixa de rodar em sua máquina para rodar em um servidor externo. Consequentemente, ele deixa de ser acessado somente por você para ser acessado por vários usuários, provavelmente 24 horas por dia. Esse cenário exige novas preocupações:

- "E se ocorrer um _bug_ e o processo parar?"

- "E se muitos usuários acessarem ao mesmo tempo?"

- "E se os recursos da máquina não forem o suficiente?"

<%= figure(%{src: "https:\/\/media.giphy.com/media/bEVKYB487Lqxy/giphy.gif", caption: "E agora?", class: "text-center rounded mx-auto d-block", width: "550px", height: "auto"}) %>

Calma! Esses questionamentos, assim como outros desse tipo, são normais. E para nos ajudar a resolver ou evitar esses problemas, existem diversos tipos de ferramentas. Hoje veremos os **Process Managers**.

Assim como toda ferramenta, os gerenciadores de processos também não são "balas de prata". Existem outras maneiras de resolver tais problemas, porém os gerenciadores de processos são simples e agregam muito valor.

---

## Conteúdo

###### Tempo sugerido para realização: 120 minutos

### O que são gerenciadores de processo?

Os _Process Managers_ (PMs) foram criados para facilitar e tornar mais eficaz o gerenciamento de processos. Além disso, os PMs permitem aproveitar melhor os recursos do servidor, nos ajudando a garantir a disponibilidade de nossas aplicações.

##### Algumas vantagens são:

- Reload automático;

- Abstração da complexidade de gerenciadores nativos;

- Gerenciamento de sessões;

- Facilidade de gerenciamento de múltiplos núcleos de processamento;

- Responsabilidade do uso de cores delegados ao PM;

- Gerenciamento de múltiplas aplicações no servidor;

- Escalonamento dos processos;

- Balanceamento de carga;

- Monitoramento;

- Gerenciamento de logs.

Essas funções nos ajudam a manter nossa aplicação no ar 24/7 e com maior aproveitamento dos recursos do servidor, aumentando assim sua disponibilidade e resiliência.

##### Gerenciadores de Processos Populares

Existem diversos _process managers_. Alguns são para processos de linguagens específicas e outros por sistema operacional (SO). Os mais populares são:

- PM2;

- [StrongLoop's PM](https://strong-pm.io/) {: .external-link target="_blank" rel="noreferrer noopener" };

- [Forever](https://github.com/foreversd/forever) {: .external-link target="_blank" rel="noreferrer noopener" };

- SystemD do Linux.

Hoje, vamos explorar e conhecer os principais recursos do **PM2**.

### PM2

O [PM2](https://www.npmjs.com/package/pm2) {: .external-link target="_blank" rel="noreferrer noopener" } é um _PM_ popular, principalmente na comunidade Node.js. O PM2 foi feito com o intuito de auxiliar o gerenciamento de aplicações em ambiente de produção, permitindo manter suas aplicações sempre rodando, reiniciando-as quando necessário, sem _downtime_, e facilitando o gerenciamento dos processos.

##### Instalação

A instalação é muito simples. Podemos fazê-la utilizando o `npm`:

```language-bash
\$ npm install pm2@latest -g
```

Para validar se a instalação foi concluída com sucesso, execute o comando abaixo. Deverá ser exibida no seu console a versão do PM2 instalada.

```language-bash
\$ pm2 --version
```

##### Atualização

Caso você tenha uma versão inferior do PM2 e queira atualizá-la, execute o comando abaixo. O PM2 será atualizado em memória:

```language-bash
\$ pm2 update
```

Segundo a documentação oficial, todas as versões são retrocompatíveis, o que significa que os comandos de versões anteriores permanecerão funcionando nas novas.

### Gerenciando Processos

###### ⚠️ Abordaremos o uso do PM2 considerando a execução de um processo Node.js. Ao final do conteúdo, faremos considerações para outros tipos de processos.

##### Gerenciando o estado dos processos

Agora, vamos passar pelos comandos básicos do PM2.

<%= figure(%{src: "https:\/\/media.giphy.com/media/bAplZhiLAsNnG/giphy.gif", caption: "Mãos na massa!", class: "text-center rounded mx-auto d-block", width: "550px", height: "auto"}) %>

##### Start

Executar um processo utilizando o PM2 é bem simples: basta utilizar o comando `start`. Imagine que temos um script rodando apenas com o Node.js. O exemplo abaixo ilustra como esse script seria executado com o PM2.

Na forma convencional, iniciaríamos nosso script Node.js da forma demonstrada abaixo:

```language-bash
\$ node index.js
```

Porém, queremos iniciá-lo com o PM2. Dessa forma, vamos executar o arquivo utilizando `PM2`:

```language-bash
\$ pm2 start index.js
```

Podemos utilizar a flag `name` para nomear o processo. Se não definirmos explicitamente o nome do processo, ele terá o nome do arquivo que está sendo executado. No nosso caso, o nome do processo seria "index".

```language-bash
\$ pm2 start index.js --name <NOME_DO_PROCESSO>
```

Além do nome, todo processo contém seu id. Ambos podem ser utilizados para referenciá-lo.

##### Stop

Para parar um processo, basta executar o comando `stop`:

```language-bash
\$ pm2 stop <NOME_DO_PROCESSO>
```

Esse comando somente interrompe o processo, permitindo iniciá-lo novamente utilizando o comando `start`.

```language-bash
\$ pm2 start <NOME_DO_PROCESSO>
```

Caso queira executar um comando que terá efeito em todos os processos, basta usar `all` no lugar do nome do processo. Por exemplo, para parar todos os apps:

```language-bash
\$ pm2 stop all
```

##### Delete

Se você quiser excluir o app (o processo da aplicação) da lista de processo do PM2, utilize `delete`:

```language-bash
\$ pm2 delete <NOME_DO_PROCESSO>
```

##### Restart

Para reiniciar um processo, utilize o comando `restart`:

```language-bash
\$ pm2 restart <NOME_DO_PROCESSO>
```

Lembre-se de que, se houve alterações no arquivo, elas serão carregadas. O comando `restart` mata os processos e depois os reinicia. Isso significa que pode haver um curto "downtime", ou seja, um curto espaço de tempo em que seu serviço não vai responder.

##### Reload

Opostamente ao `restart`, o comando `reload` é _0-second-downtime_, ou seja, não causa downtime em seu app. Isso acontece porque ele primeiro sobe o novo processo e depois finaliza o anterior.

```language-bash
\$ pm2 reload <NOME_DO_PROCESSO>
```

Caso o gerenciador não consiga utilizar _reload_ em sua aplicação, o clássico `restart` será aplicado no lugar.

### Monitorando Processos

##### List

Para listar todos os processos que estão sendo gerenciados pelo PM2, utilize o comando `list`.

```language-bash
\$ pm2 list
```

O comando exibirá uma saída semelhante a essa em seu terminal:

<%= figure(%{src: "/back-end/infrastructure/deploy/process-manager/images/pm2-ls.png", caption: "Listando os processos", class: "text-center rounded mx-auto d-block", width: "810px", height: "auto"}) %>

Perceba que são exibidas informações importantes, como o `id` e o `name` de cada processo. Esses identificadores são aqueles que podem ser utilizados nos outros comandos do PM2, como o `stop` e o `restart`.

Outro campo interessante é a versão (_version_) do seu _app_. Essa versão é aquela definida em seu `package.json`. Esse campo pode ser utilizado para saber se realmente seu código foi atualizado após alguma mudança.

São exibidos, também, campos que mostram o uso de recursos, o status do processo, o usuário que executou cada processo, se sua aplicação foi reiniciada e, caso tenha sido, quantas vezes.

O comando `list` também pode ser executado com `ls`, `l` e `status`. Por exemplo:

```language-bash
\$ pm2 ls
```

Caso você queira exibir a lista de processos ordenada, basta passar a flag `sort`. Essa flag permite a ordenação por todas as colunas exibidas: `name`, `id`, `pid`, `memory`, `cpu`, `status` e `uptime`. Junto a isso, é possível passar um segundo parâmetro informando se a ordenação deverá ser ascendente ou descendente: `asc` ou `desc`, respectivamente.

```language-bash
\$ pm2 list --sort name:desc
```

Por padrão, sem a flag `sort`, a listagem é ordenada pelo "nome" do processo e em ordem ascendente.

##### Show

Para exibir mais detalhes sobre um processo específico, utilize o comando `show`:

```language-bash
\$ pm2 show <NOME_DO_PROCESSO>
```

Através dele, é possível ver informações como a localização dos arquivos de logs, o caminho para o arquivo do processo, se aquele processo foi reiniciado etc. Além disso, é possível ver dados de métricas como latência do _Event Loop_ e quantidade de _requests_ ativas.

##### Logs

O comando `logs` exibe o histórico de seus apps em tempo real. Você pode passar como parâmetro o nome de um processo específico, como no exemplo abaixo. Caso contrário, serão listados os logs de todos os apps.

```language-bash
\$ pm2 logs <NOME_DO_PROCESSO>
```

##### Monit

Utilizando o comando `monit`, é possível visualizar um _dashboard_ em tempo real diretamente no seu terminal.

```language-bash
\$ pm2 monit
```

Será exibido um painel conforme abaixo:

<%= figure(%{src: "/back-end/infrastructure/deploy/process-manager/images/pm2-monit.png", caption: "Monitorando os processos", class: "text-center rounded mx-auto d-block", width: "810px", height: "auto"}) %>

Nele, é possível acompanhar um processo específico em _real time_, observando seus logs e o uso de recursos.

##### Interface Web

Outra maneira bem legal de monitorar seus apps é utilizando o dashboard do PM2. Ele funciona em um modelo _freemium_ e, com uma conta free, já conseguimos utilizar alguns recursos.

O Dashboard vai mostrar os processos em execução pelo PM2 em sua máquina. Dito isso, para visualizar as métricas, lembre-se de deixar algum processo rodando.

Para utilizar o serviço, basta criar uma conta no [site oficial.](https://id.keymetrics.io/api/oauth/register) {: .external-link target="_blank" rel="noreferrer noopener" }

Após ter a conta criada, basta executar:

```language-bash
\$ pm2 plus
```

O comando te redirecionará para o navegador para você prosseguir com o login. Feito isso, você já será redirecionado para um dashboard, parecido com o abaixo:

<%= figure(%{src: "/back-end/infrastructure/deploy/process-manager/images/pm2-dashboard.png", caption: "Dashboard Web", class: "text-center rounded mx-auto d-block", width: "810px", height: "auto"}) %>

São exibidas diversas informações do servidor. No nosso caso, o servidor é nossa máquina, pois estamos rodando localmente. As informações exibidas são o consumo de recursos (CPU e Memória) e as configurações da máquina (como quantidade de cores, qual processador, versão do Node.js etc.).

<%= figure(%{src: "/back-end/infrastructure/deploy/process-manager/images/pm2-dashboard-2.png", caption: "Dashboard Web", class: "text-center rounded mx-auto d-block", width: "810px", height: "auto"}) %>

Também é possível assistir aos logs em tempo real, criar métricas personalizadas, acompanhar o desempenho do _app_ (requests ativas, consumos etc.) e mostrar também se houve algum _restart_ ou problemas na aplicação.

### Modo Cluster

Para aplicações Node.js, o PM2 possui um **Modo Cluster**. Esse modo permite escalar nossa aplicação entre as CPUs disponíveis na máquina, sem a necessidade de modificações no código, aumentando a performance e a disponibilidade de nossa _app_, de acordo com as CPUs disponíveis.

Isso significa ter nosso código rodando em diversas CPUs e as chamadas à nossa aplicação sendo divididas entre elas, _balanceando a carga_. Esse processo é chamado de **load balancing**, e é comum não só para a divisão entre CPUs, mas entre qualquer outro recurso, como servidores ou processos.

<%= figure(%{src: "/back-end/infrastructure/deploy/process-manager/images/cpus-dancing.gif", caption: "Processo rodando em apenas uma CPU", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

Ao rodar a aplicação em quatro processos, temos ganho tanto na performance, já que não estaremos concorrendo à mesma CPU, quanto na resiliência de nosso ambiente, pois, caso ocorra algum erro em apenas um dos processos, os demais continuarão a ser executados.

<%= figure(%{src: "/back-end/infrastructure/deploy/process-manager/images/cluster-mode.png", caption: "Processo escalado entre quatro CPUs", class: "text-center rounded mx-auto d-block", width: "810px", height: "auto"}) %>

Note que, apesar de utilizarmos mais de uma CPU, não teremos o mesmo processo rodando em mais de uma CPU. O que teremos é uma relação um para um, ou seja, um processo para um CPU.

Dito isso, caso uma API receba quatro chamadas, por exemplo, cada CPU processará uma requisição independente (considerando o exemplo acima com uma máquina de quatro cores).

Por baixo dos panos, é utilizado o [Node.js Cluster Module,](https://nodejs.org/api/cluster.html#cluster_cluster) {: .external-link target="_blank" rel="noreferrer noopener" } que escala a aplicação em processos filhos e automaticamente compartilha portas do servidor.

Para utilizar esse recurso, basta optar por `instances` ou `i` nos comandos `start`, `reload` ou `restart`, informando o número de processos.

```language-bash
\$ pm2 start index.js --instances 2 --name <NOME_DO_PROCESSO>
```

Nesse exemplo, serão iniciados dois processos.

Outra opção é utilizar, no lugar do número de instâncias, a tag `max` ou `0`. Desse modo, o PM2 vai criar **uma instância para cada CPU disponível** na máquina.

```language-bash
\$ pm2 start index.js -i max --name <NOME_DO_PROCESSO>
```

Se executado em uma máquina que possui quatro cores, serão iniciados quatro processos.

Caso o número de instâncias passado seja maior que o número de CPUs, o PM2 vai distribuir as instâncias entre as CPUs existentes, mantendo mais de um processo na mesma CPU. Isso não terá impacto na performance do processamento, pois mais de um processo vai concorrer pelo mesmo _core_, mas pode fazer sentido para casos específicos.

#### Bônus

Acabamos de conhecer o `Modo Cluster` e suas principais características. Caso você queira se aprofundar mais no assunto de performance de uma aplicação, abordado dentro de Cluster, vamos falar agora um pouco sobre os conceitos de `Scaling` e `Stateless`. Se não quiser se aprofundar nesses conceitos agora, pode partir para próxima sessão!

##### Scaling

Uma outra forma de aumentar o número de processos é utilizando o comando `scale`.

Esse comando pode ser utilizado de duas maneiras:

1.  Informando o total de processos que você quer:

```language-bash
    \$ pm2 scale <NOME_DO_PROCESSO> 3
```

        Nesse caso, o número de processos será definido como três. Isso significa que, caso existam menos que três, novos processos serão criados. Se houver mais, serão excluídos processos para totalizar o "três" passado como parâmetro.

2.  Informando o número de novos processos que você deseja adicionar. Para isso, basta utilizar a flag `+` junto ao número:

```language-bash
    \$ pm2 scale <NOME_DO_PROCESSO> +3
```

        Aqui, serão adicionados três novos processos além dos que já estão em execução.

##### Stateless

Juntamente com os conceitos de _scaling_ e _cluster mode_, temos um muito interessante: o **stateless**.

Ao dizer que uma aplicação é _stateless_, estamos informando que ela não possui estado. Ou seja, nenhuma informação do usuário é salva em uma sessão para ser utilizada por ele em uma próxima sessão.

Toda informação é trabalhada durante o tempo de duração daquele processo (durante o tempo em que uma requisição é recebida até sua resposta ser gerada, por exemplo). Os dados que, necessariamente, precisam ser persistidos vão utilizar alguma solução **stateful**, ou seja, que gerencie estado, como um `bancos de dados` ou um `storage`, por exemplo.

Essa arquitetura permite, principalmente:

- Escalar horizontalmente suas aplicações de maneira simples em múltiplos servidores;

- _Cachear_ de forma mais fácil e, consequentemente, tornar suas aplicações mais rápidas;

- Menos complexidade de _storages_, já que esse processo é feito de maneira unificada e por uma solução especializada.

Esses conceitos são bem populares no desenvolvimento de aplicações modernas, e conhecê-los é de grande importância.

### Ecosystem file

É possível passar um arquivo de configuração para o PM2 executar suas aplicações. Esse arquivo é chamado de **ecosystem**. Nele você configura comportamentos, opções, variáveis de ambiente e arquivos de logs de cada aplicação.

O **ecosystem** agrega ainda mais valor em projetos com arquitetura de microsserviços, em que uma aplicação é composta por um conjunto de serviços, cada um executando no seu próprio processo. Com o ecosystem, é possível definir individualmente a configuração de cada aplicação ou serviço. Para colocar no ar, basta executar o arquivo, e todas as configurações são aplicadas.

O arquivo de configuração pode ser feito nos formatos `Javascript`, `JSON` ou `YAML`.

Para executá-lo, basta utilizar um dos comandos do PM2, como `start`, `restart`, `stop`, `delete` ou `reload`, e passar o arquivo como parâmetro.

Exemplo de utilização:

```language-bash
\$ pm2 [start|restart|stop|delete] ecosystem.config.js
```

##### Javascript

Vamos a um exemplo de arquivo ecosystem em **Javascript**:

```language-javascript
module.exports = {
  apps: [
    {
      name: 'app',
      script: './index.js'
    },
    //...
  ]
};
```

No exemplo acima, especificamos na propriedade `apps` os processos que teremos. Perceba que a propriedade recebe um _array_ de objetos, o que significa que ela está preparada para receber a configuração de **N** aplicações.

Em arquiteturas de microsserviços, podemos explorar a funcionalidade descrita acima listando todos os _apps_ (ou serviços) e suas diferentes configurações. Dessa forma, a complexidade de executar cada um individualmente diminui.

No objeto, definimos duas propriedades: `name` e `script`. Ambas são conhecidas nossas. Lembra que, ao fazer `pm2 start` em um _script_, definimos um nome e um arquivo de "index"? Então, esse nome e esse arquivo correspondem a essas propriedades que utilizamos no arquivo ecosystem.

Um `start` através desse arquivo _ecosystem_ ficaria assim:

```language-bash
\$ pm2 start ecosystem.config.js
```

O código acima, se não fosse executado com _ecosystem_, teria a seguinte forma:

```language-bash
\$ pm2 start index.js --name <NOME_DO_PROCESSO>
```

##### YAML

Outra opção é criar um arquivo **YAML**, que é um formato mais simples e muito comum para a criação de arquivos de configuração e definições. Por exemplo, na aula sobre o _Heroku_, vimos o _Procfile_, que é baseado em _YAML_.

O exemplo abaixo tem a mesma função que o exemplo em JavaScript, porém utiliza _YAML_:

```language-yml
apps:

- name: app
  script: ./index.js
```

Perceba como a estrutura fica muito mais simples e legível.

##### Multiaplicativos

Conforme dito anteriormente, o _ecosystem_ permite a definição de _N_ aplicações. Para defini-las, basta utilizar a lista em `apps`. Por exemplo:

```language-yml
apps:

- name: app-1
  script: .app-1/index.js
- name: app-2
  script: .app-2/index.js
- name: app-3
  script: .app-3/index.js
```

Ao executar um `start` apontando para esse arquivo, serão iniciados três processos, pois definimos três aplicações dentro de `apps`. Caso queira executar uma aplicação específica, é possível utilizando a flag `--only`, como se segue:

```language-bash
\$ pm2 start ecosystem.config.yml --only app-1
```

Nesse caso, será iniciado apenas o _app_ de nome "app-1". Caso queira executar **apenas algumas aplicações**, o parâmetro pode ser utilizado separando os _apps_ desejados por vírgula. Por exemplo:

```language-bash
\$ pm2 start ecosystem.config.yml --only "app-1,app-2"
```

Nesse caso, serão executados **apenas** o _app-1_ e o _app-2_.

##### Instâncias

Outro parâmetro possível é o número de instâncias que aquela aplicação deve ter, utilizando a funcionalidade do **modo cluster**.

Abaixo, definimos que o app deverá ser iniciado com quatro instâncias:

```language-yml
apps:

- name: app
  script: ./index.js
  exec_mode: cluster
  instances: 4
```

Perceba o campo `exec_mode`. Através dele, habilitamos o modo cluster para esse _app_. A propriedade `instances` indica o número de processos que será utilizado pela aplicação.

**Importante:** Ao alterar o arquivo `ecosystem`, é necessário deletar e iniciar novamente seu projeto do PM2 para que as alterações sejam aplicadas.

##### Variáveis de Ambiente

Para utilizar variáveis de ambiente, basta definir uma propriedade `env_ + nome do ambiente`. Por exemplo, para utilizar variáveis distintas para os ambientes de _prod_ e _homolog_, definimos as propriedades `env_prod` e `env_homolog`:

```language-yml
apps:

- name: app
  script: ./index.js
  exec_mode: cluster
  instances: 4
  env_prod:
    ENVIRONMENT: PRODUCTION
  env_homolog:
    ENVIRONMENT: HOMOLOG
```

Para executar, basta utilizar a opção `env` e selecionar quais variáveis serão passadas. Por exemplo, para utilizar as variáveis de homologação:

```language-bash
\$ pm2 start ecosystem.config.yml --env homolog
```

O valor é sempre o nome definido na propriedade do arquivo, sem o prefixo `"env_"`. Ou seja, imagine que queremos criar um ambiente de teste. Para isso, vamos criar a propriedade `env_staging`. Em seguida, para podermos utilizar as variáveis do ambiente de teste, vamos executar a aplicação da seguinte forma:

```language-bash
\$ pm2 start ecosystem.config.yml --env staging
```

### Auto restart

Conforme vimos, para manter a resiliência dos processos, o PM2 reinicia automaticamente processos que tenham falhado.

É possível também definir outras configurações para esses _restarts_.

##### Memória máxima

Imagine que, por algum motivo, um dos nossos processos vai acumulando uso de RAM ao decorrer do tempo, e passa a utilizar muito mais memória do que o normal. Ou, por algum erro, o processo começa a aumentar muito a memória.

Para corrigir cenários desse tipo, ou apenas por limitação de hardware, uma das configurações de _auto restart_ do PM2 é a utilização máxima de RAM que aquele processo pode consumir.

Podemos definir, por exemplo, que ao chegar em _20mb_ de memória, o processo deverá ser reiniciado. Para isso, utilizamos a opção `max_memory_restart`. Ela pode ser utilizada tanto como propriedade do _app_, no arquivo `ecosystem`, quanto diretamente no `start` do CLI:

```language-bash
\$ pm2 start index.js --name <NOME_DO_PROCESSO> --max-memory-restart 20M
```

Ou:

```language-yml
apps:

- name: app
  script: ./index.js
  max_memory_restart: 20M
```

Note que o valor recebe a unidade de medida, que pode ser **K**ilobyte, **M**egabyte ou **G**igabyte.

##### Delay de restart

O PM2 possui a opção `--restart-delay`, que permite passar um valor fixo, em milissegundos, para a sua aplicação aguardar antes do PM2 restartá-la em caso de erros.

Via CLI:

```language-bash
\$ pm2 start index.js --name <NOME_DO_PROCESSO> --restart-delay 100
```

Isso significa que o PM2 vai aguardar 100ms para tentar _iniciar_ o processo.

Também é possível configurá-lo através do arquivo `ecosystem`:

```language-yml
apps:

- name: app
  script: ./index.js
  restart_delay: 100
```

#### Bônus

Vimos os principais conceitos do `Auto Restart`. Caso você queira se aprofundar mais, vamos falar agora um pouco sobre `Estratégias de Backoff`. Porém, caso não queira aprofundar, pode partir para próxima sessão!

##### Estratégias de Backoff

Com as estratégias de _Backoff_, é possível configurar sua aplicação para reiniciar de maneira mais inteligente, em vez de somente ficar reiniciando sempre que houver uma exceção.

Configurando uma estratégia de _exponential backoff_, é possível ir incrementando um tempo de intervalo entre as tentativas, reduzindo, por exemplo, a carga de conexões em bancos de dados ou outro serviço externo.

Para configurá-lo, basta adicionar a tag `--exp-backoff-restart-delay` mais o tempo de _delay_ no `start`. Você pode fazer isso pelo arquivo `ecosystem` também:

```language-yml
apps:

- name: app
  script: ./index.js
  exp_backoff_restart_delay: 100
```

Nesse exemplo, ao ocorrer um erro, o processo vai aguardar 100ms. Durante esse período, o _app_ ficará com status de _waiting restart_. Caso ocorra um novo erro, ele aguardará mais 150ms e, se o erro se repetir, ele aguarda mais 225ms, e assim por diante:

- Vai reiniciar em 100ms;

- Vai reiniciar em 150ms;

- Vai reiniciar em 225ms.

Dessa maneira, o delay entre os _restarts_ vai crescendo em um movimento exponencial, chegando no máximo `15000ms`.

Essa estratégia não é particular do PM2 e é amplamente utilizada, principalmente para gerenciar aplicações com conexões externas.

### Assistindo a Alterações

Com o PM2, também é possível observar alterações em um arquivo! O que isso quer dizer? Quer dizer que ele pode ficar observando um diretório específico e, caso haja alterações nos arquivos, ele automaticamente reinicia os processos.

Essa funcionalidade é bem legal, principalmente em ambiente de desenvolvimento, onde você está constantemente fazendo atualizações no código e quer visualizar o resultado imediatamente. Então, em vez de ficar parando e executando sua aplicação manualmente toda vez, você pode dizer para o PM2 fazer para você quando algum arquivo for modificado.

Para utilizar esse recurso, basta utilizar o parâmetro `--watch` no comando start:

```language-bash
\$ pm2 start index.js --name <NOME_DO_PROCESSO> --watch
```

Ou através do `ecosystem`, especificando quais diretórios deverão ser observados:

```language-yml
apps:

- name: app
  script: ./index.js
  watch: ./
```

### PM2 com outras linguagens

Conforme dito no começo, utilizamos como exemplo aplicações em Node.js, em que o PM2 é muito popular e temos mais familiaridade. Porém podemos utilizá-lo em outras linguagens.

Assim como o Heroku, o PM2 consegue inferir a linguagem e, consequentemente, saber como executá-la. Ao inferir que uma aplicação é em Node.js, por exemplo, ele sabe que deverá executar o arquivo com o comando `node`.

Essa relação é feita a partir de uma lista de "interpretadores". Nessa lista, estão presentes a extensão e o respectivo interpretador da linguagem que está sendo utilizada em um projeto. A lista default é:

```language-json
{
".sh": "bash",
".py": "python",
".rb": "ruby",
".coffee" : "coffee",
".php": "php",
".pl" : "perl",
".js" : "node"
}
```

Caso seja necessário executar uma aplicação em um formato diferente dos conhecidos pelo PM2, é possível utilizar a flag `--interpreter` e passar o interpretador desejado:

```language-bash
\$ pm2 start hello-world.py --interpreter=python
```

### PM2 com Heroku

Isso mesmo, podemos fazer um _deploy_ no Heroku utilizando os recursos disponíveis do PM2!

<%= figure(%{src: "https:\/\/media.giphy.com/media/vQqeT3AYg8S5O/giphy.gif", caption: "Legal, né?!", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

O PM2 possui, além do CLI, um módulo para ser utilizado como dependência do seu projeto. Esse módulo é utilizado para usar as vantagens do PM2 dentro de um container.

Lembra que o Heroku usa essa arquitetura de containers com os _Dynos_?

Então, esse é o caminho! Vamos lá.

Primeiro, devemos adicionar o módulo ao nosso projeto. Estando na raiz do projeto, utilizamos o `npm` ou o `yarn` para instalá-lo:

```language-bash
\$ npm install pm2
```

Utilizaremos esse módulo para dar _start_ no projeto. No Heroku, precisamos definir esse script no `package.json`, que ficará assim:

```language-javascript
// ...
"scripts": {
  "start": "pm2-runtime start ecosystem.config.yml"
}
// ...
```

Perceba que aqui estamos utilizando o módulo `pm2-runtime`, e não o CLI.

O `pm2-runtime` tem o objetivo de agrupar seus aplicativos em um ambiente de produção adequado do Node.js. Ele resolve problemas de execução de aplicativos Node.js dentro dos containers, como controle de fluxo de processo, monitoramento automático de aplicativos etc.

Agora, precisamos criar o arquivo `ecosystem` que estamos referenciando no `package.json`.

Para isso, basta criar um arquivo na raiz do projeto. Esse arquivo deve ter o mesmo nome que está no script de start, ou seja, o nome do arquivo da raiz deve ser `ecosystem.config.yml`.

Em seguida, vamos colocar as configs desejadas. Por exemplo:

```language-yml
apps:

- name: app
  script: ./index.js
```

Agora, é só seguir com o deploy no Heroku!

### Para aprofundar mais!

##### Modo Cluster + Heroku

Uma _feature_ bem legal de se explorar é o `cluster mode`. Como os Dynos são provisionados com multicores, conseguimos melhorar a resiliência e a performance de nossos _apps_.

<%= figure(%{src: "https:\/\/media.giphy.com/media/l0Exx2lopTC4mJaP6/giphy.gif", caption: "Ainda mais legal, né?!", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

Para isso, basta adicionar as propriedades que vimos anteriormente:

```language-yml
apps:

- name: app
  script: ./index.js
  exec_mode: cluster
  instances: max
```

##### Modo Cluster + Heroku + Dashboard

Outra funcionalidade bem bacana é integrar o _dashboard_ do PM2 ao Heroku para, além de ter um bom ambiente, sermos capazes de controlá-lo e monitorá-lo!

<%= figure(%{src: "https:\/\/media.giphy.com/media/ui1hpJSyBDWlG/giphy.gif", caption: "Agora temos um ambiente de verdade, não?!", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

Assim como os passos anteriores, seguindo a proposta do PM2, o _dashboard_ é bem simples de configurar. Basta adicionar as chaves (credenciais) à nossa aplicação que subirá no _Heroku_.

As credenciais ficam disponíveis no dashboard do PM2.

O vídeo abaixo é um passo a passo de como consultá-las:

<%= vimeo "419898726" %>

Tendo as chaves em mãos, ou melhor, no _clipboard_, basta adicioná-las como variáveis de ambiente para nosso `app` do Heroku, conforme já aprendemos:

**Nota**: O comando abaixo pode ser escrito em uma linha apenas, excluindo a necessidade de ter `\` ao final de cada linha.

```language-bash
\$ heroku config:set \
 PM2_PUBLIC_KEY=CHAVE_PUBLICA \
 PM2_SECRET_KEY=CHAVE_PRIVADA \
 PM2_MACHINE_NAME=NOME_DO_SERVER \
 --app NOME_DO_APP_NO_HEROKU
```

Temos três variáveis no comando acima: uma chave pública (`PM2_PUBLIC_KEY`), uma privada (`PM2_SECRET_KEY`) e um nome para identificar a máquina (`PM2_MACHINE_NAME`) que você está utilizando.

Após setar as variáveis, o _Dyno_ automaticamente será reiniciado e, ao atualizar o dashboard, ele já estará mostrando as métricas do ambiente.

**⚠️ Lembre-se**: sempre mantenha credenciais e outros dados sensíveis em variáveis de ambientes. Dessa forma, garantimos a segurança e manutenção das aplicações.

### Vendo tudo isso na prática

Agora assista a este vídeo, que mostra na prática como os principais comandos do PM2 são utilizados.

<%= vimeo "419425761" %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos, está na hora de arregaçar as mangas e colocar a mão na massa com a nossa aula ao vivo!

Bora pro slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 80 minutos

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>

### Agora, a prática

Vamos colocar em prática todo o conteúdo que vimos. Para isso, faremos alguns exercícios práticos utilizando os principais recursos do PM2.

**Exercício 1**: Crie uma API simples que retorne uma mensagem. Feito isso, gerencie seus processos da seguinte maneira:

1. Crie **UM** processo no PM2 utilizando o CLI;

2. Restart e recarregue o processo utilizando o CLI do PM2 (lembre-se que há comandos distintos para cada um);

3. Pare o processo;

4. (Bônus) - Escalone para **mais 5** processos;

5. (Bônus) - Defina para **3** a quantidade de processos;

6. Remova o processo da listagem do `PM2`;

<br>

**Exercício 2**: Crie um arquivo `ecosystem`. O arquivo configurará o PM2 para:

1. Observar alterações no diretório da aplicação e, caso ocorram, reiniciar automaticamente sua aplicação;

2. Ativar o _modo cluster_ e configurar a quantidade de processos rodando para o máximo possível;

3. Reiniciar o processo sempre que ele alcançar o consumo de 100MB de memória.

<br>

**Exercício 3**: Explorando variáveis de ambiente:

1. Adicione à API o uso de uma variável de ambiente que altere a mensagem exibida em sua resposta ou outro comportamento que preferir;

2. Adicione ao arquivo `ecosystem` do exercício anterior dois contextos de variáveis: `env_prod` e `env_homolog`.

3. Execute o processo utilizando o contexto `prod`. Em seguida, execute o processo utilizando o contexto `homolog`. Valide se o comportamento foi alterado.

<br>

**Exercício 4**: Adicione monitoramento à sua API:

1. Crie uma conta no PM2;

2. Adicione o monitoramento à API dos exercícios anteriores, utilizando o comando do CLI do PM2;

3. Verifique se o dashboard web está exibindo as informações de sua API.

### Bônus

**Exercício 5**: Adicione à API criada um endpoint que simule um erro de produção. Para isso, pode ser utilizado o comando `process.exit`. O objetivo é fazer com que o processo pare e então o PM2 entre em ação para restartá-lo.

<br>

**Exercício 6** Adicione mais de um processo a ser iniciado pelo seu arquivo `ecosystem`. Para isso, pode-se adicionar dois processos com comportamentos diferentes, através do mesmo código fonte, ou adicionar mais uma API ou script ao projeto. A ideia é que, ao executar utilizando o `ecosystem`, o PM2 suba processos com **nomes** e características diferentes.

<br>

**Exercício 7**: Execute sua API utilizando o `runtime` do PM2. Para isso:

1. Adicione o módulo do pm2 às dependências do projeto;

2. Altere o script de `start` do seu _app_ (`package.json`) para utilizar o `runtime` do pm2. Lembre-se de referenciar seu arquivo `ecosystem`;

3. Execute o script através do `npm` ou `yarn`.

---

## Recursos Adicionais

- [Nodemon - O PM para fase de desenvolvimento](https://www.npmjs.com/package/nodemon) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação Oficial PM2 - Métricas Customizadas](https://pm2.io/docs/plus/guide/custom-metrics/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Blog Oficial PM2 - Modo Cluster com Node, como funciona.](https://blog.pm2.io/2018-04-20/Node-js-clustering-made-easy-with-PM2/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação Oficial Node.js - Como funciona o modo cluster](https://devcenter.heroku.com/articles/deploying-nodejs) {: .external-link target="_blank" rel="noreferrer noopener" }

- [PM por debaixo dos panos - Utilizando o systemd](https://rollout.io/blog/running-node-js-linux-systemd/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Learn yaml in Y minutes](https://learnxinyminutes.com/docs/yaml/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
