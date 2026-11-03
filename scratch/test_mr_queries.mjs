import axios from 'axios';

async function testOtherQueries() {
  const code = '888031017960740';
  
  // Introspect findByTracker and findByTrackingCode
  const query = `
    query {
      findByTracker: __type(name: "Query") {
        fields {
          name
          args {
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
    const fields = res.data?.data?.findByTracker?.fields || [];
    const interesting = fields.filter(f => f.name.includes('Track') || f.name.includes('Parcel'));
    console.log(JSON.stringify(interesting, null, 2));
  } catch (e) {
    console.error(e.response?.data || e.message);
  }
}

testOtherQueries();

