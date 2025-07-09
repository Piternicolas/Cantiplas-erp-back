// src/index.ts
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import clienteRoutes from './src/routes/clienteRoutes';
import osRoutes from './src/routes/osRoutes';
import representanteRoutes from './src/routes/representanteRoutes';
import extrusaoRoutes from './src/routes/extrusaoRoutes';
import impressaoRoutes from './src/routes/impressaoRoutes';
import corteRoutes from './src/routes/corteRoutes';

dotenv.config();

import express from 'express';
import cors from 'cors';
import { AppDataSource } from './src/config/data-source';
import authRoutes from './src/routes/authRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Importando as rotas de ordens de serviço e clientes
app.use('/api', clienteRoutes);
app.use('/api', osRoutes);
app.use('/api', representanteRoutes)
app.use('/api', extrusaoRoutes)
app.use('/api', impressaoRoutes);
app.use('/api', corteRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Erro ao conectar no banco:', err));
