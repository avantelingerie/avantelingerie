const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const API_URL = process.env.API_URL || 'http://api:3000'; // Usa o nome do container da API
const MEDIA_DIR = process.env.MEDIA_DIR || '/var/www/public_media/imagens';

console.log('Iniciando o Porteiro (WhatsApp Bot)...');

const flagPath = path.join(__dirname, '.reset_flag');
const authPath = path.join(__dirname, '.wwebjs_auth');

// Limpeza de travas fantasmas do Chromium sempre que o container iniciar (Causa Raiz Code 21)
// NOTA: SingletonLock no Linux é um symlink que fica "quebrado" quando o processo morre.
// fs.existsSync() retorna false para symlinks quebrados! Por isso, devemos apagar de forma cega.
const sessionPath = path.join(authPath, 'session');
if (fs.existsSync(sessionPath)) {
    const lockPath = path.join(sessionPath, 'SingletonLock');
    const cookiePath = path.join(sessionPath, 'SingletonCookie');
    
    try { fs.unlinkSync(lockPath); console.log('Trava SingletonLock removida com sucesso no boot.'); } catch(e) { }
    try { fs.unlinkSync(cookiePath); console.log('Trava SingletonCookie removida com sucesso no boot.'); } catch(e) { }
}

if (fs.existsSync(flagPath)) {
    console.log('Detectada flag de reset! Apagando a sessão anterior de forma ultra limpa...');
    const { execSync } = require('child_process');
    try {
        execSync(`rm -rf ${authPath}/* ${authPath}/.[!.]*`, { stdio: 'ignore' });
    } catch (err) {
        console.error('Aviso: falha ao usar rm -rf no boot, ignorando...', err.message);
    }
    fs.unlinkSync(flagPath);
    console.log('Limpeza concluída. Prosseguindo com a inicialização normal...');
}

let botState = 'STARTING';

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    }
});

client.on('qr', (qr) => {
    botState = 'QR_READY';
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
    botState = 'CONNECTED';
    console.log('Porteiro conectado e pronto para trabalhar!');
    // Remove o QR code para não confundir depois
    const qrPath = path.join(MEDIA_DIR, 'qr.png');
    if (fs.existsSync(qrPath)) {
        fs.unlinkSync(qrPath);
    }
});

client.on('disconnected', (reason) => {
    botState = 'DISCONNECTED';
    console.log(`Porteiro desconectado. Motivo: ${reason}`);
});
// Cache para evitar mensagens duplicadas (bug do whatsapp-web.js com Multi-Device)
const processedMessageIds = new Set();
const maxCacheSize = 500;

client.on('message', async msg => {
    // Evita processar a exata mesma mensagem mais de uma vez
    if (processedMessageIds.has(msg.id.id)) return;
    
    // Adiciona ao cache
    processedMessageIds.add(msg.id.id);
    if (processedMessageIds.size > maxCacheSize) {
        // Remove o mais antigo (o Set mantem a ordem de inserção)
        const first = processedMessageIds.values().next().value;
        processedMessageIds.delete(first);
    }
    // Ignora mensagens de grupos ou status
    if (msg.from === 'status@broadcast' || msg.from.includes('@g.us')) return;

    // Ignora mensagens enviadas pelo próprio bot (se estivesse rodando)
    if (msg.fromMe) return;

    console.log(`Mensagem recebida de ${msg.from}: ${msg.body}`);

    try {
        // Envia para o Cérebro (nossa API)
        const response = await axios.post(`${API_URL}/lia/whatsapp-webhook`, {
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

// Mini-servidor Express para ouvir comandos de dentro do Docker (da API)
const express = require('express');
const app = express();
app.use(express.json());

app.post('/disconnect', async (req, res) => {
    console.log('Recebido comando de desconexão pelo Painel...');
    
    try {
        // Cria a flag sinalizadora para o próximo boot apagar a sessão
        fs.writeFileSync(flagPath, 'reset');
        
        // Apaga o QR Code antigo se existir
        const qrPath = path.join(MEDIA_DIR, 'qr.png');
        if (fs.existsSync(qrPath)) {
            fs.unlinkSync(qrPath);
        }
        
        // Retorna sucesso para o painel IMEDIATAMENTE antes de iniciar o suicídio do processo
        res.json({ sucesso: true, mensagem: 'Reiniciando o bot de forma limpa...' });
        
        // Mata o processo (Docker vai reiniciar automaticamente)
        setTimeout(() => process.exit(0), 1000);
        
    } catch (e) {
        console.error('Erro ao preparar desconexão:', e);
        // Mesmo com erro, tentamos avisar o painel para não travar a tela
        res.status(500).json({ erro: 'Erro ao agendar desconexão' });
        setTimeout(() => process.exit(1), 1000);
    }
});

app.post('/send', async (req, res) => {
    const { phone, message } = req.body;
    if (!phone || !message) {
        return res.status(400).json({ erro: 'Telefone e mensagem são obrigatórios' });
    }
    
    try {
        let chatId;
        if (phone.includes('@lid') || phone.includes('@c.us')) {
            chatId = phone;
        } else {
            let clean = String(phone).replace(/\D/g, '');
            if (clean.length > 0 && !clean.startsWith('55')) {
                clean = '55' + clean;
            }
            
            // Resolução inteligente de JID no WhatsApp (trata números brasileiros com e sem 9 dígitos)
            try {
                const numberId = await client.getNumberId(clean);
                if (numberId) {
                    chatId = numberId._serialized;
                } else if (clean.startsWith('55') && clean.length === 13 && clean[4] === '9') {
                    // Fallback para número brasileiro: tenta sem o 9 extra (ex: 55859xxxx -> 5585xxxx)
                    const withoutNine = clean.slice(0, 4) + clean.slice(5);
                    const numberIdWithoutNine = await client.getNumberId(withoutNine);
                    if (numberIdWithoutNine) {
                        chatId = numberIdWithoutNine._serialized;
                    } else {
                        chatId = `${clean}@c.us`;
                    }
                } else if (clean.startsWith('55') && clean.length === 12) {
                    // Fallback para número brasileiro: tenta com o 9 extra
                    const withNine = clean.slice(0, 4) + '9' + clean.slice(4);
                    const numberIdWithNine = await client.getNumberId(withNine);
                    if (numberIdWithNine) {
                        chatId = numberIdWithNine._serialized;
                    } else {
                        chatId = `${clean}@c.us`;
                    }
                } else {
                    chatId = `${clean}@c.us`;
                }
            } catch (errResolve) {
                console.warn(`[Push] Aviso ao resolver getNumberId para ${clean}:`, errResolve.message);
                chatId = `${clean}@c.us`;
            }
        }
        const safeMessage = String(message).normalize('NFC');
        await client.sendMessage(chatId, safeMessage);
        console.log(`[Push] Mensagem enviada com sucesso para ${chatId}`);
        res.json({ sucesso: true, chatId });
    } catch (e) {
        console.error(`[Push] Erro ao enviar mensagem para ${phone}:`, e);
        res.status(500).json({ erro: 'Falha ao enviar mensagem', detalhe: e.message });
    }
});

app.get('/status', (req, res) => {
    const qrPath = path.join(MEDIA_DIR, 'qr.png');
    const qrExists = fs.existsSync(qrPath);
    res.json({
        state: botState,
        connected: botState === 'CONNECTED',
        hasQr: qrExists
    });
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor de comandos do Porteiro ouvindo na porta 3000');
});
