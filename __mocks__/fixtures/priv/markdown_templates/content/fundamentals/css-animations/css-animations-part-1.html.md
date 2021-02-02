## O que vamos aprender?

As animações são parte fundamental de tudo o que vemos na web. Se a palavra que define o papel de JavaScript é "interativo", a palavra que define as animações é "movimento".

Sejam:

* Uma barra de progresso;

* Uma roda de loading;

* Um card de um site que desliza para o canto;

* Uma tooltip que aparece ao passar o mouse sobre um elemento.

Em todos os casos, estamos falando de animações. Elas entram nas interfaces gráficas para dar dinamismo à página e para tornar a sua interação com o usuário melhor e mais intuitiva. ***CSS Animations*** são uma forma rápida de se fazer animações leves e funcionais para páginas web. Este será o conteúdo das próximas duas aulas.

---

### Você será capaz de:

  * Utilizar Keyframes para montar animações;

  * Utilizar as ***animation-properties*** para definir quando e como as animações acontecerão, incluindo as seguintes propriedades:
    * animation-name;
    * animation-duration;
    * animation-timing-function;
    * animation-delay;
    * animation-iteration-count;
    * animation-direction;
    * animation-fill-mode;
    * animation-play-state.

---

## Por que isso é importante?

Animações são parte fundamental de qualquer interface web moderna. Saber fazer animações com ***CSS*** dá a quem desenvolve o poder de trazer às páginas todo o dinamismo e intuitividade desejadas sem peso na performance da máquina ou do navegador.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

As ***CSS Animations***, em seu aspecto mais importante, são definidas dizendo-se **como** as animações serão executadas e **quando e de que forma** isso acontecerá. O "roteiro" da animação, por assim dizer, é definido pelo programador utilizando ***Keyframes***. O "quando e de que forma" ela acontecerá é definido pelas ***Propriedades de Animação***.

_Como assim?_

Se eu definir, por exemplo, que um círculo da minha página vai subir e descer, os ***Keyframes*** vão dizer onde o círculo começa seu percurso e onde ele termina.

As ***propriedades da animação*** vão associá-la a esse objeto e vão dizer se ela começa ao carregar a página, após o mouse do usuário passar ou clicar no elemento, se a animação é veloz ou lenta, se vai numa direção ou na direção reversa, entre outras coisas.

Ainda não ficou claro? Não se preocupe! Vamos ver tudo isso em detalhes agora.

Primeiramente, leia [este artigo](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Animations/Usando_anima%C3%A7%C3%B5es_CSS) {: .external-link target="_blank" rel="noreferrer noopener" }. Leia do início até a seção **Fazendo a animação se mover para trás e para frente**, inclusive. Faça todos os exemplos na sua própria máquina!

---

### Keyframes

Vamos fazer alguns exercícios de fixação para exercitar esses conceitos?

1. Crie uma página web. Escreva um texto qualquer num parágrafo dela.
2. Faça com que esse texto desapareça utilizando a propriedade `opacity`.
3. Crie uma animação que faça com que, ao longo de três segundos, a palavra vá de apagada a totalmente visível. Lembre-se que, para isso, você vai precisar definir no ***CSS*** do seu elemento a propriedade *animation*.
4. Escreva uma palavra em outro parágrafo.
5. Faça essa palavra ir do lado esquerdo do parágrafo ao lado direito em cinco segundos.
6. Altere a primeira animação para que, além de surgir, o texto cresça em tamanho de fonte.
7. Agora adicione a essa mesma animação uma etapa intermediária: faça com que o texto aumente de tamanho aos 60% da animação e, de lá aos 100%, ele diminua. Observe o efeito criado.
8. Dá pra incrementar mais! Escolha uma cor para o seu texto e comece a animação com ele nessa cor.
9. Coloque no final da animação outra cor. Veja o resultado.

### Propriedades de Animação

