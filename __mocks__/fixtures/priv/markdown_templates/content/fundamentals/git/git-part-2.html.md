## O que vamos aprender?

Na última aula você aprendeu que o ***Git*** e o ***GitHub*** podem te ajudar muito a trabalhar de maneira colaborativa e distribuída. 🧩

Hoje você aprenderá algumas técnicas para maximizar a eficiência desse trabalho em grupo, garantindo uma boa qualidade do software que você escreve! 😮

---

### Você será capaz de:

* Copiar um repositório já existente no ***GitHub*** para o seu computador;

* Abrir _Pull Requests_ e realizar _Code Reviews_;

* Trabalhar em um mesmo projeto, com mais de uma pessoa, de forma assíncrona e distribuída.

---

## Por que isso é importante?

Entender o conceito de ***Git*** é uma das habilidades fundamentais que você vai exercitar ao longo de todo o curso. É fato que, por ser um conceito novo e diferente para você, será necessário muita prática para sedimentar esse conceito.

É por isso que utilizamos diariamente o ***Git*** e o ***GitHub*** no curso, para que você tenha inúmeras chances de executar os comandos do ***Git***, criar _repositórios_, fazer _commits_ e contribuir com suas _Pull Requests_ nos projetos.

Somente colocando em prática diariamente os conceitos do ***Git*** você conseguirá se aperfeiçoar no uso de repositórios e do versionamento de código! ✌️ 💪 👊

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Parte 1 - Baixando repositórios com o `git clone`

Caso você queira copiar um repositório ***Git*** já existente — por exemplo, um projeto em que você queira contribuir —, o comando necessário é: `git clone`.

Mais do que baixar o código atual, o ***Git*** recebe uma cópia de quase todos os dados que o servidor possui. Cada versão de cada arquivo no histórico do projeto é obtida quando você roda o comando `git clone`.

* Vamos clonar o projeto que você criou na última aula para testar como funciona.

    * Crie uma nova pasta fora do diretório dos exercícios ***trybe-exercises***.

    * Navegue para a pasta criada e execute o comando

```language-shell
git clone urlDoSeuRepositórioTrybeExercises
```

* Você irá perceber que é exatamente um _"clone"_ do que você subiu para o ***GitHub***.

* Normalmente, ao participar dos projetos da **Trybe**, você irá precisar desse comando para conseguir baixar o repositório que já está configurado e poder focar apenas nos requisitos do projeto.

---

### Parte 2 - Do `git log` ao `Pull Request`

Vamos aprender um pouco mais sobre **Git** e seus comandos para lidar com os `commits` e `pushes` que você aprendeu a fazer. 😁

### 2.1 - **Git log**

<%= vimeo "461974406" %>

### 2.2 - **Git remove**

<%= vimeo "461988450" %>

### 2.3 - **Git ignore**

<%= vimeo "463133803" %>

### 2.4 - **Git push, pull, fetch**

<%= vimeo "465645944" %>

### 2.5 - **Pull Request no GitHub**

Agora vamos aprender a como criar um _Pull Request_ no ***GitHub***. Esse processo é importante para você realizar sugestões e contribuir com alterações em um repositório, basta ter a permissão para leitura.

A vantagem de se realizar o _Pull Request_ é que você garante que o branch-padrão terá todo seu trabalho concluído e aprovado, realizando todas as novas alterações em uma branch separada.

Vamos observar o processo a baixo:

1 - Navegue até a página principal do repositório no GitHub.

2 - No menu _"Branch"_, você pode digitar o nome da sua nova branch e clicar em _Create new branch_.

<%= figure(%{src: "/fundamentals/git/images/create-pullrequest.png", caption: "Página de criação para Pull Request", class: "standard-screenshot text-center"}) %>

3 - Acima da lista de arquivos, clique em  _Pull request_.

<%= figure(%{src: "/fundamentals/git/images/pullrequest.png", caption: "Página de botão para Pull Request", class: "standard-screenshot text-center"}) %>

4 - Use o menu suspenso do branch base para selecionar o branch em que deseja fazer merge de suas alterações. Em seguida, use o menu suspenso do branch de comparação para escolher o branch de tópico no qual você fez as alterações.

<%= figure(%{src: "/fundamentals/git/images/open-pullrequest.png", caption: "Página de abertura de Pull Request", class: "standard-screenshot text-center"}) %>

_Obs:_ Para seguir para o passo 5 é preciso ter o primeiro commit realizado, caso tenha dificuldades em realizar pelo GitHub, siga a dica _**Extra**_ realizando pelo seu terminal.

5 - Digite um título e uma descrição para a pull request.

<%= figure(%{src: "/fundamentals/git/images/pullrequest-description.png", caption: "Página de descrição de Pull Request", class: "standard-screenshot text-center"}) %>

6 - Para criar um pull request que está pronto para revisão, clique em _Criar Pull Request_. Para criar um rascunho de pull request, use o menu suspenso e selecione _Criar rascunho de pull request_ e, em seguida, clique em _Rascunho de Pull Request_.

