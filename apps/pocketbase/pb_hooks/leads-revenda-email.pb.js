/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: "revendas@avantelingerie.com.br" }],
    subject: "NOVO LEAD DE ATACADO - " + e.record.get("nome"),
    html: "<h2>Novo cadastro para Revenda/Atacado</h2>" +
          "<p><strong>Nome:</strong> " + e.record.get("nome") + "</p>" +
          "<p><strong>E-mail:</strong> " + e.record.get("email") + "</p>" +
          "<p><strong>WhatsApp:</strong> " + e.record.get("whatsapp") + "</p>" +
          "<p><strong>Status:</strong> " + e.record.get("status") + "</p>" +
          "<br/><p>Acesse o painel do PocketBase para visualizar e aprovar este lead.</p>"
  });
  $app.newMailClient().send(message);
  e.next();
}, "leads_revenda");
