import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function checkLogs() {
  const db = await open({
    filename: '../pocketbase/pb_data/logs.db',
    driver: sqlite3.Database
  });
  const rows = await db.all("SELECT json_extract(data, '$.error') as error, json_extract(data, '$.message') as message, created FROM _logs WHERE level >= 0 ORDER BY created DESC LIMIT 5");
  console.log(JSON.stringify(rows, null, 2));
}
checkLogs();
