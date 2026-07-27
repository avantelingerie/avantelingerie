/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("configuracoes_estoque");

  const existing = collection.fields.getByName("email_contato");
  if (existing) {
    if (existing.type === "email") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("email_contato"); // exists with wrong type, remove first
  }

  collection.fields.add(new EmailField({
    name: "email_contato",
    required: false
  }));

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("configuracoes_estoque");
    collection.fields.removeByName("email_contato");
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})