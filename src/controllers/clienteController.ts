import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Clientes } from '../entity/tb_clientes';

const clienteRepo = AppDataSource.getRepository(Clientes);

// listar todos os clientes
export const listarClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await clienteRepo.find()
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return res.status(500).json({ erro: 'Erro ao buscar clientes' });
  }
};

// criar um novo cliente
export const criarCliente = async (req: Request, res: Response) => {
  try {
    const novoCliente = clienteRepo.create(req.body);

    const salvarCliente = await clienteRepo.save(novoCliente);
    
    return res.status(201).json(salvarCliente);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return res.status(500).json({ error: 'Erro ao criar Cliente' });
  }
}