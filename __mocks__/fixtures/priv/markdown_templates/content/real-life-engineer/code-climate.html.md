## O que é o Code Climate?

Você já tentou entender o código de outra pessoa e não conseguiu entender nada?

Já sentiu que seu código estava "sujo" e com muitas "gambiarras"?

Quer ter um código validado e segurança na hora de dar merge Pull Request?

Quer desenvolver com alta eficiência?

O Code Climate é uma ferramenta que pode ajudar você nestes desafios. Ele lê o seu código e analisa a sua estrutura e a forma como foi escrito de acordo com a linguagem que você está usando, em busca de pontos de melhoria. Ele faz isso analisando o seu código fonte contra algumas regras de código que verificam a **sintaxe e complexidade do código por exemplo**.

---

## Por quê isso é importante?

Se você já leu o seu próprio código depois de uma ou duas semanas que o escreveu ou leu o código de outra pessoa, já deve saber que esta é uma tarefa muito difícil. Em times de muitas pessoas onde uma depende do código da outra, esse problema fica maior ainda. O porquê de ser difícil de entender códigos está muitas vezes associado a como ele foi escrito(não seguindo nenhuma recomendação de estilo, por exemplo). Para resolver ele, utilizamos o Code Climate nos projetos que vocês realizarão!

---

## O que o Code Climate fará na prática no curso Trybe?

O Code Climate é um dos requisitos para se completar os projetos aqui na Trybe pois nós acreditamos que fazer códigos de qualidade é uma prática importante

O Code Climate usará de `linters` para fazer seu trabalho. Linters são ferramentas que analisam o código fonte em busca de erros, bugs, erros de estilo, e construções suspeitas.

Além da sua configuração básica, aqui estão alguns dos plugins adicionais que usamos:

