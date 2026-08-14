/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  let emailStr = "";
  try {
    const user = $app.findRecordById("users", e.record.get("user_id"));
    emailStr = user.get("email");
  } catch(err) {
    // silently fail
  }

  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: "revendas@avantelingerie.com.br" }],
    subject: "NOVO LEAD DE ATACADO - " + e.record.get("nome"),
    html: "<h2>Novo cadastro para Revenda/Atacado</h2>" +
          "<p><strong>Nome:</strong> " + e.record.get("nome") + "</p>" +
          "<p><strong>E-mail (Conta Associada):</strong> " + emailStr + "</p>" +
          "<p><strong>WhatsApp:</strong> " + e.record.get("whatsapp") + "</p>" +
          "<p><strong>Já revende?:</strong> " + e.record.get("ja_revende") + "</p>" +
          "<br/><p>Acesse o painel do PocketBase para visualizar e aprovar este lead.</p>"
  });
  $app.newMailClient().send(message);
  e.next();
}, "solicitacoes_revendedor");
