import 'dotenv/config';
import express from 'express';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// GET /setup/fix-solicitacoes-revendedor - Fix collection schema and access rules
router.get('/fix-solicitacoes-revendedor', async (req, res) => {
  logger.info('[Setup] Starting fix-solicitacoes-revendedor endpoint');

  // 1. Fetch the 'solicitacoes_revendedor' collection
  const collection = await pb.collections.getOne('solicitacoes_revendedor', { $autoCancel: false });
  logger.info(`[Setup] Collection fetched: ${collection.name}`);

  // 2. Update the updateRule
  collection.updateRule = '@request.auth.id != ""';
  logger.info('[Setup] Updated updateRule to: @request.auth.id != ""');

  // 3. Find the 'status' field and ensure it has the correct select options
  const statusFieldIndex = collection.fields.findIndex(f => f.name === 'status');
  if (statusFieldIndex === -1) {
    throw new Error('Field "status" not found in collection "solicitacoes_revendedor"');
  }

  const statusField = collection.fields[statusFieldIndex];
  const requiredOptions = ['pendente', 'em_analise', 'aprovado', 'rejeitado', 'aprovado_automaticamente'];

  // Ensure the field is a select type
  if (statusField.type !== 'select') {
    throw new Error(`Field "status" is not a select type (current type: ${statusField.type})`);
  }

  // Update the options to match exactly
  statusField.options = statusField.options || {};
  statusField.options.values = requiredOptions;
  logger.info(`[Setup] Updated status field options to: ${requiredOptions.join(', ')}`);

  // 4. Save the collection changes via pb.collections.update()
  const updatedCollection = await pb.collections.update(collection.id, collection, { $autoCancel: false });
  logger.info(`[Setup] Collection "${updatedCollection.name}" updated successfully`);

  // 5. Return success response
  res.json({
    success: true,
    message: 'Collection updated successfully',
    collection: {
      id: updatedCollection.id,
      name: updatedCollection.name,
      updateRule: updatedCollection.updateRule,
      statusField: {
        name: updatedCollection.fields[statusFieldIndex].name,
        type: updatedCollection.fields[statusFieldIndex].type,
        options: updatedCollection.fields[statusFieldIndex].options.values
      }
    }
  });
});

export default router;
