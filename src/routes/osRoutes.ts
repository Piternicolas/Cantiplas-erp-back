import { Router } from 'express';
import { criarOS, listarOS } from '../controllers/osController';

const router = Router();

// POST: Criar nova ordem de serviço
router.post('/ordens', criarOS);

// GET: Listar todas ou buscar por numero_os
router.get('/ordens', listarOS);

export default router;
