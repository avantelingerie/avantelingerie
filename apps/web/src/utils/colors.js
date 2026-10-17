/**
 * Mapeamento robusto de nomes de cores para valores HEX
 * Suporta variações gramaticais de gênero (preto/preta, branco/branca, etc.),
 * tons compostos, remoção de acentos e fallbacks estáveis.
 */

export const getColorHex = (colorName) => {
  if (!colorName) return '#9CA3AF';
  let cleanName = String(colorName).toLowerCase().trim();

  // Se já for código de cor válido
  if (cleanName.startsWith('#') || cleanName.startsWith('rgb') || cleanName.startsWith('hsl')) {
    return colorName;
  }

  // Normalização de acentos e separadores (ex: "bordô" -> "bordo", "off-white" -> "off white")
  cleanName = cleanName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[-_]/g, ' ');

  // 1. Tons específicos e compostos (prioridade alta)
  if (cleanName.includes('off white') || cleanName.includes('marfim') || cleanName.includes('perola')) return '#FAFAF7';
  if (cleanName.includes('verde militar') || cleanName.includes('musgo') || cleanName.includes('oliva')) return '#4B5320';
  if (cleanName.includes('menta')) return '#98FF98';
  if (cleanName.includes('esmeralda')) return '#50C878';
  if (cleanName.includes('azul marinho') || cleanName.includes('marinho')) return '#0A192F';
  if (cleanName.includes('tiffany')) return '#0ABAB5';
  if (cleanName.includes('safira') || cleanName.includes('royal') || cleanName.includes('bic')) return '#1D4ED8';
  if (cleanName.includes('petroleo')) return '#004953';
  if (cleanName.includes('rosa chiclete') || cleanName.includes('pink')) return '#FF1493';
  if (cleanName.includes('rose') || cleanName.includes('blush')) return '#F4C2C2';
  if (cleanName.includes('romance')) return '#FFC0CB';
  if (cleanName.includes('vinho') || cleanName.includes('bordo') || cleanName.includes('marsala')) return '#722F37';
  if (cleanName.includes('chocolate') || cleanName.includes('cacau')) return '#5C4033';
  if (cleanName.includes('cafe')) return '#4B3621';
  if (cleanName.includes('caramelo') || cleanName.includes('avela')) return '#C68E17';
  if (cleanName.includes('canela')) return '#7B3F00';
  if (cleanName.includes('terracota') || cleanName.includes('coral') || cleanName.includes('telha')) return '#D97443';
  if (cleanName.includes('salmao')) return '#FA8072';
  if (cleanName.includes('nude') || cleanName.includes('pele')) return '#E3C1B2';
  if (cleanName.includes('lavanda') || cleanName.includes('lilas')) return '#C8A2C8';
  if (cleanName.includes('ameixa') || cleanName.includes('uva')) return '#581845';
  if (cleanName.includes('fucsia') || cleanName.includes('magenta')) return '#D946EF';
  if (cleanName.includes('chumbo') || cleanName.includes('grafite')) return '#374151';
  if (cleanName.includes('rubi') || cleanName.includes('sensual') || cleanName.includes('cereja')) return '#991B1B';
  if (cleanName.includes('dourad') || cleanName.includes('ouro') || cleanName.includes('gold')) return '#D4AF37';
  if (cleanName.includes('prat') || cleanName.includes('silver')) return '#CBD5E1';
  if (cleanName.includes('mostarda')) return '#EAB308';

  // 2. Cores fundamentais (com flexão de gênero e sufixos)
  if (cleanName.includes('pret') || cleanName.includes('black')) return '#18181B';
  if (cleanName.includes('branc') || cleanName.includes('white')) return '#FFFFFF';
  if (cleanName.includes('marrom') || cleanName.includes('castanh') || cleanName.includes('brown')) return '#78350F';
  if (cleanName.includes('vermelh') || cleanName.includes('red')) return '#DC2626';
  if (cleanName.includes('azul') || cleanName.includes('blue')) return '#2563EB';
  if (cleanName.includes('verd') || cleanName.includes('green')) return '#10B981';
  if (cleanName.includes('ros') || cleanName.includes('pink')) return '#EC4899';
  if (cleanName.includes('amarel') || cleanName.includes('yellow')) return '#FBBF24';
  if (cleanName.includes('laranj') || cleanName.includes('orange')) return '#F97316';
  if (cleanName.includes('rox') || cleanName.includes('violet') || cleanName.includes('purple')) return '#8B5CF6';
  if (cleanName.includes('beg') || cleanName.includes('beige') || cleanName.includes('crem') || cleanName.includes('areia')) return '#F5F5DC';
  if (cleanName.includes('cinz') || cleanName.includes('gray') || cleanName.includes('grey') || cleanName.includes('mescla')) return '#9CA3AF';

  // Fallback baseado em hash determinístico
  let hash = 0;
  for (let i = 0; i < cleanName.length; i++) {
    hash = cleanName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 55%, 50%)`;
};

export default getColorHex;
