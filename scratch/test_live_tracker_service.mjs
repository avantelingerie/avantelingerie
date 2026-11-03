import axios from 'axios';

// Translation map cache for referenceId -> human friendly text
let translationsMap = null;

async function getTranslations() {
  if (translationsMap) return translationsMap;
  try {
    const res = await axios.post('https://api.melhorrastreio.com.br/graphql', {
      query: `
        query {
          findAllTranslatedTrackingEvents {
            referenceId
            title
            description
          }
        }
      `
    }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000
    });
    const list = res.data?.data?.findAllTranslatedTrackingEvents || [];
    translationsMap = {};
    for (const item of list) {
      if (item.referenceId) {
        translationsMap[item.referenceId] = {
          title: item.title,
          description: item.description
        };
      }
    }
  } catch (err) {
    console.error('Failed to fetch translations:', err.message);
    translationsMap = {};
  }
  return translationsMap;
}

export async function fetchLiveTracking(code) {
  const cleanCode = (code || '').trim().toUpperCase();
  if (!cleanCode) return null;

  try {
    const transMap = await getTranslations();

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

    const res = await axios.post('https://api.melhorrastreio.com.br/graphql', {
      query,
      variables: {
        tracker: {
          trackingCode: cleanCode
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AvanteLingerieBot/1.0'
      },
      timeout: 8000
    });

    const data = res.data?.data?.findByTrackingCode;
    if (!data || !data.trackingEvents || data.trackingEvents.length === 0) {
      return null;
    }

    // Determine carrier name
    let carrierName = 'Transportadora Parceira';
    if (data.trackers && data.trackers.length > 0) {
      const activeTracker = data.trackers.find(t => t.type !== 'melhorenvio') || data.trackers[0];
      if (activeTracker.type === 'jet') carrierName = 'J&T Express';
      else if (activeTracker.type === 'correios') carrierName = 'Correios';
      else if (activeTracker.type === 'jadlog') carrierName = 'Jadlog';
      else if (activeTracker.type === 'azul') carrierName = 'Azul Cargo';
      else if (activeTracker.type === 'loggi') carrierName = 'Loggi';
      else if (activeTracker.type) carrierName = activeTracker.type.toUpperCase();
    }

    // Map status and progress steps
    const lastStatus = (data.lastStatus || '').toUpperCase();
    let statusText = 'Em Trânsito';
    let activeStep = 3;
    let completedSteps = [1, 2];
    let progressPercent = 60;

    if (lastStatus === 'DELIVERED' || data.deliveredAt) {
      statusText = 'Entregue com Sucesso';
      activeStep = 5;
      completedSteps = [1, 2, 3, 4];
      progressPercent = 100;
    } else if (lastStatus === 'OUT_FOR_DELIVERY' || lastStatus === 'ROTA_DE_ENTREGA') {
      statusText = 'Na Rota de Entrega';
      activeStep = 4;
      completedSteps = [1, 2, 3];
      progressPercent = 85;
    } else if (lastStatus === 'POSTED') {
      statusText = 'Pacote Postado (Em Trânsito)';
      activeStep = 3;
      completedSteps = [1, 2];
      progressPercent = 60;
    } else if (lastStatus === 'CREATED' || lastStatus === 'PENDING') {
      statusText = 'Etiqueta Criada / Pronto p/ Envio';
      activeStep = 2;
      completedSteps = [1];
      progressPercent = 35;
    }

    // Map estimated delivery date
    let etaFormatted = 'A caminho';
    if (data.estimatedDelivery) {
      const d = new Date(data.estimatedDelivery);
      if (!isNaN(d.getTime())) {
        etaFormatted = d.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
      }
    }

    // Sort events latest first
    const sortedEvents = [...data.trackingEvents].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const history = sortedEvents.map((evt, idx) => {
      const trans = transMap[evt.translatedEventId];
      const title = trans?.title || evt.title || 'Movimentação do pacote';
      const desc = trans?.description ? `${trans.description}` : (evt.description || '');
      const fullText = desc ? `${title} — ${desc}` : title;

      let locStr = 'Em Trânsito';
      if (evt.location?.city && evt.location?.state) {
        locStr = `${evt.location.city}/${evt.location.state}`;
      } else if (evt.from) {
        locStr = evt.from;
      }

      const evtDate = new Date(evt.createdAt);
      const timeFormatted = isNaN(evtDate.getTime()) 
        ? evt.createdAt 
        : evtDate.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Sao_Paulo'
          });

      return {
        time: timeFormatted,
        desc: fullText,
        location: locStr,
        isLatest: idx === 0
      };
    });

    return {
      carrierName,
      status: statusText,
      etaDate: etaFormatted,
      progressPercent,
      stepsConfig: { activeStep, completedSteps },
      history
    };
  } catch (err) {
    console.error('[LiveTracking] Error fetching tracking:', err.message);
    return null;
  }
}

async function run() {
  const result = await fetchLiveTracking('888031017960740');
  console.log('Result:', JSON.stringify(result, null, 2));
}

run();

