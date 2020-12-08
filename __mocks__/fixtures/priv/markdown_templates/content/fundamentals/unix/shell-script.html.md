## O que vamos aprender?

E aí, você que nunca tinha usado uma _"tela preta"_ na vida, o que está achando ~~dos seus novos super poderes~~ das suas novas habilidades até agora?

Hoje você vai dar um passo além e aprender a utilizar os comandos do UNIX para criar *scripts* utilizando o *shell*. Você vai programar utilizando o famoso _Shell Script_! 🐚

---

### Você será capaz de:

* Criar scripts utilizando a linguagem _Shell Script_ e os comandos do Linux para automatizar tarefas;

* Programar utilizando condicionais e ler dados do usuário usando _Shell Script_.

---

## Por que isso é importante?

No dia a dia, você invariavelmente vai se deparar com o terminal, seja para _alterar arquivos de configuração, iniciar/reiniciar servidores, rodar ferramentas de teste_, enfim, isso vai acontecer mais cedo ou mais tarde. 📜

Então, se você quer ter uma alta taxa de produtividade, aprender _Shell Script_ é fundamental. Você consegue realizar as tarefas básicas incrivelmente rápido. Depois disso, conforme a necessidade surgir, você estará muito mais preparado para estudar tópicos mais avançados sobre o *shell*. 💎

O _Shell Script_ pode te ajudar a automatizar tarefas na linha de comando, te poupando tempo e esforço de fazer tarefas repetitivas. Além disso, vamos abordar conceitos fundamentais que estão presentes em qualquer linguagem de programação, que serão muito valiosos no decorrer do curso. 🖥

---

## Conteúdos

###### Tempo sugerido para realização: 90 minutos

Selecionamos alguns vídeos nos quais você aprenderá as principais funcionalidades do _Shell Script_. Preste atenção na **sintaxe** dos comandos, isso pode te salvar horas procurando por um problema que pode ser simples de resolver! 🥺

Lembre-se de fazer pausas durante e entre os vídeos para treinar os comandos e também descansar, assim você consegue assimilar melhor o conteúdo! 🧠💭

---

### Usando o VSCode

Nos vídeos que você verá o instrutor utiliza o `vi` como editor, mas você deve utilizar o VSCode. Para isso siga as instruções abaixo de como utilizar o VSCode com Shell Script.

1. Abra o VSCode e crie um novo arquivo com a extensão `.sh`, ele pode levar o nome que você desejar. Para criar um novo arquivo você pode apertar `Ctrl + N` e uma nova aba será aberta.
2. Abra o terminal no VSCode, para isso vá a aba de navegação e clique em `Terminal` ou use o comando _Ctrl + \`_, com isso um terminal semelhante ao que você aprendeu a usar nos últimos dias será aberto, ele funciona exatamente igual ao que você já conhece.
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

---

### Iniciando um código em Shell Script

<%= youtube_video "3YGGRaVBzFU" %>

Nesse vídeo você aprendeu a como iniciar um código em _Shell Script_ e viu um pouco mais sobre o fluxo descrito na seção `Usando o VSCode`. Lembre-se de sempre adicionar na primeira linha do script o comando `#!/bin/bash`, que daqui para frente chamaremos de *Sha-Bang* e também de fornecer a permissão de execução para que seja possível executar o seu script.

---

### Variáveis

Agora temos um vídeo sobre variáveis, que são lugares na memória em que podemos armazenar, utilizar e alterar informações ao longo da execução de um programa. Você verá como elas funcionam no _Shell Script_ e entenderá as diversas formas de escrevê-las e utilizá-las.

<%= youtube_video "T4KWiL-L4QQ" %>

Com o conceito de variáveis bem explicado, fomos apresentados a uma forma de interagir com o programa e através da entrada de um usuário, definir o valor de uma variável com o comando `read`. Esse comando contém um parâmetro que permite que um texto seja adicionado na mesma linha, evitando o uso do `echo`. Veja como utilizá-lo:

```language-sh
#!/bin/bash

read -p "Qual o seu nome? " NOME
echo "Meu nome é" $NOME
```

---

### Condições e operadores relacionais

Agora você irá assistir dois vídeos em sequência, o primeiro deles falará sobre `condições` e na sequência você verá sobre `operadores relacionais`.

<%= youtube_video "KCk1U7nS3j4" %>

No vídeo anterior fomos apresentados ao conceito de `condicional` e a estrutura `if then else`. Caso o exemplo visto no vídeo não tenha ficado claro o próximo vídeo irá abordar novamente esse conceito, mas tenha tranquilidade pois veremos essa e outras formas de trabalhar com condições ao longo do curso.

<%= youtube_video "80FHuKA89mo" %>

