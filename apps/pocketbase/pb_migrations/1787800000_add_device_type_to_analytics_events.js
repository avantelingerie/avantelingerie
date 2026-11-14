/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  try {
    const collection = app.findCollectionByNameOrId("analytics_events");
    const exists = collection.fields.getByName("device_type");
    if (!exists) {
      collection.fields.push(new Field({
        "hidden": false,
        "id": "text_device_type",
        "name": "device_type",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text",
        "autogeneratePattern": "",
        "max": 50,
        "min": 0,
        "pattern": ""
      }));
      app.save(collection);
    }
  } catch (e) {
    console.log("Migration add_device_type notice:", e.message);
  }
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("analytics_events");
    collection.fields.removeByName("device_type");
    app.save(collection);
  } catch (e) {}
});
