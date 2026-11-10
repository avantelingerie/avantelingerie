import axios from 'axios';

const pageToken = 'EAAcPLAUV6GQBS5gXySrWYxZBeknaLspCTnoV6iLnn7cA0rE87OoZCxPBGZBPiZCny9QTFvGMpcCVhcZAA8iXBgpUdogYoEA6udpNM8gGpIh1XyAmacTP7YqFnezZAmH6glq843Pjjf2AjBN0W3usJb7xvt00QOMR4Xe6NEkevvX1MbniJuBwGruvhx1H3vK5UgLqms';

async function checkPage() {
  try {
    const url = `https://graph.facebook.com/v21.0/1051489401388433?fields=id,name,link&access_token=${pageToken}`;
    const res = await axios.get(url);
    console.log('Page info:', res.data);
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

checkPage();
