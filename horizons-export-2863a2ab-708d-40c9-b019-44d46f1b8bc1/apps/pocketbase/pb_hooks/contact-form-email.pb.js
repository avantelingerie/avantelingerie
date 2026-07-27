/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: "contato@avantelingerie.com.br" }],
    subject: "Nova mensagem de contato - " + e.record.get("subject"),
    html: "<h2>Nova mensagem de contato</h2>" +
          "<p><strong>Nome:</strong> " + e.record.get("name") + "</p>" +
          "<p><strong>Email:</strong> " + e.record.get("email") + "</p>" +
          "<p><strong>Telefone:</strong> " + e.record.get("phone") + "</p>" +
          (e.record.get("order_number") ? "<p><strong>Número do Pedido:</strong> " + e.record.get("order_number") + "</p>" : "") +
          "<p><strong>Assunto:</strong> " + e.record.get("subject") + "</p>" +
          "<p><strong>Mensagem:</strong></p>" +
          "<p>" + e.record.get("message").replace(/\n/g, "<br>") + "</p>"
  });
  $app.newMailClient().send(message);
  e.next();
}, "contact_messages");