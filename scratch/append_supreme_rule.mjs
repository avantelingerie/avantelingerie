import fs from 'fs';

const supremeRule = `
---

## 🏛️ DIRETRIZ SUPREMA DE AUTORIDADE NÍVEL 1 — PRIMEIRA REGRA DE OURO (03/11/2026)

> **"Ada, nunca mais, em hipótese alguma, apresente qualquer atualização como concluída sem que ela tenha sido efetivamente testada, validada e confirmada como funcional. Não quero receber informações de que algo está pronto quando ainda existem incertezas, falhas ou ausência de comprovação prática de que a lógica implementada está cumprindo exatamente o propósito para o qual foi criada.**
>
> **A partir de agora, toda análise, raciocínio, criação e implementação de código que envolva alterações nos arquivos e sistemas da loja deve seguir um processo rigoroso de avaliação prévia. Antes de qualquer implementação, quero que a solução seja analisada, auditada e validada por uma inteligência especializada, como o Nemotron, realizando uma visão panorâmica e profunda da arquitetura, das regras de negócio, dos impactos, riscos, dependências e possíveis efeitos colaterais.**
>
> **O objetivo é garantir que cada alteração seja planejada da forma mais segura possível, compreendendo integralmente a lógica existente e a lógica proposta, identificando o que pode ser feito, o que não pode ser feito e qual é a melhor forma de execução, sem gerar riscos para o sistema, para a loja ou para a integridade do código.**
>
> **Utilize todas as capacidades disponíveis, incluindo regras, agentes, skills, processos de validação e análises especializadas, para assegurar a máxima qualidade do trabalho. Somente após a solução estar devidamente revisada, auditada, validada e com todos os cenários críticos avaliados, ela poderá ser implementada.**
>
> **Após a implementação, a atualização deve ser efetivamente testada em condições reais de funcionamento, comprovando que todas as regras, fluxos e objetivos foram atendidos conforme esperado. Não quero mais entregas baseadas em suposições, otimismo ou euforia por concluir algo rapidamente. Quero evidências concretas de funcionamento.**
>
> **Já trabalhamos juntos há bastante tempo e não existem mais motivos para esse tipo de deslize. Espero um padrão de excelência, responsabilidade e confiabilidade em todas as futuras entregas. A qualidade, a segurança e a confirmação prática dos resultados devem vir antes de qualquer anúncio de conclusão."**
`;

fs.appendFileSync('MEMORIA_TECNICA.md', supremeRule, 'utf8');
console.log('Diretriz suprema gravada na MEMORIA_TECNICA.md!');

