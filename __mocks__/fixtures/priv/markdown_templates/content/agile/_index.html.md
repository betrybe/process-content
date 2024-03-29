## O que vamos aprender?

Hoje você vai iniciar seu aprendizado sobre **Métodos Ágeis**.

Os **métodos ágeis** são uma alternativa à gestão tradicional de projetos. Eles nasceram nos braços do desenvolvimento de software, mas hoje são aplicados a qualquer tipo de projeto.
Esses métodos vêm ajudando muitas equipes a encarar as imprevisibilidades de um projeto através de entregas **incrementais e ciclos iterativos**.

Os **métodos ágeis** buscam promover um processo de gerenciamento de projetos que incentiva a inspeção e adaptação frequente.
É uma filosofia que acaba por incentivar o maior trabalho em equipe, a auto-organização, a comunicação frequente, o foco no cliente e a entrega de valor.
Basicamente, os **métodos ágeis** são um conjunto de práticas eficazes que se destinam a permitir a entrega rápida e de alta qualidade do produto, tendo uma abordagem de negócios que alinha o desenvolvimento do projeto com as necessidades do cliente e os objetivos da empresa.

---

### Você será capaz de:

* Entender o que são **Métodos Ágeis**;

* Entender o que é **Kanban**;

* Entender o que é **Scrum**;

* Trabalhar em equipes utilizando **Kanban** ou **Scrum** de maneira eficaz.

---

## Por que isso é importante?

A metodologia ágil é, quando aplicada no contexto correto, mais **produtiva** e **eficaz** que os modelos tradicionais. Em desenvolvimento de software, é quase certo que você irá trabalhar a maior parte do tempo em um time que aplique práticas ágeis, ou mesmo um `framework` completo.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Métodos Ágeis

