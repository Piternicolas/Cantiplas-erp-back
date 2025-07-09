import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Corte } from '../entity/tb_corte';
import { OrdemServicoPedido } from '../entity/tb_ordemservico_pedido';

const corteRepo = AppDataSource.getRepository(Corte);
const osRepo = AppDataSource.getRepository(OrdemServicoPedido);

export const criarCorte = async (req: Request, res: Response) => {
    const { numero_os, ...dadosCorte } = req.body;

    try {
        const ordem = await osRepo.findOneBy({ numero_os: String(numero_os)});

        if (!ordem) {
            return res.status(404).json({ erro: 'Ordem de serviço não encontrada pelo numero_os' });
        }

        const novoCorte = corteRepo.create({
            ...dadosCorte, pedido: ordem
        })

        const resultado = await corteRepo.save(novoCorte);
        return res.status(201).json(resultado);
    } catch (error) {
        console.error('Erro ao criar corte:', error);
        return res.status(500).json({ erro: 'Erro ao criar corte' });
    }
}