Nesse último vídeo foi mostrado um pouco sobre `operadores relacionais`, eles tem esse nome pois estabelecem relações de comparação entre valores numéricos. Veja um pouco mais sobre operadores nesse [site](https://www.tutorialspoint.com/unix/unix-basic-operators.htm) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 60 minutos

Agora que você já domina o terminal e os comandos, é hora de juntar tudo isso para criar seus próprios scripts!

Mas, antes disso, vamos nos encontrar ao vivo pelo Zoom para aprender como usar o terminal e o editor de texto integrados.

Aula ao vivo! Vamos pro Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 150 minutos

Chegou a hora de colocar a mão na massa! 🥖

##### ⚠️ Faça os exercícios a seguir em dupla com seus colegas. Fique atento às orientações do time sobre a sua dupla.

Você vai criar vários *scripts* em *Shell*. Procure discutir a solução com a sua dupla e garanta que cada membro da dupla tenha o seu próprio código! 📌

Dessa vez, o gabarito está disponível ~~escondido~~ junto com exercício, mas resista à tentação de abri-lo ao máximo, pelo menos até a dupla ter conseguido desenvolver o exercício por conta própria! 🤜🏼🤛🏼

---

###### ⚠️ _Não se esqueça de executar cada um dos scripts, testá-los de diferentes formas e analisar o resultado após cada teste!_ 🔎

<details>
  <summary>
    1. Escreva um _Shell Script_ que imprima na tela a frase: `"Shell Script é demais!"`;
  </summary>

```language-sh
#!/bin/bash

echo "Shell Script é demais!"
```
</details>

<details>
  <summary>
    2. Modifique o _Shell Script_ do exercício anterior para incluir uma variável. A variável deverá receber o conteúdo da mensagem: `"Shell Script com variáveis é demais!"`;
  </summary>

```language-sh
#!/bin/bash

PHRASE="Shell Script com variáveis é demais!"
echo $PHRASE
```
</details>

<details>
  <summary>
    3. Escreva um _Shell Script_ que guarde o resultado do comando `hostname` em uma variável. Imprima na tela uma mensagem: `"Este script está rodando no computador: _"` em que `"_"` é o resultado do comando `hostname` que está na variável;
  </summary>

```language-sh
#!/bin/bash

HOSTNAME=$(hostname)
echo "Este script está rodando no computador: $HOSTNAME"
```
</details>

<details>
  <summary>
    4. Escreva um _Shell Script_ que verifique se o caminho até um arquivo existe _("file path"_). Se ele existir, imprima na tela a mensagem: `"O caminho _ está habilitado!"`. Então, verifique se você tem permissão de escrita no arquivo. Se tiver, mostre a mensagem: `"Você tem permissão para editar _"`. Caso contrário, mostre a mensagem: `"Você NÃO foi autorizado a editar _"`.
    ***O `_` nas mensagens deve ser substituído pelo ("file path").***
  </summary>

```language-sh
#!/bin/bash

FILE="/home/joaozinho/scripts/teste.sh"
if [ -e "$FILE" ]
  then
     echo "O caminho $FILE está habilitado!"
fi
if [ -w "$FILE" ]
  then
    echo "Você tem permissão para editar $FILE"
  else
    echo "Você NÃO foi autorizado a editar $FILE"
fi
```
</details>

<details>
  <summary>
    5. Escreva um _Shell Script_ que peça ao usuário um caminho de arquivo ou diretório e, em seguida, imprima na tela se ele é um arquivo comum, um diretório, ou outro tipo de arquivo. Depois, faça um comando de listagem no arquivo/diretório usando a opção de listagem detalhada.
  </summary>

```language-sh
#!/bin/bash

echo "Digite o caminho de um arquivo ou diretório:"
read FILE
if [ -f "$FILE" ]
  then
    echo "$FILE é um arquivo comum"
elif [ -d "$FILE" ]
  then
    echo "$FILE é um diretório"
else
    echo "$FILE é alguma outra coisa"
fi
ls -l $FILE
```
</details>

<details>
  <summary>
    6. Modifique o _Shell Script_ do exercício anterior de forma que ele aceite o nome do arquivo ou diretório como argumento (ou parâmetro), em vez de perguntar ao usuário. Pesquise nos recursos adicionais como utilizar os parâmetros (ou argumentos) no _Shell Script_.
  </summary>

```language-sh
#!/bin/bash

FILE=$1

if [ -f "$FILE" ]
  then
    echo "$FILE é um arquivo comum"
elif [ -d "$FILE" ]
  then
    echo "$FILE é um diretório"
else
    echo "$FILE é alguma outra coisa"
fi
ls -l $FILE
```
</details>

<details>
  <summary>
    7. Escreva um _Shell Script_ que receba um diretório como argumento (ou parâmetro). Se o argumento não for um diretório, mostre a mensagem: `"O argumento _ não é um diretório!"`. Se o argumento for um diretório, conte quantos arquivos existem nele e mostre a seguinte mensagem: `"O _ tem _ arquivos."`, em que você deve substituir os `"_"` pelo diretório e a quantidade de arquivos nele, respectivamente.
  </summary>

```language-sh
#!/bin/bash

DIRECTORY=$1
if [ -d "$DIRECTORY" ]
  then
    FILES=`ls -l $DIRECTORY | wc -l`
    echo "O $DIRECTORY tem $FILES arquivos."
else
    echo "O argumento $DIRECTORY não é um diretório!"
fi
```
</details>

### Bônus

Os exercícios a seguir exigem uma estrutura que vocês ainda não conhecem, o FOR, para realizá-los pesquise nos recursos adicionais como utilizar o FOR no _Shell Script_.

<details>
  <summary>
    1. Escreva um _Shell Script_ que imprima as palavras `"shell"`, `"script"`, `"usando"`, `"estrutura"`, `"repetição"`, `"for"`, `"terminal"` na tela, uma palavra por linha. Tente fazer isso usando o menor número de comandos possível.
  </summary>

```language-sh
#!/bin/bash

WORDS="shell script usando estrutura repetição for terminal"
for WORD in $WORDS
  do
    echo $WORD
  done
```
</details>

<details>
  <summary>
    2. Modifique o _Shell Script_ do exercício 6 para aceitar uma quantidade ilimitada de arquivos ou diretórios como argumento (ou parâmetro).
  </summary>

```language-sh
#!/bin/bash

FILES=$@

for FILE in $FILES
  do
    if [ -f "$FILE" ]
      then
        echo "$FILE é um arquivo comum"
    elif [ -d "$FILE" ]
      then
        echo "$FILE é um diretório"
    else
        echo "$FILE é alguma outra coisa"
    fi
    ls -l $FILE
  done
```
</details>

<details>
  <summary>
    3. Escreva um _Shell Script_ que renomeie todos os arquivos do diretório atual que terminam em `".png"`, de forma que o nome do arquivo comece com a data atual no formato `"YYYY-MM-DD"`. Por exemplo, se tiver um arquivo com o nome `"kitten.png"` no diretório atual, e a data de hoje for 16/04/2020, o script deverá mudar o nome do arquivo para `"2020-04-16-kitten.png"`.
  </summary>

```language-sh
#!/bin/bash

DAY=$(date +%F)

for FILE in `ls *.png`
 do
    mv $FILE ${DAY}-${FILE}
 done
```
</details>

<details>
  <summary>
    4. Modifique o _Shell Script_ do exercício anterior para receber o diretório onde estão os arquivos e a extensão dos arquivos que devem ser modificados como argumento (ou parâmetro). Adicione também uma mensagem mostrando como eram e como vão ficar os nomes dos arquivos a serem modificados.
  </summary>

```language-sh
#!/bin/bash

DIRECTORY=$1
EXTENSION=$2

DAY=$(date +%F)

cd $DIRECTORY

for FILE in `ls *.$EXTENSION`
 do
    echo "Renomeando $FILE para ${DAY}-${FILE}"
    mv $FILE ${DAY}-${FILE}
 done
```
</details>

---

## Recursos Adicionais (opcional)

E aí, gostou do que aprendeu até aqui? Nesta parte, nós colocamos outras referências para você se aprofundar sobre o tema. Artigos, tutoriais, livros etc.

* [Canivete suíço do Shell Script - texto](https://aurelio.net/shell/canivete/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Vídeo sobre estruturas de repetição (FOR)](https://www.youtube.com/watch?v=LJ14aJNHe_g&list=PLOHcYxJYJhjj6m1cyVchsxCKglqASPSzx&index=6) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Programando em Shell Script](http://www.devin.com.br/shell_script/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Shell Script: tratamento de argumentos e opções](http://www.devin.com.br/shell-script-tratamento-de-argumentos-e-opcoes/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Shell: Entrada e Saída](http://www.devin.com.br/shell-entrada-e-saida/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Shell Script profissional](https://www.youtube.com/watch?v=sIYW_jYVfmY&t=11s) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial de Shell Script **interativo** ~~hands on!~~](https://www.learnshell.org) {: .external-link target="_blank" rel="noreferrer noopener" }

* [\](https://explainshell.com) {: .external-link target="_blank" rel="noreferrer noopener" }Explicador\" de comandos do shell"

* [Verificador de sintaxe de scripts shell](https://www.shellcheck.net) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Qual a diferença entre bash e shell? ~~nenhuma~~](https://pt.phhsnews.com/what-s-difference-between-bash-zsh-and-other-linux-shells3733) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
