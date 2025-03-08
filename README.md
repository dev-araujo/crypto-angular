# Crypto-Angular

  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=5965E0&labelColor=121214" alt="License">

> Em construção

## 💻 Projeto

#### Um projeto para listar informações sobre crypto.

## Resultado

- O resultado pode ser conferido :arrow_right: [**AQUI**](https://crypto-angular.vercel.app/)
<h1 align="center">

![image](https://github.com/user-attachments/assets/9c148fe5-742c-4e80-939b-8fd6d9fd3dcb)

![image](https://github.com/user-attachments/assets/3dece736-22ca-46d7-bd38-02b8cd85abcc)

</h1>

<details><summary> <h2>🦊Tela depois de o usuário se conectar com a metamask🦊</h2></summary>

![image](https://github.com/user-attachments/assets/34b6b967-4966-4c36-84a6-847a18197d34)

</details>

## Features

- [x] Listagem dos tokens correntes
- [x] Gráficos dos tokens de acordo com a cotação
- [x] Detalhes à respeito de cada token
- [x] Possibilidade de alternar entre o valor da cotação em dolar e em real brasileiro
- [x] Possibilidade de conexão com a metamask
- [x] Uma vez conectado com a metamask possibilita a criação de uma 'lista de favoritos' onde se pode conferir a cotação e detalhes mais facilmente dos tokens favoritados

## Feito com 🔨

- **Angular +2**

### Consumindo as APIs:

- [Coinranking](https://developers.coinranking.com/api)
- [CryptoCompare](https://min-api.cryptocompare.com/)

<details><summary> <h2>Instruções para rodar local</h2></summary>

Por ser um projeto realizado com **Angular**, há a necessidade do **NodeJS**. Com ele instalado basta seguir os seguintes passos.

No terminal, clone o projeto:

```
git clone https://github.com/dev-araujo/crypto-angular.git
```

Crie as chaves na [CryptoCompare](https://min-api.cryptocompare.com/) e na [Coinranking](https://developers.coinranking.com/api) e crie o arquivo `environment.ts` no diretório `environment` :

```typeScript

export const environment = {
  production: true,

  url: {
    baseUrl: 'https://api.coinranking.com/v2/',
    historicalBaseUrl: 'https://min-api.cryptocompare.com/',
    symbolUrl: 'https://data-api.cryptocompare.com',
  },
  tokens: {
    HISTORICALAPI:
     "SUA-CHAVE-COINRANKING",
    ACCESSTOKEN: 'SUA-CHAVE-CRYPTOCOMPARE',
  },
};


```

Instale as dependências:

```
npm install
```

Execute a aplicação:

```
npm run start
```

</details>

<details><summary> <h2>Instruções para rodar com Docker🐋 </h2></summary>

No terminal, clone o projeto:

```
git clone https://github.com/dev-araujo/crypto-angular.git
```

Crie as chaves na [CryptoCompare](https://min-api.cryptocompare.com/) e na [Coinranking](https://developers.coinranking.com/api) e crie o arquivo `environment.ts` no diretório `environment` :

```typeScript

export const environment = {
  production: true,

  url: {
    baseUrl: 'https://api.coinranking.com/v2/',
    historicalBaseUrl: 'https://min-api.cryptocompare.com/',
    symbolUrl: 'https://data-api.cryptocompare.com',
  },
  tokens: {
    HISTORICALAPI:
     "SUA-CHAVE-COINRANKING",
    ACCESSTOKEN: 'SUA-CHAVE-CRYPTOCOMPARE',
  },
};


```

Crie a imagem :

```
docker build -t crypto-app .
```

Execute o container:

```
docker run -p 4201:4200 crypto-app
```

Acesse a aplicação na **porta 4201**

</details>

---

#### Author 👷

<img src="https://user-images.githubusercontent.com/97068163/149033991-781bf8b6-4beb-445a-913c-f05a76a28bfc.png" width="5%" alt="caricatura do autor desse repositório"/>

[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/araujocode/)