[`CSSLint`](https://github.com/CSSLint/csslint/wiki/Rules) {: .external-link target="_blank" rel="noreferrer noopener" } - Compatibilidade, verificação de risco de bug

[`ESLint`](https://eslint.org/docs/user-guide/configuring#configuring-rules) {: .external-link target="_blank" rel="noreferrer noopener" } - Complexidade, Estilo

[`FIXME`](https://github.com/codeclimate/codeclimate-fixme/tree/master/test) {: .external-link target="_blank" rel="noreferrer noopener" } - Verificação de risco de bug

[`Node Security Project (nsp)`](https://github.com/nodesecurity/nsp) {: .external-link target="_blank" rel="noreferrer noopener" } - Segurança

[`Stylelint`](https://stylelint.io/) {: .external-link target="_blank" rel="noreferrer noopener" } - Evitar erros, reforçar convenções nos estilos

[`ShellCheck`](https://github.com/koalaman/shellcheck) {: .external-link target="_blank" rel="noreferrer noopener" } - Oferece avisos e sugestões para bash/sh shell scripts

---

## Como eu posso melhorar meus códigos com o Code Climate?

Os projetos que vocês fazem tem implantado em si o Code Climate. Assim, é muito importante vocês olharem as observações que o Code Climate faz quando abrirem um _Pull Request_ ou fizerem um novo _Commit_. Como na imagem abaixo.

<%= figure(%{src: "/real-life-engineer/code-climate/images/code-climate.png", class: "rounded mx-auto d-block", caption: "onde apertar para conseguir detalhes", width: "80%"}) %>

Se você clicar no botão `Details`, você será encaminhado para uma página do próprio Code Climate. Nela, você poderá saber mais sobre os problemas apontados (nesse caso, criar uma função e não utilizar ela) e poderá ter dicas de como consertar tais problemas clicando no botão que aparece quando o cursor do mouse está sobre o erro.

<%= figure(%{src: "/real-life-engineer/code-climate/images/saber_mais.png", class: "rounded mx-auto d-block", caption: "onde apertar para conseguir detalhes", width: "80%"}) %>

Ao clicar no botão uma tela aparecerá explicando o problema e como consertá-lo.

<%= figure(%{src: "/real-life-engineer/code-climate/images/explicacao.png", class: "rounded mx-auto d-block", caption: "explicação do erro e como consertar ele.", width: "80%"}) %>

---

## Instalando Code Climate (opcional)

Como vimos até aqui, o _Code Climate_ pode te ajudar muito em relação às melhorias em seu código. Porém, já pensou se você não precisasse fazer um _Commit_ ou criar um _Pull Request_ toda vez que quisesse que seu código fosse verificado?

Pensando nisso, vamos te ajudar agora a instalá-lo em seu computador, de forma que você possa verificar seu código sem a necessidade de envio das alterações para o _GitHub_.

Vamos dividir a instalação dele em alguns blocos para facilitar seu entendimento. Primeiramente, precisaremos instalar alguns aplicativos que são dependências do _CodeClimate_, como o _Docker_. Lembrando que existem diferenças na instalação entre Mac e Linux.

### Instalando Docker

Caso você utilize _MacOS_, siga [esse link](https://docs.docker.com/docker-for-mac/install/) {: .external-link target="_blank" rel="noreferrer noopener" } da página oficial do _Docker_ para fazer a instalação e depois pule para o tópico  [Instalando Code Climate](/real-life-engineer/code-climate#instalando-code-climate).

Se você utiliza _Linux_, continue seguindo as instruções contidas nesse tópico.

Para instalar o _Docker_, você precisa seguir vários passos que precisam ser feitos em ordem, sem pular nenhum. Então, antes de começar, pegue um café e relaxe, pois o processo total deve demorar cerca de 30min, além de que você terá que fazer um download de mais ou menos 2GB. Então vá com calma e siga todos os passos, ok?

Para começar, atualize sua lista de pacotes:

```language-bash
sudo apt update
```

Depois, instale os pacotes de pré-requisitos para poder instalar aplicações via HTTPS:

```language-bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

Após isso, vamos baixar a chave GPG (criptografia) para o repositório do docker:

```language-bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add
```

Nosso próximo passo será adicionar o repositório do _Docker_. Faremos isso porque normalmente o _Docker_ está desatualizado no repositório oficial do Ubuntu:

```language-bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
```

Na sequência, vamos atualizar o banco de dados de pacotes com as informações do repositório que acabamos de adicionar:

```language-bash
sudo apt update
```

Depois, vamos verificar se está tudo correto até aqui, usando o comando:

```language-bash
apt-cache policy docker-ce | head -n 10
```

<%= figure(%{src: "/real-life-engineer/code-climate/images/apt-cache.png", class: "rounded mx-auto d-block", caption: "Verifique as partes em vermelho", width: "100%"}) %>
A resposta do terminal deve ser parecida com essa.

Os pontos importantes aqui são:
* A Origem do pacote, que deve ter o caminho `https://download.docker.com/linux/ubuntu`.
* A versão do pacote candidato a instalação, que deve ter a mesma versão do repositório do _Docker_.

Instale o Docker:

```language-bash
sudo apt install docker-ce
```

Agora que o _Docker_ foi instalado, verifique a configuração dele para inicializá-lo junto do sistema operacional com o comando:

```language-bash
sudo systemctl status docker
```

A saída deve ser semelhante a esta:

<%= figure(%{src: "/real-life-engineer/code-climate/images/systemctl-docker.png", class: "rounded mx-auto d-block", caption: "A versão pode ser diferente da que está na imagem", width: "100%"}) %>

Verifique se tudo está correto com o comando abaixo. A ideia aqui é que, se o programa estiver instalado corretamente, ele responderá com a versão instalada.

```language-bash
docker --version
```

A resposta deve seguir este formato:

<%= figure(%{src: "/real-life-engineer/code-climate/images/docker-version.png", class: "rounded mx-auto d-block", caption: "A versão pode ser diferente da que está na imagem", width: "80%"}) %>

Agora outro passo que não é obrigatório mas que é recomendado é remover a necessidade de usar `sudo` em todas as utilizações do _Docker_.

Sem fazer os passos a seguir, você receberá o erro abaixo ao tentar rodar o programa.

```language-bash
docker: Cannot connect to the Docker daemon. Is the docker daemon running on this host?
See 'docker run --help'.
```

Para resolver isso, adicione seu usuário ao grupo `docker` com os comandos abaixo. Não se preocupe em digitar seu nome de usuário, porque `${USER}` é uma variável que contém seu nome de usuário:

```language-bash
sudo usermod -aG docker ${USER}
```

Depois teste se a associação ao grupo ficou correta, digitando o comando abaixo. Ele pedirá para que você entre com seu usuário e senha:

```language-bash
su - ${USER}
```

Por último, confirme se seu usuário participa do grupo _docker_. Se estiver tudo correto, a palavra docker aparecerá dentro da resposta do comando abaixo:

```language-bash
id -nG
```

<%= figure(%{src: "/real-life-engineer/code-climate/images/idnG.png", class: "rounded mx-auto d-block", caption: "Encontrando a palavra docker aqui, tudo certo", width: "100%"}) %>

Parabéns, você finalmente terminou a instalação do _Docker_! Depois de tudo isso, por favor **NÃO CONTINUE** sem reiniciar o PC, ou o processo de instalação do _Code Climate_ vai falhar.


### Instalando Code Climate

Em comparação com a instalação do _Docker_, o _Code Climate_ é bem mais fácil. Após reiniciar o computador, você precisa de alguns poucos comandos e ele estará instalado.

Como vamos fazer um download, vamos mudar para a sua pasta de downloads, com o primeiro comando. Caso queira fazer o download em outro local, fique à vontade. Apenas lembre-se de checar as permissões de seu usuário na pasta.

```language-bash
cd ~/Downloads/
```

Aqui vamos baixar o instalador do _Code Climate_, diretamente do repositório oficial no _GitHub_ e descompactar.

```language-bash
curl -L https://github.com/codeclimate/codeclimate/archive/master.tar.gz | tar xvz
```

Aqui vamos entrar na pasta descompactada e fazer a instalação do programa.

```language-bash
cd codeclimate-* && sudo make install
```

Depois de terminada a instalação, para testar se tudo está funcionando, digite:

```language-bash
codeclimate help
```

Você terá uma resposta neste formato:
<%= figure(%{src: "/real-life-engineer/code-climate/images/codeclimate-help.png", class: "rounded mx-auto d-block", caption: "Aproveite para ver os parâmetros que podem ser passados com o Code Climate", width: "100%"}) %>

Agora vamos ao que interessa: aprender a usar o programa.

### Utilizando o Code Climate

O _Code Climate_ é composto por vários _plugins_. Plugins são pequenos programas que servem a propósitos específicos. Por causa disso, em cada projeto, é necessário a instalação deles. Utilize então o comando abaixo:

Obs: O comando precisa ser executado na mesma pasta em que o arquivo de configuração `.codeclimate.yml` estiver. Ele normalmente está na pasta raiz do projeto (primeira pasta). Para vê-lo, utilize um `ls -la`, porque o arquivo é oculto (começa com um `.`):

Obs 2: O comando vai baixar tudo o que for necessário, então pode demorar um pouco.

```language-bash
codeclimate engines:install
```

Exemplo de resultado do comando:
<%= figure(%{src: "/real-life-engineer/code-climate/images/codeclimate-engines.png", class: "rounded mx-auto d-block", caption: "Tudo instalado, agora é só usar", width: "100%"}) %>

Com isso, estamos prontos para utilizar o _Code Climate_. Agora utilize o comando abaixo, lembrando de estar na mesma pasta do arquivo `.codeclimate.yml`:

```language-bash
codeclimate analyze
```

Abaixo, uma imagem de um projeto com erros. Ele diz a linha do erro e qual o erro encontrado:
<%= figure(%{src: "/real-life-engineer/code-climate/images/codeclimate-analyze.png", class: "rounded mx-auto d-block", caption: "Com as linhas e o tipo do erro, fica fácil encontrá-lo", width: "100%"}) %>

---

## Recursos Adicionais (opcional)

Agora que você já chegou até aqui não vai parar, não é?

* [Documentação do Code Climate](https://docs.codeclimate.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [O porquê ligar para análise estática de código](https://medium.com/@alexwking/why-you-should-care-about-static-code-analysis-633fe1075fa0) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Uma história pessoal de pesquisa sobre analise estática de código](https://medium.com/dipcode/static-code-analysis-a-personal-research-story-387323983419) {: .external-link target="_blank" rel="noreferrer noopener" }

---
