## O que é?

Quando você entrou na Trybe precisou fazer o `setup` do seu computador e durante esse processo você instalou o `VS Code`, que é um é um editor de código-fonte gratuito e open source, que possui `plugins` incríveis que vão te ajudar ao longo do curso. Agora você irá aprender a utilizá-lo e também a como executar os códigos que você desenvolverá ao longo do curso. Além disso você também verá alguns `plugins` muito úteis em seu dia a dia como pessoa desenvolvedora.

---

## Por quê isso é importante?

Como pessoa desenvolvedora o uso de um editor de código-fonte fará parte do seu dia a dia, sendo assim é muito importante que você conheça as funcionalidades que o editor que usa possui, no caso o `VS Code`, e também sabia como otimizar o seu trabalha com o uso de `plugins`.

---

## O VS Code

Vamos começar entendendo a estrutura desse poderoso editor de código-fonte. O `VS Code` possui uma barra de navegação superior, uma barra de navegação lateral a esquerda e uma outra barra de navegação inferior. Abaixo temos um explicação mais detalhada de cada uma dessas barras.

### Barra de navegação superior

<%= figure(%{src: "/real-life-engineer/vscode/images/barra-superior.png", class: "rounded mx-auto d-block text-center", caption: "Barra de navegação superior"}) %>

- `Arquivo`: Nessa aba você tem acesso a ações de `salvar`, `abrir` e `criar` arquivos, janelas e pastas;

- `Editar`: Nesse aba você tem acesso a ações como `copiar`, `colar`, `localizar` e `substituir` no arquivo que está aberto no editor;

- `Seleção`: Nessa aba você tem acesso a ações como `copiar linha à cima` e `mover linha a linha para cima` a(s) linhas(s) selecionada(s) no arquivo que está aberto no editor;

- `Exibir`: Nessa aba você tem acesso a ações de configuração do que está sendo mostrado na sua tela do `VS Code`;

- `Ir`: Nessa aba você tem acesso a ações de movimentação no arquivo, como `ir para definição` de uma variável ou função;

