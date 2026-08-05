/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3849271720")

  // add field
  collection.fields.addAt(23, new Field({
    "help": "",
    "hidden": false,
    "id": "bool1716304198",
    "name": "recuperacao_enviada",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3849271720")

  // remove field
  collection.fields.removeById("bool1716304198")

  return app.save(collection)
})
