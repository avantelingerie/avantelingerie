import 'dotenv/config';
import Pocketbase from 'pocketbase';
import axios from 'axios';

const pb = new Pocketbase('http://localhost:8090');

async function test() {
    try {
        await pb.collection('_superusers').authWithPassword(
            process.env.PB_SUPERUSER_EMAIL,
            process.env.PB_SUPERUSER_PASSWORD
        );
        
        const configs = await pb.collection('integracoes_config').getFullList({
            filter: `servico = "anthropic" && chave_nome = "api_key"`,
        });

        if (configs.length === 0) {
            console.log("Sem chave.");
            return;
        }

        const apiKey = configs[0].chave_valor;
        
        try {
            const response = await axios.get(
                'https://api.anthropic.com/v1/models',
                {
                    headers: {
                        'x-api-key': apiKey,
                        'anthropic-version': '2023-06-01'
                    }
                }
            );
            console.log("STATUS:", response.status);
            console.log("DATA:", JSON.stringify(response.data, null, 2));
        } catch (e) {
            console.log("ERRO API:", e.response?.status);
            console.log("DATA:", JSON.stringify(e.response?.data, null, 2));
            console.log("MESSAGE:", e.message);
        }
    } catch (e) {
        console.error(e.message);
    }
}
test();
