## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

### Exercício 1

> Como vocês viram nos exemplos acima, a conexão nunca fica ligada por muito tempo, pois assim que recebemos e respondemos a conexão é desligada. Por esse motivo experimentem remover a resposta do servidor e veja quanto tempo a conexão fica ligada!

Para resolver esse exercício basta você comentar o seguinte trecho de código:

```language-javascript
// ...

/* Criando o servidor com o método 'createServer', onde recebe uma conexao e nela é exposto os eventos que podemos manipular no nosso servidor. */
const server = net.createServer((connection) => {
  // ...

  /* Nessa conexão que foi aberta podemos fazer várias coisas, uma delas é escrever/devolver uma mensagem para o cliente. */
  // connection.write('Mensagem do servidor!\r\n');
  // connection.pipe(connection);
});

// ...
```

E executar os scripts:

<%= figure(%{src: "/back-end/nodejs/sockets/images/solution1.png", class: "text-center rounded mx-auto d-block", width: "788px", height: "auto"}) %>

### Exercício 2

> Através do método `server.getConnections((err, count) => {})` imprima quantas conexões estão de pé.

Essa já veio pronta! É só adicionar um `console.log(count);` e ver a mágica acontecer!

```language-javascript
// ...

/* Criando o servidor com o método 'createServer', onde recebe uma conexao e nela é exposto os eventos que podemos manipular no nosso servidor. */
// const server = net.createServer((connection) => {
  // ...
// });

server.getConnections((err, count) => {
  console.log(count);
});

// ...
```

Após isso, é só executar os scripts novamente:

<%= figure(%{src: "/back-end/nodejs/sockets/images/solution2.png", class: "text-center rounded mx-auto d-block", width: "788px", height: "auto"}) %>

### Exercício 3

> Envie uma mensagem do cliente para o servidor.

Essa já não é tão fácil assim, né? Pois bem, assim como o servidor pode enviar mensagens para os clientes dentro de uma conexão, um cliente também pode:

> client.js

```language-javascript
const client = net.connect({ port: 8080 }, () => {
  console.log('Cliente conectado ao servidor!');
  client.write('Cliente número 1');
});
```

E assim como um cliente pode receber mensagens do servidor, o servidor também pode receber dados do cliente.

> server.js

```language-javascript
const server = net.createServer((connection) => {
  connections.push(connections);
  connection.on('end', () => {
    console.log('Cliente desconectado');
  });

  connection.on('data', (data) => {
    console.log(`O cliente disse: ${data}`);
  });
});
```
