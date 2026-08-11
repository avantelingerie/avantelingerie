/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4094466480")

  // add field
  collection.fields.addAt(41, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text3737991148",
    "max": 0,
    "min": 0,
    "name": "cross_sell_id",
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
  collection.fields.removeById("text3737991148")

  return app.save(collection)
})