- `Executar`: Nessa aba você tem acesso a ações relacionados ao [debugger](https://pt.wikipedia.org/wiki/Depura%C3%A7%C3%A3o) {: .external-link target="_blank" rel="noreferrer noopener" };

- `Terminal`: Nessa aba você tem acesso a opção de abrir um terminal no `VS Code` e também de alterar as configuração desse terminal;

- `Ajuda`: Nessa aba você tem acessoa guias e manuais caso alguma dúvida surja.

### Barra de navegação lateral a esquerda

<%= figure(%{src: "/real-life-engineer/vscode/images/barra-lateral.png", class: "rounded mx-auto d-block text-center", caption: "Barra de navegação lateral a esquerda"}) %>

Na barra lateral temos acesso a, respectivamente, uma aba de pesquisa, uma aba de explorar, uma aba de controle de versão, uma aba de debugger, uma aba de extensões, e uma aba que dá acesso a algumas ações de configuração.

#### Pesquisar

Na aba de `pesquisa` você pode realizar a busca de um termo em todos os seus arquivos e caso necessário realizar a substituição desse termo por um outro.

<%= figure(%{src: "/real-life-engineer/vscode/images/pesquisar.png", class: "rounded mx-auto d-block text-center", caption: "Aba de pesquisa"}) %>

#### Explorar

<%= figure(%{src: "/real-life-engineer/vscode/images/explorador.png", class: "rounded mx-auto d-block text-center", caption: "Aba de explorar"}) %>

* `EXPLORAR`: É a aba principal, você tem acesso a todos os arquivos da pasta que está aberta;
* `EDITORES ABERTOS`: Aba interna de `EXPLORAR`, onde estão todos os arquivos que estão abertos no `VS Code`;
* `CODIGOS`: Aba interna de `EXPLORAR`, onde estão todos os arquivos da pasta aberta, o nome dessa aba será exatamente igual ao nome da pasta;
* `CONTORNO`: Aba interna de `EXPLORAR`, aqui você verá a estrutura de tópicos do seu arquivo, caso ele possua;
* `LINHA DO TEMPO`: Aba interna de `EXPLORAR`, aqui você tem acesso as alterações que foram `commitadas`.

#### Controle de versão

Nessa aba você pode visualizar as alterações de um arquivo que ainda não foram `commitadas`, você tem acesso a versão inicial e a versão atual (após as suas alterações). Mas como você já sabe, não deveríamos fazer isso.

<%= figure(%{src: "/real-life-engineer/vscode/images/controle-versao.png", class: "rounded mx-auto d-block text-center", caption: "Aba de controle de versão"}) %>

#### Debugger

Na aba de `debugger` você tem acesso ao depurador do `VS Code`, nela você poderá executar seu código vendo o que ocorre em cada uma das etapas dele. Não se preocupe, mais a frente você aprenderá a como debuggar o seu código.

<%= figure(%{src: "/real-life-engineer/vscode/images/debugger.png", class: "rounded mx-auto d-block text-center", caption: "Aba de debugger"}) %>

Na primeira vez que você for debugar um código você verá que o botão `Run and Debug` disponível para clique caso haja um arquivo de código aberto em seu `VS Code`, ao clicar nele você poderá debugar seu código. Além disso é possível configurar o debugger, para isso em `Executar` na barra superior e na sequência clique em `Adicionar Configuração`, uma aba de seleção será aberta e você deve escolher `Node.js`. Após seguir esses passos o arquivo `launch.json` será criado juntamente com a pasta `.vscode`, dentro desse arquivo ficam as configurações do debugger, sua estrutura é a seguinte:

```language-js
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Executar Programa",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/arquivoCodigo.js"
    }
  ]
}
```

O que você precisa saber é que a chave `configurations` é um array de objetos, sendo cada elemento desse array uma configuração do debugger. Além disso outros pontos importantes são:

* `type`: É o tipo de debugger a ser usado para esta configuração, no caso estamos usando `node` para podermos debugar nosso código em `JavaScript`;
* `name`: É nome que damos a configuração que criamos, esse nome ficara disponível em um menu suspenso e que quando selecionado e iniciado irá rodar essas configuração para o programa que definimos;
* `program`: É o arquivo a ser executado ao iniciar o debugger;
  * `${workspaceFolder}`: Fornece o caminho raiz de uma pasta do espaço de trabalho;
  * `arquivoCodigo.js`: O arquivo que você deseja executar ao iniciar o debugger.

Com a configuração mostrada anteriormente **SEMPRE** que iniciarmos o debugger o **ÚNICO** arquivo que conseguiremos executar é o `arquivoCodigo.js`, para conseguirmos debugger outros arquivos o que podemos fazer é adicionar outra configuração ao array `configurations` ou então utilizar a variável `${file}` no lugar de `${workspaceFolder}/arquivoCodigo.js`. No segundo caso o que ocorre é que o debugger vai reconhecer o arquivo que estiver aberto em seu `VS Code`, dessa forma sua configuração fica mais genérica. Veja como ficariam os dois casos abaixo:

```language-js
// Adicionando mais uma configuração:
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Executar Programa",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/arquivoCodigo.js"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Executar Programa 2",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/arquivoCodigo2.js"
    }
  ]
}

// Utilizando a variável ${file}:
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Executar Programa",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${file}"
    }
  ]
}
```

Você pode adicionar quantas configurações quiser ao seu arquivo `launch.json`. Outra coisa importante é que se você possui diretórios independentes um do outro você precisará realizar essa configuração para cada um deles.

#### Extensões

É nessa aba em que você tem acesso ao `marketplace` do `VS Code`. Será através dela que você irá buscar e instalar `plugins` para facilitar o seu dia a dia. Além de poder buscar extensões, você também tem acesso as extensões instaladas, na aba `instalado`, e as extensões recomendadas, na aba `recomendado`.

<%= figure(%{src: "/real-life-engineer/vscode/images/extensoes.png", class: "rounded mx-auto d-block text-center", caption: "Aba de extensões"}) %>

### Barra inferior

<%= figure(%{src: "/real-life-engineer/vscode/images/barra-inferior.png", class: "rounded mx-auto d-block text-center", caption: "Barra inferior"}) %>

Por último, mas não menos importante, a barra inferior nos provê algumas informações. Da esquerda para direita você tem acesso a `branch` em que você se encontra, caso esteja em uma pasta com `git`, na sequência, também considerando uma pasta com `git`, você consegue ver o estado em que sua `branch` se encontra, no caso está informando para executar a sincronização do repositório `local` com o `remoto`.

Passada as partes relacionadas ao `git`, temos dois ícones que informam problemas que nosso código possa ter, se você clicar nesse botão será aberta uma aba com os detalhes dos problemas, caso existam. Depois disso temos uma informação da posição em que o cursor se encontra, considerando linha e coluna, na sequência vem a informação de configuração de espaços de indentação, então temos a codificação que está configurada e por último o tipo de arquivo que está aberto, no caso é um arquivo em `JavaScript`.

### Shortcuts

O `VS Code` possui muitos `shortcuts` (atalhos) e não se preocupe, você não precisa conhecer. Segue abaixo uma lita com os `shortchuts` existentes, teste eles e veja quais fazem sentido guardar e é claro, você sempre pode voltar e consultá-los.

- [Shortcuts - Linux](/real-life-engineer/vscode/keyboard-shortcuts-linux.pdf) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Shortcuts - macOS](/real-life-engineer/vscode/keyboard-shortcuts-macos.pdf) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Extensões

