/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  collection.fields.removeByName("tipo_cliente");
  return app.save(collection);
}, (app) => {
  try {

  const collection = app.findCollectionByNameOrId("users");
  collection.fields.add(new SelectField({
    name: "tipo_cliente",
    required: false,
    values: ["varejo", "revendedor"],
    maxSelect: 0
  }));
  return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})