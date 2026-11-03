import axios from 'axios';

async function testCarrier() {
  const query = `
    query getCarrier($code: String!) {
      carriers: carriersFromTrackingCode(code: $code)
      trackerEnum: __type(name: "TrackerType") {
        enumValues {
          name
        }
      }
    }
  `;

  try {
    const res = await axios.post('https://api.melhorrastreio.com.br/graphql', {
      query,
      variables: { code: '888031017960740' }
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(JSON.stringify(res.data, null, 2));
  } catch (e) {
    console.error(e.response?.data || e.message);
  }
}

testCarrier();

