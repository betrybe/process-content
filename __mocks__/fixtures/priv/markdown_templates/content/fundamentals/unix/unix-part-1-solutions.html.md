## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

---

### Parte I - Criação de arquivos e diretórios

1. Utilizando o terminal, aplique o comando de criação de diretórios que você aprendeu: crie um diretório chamado `unix_tests` e navegue até ele

```language-sh
  # exercício 1
  mkdir unix_tests
  cd unix_tests
```

2. Crie um arquivo de texto com o nome `trybe.txt`

```language-sh
  # exercício 2
  touch trybe.txt
```

3. Crie uma cópia do arquivo `trybe.txt` com o nome `trybe_backup.txt`.

```language-sh
  # exercício 3
  cp trybe.txt trybe_backup.txt
```

4. Renomeie o arquivo `trybe.txt`.

```language-sh
  # exercício 4
  mv trybe.txt outro_nome.txt
```

5. Dentro de `unix_tests`, crie um novo diretório chamado `backup`.

```language-sh
  # exercício 5
  mkdir backup
```

6. Mova o arquivo `trybe_backup.txt` para o diretório `backup`.

```language-sh
  # exercício 6
  mv trybe_backup.txt backup
```

7. Dentro de `unix_tests`, crie um novo diretório chamado `backup2`.

```language-sh
  # exercício 7
  mkdir backup2
```

8. Mova o arquivo `trybe_backup.txt` da pasta `backup` para a pasta `backup2`.

```language-sh
  # exercício 8
  mv backup/trybe_backup.txt backup2
```

9. Apague a pasta `backup`.

```language-sh
  # exercício 9
  rmdir backup
```

10. Renomeie a pasta `backup2` para `backup`.

```language-sh
  # exercício 10
  mv backup2 backup
```

11. Veja qual o path completo do diretório atual e liste todos os arquivos dentro dele.

```language-sh
  # exercício 11
  pwd
  ls -l .
```

12. Apague o diretório `backup`.

```language-sh
  # exercício 12
  rm -rd backup
```

13. Limpe o terminal.

```language-sh
  # exercício 13
  clear
```


14. Mostre na tela as 5 primeiras skills do arquivo `skills.txt`.

```language-sh
  # exercício 14
  head -n 5 skills.txt
```

15. Mostre na tela as 4 últimas skills do arquivo `skills.txt`.

```language-sh
  # exercício 15
  tail -n 4 skills.txt
```

16. Apague todos os arquivos que terminem em `.txt`.

```language-sh
  # exercício 16
  rm *.txt
```

---

### Parte II - Manipulação & Busca

1. Na pasta `unix-tests`, baixe um arquivo com os nomes de todos os países do mundo utilizando o comando [curl:](https://linux.die.net/man/1/curl) {: .external-link target="_blank" rel="noreferrer noopener" }

```language-sh
  # exercício 1
  curl -o countries.txt "https://gist.githubusercontent.com/kalinchernev/486393efcca01623b18d/raw/daa24c9fea66afb7d68f8d69f0c4b8eeb9406e83/countries"
```

2. Mostre todo o conteúdo do arquivo `countries.txt` na tela.

```language-sh
  # exercício 2
  cat countries.txt
```

3. Mostre o conteúdo de `countries.txt`, página por página, até encontrar a `Zambia`.

```language-sh
  # exercício 3
  less countries.txt
  # ou...
  more countries.txt
```

4. Mostre novamente o conteúdo de `countries.txt` pagina por pagina, mas agora utilize um comando para buscar por `Zambia`.

```language-sh
  # exercício 4
  less countries.txt
  # ou...
  more countries.txt
  # agora que você está dentro do arquivo, digite uma barra `/` e em seguida a palavra Zambia
  # /Zambia
  # pressione "Enter" para sair
```

5. Busque por `Brazil` no `countries.txt`.

```language-sh
  # exercício 5
  grep Brazil countries.txt
```

6. Busque novamente por `brazil`, mas agora utilizando o lower case.

```language-sh
  # exercício 6
  grep -i brazil countries.txt
```

7. Busque pelas frases que não contenham a palavra `fox`.

```language-sh
  # exercício 7
  grep -v fox phrases.txt
```



8. Conte o número de palavras do arquivo `phrases.txt`.

```language-sh
  # exercício 8
  wc -w phrases.txt
```

9. Conte o número de linhas do arquivo `phrases.txt`.

```language-sh
  # exercício 9
  wc -l phrases.txt
```

10. Crie os arquivos `empty.tbt` e `empty.pdf`.

```language-sh
  # exercício 10
  touch empty.tbt
  touch empty.pdf
```

11. Liste todos os arquivos do diretório `unix_tests`.

```language-sh
  # exercício 11
  ls -l
```

12. Liste todos os arquivos que terminem com `txt`.

```language-sh
  # exercício 12
  ls -l *txt
```

13. Liste todos os arquivos que terminem com `tbt` ou  `txt`.

```language-sh
  # exercício 13
  ls -l *t?t
```

14. Acesse o manual do comando `ls`.

```language-sh
  # exercício 14
  man ls
```

---
