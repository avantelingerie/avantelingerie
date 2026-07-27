/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("configuracoes_estoque");

  const existing = collection.fields.getByName("limite_upgrade_revenda");
  if (existing) {
    if (existing.type === "number") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("limite_upgrade_revenda"); // exists with wrong type, remove first
  }

  collection.fields.add(new NumberField({
    name: "limite_upgrade_revenda",
    required: false
  }));

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("configuracoes_estoque");
    collection.fields.removeByName("limite_upgrade_revenda");
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})