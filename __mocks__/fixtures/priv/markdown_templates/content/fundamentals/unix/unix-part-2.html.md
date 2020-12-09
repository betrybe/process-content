## O que vamos aprender?

Vamos continuar explorando os comandos do UNIX.

Se você já tem familiaridade com o ambiente UNIX, o terminal e tudo mais, que tal ajudar outras pessoas a tirar as dúvidas? Abra uma videochamada, se disponibilize no *Slack* e vamos colaborar! 💁🏽‍♂

Agora, se você ainda não está confiante nas suas habilidades ~~jedi~~ com a tela preta, vamos praticar com vários exercícios para que você possa ver na prática como os comandos do UNIX podem ser úteis!

---

### Você será capaz de:

* Utilizar o comando `find`;

* Utilizar os operadores `>`, `>>` e `|` no terminal;

* Alterar as permissões de arquivos e diretórios;

* Verificar o status e enviar sinais a processos UNIX;

---

## Por que isso é importante?

Conhecer variáveis de ambiente e saber como usá-las no seu código é uma das principais habilidades que você irá usar para trazer flexibilidade e segurança em seu código. Imagine que você precisa fazer um *script* que se conecte com uma máquina remota, e precise de usuário e senha. Você colocaria a senha direto no *script*? 🤔

Quando se trabalha usando o terminal, cada comando que você digita é executado dentro de um processo. Então é importante saber como você pode se comunicar com tais processos quando, por exemplo, quiser terminar a execução de algum que está travado. 🔫

Conhecer sobre permissões é uma outra habilidade importante para garantir que os arquivos que você manipula na máquina _(códigos, configurações, etc)_ não sejam alterados ou executados por pessoas indesejadas. 🔐

---

## Conteúdos

###### Tempo sugerido para realização: 90 minutos

---

Primeiro, você vai aprender a tratar `inputs e outputs` no terminal.

<%= vimeo "461073722" %>

Para fixar o conhecimento da diferença entre os operadores `>`, `>>` e `|` veja o exemplo abaixo:

```language-sh
# Considere o arquivo nomes.txt para os exemplos a seguir
# Seu conteúdo inicial é:
Ana
Maria
João

# O > redireciona a saída padrão para um arquivo, sendo assim 
# caso haja algum conteúdo no arquivo será substituído

cat > nomes.txt
# Digite o nome "Amanda" e encerre o cat (Ctrl + D)

cat nomes.txt
# Resultado
Amanda

# O >> anexa saída padrão a um arquivo, sendo assim ele adiciona 
# o que for digitado ao final do arquivo em questão

cat >> nomes.txt
# Digite o nome "Fernanda", depois `enter` e o nome "Fabiano" e encerre o cat (Ctrl + D)

cat nomes.txt
# Resultado
Amanda
Fernanda
Fabiano

# O | canaliza a saída do primeiro comando para a entrada do segundo,
# dessa forma conseguimos realizar comandos de forma sucessiva

# Considere que queremos uma lista com todos os nomes que contenham
# a letra "F" e que nosso resultado esteja em ordem alfabética
# Para isso podemos realizar o comando abaixo

grep F nomes.txt | sort
# Resultado
Fabiano
Fernanda
```

---

Dado que você já sabe os comandos básicos do Bash, você vai aprender como funciona o controle de acesso aos arquivos no Unix.
    
<%= vimeo "461125756" %>


Agora você verá o que são, como listar e manipular os processos e jobs.

<%= vimeo "461882534" %>

---

* Agora vamos aprender sobre os comandos `find`, `history` e `echo`.

    O `find` é um comando para pesquisar em diretórios por arquivos ou outras pastas, de acordo com os parâmetros passados a ele. Esses parâmetros podem ser `name`, `date`, `size` e `type`. Caso nenhum atributo seja passado, ele pesquisará tudo que estiver dentro do diretório atual.
    Veja abaixo alguns exemplos de como usá-lo:

```language-sh
# Para listar todos os arquivos que terminam em .txt
find . -name "*.txt"

# Para localizar apenas diretórios ou arquivos

# Localizar tanto arquivos quanto diretórios
find ./teste -name exemplo*
# Resultado
./teste/exemplo.txt
./teste/exemplo

# Localizar somente arquivos
find ./teste -type f -name "exemplo*"
# Resultado
./teste/exemplo.txt

# Localizar somente diretórios
find ./teste -type d -name "exemplo*"
# Resultado
./teste/exemplo
```

    O `history` é um comando que mostra o histórico de comandos que você executou no terminal. A quantidade ou o tamanho desse _"histórico"_ podem ser configurados para um número arbitrário de comandos ou para ver todo o histórico.

```language-sh
# Mostra o histórico de comandos
history
# Pegar os últimos 10 comandos
history | tail
```

    O `echo` é um comando utilizado em scripts ou no terminal para exibir mensagens na tela ou em um arquivo.

