/**
 * genderHelper.js - Utilitário de detecção e concordância gramatical de gênero (Backend)
 * Desenvolvido para o ecossistema da Avante Lingerie.
 */

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

const FEMALE_EXCEPTIONS = new Set([
  'alice', 'beatriz', 'carol', 'cleo', 'daiane', 'danielle', 'elis', 'esther',
  'gisele', 'helen', 'ingrid', 'iris', 'isabel', 'karen', 'kelly', 'lais',
  'lorena', 'madalen', 'michele', 'monique', 'miriam', 'nicole', 'raquel', 'ruth',
  'shirley', 'simone', 'sueli', 'thais', 'vivian'
]);

export function detectGender(fullNameOrFirstName, explicitGender) {
  if (explicitGender) {
    const eg = String(explicitGender).trim().toUpperCase();
    if (eg === 'M' || eg === 'MASCULINO') return 'M';
    if (eg === 'F' || eg === 'FEMININO') return 'F';
  }

  if (!fullNameOrFirstName || typeof fullNameOrFirstName !== 'string') {
    return 'F';
  }

  const rawFirst = fullNameOrFirstName.trim().split(/\s+/)[0];
  const name = rawFirst
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (!name) return 'F';

  if (MALE_NAMES.has(name)) return 'M';
  if (FEMALE_EXCEPTIONS.has(name)) return 'F';

  if (
    name.endsWith('o') ||
    name.endsWith('os') ||
    name.endsWith('or') ||
    name.endsWith('er') ||
    name.endsWith('el') ||
    name.endsWith('on') ||
    name.endsWith('an') ||
    name.endsWith('im') ||
    name.endsWith('us') ||
    name.endsWith('ur') ||
    name.endsWith('ao') ||
    name.endsWith('ir') ||
    name.endsWith('ar') ||
    name.endsWith('ck')
  ) {
    return 'M';
  }

  if (name.endsWith('a')) {
    return 'F';
  }

  return 'F';
}

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
