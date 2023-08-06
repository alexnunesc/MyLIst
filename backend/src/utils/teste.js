const { MongoClient, ObjectId } = require('mongodb');

const uri = 'URL_DO_SEU_BANCO_DE_DADOS';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function deleteTask(taskId) {
  try {
    await client.connect();
    const database = client.db('NOME_DO_SEU_BANCO_DE_DADOS');
    const tasksCollection = database.collection('tasks');
    
    const query = { _id: ObjectId(taskId) }; // Convertendo o ObjectId

    const result = await tasksCollection.deleteOne(query);
    
    if (result.deletedCount === 1) {
      console.log('Task deletada com sucesso!');
    } else {
      console.log('Nenhuma task foi deletada.');
    }
  } catch (err) {
    console.error('Erro ao deletar a task:', err);
  } finally {
    await client.close();
  }
}

const taskIdToDelete = 'aqui_vai_o_objectid_da_task';
deleteTask(taskIdToDelete);