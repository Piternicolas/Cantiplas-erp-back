import { Router } from 'express';
import { criarCliente, listarClientes } from '../controllers/clienteController';

const router = Router();

// Rota para listar todos os clientes
router.get('/clientes', listarClientes);

// rota para criar um novo cliente (a ser implementada)
router.post('/clientes', criarCliente);

export default router; 