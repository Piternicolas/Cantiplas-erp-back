import { Router } from 'express';
import { criarOS } from '../controllers/osController';

const router = Router();

// rota post para criar uma nova Ordem de Serviço
router.post('/ordens', criarOS);

export default router;
  