/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4094466480")

  // add field
  collection.fields.addAt(43, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text3659418681",
    "max": 0,
    "min": 0,
    "name": "seo_title",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(44, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text2382431769",
    "max": 0,
    "min": 0,
    "name": "seo_meta_description",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4094466480")

  // remove field
  collection.fields.removeById("text3659418681")

  // remove field
  collection.fields.removeById("text2382431769")

  return app.save(collection)
})
