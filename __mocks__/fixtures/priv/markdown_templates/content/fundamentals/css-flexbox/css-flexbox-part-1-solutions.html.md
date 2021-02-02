## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

#### Trybe Tech-Gallery

#### Exercicio 1

Crie um cabeçalho para sua aplicação utilizando a tag header. Este cabeçalho deve possuir 3 elementos e estes devem ser posicionados utilizando Flexbox. O resultado deverá ser similar à estrutura da página "Trybe Tech-Gallery".

```language-HTML
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trybe Tech-Gallery</title>
     <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Ubuntu';
      }

      .header-container {
        align-items: center;
        background-color: #323333;
        display: flex;
        justify-content: space-around;
        width: 100%;
      }

      .header-img {
        width: 70px;
      }

      h1 {
        color: rgb(238, 238, 238);
        font-size: 1.3rem;
      }

      h3 {
        color: rgb(194, 194, 194);
        font-size: 1rem;
        text-decoration: underline;
      }

      h3:hover {
        color: #0fa36b;
      }

      .gallery-img {
        width: 150px;
      }

      .social-img {
        width: 25px;
        margin-left: 10px;
      }
    </style>
  </head>
  </head>
  <body>
    <header class="header-container">
      <img class="header-img" src="./images/trybe-logo.jpg" alt="Website logo" />
      <h1>TRYBE TECH-GALLERY</h1>
      <a href="https://www.betrybe.com/" target="_blank"><h3>SIGN-UP</h3></a>
    </header>
    <section>
      <p>Take a look at some of the technologies which you will learn in our fundamentals and front-end module!</p>
    </section>
    <section>
      <div>
        <h4>HTML</h4>
        <img class="gallery-img" src="./images/html-logo.png" alt="HTML logo" />
      </div>
      <div>
        <h4>CSS</h4>
        <img class="gallery-img css" src="./images/css-logo.png" alt="CSS logo" />
      </div>
      <div>
        <h4>JAVASCRIPT</h4>
        <img class="gallery-img" src="./images/javaScript-logo.png" alt="JavaScript logo" />
      </div>
      <div>
        <h4>REACT</h4>
        <img class="gallery-img" src="./images/react-logo.png" alt="React logo" />
      </div>
      <div>
        <h4>RTL</h4>
        <img class="gallery-img" src="./images/rtl-logo.png" alt="React Testing Library logo" />
      </div>
      <div>
        <h4>REDUX</h4>
        <img class="gallery-img" src="./images/redux-logo.png" alt="Redux logo" />
      </div>
      <hr />
    </section>
    <footer>
      <a href="https://www.instagram.com/betrybe/" target="_blank">
        <img class="social-img" src="./images/instagram-logo.png" alt="Instagram logo" />
      </a>
      <a href="https://www.linkedin.com/school/betrybe/" target="_blank">
        <img class="social-img" src="./images/linked-in-logo.png" alt="Instagram logo" />
      </a>
    </footer>
  </body>
</html>
```

#### Exercicio 2

Implemente o conteúdo da primeira section. Esta seção deverá conter no mínimo um elemento de texto. Utilizando Flexbox, faça o posicionamento de acordo com o exemplo abaixo.

