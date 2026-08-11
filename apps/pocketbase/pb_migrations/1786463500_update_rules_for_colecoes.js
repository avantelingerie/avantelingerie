/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("colecoes");
  
  // Set rules to allow authenticated users to manage collections
  collection.createRule = "@request.auth.id != \"\"";
  collection.updateRule = "@request.auth.id != \"\"";
  collection.deleteRule = "@request.auth.id != \"\"";
  
  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("colecoes");
    
    // Revert to admin-only (null)
    collection.createRule = null;
    collection.updateRule = null;
    collection.deleteRule = null;
    
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})
