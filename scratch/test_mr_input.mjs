import axios from 'axios';

async function checkInput() {
  const query = `
    query {
      inputObj: __type(name: "TrackerSearchInput") {
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
      trackingEventObj: __type(name: "TrackingEvent") {
        fields {
          name
        }
      }
      carrierObj: __type(name: "Tracker") {
        fields {
          name
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

checkInput();

