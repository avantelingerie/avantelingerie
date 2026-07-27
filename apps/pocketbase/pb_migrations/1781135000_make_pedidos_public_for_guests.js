/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pedidos");

  // Make cliente_id optional for guest checkout
  const clienteIdField = collection.fields.getByName("cliente_id");
  if (clienteIdField) {
    clienteIdField.required = false;
  }

  // Make createRule public so guests can place orders
  collection.createRule = "";

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("pedidos");
    
    const clienteIdField = collection.fields.getByName("cliente_id");
    if (clienteIdField) {
      clienteIdField.required = true;
    }
    
    collection.createRule = "@request.auth.id != \"\"";
    
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})
