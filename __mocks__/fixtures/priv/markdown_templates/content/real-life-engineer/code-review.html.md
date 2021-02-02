## O que é?

Em desenvolvimento de software a preocupação com qualidade se traduz em vários indicadores como [uptime](https://br.godaddy.com/blog/o-que-e-uptime-e-por-que-ele-e-tao-importante-para-sua-hospedagem) {: .external-link target="_blank" rel="noreferrer noopener" } do site, cobertura de [testes automatizados](https://medium.com/@anne_caroline/principais-tipos-de-teste-de-software-4aeeb7fd23f1) {: .external-link target="_blank" rel="noreferrer noopener" }, porcentagem de usuários sem falha e também em valores que são a representação do quão simples, coeso e bom seu código é.

É possível que você crie um software que tenha um bom funcionamento para seu usuário, um bom uptime, alguma cobertura de testes automatizados, mesmo sem ter um código simples, coeso e bom.

É comum ~~_(cada dia menos, glória!)_~~ ver pessoas programadoras dizendo que a qualidade que importa é apenas a que chega até o usuário final. Esse discurso geralmente **morre** depois que essa mesma pessoa passa 20 dias analisando um código **monstruoso e mal feito** e percebe que a única solução é reescrevê-lo. Existem inumeros casos de fracasso em software justamente por conta dessa falta de preocupação com o dia de amanhã.

A Code Review _(revisão de código)_ é uma prática da engenharia de software que ajuda a garantir essa tal qualidade do código. Quando bem feito, reduz a chance de você ser a pessoa do paragrafo anterior 😉.

Vale ressaltar que a Code Review _(CR)_ tem o potencial de aumentar exponencialmente as habilidades de uma equipe, mas quando feita de forma errada elas podem criar animosidade, parecer inúteis e fazer o processo de abrir um Pull Request _(PR)_ ser estressante. Por isso é importante fazê-las corretamente.

---

## Por que isso é importante?

Bom, imaginamos que você quer ser uma pessoa que programa muito bem e para isso você precisa aprender a compartilhar conhecimento, escrever códigos que são legíveis e elogiáveis, ouvir críticas justas ao seu código, ouvir críticas injustas ao seu código e responder com a devida educação. A Code Review é uma ferramenta que pode te ajudar em todos os pontos listados acima. Entende a importância?

Ter um time que segue diretrizes de escrita de código, entende como as coisas funcionam e aprende constantemente com o trabalho do outro é algo extremamente importante. Isso fica mais claro ainda quando você percebe que empresas como [Microsoft](https://www.michaelagreiler.com/code-reviews-at-microsoft-how-to-code-review-at-a-large-software-company/) {: .external-link target="_blank" rel="noreferrer noopener" }, [Google](https://github.com/google/eng-practices/blob/master/review/reviewer/index.md) {: .external-link target="_blank" rel="noreferrer noopener" } e [Atlassian](https://www.atlassian.com/agile/software-development/code-reviews) {: .external-link target="_blank" rel="noreferrer noopener" } fazem e incentivam através de publicações a prática do Code Review. Fica fácil de perceber que praticar a Code Review te traz vantagens na hora de ir para o mercado, não é mesmo? :)

As duas principais vantagens que a Code Review traz são:

* Legibilidade do código;
  * Para que o restante do time entenda o seu código você vai precisar se preocupar com coisas como: nome na declaração de variáveis, nome das funções e outros pontos relativos ao *design* do seu código.

* Transmissão de conhecimento.
  * Realizar a Code Review de outras pessoas ou ter revisores olhando para o seu código é extremamente eficiente para o aprendizado, já que você passa a ter diferentes pontos de vista para o mesmo problema.

Apesar de incomum, durante o processo de Code Review também endereçamos coisas como descoberta de bugs, vulnerabilidades e outros problemas.

Em resumo, além de todos os benefícios para o projeto, empresa e para as futuras pessoas que forem trabalhar nele, praticar a Code Review vai te fazer crescer muito mais rápido como alguém que trabalha com desenvolvimento de software.

Você já aprendeu sobre a abertura de Pull Requests _(PR)_ no GitHub, e a forma mais comum de se realizar um *CR* é através da própria página do *PR*.

<%= figure(%{src: "/real-life-engineer/code-review/images/pr-description.png", caption: "Cabeçalho do Pull Request (PR)", class: "cr-screen"}) %>

<%= figure(%{src: "/real-life-engineer/code-review/images/pr-comment.png", caption: "Comentário durante a Code Review (CR)", class: "cr-screen"}) %>

---

## Como funciona no dia a dia do curso Trybe?

Code Reviews levam tempo. Lidar com elas é um investimento diário de horas.
A ideia no curso da Trybe é sempre realizarmos Code Reviews um dos outros para que essa prática fique muito fluída para todos vocês.

Estes _CR's_ vão ser realizados em todos os dias que houver projeto, onde vamos tentar avaliar o código do máximo de colegas com a intenção principal de aprender as diferentes formas de pensar.

### O que revisar?

1. O código foi escrito em acordo com o [guia de estilo](http://google.github.io/styleguide/) {: .external-link target="_blank" rel="noreferrer noopener" } do projeto? Se o seu projeto não tem um, acrescente-o. É muito fácil para alguém que desenvolve software aderir a ele, e faz seu código ficar muito mais bonito e fácil de ler.

2. Como está a cobertura de testes? Se o seu projeto tem [testes unitários](https://medium.com/@dayvsonlima/entenda-de-uma-vez-por-todas-o-que-s%C3%A3o-testes-unit%C3%A1rios-para-que-servem-e-como-faz%C3%AA-los-2a6f645bab3) {: .external-link target="_blank" rel="noreferrer noopener" } cobrindo ele ~~(E se ele não tem, pense no assunto... 😉)~~, como está a cobertura que o autor deu para a nova *feature*? Ela está em 100%? Você consegue pensar em casos de uso não cobertos nos testes? Se o *PR* é a correção de um bug, foi escrito um teste para garantir que o bug não ocorra nunca mais? Lembre-se: enumerar casos de testes é muito mais fácil do que escrutinar a lógica de um PR e achar erros "na mão"!

3. Tem um jeito mais simples de escrever isso? Aprimoramentos enormes são feitos de pequenas melhorias. Isso significa que deixar a leitura de pequenas partes do código mais fácil agrega muito valor a longo prazo.

4. Foi fácil entender esse trecho? Se não foi, há grande chance de haver uma forma melhor de escrever ou estruturar o código. Perguntar isso é essencial para que o código de seu projeto seja entendível por recém-chegados no longo prazo. E lembre-se: um desenvolvedor geralmente gasta muito mais tempo lendo código do que escrevendo-o!

5. Esse nome está bom? *"Existem duas coisas difíceis em Ciência da Computação: invalidar caches e nomear as coisas"* (Phil Karlton). Nunca subestime o poder de um bom nome. Um método bem nomeado é a diferença entre saber de cara o que ele faz e ter que ler sua definição para saber o que é aquilo. Um conjunto de variáveis bem nomeadas pode fazer comentários serem totalmente desnecessários no seu código, porque ele é muito fácil de ler! Pequenos aprimoramentos empilhados fazem enorme diferença!

---

## Do's and Don'ts

### Do's

1. Elogie quando houver algo que te chamou atenção e te deixou impressionado.
2. Aprenda: Code Reviews são excelentes oportunidades para você conhecer melhor outras partes da aplicação, ferramentas de linguagens que você não conhece, e todo tipo de truque para deixar seu código melhor.
3. Seja positivo ao fazer alguma sugestão.
4. Seja simples e direto _(com educação)_ ao comentar, mas sem omitir detalhes importantes.

### Don'ts

1. Não use um tom agressivo, seja educado e lembre-se que a ideia aqui é **COLABORAR** para melhorar a qualidade do trabalho e se aperfeiçoar como profissional.
2. Não ordene! Sempre use o tom de pergunta em algo que você deseja que tenha mudança.
3. Não faça o merge antes de todos os revisores a aprovarem.


## Recursos Adicionais (opcional)

Agora que você já conhece um pouco de Code Review, aqui vão alguns conteúdos para você ficar melhor ainda na arte do CR!

* [Repositório no Git com um monte de conteúdo sobre CR!](https://github.com/joho/awesome-code-review) {: .external-link target="_blank" rel="noreferrer noopener" }
