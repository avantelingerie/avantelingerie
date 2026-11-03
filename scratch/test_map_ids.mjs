import axios from 'axios';

async function checkIds() {
  const res = await axios.post('https://api.melhorrastreio.com.br/graphql', {
    query: `
      query {
        findAllTranslatedTrackingEvents {
          id
          title
          description
          referenceId
        }
      }
    `
  }, {
    headers: { 'Content-Type': 'application/json' }
  });

  const list = res.data?.data?.findAllTranslatedTrackingEvents || [];
  const map = {};
  list.forEach(e => {
    map[e.referenceId] = e;
  });

  console.log('ID 6:', map[6]);
  console.log('ID 33:', map[33]);
  console.log('ID 84:', map[84]);
}

checkIds();

