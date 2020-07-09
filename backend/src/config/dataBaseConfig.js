import { logger } from './logger.js';
import { db } from '../models/index.js';

export default async () => {
  try {
    const connection = await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    logger.info('Conectado ao banco de dados');
    logger.info(`Server rodando na porta ${process.env.PORT}`)
  } catch (error) {
    logger.error(`Erro ao conectar no banco de dados! ${error}`);
    process.exit();
  }
}