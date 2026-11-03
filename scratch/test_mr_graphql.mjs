import axios from 'axios';

async function introspect() {
  try {
    const res = await axios.post('https://api.melhorrastreio.com.br/graphql', {
      query: `
        query {
          __schema {
            queryType {
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
              }
            }
          }
        }
      `
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    console.log('Query fields:');
    const fields = res.data?.data?.__schema?.queryType?.fields || [];
    fields.forEach(f => {
      console.log(`- ${f.name}(${f.args.map(a => a.name).join(', ')})`);
    });
  } catch (err) {
    console.error('Introspect error:', err.response?.data || err.message);
  }
}

introspect();

