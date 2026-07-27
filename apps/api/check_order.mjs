import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function checkOrder() {
  const db = await open({
    filename: '../pocketbase/pb_data/data.db',
    driver: sqlite3.Database
  });
  
  const order = await db.get("SELECT id, itens FROM pedidos ORDER BY created DESC LIMIT 1");
  console.log(order);
}
checkOrder();
