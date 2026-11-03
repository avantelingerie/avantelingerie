import axios from 'axios';

async function checkTrackerTrackingCode() {
  const query = `
    query {
      inputObj: __type(name: "TrackerTrackingCode") {
        name
        inputFields {
          name
          type {
            name
            kind
            ofType {
              name
              kind
            }
          }
        }
      }
    }
  `;

  try {
    const res = await axios.post('https://api.melhorrastreio.com.br/graphql', { query }, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(JSON.stringify(res.data, null, 2));
  } catch (e) {
    console.error(e.response?.data || e.message);
  }
}

checkTrackerTrackingCode();

