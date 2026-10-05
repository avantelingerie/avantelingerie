/**
 * Utilitário de identificação e sugestão de NCM fiscal para produtos de moda íntima da Avante Lingerie.
 * Homologado em auditoria conjunta (Ada + Qwen).
 * Baseado em tokenização por palavras completas e proteção contra falsos positivos.
 */

export const guessNcm = (value) => {
  if (!value || typeof value !== 'string') return '';

  const clean = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

  if (!clean) return '';

  const tokens = clean.split(/[^a-z0-9]+/).filter(Boolean);
  const hasWord = (w) => tokens.includes(w);
  const hasAny = (list) => list.some((w) => tokens.includes(w));

  const isSintetico = hasAny(['suede', 'sintetico', 'poliester', 'microfibra', 'poliamida', 'nylon', 'renda']);
  const isAlgodao = hasAny(['algodao', 'cotton']);

  // Sutiãs, Conjuntos, Tops, Bustiês (6212.10.00)
  if (hasAny(['sutia', 'sutias', 'conjunto', 'conjuntos', 'corpete', 'top', 'bustie'])) {
    return '6212.10.00';
  }

  // Cintas, Calcinhas, Tangas, Fios (6212.20.00)
  if (hasAny(['calcinha', 'calcinhas', 'cinta', 'cintas', 'fio', 'tanga'])) {
    return '6212.20.00';
  }

  // Pijamas, Camisolas, Short Doll, Baby Doll, Robes
  const isSleepwear =
    hasAny(['pijama', 'camisola', 'robe']) ||
    (hasWord('short') && hasWord('doll')) ||
    (hasWord('baby') && hasWord('doll')) ||
    (hasWord('shortsa') && hasWord('doll'));

  if (isSleepwear) {
    if (isAlgodao) return '6208.21.00';          // De algodão
    if (isSintetico) return '6108.32.00';         // De fibras sintéticas
    return '6108.32.00';                          // Padrão Avante Lingerie
  }

  // Moda Praia / Biquínis / Maiôs
  if (hasAny(['biquini', 'biquinis', 'maio', 'maios', 'praia'])) {
    return '6112.41.00'; 
  }

  // Bodys
  if (hasAny(['body', 'bodys', 'bodie'])) {
    return '6114.30.00'; 
  }

  // Fallback seguro: retorna vazio para o lojista preencher manualmente
  return '';
};
