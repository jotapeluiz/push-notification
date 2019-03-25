# README
Projeto de exemplo de como usar push notification usando o serviço de Cloud Messaging do Firebase.

## Configuração

Crie um projeto no [Firebase](https://console.firebase.google.com/).

Acesse o arquivo /src/init.js e insira o messagingSenderId:
```javascript
const config = {
  messagingSenderId: "<MESSAGING_SENDER_ID>"
}
```
Já no arquivo notification.js a chave do servidor:
```javascript
headers: {
  Authorization: "key=<CHAVE_SERVIDOR>"
}
```

## Execução
É preciso rodar a página em um servidor para funcionar aqui tem algumas opções:

 * [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/related)
 * [Atom Live Server](https://atom.io/packages/atom-live-server)
 * [Live Server (VS Code)](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
