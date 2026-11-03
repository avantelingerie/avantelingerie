import axios from 'axios';

async function testFindParcel() {
  const query = `
    query getParcel($tracker: TrackerSearchInput!) {
      findParcel(tracker: $tracker) {
        id
        lastStatus
        estimatedDelivery
        postedAt
        deliveredAt
        trackers {
          type
          shippingService
          trackingCode
        }
        trackingEvents {
          trackingCode
          createdAt
          status
          title
          description
          location {
            city
            state
          }
          from
          to
        }
      }
    }
  `;

  try {
    const res = await axios.post('https://api.melhorrastreio.com.br/graphql', {
      query,
      variables: {
        tracker: {
          type: 'jet',
          trackingCode: '888031017960740'
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    console.log('findParcel response:');
    console.log(JSON.stringify(res.data, null, 2));
  } catch (e) {
    console.error('Error:', e.response?.data || e.message);
  }
}

testFindParcel();
