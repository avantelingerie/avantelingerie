import pb from './pocketbaseClient.js';
import axios from 'axios';
import logger from './logger.js';

/**
 * Renova o token do Bling usando o refresh token salvo no PocketBase
 * @param {string} refreshToken 
 * @returns {Promise<object>} Objeto contendo access_token, refresh_token e expires_in
 */
export async function refreshBlingToken(refreshToken) {
  const clientIdRecord = await pb.collection('integracoes_config').getFirstListItem('servico="bling" && chave_nome="client_id"').catch(() => null);
  const clientSecretRecord = await pb.collection('integracoes_config').getFirstListItem('servico="bling" && chave_nome="client_secret"').catch(() => null);

  if (!clientIdRecord?.chave_valor || !clientSecretRecord?.chave_valor) {
    throw new Error('Credenciais do Bling (client_id ou client_secret) não configuradas no banco de dados.');
  }

  const clientId = clientIdRecord.chave_valor;
  const clientSecret = clientSecretRecord.chave_valor;
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await axios.post(
    'https://www.bling.com.br/Api/v3/oauth/token',
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
    }
  );

  if (!response.data || !response.data.access_token) {
    throw new Error('Resposta inválida do Bling na renovação do token');
  }

  return response.data;
}

/**
 * Obtém um token de acesso do Bling válido. Se estiver expirado, renova automaticamente.
 * @returns {Promise<string>} O access_token válido
 */
export async function getBlingToken() {
  const records = await pb.collection('bling_tokens').getFullList({
    sort: '-created',
    limit: 1
  });

  if (records.length === 0) {
    throw new Error('Nenhum token do Bling encontrado no banco de dados. Realize a autorização OAuth.');
  }

  const tokenRecord = records[0];
  const { id, access_token, refresh_token, expires_in, updated } = tokenRecord;

  // Verifica se o token expirou ou expira em menos de 5 minutos (margem de segurança)
  const updatedTime = new Date(updated).getTime();
  const expiresTime = updatedTime + (expires_in - 300) * 1000;
  const isExpired = Date.now() >= expiresTime;

  if (isExpired) {
    logger.info('Token do Bling expirado ou próximo da expiração. Iniciando renovação automática...');
    try {
      const newTokens = await refreshBlingToken(refresh_token);
      
      const updatedRecord = await pb.collection('bling_tokens').update(id, {
        access_token: newTokens.access_token,
        refresh_token: newTokens.refresh_token || refresh_token,
        expires_in: newTokens.expires_in,
      });

      logger.info('Token do Bling renovado com sucesso e salvo no PocketBase.');
      return updatedRecord.access_token;
    } catch (error) {
      const apiErrorMsg = error.response?.data?.error?.message || error.response?.data?.message || error.message;
      logger.error(`Erro ao renovar token do Bling: ${apiErrorMsg}`);
      throw new Error(`Falha na renovação automática do token Bling: ${apiErrorMsg}`);
    }
  }

  return access_token;
}

export default {
  getBlingToken,
  refreshBlingToken
};