## Gabarito dos exercícios

A seguir, encontra-se uma sugestão de solução para o exercício proposto:

Primeiramente, inicialize um projeto React com o `create-react-app` e instale o `express`. Será necessário também instalar o pacote `cors`, para permitir que a API aceite requisições de outros domínios (no caso, a aplicação SSR).

```language-bash
yarn create next-app
cd ssr-exercise
npm install express cors
```

**Nota**: Se você preferir, pode utilizar `npm init next-app` ao invés de utilizar `yarn create next-app`.

Crie a API em `Express` que retornará as imagens. Nessa solução, usaremos as imagens disponíveis [aqui.](../images.zip) {: .external-link target="_blank" rel="noreferrer noopener" } Coloque as imagens extraídas na pasta `server/images` e crie o arquivo que implementa a API em `server/api.js`. Os dados da API, nessa solução, serão uma variável *hardcoded* no código, mas poderiam ser lidos, também, de um arquivo `JSON`.

```language-javascript
const express = require('express');
const cors = require('cors');
const app = express();

const getRandomNumberBetween = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

app.use(cors());

app.use(express.static('images'));

const responseMock = [
  {
    id: 'ba3ebadf-db38-4f94-9f61-adfc2e9827b9',
    path: '/img-1.jpg',
    photographer: 'Lian Von Ah',
    title: 'A winter sunshine in Amsterdam',
    category: 'Nature',
    created_at: '2016-05-03T11:00:28-04:00',
  },
  {
    id: '0daf2d18-4624-4fd0-8004-633d115a8ec9',
    path: '/img-2.jpg',
    photographer: 'Alex Jones',
    title: 'NYC',
    category: 'City',
    created_at: '2016-05-03T11:00:28-04:00',
  },
  {
    id: '680637a6-7c1d-4992-96af-952a278eae23',
    path: '/img-3.jpg',
    photographer: 'Arthur Ferreira Neto',
    title: 'Amazon as is',
    category: 'Nature',
    created_at: '2019-12-03T11:00:23-00:00',
  },
  {
    id: 'de0f8bbb-1d30-475d-85f6-706808092597',
    path: '/img-4.jpg',
    photographer: 'Fernando Alcan',
    title: 'A nice landscape',
    category: 'Nature',
    created_at: '2019-12-03T12:00:23-00:00',
  },
  {
    id: 'd93c63d7-408d-48cb-890d-db2353b2002a',
    path: '/img-5.jpg',
    photographer: 'Felix Mayer',
    title: 'Untitled',
    category: 'Portrait',
    created_at: '2020-01-03T11:00:23-00:00',
  },
  {
    id: '30dcb28c-0194-47f8-b26d-2969e7a9bff1',
    path: '/img-6.jpg',
    photographer: 'Andrey Stan Jones',
    title: 'UK for us',
    category: 'City',
    created_at: '2019-12-04T11:00:23-00:00',
  },
  {
    id: '21109cf3-3c88-4b69-9048-f90f7f10b698',
    path: '/img-7.jpg',
    photographer: 'Carla Miran',
    title: 'Greek sun',
    category: 'Animals',
    created_at: '2001-12-03T11:00:23-00:00',
  },
  {
    id: 'bba2204b-09a4-45df-b9a0-3247409b8e69',
    path: '/img-8.jpg',
    photographer: 'Ana Lisa Wandersen',
    title: 'Follow the river down',
    category: 'Nature',
    created_at: '2019-12-03T11:00:23-00:00',
  },
  {
    id: 'b8bb5ba2-d555-4a07-b504-47fbd0bad2b4',
    path: '/img-9.jpg',
    photographer: 'Alex Nelson',
    title: 'Amazon as is 2',
    category: 'Cars',
    created_at: '2019-12-03T11:00:23-00:00',
  },
  {
    id: '456b4b53-8127-4758-9a11-37dcb909148e',
    path: '/img-10.jpg',
    photographer: 'Nova Supra',
    category: 'Universe',
    title: 'Universe in a nutshell',
    created_at: '2019-09-01T11:00:01-30:00',
  },
];

app.get('/images', (req, res) => {
  res.send(responseMock);
});

app.get('/image/:id', (req, res) => {
  const { id } = req.params;
  const imageInfo = responseMock.filter((image) => image.id === id);
  res.send(imageInfo);
});

app.get('/images/:category', (req, res) => {
  const { category } = req.params;
  const imageInfo = responseMock.filter(
    (image) => image.category.toLowerCase() === category.toLowerCase()
  );
  res.send(imageInfo);
});

app.use((req, res, next) => {
  res.status(404);
  res.send({ message: 'Imagem não encontrada' });
});

app.listen(3001, () => {
  console.log('Ouvindo a porta 3001!');
});
```

