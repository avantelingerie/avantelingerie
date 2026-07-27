# Histórico Completo de Correções e Integrações (Bling, Melhor Envio e Layout)

Este documento funciona como um guia de referência e recuperação para a equipe técnica da **Avante Lingerie**. Ele descreve todos os problemas encontrados, as configurações de banco de dados necessárias, as alterações de código e as regras de segurança aplicadas no PocketBase.

---

## 1. Problema de Layout e Tela de Produto
### O que aconteceu
Durante atualizações anteriores, o design original da página do produto (`ProductPage.jsx`) foi substituído por engano.

### Como foi resolvido
1. Recuperamos a estrutura do arquivo a partir de um backup na Área de Trabalho do cliente (`MeuProductPage.txt`).
2. Aplicamos 4 melhorias premium solicitadas:
   * **Miniaturas Verticais:** As miniaturas da galeria de fotos foram alteradas de rolagem horizontal para rolagem vertical à esquerda da imagem principal no desktop.
   * **Inversão de Elementos:** Trocamos a ordem da Referência do Produto (`# REF`) com a avaliação por estrelas (as estrelas agora aparecem logo acima, junto à categoria).
   * **Abas de Descrições do Gemini:** Alinhamos as abas inferiores com os campos exatos salvos pela Inteligência Artificial do Gemini no painel administrativo (`Geral`, `Tecido`, `Modelagem`, `Cuidados`, `Diferenciais`, `Compra Segura` e a tabela dinâmica de `Guia de Medidas`).
   * **Ícones de Benefícios Premium:** O antigo carrossel rotativo de benefícios sob os botões de compra foi redesenhado como um grid estático premium e elegante (Compra Segura, Troca Fácil e Envio Rápido).

---

## 2. Bloqueio de Checkout de Visitantes (API Rules - PocketBase)
### O que aconteceu
O checkout do site parou de funcionar para clientes não logados (checkout de visitante/guest checkout). A requisição falhava silenciosamente ao tentar salvar o pedido no banco.

### A Causa Oculta
As regras de permissão (API Rules) da coleção `pedidos` no PocketBase estavam configuradas de forma muito restritiva. A regra de **Create** estava como `@request.auth.id != ""`, o que significa que o banco de dados rejeitava qualquer tentativa de criação de pedido que não viesse de um usuário logado.

### Como foi resolvido
A Horizons alterou a regra de acesso no painel integrado do PocketBase:
* **Coleção:** `pedidos`
* **Operação:** `Create`
* **Regra antiga:** `@request.auth.id != ""`
* **Regra nova:** `""` (string vazia no PocketBase significa **acesso público**, permitindo que o formulário de checkout crie o pedido mesmo sem autenticação).
* **Outras regras (List, View, Update, Delete):** Mantidas como `@request.auth.id != ""` por motivos de segurança (apenas usuários autenticados ou o próprio dono podem listar ou alterar dados).

---

## 3. Rejeição de NF-e por CPF do Contato Vazio no Bling
### O que aconteceu
Os pedidos e produtos estavam integrando com o Bling com sucesso, mas no momento de gerar a NF-e (Nota Fiscal) ou as etiquetas, o Bling exibia o erro: *"CPF do contato não pode ser vazio"*. Ao abrir a ficha do cliente no Bling em *"Clientes e Fornecedores"*, o CPF estava em branco.

### A Causa
1. A tabela de `pedidos` no PocketBase não possuía uma coluna para armazenar o CPF do cliente. O site salvava o CPF apenas na tabela de clientes (`users`).
2. Posteriormente, foi adicionada a coluna `cpf` à tabela `pedidos`, mas o código do checkout continuava gravando essa informação usando a chave `cliente_cpf`, fazendo com que a nova coluna `cpf` da tabela de pedidos ficasse vazia (`N/A`).
3. Ao criar um cliente visitante (guest checkout), o site criava a conta em `users`, mas omitia a gravação do CPF.
4. O serviço do Bling tentava ler o CPF do pedido e, caso estivesse vazio, o contato era enviado para o Bling sem documento.

