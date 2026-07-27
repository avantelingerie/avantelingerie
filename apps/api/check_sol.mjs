import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function checkSolicitacao() {
  const db = await open({
    filename: '../pocketbase/pb_data/data.db',
    driver: sqlite3.Database
  });
  
  const docs = await db.all("SELECT id, user_id, cpf_cnpj, status FROM solicitacoes_revendedor ORDER BY created DESC LIMIT 5");
  console.log(docs);
}
checkSolicitacao();
