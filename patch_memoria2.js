const fs = require('fs');
let content = fs.readFileSync('MEMORIA_TECNICA.md', 'utf8');

const log = '\n- **Feat (Lia):** Adicionada ferramenta `salvar_lead_contato` (CRM VIP). A Lia agora pode captar ativamente o WhatsApp de clientes que desejam falar com humanos, revendedoras ou que buscam peças fora de estoque. O sistema tenta salvar em uma tabela `leads_atendimento` no PocketBase ou registra no log interno da API, e a Lia informa que o gerente entrará em contato em breve.\n';

if (!content.includes('salvar_lead_contato')) {
  content += log;
  fs.writeFileSync('MEMORIA_TECNICA.md', content);
  console.log('Memória Técnica atualizada com CRM VIP.');
}
