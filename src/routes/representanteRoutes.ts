import { Router } from 'express';
import { criarRepresentante, listarRepresentantes } from '../controllers/representanteController';

const router = Router();

router.get('/representantes', listarRepresentantes);

router.post('/representantes', criarRepresentante);

export default router;