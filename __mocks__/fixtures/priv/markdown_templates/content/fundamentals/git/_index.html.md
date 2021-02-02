## Dinâmica de controle de versão
###### Tempo sugerido para realização: 40 minutos

Hoje vamos aprender sobre o uso do Git, um sistema de controle de versão amplamente utilizado no mundo do desenvolvimento de software!

***Mas você sabe porque usar um sistema de controle de versão?***

Antes de partir para os conceitos, vamos entender as dificuldades de se controlar a versão de um arquivo sem um sistema dedicado a essa função. Para isso, vamos fazer uma pequena dinâmica.

Antes de começar, você deve abrir o artigo [5 motivos para você aprender JavaScript <3](/fundamentals/git/problema_git.txt) {: .external-link target="_blank" rel="noreferrer noopener" } pelo navegador e copiar o conteúdo para seu editor de textos.

Agora, uma vez divididas as duplas, definam quem será a **pessoa A** e a **pessoa B**. A partir daí, cada um deve seguir exclusivamente as instruções designadas para a sua letra e ao final faremos a junção dos dois arquivos, um passo muito importante que chamamos de `merge`.

Vocês não precisam e não vão utilizar o Git para essa dinâmica específica. Vocês devem utilizar apenas o Slack, Zoom, email e qualquer outro meio de comunicação para transmitir esses códigos.

##### ⚠️ Faça os exercícios a seguir em dupla com seus colegas.
##### ⚠️ Use o Zoom ou o Slack para a comunicação com sua dupla!

### 1a parte
##### Pessoa A

* Acrescente mais um motivo para aprender o JavaScript ao final do artigo.

##### Pessoa B

* Acrescente mais um motivo para aprender o JavaScript ao final do artigo.

##### Merge (Pessoa A e Pessoa B)

* Pensem em uma maneira de unir as duas informações adicionadas em um só arquivo, que será utilizado pelas pessoas integrantes da dupla a partir daqui. Após isto, ambos devem salvar o arquivo e armazenar em suas respectivas máquinas.


### 2a parte
##### Pessoa A

* Interprete e reescreva o motivo criado pelo seu colega com as suas palavras, adicionando ao final do seu arquivo;

* Salve o arquivo alterado e feche o documento no editor de textos;

* Coloque o motivo reescrito pela sua dupla em sua redação.

##### Pessoa B

* Interprete e reescreva o motivo criado pelo seu colega com as suas palavras, adicionando ao final do seu arquivo;

* Salve o arquivo alterado e feche o documento no editor de textos;

* Coloque o motivo reescrito pela sua dupla em sua redação.

##### Merge (Pessoa A e Pessoa B)

* Unam as informações adicionadas em um só arquivo que será utilizado pelas pessoas integrantes da dupla a partir daqui. Após isto, ambos devem salvar o arquivo e armazenar em suas respectivas máquinas.

* E aí, conseguiram voltar o parágrafo escrito pelo colega exatamente para a forma como estava antes?

### 3a parte

Para os próximos passos, considere sempre a posição dos motivos no artigo inicial (antes das alterações).

##### Pessoa A

* Reescreva o 2o motivo com as suas palavras e coloque-o na posição 3;

* Reescreva o 4o motivo com as suas palavras e coloque-o na posição 1;

* Reescreva o 3o motivo com as suas palavras e coloque-o na posição 5;

* Coloque o motivo escrito pelo seu colega em sua redação.

##### Pessoa B

* Reescreva o 5o motivo com as suas palavras e coloque-o na posição 2;

* Reescreva o 4o motivo com as suas palavras e coloque-o na posição 1;

* Reescreva o 3o motivo com as suas palavras e coloque-o na posição 4;

* Coloque o motivo escrito pelo seu colega em sua redação.

##### Merge (Pessoa A e Pessoa B)

* Unam as informações adicionadas em um só arquivo que será utilizado pelas pessoas integrantes da dupla a partir daqui. Após isto, ambos devem salvar o arquivo e armazenar em suas respectivas máquinas.

### Final

Gravem uma versão das entregas feitas nas partes _1, 2 e 3_ desta tarefa.

