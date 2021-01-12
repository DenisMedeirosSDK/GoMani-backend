# GoMani

## Backend

### Requisitos

- Docker
- Node lts

#

Execute o arquivo `docker-compose.yml`

```
 docker-compose up
```

Certifique que as imagens estão sendo executada.

- mongo:latest
- postgres:latest
- redis:alpine

#

Crie um arquivo na raiz do projeto `ormconfig.json` , copie e cole o conteudo do arquivo `ormconfig.example.json`, agora crie um banco de dados postgres chamado **gomani** e depois execute no terminal do projeto.

```bash
yarn typeorm migration:run
```

#

Agora é possivel executar o projeto com o comando

```
yarn dev
```
