# REST API em Express

Esta é uma REST API básica construída usando o framework Express. A API fornece endpoints para realizar operações CRUD em um recurso específico.

## Pré-requisitos

- Node.js instalado
- Banco de dados PostgreSQL configurado

## Configuração

1. Clone o repositório:
```bash
    git clone https://github.com/lucassdmp/House4SaleDB
```

2. Instale as dependências: 
```bash
    cd House4SaleDB
    npm install
```	


3. Configure as variáveis de ambiente:

    Crie um arquivo `.env` no diretório raiz do projeto e defina as seguintes variáveis de ambiente ou edit o .env.basic:

```bash
    PGUSER=<USUÁRIO_DO_BANCO_DE_DADOS>
    PGHOST=<HOST_DO_BANCO_DE_DADOS>
    PGDATABASE=<NOME_DO_BANCO_DE_DADOS>
    PGPASSWORD=<SENHA_DO_BANCO_DE_DADOS>
    PGPORT=<PORTA_DO_BANCO_DE_DADOS>
    API_PORT=<PORTA_DO_SERVIDOR>
    API_SUFFIX=<SUFIXO_DOS_ENDPOINTS>
```


Certifique-se de substituir os valores entre `< >` pelas suas configurações específicas.

## Executando a API

Após concluir a configuração, você pode executar a API usando o seguinte comando:

```bash
    npm run dev
```


Isso iniciará o servidor na porta especificada e a API estará pronta para receber solicitações.

## Endpoints

A API possui os seguintes endpoints disponíveis:

- `GET /houses`: Retorna todas as casas.
- `GET /houses/type/:type`: Retorna todas as casas de um determinado tipo.
- `GET /houses/address/:address`: Retorna todas as casas com um determinado endereço.
- `GET /houses/id/:id`: Retorna uma casa pelo ID.
- `GET /houses/date/:order`: Retorna todas as casas ordenadas por data.
- `GET /houses/price/:order`: Retorna todas as casas ordenadas por preço.
- `GET /houses/prices/:price`: Retorna todas as casas com um preço específico.
- `POST /post/house`: Adiciona uma nova casa.
- `DELETE /delete/house/:id`: Exclui uma casa pelo ID.

Esses são apenas alguns exemplos de endpoints disponíveis. Certifique-se de revisar o código-fonte para obter a lista completa de endpoints e suas respectivas funções.

## Nota

Esse projeto foi desenvolvido para fins de estudo, em atividades da faculdade, e por tanto não será mantido.


## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.


