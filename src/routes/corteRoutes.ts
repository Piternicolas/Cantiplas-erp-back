import { Router } from "express";
import { criarCorte } from "../controllers/corteController";

const router = Router();

router.post('/corte', criarCorte)

export default router;
