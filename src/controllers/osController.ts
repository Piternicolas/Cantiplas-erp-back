import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { OrdemServicoPedido } from '../entity/tb_ordemservico_pedido';

const osRepo = AppDataSource.getRepository(OrdemServicoPedido);

// Criar nova ordem de serviço
export const criarOS = async (req: Request, res: Response) => {
  try {
    const novaOS = osRepo.create(req.body);
    const resultado = await osRepo.save(novaOS);
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Erro ao criar ordem de serviço:', error);
    res.status(500).json({ erro: 'Erro ao criar ordem de serviço' });
  }
};

// Listar todas as ordens ou pesquisar por numero_os
export const listarOS = async (req: Request, res: Response) => {
  try {
    const { numero_os } = req.query;

    if (numero_os) {
      const ordem = await osRepo.findOne({
        where: { numero_os: String(numero_os) },
        relations: ['cliente', 'representante', 'extrusao', 'impressao', 'corte']
      });

      if (!ordem) {
        return res.status(404).json({ erro: 'Ordem de serviço não encontrada pelo numero_os' });
      }

      return res.json(ordem);
    }

    // Se não houver filtro, retorna todas
    const ordens = await osRepo.find({
      relations: ['cliente', 'representante', 'extrusao', 'impressao', 'corte'],
      order: { pedido_id: 'DESC' }
    });

    return res.json(ordens);
  } catch (error) {
    console.error('Erro ao buscar ordens de serviço:', error);
    return res.status(500).json({ erro: 'Erro ao buscar ordens de serviço' });
  }
};
