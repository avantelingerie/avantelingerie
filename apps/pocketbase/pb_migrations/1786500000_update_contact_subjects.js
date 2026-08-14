/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("contact_messages");

  // Update the select field 'subject'
  const subjectField = collection.fields.getById("select2120338704");
  subjectField.values = [
    "Dúvida sobre pedido",
    "Prazo de entrega",
    "Troca ou devolução",
    "Financeiro / Pagamento",
    "Marketing / Parcerias",
    "Privacidade (LGPD)",
    "Atacado / Revendas",
    "Outro assunto",
    "Pagamento" // keeping old one just in case
  ];
  
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("contact_messages");
  const subjectField = collection.fields.getById("select2120338704");
  subjectField.values = [
    "Dúvida sobre pedido",
    "Prazo de entrega",
    "Troca ou devolução",
    "Pagamento",
    "Outro assunto"
  ];
  
  return app.save(collection);
})
