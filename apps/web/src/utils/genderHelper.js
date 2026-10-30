/**
 * genderHelper.js - Utilitário de detecção e concordância gramatical de gênero
 * Desenvolvido para o ecossistema da Avante Lingerie.
 * 
 * Permite que clientes e revendedores do gênero masculino (ex: Dooner, Carlos, João)
 * sejam tratados adequadamente ("Bem-vindo", "Revendedor PRO", "nosso revendedor oficial"),
 * preservando a identidade feminina para as revendedoras e clientes mulheres.
 */

// Conjunto O(1) com os nomes masculinos mais comuns do Brasil + nomes específicos (ex: Dooner)
const MALE_NAMES = new Set([
  'dooner', 'doner', 'alexandre', 'felipe', 'henrique', 'jorge', 'andre', 'rene', 'vicente',
  'pierre', 'george', 'guilherme', 'davi', 'jean', 'caua', 'lucca', 'luca', 'breno', 'caio',
  'theo', 'enzo', 'lorenzo', 'benicio', 'pietro', 'caleb', 'thomas', 'isaac', 'bento', 'ian',
  'diego', 'tiago', 'thiago', 'diogo', 'rodrigo', 'hugo', 'bruno', 'paulo', 'pedro', 'joao',
  'lucas', 'matheus', 'mateus', 'marcos', 'marcio', 'marcelo', 'rafael', 'gabriel', 'daniel',
  'samuel', 'miguel', 'victor', 'vitor', 'arthur', 'artur', 'heitor', 'igor', 'gustavo',
  'leonardo', 'vinicius', 'bernardo', 'carlos', 'eduardo', 'otavio', 'yuri', 'nicolas',
  'alan', 'luan', 'renan', 'cristian', 'jonathan', 'wellington', 'washington', 'edson',
  'cleiton', 'milton', 'alisson', 'anderson', 'jefferson', 'robson', 'valdir', 'almir',
  'jair', 'cesar', 'neymar', 'gilmar', 'waldemar', 'valdemar', 'ronaldo', 'roberto',
  'ricardo', 'sergio', 'fabio', 'alex', 'denis', 'elton', 'everton', 'fabricio', 'flavio',
  'fernando', 'geraldo', 'gilberto', 'helio', 'itamar', 'ivair', 'ivan', 'juliano', 'julio',
  'kleber', 'leandro', 'luiz', 'luis', 'manoel', 'mauro', 'moises', 'murilo', 'nelson',
  'orlando', 'osvaldo', 'reginaldo', 'reinaldo', 'renato', 'rubens', 'sidney', 'valter',
  'walter', 'wagner', 'wilson', 'william', 'ademir', 'antonio', 'augusto', 'joaquim',
  'emanuel', 'tomaz', 'claudio', 'mauricio', 'rogerio', 'roger'
]);

// Exceções femininas que terminam com consoantes ou padrões que poderiam parecer masculinos
const FEMALE_EXCEPTIONS = new Set([
  'alice', 'beatriz', 'carol', 'cleo', 'daiane', 'danielle', 'elis', 'esther',
  'gisele', 'helen', 'ingrid', 'iris', 'isabel', 'karen', 'kelly', 'lais',
  'lorena', 'madalen', 'michele', 'monique', 'miriam', 'nicole', 'raquel', 'ruth',
  'shirley', 'simone', 'sueli', 'thais', 'vivian'
]);

/**
 * Detecta o gênero a partir do nome ou gênero explícito.
 * @param {string} fullNameOrFirstName - Nome completo ou primeiro nome
 * @param {string} [explicitGender] - Opcional ('M', 'F', 'masculino', 'feminino')
 * @returns {'M' | 'F'}
 */
export function detectGender(fullNameOrFirstName, explicitGender) {
  if (explicitGender) {
    const eg = String(explicitGender).trim().toUpperCase();
    if (eg === 'M' || eg === 'MASCULINO') return 'M';
    if (eg === 'F' || eg === 'FEMININO') return 'F';
  }

  if (!fullNameOrFirstName || typeof fullNameOrFirstName !== 'string') {
    return 'F'; // Default no ateliê feminino
  }

  const rawFirst = fullNameOrFirstName.trim().split(/\s+/)[0];
  const name = rawFirst
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (!name) return 'F';

  // 1. Verificação direta O(1) na base masculina
  if (MALE_NAMES.has(name)) return 'M';

  // 2. Verificação direta O(1) nas exceções femininas
  if (FEMALE_EXCEPTIONS.has(name)) return 'F';

  // 3. Sufixos morfológicos altamente consistentes no português brasileiro
  if (
    name.endsWith('o') ||
    name.endsWith('os') ||
    name.endsWith('or') ||
    name.endsWith('er') || // Dooner, Roger, Walter, etc.
    name.endsWith('el') || // Gabriel, Daniel, Samuel
    name.endsWith('on') || // Wellington, Nilson
    name.endsWith('an') || // Luan, Renan
    name.endsWith('im') || // Joaquim
    name.endsWith('us') || // Mateus, Vinicius
    name.endsWith('ur') || // Artur
    name.endsWith('ao') || // João
    name.endsWith('ir') || // Valdir, Almir
    name.endsWith('ar') || // Cesar, Gilmar
    name.endsWith('ck')    // Erick, Patrick
  ) {
    return 'M';
  }

  // 4. Nomes terminados em 'a' são tipicamente femininos
  if (name.endsWith('a')) {
    return 'F';
  }

  return 'F';
}

/**
 * Retorna termos de tratamento com concordância de gênero correta.
 * @param {string} fullNameOrFirstName 
 * @param {string} [explicitGender]
 */
export function getGenderTerms(fullNameOrFirstName, explicitGender) {
  const gender = detectGender(fullNameOrFirstName, explicitGender);
  const isMale = gender === 'M';

  return {
    gender,
    isMale,
    isFemale: !isMale,
    artigo: isMale ? 'o' : 'a',
    artigoMaiusculo: isMale ? 'O' : 'A',
    bemVindo: isMale ? 'Bem-vindo' : 'Bem-vinda',
    sejaBemVindo: isMale ? 'Seja bem-vindo' : 'Seja bem-vinda',
    bemVindoDeVolta: isMale ? 'Bem-vindo de volta' : 'Bem-vinda de volta',
    revendedor: isMale ? 'Revendedor' : 'Revendedora',
    revendedorMinusculo: isMale ? 'revendedor' : 'revendedora',
    revendedores: isMale ? 'Revendedores' : 'Revendedoras',
    nossoRevendedor: isMale ? 'nosso revendedor oficial' : 'nossa revendedora oficial',
    clubeRevendedores: isMale ? 'Clube de Revendedores VIP' : 'Clube de Revendedoras VIP',
    querido: isMale ? 'querido' : 'querida',
    amigo: isMale ? 'amigo' : 'amiga',
    parceiro: isMale ? 'parceiro' : 'parceira',
    obrigado: isMale ? 'Obrigado' : 'Obrigada',
    badgeRevenda: isMale ? 'Revendedor PRO' : 'Revendedora PRO'
  };
}

export default {
  detectGender,
  getGenderTerms
};
