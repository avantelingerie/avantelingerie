/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const records = app.findRecordsByFilter("solicitacoes_revendedor", "user_id.email ~ 'varejo@test.com' || user_id.email ~ 'revendedor@test.com'");
  for (const record of records) {
    app.delete(record);
  }
}, (app) => {
  // Rollback: record data not stored, manual restore needed
})