Leia agora, com atenção, [este texto](https://thoughtbot.com/blog/css-animation-for-beginners) {: .external-link target="_blank" rel="noreferrer noopener" } para ver mais detalhes acerca das ***Propriedades de Animação***. A seguir vamos praticar um pouco com cada uma delas.

#### animation-name

* Você já deu a cada uma de suas duas animações um nome único, certo? Crie um terceiro elemento, um botão, e associe a ele uma de suas animações.

#### animation-duration

* Mude o tempo que a animação demora para executar.

#### animation-delay

* Faça com que a animação de fazer a palavra se mover só aconteça dez segundos após a página carregar.

#### animation-iteration-count

* Faça a animação do botão repetir três vezes em sequência.

#### animation-direction

* Faça o texto que se move ir para a direita e voltar para a esquerda, no caminho reverso.
* Faça ele repetir esse movimento indefinidamente.

#### animation-fill-mode

* Faça com que o botão retenha as características do começo da animação e as características do final da animação após ela acabar.

#### animation-play-state

* Faça a palavra que se move *parar* quando se coloca o mouse sobre ela. Para isso, você vai ter que definir uma classe com a pseudoclasse *hover*,

#### animation-timing-function

* Faça o texto começar o movimento a partir da borda rápido e ficar devagar no final.
* Inverta isso: agora ele começa lento e acelera ao chegar perto da borda.


---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Você já está craque em fazer animações? Que tal fazermos algumas juntos para você se inspirar ainda mais! 👨🏼‍🦰

Então, vamos fazer juntos?

Aula ao vivo! Vamos para o Slack onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

Primeiramente faça os exercícios de 1 a 6 deste [link](https://www.w3schools.com/css/exercise.asp?filename=exercise_css3_animations1) {: .external-link target="_blank" rel="noreferrer noopener" }

Para os exercícios a seguir, copie o arquivo HTML abaixo e utilize-o como base.

```language-html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Exercícios 7.3</title>
  <style>
    * {
      box-sizing: border-box;
    }

    section {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 90%;
      height: 100px;
      border: 1px solid red;
      margin-bottom: 10px;
      padding: 5px;
    }
    .flex-direction__column { flex-direction: column; }
    .justify-content__space-between { justify-content: space-between; }
    .justify-content__center { justify-content: center; }
    .align-items__flex-start { align-items: flex-start; }
    .automatic-box-height { height: auto; }
    .ball { border-radius: 100%; }
    .green { background-color: green; }
    .blue { background-color: blue; }
    .red { background-color: red; }
    .yellow { background-color: yellow; }
    .black { background-color: black; }
    .medium {
      width: 50px;
      height: 50px;
    }
  </style>
</head>
<body>
  <ol>
    <li>
      <section>
        <div id="exercise-1" class="ball green medium"></div>
      </section>
    </li>
    <li>
      <section>
        <div id="exercise-2" class="ball green medium"></div>
      </section>
    </li>
    <li>
      <section>
        <div id="exercise-3" class="ball green medium"></div>
      </section>
    </li>
    <li>
      <section>
        <div id="exercise-4" class="ball green medium"></div>
      </section>
    </li>
    <li>
      <section id="section-5">
        <div id="exercise-5" class="ball green medium"></div>
      </section>
    </li>
    <li>
      <section class="justify-content__space-between">
        <div id="exercise-6-square" class="blue medium"></div>
        <div id="exercise-6" class="ball green medium"></div>
      </section>
    </li>
    <li>
      <section class="justify-content__center">
        <div id="exercise-7" class="blue medium"></div>
      </section>
    </li>
    <li>
      <section class="justify-content__center">
        <div id="exercise-8" class="red medium"></div>
      </section>
    </li>
    <li>
      <section class="justify-content__center">
        <div id="exercise-9" class="red medium"></div>
      </section>
    </li>
    <li>
      <section class="justify-content__center">
        <div id="exercise-10" class="red medium"></div>
      </section>
    </li>
      <li>
        <section class="flex-direction__column align-items__flex-start automatic-box-height">
          <div id="exercise-11_1" class="red medium"></div>
          <div id="exercise-11_2" class="blue medium"></div>
          <div id="exercise-11_3" class="green medium"></div>
          <div id="exercise-11_4" class="yellow medium"></div>
          <div id="exercise-11_5" class="black medium"></div>
        </section>
      </li>
      <li>
        <section class="justify-content__center">
          <div id="exercise-12" class="black medium"></div>
        </section>
      </li>
  </ol>
</body>
</html>
```

O arquivo acima que você copiou possui 12 retângulos com bordas vermelhas que correspondem aos 10 exercícios abaixo, ou seja, cada exercício deve ser feito em seu espaço designado.

1. Após 1 segundo do carregamento da página, faça a bola verde ir da borda esquerda para a borda direita ao longo de 3 segundos.

2. Após 2 segundos do carregamento da página, faça a bola verde ir da borda esquerda para a borda direita ao longo de 2 segundos. Ao final da animação, a bola deve permanecer na borda direita. Utilize o keyframe criado para o exercício número 1 para esse exercício também, ou seja, ambos os exercícios compartilharão o keyframe.

3. Após 1 segundo do carregamento da página, faça a bola verde ir da borda esquerda para a borda direita e voltar ao longo de 1 segundo por trecho. Utilize o keyframe criado para o exercício número 1 para esse exercício também, ou seja, ambos os exercícios compartilharão o keyframe.

4. Faça a bola verde ir da borda esquerda para a borda direita enquanto o mouse estiver em cima dela. A duração do evento deve ser de 5 segundos.

5. Faça a bola verde ir da borda esquerda para a borda direita enquanto o mouse estiver dentro do elemento `<section>` do exercício. A duração do evento deve ser de 5 segundos.

6. Faça a bola verde ir da direita para a esquerda enquanto o mouse estiver dentro do elemento `<div id="exercise-6-square">`. A duração do evento deve ser de 5 segundos.

7. Faça o quadrado azul aumentar a largura até o tamanho do box do exercício e voltar ao tamanho original infinitas vezes com o tempo de 10 segundos de duração.

8. Altere a cor do quadrado vermelho para amarelo em um tempo de 4 segundos de duração.

9. Altere a cor do quadrado vermelho para amarelo, azul e verde em um tempo de 4 segundos de duração por infinitas vezes. Faça a alteração das cores na ordem inversa também.

10. Combine as animações número `7` e número `9` no quadrado vermelho.

11. Neste exercício, você possui 5 quadrados (vermelho, azul, verde, amarelo e preto). Todos eles devem se mover da borda esquerda para a direita ao longo de 3 segundos. Esta animação deve iniciar depois de 2 segundos do carregamento da página e deve durar infinitamente. Você deve alterar a velocidade dos quadrados conforme a seguinte regra:
  - O quadrado vermelho deve ter uma velocidade linear (constante);
  - O quadrado azul deve iniciar o movimento de forma lenta, depois acelerar e finalizar de forma lenta;
  - O quadrado verde deve iniciar o movimento de forma lenta;
  - O quadrado amarelo deve finalizar o movimento de forma lenta;
  - O quadrado preto deve iniciar e finalizar o movimento de forma lenta;

12. Ao ser clicado (e o click ser mantido pressionado) faça o quadrado preto desaparecer ao longo de 1 segundo. Depois de desaparecer completamente, ele não deve mais reaparecer.

#### Bônus

Altere as formas geométricas presentes na página por imagens como por exemplo, carros, nuvens, sol ou algo que você goste.

---

## Recursos adicionais (opcional)

* [Mozilla - Usando animações ***CSS***](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Animations/Usando_anima%C3%A7%C3%B5es_CSS) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial: Make a Bouncing Ball Entirely with ***CSS***](https://codeburst.io/tutorial-make-a-bouncing-ball-entirely-with-css-1e7e3c853a50) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

No próximo passo, você irá aprender como fazer transformações e transições nas suas animações com ***CSS***.

<%= next_button(@conn) %>
