/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("products");
  const field = collection.fields.getByName("image");
  
  if (field) {
    // Definindo tamanho máximo para 30MB (30 * 1024 * 1024 bytes)
    field.maxSize = 31457280;
    
    // Adicionando suporte a vídeos
    field.mimeTypes = [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/webm",
      "video/quicktime"
    ];
  }
  
  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("products");
    const field = collection.fields.getByName("image");
    
    if (field) {
      // Revertendo para 20MB e apenas imagens
      field.maxSize = 20971520;
      field.mimeTypes = [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ];
    }
    
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      return;
    }
    throw e;
  }
})
