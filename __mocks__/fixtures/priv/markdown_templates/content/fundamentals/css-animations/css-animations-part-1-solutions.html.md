## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

---

* `index.html`

```language-html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
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

    @keyframes travel-left-to-right {
      from { margin-left: 0%; }
      to { margin-left: 96%; }
    }

    @keyframes travel-right-to-left {
      from { margin-right: 0%; }
      to { margin-right: 96%; }
    }

    @keyframes increase-width {
      from { width: 50px; }
      to { width: 100%; }
    }

    @keyframes change-red-to-yellow {
      from { background-color: red; }
      to { background-color: yellow; }
    }

    @keyframes change-red-yellow-blue-green {
      0% { background-color: red; }
      33% { background-color: yellow; }
      66% { background-color: blue; }
      100% { background-color: green; }
    }

    @keyframes change-color-and-move {
      0% { background-color: red; }
      25% {
        background-color: yellow;
        margin-top: 240px;
      }
      50% {
        background-color: red;
        margin-top: 240px;
      }
      75% { background-color: blue; }
      100% { background-color: red; }
    }

    @keyframes hidden {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    #exercise-1 {
      animation-name: travel-left-to-right;
      animation-duration: 3s;
      animation-delay: 1s;
    }

    #exercise-2 {
      animation-name: travel-left-to-right;
      animation-duration: 2s;
      animation-delay: 2s;
      animation-fill-mode: forwards;
    }

    #exercise-3 {
      animation-name: travel-left-to-right;
      animation-duration: 1s;
      animation-delay: 1s;
      animation-direction: alternate;
      animation-iteration-count: 2;
    }

    #exercise-4 {
      animation-name: travel-left-to-right;
      animation-duration: 5s;
      animation-play-state: paused;
    }
    #exercise-4:hover {
      animation-play-state: running;
    }

    #exercise-5 {
      animation-name: travel-left-to-right;
      animation-duration: 5s;
      animation-play-state: paused;
    }
    #section-5:hover #exercise-5 {
      animation-play-state: running;
    }

    #exercise-6 {
      animation-name: travel-right-to-left;
      animation-duration: 5s;
      animation-play-state: paused;
    }
    #exercise-6-square:hover + #exercise-6 {
      animation-play-state: running;
    }

    #exercise-7 {
      animation-name: increase-width;
      animation-duration: 10s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }

    #exercise-8 {
      animation-name: change-red-to-yellow;
      animation-duration: 4s;
      animation-fill-mode: forwards;
    }

    #exercise-9 {
      animation-name: change-red-yellow-blue-green;
      animation-duration: 4s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }

    #exercise-10 {
      animation-name: change-red-yellow-blue-green, increase-width;
      animation-duration: 4s, 10s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }

    #exercise-11_1 {
      animation-name: travel-left-to-right;
      animation-duration: 3s;
      animation-delay: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }

    #exercise-11_2 {
      animation-name: travel-left-to-right;
      animation-duration: 3s;
      animation-delay: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: ease;
    }

    #exercise-11_3 {
      animation-name: travel-left-to-right;
      animation-duration: 3s;
      animation-delay: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in;
    }

    #exercise-11_4 {
      animation-name: travel-left-to-right;
      animation-duration: 3s;
      animation-delay: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-out;
    }

    #exercise-11_5 {
      animation-name: travel-left-to-right;
      animation-duration: 3s;
      animation-delay: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }

    #exercise-12 {
      animation-name: hidden;
      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-play-state: paused;
    }

    #exercise-12:active {
      animation-play-state: running;
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
