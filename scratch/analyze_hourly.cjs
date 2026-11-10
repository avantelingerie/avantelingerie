const fs = require("fs");
const raw = JSON.parse(fs.readFileSync("C:/Users/comer/.gemini/antigravity/brain/71d8d533-a528-4e32-8f7a-a35a59ca3c50/.system_generated/steps/7871/output.txt", "utf8"));
const rows = raw.data.map(r => {
  const hour = r.hourly_stats_aggregated_by_audience_time_zone.split(" - ")[0].substring(0, 2);
  const spend = parseFloat(r.spend || 0).toFixed(2);
  const clicks = parseInt(r.clicks || 0);
  const ctr = parseFloat(r.ctr || 0).toFixed(2) + "%";
  const checkouts = parseInt((r.actions || []).find(a => a.action_type === "initiate_checkout")?.value || 0);
  const carts = parseInt((r.actions || []).find(a => a.action_type === "add_to_cart")?.value || 0);
  return { hour: `${hour}h`, spend: `R$ ${spend}`, clicks, ctr, carts, checkouts };
});
rows.sort((a,b) => parseInt(a.hour) - parseInt(b.hour));
console.table(rows);

