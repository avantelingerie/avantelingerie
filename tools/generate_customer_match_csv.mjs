import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';

const POCKETBASE_URL = 'https://avantelingerie.com.br/hcgi/platform';
const PB_EMAIL = process.env.PB_SUPERUSER_EMAIL || 'admin@avantelingerie.com.br';
const PB_PASSWORD = process.env.PB_SUPERUSER_PASSWORD || 'Admin@123456';

function formatPhone(phone) {
  if (!phone) return '';
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('55') && (digits.length === 12 || digits.length === 13)) {
    return `+${digits}`;
  }
  if (digits.length === 10 || digits.length === 11) {
    return `+55${digits}`;
  }
  return `+${digits}`;
}

function formatZip(cep) {
  if (!cep) return '';
  return String(cep).replace(/\D/g, '');
}

function parseName(fullName) {
  if (!fullName) return { firstName: '', lastName: '' };
  const parts = String(fullName).trim().split(/\s+/);
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';
  return { firstName, lastName };
}

async function run() {
  console.log('Conectando ao PocketBase de produção:', POCKETBASE_URL);
  const pb = new PocketBase(POCKETBASE_URL);
  pb.autoCancellation(false);

  try {
    await pb.collection('_superusers').authWithPassword(PB_EMAIL, PB_PASSWORD);
    console.log('Autenticado com sucesso como Superuser no PocketBase.');
  } catch (err) {
    console.error('Falha na autenticação como Superuser:', err.message);
    return;
  }

  const clientsMap = new Map();

  function addClient({ email, phone, name, zip, source }) {
    const cleanEmail = email ? String(email).trim().toLowerCase() : '';
    const cleanPhone = formatPhone(phone);
    const { firstName, lastName } = parseName(name);
    const cleanZip = formatZip(zip);

    // Precisa de pelo menos email ou telefone
    if (!cleanEmail && !cleanPhone) return;

    const key = cleanEmail || cleanPhone;
    if (!clientsMap.has(key)) {
      clientsMap.set(key, {
        email: cleanEmail,
        phone: cleanPhone,
        firstName,
        lastName,
        country: 'BR',
        zip: cleanZip,
        source
      });
    } else {
      // Complementa dados se faltavam
      const existing = clientsMap.get(key);
      if (!existing.phone && cleanPhone) existing.phone = cleanPhone;
      if (!existing.email && cleanEmail) existing.email = cleanEmail;
      if (!existing.firstName && firstName) existing.firstName = firstName;
      if (!existing.lastName && lastName) existing.lastName = lastName;
      if (!existing.zip && cleanZip) existing.zip = cleanZip;
    }
  }

  // 1. Buscar da coleção 'users'
  try {
    const users = await pb.collection('users').getFullList();
    console.log(`Carregados ${users.length} usuários de 'users'`);
    users.forEach(u => {
      addClient({
        email: u.email,
        phone: u.whatsapp || u.telefone,
        name: u.name || u.nome,
        zip: u.cep,
        source: 'users'
      });
    });
  } catch (e) {
    console.warn("Aviso ao buscar 'users':", e.message);
  }

  // 2. Buscar da coleção 'pedidos'
  try {
    const pedidos = await pb.collection('pedidos').getFullList();
    console.log(`Carregados ${pedidos.length} pedidos de 'pedidos'`);
    pedidos.forEach(p => {
      const email = p.cliente_email || p.email || p.customer_email;
      const phone = p.cliente_telefone || p.telefone || p.whatsapp || p.customer_phone;
      const name = p.cliente_nome || p.nome || p.customer_name;
      const zip = p.endereco_entrega?.cep || p.cep;
      addClient({
        email,
        phone,
        name,
        zip,
        source: 'pedidos'
      });
    });
  } catch (e) {
    console.warn("Aviso ao buscar 'pedidos':", e.message);
  }

  // 3. Buscar da coleção 'solicitacoes_revendedor'
  try {
    const revs = await pb.collection('solicitacoes_revendedor').getFullList();
    console.log(`Carregadas ${revs.length} solicitações de 'solicitacoes_revendedor'`);
    revs.forEach(r => {
      addClient({
        email: r.email,
        phone: r.whatsapp || r.telefone,
        name: r.nome || r.name,
        zip: r.cep,
        source: 'revendedor'
      });
    });
  } catch (e) {
    console.warn("Aviso ao buscar 'solicitacoes_revendedor':", e.message);
  }

  // 4. Buscar da coleção 'leads_abandono'
  try {
    const abandonos = await pb.collection('leads_abandono').getFullList();
    console.log(`Carregados ${abandonos.length} abandonos de 'leads_abandono'`);
    abandonos.forEach(l => {
      addClient({
        email: l.email,
        phone: l.telefone || l.whatsapp,
        name: l.nome,
        zip: l.cep,
        source: 'abandono'
      });
    });
  } catch (e) {
    console.warn("Aviso ao buscar 'leads_abandono':", e.message);
  }

  console.log(`Total de clientes únicos processados para o Google Ads: ${clientsMap.size}`);

  // Cabeçalho oficial aceito pelo Google Ads Customer Match
  // https://support.google.com/google-ads/answer/7474263
  const headers = ['Email', 'Phone', 'First Name', 'Last Name', 'Country', 'Zip'];
  const csvLines = [headers.join(',')];

  for (const client of clientsMap.values()) {
    // Sanitização para CSV: aspas duplas escapadas
    const escapeCsv = (val) => {
      if (!val) return '';
      const str = String(val).replace(/"/g, '""');
      return str.includes(',') ? `"${str}"` : str;
    };

    const row = [
      escapeCsv(client.email),
      escapeCsv(client.phone),
      escapeCsv(client.firstName),
      escapeCsv(client.lastName),
      escapeCsv(client.country),
      escapeCsv(client.zip)
    ];
    csvLines.push(row.join(','));
  }

  const csvContent = csvLines.join('\r\n');
  const outputPath = path.resolve('google_ads_clientes_avante.csv');
  fs.writeFileSync(outputPath, csvContent, 'utf-8');

  console.log(`Arquivo CSV gerado com sucesso em: ${outputPath}`);
  console.log('Linhas geradas:', csvLines.length);
}

run();
