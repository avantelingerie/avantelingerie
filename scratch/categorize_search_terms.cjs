const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/comer/.gemini/antigravity/brain/71d8d533-a528-4e32-8f7a-a35a59ca3c50/.system_generated/steps/3816/output.txt', 'utf8'));

const campaigns = {};

data.results.forEach(row => {
  const campName = row.campaign.name;
  const groupName = row.adGroup.name;
  const term = row.searchTermView.searchTerm;
  const clicks = parseInt(row.metrics.clicks || 0);
  const imps = parseInt(row.metrics.impressions || 0);
  const cost = (parseInt(row.metrics.costMicros || 0) / 1000000);
  const ctr = (parseFloat(row.metrics.ctr || 0) * 100).toFixed(2);
  const matchType = row.segments.searchTermMatchType;

  if (!campaigns[campName]) campaigns[campName] = {};
  if (!campaigns[campName][groupName]) campaigns[campName][groupName] = [];

  campaigns[campName][groupName].push({ term, clicks, imps, cost: cost.toFixed(2), ctr: ctr + '%', matchType });
});

for (const camp of Object.keys(campaigns)) {
  console.log('\n======================================================');
  console.log('CAMPANHA: ' + camp);
  for (const grp of Object.keys(campaigns[camp])) {
    console.log('  -> GRUPO: ' + grp);
    console.log('     Total de termos: ' + campaigns[camp][grp].length);
    campaigns[camp][grp].forEach(t => {
      console.log('     - "' + t.term + '" | Cliques: ' + t.clicks + ' | Impressoes: ' + t.imps + ' | CTR: ' + t.ctr + ' | Custo: R$ ' + t.cost + ' | Match: ' + t.matchType);
    });
  }
}

