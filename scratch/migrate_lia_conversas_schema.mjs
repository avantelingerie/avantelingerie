import fs from 'fs';
import PocketBase from 'pocketbase';

async function migrate() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  try {
    await pb.collection('_superusers').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    console.log('1. Autenticado como superusuário no PocketBase.');

    // 1. BACKUP DE SEGURANÇA
    const records = await pb.collection('lia_conversas').getFullList();
    fs.writeFileSync('scratch/backup_lia_conversas.json', JSON.stringify(records, null, 2), 'utf8');
    console.log(`2. Backup realizado com sucesso! Total de registros: ${records.length}`);

    // 2. ATUALIZAR SCHEMA
    const col = await pb.collections.getOne('lia_conversas');
    console.log('3. Schema atual recuperado. Total de campos:', col.fields.length);

    // Garante que não haja duplicatas
    const existingFieldNames = new Set(col.fields.map(f => f.name));

    const fieldsToAdd = [];
    if (!existingFieldNames.has('cliente_nome')) {
      fieldsToAdd.push({
        name: 'cliente_nome',
        type: 'text',
        required: false,
        system: false,
        presentable: false
      });
    }

    if (!existingFieldNames.has('created')) {
      fieldsToAdd.push({
        name: 'created',
        type: 'autodate',
        onCreate: true,
        onUpdate: false,
        system: false,
        hidden: false,
        presentable: false
      });
    }

    if (!existingFieldNames.has('updated')) {
      fieldsToAdd.push({
        name: 'updated',
        type: 'autodate',
        onCreate: true,
        onUpdate: true,
        system: false,
        hidden: false,
        presentable: false
      });
    }

    if (fieldsToAdd.length > 0) {
      col.fields = [...col.fields, ...fieldsToAdd];
      await pb.collections.update('lia_conversas', col);
      console.log('4. Schema atualizado no PocketBase com novos campos:', fieldsToAdd.map(f => f.name));
    } else {
      console.log('4. Todos os campos já existem no schema.');
    }

    // 3. ATUALIZAÇÃO SEGURA DOS REGISTROS (BACKFILL DE DATAS E NOMES)
    console.log('5. Atualizando registros existentes para popular created/updated e nomes...');
    for (const r of records) {
      const updateData = {};

      // Se for a conversa do Luiz Machado (@lid 218021)
      if (r.session_id.includes('218021') && !r.cliente_nome) {
        updateData.cliente_nome = 'Luiz Machado';
      }

      // Se mensagens tiverem timestamps, ou se não tiver, vamos garantir um update para o PocketBase gerar updated
      const msgs = r.mensagens || [];
      let lastTs = null;
      let firstTs = null;

      // Se mensagens não tiverem timestamp, injetar timestamps graduais
      let modifiedMsgs = false;
      const baseDate = new Date(Date.now() - 3600000); // 1h atrás
      const newMsgs = msgs.map((m, idx) => {
        if (!m.timestamp) {
          modifiedMsgs = true;
          return {
            ...m,
            timestamp: new Date(baseDate.getTime() + idx * 30000).toISOString()
          };
        }
        return m;
      });

      if (modifiedMsgs) {
        updateData.mensagens = newMsgs;
      }

      // Se temos campos para atualizar ou se updated não existe
      if (Object.keys(updateData).length > 0 || !r.updated) {
        // Dispara o update para o PocketBase atribuir o autodate
        await pb.collection('lia_conversas').update(r.id, updateData);
      }
    }

    console.log('6. Registros atualizados com sucesso!');

    // 4. TESTE DA ORDENAÇÃO NATIVA (-updated)
    const testSort = await pb.collection('lia_conversas').getList(1, 10, {
      sort: '-updated'
    });
    console.log('7. TESTE DE ORDENAÇÃO (-updated) SUCESSO! Registros retornados:', testSort.items.length);
    console.log('Primeiro registro após ordenação:');
    console.log({
      id: testSort.items[0].id,
      session_id: testSort.items[0].session_id,
      canal: testSort.items[0].canal,
      cliente_nome: testSort.items[0].cliente_nome,
      updated: testSort.items[0].updated,
      msgs: testSort.items[0].mensagens?.length
    });

  } catch (err) {
    console.error('ERRO na migração:', err.message, err.data);
  }
}

migrate();

