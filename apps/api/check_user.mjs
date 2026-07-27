import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function checkUser() {
  const db = await open({
    filename: '../pocketbase/pb_data/data.db',
    driver: sqlite3.Database
  });
  
  const user = await db.get("SELECT id, name, commercial_profile, tipo_cliente, account_level FROM users WHERE id = 'gyq9khwylozm36h'");
  console.log(user);
}
checkUser();
