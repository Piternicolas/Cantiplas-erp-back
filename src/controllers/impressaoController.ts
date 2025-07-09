import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Impressao } from "../entity/tb_impressao";
import { OrdemServicoPedido } from "../entity/tb_ordemservico_pedido";

// definir repositórios
const impressaoRepo = AppDataSource.getRepository(Impressao);
const osRepo = AppDataSource.getRepository(OrdemServicoPedido);

// criar dados de impressão com base no numero_os
export const criarImpressao = async (req: Request, res: Response) => {
    // extrair numero_os e outros dados do corpo da requisição
    const { numero_os, ...dadosImpressao } = req.body;

    try {
        // buscar a ordem de servico pelo numero_os
        const ordem = await osRepo.findOneBy({ numero_os: String(numero_os) });

        // verificar se a ordem de servico foi encontrada
        if (!ordem) {
            return res.status(404).json({ erro: "Ordem de serviço não encontrada pela coluna numero_os" });
        }

        // criar uma nova impressão vinculada à ordem encontrada
        const novaImpressao = impressaoRepo.create({
            ...dadosImpressao,
            pedido: ordem
        })

        // salvar a nova impressão no repositório
        const resultado = await impressaoRepo.save(novaImpressao);

        return res.status(201).json(resultado);
    } catch (error) {
        console.error('Erro ao criar impressao:', error);
        return res.status(500).json({ erro: "Erro ao criar impressão" });
    }
}