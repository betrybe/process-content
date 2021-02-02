## O que é?

O portfólio é uma lista de trabalhos de uma pessoa profissional, empresa ou estudante, no caso de ambientes educacionais.

Mas como isso se relaciona com os seus códigos? Bem precisamos organizar nossos códigos de alguma forma, certo? E é aí que entra o portfólio de exercícios, para mantermos tudo o que desenvolvemos organizado e de fácil acesso, para nós e também para que outros possam olhar nosso trabalho.

---

## Por que isso é importante?

É através do portfólio que profissionais demonstram a possíveis clientes e empregadores o que fizeram e o que estão fazendo. Desse modo fica mais fácil de uma pessoa recrutadora ver o seu nível técnico e em alguns cenários um bom **GitHub** pode dispensar uma avaliação técnica.

Além da importância profissional, o portfólio é uma excelente forma de organizar tudo o que você vêm desenvolvendo, ficando de fácil acesso e também evitando a possibilidade de perda do que foi feito em caso de problemas com o computador.

O que você está esperando para fazer o seu?

---

## Como funciona no dia a dia do curso Trybe?

O desenvolvimento de exercícios será presente em muitos dos seus dias na Trybe, levando isso em consideração é interessante ter um fluxo para a realização destes. No seu dia a dia você precisará criar uma pasta para guardar os exercícios do dia e então criar dentro dela os arquivos necessários para desenvolver o que foi pedido. Mas se isso for feito de qualquer forma, com o tempo ficará difícil de localizar o que já foi feito e também de consultar quando você tiver alguma questão relacionada a algo que já desenvolveu.

---

## Como organizar?

Sugerimos que você tenha uma pasta exclusiva para manter os seus exercícios, algo como `trybe-exercises`, dentro dessa pasta você organizará os exercícios por módulo, bloco e dia. Desse modo você terá uma pasta para cada módulo, dentro da pasta de cada módulo, uma pasta para cada bloco que faça parte desse módulo e, dentro de cada bloco, uma pasta para cada dia que esse bloco possua. Ficou confuso? Sem problema, veja o exemplo abaixo:

```language-sh

# Considere os módulos INICIO, MEIO e FIM

$ ls trybe-exercises

FIM INICIO MEIO

# Considere que cada módulo possua três blocos (BLOCO_A, BLOCO_B e BLOCO_C)

$ ls trybe-exercises/INICIO

BLOCO_A BLOCO_B BLOCO_C

$ ls trybe-exercises/MEIO

BLOCO_A BLOCO_B BLOCO_C

$ ls trybe-exercises/FIM

BLOCO_A BLOCO_B BLOCO_C

# Considere que cada bloco possua três dias (DIA_1, DIA_2, DIA_3)

$ ls trybe-exercises/INICIO/BLOCO_A

DIA_1 DIA_2 DIA_3

$ ls trybe-exercises/MEIO/BLOCO_B

DIA_1 DIA_2 DIA_3

$ ls trybe-exercises/FIM/BLOCO_C

DIA_1 DIA_2 DIA_3
```

Você deverá criar uma estrutura semelhante a essa a medida que for avançando no curso, desse modo sempre que iniciar um módulo deverá criar sua respectiva pasta, o mesmo quando um bloco for iniciado e a cada dia de curso
deverá criar uma pasta para seus exercícios dentro da pasta do bloco em que se encontra. Vocẽ verá que nem todos os blocos irão ter pastas, isso ocorre pois existem blocos apenas de projetos e esse é um portfólio de exercícios.

### Entendendo o exemplo

Além disso é interessante que o diretório `trybe-exercises` possua um `README`, onde você deve explicar qual é o objetivo do seu repositório. Não se preocupe, [aqui](/real-life-engineer/exercise-portfolio/exemplo_readme.txt) você pode conferir um exemplo de `README`.

