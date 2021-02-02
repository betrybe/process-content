## O que vamos aprender?

O Unix é um sistema operacional popular que foi lançado em 1969 e ganhou muitas das variações que se tornaram os principais sistemas operacionais do mercado.
Vamos aprender como funciona o Unix e como interagir com ele através do terminal, utilizando o Bash.

Os principais pontos abordados serão:

* Quais são seus principais componentes?

* Quais suas variações?

* Arquivos e processos, o que são?

* Qual sua estrutura de diretórios?

* O que é o terminal?

* Comandos executados no Bash.

---

### Você será capaz de:

* Executar comandos no terminal para navegar entre os diretórios;

* Executar comandos no terminal para criar e manipular arquivos e diretórios;

* Executar comandos no terminal para realizar buscas;

---

## Por que isso é importante?

No desenvolvimento de software, é muito importante que você entenda como interagir de forma eficiente com o sistema operacional no qual você vai programar. Isso te poupará tempo e permitirá ser uma pessoa mais produtiva. Para isso, é primordial que você saiba os principais comandos que podem ser utilizados no terminal.

Na maioria das vezes, principalmente por questões de custo, performance e facilidade de interação através do terminal, sistemas operacionais baseados em Unix são indicados como a melhor opção para você hospedar seus projetos web.

---

## Conteúdos

###### Tempo sugerido para realização: 100 minutos

---

Você já deve ter se perguntando, por qual motivo fazemos uso da linha de comando, se podemos resolver demandas em poucos cliques através da interface gráfica?

De forma resumida podemos dizer que ela é simples, estável, rápida, eficiente e exige baixíssimo poder de hardware. Pode soar estranho dizer que ela é simples, não é? Mas sim ela é, de modo geral a linha de comando não ~~fazia~~ faz parte do seu dia a dia e por este motivo pode parecer complicado. No entanto, a partir de agora, você vai conhecer em detalhes diversas vantagens e praticidades desta poderosa ferramenta, que te tornarão mais produtivo e mais eficiente na sua formação como pessoa desenvolvedora.

Lembre-se que utilizar a linha de comando não te impede de também utilizar a interface gráfica, com tempo e prática você encontrará a forma de trabalho que te proporciona a melhor experiência. 😉

Para que você possa começar a ter mais familiaridade e entendimento, assista o video abaixo. Nele vamos entender o que é o Unix, Kernel e Shell. Além de compreender como é a estrutura dos arquivos e o que é um processo.

<%= vimeo "460354365" %>

---

Muito legal, não é mesmo?!

Para abrir o terminal, que será sua principal ferramenta para interação com seu computador a partir de agora, utilize o atalho `ctrl + alt + t` para o Linux.

Agora que você já sabe o que é o Unix e está com seu terminal aberto, aprenda a criar um diretório, listar arquivos e diretórios, navegar e visualizar o diretório corrente.

<%= vimeo "460370352" %>

---

Já entendeu como criar, navegar e visualizar diretórios? Hora de aprender a copiar, mover e remover arquivos e diretórios. Você também conseguirá mostrar o conteúdo de um arquivo na tela do terminal.

<%= vimeo "460682102" %>

---

Agora você verá outras formas de visualização do conteúdo de arquivos, além de aprender a realizar buscas por palavras-chave ou frases dentro de arquivos.

<%= vimeo "461631172" %>

---

Para facilitar sua vida, aprenda a utilizar _wildcards_. Vamos entender as convenções de nomes dos arquivos e diretórios Unix e como buscar por ajuda quando não souber qual comando usar ou o que ele faz.

<%= vimeo "460705811" %>

---

### Recapitulando

Na imagem abaixo temos uma tabela com os comandos vistos hoje, juntamente com uma breve explicação sobre eles. Dessa forma fica fácil para você consultar sempre que sentir necessidade.

<%= figure(%{src: "/fundamentals/unix/images/comandos_part1.png", class: "text-center rounded mx-auto d-block", caption: "Tabela com os comandos do dia", width: "600px", height: "auto"}) %>

---

## Quiz

###### Tempo sugerido para realização: 30 minutos

Vamos fixar a parte teórica com um quiz!

Caso você queira responder com mais detalhes, é aconselhado que você escreva uma resposta inicial e depois busque no Google sobre o tema para aprofundar seus conhecimentos.

Mas lembre-se: o quiz é para **fixação dos conteúdos** e **não** tem **caráter avaliativo**, fique tranquilo!

