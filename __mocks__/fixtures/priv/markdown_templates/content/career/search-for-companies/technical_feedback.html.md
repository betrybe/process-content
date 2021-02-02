# Feedbacks Técnicos

Depois de termos aprendido sobre as melhores maneiras de dar e receber feedbacks sobre comportamento e personalidade com o Rafa e os outros conteúdos do material anterior, é hora de aprendermos mais sobre como lidar com feedbacks quando eles são relacionados a coisas mais técnicas. Vamos lá?

## Práticas de programação em conjunto e suas consequências

Você já conhece as principais práticas de mercado para programação em conjunto? Vamos explorá-las! :)

### **Pair Programming**

De forma resumida, a programação em pares acontece quando duas pessoas escrevem um código em conjunto, em uma máquina.

Jean Bartik, uma das 6 mulheres programadoras do ENIAC (primeiro computador digital eletrônico de grande escala) considerava como boa prática trabalhar em pares na década de 1950! Na época, a palavra "programa" ainda nem era utilizada e não haviam modelos ou livros indicando como fazê-lo. Demorou cerca de 50 anos para a programação em pares se tornar um termo conhecido e generalizado, quando Kent Beck descreveu o termo como uma prática ágil de desenvolvimento de software em seu livro _"Extreme Programming"_ no final dos anos 90. 

_"I believe that the best programs and designs are done by pairs, because you can criticise each other, and find each others errors, and use the best ideas."_ - por Jean Bartik

Tradução livre: _Acredito que os melhores programas e designs são feitos por pares, porque você pode criticar um ao outro, encontrar erros um do outro e usar as melhores idéias_

**Vejamos como funciona.**

Quem controla e quem observa. A pessoa que controla é quem está no teclado. Ela está focada em completar o pequeno objetivo em questão, em como implementar, quais as próximas linhas de código, sendo bem tática e ignorando problemas maiores no momento. Tudo o que estiver sendo feito, precisa ser falado em voz alta enquanto se faz.

A pessoa que observa analisa o código em movimento, fornece instruções e compartilha pensamentos. Essa pessoa está de olho nos problemas maiores, nos bugs e faz anotações dos possíveis próximos passos ou obstáculos, com uma visão mais estratégica e mais abrangente.

A ideia dessa divisão de função é ter 2 perspectivas diferentes sobre um mesmo código.

**De maneira prática, é necessário:**
1. Entender o problema

2. Definir um objetivo minúsculo de cada vez

2. Criar uma solução

3. Planejar a abordagem

**Não se esqueça de:**
- Rotacionar (trocar o teclado e os papéis periodicamente)
- Gerir o tempo (total e individual sem interrupções)
- Estabelecer pausas


**Presencial:** Se a programação em par for feita presencialmente, preste atenção se a configuração física atende a necessidade de ambas as pessoas. Por exemplo, veja se há espaço suficiente para as duas cadeiras em frente a mesa, se é melhor usar um ou dos monitores, se vão utilizar o mesmo teclado e mouse ou se cada pessoa preferirá utilizar o seu próprio.

**Remoto:** Se a programação for à distância, a configuração remota também precisa ser bem ajustada. Garanta que a qualidade da internet é suficiente para o compartilhamento de tela e uso do vídeo. Caso contrário, vocês podem enfrentar problemas e perder o foco da atividade. Além disso, utilize ferramentas visuais para planejar e desenhar a solução, buscando replicar a experiência presencial.

#### Dica de ferramenta

Uma ferramenta interessante para Pair Programming remoto é o [Visual Studio Code Live Share](https://code.visualstudio.com/blogs/2017/11/15/live-share), já conhece? 

Através do Visual Studio Code Live Share, a sua dupla pode ler o código que você compartilhou sem precisar clonar um repositório ou instalar quaisquer dependências das quais seu código depende. 

Cada um de vocês pode abrir arquivos, navegar, editar código, destacar ou refatorar - as alterações são refletidas instantaneamente. 

Por fim, a depuração colaborativa vai além, permitindo que você e a outra pessoa da equipe inspecionem objetos de forma independente, usando recursos de depuração, stack trace, debug console, etc.

**Importante**

- Foco total. Não abra espaço para distrações. Se precisar pegar o celular pra ver um e-mail, deixe isso transparente ao par e, se necessário, pause a prática.

- Não dê ordens. A velha frase "Pressione a tecla SHIFT, agora crie uma nova variável" não cabe no pair programming. Esse não é o propósito desta prática e tornará a experiência frustrante para outra pessoa.

- Tenha paciência. Quando vir algo que possa estar "errado" na sua visão, espere 5 segundos antes de falar. A outra pessoa já pode estar com essa ideia em mente ou perceber o erro nesse período e uma fala pode quebrar a linha de pensamento dela.

- Lembre-se que a solução é criada em conjunto. Por isso, tenha atenção e respeito em relação à experiência da pessoa que divide a construção da atividade com você.

#### Benefícios

São muitos os benefícios dessa prática em equipe, entre eles a propriedade coletiva do código. Ou seja, nenhuma classe ou método está somente sob a guarda de uma única pessoa e todas possuem responsabilidade e a mesma visão de todo o projeto. 

Assim, devs somam conhecimento para produzir códigos mais criativos e eficazes. Tanto a quantidade de erros de sintaxe, quanto a necessidade de refatoração e erros dos testes unitários tendem a diminuir.

#### **Coding Dojo**

Na nossa área, as novidades surgem em uma velocidade altíssima e imaginamos que você já saiba disso! :) 
Por isso, é extremamente importante existir um momento onde novas técnicas, ideias, problemas, linguagens possam ser aprendidas, testadas, praticadas e compartilhadas.

