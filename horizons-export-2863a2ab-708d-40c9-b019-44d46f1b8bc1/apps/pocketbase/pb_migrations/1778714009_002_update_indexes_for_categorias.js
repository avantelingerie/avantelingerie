/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("categorias");
  collection.indexes.push("CREATE UNIQUE INDEX idx_categorias_nome ON categorias (nome)");
  collection.indexes.push("CREATE UNIQUE INDEX idx_categorias_slug ON categorias (slug)");
  return app.save(collection);
}, (app) => {
  try {
  const collection = app.findCollectionByNameOrId("categorias");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_categorias_nome"));
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_categorias_slug"));
  return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})