### Como foi resolvido
1. **Gravação no Banco (`payment.js`):** Ajustamos o endpoint de checkout para gravar o CPF em ambos os campos (`cpf` e `cliente_cpf`) da tabela `pedidos`, além de persistir e salvar o CPF na tabela de usuários (`users`).
2. **Resolução de CPF no Envio (`blingService.js`):** Atualizamos a integração para buscar o documento usando uma cascata de fallbacks (prioridade):
   * Primeiro: tenta ler do pedido (`pedido.cpf`).
   * Segundo: se estiver em branco, busca na ficha do usuário correspondente no banco (`user.cpf` via `cliente_id`).
   * Terceiro: se ainda assim estiver em branco, busca no campo legado (`pedido.cliente_cpf`).

---

## 4. Sumiço dos Campos de Logística (Peso e Dimensões)
### O que aconteceu
Os campos de **Peso (g)**, **Altura (cm)**, **Largura (cm)** e **Profundidade (cm)** desapareceram da tela de cadastro de produtos no painel administrativo, impossibilitando que novos produtos tivessem seus dados de logística configurados para o frete real do Melhor Envio e para o cadastro no Bling.

### Como foi resolvido
1. Confirmamos no banco PocketBase que a coleção `products` possui as colunas `peso_g`, `altura_cm`, `largura_cm` e `comprimento_cm`. A coleção `variacoes` não possui e nem necessita destas colunas, pois as dimensões são herdadas do produto pai.
2. Reinserimos os inputs visuais na seção "Preço e Logística" do arquivo do painel administrativo (`ProdutoForm.jsx`), mapeando-os corretamente para os campos do PocketBase. O campo de profundidade do Bling é mapeado para a coluna `comprimento_cm`.
3. **Pré-configurações Automáticas (Fallbacks):** Confirmamos que o sistema já possui fallbacks em código caso os dados manuais não sejam preenchidos:
   * **Calculadora de Frete (Melhor Envio):** Peso 100g, Altura 5cm, Largura 10cm, Comprimento 20cm.
   * **Sincronização de Produto (Bling):** Peso 200g, Altura 5cm, Largura 20cm, Profundidade 15cm.
   * *O preenchimento manual no painel administrativo tem prioridade absoluta sobre estes padrões.*

---

## 5. Mapeamento de Arquivos Atualizados
Caso ocorra alguma falha ou atualização indesejada da plataforma, os arquivos principais que sofreram alterações e devem ser preservados ou restaurados são:

1. 📄 **`apps/web/src/pages/ProductPage.jsx`**
   * *Responsabilidade:* Interface visual da página de produto final da loja.
   * *O que há de único:* Design de fotos vertical à esquerda, grid estático de benefícios premium e abas dinâmicas da IA do Gemini.
2. 📄 **`apps/web/src/pages/admin/ProdutoForm.jsx`**
   * *Responsabilidade:* Formulário de cadastro/edição de produtos no painel de administração.
   * *O que há de único:* Inputs de Peso (g), Altura (cm), Largura (cm) e Profundidade (cm), além do gatilho de sincronização automática com o Bling no salvamento.
3. 📄 **`apps/api/src/routes/payment.js`**
   * *Responsabilidade:* Endpoint de criação de pedidos no backend.
   * *O que há de único:* Persistência dupla de CPF em `pedidos` (campos `cpf` e `cliente_cpf`) e na criação/atualização de usuários em `users`.
4. 📄 **`apps/api/src/services/blingService.js`**
   * *Responsabilidade:* Serviço de comunicação com o Bling.
   * *O que há de único:* Cascata de resolução de CPF para o contato (`pedido.cpf || userCpf || pedido.cliente_cpf || ''`).
