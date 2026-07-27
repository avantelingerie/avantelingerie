/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("configuracoes_estoque");

  const existing = collection.fields.getByName("facebook_url");
  if (existing) {
    if (existing.type === "text") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("facebook_url"); // exists with wrong type, remove first
  }

  collection.fields.add(new TextField({
    name: "facebook_url",
    required: false
  }));

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("configuracoes_estoque");
    collection.fields.removeByName("facebook_url");
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})