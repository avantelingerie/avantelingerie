import readline from 'readline';

const url = 'http://localhost:4000/api/decide';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("==================================================");
console.log("🤖 BASTIDORES DO JEV (TESTE INTERATIVO)");
console.log("Contexto atual: Fábrica de Lingeries (Avante)");
console.log("Opções que ele conhece: [varejo, atacado, duvida_tamanho, reclamacao]");
console.log("Digite 'sair' a qualquer momento para fechar.");
console.log("==================================================\n");

function perguntarOpcoes() {
  rl.question('\n🏷️ Digite as categorias separadas por vírgula (ex: critico, moderado, normal) ou "sair": ', (opcoes_digitadas) => {
    if (opcoes_digitadas.toLowerCase() === 'sair') {
      console.log("Encerrando teste...");
      rl.close();
      return;
    }
    const arrayOpcoes = opcoes_digitadas.split(',').map(o => o.trim());
    perguntarMensagem(arrayOpcoes);
  });
}

function perguntarMensagem(opcoes) {
  rl.question('💬 Digite a mensagem ou cenário para ele classificar: ', (pergunta_digitada) => {
    if (pergunta_digitada.toLowerCase() === 'sair') {
      console.log("Encerrando teste...");
      rl.close();
      return;
    }

    const payload = {
      contexto: "Classifique o texto de acordo com as categorias fornecidas.",
      pergunta: pergunta_digitada,
      opcoes: opcoes
    };

    console.log("📨 Lendo o cérebro...");

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        console.log(`\n🧠 RESPOSTA DO JEV:`);
        console.log(`👉 Decisão: ${data.decisao.toUpperCase()}`);
        console.log(`📊 Certeza matemática: ${(data.confianca * 100).toFixed(1)}%`);
        console.log(`💡 Raciocínio lógico: "${data.motivo || 'Nenhum motivo retornado.'}"\n`);
        
        console.log("Outras probabilidades:");
        data.todas_opcoes.labels.forEach((label, index) => {
          if (label !== data.decisao) {
             console.log(`- ${label}: ${(data.todas_opcoes.scores[index] * 100).toFixed(1)}%`);
          }
        });
        
        // Loop
        perguntarOpcoes();
      })
      .catch(err => {
        console.error("\n❌ Erro de conexão.", err);
        rl.close();
      });
  });
}

// Inicia o loop
perguntarOpcoes();
