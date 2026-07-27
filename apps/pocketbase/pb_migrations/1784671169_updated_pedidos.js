/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3849271720")

  // add field
  collection.fields.addAt(22, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text1290512859",
    "max": 0,
    "min": 0,
    "name": "bling_pedido_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3849271720")

  // remove field
  collection.fields.removeById("text1290512859")

  return app.save(collection)
})