Ih, você sobrescreveu a entrega? Agora imagine se isso acontecesse no seu trabalho e você precisasse entregar a correção de um bug baseado na última versão estável do seu código. 🤦🏽‍♀

Você acha que funcionaria dar `Ctrl+Z` mil vezes pra desfazer as alterações que você implementou nos últimos dias **(ou semanas)**? 😭

Qual seria, na sua opinião, a forma mais efetiva de se evitar que esse tipo de problema acontecesse?  _(discutir com a dupla)_ 🤔

---

## O que vamos aprender?

Já era hora de parar de enviar seus arquivos de código via e-mail, não é mesmo? **Adeus arquivos com nomes do tipo xxxxx-v1, xxxxx-v2, xxxxx-Final, xxxxx-Final2.zip hahaha!**

Hoje você vai aprender os principais conceitos do controle de versão e os diferentes tipos de sistemas de controle de versão disponíveis.

Depois de ter uma visão geral, vamos focar no ***Git***, um sistema de controle de versão distribuído (DVCS) que permite que um time trabalhe em um mesmo projeto ou em um mesmo arquivo e provê ferramentas para contornar a maioria dos problemas que podemos ter nesse tipo de situação.

Esse é o sistema que utilizaremos durante todo o seu curso aqui na Trybe e, por isso, é importante que você fique bem familiarizado com ele para fazer tudo o que temos pela frente.

#### ⚠️ Tenha clareza que compreender o uso do Git é um processo contínuo. Você vai aprender muito nesta aula e deve se esforçar para entender seu funcionamento, mas tenha tranquilidade, porque essa abstração não acontece do dia para a noite.

É importante dizer que, apesar de o ***Git*** ser um sistema de controle de versão, o funcionamento dele é muito diferente dos outros sistemas que tentam cumprir o mesmo propósito. Se você já conhece algum outro `VCS`, tente não traçar um paralelo.

Os principais pontos abordados serão:

* O que é o ***Git***?

* Qual a principal diferença para os outros `VCS's`?

* Como configurar o ***Git*** na sua máquina?

* Como iniciar um repositório local?

* O que é o ***GitHub***?

* Como subir seu repositório local para o ***GitHub***?

* O que é _Branch_, _Merge_, _Commit_?

---

### Você será capaz de:

* Instalar e configurar o ***Git*** no seu computador;

* Salvar seus projetos no repositório ***Git*** local;

* Controlar as alterações e versões dos seus arquivos;

* Enviar seus projetos para o repositório remoto do ***GitHub***.

---

## Por que isso é importante?

Entender como funciona e colocar em prática o ***Git*** em seus projetos é crucial no dia a dia de quem trabalha com desenvolvimento de software. O ***Git*** é o mecanismo de controle de versão mais popular e, por consequência, a chance de você trabalhar com ele é bem alta.

Utilizando o ***Git***, você e seu time vão conseguir colaborar de forma assíncrona e harmoniosa, ganhando produtividade no momento de _"juntar as partes"_ que cada um fez e tendo segurança de que todo o trabalho realizado está salvo. Estar salvo depende de você sempre dar _"push"_ (enviar as alterações para o repositório online) antes de sair com seu computador por aí, né? 😊

O **_GitHub_**, ferramenta online que hospeda repositórios ***Git***, é uma excelente ferramenta para toda a gestão do seu código, tendo recursos para acompanhamento de projeto ágil de software, controle de _Issues_, quadros _Kanban_, _Pull Requests_ que permitem um _Code Review_ mais bem feito, entre outras dezenas de integrações que vão facilitar sua vida com desenvolvimento de software.

Agora que você já entendeu um pouco sobre o que é o ***Git*** e como ele pode ajudar, vamos aprender!

---

## Conteúdos

###### Tempo sugerido para realização: 50 minutos

### Mas o que é mesmo esse Controle de Versão?

Até aqui, você já sentiu na pele a dificuldade de gerenciar o trabalho realizado por diferentes pessoas ao mesmo tempo a fim de realizarem uma entrega conjunta.

