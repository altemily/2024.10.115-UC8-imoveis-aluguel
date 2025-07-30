const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const sequelize = require('./src/config/configDB');

const authRoute = require('./src/modules/autenticacao/routes/autenticacao.routes');
const usuarioRoute = require('./src/modules/usuario/routes/usuario.routes');
const imovelRoute = require('./src/modules/imovel/routes/imovel.routes');
const proprietarioRoute = require('./src/modules/proprietario/routes/proprietario.routes');


dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true            
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/usuarios', usuarioRoute);
app.use('/api/imoveis', imovelRoute);
app.use('/api/proprietarios', proprietarioRoute);


const PORTA = process.env.PORTA;

app.listen(PORTA, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } 
  catch (err) {
    console.error('Erro ao conectar ou sincronizar o banco de dados:', err);
  }

  console.log(`Servidor rodando na porta ${PORTA}`);
});
