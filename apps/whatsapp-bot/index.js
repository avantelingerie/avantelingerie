const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const API_URL = process.env.API_URL || 'http://api:3000'; // Usa o nome do container da API
const MEDIA_DIR = process.env.MEDIA_DIR || '/var/www/public_media/imagens';

console.log('Iniciando o Porteiro (WhatsApp Bot)...');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('QR Code gerado! Salvando na pasta de mídias para a patroa escanear...');
    
    // Certifique-se de que o diretório existe
    if (!fs.existsSync(MEDIA_DIR)){
        fs.mkdirSync(MEDIA_DIR, { recursive: true });
    }

    const qrPath = path.join(MEDIA_DIR, 'qr.png');
    
    qrcode.toFile(qrPath, qr, {
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
    }, function (err) {
        if (err) throw err;
        console.log(`QR Code salvo em: ${qrPath}`);
        console.log('Acesse o link do QR Code no navegador para escanear!');
    });
});

client.on('ready', () => {
    console.log('Porteiro conectado e pronto para trabalhar!');
    // Remove o QR code para não confundir depois
    const qrPath = path.join(MEDIA_DIR, 'qr.png');
    if (fs.existsSync(qrPath)) {
        fs.unlinkSync(qrPath);
    }
});

client.on('message', async msg => {
    // Ignora mensagens de grupos ou status
    if (msg.from === 'status@broadcast' || msg.from.includes('@g.us')) return;

    // Ignora mensagens enviadas pelo próprio bot (se estivesse rodando)
    if (msg.fromMe) return;

    console.log(`Mensagem recebida de ${msg.from}: ${msg.body}`);

    try {
        // Envia para o Cérebro (nossa API)
        const response = await axios.post(`${API_URL}/api/lia/whatsapp-webhook`, {
            telefone: msg.from,
            mensagem: msg.body,
            nome_cliente: msg._data.notifyName || 'Cliente'
        });

        // O cérebro nos diz o que responder
        if (response.data && response.data.resposta) {
            // Se o cérebro disser que foi "assumida_por_humano", a resposta pode vir vazia ou com uma flag
            if (response.data.ignorar) {
                console.log(`Silêncio: A conversa com ${msg.from} foi assumida por um humano.`);
                return;
            }
            
            // Porteiro responde
            await msg.reply(response.data.resposta);
        }

    } catch (error) {
        console.error('Erro ao falar com o Cérebro:', error.message);
    }
});

client.initialize();
