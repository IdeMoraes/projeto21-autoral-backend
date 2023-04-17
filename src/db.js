import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
const { Client } = pkg;
const postgres = new Client({
    connectionString: process.env.CONNECTION_STRING,
});
postgres.connect((err) => {
    if (err) {
      console.error('Erro ao conectar', err);
    } else {
      console.log('Conexão bem sucedida');
    }
});  
export default postgres;