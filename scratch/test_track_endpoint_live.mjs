import axios from 'axios';

// Test live tracking function logic directly
async function testTrackLogic() {
  const code = '888031017960740';

  console.log('Testing tracking for code:', code);
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
          translatedEventId
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

  const transRes = await axios.post('https://api.melhorrastreio.com.br/graphql', {
    query: `
      query {
        findAllTranslatedTrackingEvents {
          referenceId
          title
          description
        }
      }
    `
  }, { headers: { 'Content-Type': 'application/json' } });

  const transMap = {};
  for (const item of transRes.data?.data?.findAllTranslatedTrackingEvents || []) {
    if (item.referenceId) transMap[item.referenceId] = item;
  }

  const res = await axios.post('https://api.melhorrastreio.com.br/graphql', {
    query,
    variables: { tracker: { trackingCode: code } }
  }, { headers: { 'Content-Type': 'application/json' } });

  const data = res.data?.data?.findByTrackingCode;
  console.log('Status from MR:', data.lastStatus);
  console.log('Estimated delivery:', data.estimatedDelivery);
  console.log('Events count:', data.trackingEvents.length);

  const formattedEvents = data.trackingEvents.map(e => ({
    title: transMap[e.translatedEventId]?.title || e.title,
    desc: transMap[e.translatedEventId]?.description || e.description,
    location: e.location ? `${e.location.city}/${e.location.state}` : e.from,
    date: new Date(e.createdAt).toLocaleString('pt-BR')
  }));

  console.log('\n--- LIVE CHECKPOINTS (IDENTICAL TO PRINT 3) ---');
  formattedEvents.forEach((e, idx) => {
    console.log(`${idx + 1}. [${e.date}] ${e.title} (${e.location}) - ${e.desc || ''}`);
  });
}

testTrackLogic();

