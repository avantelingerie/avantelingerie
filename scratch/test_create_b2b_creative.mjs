import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

// Hashes das imagens de revenda
const feedHash = 'f162289da01be298d52357b1358c34c7';
const storiesHash = '0144e6a65174b2b0030c7a5b19b92ee9';

const pageId = '1051489401388433';
const instagramId = '17841421480843011';

async function testCreateB2BCreative() {
  try {
    const payload = {
      name: 'Criativo B2B - Comece a Revender R$ 69,90 (Feed)',
      object_story_spec: {
        page_id: pageId,
        instagram_user_id: instagramId,
        link_data: {
          image_hash: feedHash,
          link: 'https://avantelingerie.com.br/quero-revender?utm_source=meta&utm_medium=cbo&utm_campaign=b2b_atacado&utm_content=feed_revenda',
          message: 'Chega de pedidos mínimos abusivos de R$ 500 ou R$ 1.000!\n\nNa Avante Lingerie, você compra direto da fábrica em Nova Friburgo com pedido mínimo de apenas R$ 69,90 na sacola e margem de 100% a 150% de lucro para o fim de ano.\n\n📦 Peças de ateliê com acabamento nobre e pronta-entrega.\n🏷️ Compre com CPF ou CNPJ, sem burocracia.\n💬 Fale com a consultora Lia no WhatsApp e receba o catálogo de fábrica completo!',
          name: 'Comece a Revender com Apenas R$ 69,90',
          description: 'Fábrica em Nova Friburgo/RJ | Pronta Entrega para Todo Brasil',
          call_to_action: {
            type: 'LEARN_MORE',
            value: {
              link: 'https://avantelingerie.com.br/quero-revender?utm_source=meta&utm_medium=cbo&utm_campaign=b2b_atacado&utm_content=feed_revenda'
            }
          }
        }
      },
      degrees_of_freedom_spec: {
        creative_features_spec: {
          advantage_plus_creative: { enroll_status: 'OPT_OUT' },
          enhance_cta: { enroll_status: 'OPT_OUT' },
          product_browsing: { enroll_status: 'OPT_OUT' }
        }
      },
      contextual_multi_ads: { enroll_status: 'OPT_OUT' }
    };

    const res = await axios.post(`https://graph.facebook.com/v21.0/${accountId}/adcreatives`, payload, {
      params: { access_token: token }
    });
    console.log('Creative created successfully:', res.data);
    return res.data.id;
  } catch (err) {
    console.error('Failed to create creative:', err.response?.data || err.message);
  }
}

testCreateB2BCreative();
