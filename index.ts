// src/index.ts
import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { AppDataSource } from './src/config/data-source';
import authRoutes from './src/routes/authRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Erro ao conectar no banco:', err));
