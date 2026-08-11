/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  // Create 'colecoes' collection
  const collection = new Collection({
    "id": "pbc_colecoes_001",
    "name": "colecoes",
    "type": "base",
    "system": false,
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text_nome_01",
        "max": 0,
        "min": 0,
        "name": "nome",
        "pattern": "",
        "presentable": true,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text_slug_02",
        "max": 0,
        "min": 0,
        "name": "slug",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "file_imagem_03",
        "maxSelect": 1,
        "maxSize": 5242880,
        "mimeTypes": [
          "image/jpeg",
          "image/png",
          "image/svg+xml",
          "image/gif",
          "image/webp"
        ],
        "name": "imagem_capa",
        "presentable": false,
        "protected": false,
        "required": false,
        "system": false,
        "thumbs": [],
        "type": "file"
      },
      {
        "hidden": false,
        "id": "bool_ativo_04",
        "name": "ativo",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      }
    ]
  });

  app.save(collection);

  // Update 'products' collection
  const productsCol = app.findCollectionByNameOrId("pbc_4094466480"); // from the previous migration

  productsCol.fields.addAt(productsCol.fields.length, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text_colecoes_ids",
    "max": 0,
    "min": 0,
    "name": "colecoes_ids",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }));

  app.save(productsCol);

}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_colecoes_001");
  if (collection) {
    app.delete(collection);
  }

  const productsCol = app.findCollectionByNameOrId("pbc_4094466480");
  if (productsCol) {
    productsCol.fields.removeById("text_colecoes_ids");
    app.save(productsCol);
  }
})
