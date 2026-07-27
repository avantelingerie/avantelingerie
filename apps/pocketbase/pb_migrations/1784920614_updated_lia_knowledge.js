/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1723457601")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text393297498",
    "max": 0,
    "min": 0,
    "name": "titulo",
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
    "id": "text4199158776",
    "max": 0,
    "min": 0,
    "name": "conteudo",
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
    "id": "bool1698942013",
    "name": "ativo",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "help": "",
    "hidden": false,
    "id": "date679928944",
    "max": "",
    "min": "",
    "name": "data_expiracao",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1723457601")

  // remove field
  collection.fields.removeById("text393297498")

  // remove field
  collection.fields.removeById("text4199158776")

  // remove field
  collection.fields.removeById("bool1698942013")

  // remove field
  collection.fields.removeById("date679928944")

  return app.save(collection)
})
