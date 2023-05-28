# wellbot

## Para Usar

- Crie um arquivo .env com ad variáveis que existem em .env.exemple
- Instale docker e docker-compose
- Execute o seguinte comando

```
    $ docker-compose up --build
```

- Para rodar em desenvolvimento com hot refresh

```
   $ docker-compose -f docker-compose-dev.yml up --build
```

## Para Manipular comandos
- Ao usar slash commands, eles podem ser carregados ao discord previamente
- Para isso execute os comandos abaixo
```
    Para adicionar todos
    $ ./commands register
    
    Para apagar todos
    ./commands delete
```
