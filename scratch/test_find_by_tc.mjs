import axios from 'axios';

async function testFindByTrackingCode() {
  const query = `
    query getByCode($tracker: TrackerTrackingCode!) {
      findByTrackingCode(tracker: $tracker) {
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
          trackingCode: '888031017960740'
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    console.log('Result of findByTrackingCode:');
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

testFindByTrackingCode();

