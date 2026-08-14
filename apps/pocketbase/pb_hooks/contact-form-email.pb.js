/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const subject = e.record.get("subject");
  
  // Roteamento inteligente baseado na intenção
  let targetEmail = "contato@avantelingerie.com.br";
  if (subject === "Dúvida sobre pedido" || subject === "Prazo de entrega") {
    targetEmail = "pedidos@avantelingerie.com.br";
  } else if (subject === "Troca ou devolução") {
    targetEmail = "trocas@avantelingerie.com.br";
  } else if (subject === "Financeiro / Pagamento") {
    targetEmail = "financeiro@avantelingerie.com.br";
  } else if (subject === "Marketing / Parcerias") {
    targetEmail = "marketing@avantelingerie.com.br";
  } else if (subject === "Privacidade (LGPD)") {
    targetEmail = "privacidade@avantelingerie.com.br";
  } else if (subject === "Atacado / Revendas") {
    targetEmail = "revendas@avantelingerie.com.br";
  }
  
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: targetEmail }],
    subject: "Nova mensagem de contato - " + subject,
    html: "<h2>Nova mensagem de contato</h2>" +
          "<p><strong>Nome:</strong> " + e.record.get("name") + "</p>" +
          "<p><strong>Email:</strong> " + e.record.get("email") + "</p>" +
          "<p><strong>Telefone:</strong> " + e.record.get("phone") + "</p>" +
          (e.record.get("order_number") ? "<p><strong>Número do Pedido:</strong> " + e.record.get("order_number") + "</p>" : "") +
          "<p><strong>Assunto:</strong> " + subject + "</p>" +
          "<p><strong>Mensagem:</strong></p>" +
          "<p>" + e.record.get("message").replace(/\n/g, "<br>") + "</p>"
  });
  $app.newMailClient().send(message);
  e.next();
}, "contact_messages");