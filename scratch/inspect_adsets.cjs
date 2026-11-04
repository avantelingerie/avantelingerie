const fs = require('fs');
const content = fs.readFileSync('C:/Users/comer/.gemini/antigravity/brain/71d8d533-a528-4e32-8f7a-a35a59ca3c50/.system_generated/steps/3945/output.txt', 'utf8');
const data = JSON.parse(content);
const list = data.data || [];
console.log('Total ad sets:', list.length);
list.forEach(as => {
  console.log(`\n--- [AdSet ID: ${as.id}] ${as.name} (${as.status}) ---`);
  console.log('Campaign ID:', as.campaign_id);
  console.log('Daily Budget:', as.daily_budget ? (as.daily_budget / 100) : 'CBO (Campanha)');
  console.log('Targeting:', JSON.stringify(as.targeting, null, 2));
});