O `README` de um repositório é sempre em [markdown](https://pt.wikipedia.org/wiki/Markdown) {: .external-link target="_blank" rel="noreferrer noopener" }, se quiser entender melhor como funciona dê uma conferia no seção de `Recursos Adicionais`, sendo assim na hora de criar o seu você deve usar a extensão `.md`. Veja abaixo o que cada código presente o exemplo significar e como você deve personaliza-lo.

* `#`, `##`, `#####`: Título, quanto mais `#` tiverem menor será a fonte. O mínimo para um título é `#` (um #) e o máximo `######` (seis #);

* `[]()`: É um texto-âncora, dentro dos [] você adiciona a palavra/frase que será vista e dentro dos () o link que você deseja que ao clicar na palavra/frase ocorrá o redirecionamento;
  * `_[SeuNomeAqui](LinkDoSeuLinkedinAqui)_`: Texto-âncora com o seu nome apontando para o seu Likedin;
  * `_[Projeto - NomeDoProjeto]()_`: Texto-âncora com o nome do projeto, que já consta no exemplos, apontando para onde você mantém o projeto em questão.

* `-`: Tópico de uma lista não ordenada;

* `[ ]`: Checkbox vazio;
  * `- [ ] BLOCO-DIA`: Checkbox de um dia que você ainda não fez, você deve manté-lo dessa forma enquanto ainda não tiver passado pelo dia em questão;

* `[X]`: Checkbox cheio;
  * `- [X] BLOCO-DIA`: Checkbox de um dia que você já fez, você deve manté-lo dessa forma após ter passado pelo dia em questão;

* `:white_check_mark:`: Emoji de ✅, deve ser adicionado na frente do título de um módulo após a sua conclusão;

* `:hourglass_flowing_sand:`: Emoji de ⏳, deve ser mantido na frente do título de todos os módulos que ainda não foram concluídos, isso conclui o módulo em que você se encontra.

Também é interessante que você crie um `README` para cada módulo, explicando sobre o módulo em questão de um modo geral, um `README` para cada bloco, explicando sobre o que aquele bloco trata, e um `README` para cada dia, explicando o que os exercícios pediam que fosse feito. Para te ajudar também temos exemplos de um `README` de [modulo](/real-life-engineer/exercise-portfolio/exemplo_modulo.txt), de [bloco](/real-life-engineer/exercise-portfolio/exemplo_bloco.txt) e de [dia.](/real-life-engineer/exercise-portfolio/exemplo_dia.txt)

### Versionamento de código

Certo, até agora já sabemos qual será a estrutura do nosso repositório de exercícios, mas qual é o fluxo que devemos seguir para adicionar as resoluções dos exercícios de um dia? Veja abaixo os fluxos que você seguirá ao longo curso.

#### Fluxo - Iniciando novo módulo

1. Acesse o diretório de exercícios `trybe-exercises`.

```language-sh
$ cd trybe-exercises
```
2. Certifique-se que está na `branch master` e caso não esteja mude para ela.

```language-sh
$ git branch
$ git checkout master
```
3. A partir da `branch master` crie uma `branch` para os exercícios do dia, seu nome deve ser `exercises/bloco.dia`, onde `bloco` é o número do bloco em que você está e `dia` o número do dia em questão. Após cria-lá mude para ela.

```language-sh
$ git branch exercises/bloco.dia
$ git checkout exercises/bloco.dia
# OU
$ git checkout -b exercises/bloco.dia
```
4. Pronto, agora crie a pasta do módulo que você acaba de começar, dentro dela crie a pasta do bloco que está e então dentro da pasta do bloco, crie a pasta do dia em questão e navegue até ela. Na sequência crie os arquivos necessários e comece a codar.

```language-sh
$ mkdir MODULO
$ cd MODULO
$ mkdir BLOCO_N
$ cd BLOCO_N
$ mkdir DIA_N
$ cd DIA_N
```
5. Faça commits organizados durante o processo de resolução de cada um de seus exercícios. As mensagens dos commits devem ser breves e explicativas.

```language-sh
$ git status
$ git add .
$ git commit -m "mensagem de commit"
```
6. Lembre-se que na primeira vez que você for enviar o código para o repositório remoto a branch `exercises/bloco.dia` não vai existir lá.
Então você precisa configurar o remote utilizando a opção --set-upstream (ou -u, que é a forma abreviada).

```language-sh
$ git push -u origin exercises/bloco.dia
```
7. Quando terminar os exercícios, seus códigos devem estar todos commitados na branch `exercises/bloco.dia`, e disponíveis no repositório remoto do GitHub. Pra finalizar, crie um [Pull Request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) {: .external-link target="_blank" rel="noreferrer noopener" } , adicione uma descrição bem bacana, e envie para as pessoas instrutoras e/ou colegas revisarem! 🤜🏼🤛🏼

#### Fluxo - Iniciando novo bloco

1. Acesse o diretório de exercícios `trybe-exercises`.

```language-sh
$ cd trybe-exercises
```
2. Certifique-se que está na `branch master` e caso não esteja mude para ela.

```language-sh
$ git branch
$ git checkout master
```
3. A partir da `branch master` crie uma `branch` para os exercícios do dia, seu nome deve ser `exercises/bloco.dia`, onde `bloco` é o número do bloco em que você está e `dia` o número do dia em questão. Após cria-lá mude para ela.

```language-sh
$ git branch exercises/bloco.dia
$ git checkout exercises/bloco.dia
# OU
$ git checkout -b exercises/bloco.dia
```
4. Pronto, agora entre na pasta do módulo que você está, e dentro dela crie a pasta do bloco que acaba de começar e então dentro da pasta do bloco, crie a pasta do dia em questão e navegue até ela. Na sequência crie os arquivos necessários e comece a codar.

```language-sh
$ cd MODULO
$ mkdir BLOCO_N
$ cd BLOCO_N
$ mkdir DIA_N
$ cd DIA_N
```
5. Faça commits organizados durante o processo de resolução de cada um de seus exercícios. As mensagens dos commits devem ser breves e explicativas.

```language-sh
$ git status
$ git add .
$ git commit -m "mensagem de commit"
```
6. Lembre-se que na primeira vez que você for enviar o código para o repositório remoto a branch `exercises/bloco.dia` não vai existir lá.
Então você precisa configurar o remote utilizando a opção --set-upstream (ou -u, que é a forma abreviada).

```language-sh
$ git push -u origin exercises/bloco.dia
```
7. Quando terminar os exercícios, seus códigos devem estar todos commitados na branch exercises/bloco.dia, e disponíveis no repositório remoto do GitHub. Pra finalizar, crie um [Pull Request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) {: .external-link target="_blank" rel="noreferrer noopener" }, adicione uma descrição bem bacana, e envie para as pessoas instrutoras e/ou colegas revisarem! 🤜🏼🤛🏼

#### Fluxo - Iniciando novo dia

1. Acesse o diretório de exercícios `trybe-exercises`.

```language-sh
$ cd trybe-exercises
```
2. Certifique-se que está na `branch master` e caso não esteja mude para ela.

```language-sh
$ git branch
$ git checkout master
```
3. A partir da `branch master` crie uma `branch` para os exercícios do dia, seu nome deve ser `exercises/bloco.dia`, onde `bloco` é o número do bloco em que você está e `dia` o número do dia em questão. Após cria-lá mude para ela.

```language-sh
$ git branch exercises/bloco.dia
$ git checkout exercises/bloco.dia
# OU
$ git checkout -b exercises/bloco.dia
```
4. Pronto, agora entre na pasta do bloco que você está e dentro dela crie a pasta do dia em questão e navegue até ela. Na sequência crie os arquivos necessários e comece a codar.

```language-sh
$ cd MODULO/BLOCO_N
$ mkdir DIA_N
$ cd DIA_N
```
5. Faça commits organizados durante o processo de resolução de cada um de seus exercícios. As mensagens dos commits devem ser breves e explicativas.

```language-sh
$ git status
$ git add .
$ git commit -m "mensagem de commit"
```
6. Lembre-se que na primeira vez que você for enviar o código para o repositório remoto a branch `exercises/bloco.dia` não vai existir lá.
Então você precisa configurar o remote utilizando a opção --set-upstream (ou -u, que é a forma abreviada).

```language-sh
$ git push -u origin exercises/bloco.dia
```
7. Quando terminar os exercícios, seus códigos devem estar todos commitados na branch `exercises/bloco.dia`, e disponíveis no repositório remoto do GitHub. Pra finalizar, crie um [Pull Request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) {: .external-link target="_blank" rel="noreferrer noopener" }, adicione uma descrição bem bacana, e envie para as pessoas instrutoras e/ou colegas revisarem! 🤜🏼🤛🏼

### Exemplos

Nessa seção você encontra alguns portfólios de exercícios de trybers, desse modo você poderá ver as possibilidades e também ter uma noção do resultado que obterá.

* [Portfólio de Exercício - Ana Carolina Gomes (SD-03)](https://github.com/gomesanac/trybe-exercises) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Portfólio de Exercício - Débora Silveira (SD-04)](https://github.com/deboracosilveira/trybe) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Recursos Adicionais (opcional)

Agora que você já entende a importância de organizar seus exercícios e também já tem uma ideia de como atingir esse objetivo, aqui vão alguns conteúdos para você se aprofundar um pouco mais!

* [Guia de Markdown do GitHub](https://guides.github.com/features/mastering-markdown/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Artigo - Como fazer um README.md BONITÃO](https://medium.com/@raullesteves/github-como-fazer-um-readme-md-bonit%C3%A3o-c85c8f154f8) {: .external-link target="_blank" rel="noreferrer noopener" }
