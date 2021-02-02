## Gabarito dos exercícios

A seguir, encontram-se sugestões de soluções para os exercícios propostos.

**Exercício 1**: Defina uma regra de firewall utilizando o arquivo `/etc/pf.conf` (MacOS) ou o comando `iptables -A` (Linux), que bloqueie (`block` ou `REJECT/DROP`) toda a entrada (`in` ou `INPUT`) de pacotes utilizando o protocolo `ICMP`, impedindo assim que a máquina responda ao comando `ping`. Lembre-se, você pode executar o comando `ping` para validar se sua regra está funcionando corretamente: `ping 127.0.0.1` (caso esteja utilizando Linux, você pode adicionar o parâmetro `-O` para exibir os pings rejeitados também 😉).

**Linux**

```language-bash
$ iptables -A INPUT -p icmp -j REJECT
```

**MacOS**

No arquivo `/etc/pf.conf` adicione a seguinte linha:

```language-bash
block in proto icmp
```

E então atualizar as regra com:

```language-bash
$ sudo pfctl -f /etc/pf.conf
```

<br>

**Exercício 2**: Exclua a regra anterior utilizando o parâmetro `-D` (Linux) ou removendo a regra do arquivo `/etc/pf.conf` e executando o `pfctl` (MacOS).

**Linux**

```language-bash
$ iptables -D INPUT -p icmp -j REJECT
```

**MacOS**

No arquivo `/etc/pf.conf` remova a linha adicionada no exercício anterior e, então, atualize as regras do firewall executando:

```language-bash
$ sudo pfctl -f /etc/pf.conf
```

<br>

**Exercício 3**: Agora vamos criar uma regra para bloquear o tráfego HTTPS. Para isso iremos bloquear a saída de pacotes (`out` ou `OUTPUT`). Lembre-se, a porta padrão para esse protocolo é a `443`, para especificá-la utilize o parâmetro `--sport` (Linux) ou `port` (MacOS), ele utiliza também o protocolo `tcp`. Para criação da regra no **MacOS**, para filtrar uma porta em específico, é necessário definir também um endereço de destino, adicione também o parâmetro `to any` indicando que a regra deverá ser aplicada para qualquer destino. Para testar sua regra, tente acessar um site pelo navegador que use o protocolo, como o Youtube, o Google ou o Facebook.

**Linux**

```language-bash
$ iptables -A OUTPUT -p tcp --sport 443 -j REJECT
```

**MacOS**

No arquivo `/etc/pf.conf` adicione a seguinte linha:

```language-bash
block out proto tcp to any port 443
```

E então atualizar as regras com:

```language-bash
$ sudo pfctl -f /etc/pf.conf
```

<br>

**Exercício 4**: Bloqueie agora o tráfego de saída para HTTP. Lembre-se, também é utilizado o protocolo `tcp` e a porta `80`. Para testar sua regra, tente acessar um site pelo navegador que use `HTTP`.

**Linux**

```language-bash
$ iptables -A OUTPUT -p tcp --sport 80 -j REJECT
```

**MacOS**

No arquivo `/etc/pf.conf` adicione a seguinte linha:

```language-bash
block out proto tcp to any port 80
```

E então atualizar as regras com:

```language-bash
$ sudo pfctl -f /etc/pf.conf
```

<br>

**Exercício 5**: Para finalizar, vamos limpar todas as regras. Para isso, volte a configuração original do `/etc/pf.conf` (MacOS) ou utilize o comando `--flush` do iptables (Linux).

**Linux**

```language-bash
$ iptables --flush
```

**MacOS**

No arquivo `/etc/pf.conf` remova as linhas adicionadas nos exercícios anteriores e, então, atualize as regras do firewall executando:

```language-bash
$ sudo pfctl -f /etc/pf.conf
```

**Exercício 6**: Agora, vamos utilizar um tipo de proxy bem legal que pode ser bastante útil no nosso dia como pessoas desenvolvedoras o [_NGROK_](https://ngrok.com/) {: .external-link target="_blank" rel="noreferrer noopener" }, com ele conseguimos criar um túnel para o nosso `localhost`.

1. Crie um servidor HTTP em sua máquina executando na porta `80`, pode ser um frontend ou um backend criado em aulas anteriores.

> index.js

```language-js
const http = require('http');

const requestListener = (req, res) => {
  res.writeHead(200);
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(80);
```

Execute com:

```language-bash
$ node index.js
```

2. Baixe o ngrok e extraia o arquivo baixado em uma pasta de sua preferência, conforme instruções no [site oficial](https://ngrok.com/download) {: .external-link target="_blank" rel="noreferrer noopener" }.

```language-bash
$ unzip /path/to/ngrok.zip
```

3. Conforme instruções do site, crie um túnel para a porta `80` de sua máquina.

```language-bash
$ ./ngrok http 80
```

4. Acesse o o link disponibilizado em seu navegador. Utilize ele para acessar de outros dispositivos, como seu smartphone ou outro computador 😎.

```language-bash
$ ./ngrok http 80
```

**Exercício 7**: No conteúdo vimos o que são os protocolos SSL e TLS, vamos subir nosso próprio servidor HTTPS, utilizando nosso próprio certificado.

1. Vamos utilizar a ferramenta [OpenSSL](https://www.openssl.org/) {: .external-link target="_blank" rel="noreferrer noopener" } para gerar nossos certificados, ela já vem instalada na maioria das distro Linux e no MacOS.

```language-bash
$ openssl -v
```

2. Para gerar nosso próprio certificado auto-assinado, utilize os comandos abaixo. Lembrando que como nós estamos gerando o certificado, ele não será reconhecido por nenhuma entidade certificadora, de modo que ele só nos servirá para utilizar o protocolo TLS com o HTTPS, não sendo capaz de ser aceito pelo navegador, por exemplo, que não irá aceitá-lo, por não ter sido aprovado por nenhuma entidade reconhecida por ele.

```language-bash
$ openssl genrsa -out key.pem
$ openssl req -new -key key.pem -out csr.pem
$ openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
$ rm csr.pem
```

3. Acabamos de gerar dois arquivos, o `cert.pem` (o certificado) e o `key.pem` (chave privada). Copie os dois arquivos para um diretório onde iremos criar nosso server HTTPS, utilizando o [modulo HTTPS do Node.js](https://nodejs.org/api/https.html) {: .external-link target="_blank" rel="noreferrer noopener" }.

```language-bash
$ mkdir /some-dir/https-server
$ mv key.pem /some-dir/https-server
$ mv cert.pem /some-dir/https-server
$ cd /some-dir/https-server
```

4. Siga [a documentação do módulo](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener) {: .external-link target="_blank" rel="noreferrer noopener" } para criar seu servidor HTTPS.

`index.js`

```language-js
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

https
  .createServer(options, (_req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  })
  .listen(8000);
```

5. Acesse o servidor utilizando o navegador. Perceba que ele irá informar que o certificado não é reconhecido por ele, pois não foi assinado por nenhuma entidade da confiança dele.

6. Acesse o servidor novamente, porém, desta vez utilizando cURL.

```language-bash
$ curl https://localhost:8000
```

7. Por último, vamos utilizar um recurso do cURL, somente para testes (somente utilize, caso realmente você esteja esperando por aquilo), que é o parâmetro `-k` ou `--insecure`. Com ele, falamos para o nosso cURL prosseguir a request mesmo sabendo que a conexão não é "confiável".

```language-bash
$ curl --insecure https://localhost:8000
```
