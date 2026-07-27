/// <reference path="../pb_data/types.d.ts" />

migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId("categorias");

    const existing = collection.fields.getByName("ncm");
    if (existing) {
      if (existing.type === "text") return;
      collection.fields.removeByName("ncm");
    }

    collection.fields.add(
      new TextField({
        name: "ncm",
        required: false,
      }),
    );
    app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId("categorias");
    collection.fields.removeByName("ncm");
    app.save(collection);
  },
);
