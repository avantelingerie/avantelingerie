const fs = require('fs');
const content = fs.readFileSync('C:/Users/comer/.gemini/antigravity/brain/71d8d533-a528-4e32-8f7a-a35a59ca3c50/.system_generated/steps/3979/output.txt', 'utf8');
const data = JSON.parse(content);
const list = data.data || [];
list.forEach(c => {
  console.log(`\nCreative: [${c.id}] ${c.name}`);
  const story = c.object_story_spec;
  if (story && story.link_data) {
    console.log('Link:', story.link_data.link);
    console.log('CallToAction:', JSON.stringify(story.link_data.call_to_action));
  }
  if (story && story.video_data) {
    console.log('Video CallToAction:', JSON.stringify(story.video_data.call_to_action));
  }
});