A palavra Dojo tem origem japonesa e significa “local de treinamento”. O Coding Dojo nada mais é que do um “local de treinamento de código”, ou “local de treinamento de programação”.

Existem diversas formas de se fazer um Coding Dojo. Uma das formas mais comuns em empresas é a que consiste em se propor um problema a ser resolvido por um grupo de até 5 pessoas. 

A programação é realizada em apenas uma máquina, por pares que trocam de posição com outras pessoas da *platéia* a cada 5 minutos. Nesse momento, a pessoa denominada de pilota (que fica na máquina programando) vai para a platéia. 

A pessoa co-pilota, papel análogo de quem observa no _Pair Programming_, torna-se a pilota da rodada e a próxima pessoa da platéia fica como co-pilota. 

Para esse formato é super importante a utilização de _Test Driven Development_ (TDD) e _baby steps_ (passos de bebê).

Além da diversão (não é uma competição), um dos objetivos é de que as pessoas saiam da sua zona de conforto e que o conhecimento obtido durante a execução do Coding Dojo seja utilizado pelo time nas tarefas de seu dia-a-dia, indiretamente aumentando a qualidade.

Por fim, ao final de todas as rodadas, é recomendado fazer uma espécie de **retrospectiva**, respondendo as seguintes perguntas:

- O que aprendemos com o Dojo de hoje?
- O que podemos melhorar nos próximos?
- O que devemos continuar fazendo?

Além dos dois exemplos que mencionamos em maior detalhe, existem outros como Mob Programming, Hackathon, etc.

## Benefícios destas práticas em conjunto

Os benefícios vão além da qualidade de código, que chamamos de _Hard Skills_. Também são práticas importantes no desenvolvimento de habilidades comportamentais e relacionais, comumente denominadas _Soft Skills_.

As práticas envolvem uma maneira muito colaborativa de trabalhar e envolvem uma necessidade gigantesca de comunicação assertiva. Enquanto um par de devs trabalha em uma tarefa, eles não somente escrevem código, mas também planejam e discutem seu trabalho, esclarecem ideias no caminho, discutem abordagens e chegam a melhores soluções. Tudo isso torna o ambiente mais colaborativo.

Além disso, nesse momento temos feedbacks quase que continuamente, onde ao escrever um código ou propor uma solução, a outra pessoa precisa expor a sua opinião que pode ser favorável ou contrária ao que foi apresentado pela dupla respeitando a opinião alheia. Quando a opinião for contrária, é importante que a dupla converse sobre, traga os porquês e entenda de fato o que se encaixa melhor para o contexto.

## *Feedback* de código

A principal forma de *Feedback* de código é através do _Code Review_.

Essa é a prática de Revisar o Código antes fazer o *merge* (juntar) com o código principal. Em geral, isso é feito por outra pessoa do time que não tenha escrito o código. Em cada empresa há uma política que pode definir uma pessoa específica do time com essa responsabilidade, em outros casos a revisão pode ficar por conta de quem tiver disponibilidade no momento e assim por diante.

Para a garantia do bom funcionamento da prática do Code Review, é importante ter 2 coisas em mente ao fazer os comentários:

1. Há lugares em que o código TEM que ser alterado e há outros em que você está fazendo sugestões que acredita serem melhorias. Isso precisa ficar claro na sua mensagem. No caso das sugestões, não há problema da pessoa que escreveu o código pensar de forma contrária à sua, expondo sua visão em comentários posteriores. Você deve tentar deixar sua visão e os porquês explícitos e objetivos. Ah! E não esqueça de indicar a melhor forma de fazê-lo, além de apontar o problema em questão.

2. Seus comentários devem ser direcionados ao código, nunca à pessoa que o escreveu. Isso pode parecer óbvio, mas garantimos que é de vital importância lembrar-se disso. A sua forma de escrever e as escolhas de suas palavras são o que vão diferenciar a thread de mensagens entre uma discussão saudável ou fazer a pessoa sentir-se diminuída.

Dicas importantes:

- Caso a thread do Pull Request esteja se estendendo muito, pode ser interessante convidar a pessoa para conversar por voz. Pode haver uma certa limitação de comunicação na hora de passar uma ideia por escrita. Nestes casos, a utilização de um papel ou de um software de desenho pode facilitar a compreensão.

- Muitas vezes, a pessoa que solicita o Code Review está no aguardo para dar sua tarefa por finalizada. Se não tiver disponibilidade, informe a pessoa quanto tempo levará para conseguir dar atenção a ela ou solicitar a outra pessoa do time. Do contrário, sendo possível, peça um pouco de contexto em relação a atividade antes de iniciar a revisão.

No final das contas, Code Review é um exercício de empatia, além de uma oportunidade muito legal de ajudar a outra pessoa do time a evitar práticas ruins, desenvolver-se profissionalmente e não deixar que o código principal seja afetado. Também é uma ótima oportunidade para melhorar a qualidade do seu código de maneira bem específica e personalizada, com o auxílio do time.

Viu só como hard e soft skills são desenvolvidos em conjunto? :)

## Não é algo pessoal

Importante ressaltar: quando você for dar ou receber um feedback para um código, os conselhos expostos precisam ser focados no código em si e no que se relaciona a ele. 

Por exemplo: dê um feedback focado na arquitetura, na forma de solucionar um problema, na linha de raciocínio, na legibilidade, na falta de contexto, na regra de negócio, no design da API, nos detalhes da tela implementada, etc. Foque em ajudar na evolução daquilo que se produz.

Ou seja: o feedback técnico não é dado em relação à pessoa e suas características pessoais e comportamentais. Isso precisa ser tratado de forma separada. Combinado?