<%= figure(%{src: "/fundamentals/git/images/pullrequest-send.png", caption: "Página para criar Pull Request", class: "standard-screenshot text-center"}) %>

_**Extra:**_ Você também pode criar o pull request, após fazer o `git push` na sua máquina local. Aparecendo logo após o push o botão _Comparar e Pull Request_:

<%= figure(%{src: "/fundamentals/git/images/pullrequest-open-button.png", caption: "Botão para criar Pull Request", alt: "Botão para criar Pull Request", class: "standard-screenshot text-center"}) %>

Após clicar é só realizar os passo de 4 a 6.

---

### Parte 3 - Code Review

Antes de iniciar os exercícios, leia o conteúdo sobre _Code Review_ para que você tenha todo o conhecimento necessário para fazer uma bela e direcionada revisão de código! ✌🏼

* [Texto sobre Code Review](https://app.betrybe.com/course/real-life-engineer/code-review) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Vamos ver agora, na prática, como uma pessoa que usa essas ferramentas para melhorar a qualidade do seu código faz uso dos recursos de _Pull Requests_ e _Code Reviews_ e como isso vai ser usado no seu dia a dia aqui na **Trybe**.

Aula ao vivo! Vamos pro Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

Agora que você já testou suas novas habilidades com o ***Git***, vamos iniciar a parte prática, que no final das contas vai ser o que você irá usar por muito tempo em desenvolvimento de software.

Na última aula, você iniciou um repositório de _exercícios_ e dentro dele uma pasta com uma lista de habilidades a serem aprendidas no curso da Trybe. O objetivo agora é que você realize algumas modificações para treinar suas habilidades de ***Git*** e para que você entenda completamente qual o fluxo de desenvolvimento utilizando um _DVCS_. 👾

### Quiz

Mas lembre-se! O quiz é para **fixação dos conteúdos** e **não** tem **caráter avaliativo**!

* [Responda este Quiz com ajuda dos conteúdos se necessário](https://forms.gle/hYk2RXWqqGXFifQFA) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

### Agora a prática

##### ⚠️ Para fazer os exercícios a seguir, você deve utilizar o projeto com o texto no arquivo `.txt`, localizado dentro do diretório `trybe-exercises/exercises/2.1`, que você criou nas aulas anteriores.

Dessa vez, cada um deve fazer os exercícios em seu computador, ok? Vamos lá! 😋

1. Navegue até a raiz do projeto com o arquivo .txt;

2. Verifique se não existe nada sem _"commitar"_ utilizando `git status`;

    * Caso exista algo, verifique se é necessário e faça o `commit`, ou remova-o.

3. Crie uma nova `branch` com o nome `trybe-skills-changes` e faça checkout nela;

4. No arquivo `.txt`, ao final da lista de habilidades , adicione mais duas habilidades que serão desenvolvidas na Trybe;

  * _Exemplo:_

```language-txt
O que eu vou aprender na Trybe:

- Unix
- Bash
- Git
- HTML
- CSS
```

    * Faça um `git add nome-do-arquivo.extensao`;
 * Você pode adicionar todos os arquivos que você modificou usando `git add .`, mas evite isso em commits com muitos arquivos para não adicionar nenhuma alteração por engano;
    * Agora um `git commit -m "Mensagem que você gostaria"`;
* Uma boa prática é sempre resumir o que o seu commit está alterando, por exemplo, `git commit -m "Adiciona nova skill"`

* Evite juntar muitas modificações em um único commit. Assim, caso haja algum erro no código, ficará mais fácil visualizar em qual alteração ele surgiu.
    * E por último um `git push -u origin trybe-skills-changes`;

    * Abra um _Pull Request_ com uma descrição detalhada:

        * Dê contexto para o que você está fazendo, passe links ou cite especificações que forem relevantes. Ex: _"Trabalho feito para a semana 1 do curso de Software Developer da Trybe. Aqui, o desafio foi... E para resolver o problema fizemos... E o resultado foi..."_

        * O merge deve ser feito apenas quando chegar no exercício 10

5. Retorne para a branch principal, `master`, com o comando: `git checkout master`;

6. Verifique que você está na branch `master`, com o comando: `git branch` (esta branch deve estar com o formato original, sem as habilidades recém adicionadas);

7. Crie uma nova `branch` `trybe-skills-updates`  a partir da  `master` e faça checkout nela;

8. No mesmo arquivo `.txt` que você modificou no _passo 4_, também ao final da sua lista de habilidades, adicione mais um aprendizado que você terá nos próximos blocos;
    * Atenção! Aqui o arquivo não terá as alterações feitas anteriormente na outra branch 😉

    * Faça um `git add nome-do-arquivo.extensao`

    * Agora um `git commit -m "Mensagem que você gostaria"`

    * e por último um `git push -u origin trybe-skills-updates`
    
    * Após o primeiro _"push"_ da sua branch, você pode usar apenas o comando `git push` 
    
    * Abra um _Pull Request_ com uma descrição amigável.

        * O merge deve ser feito apenas quando chegar no exercício 10

9. No **Slack**, procure pelo canal _"code-review-*"_  relativo à sua turma, e avise que você chegou a este ponto. O próximo passo será realizar o _Code Review (CR)_ do projeto de outras pessoas estudantes. Entre em pelo menos um _Pull Request_ e deixe alguns comentários para seus colegas;

10. Agora, faça o `merge` das _branches_ `trybe-skills-changes` e `trybe-skills-updates` na `branch` `master`, através do _Pull Request_:

  * Primeiro, vá até a página do primeiro _Pull Request_ (branch `trybe-skills-changes`) e faça o _merge_ clicando no botão verde **"Merge pull request"**;

  * Agora, vá até página do outro _Pull Request_ (branch `trybe-skills-updates`) e tente fazer o _merge_ clicando no mesmo botão. Reparou que ele está bloqueado? Isso acontece porque esse _Pull Request_ está tentando alterar a mesma linha de código com um conteúdo diferente, e o ***Git*** não consegue determinar sozinho qual das duas linhas é a correta.

  * Você terá que resolver esse **conflito** antes de _"mergear"_ o _Pull Request_. Clique no botão **"Resolve conflicts"**, escolha uma das duas versões do texto _(lembre-se de apagar as linhas com `<<<<<<<` e `>>>>>>>`, elas são criadas apenas para dar uma identificação mais visual ao problema)_ . Depois clique em **"Mark as resolved"** e, em seguida, em **"Commit merge"**.

  * Agora você deve conseguir _"mergear"_ seu _Pull Request_ normalmente. 😎

---

### Recapitulando

Agora você já pode esquecer que um dia versionou os arquivos adicionando o nome da versão no final! 😉

* O Git é um sistema de versionamento distribuído (DVCS);

* A maior vantagem do **Git** é que ele é distribuído, ou seja, o repositório fica na sua máquina e você não precisa se preocupar em fazer _"lock"_ de arquivos assim como em outros _VCS's_;

* Vimos que a instalação do **Git** e sua configuração são simples. Basta baixar o instalador e configurá-lo usando o comando `git config`;

* Para iniciar um repositório local, vimos que você tem duas opções:

    * `git init` _(para criar um novo repositório **Git**)_;

    * `git clone` _(para copiar um repositório **Git** existente para sua máquina e, assim, poder criar branches e Pull Requests)_.

* O GitHub é uma plataforma de hospedagem de código-fonte com controle de versão usando o Git;

* Vimos também que, para subir seu código para o **GitHub**, basta você verificar qual das opções abaixo deseja:
  1. Criar um repositório do zero localmente, na sua máquina, onde utilizará o comando `git init`;
  2. Trabalhar num repositório já existente, onde utilizará o comando `git clone`;

  **Esses dois comandos são _excludentes_, ou seja, você ou usa um, ou usa o outro, _nunca_ os dois ao mesmo tempo. Após isso, siga um dos dois fluxos abaixo**


* **Fluxo 1** - Após `git init`;

  1. Criar seu primeiro `commit`;

  2. Criar o repositório remoto na sua conta do **GitHub**;

  3. Adicionar a _URL_ do repositório remoto;

  4. Executar o famoso `push`.


* **Fluxo 2** - Após `git clone`;

  1. Criar sua branch dentro do repositório clonado;

  2. Fazer checkout na sua branch;

  3. Criar seu primeiro `commit`;

  4. Executar o famoso `push`.

---

## Recursos Adicionais (opcional)

* [Reforço de Git e GitHub](/fundamentals/git/reforco.pdf)

* [Resolvendo um mistério de assassinato... Somente com comandos de Git!](https://github.com/nivbend/gitstery) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Como conectar com o repositório no GitHub via SSH?](https://help.github.com/en/articles/connecting-to-github-with-ssh) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Reforço sobre aprendizado do Git em um guia rápido](https://www.freecodecamp.org/news/learn-the-basics-of-git-in-under-10-minutes-da548267cc91/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso extenso e completo de Git](https://www.udacity.com/course/version-control-with-git--ud123) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Como ignorar arquivos no ***Git***](https://fjorgemota.com/gitignore-ou-como-ignorar-arquivos-no-git/) {: .external-link target="_blank" rel="noreferrer noopener" }

    * Dica: ao acessar o site [gitignore.io](https://gitignore.io) {: .external-link target="_blank" rel="noreferrer noopener" }, busque por `"code"` para gerar um arquivo padrão para o editor _VSCode_.

* [Tutorial do ***GitHub*** sobre o `.gitignore`](https://help.github.com/pt/github/using-git/ignoring-files) {: .external-link target="_blank" rel="noreferrer noopener" }


---

## Próximo

Agora que você consegue utilizar o ***Git*** e o ***GitHub*** para versionar seu código, chegou a hora de aprender sobre _Internet_.

<%= next_button(@conn) %>
