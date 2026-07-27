import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function checkTables() {
  const db = await open({
    filename: "../pocketbase/pb_data/logs.db",
    driver: sqlite3.Database
  });
  
  const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");
  console.log(tables);
  
  const logTableName = tables.find(t => t.name.includes("log"))?.name;
  if (logTableName) {
    const logs = await db.all("SELECT * FROM " + logTableName + " ORDER BY rowid DESC LIMIT 5");
    console.log(JSON.stringify(logs, null, 2));
  }
}
checkTables();
