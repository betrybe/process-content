## O que vamos aprender?

O Redux é uma ferramenta extremamente importante na vida de uma pessoa desenvolvedora front-end. Ainda que demande mais tempo para sua abstração, praticar é a melhor forma de aprender Redux. Hoje você irá aplicar o Redux em diversos cenários.
Por ser de entendimento mais complexo, trabalharemos hoje em Pair Programming (a facilitação dará mais instruções) para que todos possam compartilhar conhecimento e ganharmos eficiência. A idéia é fazer o máximo possível dos exercícios, para ganhar mais familiaridade com o Redux.

<%= vimeo "472166372" %>

---

### Você será capaz de:

- Utilizar o Redux em suas aplicações;

---

## Por que isso é importante?

O Redux, como visto anteriormente, é composto por várias ferramentas. Essas ferramentas demandam tempo e prática para serem entendidas e absorvidas. Além disso, compartilhar conhecimento agrega **muito** ao aprendizado!

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Array: eu atualizo ou faço uma cópia?

<%= vimeo "472196229" %>

Para utilizar o **Redux** com mais tranquilidade, devemos sempre nos lembrar de que o `state` é **imutável**. Isso significa que só podemos usar métodos que façam _clonagem_ e não podemos usar métodos que façam _mutação_. Mas vá com calma, esse é um conceito um pouco mais abstrato e poderá levar um tempo para que você o domine, mas dominar esse conceito vai lhe dar muito mais segurança na hora de manipular a `store`.

No _JavaScript_ há vários _métodos_ para trabalhar com arrays. Podemos dividi-los entre os métodos que, ao realizar a sua função, **não** criam um novo array, ou seja, causam _mutação_ no array já existente, e os que criam um novo array, sem alterar o array antigo, ou seja, fazem _clonagem_.

Sabendo disso, e tendo a regra clara de que a `Store` deve ser imutável, só podemos trabalhar com métodos que façam _clonagem_ e nunca com os métodos que fazem _mutação_. Em resumo, a _mutação_ atualiza um valor já existente na memória e a _clonagem_ cria um novo valor separado, mantendo o antigo intacto.

Agora, vamos a um exemplo prático do que é mutação:

```language-javascript
const itemPrimario = [1, 2, 3, 4, 5];
let mutacaoTeste = itemPrimario;
mutacaoTeste.push(6);
console.log(mutacaoTeste); // [1, 2, 3, 4, 5, 6]
console.log(itemPrimario); // [1, 2, 3, 4, 5, 6]
```

  * Ao passar o valor da _const_ `itemPrimario` para a _const_ `mutacaoTeste`, você está apenas dando a variável `mutacaoTeste` o apontador para o local em memória onde o valor de `itemPrimario` está localizado. Logo, você tem o mesmo valor apontado por pelas duas variáveis.

  * Ao utilizar o `push` para colocar o valor **6**, como o _método_ não faz _clonagem_, e sim _mutação_, ele alterou diretamente o local em memória que o valor estava guardado e, por isso, o valor das duas variáveis foi alterado. Isso **não é permitido** no _Redux_.

  * Exatamente pelo fato do endereço em memória ser alterado diretamente, não tivemos a necessidade de passar o valor para a variável `mutacaoTeste` novamente, já que o endereço em memória permanece o mesmo.

Agora um exemplo de cópia, num primeiro momento essa resposta **parece** errada, então rode esse código linha a linha e veja o que acontece por si mesmo:

