## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

---

### `index.html`

```language-html
<html>
  <head>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
  </head>
  <body>
    <img id="deck" class="card" src="cartas/verso-da-carta.png">
    <div id="grid"></div>
  </body>
</html>
```

### `style.css`

```language-css
.card {
  width: 100px;
  height: auto;
  margin: 20px;
}

#grid {
  display: flex;
  flex-wrap: wrap;
  width: 1000px;
  justify-content:
}

.flip:hover {
  transform: rotate(720deg);
  transition: transform 2s;
}

@keyframes jump {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}

.jump:hover {
  animation-name: jump;
  animation-duration: 3s;
}
```

### `script.js`

```language-javascript
window.onload = function() {
  document.querySelector('#deck').addEventListener('click', drawCard)
}

function getRandomCard() {
  const imagePaths = [
    "cartas/seis-de-copas.png",
    "cartas/tres-de-ouros.png",
    "cartas/quatro-de-paus.png",
    "cartas/sete-de-paus.png",
    "cartas/nove-de-espadas.png",
    "cartas/sete-de-espadas.png",
    "cartas/cinco-de-ouros.png",
  ]

  const numberOfCardImages = imagePaths.length
  const randomImageIndex = Math.floor(Math.random() * numberOfCardImages)

  return imagePaths[randomImageIndex]
}

function getRandomAnimation() {
  const numberOfAnimations = 2
  const randomAnimationIndex = Math.floor(Math.random() * numberOfAnimations)

  const animations = ['flip', 'jump']

  return animations[randomAnimationIndex]
}


function drawCard() {
  let card = document.createElement('img')
  card.src = getRandomCard()
  card.classList.add('card')
  card.classList.add(getRandomAnimation())

  document.querySelector('#grid').appendChild(card)
}
```
