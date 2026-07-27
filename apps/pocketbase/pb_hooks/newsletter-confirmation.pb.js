/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: "contato@avantelingerie.com.br" }],
    subject: "New Newsletter Signup",
    html: "<h2>New Newsletter Signup</h2><p><strong>Email:</strong> " + e.record.get("email") + "</p><p><strong>Signup Date:</strong> " + e.record.get("created") + "</p>"
  });
  $app.newMailClient().send(message);
  e.next();
}, "newsletter_signups");