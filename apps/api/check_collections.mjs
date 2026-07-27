import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function checkCollections() {
  const db = await open({
    filename: '../pocketbase/pb_data/data.db',
    driver: sqlite3.Database
  });
  
  // Get products collection
  const products = await db.get("SELECT * FROM _collections WHERE name = 'products'");
  console.log(JSON.stringify(products, null, 2));
}
checkCollections();
