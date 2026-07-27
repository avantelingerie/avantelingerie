/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("solicitacoes_revendedor");

  const statusField = collection.fields.find(field => field.name === "status");
  if (statusField) {
    statusField.values = ["pendente", "em_analise", "aprovado", "rejeitado", "aprovado_automaticamente"];
  }

  collection.updateRule = "@request.auth.id != \"\"";

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("solicitacoes_revendedor");

    const statusField = collection.fields.find(field => field.name === "status");
    if (statusField) {
      statusField.values = ["aprovado_automaticamente"];
    }

    collection.updateRule = null;

    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
});