```language-HTML
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trybe Tech-Gallery</title>
     <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Ubuntu';
      }

      .header-container {
        align-items: center;
        background-color: #323333;
        display: flex;
        justify-content: space-around;
        width: 100%;
      }

      .header-img {
        width: 70px;
      }

      h1 {
        color: rgb(238, 238, 238);
        font-size: 1.3rem;
      }

      h3 {
        color: rgb(194, 194, 194);
        font-size: 1rem;
        text-decoration: underline;
      }

      h3:hover {
        color: #0fa36b;
      }

      .text-section {
        display: flex;
        justify-content: center;
        margin-bottom: 12px;
        margin-top: 12px;
        width: 100%;
      }

      p {
        color: #232525;
        font-size: 1.5rem;
        text-align: center;
        width: 90%;
      }

      .gallery-img {
        width: 150px;
      }

      .social-img {
        width: 25px;
        margin-left: 10px;
      }
    </style>
  </head>
  </head>
  <body>
    <header class="header-container">
      <img class="header-img" src="./images/trybe-logo.jpg" alt="Website logo" />
      <h1>TRYBE TECH-GALLERY</h1>
      <a href="https://www.betrybe.com/" target="_blank"><h3>SIGN-UP</h3></a>
    </header>
    <section class="text-section">
      <p>Take a look at some of the technologies which you will learn in our fundamentals and front-end module!</p>
    </section>
    <section>
      <div>
        <h4>HTML</h4>
        <img class="gallery-img" src="./images/html-logo.png" alt="HTML logo" />
      </div>
      <div>
        <h4>CSS</h4>
        <img class="gallery-img css" src="./images/css-logo.png" alt="CSS logo" />
      </div>
      <div>
        <h4>JAVASCRIPT</h4>
        <img class="gallery-img" src="./images/javaScript-logo.png" alt="JavaScript logo" />
      </div>
      <div>
        <h4>REACT</h4>
        <img class="gallery-img" src="./images/react-logo.png" alt="React logo" />
      </div>
      <div>
        <h4>RTL</h4>
        <img class="gallery-img" src="./images/rtl-logo.png" alt="React Testing Library logo" />
      </div>
      <div>
        <h4>REDUX</h4>
        <img class="gallery-img" src="./images/redux-logo.png" alt="Redux logo" />
      </div>
      <hr />
    </section>
    <footer>
      <a href="https://www.instagram.com/betrybe/" target="_blank">
        <img class="social-img" src="./images/instagram-logo.png" alt="Instagram logo" />
      </a>
      <a href="https://www.linkedin.com/school/betrybe/" target="_blank">
        <img class="social-img" src="./images/linked-in-logo.png" alt="Instagram logo" />
      </a>
    </footer>
  </body>
</html>
```

#### Exercicio 3

Implemente o posicionamento da segunda section. Esta seção deverá conter no mínimo 6 imagens e um título para cada uma delas. Sinta-se livre para usar a imaginação e selecionar as imagens que preferir, só não esqueça de seguir a estrutura de posicionamento proposta. wink

```language-HTML
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trybe Tech-Gallery</title>
     <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Ubuntu';
      }

      .header-container {
        align-items: center;
        background-color: #323333;
        display: flex;
        justify-content: space-around;
        width: 100%;
      }

      .header-img {
        width: 70px;
      }

      h1 {
        color: rgb(238, 238, 238);
        font-size: 1.3rem;
      }

      h3 {
        color: rgb(194, 194, 194);
        font-size: 1rem;
        text-decoration: underline;
      }

      h3:hover {
        color: #0fa36b;
      }

      .text-section {
        display: flex;
        justify-content: center;
        margin-bottom: 12px;
        margin-top: 12px;
        width: 100%;
      }

      p {
        color: #232525;
        font-size: 1.5rem;
        text-align: center;
        width: 90%;
      }

      .gallery {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 10px auto 13px auto;
        width: 50%;
      }

      .gallery-card {
        align-items: center;
        background-color: rgb(241, 241, 241);
        border-radius: 15px;
        box-shadow: 2px 3px rgba(161, 161, 161, 0.5);
        display: flex;
        flex-direction: column;
        height: 220px;
        justify-content: center;
        margin: 0 10px 15px 0;
        width: 180px;
      }

      h4 {
        color: #5C687C;
        margin-bottom: 10px;
        margin-top: 10px;
      }

      .gallery-img {
        width: 150px;
      }

      hr {
        margin-top: 10px;
        width: 25%;
      }

      .social-img {
        width: 25px;
        margin-left: 10px;
      }
    </style>
  </head>
  </head>
  <body>
    <header class="header-container">
      <img class="header-img" src="./images/trybe-logo.jpg" alt="Website logo" />
      <h1>TRYBE TECH-GALLERY</h1>
      <a href="https://www.betrybe.com/" target="_blank"><h3>SIGN-UP</h3></a>
    </header>
    <section class="text-section">
      <p>Take a look at some of the technologies which you will learn in our fundamentals and front-end module!</p>
    </section>
    <section class="gallery">
      <div class="gallery-card">
        <h4>HTML</h4>
        <img class="gallery-img" src="./images/html-logo.png" alt="HTML logo" />
      </div>
      <div class="gallery-card">
        <h4>CSS</h4>
        <img class="gallery-img" src="./images/css-logo.png" alt="CSS logo" />
      </div>
      <div class="gallery-card">
        <h4>JAVASCRIPT</h4>
        <img class="gallery-img" src="./images/javaScript-logo.png" alt="JavaScript logo" />
      </div>
      <div class="gallery-card">
        <h4>REACT</h4>
        <img class="gallery-img" src="./images/react-logo.png" alt="React logo" />
      </div>
      <div class="gallery-card">
        <h4>RTL</h4>
        <img class="gallery-img" src="./images/rtl-logo.png" alt="React Testing Library logo" />
      </div>
      <div class="gallery-card">
        <h4>REDUX</h4>
        <img class="gallery-img" src="./images/redux-logo.png" alt="Redux logo" />
      </div>
      <hr />
    </section>
    <footer>
      <a href="https://www.instagram.com/betrybe/" target="_blank">
        <img class="social-img" src="./images/instagram-logo.png" alt="Instagram logo" />
      </a>
      <a href="https://www.linkedin.com/school/betrybe/" target="_blank">
        <img class="social-img" src="./images/linked-in-logo.png" alt="Instagram logo" />
      </a>
    </footer>
  </body>
</html>
```

