import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Extrusao } from '../entity/tb_extrusao';
import { OrdemServicoPedido } from '../entity/tb_ordemservico_pedido';

const extrusaoRepo = AppDataSource.getRepository(Extrusao);
const osRepo = AppDataSource.getRepository(OrdemServicoPedido);

// Criar dados de extrusão com base no numero_os
export const criarExtrusao = async (req: Request, res: Response) => {
  const { numero_os, ...dadosExtrusao } = req.body;

  try {
    // Buscar a ordem de serviço correspondente
    const ordem = await osRepo.findOneBy({ numero_os: String(numero_os) });

    if (!ordem) {
      return res.status(404).json({ erro: 'Ordem de serviço não encontrada' });
    }

    // Criar extrusão vinculada à ordem encontrada
    const novaExtrusao = extrusaoRepo.create({
      ...dadosExtrusao,
      pedido: ordem
    });

    const resultado = await extrusaoRepo.save(novaExtrusao);

    return res.status(201).json(resultado);
  } catch (error) {
    console.error('Erro ao criar extrusão:', error);
    return res.status(500).json({ erro: 'Erro ao criar extrusão' });
  }
};
