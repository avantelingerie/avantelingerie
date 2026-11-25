/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  try {
    app.db().newQuery("UPDATE products SET is_promocao = 1 WHERE is_favorito = 1").execute();
  } catch (err) {
    console.log("[Migration] Erro ao migrar favoritos para promocoes:", err);
  }
}, (app) => {
  // no-op
});
