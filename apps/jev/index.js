import express from 'express';
import cors from 'cors';
import { choice, TypeSafeClient } from '@typesafe-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Inicializa o cliente do Jev (System One) via TypeSafe
// Requer que a variável de ambiente TYPESAFE_API_KEY esteja configurada no .env
const client = new TypeSafeClient();

app.post('/api/decide', async (req, res) => {
  const { contexto, pergunta, opcoes } = req.body;

  if (!pergunta || !opcoes || !Array.isArray(opcoes)) {
    return res.status(400).json({ error: 'Faltam dados na requisição (pergunta, opcoes).' });
  }

  try {
    // Transformamos as opções (array de strings) em um objeto de escolhas para o Jev
    const choicesObj = {};
    opcoes.forEach(op => { choicesObj[op] = null; });

    // Chamada ultra-rápida (33ms) para o Sistema 1 (Jev)
    const response = await client.systemOne({
      state: { 
        cenario: pergunta,
        contexto_negocio: contexto || 'Classificação de E-commerce / ERP Têxtil'
      },
      questions: {
        decisao_logica: choice("Qual categoria melhor descreve o cenário?", choicesObj),
      },
    });

    const decisao = response.answers.decisao_logica.choice;
    const confianca = response.answers.decisao_logica.confidence;

    console.log(`[Cérebro Jev] Nova decisão: ${String(decisao).toUpperCase()}`);

    // Padroniza a saída para manter o contrato da API
    res.json({
      decisao: decisao,
      confianca: confianca || 0.99, // Jev retorna alta confiança em decisões fechadas
      todas_opcoes: {
        labels: opcoes,
        scores: opcoes.map(o => o === decisao ? confianca || 0.99 : 0.01) // Fake scores
      },
      motivo: 'Decisão tomada pelo Sistema 1 (Jev) via TypeSafe.'
    });

  } catch (error) {
    console.error(`[Cérebro Jev] Erro no motor TypeSafe:`, error);
    res.status(500).json({ error: 'Erro interno ao processar a inteligência.' });
  }
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 SERVIDOR JEV (SYSTEM ONE) LIGADO 🚀`);
  console.log(`Porta: ${PORT}`);
  console.log(`Verifique se o arquivo .env possui a TYPESAFE_API_KEY`);
  console.log(`=================================================`);
});