#### Exercicio 4

Implemente o posicionamento da segunda section. Esta seção deverá conter no mínimo 6 imagens e um título para cada uma delas. Sinta-se livre para usar a imaginação e selecionar as imagens que preferir, só não esqueça de seguir a estrutura de posicionamento proposta.

```language-HTML
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trybe Tech-Gallery</title>
     <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Ubuntu';
      }

      .header-container {
        align-items: center;
        background-color: #323333;
        display: flex;
        justify-content: space-around;
        width: 100%;
      }

      .header-img {
        width: 70px;
      }

      h1 {
        color: rgb(238, 238, 238);
        font-size: 1.3rem;
      }

      h3 {
        color: rgb(194, 194, 194);
        font-size: 1rem;
        text-decoration: underline;
      }

      h3:hover {
        color: #0fa36b;
      }

      .text-section {
        display: flex;
        justify-content: center;
        margin-bottom: 12px;
        margin-top: 12px;
        width: 100%;
      }

      p {
        color: #232525;
        font-size: 1.5rem;
        text-align: center;
        width: 90%;
      }

      .gallery {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 10px auto 13px auto;
        width: 50%;
      }

      .gallery-card {
        align-items: center;
        background-color: rgb(241, 241, 241);
        border-radius: 15px;
        box-shadow: 2px 3px rgba(161, 161, 161, 0.5);
        display: flex;
        flex-direction: column;
        height: 220px;
        justify-content: center;
        margin: 0 10px 15px 0;
        width: 180px;
      }

      h4 {
        color: #5C687C;
        margin-bottom: 10px;
        margin-top: 10px;
      }

      .gallery-img {
        width: 150px;
      }

      hr {
        margin-top: 10px;
        width: 25%;
      }

      footer {
        align-items: center;
        display: flex;
        justify-content: center;
      }

      .social-img {
        width: 25px;
        margin-left: 10px;
      }
    </style>
  </head>
  </head>
  <body>
    <header class="header-container">
      <img class="header-img" src="./images/trybe-logo.jpg" alt="Website logo" />
      <h1>TRYBE TECH-GALLERY</h1>
      <a href="https://www.betrybe.com/" target="_blank"><h3>SIGN-UP</h3></a>
    </header>
    <section class="text-section">
      <p>Take a look at some of the technologies which you will learn in our fundamentals and front-end module!</p>
    </section>
    <section class="gallery">
      <div class="gallery-card">
        <h4>HTML</h4>
        <img class="gallery-img" src="./images/html-logo.png" alt="HTML logo" />
      </div>
      <div class="gallery-card">
        <h4>CSS</h4>
        <img class="gallery-img" src="./images/css-logo.png" alt="CSS logo" />
      </div>
      <div class="gallery-card">
        <h4>JAVASCRIPT</h4>
        <img class="gallery-img" src="./images/javaScript-logo.png" alt="JavaScript logo" />
      </div>
      <div class="gallery-card">
        <h4>REACT</h4>
        <img class="gallery-img" src="./images/react-logo.png" alt="React logo" />
      </div>
      <div class="gallery-card">
        <h4>RTL</h4>
        <img class="gallery-img" src="./images/rtl-logo.png" alt="React Testing Library logo" />
      </div>
      <div class="gallery-card">
        <h4>REDUX</h4>
        <img class="gallery-img" src="./images/redux-logo.png" alt="Redux logo" />
      </div>
      <hr />
    </section>
    <footer>
      <a href="https://www.instagram.com/betrybe/" target="_blank">
        <img class="social-img" src="./images/instagram-logo.png" alt="Instagram logo" />
      </a>
      <a href="https://www.linkedin.com/school/betrybe/" target="_blank">
        <img class="social-img" src="./images/linked-in-logo.png" alt="Instagram logo" />
      </a>
    </footer>
  </body>
</html>
```
