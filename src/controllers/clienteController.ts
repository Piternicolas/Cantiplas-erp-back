import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Cliente } from '../entity/Cliente';

const clienteRepo = AppDataSource.getRepository(Cliente);

export const listarClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await clienteRepo.find()
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ erro: 'Erro ao buscar clientes' });
  }
};
 
 