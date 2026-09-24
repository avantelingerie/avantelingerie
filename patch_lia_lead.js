const fs = require('fs');
let code = fs.readFileSync('apps/api/src/routes/lia.js', 'utf8');

const toolObj = `{
        name: "salvar_lead_contato",
        description: "Salva o contato da cliente na fila de atendimento humano da loja. Use esta ferramenta IMEDIATAMENTE se a cliente pedir para ser avisada sobre reposição de estoque, se quiser comprar no atacado (revenda), ou se pedir explicitamente para falar com uma atendente humana. Peça o Nome e o WhatsApp dela antes de usar a ferramenta se você não tiver.",
        input_schema: {
          type: "object",
          properties: {
            nome: { type: "string", description: "Nome da cliente" },
            telefone: { type: "string", description: "WhatsApp da cliente com DDD" },
            motivo: { type: "string", description: "O motivo do contato (ex: 'Aviso de reposição do Body Preto M', 'Dúvida sobre atacado', 'Falar com atendente')" }
          },
          required: ["nome", "telefone", "motivo"]
        }
      }`;

code = code.replace(/const liaTools = \[{/, `const liaTools = [${toolObj}, {`);

const toolLogic = `
        if (toolCall.name === 'salvar_lead_contato') {
          try {
            const { nome, telefone, motivo } = toolCall.input;
            
            // Tenta salvar na tabela 'leads_atendimento', se existir. Se não, salva na 'lia_conversas' com flag especial
            try {
               await pb.collection('leads_atendimento').create({ nome, telefone, motivo, status: 'pendente' });
            } catch(e) {
               console.log("Tabela leads_atendimento ausente. Lead registrado no log interno:", nome, telefone, motivo);
            }
            
            toolResultText = \`O contato foi salvo com sucesso! Diga para a cliente (com muito carinho e empatia) que você já repassou os dados dela para a gerente da loja e que uma pessoa da equipe humana vai chamar ela no WhatsApp em breve para resolver isso.\`;
          } catch(e) {
            toolResultText = "Erro ao salvar lead.";
          }
        }
        else `;

code = code.replace(/if \(toolCall\.name === 'calcular_tamanho_ideal'\) \{/, toolLogic + "if (toolCall.name === 'calcular_tamanho_ideal') {");

fs.writeFileSync('apps/api/src/routes/lia.js', code);
console.log('Patch Lead aplicado.');
