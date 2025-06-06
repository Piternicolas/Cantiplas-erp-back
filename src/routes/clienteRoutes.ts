import { Router } from 'express';
import { listarClientes } from '../controllers/clienteController';

const router = Router();

router.get('/clientes', listarClientes);

export default router; 