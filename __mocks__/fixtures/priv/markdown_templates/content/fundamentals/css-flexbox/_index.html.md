## O que vamos aprender?

Você vai aprender sobre **CSS Flexbox**.

Desenvolver páginas web responsivas é uma tarefa muito importante, pois as pessoas acessam a Internet atráves de vários dispositivos com telas de diferentes tamanhos.

Uma das abordagens para criar páginas responsivas é dividir a página em segmentos lógicos, usando cálculos baseados em porcentagem e, em seguida, ajustando os elementos para caberem nesse espaço definido.

Infelizmente, a prática não é tão simples quanto descrito acima.
Isso acontece porque os elementos não se assentam por padrão, próximos um do outro, como gostaríamos - pelo menos não os que têm a propriedade `display` configurada para ser `block`.
Um outro problema comum é, depois de tudo configurado, a adição de margens e definição da propriedade `float` voltar a desconfigurar toda a estrutura inicialmente proposta.

Como descrito acima, criar páginas responsivas utilizando *float* e posicionamento é um trabalho complicado.

Para tornar esse trabalho mais fácil, você irá aprender a utilizar o **CSS Flexbox**, que é um módulo de layout que torna fácil o desenvolvimento de estruturas responsivas.

Para isso, dividimos o conteúdo em duas partes:

1. Primeiro você aprenderá sobre as propriedades **flex-direction**, **flex-wrap**, **flex-flow**, **reverse**, **justify-content**, **align-items** e **align-content**. Todas essas propriedades serão aplicadas em *containers*.

  * [_CSS Flexbox_ - parte I](/fundamentals/css-flexbox/css-flexbox-part-1)

2. Agora, aprenderá sobre as propriedades **align-self**, **order**, **flex-grow**, **flex-shrink** e **flex-basis**. Também veremos como podemos trabalhar com **margins** no **Flexbox**. Essas propriedades serão aplicadas em *items*.

  * [_CSS Flexbox_ - parte II](/fundamentals/css-flexbox/css-flexbox-part-2)

---

## Vamos começar!

<%= next_button(@conn) %>
