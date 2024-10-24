# Crypto-Angular
  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=5965E0&labelColor=121214" alt="License">


## 💻 Projeto

#### Um projeto para listar informações sobre crypto.

> Em construção

- O resultado pode ser conferido :arrow_right: [**AQUI**](https://crypto-angular.vercel.app/)

<h1 align="center">

 ![image](https://github.com/dev-araujo/cryptocurrency/assets/97068163/7a451b8e-9f68-47e2-93df-fe39da4a8887)

![image](https://github.com/dev-araujo/cryptocurrency/assets/97068163/34a71bf4-97a4-449b-919b-6c71b0907241)

</h1>


## Feito com 🔨
- **Angular +2**

### Consumindo as APIs:
- [Coinranking](https://developers.coinranking.com/api)
- [CryptoCompare](https://min-api.cryptocompare.com/)

<details><summary> <h2>Instruções para rodar local</h2></summary>

Por ser um projeto realizado com **Angular**, há a necessidade do **NodeJS**. Com ele instalado basta seguir os seguintes passos.

No terminal, clone o projeto:
```
git clone 
```

Crie um diretório na raiz chamado config com um arquivo ts chamado config
```
/config > config.ts
```

Crie as chaves na  [CryptoCompare](https://min-api.cryptocompare.com/) e na [Coinranking](https://developers.coinranking.com/api) e as defina no **config.ts**:

```typeScript

export const ACCESSTOKEN = "SUA-CHAVE-CRYPTOCOMPARE"
export const ACCESSTOKENBACKUP ="SUA-CHAVE-CRYPTOCOMPARE"
export const HISTORICALAPI = "SUA-CHAVE-COINRANKING"

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
git clone 
```

Crie um diretório na raiz chamado config com um arquivo ts chamado config
```
/config > config.ts
```

Crie as chaves na  [CryptoCompare](https://min-api.cryptocompare.com/) e na [Coinranking](https://developers.coinranking.com/api) e as defina no **config.ts**:

```typeScript

export const ACCESSTOKEN = "SUA-CHAVE-CRYPTOCOMPARE"
export const ACCESSTOKENBACKUP ="SUA-CHAVE-CRYPTOCOMPARE"
export const HISTORICALAPI = "SUA-CHAVE-COINRANKING"

```


Crie a imagem :
```
docker build -t crypto-app .
```

Execute o container:

```
docker run -p 4201:4200 angular-docker
```

Acesse a aplicação na **porta 4201**
</details>

----

#### Author 👷

<img src="https://user-images.githubusercontent.com/97068163/149033991-781bf8b6-4beb-445a-913c-f05a76a28bfc.png" width="5%" alt="caricatura do autor desse repositório"/>

[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/araujocode/)
