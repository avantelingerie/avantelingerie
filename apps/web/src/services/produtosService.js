import pb from '@/lib/pocketbaseClient.js';

export const produtosService = {
  async getProdutos(page = 1, limit = 20, filters = {}, sort = '-created') {
    try {
      const filterConditions = [];

      if (filters.search) {
        const searchTerm = filters.search.replace(/"/g, '\\"');
        filterConditions.push(`(name ~ "${searchTerm}" || reference ~ "${searchTerm}")`);
      }

      if (filters.categoria_id && filters.categoria_id !== 'all') {
        filterConditions.push(`categoria_id = "${filters.categoria_id}"`);
      }

      if (filters.status && filters.status !== 'all') {
        filterConditions.push(`status = ${filters.status === 'ativo'}`);
      }

      const options = {
        sort: sort, 
        expand: 'categoria_id',
        $autoCancel: false
      };

      if (filterConditions.length > 0) {
        options.filter = filterConditions.join(' && ');
      }

      return await pb.collection('products').getList(page, limit, options);
    } catch (error) {
      console.error('Error fetching produtos:', error);
      throw error;
    }
  },

  async getProdutoById(id) {
    try {
      return await pb.collection('products').getOne(id, {
        expand: 'categoria_id',
        $autoCancel: false
      });
    } catch (error) {
      console.error('Error fetching produto:', error);
      throw error;
    }
  },

  async createProduto(data) {
    try {
      return await pb.collection('products').create(data, { $autoCancel: false });
    } catch (error) {
      console.error('Error creating produto:', error);
      throw error;
    }
  },

  async updateProduto(id, data) {
    try {
      return await pb.collection('products').update(id, data, { $autoCancel: false });
    } catch (error) {
      console.error('Error updating produto:', error);
      throw error;
    }
  },

  async deleteProduto(id) {
    try {
      return await pb.collection('products').delete(id, { $autoCancel: false });
    } catch (error) {
      console.error('Error deleting produto:', error);
      throw error;
    }
  },

  async getProdutosDestaque(limit = 8) {
    try {
      return await pb.collection('products').getList(1, limit, {
        filter: 'is_promocao = true',
        sort: '-vendidos_semana',
        $autoCancel: false
      });
    } catch (error) {
      console.error('Error fetching produtos destaque:', error);
      throw error;
    }
  },

  async getNovidades(limit = 8) {
    try {
      return await pb.collection('products').getList(1, limit, {
        filter: 'is_novidade = true',
        sort: '-created',
        $autoCancel: false
      });
    } catch (error) {
      console.error('Error fetching novidades:', error);
      throw error;
    }
  }
};