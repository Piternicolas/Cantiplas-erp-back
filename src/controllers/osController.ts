import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { OrdemServico } from '../entity/OrdemServico';
import { Cliente } from '../entity/Cliente';

const osRepo = AppDataSource.getRepository(OrdemServico);
const clienteRepository = AppDataSource.getRepository(Cliente);

export const criarOS = async (req: Request, res: Response): Promise<void> => {
  const {
    cliente_id,
    data_pedido,
    criado_por,
    representante,
    situacao,
    qnt_pedido,
    colorido,
    estampado,
  } = req.body;

  try {
    const cliente = await clienteRepository.findOneBy({ cliente_id });

    if (!cliente) {
      res.status(404).json({ error: 'Cliente não encontrado' });
      return;
    }

    const novaOS = osRepo.create({
      cliente,
      data_pedido,
      criado_por,
      representante,
      situacao,
      qnt_pedido,
      colorido,
      estampado,
    });

    const salvaOS = await osRepo.save(novaOS);
    res.status(201).json(salvaOS);
  } catch (error) {
    console.error('Erro ao criar Ordem de Serviço:', error);
    res.status(500).json({ error: 'Erro ao criar Ordem de Serviço' });
  }
};
