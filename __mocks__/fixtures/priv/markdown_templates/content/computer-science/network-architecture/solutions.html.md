## Gabarito dos exercícios

A seguir, encontra-se sugestões de solução para os exercícios propostos.

**Exercício 1**: O primeiro server que iremos utilizar é o nosso velho amigo HTTP, na camada de aplicação. Você pode tanto criar um, como utilizar um dos projetos ou exercícios dos módulos anteriores. A ideia é utilizarmos os conhecimentos do conteúdo e a ferramenta cURL para realizarmos uma chamada HTTP para ele.

1. Faça uma chamada GET, utilizando o cURL.

```language-bash
$ curl localhost:3000
```

ou

```language-bash
$ curl -X GET localhost:3000
```

2. Faça uma chamada POST, utilizando o cURL, passando um JSON no body da requisição.

```language-bash
$ curl -X POST \
    -H 'Content-Type: application/json' \
    -d '{ "foo": "bar" }' \
    localhost:3000
```

3. Faça uma chamada qualquer, utilizando o cURL, passando um header na requisição.

```language-bash
$ curl --request POST \
    --header 'Content-Type: application/json' \
    --header 'Authorization: ApiKey EXAMPLE-TOKEN' \
    --data '{ "foo": "bar" }' \
    localhost:3000
```

**Exercício 2**: Ainda utilizando o cURL, vamos explorar mais alguns conceitos do HTTP, relembre que falamos que o HTTP organiza e dá significado aos dados encapsulados nessa camada, por exemplo, ao vermos um 200 tanto nós como um client HTTP sabe que aquela request foi realizada com sucesso, vamos explorar isso com o cURL.

1. Faça uma chamada GET, utilizando o cURL, para "google.com".

```language-bash
$ curl google.com
```

2. Perceba que foi retornado um `301`, isso quer dizer que existem diversos redirecionamentos que nos encaminha para o lugar certo, no caso, o caminho certo para a página do google é `www.google.com`. Ao acessarmos pelo navegador, não percebemos isso porquê ele faz o redirecionamento para a página certa para nós ao encontrar o `301`, porém, se você inspecionar a network você irá identificar esse redirecionamento. Faça uma nova chamada a "google.com", porém agora utilizando o parâmetro `-L` que serve para "seguir redirecionamentos".

```language-bash
$ curl -L google.com
```

**Exercício 3**: Agora utilizando o wget, pegue o conteúdo da página do site da Trybe, depois abra o arquivo HTML baixado em seu navegador. Faça o mesmo processo com outras páginas web.

```language-bash
$ wget betrybe.com
```

**Exercício 4**: Agora iremos para a camada de transporte, crie um server TCP, utilizando o módulo `NET` do Node.js, o server deverá:

1. Responder com um "Olá, client", logo quando estabelecer uma conexão.

2. Imprimir no console todo dado recebido (não esqueça de converter o `data` para string para ficar legível para nós, humanos).

3. Utilize a porta 8085.

```language-javascript
const net = require('net');

const server = net.createServer((socket) => {
  socket.write('Olá, client!\n');

  socket.on('data', (data) => {
    console.log(data.toString());
  });
});

const PORT = 8085;

server.listen(PORT);

console.log(`Server TCP ativo!\nEscutando na porta: ${PORT}`);
```

**Exercício 5**: Utilizando o comando telnet ou o Netcat (nc):

1. Conecte no server do exercício anterior e envie informações, o server deverá imprimir as mensagens enviadas no console.

2. Pare o servidor e verifique o que aconteceu com a conexão que estava aberta com o comando telnet ou nc.

```language-bash
$ nc -t 127.0.0.1 8085
```

ou

```language-bash
$ telnet 127.0.0.1 8085
```

Após estabelecer a conexão, digite a mensagem e tecle enter para enviá-las.

**Exercício 6**: Reinicie o servidor TCP e agora faça uma requisição utilizando o cURL (HTTP), perceba o que é exibido no console do _server_ já que não estamos utilizando o HTTP nele, perceba também que o comando cURL não recebe uma resposta HTTP com sentido (um status code 200, por exemplo), de modo que ele não sabe que aquela requisição chegou ao fim.

```language-bash
$ curl localhost:8085
```

Uma request mais legal:

```language-bash
$ curl --request POST \
    --data "{ \"foo\": \"bar\" }" \
    --header 'Content-Type: application/json' \
    --header 'Foo-Bar-Header: foo-bar' \
    localhost:8085/foo-bar
```

**Exercício 7**: Agora iremos explorar o outro protocolo de transporte que aprendemos, o UDP. Crie um servidor utilizando o módulo `dgram` do Node.js. O server deverá:

1. Imprimir no console toda mensagem recebida (não esqueça de converter também para string).

2. Utilize a versão 4 do protocolo (`udp4`).

3. Utilize a porta 8084.

```language-javascript
const dgram = require('dgram');

const socket = dgram.createSocket('udp4');

socket.on('message', (message) => {
  console.log(message.toString());
});

const PORT = 8084;

socket.bind(PORT);

console.log(`Server TCP ativo!\nEscutando na porta: ${PORT}`);
```

**Exercício 8**: Envie pacotes para o servidor UDP, utilizando o Netcat (nc). Em seguida pare o servidor e perceba que como não há conexão nada é sentido pelo _client_.

```language-bash
$ nc -u 127.0.0.1 8084
```

Após executar o comando, digite a mensagem e tecle enter para enviá-las.

**Exercício 9**: Faça uma chamada ao server, utilizando o `cURL`. Lembre que além do HTTP o comando utiliza o protocolo TCP e não o UDP. Repare o que acontece.

```language-bash
$ curl localhost:8084
```

#### Bônus

**Exercício 10**: Identifique o IP interno e externo da sua máquina.

Para IP externo acesse algum site como o `http://meuip.com.br/` ou execute:

```language-bash
$ curl ifconfig.me
```

Para o interno, acesses as propriedades de rede através do seu sistema operacional ou busque o dado com o comando `ifconfig`

**Exercício 11**: Identifique as interfaces de redes utilizadas por sua máquina e identifique qual está em uso agora.

```language-bash
$ ifconfig
```