Esse mesmo desafio assombrava o dia a dia de quase toda pessoa que trabalhava com desenvolvimento e precisava guardar diversas versões de seus sistemas, depois juntar os pedaços daquilo que era produzido ou alterado por cada colega, de modo a ter um código final estável.

O surgimento das comunidades de desenvolvimento de _"software livre"_ tornou esse desafio ainda mais evidente, já que havia milhares de pessoas trabalhando juntas, em horários e localidades diversas, no código de um mesmo produto.

Assista o vídeo a seguir que mostra o que é esse Controle de Versão. Na sequência leia esse [ artigo](https://www.devmedia.com.br/sistemas-de-controle-de-versao/24574) {: .external-link target="_blank" rel="noreferrer noopener" } que também abrange esse assunto. **Leia-o atentamente.** 👩🏽‍🏫

<%= youtube_video "E6fK7-O8Ow0" %>

Agora que você já entende qual a finalidade do controle de versão, vamos a três conceitos importantíssimos para o seu trabalho:

* Ramificação (Branching);

* Mesclagem (Merge);

* Resolução de conflitos.

Em primeiro lugar, mais importante do que saber a sintaxe dos comandos, `agora é hora de entender os conceitos`.

Tendo isso em vista, veja este video sobre `branch` e `merge`:

<%= vimeo "393015285" %>

### Autenticação - Como funciona a conexão entre local e remoto?

Como tudo o que você vai fazer ao longo do curso (e muito provavelmente da sua vida profissional) irá ter como workspace principal o GitHub, é necessário estabelecer uma **ponte** entre o ***Git*** (_local_) e o ***GitHub*** (_remoto_), e sobretudo que essa ponte seja **segura**.

É aí que entra o processo de ***autenticação*** do GitHub, que lhe permitirá, ao mesmo tempo, proteger suas informações pessoais e mandar comandos para o GitHub diretamente pelo seu terminal!

Quando esse processo é feito, você informa ao sistema remoto que é para utilizar as credenciais da sua conta ao executar algum comando do git e, ao mesmo tempo, comprova para o GitHub que você é exatamente quem diz que é.

##### Autenticar via SSH ou HTTPS?

Existem duas formas pelas quais você pode acessar o GitHub pelo terminal: HTTPS (Hypertext Transfer Protocol Secure) e SSH (Secure Shell). Ambas as formas são válidas, mas possuem algumas diferenças entre si:

- **SSH** ou ***Secure Shell***: é um protocolo de criptografia de rede que serve para transferir dados de forma segura mesmo em redes inseguras. Usando o protocolo SSH, você pode se conectar ao GitHub sem precisar digitar seu nome e chave de acesso pessoal a cada comando executado.

- **HTTPS** ou ***Hypertext Transfer Protocol Secure***: é uma extensão do protocolo de internet HTTP (_você verá mais sobre esse protocolo no dia de conteúdo que trata sobre internet!_) que utiliza certificados digitais para autenticar os dados e permitir que eles sejam cripografados de forma segura.

Uma explicação mais detalhada da diferença entre esses dois modelos foge do escopo dessa aula, mas nesse momento basta saber que ***como o SSH nos permite pular a etapa de digitar login e senha do GitHub a cada comando (e ao longo do curso serão _muuuuuuuuitos_ comandos), iremos utilizar o SSH como modelo padrão de autenticação***. Para isso você deverá seguir alguns passos, mas não se assuste: é mais simples do que parece! Quer ver só? Então vamos praticar um pouco!

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 70 minutos

Antes de começar, vamos nos encontrar ao vivo pelo Zoom para aprender na prática como funciona o versionamento do ***Git***.

Aula ao vivo! Vamos pro Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

Agora é hora de colocar em prática o que você aprendeu! 😉

### Quiz

Mas lembre-se! O quiz é para **fixação dos conteúdos** e **não** tem **caráter avaliativo**, fique tranquilo!

* [Responda este Quiz com ajuda dos conteúdos, se necessário](https://forms.gle/pjdre9Dtv2vGN7aS6) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

### Parte 1 - Instalação e configuração

Vamos começar realizando a instalação e configuração do ***Git***. Siga o passo a passo para deixar o ***Git*** pronto em seu ambiente.

#### Instalação

##### Linux

Para instalar o ***Git*** abra o seu terminal e digite o seguinte comando:

```language-shell
sudo apt-get install git-all
```

##### macOS

Para instalar o ***Git*** abra o seu terminal e digite o seguinte comando:

```language-shell
brew install git
```

Caso você não possua o `brew` instalado digite o comando abaixo no seu terminal e após a instalação execute novamente o comando acima:

```language-shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

#### Configuração

O ***Git*** vem com uma ferramenta chamada `git config` que permite ver e atribuir variáveis de configuração que controlam todos os aspectos de como o ***Git*** aparece e opera.

##### Identidade

O primeiro passo é configurar sua identidade, seu nome e endereço de e-mail, isso é importante pois cada commit usa esta informação, e ela é carimbada de forma imutável nos commits que você criar. Para configurar isso digite o comando abaixo em seu terminal:

> É preciso que o e-mail informado seja o mesmo que você utilizará para criar a sua conta no GitHub

```language-shell
git config --global user.name "Seu nome"
git config --global user.email seuemail@exemplo.br
```

##### Editor

Um outro ponto legal de se configurar é o editor onde você poderá abrir o arquivo de configuração do ***Git***, `.gitconfig`, fica fácil de você visualizar as configurações do ***Git*** e também adicionar outras que julgue necessário. Para isso execute o comando à seguir no seu terminal:

```language-shell
git config --global core.editor "code --wait"
```

> Esse comando define o editor do `.gitconfig` como o `VS Code`, que é o editor que você usará ao longo curso.
Caso queira abrir o arquivo de configuração no `VS Code` basta executar em seu terminal o comando abaixo. Para isso certifique-se que você se encontra no diretório onde o arquivo `.gitconfig` está localizado.

```language-shell
code .gitconfig
```

#### Verificando a instalação e a configuração

Agora que você já configurou tudo, vamos fazer uma validação e verificar se tudo está certinho! 😉

No terminal:

* Digite `git --version` para saber qual versão do git está instalada.
  * Seu terminal deve conter algo parecido com:

```language-shell
git version 2.x.y
```

* Digite `git config --list`
  * Seu terminal deve conter algo similar a isso:

```language-shell
user.email=seuemail@gmail.com
user.name=seunome
```
  * O email deve ser o mesmo que você utilizou para se registrar no GitHub

Pronto, agora que tudo está devidamente instalado e configurado, vamos ao próximo passo.

---

### Parte 2 - Criar conta no ***GitHub***

* [Crie sua conta no **_GitHub_** usando seu e-mail pessoal](https://github.com/join) {: .external-link target="_blank" rel="noreferrer noopener" } 🐙

---

### Parte 3 - Adicionando uma chave SSH na sua conta do ***GitHub***

Neste passo, vamos aprender como adicionar uma chave SSH à sua conta do ***GitHub***, o que vai te permitir fazer _pushes_ e _pulls_ sem ter que ficar digitando usuário e senha, como já explicamos. É de extrema importância que você siga **TODOS** os passos apresentados no artigo, apenas dessa forma você obterá o resultado esperado.

#### Gerando uma chave SSH

Abra seu terminal e digite o comando abaixo. Ele cria uma nova chave SSH, usando o seu email como rótulo.

> É preciso que o e-mail informado seja o mesmo que você utilizou para criar a sua conta no GitHub

```language-shell
ssh-keygen -t rsa -b 4096 -C "seuemail@gmail.com"
```

Durante o processo irá aparecer escrito no terminal `Enter a file in which to save the key`, quando isso acontecer pressione `Enter` para aceitar a localização padrão `/home/you/.ssh/id_rsa`.

```language-shell
Enter a file in which to save the key (/home/you/.ssh/id_rsa): [Press enter]
```

Agora você deve digitar uma senha segura.

```language-shell
Enter passphrase (empty for no passphrase): [Type a passphrase]
Enter same passphrase again: [Type passphrase again]
```

#### Adicionando sua chave SSH ao ssh-agent

Primeiro você deve iniciar o `ssh-agent` em background:

```language-shell
eval "$(ssh-agent -s)"
```

Agora você deve adicionar sua chave privada SSH ao `ssh-agent`. Para isso execute o comando abaixo no terminal:

```language-shell
ssh-add ~/.ssh/id_rsa
```

#### Adicionando a chave SSH na sua conta do GitHub

Antes de tudo você deve copiar a sua chave SSH. Para isso, você vai aprender um comando bem útil, mas que nem sempre vem instalado nativamente no Linux: o `xclip`.

Para entender como funciona o `xclip`, temos que nos perguntar uma coisa: como se copia um texto ou uma parte dele quando estamos trabalhando com um ambiente de terminal? Provavelmente a primeira coisa que se passou pela sua cabeça foi abrir o arquivo em um editor de texto, selecionar aquilo que você deseja copiar, fechar o editor de texto e depois colar em outro lugar.

Não há nada de errado com essa lógica: ela funciona, mas convenhamos que dá pra ser um pouquinho mais eficiente, né? Aí entra o tal do `xclip`. Usando esse comando podemos fazer uma ponte diretamente entre os comandos que serão utilizados no terminal e a área de transferência do Linux, ou seja, dá pra copiar a saída de um comando de forma direta pelo terminal!

Vamos ver como funciona? Execute a sequência de comandos abaixo:

```language-shell
# Como o xclip não vem instalado por padrão na maioria das distribuições,
# precisaremos instalá-lo usando o comando a seguir:
sudo apt-get install xclip

# Agora utilize o comando abaixo para copiar o conteúdo da sua chave id_rsa.pub
# Para garantir que o conteúdo foi copiado dê Ctrl + V em um editor de texto
xclip -sel clip < ~/.ssh/id_rsa.pub
```

Caso o `xclip` não funcione, execute o comando abaixo e copie manualmente a saída do terminal.

```language-shell
cat ~/.ssh/id_rsa.pub
```

Entre no seu ***GitHub*** e siga os passos abaixo:

* No canto superior direito do ***GitHub***, clique na sua foto de perfil e clique em **Settings**;

* Na barra lateral esquerda, clique em **SSH and GPG keys**;

* Clique em **New SSH key** ou **Add SSH key**;

* No campo `Título`, adicione um descrição para a nova chave;

* Cole sua chave dentro do campo `Key`;

* Clique em **Add SSH key**;

* Caso seja solicitado, confirme sua senha do Github.

Se tiver problemas ao seguir o tutorial acima, consulte a [documentação oficial do ***GitHub***](https://help.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

### Parte 4 - Do `git init` ao `git push`

Agora você vai aprender a iniciar um repositório ***Git***, fazer seu primeiro _commit_ e subi-lo para um repositório no ***GitHub***.

> Esse é um momento apenas de leitura, não é necessário replicar os passos que você verá agora. Foque em entender todo o fluxo, pois na próxima parte você irá precisar dele!
#### Criando um repositório local

Antes de se criar um repositório é preciso criar uma pasta para ele. Para isso você deve utilizar o comando `mkdir`, como vimos anteriormente, e então navegar para a pasta criada com o comando `cd`.

Para criar um repositório você deve digitar o comando abaixo. É muito importante que esteja dentro da pasta criada para o repositório.

```language-shell
git init
```

Como seu nome bem diz, esse comando é responsável por iniciar um repositório `Git` dentro da pasta em que foi executado.

Para verificar se um repositório `Git` foi de fato iniciado, você pode executar o comando `git status`, que retorna o status do repositório. No contexto de um repositório recém criado onde nenhuma modificação foi feita você receberia a seguinte resposta:

```language-shell
No ramo master

No commits yet

nada para enviar (crie/copie arquivos e use "git add" para registrar)
```

#### Adicionando e comitando

Considere que você já criou alguns arquivos e fez algumas modificações. Para que possamos versionar alterações feitas no código é preciso sempre seguir a seguinte sequência:

* Adicionar (`add`)

* Comitar (`commit -m "mensagem"`)

Os comandos ficam da seguinte forma:

```language-shell
# Adicionar todos os arquivos modificados
git add .

# Você também pode adicionar arquivos específicos
git add meu_arquivo.js

# Então você comita a alteração
# Ao comitar você deve adicionar também uma mensagem que descreve o que aquela alteração faz

git commit -m "Mensagem sobre a alteração feita"
```

#### Criando um repositório no GitHub

Agora é o momento de criar um repositório remoto. Para isso acesse o ***GitHub*** e procure o ícone com um sinal `+` na barra superior e ao clicar nele busca pela opção `New repository`. Você será redirecionado para o página semelhante a essa:

<%= figure(%{src: "/fundamentals/git/images/create-new-repo.png", caption: "Página de criação de repositório", class: "standard-screenshot text-center"}) %>

Você deve então adicionar um nome ao seu repositório, como por exemplo `meu-super-repo`. Após fazer isso o botão `Create repository` será habilitado e ao clicar nele seu repositório será criado.

> Por enquanto ignore as outras opções, a medida que for avançando no curso você aprenderá mais sobre elas!
Como seu repositório estará vazio, o ***GitHub*** lhe dará algumas dicas, você verá uma página parecida com essa:

<%= figure(%{src: "/fundamentals/git/images/created-repo.png", caption: "Repositório vazio criado", class: "standard-screenshot text-center"}) %>

Você deverá clicar no botão `SSH` e então copiar a URL gerada. Você irá precisar dela para realizar a conexão entre seu repositório local e seu repositório remoto.

#### Conectando o repositório local com o remoto

Para conectar os dois repositórios você deverá abrir o seu terminal, acessar o diretório do seu repositório e então executar o seguinte comando:

```language-shell
git remote add origin git@github.com:user-github/repo-name.git
```

Sendo `origin` um apelido para o seu repositório, poderia ser qualquer outro. E no lugar da URL `git@github.com:user-github/repo-name.git` deve ir a gerada pelo seu repositório.

Para verificar que tudo funcionou corretamente, execute o comando `git remote -v`, você obterá um resultado semelhante a esse:

```language-shell
origin	git@github.com:user-github/repo-name.git (fetch)
origin	git@github.com:user-github/repo-name.git (push)
```

#### Sincronizando os repositórios

Os repositórios já estão criados e também já estão conectados, agora é a hora de enviar as alterações feitas no repositório local para o repositório remote.

Para isso, certifique-se que as alterações já foram adicionadas e comitadas e então execute o seguinte comando:

```language-shell
git push origin master
```

Com isso, você está enviando as alterações feitas localmente para o a branch principal, `master`, do seu repositório remoto, `origin`.

Se tudo ocorreu conforme o espero, acesse novamente, ou atualize, a página do seu repositório no ***GitHub***, você então verá que os arquivos e alterações que comitou agora se encontram lá!

---

### Parte 5 - O seu repositório no ***GitHub***

Pronto! Agora que você já é capaz de gerenciar localmente seus códigos e também enviá-los para o ***GitHub***, é hora de colocar a casa em ordem!

Antes de começar, crie uma pasta com o nome `trybe-exercises` para manter todos os exercícios que desenvolverá ao longo do curso. Já dentro dessa pasta, crie uma outra pasta com o nome `exercises` e dentro dela uma última pasta com o nome `2.1`. Seu caminho deve ficar algo como:

```language-shell
.../trybe-exercises/exercises/2.1
```

---

Durante seu curso na _Trybe_, seus projetos serão entregues através de `pushes` nos repositórios do **_GitHub_**. Para podermos simular um exercício feito, você criará um arquivo `.txt` com um nome de sua escolha (Exemplo: `trybe-skills.txt`) e utilizará o conteúdo abaixo.

```language-txt
O que eu vou aprender na Trybe:

- Unix
- Bash
- Git
```

No final, ao executar o comando `ls -l` na pasta `2.1`, você deverá receber um retorno parecido com:

```language-sh
ls -l

total 0
-rw-r--r--  1 tryber  staff  0 Jan 27 00:34 trybe-skills.txt
```

Agora vamos transformar essa pasta em um repositório ***Git***:

* Retorne a pasta `trybe-exercises`;

* Inicialize o repositório com `git init`;

* Crie um arquivo de `README` utilizando o comando `touch README.md`;

* Crie um `commit` inicial utilizando:

```language-sh
git add .
git commit -m "Initial commit"
```

* Vá até o seu _GitHub_ e [crie um repositório público](https://help.github.com/en/github/getting-started-with-github/create-a-repo) {: .external-link target="_blank" rel="noreferrer noopener" }, onde você irá guardar todos os exercícios que desenvolverá ao longo do curso;

  * Dê ao repositório um nome descritivo, como por exemplo `trybe-exercises`;

  * ⚠️ Lembre-se de **não** inicializar o repositório com um arquivo `README.md`, pois você já criou um nos passos anteriores! 😉

* Clique no botão **SSH** e então copie a _URL_ do repositório;

  * Execute o comando para adicionar a _URL_ ao repositório local `git remote add origin "URL_DO_REPOSITÓRIO"`;

* Verifique se tudo está certo com sua _URL_ remota utilizando o comando `git remote -v`. Seu terminal deve conter algo similar a isso:

```language-shell
origin	git@github.com:john-snow/know-nothing.git (fetch)
origin	git@github.com:john-snow/know-nothing.git (push)
```

  * Em que `john-snow` corresponde ao seu username e `know-nothing` ao nome que você deu ao seu repositório;

* Agora que tudo está devidamente configurado e verificado, é hora de subir seu primeiro `commit` para o **_GitHub_**! 🤩

* Execute o comando `git push origin master` no terminal;

* Vá até o seu GitHub e verifique as novas alterações.

Agora que tal adicionar uma descrição do que é seu repositório no `README.md` ? 💪🏼.

  * O `README.md` que você recriou é referente ao repositório `trybe-exercises`, tendo isso em mente é interessante que você adicione informações relacionadas ao curso da Trybe e o que você está desenvolvendo e o que irá desenvolver;

  * Uma outra coisa interessante a se fazer é adicionar um `README.md` dentro da pasta `exercises/2.1` para colocar a descrição dos exercícios que você desenvolveu;

  * Lembre-se de fazer um _commit_ quando terminar de alterar os arquivos;

  * Depois do _commit_, faça sempre um _push_;

  * Confira as alterações no **GitHub**.

Não se preocupe, em breve você verá mais sobre como organizar seus exercícios e com a prática tudo isso ficará muito mais simples. 🚀

---

## Recursos Adicionais (opcional)

* [Livro oficial sobre ***Git***](https://git-scm.com/book/pt-br/v2) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Ótimo curso da _Udemy_ sobre Git](https://www.udemy.com/course/git-e-github-para-iniciantes/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso da _Udacity_ sobre Git](https://www.udacity.com/course/version-control-with-git--ud123) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Como conectar com o repositório no ***GitHub*** via _SSH_?](https://help.github.com/en/articles/connecting-to-github-with-ssh) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Reforço sobre aprendizado do ***Git*** em um guia rápido](https://www.freecodecamp.org/news/learn-the-basics-of-git-in-under-10-minutes-da548267cc91/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Instalando o Git - Git Setup](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Configuração inicial - Git Config](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Configura%C3%A7%C3%A3o-Inicial-do-Git) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Adicionando chave SSH na conta do ***GitHub***](https://medium.com/@rgdev/como-adicionar-uma-chave-ssh-na-sua-conta-do-github-linux-e0f19bbc4265) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Do primeiro commit ao primeiro Push](http://www.devfuria.com.br/git/tutorial-iniciando-git/) {: .external-link target="_blank" rel="noreferrer noopener" }


---

## Próximo

Agora que você consegue utilizar o ***Git*** e o ***GitHub*** para versionar seu código, chegou a hora de aprofundar seu conhecimento nas ferramentas oferecidas por esses sistemas.

<%= next_button(@conn) %>
