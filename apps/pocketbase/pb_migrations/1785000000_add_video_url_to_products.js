/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("products");

  // Adiciona a coluna video_url
  collection.fields.push(new Field({
    "hidden": false,
    "id": "urlvideo00000",
    "name": "video_url",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "url",
    "exceptDomains": [],
    "onlyDomains": []
  }));

  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("products");
  collection.fields.removeById("urlvideo00000");
  app.save(collection);
});
