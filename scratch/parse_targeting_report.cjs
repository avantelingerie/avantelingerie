const fs = require('fs');

// Check adsets targeting & schedule
const adsetsData = JSON.parse(fs.readFileSync('C:/Users/comer/.gemini/antigravity/brain/71d8d533-a528-4e32-8f7a-a35a59ca3c50/.system_generated/steps/4101/output.txt', 'utf8'));
console.log('=== ADSETS CONFIGURATION ===');
adsetsData.data.forEach(as => {
  console.log(`\nAdSet: [${as.id}] ${as.name} (${as.campaign_id})`);
  console.log('Status:', as.status);
  console.log('Pacing type:', as.pacing_type);
  console.log('AdSet Schedule:', as.adset_schedule);
  console.log('Targeting Age:', as.targeting?.age_min, 'to', as.targeting?.age_max);
  console.log('Targeting Genders:', as.targeting?.genders);
  console.log('Targeting Geo:', JSON.stringify(as.targeting?.geo_locations));
  console.log('Flexible Spec (Interests/Behaviors):', JSON.stringify(as.targeting?.flexible_spec, null, 2));
});

// Check hourly stats
const hourlyData = JSON.parse(fs.readFileSync('C:/Users/comer/.gemini/antigravity/brain/71d8d533-a528-4e32-8f7a-a35a59ca3c50/.system_generated/steps/4109/output.txt', 'utf8'));
console.log('\n=== HOURLY STATS (Total rows: ' + hourlyData.data.length + ') ===');
const hourlyByCamp = {};
hourlyData.data.forEach(h => {
  const camp = h.campaign_name;
  if (!hourlyByCamp[camp]) hourlyByCamp[camp] = [];
  hourlyByCamp[camp].push({
    hour: h.hourly_stats_aggregated_by_audience_time_zone,
    spend: parseFloat(h.spend),
    impr: parseInt(h.impressions),
    clicks: parseInt(h.clicks)
  });
});

Object.keys(hourlyByCamp).forEach(camp => {
  console.log(`\nCampaign: ${camp}`);
  hourlyByCamp[camp].sort((a,b) => b.spend - a.spend);
  console.log('Top 5 hours by spend:');
  hourlyByCamp[camp].slice(0, 5).forEach(h => {
    console.log(`  Hour ${h.hour}: Spend R$ ${h.spend.toFixed(2)}, Impr ${h.impr}, Clicks ${h.clicks}`);
  });
});

