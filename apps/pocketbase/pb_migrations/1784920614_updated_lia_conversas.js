/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_131674275")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text1631579359",
    "max": 0,
    "min": 0,
    "name": "session_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text3783392089",
    "max": 0,
    "min": 0,
    "name": "canal",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "help": "",
    "hidden": false,
    "id": "json4225526390",
    "maxSize": 0,
    "name": "mensagens",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "help": "",
    "hidden": false,
    "id": "bool1999079499",
    "name": "converteu",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "help": "",
    "hidden": false,
    "id": "bool3760000493",
    "name": "assumida_por_humano",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_131674275")

  // remove field
  collection.fields.removeById("text1631579359")

  // remove field
  collection.fields.removeById("text3783392089")

  // remove field
  collection.fields.removeById("json4225526390")

  // remove field
  collection.fields.removeById("bool1999079499")

  // remove field
  collection.fields.removeById("bool3760000493")

  return app.save(collection)
})
