const fs = require('fs');
let content = fs.readFileSync('MEMORIA_TECNICA.md', 'utf8');

const log = '\n## Atualização [24/09/2026] - IA da Lia: Provador Virtual (Ferramenta)\n- **Feat (Lia):** Adicionada a capacidade de Function Calling para cálculo matemático de tamanho (Provador Virtual). A Lia agora possui uma ferramenta calcular_tamanho_ideal que roda a exata mesma fórmula biométrica do frontend (Sutiã, Jeans, Peso, Altura -> IMC + Score) e retorna a medida precisa (P, M, G, GG). Isso previne a IA de inventar lógicas soltas de tamanho e aumenta a confiança na recomendação.\n';

if (!content.includes('IA da Lia: Provador Virtual')) {
  content += log;
  fs.writeFileSync('MEMORIA_TECNICA.md', content);
  console.log('Memória Técnica atualizada com Provador.');
}
