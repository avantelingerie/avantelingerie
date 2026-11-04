const fs = require('fs');
const content = fs.readFileSync('C:/Users/comer/.gemini/antigravity/brain/71d8d533-a528-4e32-8f7a-a35a59ca3c50/.system_generated/steps/3897/output.txt', 'utf8');
const data = JSON.parse(content);
const list = data.results || [];
console.log('Total active keywords:', list.length);
list.forEach(k => {
  const camp = k.campaign ? k.campaign.name : 'Unknown';
  const grp = k.adGroup ? k.adGroup.name : 'Unknown';
  const kw = k.adGroupCriterion && k.adGroupCriterion.keyword ? k.adGroupCriterion.keyword.text : 'Unknown';
  const match = k.adGroupCriterion && k.adGroupCriterion.keyword ? k.adGroupCriterion.keyword.matchType : 'Unknown';
  const st = k.adGroupCriterion ? k.adGroupCriterion.status : 'Unknown';
  const id = k.adGroupCriterion ? k.adGroupCriterion.criterionId : '';
  const grpId = k.adGroup ? k.adGroup.resourceName : '';
  console.log(`[${camp}] -> [${grp}] | "${kw}" (${match}) [${st}] id:${id}`);
});

