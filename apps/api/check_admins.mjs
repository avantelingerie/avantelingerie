import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function checkAdmins() {
  const db = await open({
    filename: '../pocketbase/pb_data/data.db',
    driver: sqlite3.Database
  });
  
  const admins = await db.all("SELECT email FROM _superusers");
  console.log(admins);
}
checkAdmins();