Certo, agora que você já conhece o seu editor de código-fonte, vamos ver algumas extensões que podem te ajudar!

### Material Icon Theme

Essa extensão adiciona ícones a cada um dos arquivos e pastas que você possua, cada tipo de pasta possui um ícone, assim como cada tipo de arquivo. Essa extensão ajuda a organizar e localizar melhor nossos arquivos e pastas, além de deixar o ambiente de desenvolvimento bem mais agradável.

### Live Server

Essa extensão permite que executemos nosso código em `HTML` em tempo real, sendo uma ótima ferramenta para visualizarmos o que estamos desenvolvendo. Quando a extensão for instalada um botão com os dizeres `Go Live` ficará disponível na barra inferior do `VS Code`, e é clicando nele que você irá iniciar a execução do seu código.

<%= figure(%{src: "/real-life-engineer/vscode/images/live-server-button.png", class: "rounded mx-auto d-block text-center", caption: "Barra inferior com botão da extensão Live Server"}) %>

Após o clique uma página será aberta no seu navegador, você verá que a `url` gerada será algo como `http://127.0.0.1:5500`, sendo `127.0.0.1` o seu endereço `IP` e o `5500` a porta que a extensão usou para executar o arquivo. Caso você queria interromper a execução basta clicar novamente no botão `Go Live`. Uma outra forma de iniciar a execução é apertando `Alt + L` e na sequência `Alt + O`, para interromper a execução dessa forma basta apertar `Alt + L` e depois `Alt + C`.

Com o seu programa aberto no navegador você irá poder acompanhar tudo o que está fazendo, e sempre que salvar seu arquivo a página do navegador que executa o código será atualizado, contendo então a última versão do que você fez.

### Prettier

O `Prettier` é um formatador de código opinativo. Ele impõe um estilo consistente analisando seu código e imprimindo-o novamente com suas próprias regras que levam em consideração o comprimento máximo da linha, envolvendo o código quando necessário. Funciona para as seguintes linguagens: JavaScript, TypeScript, Flow, JSX, JSON, CSS, SCSS, Less, HTML, Vue, Angular, GraphQL, Markdown, YAML.

Para utilizá-lo basta apertar `Ctrl + Shift + I`, ao fazer isso a extensão irá formatar seu código, mas para funcionar é preciso que não exista nenhum erro de sintaxe, pois para o `Prettier` analisar o seu código é preciso que ele esteja correto.

### Code Runner

O `Code Runner` torna possível que executemos nosso código. Ele abrange muitas linguagens, são elas: C, C ++, Java, JavaScript, PHP, Python, Perl, Perl 6, Ruby, Go, Lua, Groovy, PowerShell, BAT / CMD, BASH / SH, F # Script, F # (.NET Core), C # Script, C # (.NET Core), VBScript, TypeScript, CoffeeScript, Scala, Swift, Julia, Crystal, OCaml Script, R, AppleScript, Elixir, Visual Basic .NET, Clojure, Haxe, Objective-C , Rust, Racket, Scheme, AutoHotkey, AutoIt, Kotlin, Dart, Free Pascal, Haskell, Nim, D, Lisp, Kit, V, SCSS, Sass, CUDA, Less.

Quando for utilizar o `Code Runner` você deve apertar `Ctrl + Alt + N`, desse modo seu código será executado e uma aba será aberta no `VS Code` informando se o código foi executado ou se houve algum problema, caso exista no código a exibição de algum valor ele também será mostrado, isso se não houver nenhum problema na execução.

### ESLint