```language-javascript
const itemPrimario = [1, 2, 3, 4, 5];
let clonagemTeste = itemPrimario;
clonagemTeste.concat(6);
console.log(clonagemTeste); // [1, 2, 3, 4, 5]
console.log(itemPrimario); // [1, 2, 3, 4, 5]
```

  * Aqui estamos utilizando o método `concat` porque esse método faz _clonagem_. Isto é, ele cria um novo array com os valores atualizados **MAS NÃO** atualiza a variável `clonagemTeste` para que ela _aponte_ para esse novo array. Logo, a variável `clonagemTeste` ainda aponta para o array antigo! Sem uma reatribuição, o endereço atribuído a `clonagemTeste` é o do valor antigo e por isso seu array não foi alterado. Ficou claro? A _mutação_ altera o valor para onde as duas variáveis apontam e a _clonagem_ cria um novo valor e mantém o antigo intacto.

  * Refaça o código com a reatribuição agora, e veja que `itemPrimario` vai manter seu valor antigo e `clonagemTeste` irá ter o valor novo.

  * Talvez você não tenha se dado conta até agora, mas pense em todas as vezes que você precisou utilizar um `push`, um `splice`, um `sort()`... Esses métodos tem algo em comum, você não precisou reatribuir a variável com o novo valor depois, não é mesmo? Isso acontece porque esses valores fazem _mutação_. Já métodos como o `concat`, o `slice`, um `filter()`... Esses métodos todos precisam que a variável seja reatribuída, certo? Porque eles fazem _clonagem_ e por conta disso, o novo valor deve ser atribuído, do contrário a variável ainda vai acessar o valor antigo.

  * Sempre que estiver na dúvida se pode ou não utilizar um método faça esse teste, ou pesquise sobre o método e veja se ele faz _mutação_ ou _clonagem_. Para ajudar nessa tarefa, [veja esse site](https://doesitmutate.xyz/) {: .external-link target="_blank" rel="noreferrer noopener" } que mantém uma lista dos métodos que fazem _mutação_ e dos que não fazem.

Temos esse conteúdo no começo de um dia mais voltado para exercícios, porque ele é importante para evitar algumas armadilhas na hora de criar nosso `state`. Os próximos exercícios vão necessitar que o conceito seja bem compreendido para serem resolvidos com tranquilidade.

Mais uma vez, esse conteúdo é um pouco mais abstrato, então fique tranquilo caso você tenha dificuldades de entendimento, conforme você for fazendo exercícios, isso vai ficando mais claro.

Durante o dia, pense sobre quando vale a pena utilizar o Redux, pois embora seja obrigatório para efeitos de aprendizado usar Redux em todos os exercícios de hoje, vale sempre a reflexão sobre quando é interessante utilizar e quando pode ser melhor utilizar alguma outra tecnologia para controle de estado;

### Agora, faça o seguinte exercício em Pair Programming:

Refatore o formulário criado nos exercícios [desse dia](/front-end/react/forms/) utilizando Redux.

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Vamos para o Slack onde estará disponível o link da nossa aula ao vivo de hoje.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática, novamente juntos, tentem trocar de posição, quem pilotava, agora observa e vice-versa:

1. Você irá criar um sistema de cadastro de clientes. Esse sistema deve ser composto por 4 páginas.
    * A primeira página deve ser a **Home**. Ela deverá ter um Link que possibilite ao usuário navegar para a página de login.
    * A segunda página será a de **Login**. Devem existir 2 campos para pegar os dados do usuário (email e senha). Após o login ser efetuado, o usuário deve ser redirecionado para a página de **Clientes cadastrados**.
    * Caso o login não seja feito, ou seja, o usuário tenha mudado à mão o link do sistema e ido para a página de cadastro ou de clientes, a única mensagem exibida deve ser: "Login não efetuado".
    * A página de **Clientes cadastrados** deverá listar todos os clientes. Caso não haja cliente, a mensagem "Nenhum cliente cadastrado" deve aparecer na tela, juntamente com um botão para ir à pagina de cadastro. Esse botão deve permanecer na tela mesmo caso hajam clientes.
    * A página de cadastro deve conter 3 inputs, para pegar 3 dados do cliente: nome, idade e email. Um botão deve gerar o cadastro. Deve haver também na página um botão que leve o usuário para a página de **Clientes cadastrados**.
    * Estados que não necessitem navegar para outros componentes, podem ser guardados internamente. Todos os outros devem ser trafegados via Redux.

**Bônus**

Você irá implementar funcionalidades ao código do cadastro de clientes.

* Na página de Clientes cadastrados, crie um botão que ordene os clientes em ordem alfabética a partir do campo _nome_. Caso o botão seja clicado novamente, a ordenação original deve ser mostrada.
* Cada cadastro deve ser acompanhado de um botão com o texto _X_. Caso o botão seja clicado, o cadastro deve ser excluído.

---

## Recursos adicionais (opcional)

* [Métodos de Array - Mutação vs Clonagem](https://lorenstewart.me/2017/01/22/javascript-array-methods-mutating-vs-non-mutating/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
