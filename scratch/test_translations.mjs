import axios from 'axios';

async function checkTranslations() {
  try {
    const res = await axios.post('https://api.melhorrastreio.com.br/graphql', {
      query: `
        query {
          findAllTranslatedTrackingEvents {
            id
            title
            description
            status
          }
        }
      `
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('Count:', res.data?.data?.findAllTranslatedTrackingEvents?.length);
    console.log('Sample:', JSON.stringify(res.data?.data?.findAllTranslatedTrackingEvents?.slice(0, 10), null, 2));
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

checkTranslations();
