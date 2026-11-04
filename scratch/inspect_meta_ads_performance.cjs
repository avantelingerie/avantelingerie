const fs = require('fs');
const content = fs.readFileSync('C:/Users/comer/.gemini/antigravity/brain/71d8d533-a528-4e32-8f7a-a35a59ca3c50/.system_generated/steps/3953/output.txt', 'utf8');
const data = JSON.parse(content);
const list = data.data || [];
console.log('Total ads in insights:', list.length);
list.forEach(ad => {
  console.log(`\n========================================`);
  console.log(`AD: [${ad.ad_id}] ${ad.ad_name}`);
  console.log(`Spend: R$ ${ad.spend} | Impr: ${ad.impressions} | Reach: ${ad.reach}`);
  console.log(`Clicks: ${ad.clicks} | CTR: ${ad.ctr}% | CPC: R$ ${ad.cpc} | CPM: R$ ${ad.cpm}`);
  const actions = ad.actions || [];
  const linkClicks = actions.find(a => a.action_type === 'link_click')?.value || 0;
  const lpViews = actions.find(a => a.action_type === 'landing_page_view')?.value || 0;
  const atc = actions.find(a => a.action_type === 'add_to_cart')?.value || 0;
  const ic = actions.find(a => a.action_type === 'initiate_checkout')?.value || 0;
  const purchase = actions.find(a => a.action_type === 'purchase')?.value || 0;
  console.log(`Actions -> LinkClicks: ${linkClicks} | LPViews: ${lpViews} | AddToCart: ${atc} | InitiateCheckout: ${ic} | Purchase: ${purchase}`);
});

