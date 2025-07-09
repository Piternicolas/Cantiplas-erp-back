import { Router } from "express";
import { criarExtrusao } from "../controllers/extrusaoController";

const router = Router();

router.post('/extrusao', criarExtrusao);

export default router;