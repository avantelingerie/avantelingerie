const fs = require('fs');

let code = fs.readFileSync('apps/api/src/routes/lia.js', 'utf8');

const toolObj = `{
        name: "calcular_tamanho_ideal",
        description: "Calcula o tamanho ideal de lingerie (P, M, G, GG) usando o algoritmo oficial do Provador Virtual da Avante Lingerie. Peça ao cliente o tamanho do sutiã (ex: 42) e do jeans (ex: 38). Opcionalmente pode pedir peso (kg) e altura (cm) para maior precisão.",
        input_schema: {
          type: "object",
          properties: {
            sutia: { type: "integer", description: "Tamanho de sutiã (ex: 40, 42, 44, 46)" },
            jeans: { type: "integer", description: "Tamanho de calça jeans (ex: 36, 38, 40, 42)" },
            peso: { type: "number", description: "Peso em Kg (opcional)" },
            altura: { type: "number", description: "Altura em cm (opcional, ex: 165)" }
          },
          required: ["sutia", "jeans"]
        }
      }`;

// Insert tool definition
code = code.replace(/const liaTools = \[{/, `const liaTools = [${toolObj}, {`);

const toolLogic = `
        if (toolCall.name === 'calcular_tamanho_ideal') {
          try {
            const { sutia, jeans, peso, altura } = toolCall.input;
            let score = 0;
            if (sutia <= 40) score += 1;
            else if (sutia <= 42) score += 2;
            else if (sutia <= 44) score += 2.5;
            else if (sutia <= 46) score += 3;
            else if (sutia <= 48) score += 3.5;
            else score += 4;
            
            if (jeans <= 36) score += 1;
            else if (jeans <= 40) score += 2;
            else if (jeans <= 44) score += 3;
            else score += 4;
            
            let finalScore = score / 2;
            
            if (peso && altura) {
              const h = parseFloat(altura) / 100;
              const imc = parseFloat(peso) / (h * h);
              if (imc < 18.5) finalScore -= 0.5;
              else if (imc > 25 && imc < 30) finalScore += 0.5;
              else if (imc >= 30) finalScore += 1;
            }
            
            let sizeStr = 'M';
            if (finalScore <= 1.5) sizeStr = 'P';
            else if (finalScore <= 2.5) sizeStr = 'M';
            else if (finalScore <= 3.5) sizeStr = 'G';
            else sizeStr = 'GG';
            
            toolResultText = \`O tamanho matemático exato recomendado para a cliente é: \${sizeStr}. Informe este resultado a ela com muita confiança, explicando que você usou o motor inteligente do Provador Virtual da loja para analisar o biotipo dela com precisão.\`;
          } catch(e) {
            toolResultText = "Erro ao calcular tamanho: informe a cliente que houve uma falha e passe as medidas da tabela estática.";
          }
        }
`;

// Insert tool logic inside the execution block
code = code.replace(/if \(toolCall.name === 'get_order_tracking'\) {/, toolLogic + "        else if (toolCall.name === 'get_order_tracking') {");

fs.writeFileSync('apps/api/src/routes/lia.js', code);
console.log('Patch aplicado com sucesso.');
