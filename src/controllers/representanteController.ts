import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Representantes } from "../entity/tb_representantes";

const representanteRepo = AppDataSource.getRepository(Representantes);

// listar todos os representantes
export const listarRepresentantes = async (req: Request, res: Response) => {
    try {
        const representantes = await representanteRepo.find();
        return res.json(representantes);
    } catch (error) {
        console.error('Erro ao buscar representante:', error);
        return res.status(500).json({ erro: 'Erro ao buscar representante:' })
    }
};

// criar um novo representante
export const criarRepresentante = async (req: Request, res: Response) => {
    try {
        const novoRepresentante = representanteRepo.create(req.body);

        const salvarRepresentante = await representanteRepo.save(novoRepresentante);
        return res.status(201).json(salvarRepresentante);
    } catch (error) {
        console.error('Erro ao criar representante:', error);
        return res.status(500).json({ error: 'Erro ao criar representante'});
    }
}