O nascimento dos métodos ágeis dá-se com o lançamento do [Manifesto Ágil](https://agilemanifesto.org/iso/ptbr/manifesto.html) {: .external-link target="_blank" rel="noreferrer noopener" }.

Esse manifesto prega uma metodologia de desenvolvimento de software que tem como objetivo satisfazer os clientes da empresa, entregando com rapidez e com maior frequência versões novas do software, de acordo com suas necessidades.

Ou seja: a partir de uma versão publicada, que pode não estar absolutamente completa, pode-se evoluir o software de acordo com as necessidades dos clientes da empresa e de suas demandas.
Do contrário, o produto final demoraria demais para ficar pronto, o que comprometeria a sua entrega de valor e sua relevância, arriscando ficar obsoleto.

Veja o vídeo abaixo sobre quando utilizar **métodos ágeis**:

<%= youtube_video "efZlpew90Nk" %>

E aqui, mais um conteúdo para reforçar o entendimento:

<%= youtube_video "ds_FydzsuO8" %>

Pouco tempo após a publicação do manifesto e a consolidação da metodologia ágil, as fronteiras das empresas de desenvolvimento de software foram ultrapassadas.
Hoje, as técnicas e filosofias dessa nova escola são aplicadas em empresas e organizações de diversas outras áreas.
Essa popularização acabou por criar subtipos para a gestão ágil, cada um com suas peculiaridades: os chamados "_frameworks_" ágeis.

Os _frameworks_ são ferramentas que têm como base os princípios ágeis e podem ser implantados em times ou empresas que desejam incorporar o **Agile** em suas práticas.
Entretanto, nem sempre é possível seguir as regras dos _frameworks_ ao pé da letra.
Por isso, há quem advogue que os princípios ágeis devem ser adaptados à realidade de cada área ou organização.
Afinal, o mais importante é que os princípios fundamentais se mantenham e cumpram com o objetivo de facilitar e agilizar os processos e as entregas da equipe, sem gerar complexidade desnecessária.

A seguir, vamos conhecer um pouco mais sobre o _framework_ **Scrum** e o método **Kanban**.

### Scrum

**Scrum** é um _framework_ para gestão e planejamento de projetos.

No **Scrum**, os projetos são divididos em ciclos chamados de **Sprints**.
O **Sprint** representa um espaço de tempo, normalmente de 2 a 4 semanas, no qual um conjunto de atividades deve ser executado.
**Metodologias ágeis** de desenvolvimento de software são iterativas, ou seja, o trabalho é dividido em iterações (ciclos), que são chamadas de _Sprints_, no caso do `Scrum`.

As funcionalidades a serem implementadas em um projeto são mantidas em uma lista que é conhecida como [**Product Backlog**](https://www.desenvolvimentoagil.com.br/scrum/product_backlog) {: .external-link target="_blank" rel="noreferrer noopener" }.

No início de cada _Sprint_, faz-se um [**Sprint Planning Meeting**](https://www.desenvolvimentoagil.com.br/scrum/sprint_planning_meeting) {: .external-link target="_blank" rel="noreferrer noopener" }, ou seja, uma reunião de planejamento na qual o [**Product Owner**](https://www.desenvolvimentoagil.com.br/scrum/product_owner) {: .external-link target="_blank" rel="noreferrer noopener" } prioriza os itens do [**Product Backlog**](https://www.desenvolvimentoagil.com.br/scrum/product_backlog) {: .external-link target="_blank" rel="noreferrer noopener" } e a equipe seleciona as atividades que ela será capaz de implementar durante o _Sprint_ que se inicia.

As tarefas alocadas em um _Sprint_ são transferidas do [**Product Backlog**](https://www.desenvolvimentoagil.com.br/scrum/product_backlog) {: .external-link target="_blank" rel="noreferrer noopener" } para o [**Sprint Backlog**](https://www.desenvolvimentoagil.com.br/scrum/sprint_backlog) {: .external-link target="_blank" rel="noreferrer noopener" }.

A cada dia de uma _Sprint_, a equipe faz uma breve reunião, chamada [**Daily Meeting**](https://www.desenvolvimentoagil.com.br/scrum/daily_scrum) {: .external-link target="_blank" rel="noreferrer noopener" } (ou **Daily Scrum**).
O objetivo é disseminar o conhecimento sobre o que foi feito no dia anterior, identificar impedimentos e priorizar o trabalho do dia que se inicia.

Ao final de um _Sprint_, a equipe apresenta as funcionalidades implementadas em uma [**Sprint Review Meeting**](https://www.desenvolvimentoagil.com.br/scrum/sprint_review_meeting) {: .external-link target="_blank" rel="noreferrer noopener" }.
Finalmente, faz-se uma [**Sprint Retro Meeting**](https://www.desenvolvimentoagil.com.br/scrum/sprint_retrospective) {: .external-link target="_blank" rel="noreferrer noopener" } (ou **Sprint Retrospective**), onde são apontados os pontos positivos e negativos do último _Sprint_, assim como ações para mitigar os pontos negativos e evitar que se repitam. Após essa reunião, a equipe parte para o planejamento do próximo _Sprint_.

Assim, reinicia-se o ciclo, levando em consideração os aprendizados da última iteração. A figura abaixo ilustra o ciclo que você estudou:

<%= figure(%{src: "/agile/scrum.png", class: "rounded mx-auto d-block", width: "600px", height: "auto", alt: "Scrum framework"}) %>

### Kanban

O método `Kanban` foi criado pela japonesa _Toyota_ na década de 1960 e faz parte da metodologia [**Just in Time**](https://global.toyota/en/company/vision-and-philosophy/production-system/) {: .external-link target="_blank" rel="noreferrer noopener" }, um sistema de administração da produção que determina que deve ser feito somente o imprescindível para realização da etapa seguinte do processo, em um fluxo de trabalho contínuo.
Em outras palavras: fazer apenas o que é necessário, quando necessário e na quantidade necessária.

Em meio à falta de recursos e diante da necessidade de se modernizar para acompanhar as mudanças do mercado, a empresa precisava mudar sua metodologia de gestão e procurar por uma [gestão por resultados](https://blog.runrun.it/gestao-por-resultados/) {: .external-link target="_blank" rel="noreferrer noopener" }.

Era preciso agir rápido e urgentemente para criar um novo sistema de manufatura.
Assim, inspirados pelo livro [_Today and Tomorrow_](https://www.amazon.com/Today-Tomorrow-Special-Fords-Classic/dp/0915299364) {: .external-link target="_blank" rel="noreferrer noopener" }, de Henry Ford, a diretoria da _Toyota_ desenvolveu o `Kanban`.

Na _Toyota_ em dificuldade, a visualidade do `Kanban` facilitou muito o trabalho das equipes de produção e montagem.
O sistema melhorou a comunicação entre as pessoas que trabalhavam na empresa, bem como o entendimento de quais peças precisavam ser repostas no momento correto.
A padronização também foi auxiliada pelo sistema, assim como a redução de desperdícios.

A metodologia `Kanban` propõe a utilização de cartões ou `post-its` em um quadro para indicar e acompanhar, de maneira visual, prática e utilizando poucos recursos, o andamento dos fluxos de produção nas empresas.
De um lado do quadro, ficam as tarefas que precisam ser executadas, o que pode ser chamado de [Backlog](https://blog.runrun.it/o-que-e-backlog/) {: .external-link target="_blank" rel="noreferrer noopener" }.
E, do outro, as etapas de execução: em andamento e entregue.
Você pode alterar o nome dessas etapas de acordo com seus processos internos.
Conforme as tarefas são desempenhadas, o cartão ou `post-it` é colocado no campo correspondente ao status da tarefa.

Assista ao vídeo abaixo para complementar o conhecimento relacionado ao `Kanban`:

<%= youtube_video "htPKj5qZhd4" %>

#### Os benefícios do sistema Kanban

O `Kanban` nada mais é que uma maneira simples e visual de organizar as tarefas e o fluxo de trabalho, tornando tudo muito mais eficiente.
Os benefícios do sistema `Kanban` são:

- Visão do todo;
- Simplicidade;
- Acesso a informações;
- Facilitação do fluxo de trabalho;
- Incentivo à comunicação;
- Prioridade e metas claras.

##### Visão do todo

Seja físico ou digital, o `Kanban` é visual.
Isso é especialmente útil em situações em que várias pessoas ou grupos coordenam e cooperam em um mesmo projeto, ou processo, permitindo que essas pessoas planejem suas tarefas atuais e as seguintes.
O `Kanban` oferece uma visão do todo, ou seja, uma perspectiva holística de um processo.
Ao invés de fazer com que as pessoas trabalhem isoladamente, o sistema `Kanban` permite que todos na organização tenham uma melhor compreensão e apreciação do que outras pessoas e equipes estão fazendo.
A liderança de área, por sua vez, consegue ter uma visão concreta de quem está fazendo o quê e quantas etapas faltam para um projeto ser finalizado.

##### Simplicidade

A ideia e o conceito por trás do `Kanban` são fáceis de entender.
É isso que o torna atraente para quase todas as áreas de uma organização.
A simplicidade permite que todas as pessoas participem com facilidade e comprem a ideia.

##### Acesso à informação

O `Kanban` tem processos inclusivos, que permitem que as pessoas tenham acesso a mais informações.
Ele dá às pessoas mais conhecimento corporativo, o que é particularmente útil para aquelas que têm pouco entendimento de um sistema complexo, como, por exemplo, as pessoas recém-contratadas.
No fim da cadeia, ele dá poder às pessoas e incentiva a autonomia.

##### Facilitação do fluxo de trabalho

O `Kanban` contribui para que haja menos desperdício nas operações, tornando tudo mais prático e conciso.
Partes redundantes ou desnecessárias de um processo podem ser removidas, enquanto outras podem ser simplificadas.
Ou seja, o fluxo de trabalho pode ser facilitado, sem comprometer a qualidade.
Isso significa uma constante melhora na produtividade.

##### Incentivo à comunicação

Como o uso do `Kanban` fornece uma visão do todo, isso incentiva uma melhor cooperação e comunicação entre pessoas e equipes.
As pessoas que trabalham na empresa poderão ajustar melhor seus cronogramas e prazos, porque sabem exatamente o que as outras pessoas estão fazendo.
Por extensão, isso também serve como meio de controle e equilíbrio, no qual as ineficiências e gargalos ao longo do processo podem ser eliminados.

##### Prioridades e metas claras

O `Kanban` aprimora a capacidade de foco, pois, além do uso do `WIP limit`, o time tem uma visão ampla dos processos e do fluxo de trabalho, e a gerência fica mais capacitada para decidir o que de deve ser priorizado para atingir os objetivos e metas estabelecidas.

Agora que você entendeu para que serve o `Kanban` e os benefícios que esse método traz, veja este vídeo com uma demonstração prática de sua utilização:

<%= youtube_video "7JRB33f_M3k" %>

---

## Vamos fazer juntos!

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Recursos adicionais (opcional)

* [Os 12 princípios do Manifesto Ágil](https://www.youtube.com/watch?v=e4VYnCRU25E) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Qual a melhor maneira de aprender Métodos Ágeis?](https://www.youtube.com/watch?v=1WLnP5lpBPQ) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Visão geral sobre Scrum](https://www.desenvolvimentoagil.com.br/scrum/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [What is Kanban?](https://www.digite.com/kanban/what-is-kanban) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Como o kanban pode ser usado por uma equipe de marketing](https://blog.runrun.it/kanban-board-para-marketing/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [When Is Kanban Better Than Scrum?](https://medium.com/@mdalmijn/when-is-it-better-to-use-kanban-than-scrum-d5032b658ac3) {: .external-link target="_blank" rel="noreferrer noopener" }

* [A pretty good summary of Lean, Agile, Scrum](https://medium.com/@takeshi.yoshida/a-pretty-good-summary-of-lean-agile-scrum-168cf123748) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