[Quiz sobre o conteúdo de Unix & Bash](https://forms.gle/JP2LbiCfTXJFh5Cx5) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 60 minutos

Para te ajudar a começar os exercícios, que tal fazermos uma aula ao vivo? Nosso especialista irá te mostrar como chegar lá!

Vamos para o Slack, onde estará disponível o link da nossa aula ao vivo de hoje!

---

## Exercícios

###### Tempo sugerido para realização: 60 minutos

### Parte I - Criação de arquivos e diretórios

**Dica**: Para criação de arquivos vazios você pode utilizar o comando `touch nome-do-arquivo.extensao`.

1. Utilizando o terminal, aplique o comando de criação de diretórios que você aprendeu: crie um diretório chamado `unix_tests` e navegue até ele.

2. Crie um arquivo de texto com o nome `trybe.txt`.

3. Crie uma cópia do arquivo `trybe.txt` com nome `trybe_backup.txt`.

4. Renomeie o arquivo `trybe.txt`.

5. Dentro de `unix_tests`, crie um novo diretório chamado `backup`.

6. Mova o arquivo `trybe_backup.txt` para o diretório `backup`.

7. Dentro de `unix_tests`, crie um novo diretório chamado `backup2`.

8. Mova o arquivo `trybe_backup.txt` da pasta `backup` para a pasta `backup2`.

9. Apague a pasta `backup`.

10. Renomeie a pasta `backup2` para `backup`.

11. Veja qual o path completo do diretório atual e liste todos os arquivos dentro dele.

12. Apague o diretório `backup`.

13. Limpe o terminal.

    **Para os exercícios, 14 e 15, crie, de forma manual na parte gráfica do seu sistema operacional, um arquivo de texto com o conteúdo abaixo, chamado `skills.txt`:**

```language-sh
Internet
Unix
Bash
HTML
CSS
JavaScript
React
SQL
```

14. Mostre na tela as 5 primeiras skills do arquivo `skills.txt`.

15. Mostre na tela as 4 últimas skills do arquivo `skills.txt`.

16. Apague todos os arquivos que terminem em `.txt`.

---

### Parte II - Manipulação & Busca

1. Na pasta `unix_tests`, baixe um arquivo com os nomes de todos os países do mundo utilizando o comando [curl:](https://linux.die.net/man/1/curl) {: .external-link target="_blank" rel="noreferrer noopener" }

```language-sh

curl -o countries.txt "https://gist.githubusercontent.com/kalinchernev/486393efcca01623b18d/raw/daa24c9fea66afb7d68f8d69f0c4b8eeb9406e83/countries"
```

2. Mostre todo o conteúdo do arquivo `countries.txt` na tela.

3. Mostre o conteúdo de `countries.txt`, página por página, até encontra a `Zambia`.

4. Mostre novamente o conteúdo de `countries.txt` página por página, mas agora utilize um comando para buscar por `Zambia`.

5. Busque por `Brazil` no `countries.txt`.

6. Busque novamente por `brazil`, mas agora utilizando o _lower case_.

    **Para os próximos exercícios, crie um novo arquivo chamado `phrases.txt` e adicione algumas frases a sua escolha. Não precisa criar o arquivo pelo terminal.**

7. Busque pelas frases que não contenham a palavra `fox`.

8. Conte o número de palavras do arquivo `phrases.txt`.

9. Conte o número de linhas do arquivo `phrases.txt`.

10. Crie os arquivos `empty.tbt` e `empty.pdf`.

11. Liste todos os arquivos do diretório `unix_tests`.

12. Liste todos os arquivos que terminem com `txt`.

13. Liste todos os arquivos que terminem com `tbt` ou  `txt`.

14. Acesse o manual do comando `ls`.

---

## Recursos Adicionais (opcional)

E aí, gostou do que aprendeu até aqui? Nesta parte, nós colocamos outras referências para você se aprofundar sobre o tema. Artigos, tutoriais, livros etc...

* [Aprenda os comandos básicos do Linux](https://www.youtube.com/watch?v=JEhVB4VHsTI) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Comandos importantes que você deveria saber](https://www.howtogeek.com/412055/37-important-linux-commands-you-should-know/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso grátis da udacity sobre linha de comando ](https://www.udacity.com/course/linux-command-line-basics--ud595) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso grátis da udacity sobre shell](https://www.udacity.com/course/shell-workshop--ud206) {: .external-link target="_blank" rel="noreferrer noopener" }

* [ Aprenda sobre o sistema de arquivos do Linux](https://www.youtube.com/watch?v=HIXzJ3Rz9po) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Referência bem completa sobre shell, terminal e linux](http://linuxcommand.org/index.php) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Guia do bash para iniciantes](https://www.youtube.com/watch?v=oxuRxtrO2Ag) {: .external-link target="_blank" rel="noreferrer noopener" }

* [A importância do modo texto.](https://www.vivaolinux.com.br/artigo/A-importancia-do-modo-texto) {: .external-link target="_blank" rel="noreferrer noopener" }

##### ⚠️ O sinal de % não é necessário antes da execução dos comandos listados nos links dos conteúdos abaixo.

* [Unix - Conhecendo a estrutura de arquivos e o terminal](http://www.ee.surrey.ac.uk/Teaching/Unix/unixintro.html) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Unix - Trabalhando com diretórios](http://www.ee.surrey.ac.uk/Teaching/Unix/unix1.html) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Unix - Operações com arquivos e diretórios](http://www.ee.surrey.ac.uk/Teaching/Unix/unix2.html) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Unix - Nomeando arquivos e como procurar ajuda no Terminal](http://www.ee.surrey.ac.uk/Teaching/Unix/unix4.html) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Você já viu um pouco de tudo hoje não é mesmo? Daqui pra frente vamos praticar mais sobre os comandos do Unix! 💻

<%= next_button(@conn) %>
