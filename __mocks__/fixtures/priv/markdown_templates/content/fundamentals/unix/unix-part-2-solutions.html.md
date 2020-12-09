## Gabarito dos Exercícios

A seguir, temos uma possível solução para os exercícios:

---

### Parte I - Comandos de Input e Output

1. Navegue até a pasta `unix_tests`;

```language-sh
# Exercício 1
# O comando para navegar é o: cd
# O caminho utilizado em conjunto com o comando vai depender de qual pasta
# você estiver e de onde a pasta unix_tests estiver.
# Use o comando pwd para verificar em qual pasta você está.
# Dessa forma, você confirmará se está na pasta unix_tests.

cd /home/joaozinho/unix_tests
pwd
```

2. Crie um arquivo texto com o nome `skills2.txt` e adicione os valores `Internet`, `Unix` e `Bash`, um em cada linha.

```language-sh
# Exercício 2
touch skills2.txt
echo "Internet" >> skills2.txt
echo "Unix" >> skills2.txt
echo "Bash" >> skills2.txt
```


3. Adicione mais 5 itens à sua lista de skills e depois imprima a lista ordenada no terminal. 🤓

```language-sh
# Exercício 3
echo "HTML" >> skills2.txt
echo "CSS" >> skills2.txt
echo "JavaScript" >> skills2.txt
echo "React" >> skills2.txt
echo "SQL" >> skills2.txt
sort < skills2.txt
```

4. Conte quantas linhas tem o arquivo `skills2.txt`.

```language-sh
# Exercício 4
cat skills2.txt | wc -l
```

5. Crie um arquivo chamado `top_skills.txt` usando o `skills2.txt`, contendo as 3 primeiras skills em ordem alfabética.

```language-sh
# Exercício 5
sort < skills2.txt | head -n 3 > top_skills.txt
```

6. Crie um novo arquivo chamado `phrases2.txt` e adicione algumas frases de sua escolha.

```language-sh
# Exercício 6
touch phrases2.txt
echo "The quick brown fox jumps over the lazy dog." > phrases2.txt
echo "Quick fox jumps nightly above wizard." >> phrases2.txt
echo "The quick onyx goblin jumps over the lazy dwarf." >> phrases2.txt
```

7. Conte o número de linhas que contêm as letras `br`.

```language-sh
# Exercício 7
grep br phrases2.txt | wc -l
```


8. Conte o número de linhas que **não** contêm as letras `br`.

```language-sh
# Exercício 8
grep -v br phrases2.txt | wc -l
```

9. Adicione dois nomes de países ao final do arquivo `phrases2.txt`.

```language-sh
# Exercício 9
echo "Japão" >> phrases2.txt
echo "Austrália" >> phrases2.txt
```

10. Crie um novo arquivo chamado `bunch_of_things.txt` com os conteúdos dos arquivos `phrases2.txt` e `countries.txt`.

```language-sh
# Exercício 10
cp countries.txt bunch_of_things.txt
cat phrases2.txt >> bunch_of_things.txt
```

11. Ordene o arquivo `bunch_of_things.txt`.

```language-sh
# Exercício 11
sort bunch_of_things.txt -o bunch_of_things.txt
```


### Parte II - Permissões

1. Navegue até a pasta `unix_tests`;

```language-sh
# Exercício 1
# o comando para navegar é o: cd
# vai depender de qual pasta você estiver, e de onde a pasta unix_tests estiver
# use o comando: pwd para verificar em qual pasta você está

cd /home/joaozinho/unix_tests
pwd
```

