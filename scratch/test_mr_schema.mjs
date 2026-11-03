import axios from 'axios';

async function introspectTypes() {
  const query = `
    query {
      parcelType: __type(name: "Parcel") {
        name
        fields {
          name
          type {
            name
            kind
            ofType {
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
      inputObj: __type(name: "TrackerSearchInput") {
        name
        inputFields {
          name
          type {
            name
            kind
          }
        }
      }
    }
  `;

  try {
    const res = await axios.post('https://api.melhorrastreio.com.br/graphql', { query }, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Parcel fields:', res.data?.data?.parcelType?.fields?.map(f => f.name));
    console.log('TrackerSearchInput fields:', res.data?.data?.inputObj?.inputFields);
  } catch (e) {
    console.error(e.response?.data || e.message);
  }
}

introspectTypes();

