/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("leads_revenda")

  // update
  collection.createRule = "@request.auth.id != \"\""

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("leads_revenda")

  // revert
  collection.createRule = ""

  return app.save(collection)
})
