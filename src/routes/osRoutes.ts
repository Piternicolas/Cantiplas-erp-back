import { Router } from 'express';
import { criarOS } from '../controllers/osController';

const router = Router();

router.post('/ordens', criarOS);

export default router;
 