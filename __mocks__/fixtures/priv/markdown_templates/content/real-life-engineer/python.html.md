<%= figure(%{src: "/real-life-engineer/python/images/utensilios.jpg", caption: "Utensílios de cozinha dispostos em uma mesa.", class: "text-center rounded mx-auto d-block"}) %>

## 🍴 Escolhendo os melhores utensílios

Escrever um algoritmo é como seguir os passos de uma receita, por isso assim como os bons _chefs_, precisamos nos preparar e escolher os melhores ingredientes e utensílios.

As ferramentas foram escolhidas pensando na didática da pessoa estudante assim como compatibilidade de sistemas operacionais e também por serem as principais escolhas no mercado de trabalho.

Siga os passos de acordo para cada ferramenta. Tenha sempre certeza de que a ferramenta está instalada e funcionando.

---

## 🐍 Python

**O que é?**

[Python](https://www.python.org/) é uma linguagem de programação com foco em legibilidade e produtividade, criada para escrever código bom e fácil de manter de maneira rápida.

**Para que serve?**

É uma linguagem bastante versátil, e hoje em dia é amplamente utilizada para escrever sistemas web, integrações entre sistemas, automatizar tarefas e muitas outras coisas.

**Como instalar**

Versões mais atuais do ubuntu (ou similares) já vem com o python 3 instalado, e inclusive, a partir da versão 17.10, essa passa a ser a versão padrão do sistema.

Caso python 3 não esteja instalado, utilize `sudo apt install python3`.

**Vamos verificar se deu tudo certo?**

Abra um terminal e digite `python3 --version`.

```language-bash
python3 --version
```

A saída deverá ser similar a apresentada abaixo:

```language-bash
Python 3.8.0
```


⚠️ Qualquer versão igual ou acima da versão 3.6 é suficiente  para acompanhar o curso.

---

## 🚚 Pip

**O que é?**

[Pip](https://pypi.python.org/pypi/pip) é o gerenciador de pacotes do python. É um cliente de linha de comandos utilizado para controle das depêndencias do projeto.

**Para que serve?**

Utilizaremos o pip para controlar a versão das bibliotecas utilizadas para desenvolvimento do sistema. O pip nos permite baixar uma versão específica de uma biblioteca como por exemplo `python3 -m pip install fastapi==0.43.0`.

**Como instalar**

Esta ferramenta não vem por padrão no sistema operacional Ubuntu e pode ser instalada utilizando o comando `sudo apt install python3-pip`.


**Vamos verificar se deu tudo certo?**

Abra um terminal e digite `python3 -m pip --version`.

```language-bash
python3 -m pip --version
```

A saída deverá ser similar a apresentada abaixo:

```language-bash
pip 19.2.3 from /usr/lib/python3.8/site-packages (python 3.8)
```

---

## 📚 Venv

**O que é?**

Responsável por criar ambientes virtuais Python e provê um isolamento dos pacotes instalados e suas respectivas versões.

É um cliente de linha de comando que auxilia na separação de ambientes para diferentes projetos.

**Para que serve?**

Iniciamos um projeto que tem uma biblioteca na versão `1.4`, e de repente, um novo projeto é iniciado na versão `2.0`. O que fazer? Será que são compatíveis? E se eu atualizo o sistema e a versão antiga para de funcionar?

É onde o `venv` entra, ele serve para isolar ambientes entre projetos, ou seja, eu consigo ter dois projetos rodando, em dois ambientes diferentes, com versões diferentes da mesma biblioteca.

**Como instalar**

Versões atuais do _Ubuntu_ já vem com python 3 instalado. Para as mais antigas utilize o comando `sudo apt install python3-venv`.

**Vamos verificar se deu tudo certo?**

Em um terminal digite `python3 -m venv -h`.

```language-bash
python3 -m venv -h
```

A saída deverá ser similar a apresentada abaixo:

```language-bash
usage: venv [-h] [--system-site-packages] [--symlinks | --copies] [--clear]
            [--upgrade] [--without-pip] [--prompt PROMPT]
            ENV_DIR [ENV_DIR ...]

Creates virtual Python environments in one or more target directories.

positional arguments:
  ENV_DIR               A directory to create the environment in.

optional arguments:
...
```

---

## 🎨 Flake8

**O que é?**

[Flake8](https://flake8.pycqa.org/en/latest/) é um programa de linha de comando que verifica seu código e busca por erros ou formatações que não seguem o guia de estilo padrão do python, conhecido como `PEP-8`. Além disso também verifica a [complexidade ciclamática](https://pt.wikipedia.org/wiki/Complexidade_ciclom%C3%A1tica) do seu código.

**Para que serve?**

É muito comum cometermos alguns erros de sintaxe, principalmente quando ainda estamos nos familiarizando com uma linguagem nova. Assim como durante o nosso dia a dia podemos esquecer algum código não utilizado. Esta ferramenta vai analisar o seu código e procurar possíveis erros, evitando assim que só ocorram no momento em que o código for executado.

Esta ferramenta também aponta possíveis linhas que não estão seguindo o estilo de código definido para a linguagem python.

Outra coisa bem comum quando estamos escrevendo código é que uma parte dele começa a se tornar tão complexa que há n caminhos por onde seu algoritmo pode seguir. Normalmente isto indica que devemos modificar o código para torná-lo mais simples e legível. O Flake8 irá apontar qual parte do seu código está complexa e que deve ser modificada.

Esta ferramenta será integrada ao editor, dessa maneira, ao salvar o arquivo, teremos os erros encontrados apontados diretamente no mesmo.

**Como instalar**

O pacote flake8 pode ser instalado utilizando utilizando a ferramenta pip vista anteriormente. Vamos utilizar sudo neste caso para garantir que ela esteja disponível para todos os usuários do sistema operacional. Digite o comando abaixo:

```language-bash
sudo python3 -m pip install flake8
```


**Vamos verificar se deu tudo certo?**


Digite o comando `python3 -m flake8 --version`.

```language-bash
python3 -m flake8 --version
```

A saída deverá ser similar a apresentada abaixo:

```language-bash
3.8.4 (mccabe: 0.6.1, pycodestyle: 2.6.0, pyflakes: 2.2.0)
```

---

## ✨ Black

**O que é?**

Black é o formatador de código Python intransigente. Ao usá-lo, você concorda em ceder o controle sobre as minúcias da formatação manual. Em troca, o black dá a você velocidade, determinismo e liberdade do irritante `pycodestyle` sobre formatação. Você economizará tempo e energia mental para assuntos mais importantes.

**Para que serve?**

O black é um formatador automático de código, ele irá modificar o seu código seguindo o guia de estilo do Python. Iremos configurá-lo junto ao nosso editor para que a formatação seja feita através de um atalho do teclado como `shift + ctrl + i`.

**Como instalar**

O pacote black pode ser instalado utilizando utilizando a ferramenta pip vista anteriormente. Vamos utilizar sudo neste caso para garantir que ela esteja disponível para todos os usuários do sistema operacional. Digite o comando abaixo:

```language-bash
sudo python3 -m pip install black
```

**Vamos verificar se deu tudo certo?**

Digite o comando `python3 -m black --version`.

```language-bash
python3 -m black --version
```

A saída deverá ser similar a apresentada abaixo:

```language-bash
__main__.py, version 20.8b1
```

---

## 🗒️ VSCode(Python)

**O que é?**

O VSCode é um editor de texto e possui uma excelente extensão para **Python** que pode ser instalada através da [_marketplace_](https://marketplace.visualstudio.com/items?itemName=ms-python.python).

**Para que serve?**

O _plugin_ de Python para VSCode fornece _auto-complete_, integração com os _linters_ vistos anteriormente, também é uma ferramenta para depuração de código.

**Como instalar**

Abra o `VS Code Quick Open (Ctrl+P)`, cole o comando a seguir e pressione `enter`.

```language-bash
ext install ms-python.python
```

Após instalar a extensão, digite `ctrl + shift + p`, vá em `Preferences: Open Settings (JSON)` e acrescente as seguintes configurações.

```language-javascript
// ...
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.formatting.blackArgs": [
        "-l 79"
    ],
    "python.formatting.provider": "black",
// ...
```

**Vamos verificar se deu tudo certo?**

Abra um arquivo com extensão `.py` no VSCode e digite o código `lista = [1,2,3]`. Salve o arquivo e um aviso de erro deve acontecer.

Passando o mouse sobre a linha veremos que o erro é: `missing whitespace after ','flake8(E231)`.

Para corrigir e testar se o nosso formatador está funcionando corretamente, digite `ctrl + shift + i`. Após salvar novamente o erro deve ter desaparecido. Caso isto não aconteça certifique que tenha feitos os passos anteriormente para instalação do `flake8` e `black`.


---

## 🏃 CodeRunner

**O que é?**

Extensão do VSCode que permite rodar códigos ou trechos de códigos em mais de 30 linguagens de programação e adicionar também comandos customizados.

**Para que serve?**

Rodar trechos de códigos ou o código inteiro sem sair do VSCode.

**Como instalar**

Abra o `VS Code Quick Open (Ctrl+P)`, cole o comando a seguir e pressione `enter`.

```language-bash
ext install formulahendry.code-runner
```

Após instalar a extensão, digite `ctrl + shift + p`, vá em `Preferences: Open Settings (JSON)` e acrescente as seguintes configurações.

```language-javascript
// ...

    "code-runner.executorMap": {
        "python": "python3 -u"
    },
    "code-runner.runInTerminal": true,

// ...
```

Esta configuração garante que nosso script será executado utilizando a versão 3 do Python.

**Vamos verificar se deu tudo certo?**

Escreva um pequeno código como `print("Olá Mundo")` e apertando `ctrl + shift + N` o código será executado.

---
