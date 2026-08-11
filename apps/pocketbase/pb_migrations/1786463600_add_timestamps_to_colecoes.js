/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("colecoes");
  
  collection.fields.addAt(collection.fields.length, new Field({
    "hidden": false,
    "id": "autodate_created_99",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }));
  
  collection.fields.addAt(collection.fields.length, new Field({
    "hidden": false,
    "id": "autodate_updated_99",
    "name": "updated",
    "onCreate": true,
    "onUpdate": true,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }));
  
  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("colecoes");
    
    collection.fields.removeById("autodate_created_99");
    collection.fields.removeById("autodate_updated_99");
    
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})
