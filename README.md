#### Front Teste Fabrica Info - Admnistrador de Tarefas

##### Sobre tecnologias utilizadas nesse projeto:
- Vue 3.2.36
- Docker 3.7
- Vuex 4
- Vue Router 4.0.3
- Vuetify 3.1.8

## Instalação

##### Requisito obrigátorio
Antes de tudo você precisa ter o docker e o docker-compose e também o git.
Caso não tenha instalado, aqui alguns links de referência:
- Aqui encontrar os passos para instalação do Docker => https://docs.docker.com/get-docker/ 
- Aqui encontrar os passos para instalação do Docker Compose => https://docs.docker.com/compose/ 
- Aqui encontrar os passos para instalação do git => https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

Além disso para você pode usufruir de todos os serviços da aplicação é necessário que você também tenha o backend instalado na sua maquina.
- Aqui você encontra o repositório e o passo a passo para fazer a instalação 
deste backend => https://github.com/joaovitornunes09/teste-fbinfo-back

##### Clone o projeto
Com o git instalado e em um diretório da sua escolha, baixe o projeto:

```sh
git clone https://github.com/joaovitornunes09/teste-fbinfo-front.git
```
##### Suba o serviço
Com o Docker-compose instalado, execute esse comando na raiz do projeto:


```sh
docker-compose up -d --build
```

Pronto, a sua aplicação estará rodando na porta 9005.

Link: http://localhost:9005/
