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
 
export const criarCliente = async (req: Request, res: Response) => {
  const {
    nome,
    razaosocial,
    email,
    telefone,
    endereco,
    cidade,
    estado,
    cep
  } = req.body;

  try {
    const novoCliente = clienteRepo.create({
      nome,
      razaosocial,
      email,
      telefone,
      endereco,
      cidade,
      estado,
      cep
    });

    const salvarCliente = await clienteRepo.save(novoCliente);
    res.status(201).json(salvarCliente);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ error: 'Erro ao criar Cliente' });
  }
}