```language-sh

echo "Este é um teste"
# Result
Este é um teste

# Pode ser usado para colocar textos dentro de arquivos.
echo "Este é mais um teste" > teste.txt
cat teste.txt
Este é mais um teste
```

---

### Recapitulando

Na imagem abaixo temos um tabela com os comandos vistos hoje, juntamente com uma breve explicação sobre ele. Dessa forma fica fácil para você consultar sempre que sentir necessidade.

<%= figure(%{src: "/fundamentals/unix/images/comandos_part2.png", class: "text-center rounded mx-auto d-block", caption: "Tabela com os comandos do dia", width: "600px", height: "auto"}) %>

---

## Quiz

###### Tempo sugerido para realização: 20 minutos

Você já está craque em utilizar o terminal agora, não é verdade?! 🥳

Mas depois de ler tantos textos em inglês, acho que você não treinou apenas seu conhecimento em comandos do UNIX não é mesmo, _my friend_?

Mas lembre-se: o quiz é para **fixação dos conteúdos** e **não** tem **caráter avaliativo**, fique tranquilo!

[Chegou a hora de tirar a prova! Bora pro quiz! 👨🏼‍🎓](https://forms.gle/7ma2EzwUERiSAUGB9) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 60 minutos

Chegou a hora de você aprender na prática o que o terminal pode fazer para te ajudar. 🤯

Vamos para o Slack, onde estará disponível o link da nossa aula ao vivo de hoje!

---

## Exercícios

###### Tempo sugerido para realização: 90 minutos

É hora de colocar a mão na massa. 💪🏼

Você vai continuar a partir dos exercícios anteriores, então é importante que tenha completado os exercícios da aula anterior antes de seguir em frente! 🌐

---
### Parte I - Comandos de Input e Output

1. Navegue até a pasta `unix_tests`;

2. Crie um arquivo texto pelo terminal com o nome `skills2.txt` e adicione os valores `Internet`, `Unix` e `Bash`, um em cada linha.

3. Adicione mais 5 itens à sua lista de skills e depois imprima a lista ordenada no terminal. 🤓

4. Conte quantas linhas tem o arquivo `skills2.txt`.

5. Crie um arquivo chamado `top_skills.txt` usando o `skills2.txt`, contendo as 3 primeiras skills em ordem alfabética.

6. Crie um novo arquivo chamado `phrases2.txt` pelo o terminal e adicione algumas frases de suas escolha.

7. Conte o número de linhas que contêm as letras `br`.

8. Conte o número de linhas que **não** contêm as letras `br`.

9. Adicione dois nomes de países ao final do arquivo `phrases2.txt`.

10. Crie um novo arquivo chamado `bunch_of_things.txt` com os conteúdos dos arquivos `phrases2.txt` e `countries.txt`

11. Ordene o arquivo `bunch_of_things.txt`.

### Parte II - Permissões

1. Navegue até a pasta `unix_tests`;

2. Rode o comando [ls](https://linux.die.net/man/1/ls) {: .external-link target="_blank" rel="noreferrer noopener" } `-l` e veja quais as permissões dos arquivos;

3. Mude a permissão do arquivo `bunch_of_things.txt` para que todos os usuários possam ter acesso à leitura e escrita, e verifique se está correto com o comando `ls -l`;

    > Resultado esperado: `-rw-rw-rw- 1 ana ana 1860 ago 13 11:39 bunch_of_things.txt`

4. Tire a permissão de escrita do arquivo `bunch_of_things.txt` para todos os usuários, verifique se está correto com o comando `ls -l`;

    > Resultado esperado: `-r--r--r-- 1 ana ana 1860 ago 13 11:39 bunch_of_things.txt`

5. Volte à permissão do arquivo `bunch_of_things.txt` para a listada inicialmente utilizando o comando `chmod 644 bunch_of_things.txt`. [Leia este artigo](https://github.com/CristianAmbrosi/tutoriais/blob/master/Permiss%C3%B5es%20de%20um%20Arquivo%20ou%20Diret%C3%B3rio%20no%20Linux.md) {: .external-link target="_blank" rel="noreferrer noopener" } para entender mais sobre o que é e como funciona essa numeração `644`.

    > Resultado esperado: `-rw-r--r-- 1 ana ana 1860 ago 13 11:39 bunch_of_things.txt`

---

### Parte III - Processos & Jobs

1. Liste todos os processos;

2. Agora use o comando [sleep](https://linux.die.net/man/3/sleep) {: .external-link target="_blank" rel="noreferrer noopener" } `30` [ & ](https://linuxhandbook.com/run-process-background/) {: .external-link target="_blank" rel="noreferrer noopener" };

3. Use a listagem de processos para encontrar o PID do processo que está executando o comando `sleep 30` e termine a sua execução ~~(mate o processo)~~;

4. Execute novamente o comando `sleep 30`, mas agora sem o `&`. Depois, faça com que ele continue executando em background;

5. Crie um processo em background que rode o comando `sleep` por 300 segundos.

6. Crie mais dois processos que rodem o comando `sleep` por 200 e 100 segundos, respectivamente.

    > Você deve criá-los em *foreground* (sem usar o `&`) e suspendê-los (apertando `ctrl+z`) após cada um começar a executar.

7. Verifique que apenas o processo `sleep 300` está em execução com o comando `jobs`. Suspenda a execução desse processo.

    > Você vai precisar trazer o processo para *foreground* (`fg`) e suspendê-lo (`ctrl+z`), ou enviar um sinal).

8. Retome a execução do processo `sleep 100` em background com o comando `bg`.

9. Termine a execução de todos os processos `sleep` ~~(mate os processos)~~.

---

### (Bônus) - Parte IV - O despertar do terminal

E pra terminar com a energia ~~óh,~~ lá no alto, que tal aprender agora alguns comandos divertidos do UNIX? ☝ 🎊

[Leia este artigo para fazer os exercícios ~~de aquecimento~~ abaixo](https://canaltech.com.br/linux/11-comandos-divertidos-e-inuteis-para-usar-no-linux/) {: .external-link target="_blank" rel="noreferrer noopener" }

1. Abra o terminal e execute o comando `cmatrix`. Quando estiver se sentindo como o *Neo*, aperte `ctrl+c` para voltar ao terminal;

2. Crie um arquivo de texto chamado `fortune.txt` que contenha a sua sorte do dia. Utilize apenas uma linha de comando. _Dica: use o comando `fortune`, e o operador `>`;_

3. Conte quantas palavras tem a frase da sua sorte do dia. _Dica: use o comando `wc`;_

4. Execute o comando `sl`. Agora tente `sl -F`;

5. Execute o comando `cowsay`. Agora faça a vaquinha dizer a frase que está gravada no arquivo `fortune.txt`;

6. Descubra os fatores primos do número 42 usando o comando `factor`;

7. Veja como fica a sua sorte do dia ao contrário. Dica: utilize o comando `rev`.

8. Execute o comando `telnet towel.blinkenlights.nl` e espere alguns segundos. Lembre-se que você tem mais exercícios para fazer! 😅

---

## Recapitulando...

Agora que você passou um bom tempo estudando sobre o Unix e seus comandos, sabemos que você já entende que:

* O Unix é um sistema operacional que inspirou muitos outros sistemas, como MacOS, Linux, Solaris etc.;

* O Unix é composto basicamente pelo Shell, Kernel e os programas;

* A estrutura de diretórios do Unix é organizada no formato de uma árvore invertida, de forma hierárquica, iniciando pelo `root`;

* Tudo no Unix é um arquivo ou um processo;

* O terminal é seu principal aliado para ter produtividade em ambiente Unix;

Depois de entender como abrir e utilizar o terminal, você aprendeu na prática como utilizar os comandos Bash.
Vamos relembrar alguns dos comandos que você aprendeu a usar.

Um bom exercício é, mentalmente, tentar descrever o que cada comando faz.

* `ls`, `mkdir`, `cd`, `pwd`, `cp`, `mv`, `rm`, `rmdir`, `clear`, `cat`, `less`, `head`, `tail`, `grep`, `wc`, `>`, `>>`, `|`, `sort`, `who`, `man`, `whatis`, `apropos`, `*`, `?`, `chmod`, `ps`, `bg`, `kill`, `find`, `history`.

---

## Recursos Adicionais (opcional)

E aí, gostou do que aprendeu até aqui? Nesta parte, nós colocamos outras referências para você se aprofundar sobre o tema. Artigos, tutoriais, livros etc.

* [Coleção de recursos sobre Shell e Bash](https://aurelio.net/shell/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Entenda mais sobre permissões utilizando `chmod`](http://ftp.kh.edu.tw/Linux/Redhat/en_6.2/doc/gsg/s1-navigating-chmodnum.htm) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Calculadora de permissões do Linux 😜](https://chmod-calculator.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Programando em Shell Script](http://www.devin.com.br/shell_script/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Qual a diferença entre bash e shell? ~~nenhuma~~](https://pt.phhsnews.com/what-s-difference-between-bash-zsh-and-other-linux-shells3733) {: .external-link target="_blank" rel="noreferrer noopener" }

##### ⚠️ O sinal de % não é necessário antes da execução dos comandos listados nos links dos conteúdos abaixo.

* [Unix - Inputs e outputs no terminal](http://www.ee.surrey.ac.uk/Teaching/Unix/unix3.html) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Unix - Direitos de acesso e lidando com processos](http://www.ee.surrey.ac.uk/Teaching/Unix/unix5.html) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Hora de aprender a utilizar o ***Git***! 🐚

<%= next_button(@conn) %>
