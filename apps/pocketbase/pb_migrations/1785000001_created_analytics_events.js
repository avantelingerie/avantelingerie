/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": "",
    "deleteRule": "@request.auth.id != \"\"",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "text1111111111",
        "name": "session_id",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text",
        "autogeneratePattern": "",
        "max": 0,
        "min": 0,
        "pattern": ""
      },
      {
        "hidden": false,
        "id": "text2222222222",
        "name": "event_type",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text",
        "autogeneratePattern": "",
        "max": 0,
        "min": 0,
        "pattern": ""
      },
      {
        "hidden": false,
        "id": "text3333333333",
        "name": "page_path",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text",
        "autogeneratePattern": "",
        "max": 0,
        "min": 0,
        "pattern": ""
      },
      {
        "hidden": false,
        "id": "text4444444444",
        "name": "item_id",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text",
        "autogeneratePattern": "",
        "max": 0,
        "min": 0,
        "pattern": ""
      },
      {
        "hidden": false,
        "id": "number5555555555",
        "name": "value",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "number",
        "max": null,
        "min": null,
        "onlyInt": false
      },
      {
        "hidden": false,
        "id": "text6666666666",
        "name": "utm_source",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text",
        "autogeneratePattern": "",
        "max": 0,
        "min": 0,
        "pattern": ""
      },
      {
        "hidden": false,
        "id": "text7777777777",
        "name": "utm_medium",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text",
        "autogeneratePattern": "",
        "max": 0,
        "min": 0,
        "pattern": ""
      },
      {
        "hidden": false,
        "id": "text8888888888",
        "name": "utm_campaign",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text",
        "autogeneratePattern": "",
        "max": 0,
        "min": 0,
        "pattern": ""
      },
      {
        "hidden": false,
        "id": "autodate1",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate2",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_analytics_events",
    "indexes": [],
    "listRule": "@request.auth.id != \"\"",
    "name": "analytics_events",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": "@request.auth.id != \"\""
  });

  try {
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("Collection name must be unique")) {
      console.log("Collection already exists, skipping");
      return;
    }
    throw e;
  }
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("pbc_analytics_events");
    return app.delete(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})
