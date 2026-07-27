/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("products");

  const record0 = new Record(collection);
    record0.set("name", "Conjunto em Microfibra Cropped Regata Gola Alta");
    record0.set("description", "Conforto que abra\u00e7a seu corpo e valoriza cada curva sem marcar.");
    record0.set("categoria", "CONJUNTOS");
    record0.set("reference", "AVL0003");
    record0.set("price", 19.9);
    record0.set("price_wholesale", 17.4);
    record0.set("discount_percentage", 64);
    record0.set("avaliacao_media", 4.8);
    record0.set("reviews_count", 1200);
    record0.set("colors", ["#5C4033", "#000000", "#1E3A8A", "#FFB6C1", "#F5F5DC"]);
    record0.set("sizes", ["P", "M", "G", "GG"]);
    record0.set("stock", 12);
    record0.set("vendidos_semana", 1200);
    record0.set("is_promocao", true);
    record0.set("is_novidade", false);
    record0.set("is_combo", false);
    record0.set("gallery", ["https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/c2d4624557c0de0eb4a45ebd8f3f9385.jpg", "https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/021cb0190198eb005ad0498485c5e02a.jpg", "https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/684efea9860acc8caab24e49f3eebf28.jpg", "https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/9331fd1b840bbc52cc06e34b807d7083.jpg"]);
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})