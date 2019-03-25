const txtToken       = $("#token");
const txtTitle       = $("#title");
const txtMessage     = $("#message");
const btnSend        = $("#send");
const btnNotificacao = $("#notificacao");

const messaging = firebase.messaging();

function showToken(token) {
  txtToken.val(token);
  btnNotificacao.text("Notificações Habilitadas");
  btnNotificacao.attr("disabled", true);
  btnSend.attr("disabled", false);
}

function hideToken() {
  txtToken.val("Nenhum token encontrado");
  btnNotificacao.attr("disabled", false);
  btnNotificacao.text("Habilitar Notificações");
  btnSend.attr("disabled", true);
}

function getNotificationData() {
  return {
    to: txtToken.val(),
    data: {
      notification: {
        title: txtTitle.val(),
        body: txtMessage.val(),
        click_action: window.location.origin,
        icon: window.location.origin + "/img/icon.png"
      }
    }
  };
}

function requestToken() {
  messaging.getToken().then(function(token) {
    showToken(token);
  }).catch(function(error) {
    console.error("Um erro ocorreu ao recuperar o token:", error);
  });
}

function requestPermission() {
  messaging.requestPermission().then(function() {
    requestToken();
  }).catch(function(error) {
    console.error("Ocorreu um erro ao solicitar permissão:", error);
  });
}

function sendMessage() {
  $.ajax({
    type: "POST",
    url: "https://fcm.googleapis.com/fcm/send",
    headers: {
      Authorization: "key=<CHAVE_SERVIDOR>"
    },
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(getNotificationData()),
    success: function () {
      txtTitle.val("");
      txtMessage.val("");
    },
    error: function(xhr, status, error) {
      alert("Houve um erro ao enviar a mensagem!");
      console.error("Status:", status, xhr.error);
    }
  });
}

messaging.onMessage(function(payload) {
  const data = JSON.parse(payload.data.notification);
  const notification = new Notification(data.title, data);

  notification.onclick = function(event) {
    event.preventDefault();
    window.open(data.click_action, "_blank");
    this.close();
  }
});
