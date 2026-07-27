import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function testAuth() {
  try {
    console.log('Tentando logar...');
    const authData = await pb.collection('usuarios').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456', { $autoCancel: false });
    console.log('Login SUCESSO:', authData.record.email);
  } catch (e) {
    console.error('Login FALHOU:', e.response || e.message);
  }
}

testAuth();