O ESLint é uma ferramenta de análise de código estática para identificar padrões problemáticos encontrados no código JavaScript, e é através dele que o `Code Climate` verifica se nosso código possui algum problema. Sendo assim a extensão para `VS Code` usa a biblioteca ESLint instalada na pasta da área de trabalho aberta e aponta para você os erros que o `Code Climate` irá apontar quando for analisar sou código. O uso dessa extensão te polpará bastante tempo durante a realização dos projetos.

### Bracket Pair Colorizer 2

Esta extensão permite que os colchetes correspondentes sejam identificados com cores. O usuário pode definir quais caracteres combinar e quais cores usar. O uso dessa extensão facilitará o reconhecimento do escopo de seus códigos, ficando visível onde começa e onde termina.

### Visual Studio IntelliCode

Esta extensão fornece IntelliSense assistido por IA, mostrando itens de conclusão recomendados para o contexto de código no topo da lista de conclusões. Abrangendo as seguintes linguagens: C#, C++, TypeScript/JavaScript.

---

## Vamos codar

Você já conhece o `VS Code` e também já sabe sobre alguns extensões que serão úteis ao longo do curso, então é hora de começar a codar. Você verá o fluxo de desenvolvimento e execução dos códigos com as diferentes linguagens que aprenderá ao longo do curso.

### Shell Script

1. Abra o VSCode e crie um novo arquivo com a extensão `.sh`, ele pode levar o nome que você desejar. Para criar um novo arquivo você pode apertar `Ctrl + N` e uma nova aba será aberta.
2. Abra o terminal no VSCode, para isso vá a aba de navegação superior e clique em `Terminal`, com isso um terminal semelhante ao que sua máquina possui será aberto, ele funciona exatamente igual ao que você já conhece.
3. No terminal do VSCode utilize o comando `chmod +x nome_script.sh` para conceder a permissão de execução para esse arquivo. Utilize o comando `ls -lag` para verificar se permissão foi concedida com sucesso.

```language-sh
chmod +x exercicio.sh
ls -lag
```
4. No arquivo do script adicione na primeira linha o comando `#!/bin/bash` e então comece a escrever o seu código.

```language-sh
#!/bin/bash

echo "Meu primeiro script em Shell Script!"
```
5. Para executar o script certifique-se de:
  * Salvar a alteração com `Ctrl + s`
  * Estar no diretório em que o arquivo se encontra e rode o comando `./nome_script.sh`

```language-sh
./exercicio.sh
```

### HTML

1. Abra o VSCode e crie um novo arquivo com a extensão `.html`, ele pode levar o nome que você desejar. Para criar um novo arquivo você pode apertar `Ctrl + N` e uma nova aba será aberta.
2. Inicie seu código em HTML, para facilitar o início você pode digitar `!` na primeira linha do script e irá aparecer a opção de autocomplete, se você apertar `Enter` a estrutura base de um arquivo HTML, com `head` parcialmente preenchido e com o `body` vazio, será inserida no arquivo.
  * Você pode alterar e adicionar o que quiser no arquivo.

  <%= figure(%{src: "/real-life-engineer/vscode/images/html-inicial.png", class: "rounded mx-auto d-block text-center", caption: "HTML gerado pelo autocomplete"}) %>
3. Com a extensão `Live Server` execute seu código e acompanhe o que está desenvolvendo. Não se esqueça de salvar o arquivo.

### JavaScript

1. Abra o VSCode e crie um novo arquivo com a extensão `.js`, ele pode levar o nome que você desejar. Para criar um novo arquivo você pode apertar `Ctrl + N` e uma nova aba será aberta.
2. Inicie seu código em JavaScript.
3. Com seu código pronto é hora de executá-lo e ver se está funcionando corretamente. Para isso utilize a extensão `Code Runner`, se algum problema ocorrer encontra o erro no código, o corrija e tente novamente. Não se esqueça de salvar as alterações.

---

## Recursos Adicionais (opcional)

E aí, gostou do que aprendeu até aqui? Nesta parte, nós colocamos outras referências para você se aprofundar sobre o tema.

* [Visual Studio Code FAQ](https://code.visualstudio.com/docs/supporting/faq) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Prettier](https://code.visualstudio.com/docs/supporting/faq) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) {: .external-link target="_blank" rel="noreferrer noopener" }

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode) {: .external-link target="_blank" rel="noreferrer noopener" }
