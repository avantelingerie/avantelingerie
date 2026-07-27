/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("leads_prelancamento");
  collection.indexes.push("CREATE UNIQUE INDEX idx_leads_prelancamento_email ON leads_prelancamento (email)");
  return app.save(collection);
}, (app) => {
  try {
  const collection = app.findCollectionByNameOrId("leads_prelancamento");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_leads_prelancamento_email"));
  return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})