Inicie a API:

```language-bash
node server/api.js
```

**Nota**: O caminho passado para o método `express.static` é relativo ao diretório de onde a API será inicializada. No caso, a API está sendo executada a partir da raiz do projeto. Logo, é necessário especificar o caminho completo da pasta `images`, a partir da raiz (`server/images`).

Teste se os dois endpoints da API estão funcionando corretamente. Teste, também, se os arquivos estáticos estão sendo servidos corretamente digitando alguns endereços no seu browser:

**endpoints**:

- http://localhost:3001/images

- http://localhost:3001/image/ba3ebadf-db38-4f94-9f61-adfc2e9827b9

**arquivos estáticos**:

- http://localhost:3001/imagem-que-nao-existe

- http://localhost:3001/img-1.jpg

- http://localhost:3001/img-2.jpg

Agora, crie a aplicação SSR que consultará essa API.

> pages/index.js

```language-jsx
import useSWR from 'swr';
import fetch from 'unfetch';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((r) => r.json());

const IndexPage = () => {
  const router = useRouter();
  const { data, error } = useSWR('http://localhost:3001/images', fetcher);
  const goToDetails = (id) => {
    router.push(`image/${id}`);
  };
  return (
    <div>
      {data &&
        data.map((img) => {
          return (
            <div key={img.id}>
              <img
                src={`http://localhost:3001/${img.path}`}
                onClick={() => goToDetails(img.id)}
              />
              <span>{img.title}</span>
            </div>
          );
        })}
    </div>
  );
};

export default IndexPage;
```

> pages/image/[id].js

```language-jsx
import useSWR from 'swr';
import { useRouter } from 'next/router';
import fetch from 'unfetch';

const fetcher = (url) => fetch(url).then((r) => r.json());
const IdPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`http://localhost:3001/image/${id}`, fetcher);
  const imageData = data ? data[0] : {};

  const goToCategoryFilter = (category) => {
    router.push(`/category/${category.toLowerCase()}`);
  };

  return (
    <div>
      {imageData && (
        <div>
          <img src={`http://localhost:3001${imageData.path}`} />
          <span>{imageData.title}</span>
          <span>{imageData.photographer}</span>
          <button onClick={() => goToCategoryFilter(imageData.category)}>
            {imageData.category}
          </button>
        </div>
      )}
    </div>
  );
};

export default IdPage;
```

> pages/category/[category].js

```language-jsx
import useSWR from 'swr';
import fetch from 'unfetch';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((r) => r.json());

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const { data, error } = useSWR(
    `http://localhost:3001/images/${category}`,
    fetcher
  );
  const goToDetails = (id) => {
    router.push(`image/${id}`);
  };
  return (
    <div>
      {data &&
        data.map((img) => {
          return (
            <div key={img.id}>
              <img
                src={`http://localhost:3001/${img.path}`}
                onClick={() => goToDetails(img.id)}
              />
              <span>{img.title}</span>
            </div>
          );
        })}
    </div>
  );
};

export default CategoryPage;
```
