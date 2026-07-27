/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("products");

  const record0 = new Record(collection);
    record0.set("name", "Conjunto em Microfibra Cropped Regata Gola Alta");
    record0.set("description", "Conforto que abra\u00e7a seu corpo e valoriza cada curva sem marcar.");
    record0.set("categoria", "CONJUNTOS");
    record0.set("price", 19.9);
    record0.set("avaliacao_media", 4.8);
    record0.set("vendidos_semana", 1200);
    record0.set("is_promocao", true);
    record0.set("is_novidade", false);
    record0.set("is_combo", false);
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