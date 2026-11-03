import axios from 'axios';

async function testParcel() {
  const code = '888031017960740';
  
  // Introspect findParcel return type
  const typeQuery = `
    query {
      __type(name: "Query") {
        fields {
          name
          type {
            name
            kind
            ofType {
              name
              kind
              fields {
                name
                type {
                  name
                  kind
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await axios.post('https://api.melhorrastreio.com.br/graphql', {
      query: `
        query test($code: String!) {
          findByTracker(tracker: $code) {
            id
            status
            tracker
            carrier
            createdAt
            updatedAt
            lastSyncTracker
            expectedDelivery
            events {
              id
              status
              createdAt
              description
              location {
                city
                state
              }
            }
          }
        }
      `,
      variables: { code }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    console.log('Result of findByTracker:');
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.log('Error findByTracker:', err.response?.data || err.message);
  }

  // Also try findParcel
  try {
    const res2 = await axios.post('https://api.melhorrastreio.com.br/graphql', {
      query: `
        query test2($code: String!) {
          findParcel(tracker: $code) {
            id
            status
            tracker
            carrier
            createdAt
            updatedAt
            lastSyncTracker
            expectedDelivery
            events {
              id
              status
              createdAt
              description
              location {
                city
                state
              }
            }
          }
        }
      `,
      variables: { code }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    console.log('Result of findParcel:');
    console.log(JSON.stringify(res2.data, null, 2));
  } catch (err) {
    console.log('Error findParcel:', err.response?.data || err.message);
  }
}

testParcel();

