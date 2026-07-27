/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const categoriasCollection = app.findCollectionByNameOrId("categorias");
  const collection = app.findCollectionByNameOrId("products");

  const existing = collection.fields.getByName("categoria_id");
  if (existing) {
    if (existing.type === "relation") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("categoria_id"); // exists with wrong type, remove first
  }

  collection.fields.add(new RelationField({
    name: "categoria_id",
    required: true,
    collectionId: categoriasCollection.id
  }));

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("products");
    collection.fields.removeByName("categoria_id");
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})