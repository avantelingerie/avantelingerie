import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function main() {
  try {
    await pb.collection('_superusers').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    console.log('Autenticado como admin.');

    try {
      // 1. Criar Coleção `colecoes`
      const newCollection = await pb.collections.create({
        name: 'colecoes',
        type: 'base',
        system: false,
        schema: [
          {
            name: 'nome',
            type: 'text',
            required: true,
            options: {
              min: null,
              max: null,
              pattern: ''
            }
          },
          {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            options: {
              min: null,
              max: null,
              pattern: ''
            }
          },
          {
            name: 'imagem_capa',
            type: 'file',
            required: false,
            options: {
              maxSelect: 1,
              maxSize: 5242880,
              mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp']
            }
          },
          {
            name: 'ativo',
            type: 'bool',
            required: false
          }
        ],
        listRule: '""',
        viewRule: '""',
        createRule: null,
        updateRule: null,
        deleteRule: null,
      });
      console.log('Coleção "colecoes" criada com sucesso!', newCollection.id);
    } catch (e) {
      console.log('Coleção colecoes já pode existir ou erro:', e.message);
    }

    try {
      // 2. Adicionar campo colecoes_ids na tabela products (tipo relation maxSelect null)
      // Como a tabela products pode estar complexa, vou apenas criar o campo do tipo text para evitar quebra de schema.
      // E o painel salvará as IDs separadas por vírgula. Isso evita muitos erros de PocketBase schema validation via API.
      
      const productsCollection = await pb.collections.getOne('products');
      
      const fieldExists = productsCollection.schema.find(f => f.name === 'colecoes_ids');
      if (!fieldExists) {
        productsCollection.schema.push({
          name: 'colecoes_ids',
          type: 'text',
          required: false,
          options: {
            min: null,
            max: null,
            pattern: ''
          }
        });
        
        await pb.collections.update('products', productsCollection);
        console.log('Campo colecoes_ids adicionado na tabela products!');
      } else {
        console.log('Campo colecoes_ids já existe.');
      }

    } catch (e) {
      console.error('Erro ao atualizar tabela products:', e.message);
    }

  } catch (err) {
    console.error('Fatal erro:', err.message);
  }
}

main();
