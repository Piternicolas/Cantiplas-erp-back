import { Router } from "express";
import { criarImpressao } from "../controllers/impressaoController";

const router = Router();

router.post('/impressao', criarImpressao);

export default router;