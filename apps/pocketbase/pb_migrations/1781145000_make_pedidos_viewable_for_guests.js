/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pedidos");

  // Make viewRule public so guests can view their order status/confirmation page by ID
  collection.viewRule = "";

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("pedidos");
    
    collection.viewRule = "@request.auth.id != \"\"";
    
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})
