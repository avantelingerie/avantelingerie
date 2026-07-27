/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "id": "pbc_leads_abandono",
    "name": "leads_abandono",
    "type": "base",
    "createRule": "", // Allow anyone (guests) to create a lead
    "listRule": "@request.auth.id != \"\"", // Admins/internal staff can list
    "viewRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\"",
    "deleteRule": "@request.auth.role = 'admin'",
    "fields": [
      {
        "name": "id",
        "type": "text",
        "primaryKey": true,
        "required": true,
        "system": true,
        "autogeneratePattern": "[a-z0-9]{15}"
      },
      {
        "name": "nome",
        "type": "text",
        "required": false
      },
      {
        "name": "email",
        "type": "email",
        "required": true
      },
      {
        "name": "whatsapp",
        "type": "text",
        "required": false
      },
      {
        "name": "valor_carrinho",
        "type": "number",
        "required": false
      },
      {
        "name": "itens_carrinho",
        "type": "json",
        "required": false
      },
      {
        "name": "created",
        "type": "autodate",
        "onCreate": true
      },
      {
        "name": "updated",
        "type": "autodate",
        "onCreate": true,
        "onUpdate": true
      }
    ]
  });

  try {
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("Collection name must be unique")) {
      console.log("Collection already exists, skipping");
      return;
    }
    throw e;
  }
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("pbc_leads_abandono");
    return app.delete(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})
