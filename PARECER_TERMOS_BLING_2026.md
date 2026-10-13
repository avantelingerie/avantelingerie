# Parecer Técnico e Comercial — Novos Termos de Uso do Bling (LWSA 2026)

> **Data da Análise:** 13/10/2026  
> **Versão do Documento Bling:** Atualização de 02/09/2026 (Grupo LWSA S/A)  
> **Status:** Analisado pela Ada (Líder Técnica & Arquiteta)  
> **Veredito Geral:** **SEGURO PARA ACEITE** (Termos padrão de mercado para software SaaS B2B).

---

## 1. Resumo Executivo
O Bling (sob controle da LWSA S/A) atualizou seus Termos Gerais de Uso para incorporar novas regras sobre o ecossistema de serviços do grupo (Tray, Melhor Envio, Pagcerto), inteligência artificial, governança do protocolo MCP e alinhamentos tributários.

O aceite é obrigatório para continuar emitindo notas fiscais e sincronizando a loja. Abaixo estão listadas as **5 principais cláusulas de atenção ("pegadinhas")** e o impacto prático para a operação da Avante Lingerie.

---

## 2. As 5 Cláusulas Críticas e Impacto na Avante Lingerie

### 🚨 1. Upgrade Automático de Plano por Volume de Vendas (Cláusula 4.6.2)
* **O que a cláusula diz:** Cada plano do Bling possui uma franquia de pedidos e requisições de API. Se a loja ultrapassar o limite, no 1º mês o Bling mantém o serviço e apenas notifica. Porém, se no 2º mês consecutivo o volume permanecer acima do teto, **o Bling realiza o upgrade automático para um plano superior e fatura a nova mensalidade no ciclo seguinte sem necessidade de clique de confirmação do lojista**.
* **Impacto na Avante Lingerie:** Quando as campanhas de tráfego pago (Google Ads PMax e Meta Ads) começarem a escalar as vendas de varejo e atacado, devemos monitorar a quantidade mensal de pedidos emitidos para planejar o plano adequado com antecedência e evitar surpresas na fatura.

---

### 📦 2. Inscrição Automática em Serviços do Grupo LWSA (Cláusula 3.1.3)
* **O que a cláusula diz:** O aceite autoriza o Bling a realizar cadastros automáticos em soluções do grupo econômico LWSA (ex.: *Bling Envios / Melhor Envio*, *Bling Conta Digital / Pagcerto*, *Bling Loja Virtual / Tray*).
* **Impacto na Avante Lingerie:** Não gera cobrança automática apenas pelo pré-cadastro, mas a equipe deve ficar atenta para **não clicar em pop-ups de "experimente add-ons" ou contratar serviços redundantes**. A Avante Lingerie possui sua própria loja virtual customizada e seu próprio gateway seguro na Stripe, não necessitando de contratações adicionais de e-commerce da LWSA.

---

### 📑 3. Isenção Total de Responsabilidade Fiscal e Tributária (Cláusulas 4.5 e 7.2-c)
* **O que a cláusula diz:** O Bling isenta-se expressamente de qualquer prejuízo decorrente de erros de cálculo de impostos, parametrizações tributárias ou preenchimento de notas fiscais. Toda a responsabilidade legal perante o Fisco recai sobre o usuário e seu contador.
* **Impacto na Avante Lingerie:** Totalmente mitigado pela nossa arquitetura! Desenvolvemos o módulo automatizado de validação de NCM (`guessNcm.js`), regras de vestuário e blindagem de preços no PocketBase e storefront, garantindo que os dados cheguem limpos ao Bling.

---

### 🤖 4. Uso de Inteligência Artificial e Conectores MCP (Cláusulas 1.1-p, 4.11 e 7.2-g)
* **O que a cláusula diz:** *Novidade de setembro/2026!* O termo regulamenta formalmente o protocolo MCP (*Model Context Protocol*). O Bling estipula que atua apenas como canal técnico de transporte de dados e que **não responde por alucinações, exclusões ou alterações indevidas em estoques e cadastros provocadas por IAs de terceiros conectadas pelo usuário**.
* **Impacto na Avante Lingerie:** Alinhamento 100% perfeito com a governança da Avante! O nosso ecossistema já segue rigidamente o [AGENTS.md](file:///c:/Users/comer/.gemini/antigravity/scratch/avante-lingerie-novo/AGENTS.md): inteligências analíticas (como o Nemotron) operam exclusivamente no terminal como consultores. **Somente a Ada tem autorização para gravar alterações no código e no banco**, impedindo qualquer comando destrutivo automatizado.

---

### 🛡️ 5. Proibição Estrita de Acesso por VPN ou Proxy (Cláusula 4.8)
* **O que a cláusula diz:** É proibido acessar o Bling mascarando o endereço IP de conexão (VPNs ou Proxies). O Bling pode suspender temporariamente a conta por razões de segurança em caso de IPs anômalos (*Protect Login*).
* **Impacto na Avante Lingerie:** Acessar o painel do ERP sempre por navegadores e conexões convencionais (Wi-Fi de fábrica/escritório ou rede móvel direta), sem extensões de VPN ativadas.

---

## 3. Cláusulas Secundárias Importantes

| Cláusula | Descrição | Recomendação / Ação |
|---|---|---|
| **4.9.3 (Retenção de Dados)** | Dados de contas canceladas/inadimplentes são excluídos definitivamente após **90 dias**. | Manter mensalidade em dia e realizar backups periódicos do catálogo XML/CSV. |
| **7.3 (Teto de Indenização)** | Responsabilidade do Bling por falhas limitada a no máximo **3 mensalidades**. | Manter rotinas de contingência e monitoramento do webhook da loja. |
| **8.5 (Repasse Tributário)** | Aumentos de impostos incidentes sobre o software (Reforma Tributária) serão repassados à mensalidade. | Ficar ciente de eventuais reajustes futuros decorrentes do IBS/CBS. |
| **10.9 (Natureza B2B)** | Inaplicabilidade do Código de Defesa do Consumidor (CDC) e regras de SAC. Relação regida pelo Código Civil. | Tratativas contratuais são estritamente empresariais entre pessoas jurídicas. |

---

## 4. Conclusão e Próximos Passos
* **Ação imediata:** Pode clicar em **"Aceitar"** no painel do Bling.
* **Para a próxima sessão:** Foco mantido na liberação dos documentos da Stripe, cadastro do cartão corporativo no Google/Meta Ads e implementação do programa de indicação ("Amiga Indica Amiga").