2. Rode o comando [ls](https://linux.die.net/man/1/ls) {: .external-link target="_blank" rel="noreferrer noopener" } `-l` e veja quais as permissões dos arquivos;

```language-sh
# Exercício 2
ls -l
```

3. Mude a permissão do arquivo `bunch_of_things.txt` para que todos os usuários possam ter acesso à leitura e escrita e verifique se está correto com o comando `ls -l`;

```language-sh
# Exercício 3
chmod a+rw bunch_of_things.txt
ls -l
```

4. Tire a permissão de escrita do arquivo `bunch_of_things.txt` para todos os usuários, verifique se está correto com o comando `ls -l`;

```language-sh
# Exercício 4
chmod a-w bunch_of_things.txt
ls -l
```

5. Volte a permissão do arquivo `bunch_of_things.txt` para a listada inicialmente utilizando o comando `chmod 644 bunch_of_things.txt`. [Leia este artigo](https://github.com/CristianAmbrosi/tutoriais/blob/master/Permiss%C3%B5es%20de%20um%20Arquivo%20ou%20Diret%C3%B3rio%20no%20Linux.md) {: .external-link target="_blank" rel="noreferrer noopener" } para entender mais sobre o que é e como funciona essa numeração `644`.

```language-sh
# Exercício 5
chmod 644 bunch_of_things.txt
ls -l
```

---

### Parte III - Processos & Jobs

1. Liste todos os processos;

```language-sh
# Exercício 1
ps
```

2. Agora execute o comando `[sleep](https://linux.die.net/man/3/sleep) {: .external-link target="_blank" rel="noreferrer noopener" } 30 [&](https://linuxhandbook.com/run-process-background/) {: .external-link target="_blank" rel="noreferrer noopener" }`;

```language-sh
# Exercício 2
sleep 30 &
```

3. Use a listagem de processos para encontrar o PID do processo que está executando o comando `sleep 30` e termine a sua execução ~~(mate o processo)~~;

```language-sh
# Exercício 3
ps | grep sleep
kill 1234 # se 1234 for o PID do processo criado no Exercício 2
# deve aparecer "terminated" no terminal
```

4. Execute novamente o comando `sleep 30`, mas agora sem o `&`. Depois, faça com que ele continue executando em background;

```language-sh
# Exercício 4
sleep 30
# aperte "ctrl+z" enquanto o processo está rodando
# deve aparecer "suspended" no terminal

# depois continue a execução usando o comando: bg
bg
# deve aparecer "continued" no terminal
# depois que passar os 30 segundos, deve aparecer "done" no terminal
```

5. Crie um processo em background que rode o comando `sleep` por 300 segundos.

```language-sh
# Exercício 5
sleep 300 &
```

6. Crie mais dois processos que rodem o comando `sleep` por 200 e 100 segundos, respectivamente. Você deve criá-los em *foreground* (sem usar o `&`) e enviá-los para background após cada um começar a executar.

```language-sh
# Exercício 6
sleep 200
# aperte "ctrl+z" enquanto o processo está rodando
# deve aparecer "suspended" no terminal
sleep 100
# aperte "ctrl+z" enquanto o processo está rodando
# deve aparecer "suspended" no terminal
```

7. Verifique que apenas o processo `sleep 300` está em execução com o comando `jobs`. Suspenda a execução desse processo (você vai precisar trazer o processo para *foreground* e suspendê-lo, ou enviar um sinal).

```language-sh
# Exercício 7
jobs
# deve aparecer "running" à esquerda do processo sleep 300
fg %1 # trazendo o processo sleep 300 para foreground com o comando fg
# aperte "ctrl+z" enquanto o processo está rodando
# deve aparecer "suspended" no terminal
jobs
# todos os processos devem aparecer como "suspended"
```

8. Retome a execução do processo `sleep 100` em background.

```language-sh
# Exercício 8
bg %3 # executando o processo sleep 100 em background com o comando bg
jobs
# deve aparecer "running" à esquerda do processo sleep 100
```

9. Termine a execução de todos os processos `sleep` ~~(mate os processos)~~.

```language-sh
# Exercício 9
ps | grep sleep
kill 1234 # assumindo que 1234 seja o PID de um dos processos sleep
kill 4567 # assumindo que 4567 seja o PID de um dos processos sleep
kill 7890 # assumindo que 7890 seja o PID de um dos processos sleep
# ou...
killall sleep
```

---

### (Bônus) - Parte IV - O despertar do terminal

E pra terminar com a energia ~~óh,~~ lá no alto, que tal aprender agora alguns comandos divertidos do UNIX? ☝ 🎊	

[Leia este artigo para fazer os exercícios ~~de aquecimento~~ abaixo](https://canaltech.com.br/linux/11-comandos-divertidos-e-inuteis-para-usar-no-linux/) {: .external-link target="_blank" rel="noreferrer noopener" }	

1. Abra o terminal e execute o comando `cmatrix`. Quando estiver se sentindo como o *Neo*, aperte `ctrl+c` para voltar ao terminal;

```language-sh
# Exercício 1
    cmatrix
```

2. Crie um arquivo de texto chamado `fortune.txt` que contenha a sua sorte do dia. Utilize apenas uma linha de comando. _Dica: use o comando `fortune`, e o operador `>`;_

```language-sh
# Exercício 2
fortune > fortune.txt
```

3. Conte quantas palavras tem a frase da sua sorte do dia. _Dica: use o comando `wc`;_

```language-sh
# Exercício 3
wc -m fortune.txt
```

4. Execute o comando `sl`. Agora tente `sl -f`;

```language-sh
# Exercício 4
sl
sl -f
```

5. Execute o comando `cowsay`. Agora faça a vaquinha dizer a frase que está gravada no arquivo `fortune.txt`;

```language-sh
# Exercício 5
cowsay show
tail fortune.txt | cowsay
```

6. Descubra os fatores primos do número 42 usando o comando `factor`;

```language-sh
# Exercício 6
factor 42
```

7. Veja como fica a sua sorte do dia ao contrário. Dica: utilize o comando `rev`.

```language-sh
# Exercício 7
tail fortune.txt | rev
```

8. Execute o comando `telnet towel.blinkenlights.nl`. Lembre-se de que você tem mais exercícios para fazer! 😅

```language-sh
# Exercício 8
telnet towel.blinkenlights.nl
```


---
