async function getLogs() {
  const authRes = await fetch('http://127.0.0.1:8090/api/collections/_superusers/auth-with-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: 'test@test.com', password: 'Test123456789!' })
  });
  const authData = await authRes.json();
  const token = authData.token;

  const logsRes = await fetch('http://127.0.0.1:8090/api/logs?filter=level>=0&sort=-created', {
    headers: { 'Authorization': token }
  });
  const logsData = await logsRes.json();
  
  const errors = logsData.items.filter(item => item.level >= 0 && item.data && item.data.status === 400);
  console.log(JSON.stringify(errors.slice(0, 5), null, 2));
}
getLogs();
