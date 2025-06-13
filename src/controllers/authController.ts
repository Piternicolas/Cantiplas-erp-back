import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/db';

export const login = async (req: Request, res: Response) => {
  const { user_login, user_password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM tb_user WHERE user_login = $1', [user_login]);

    if (result.rows.length === 0) {
      res.status(401).json({ erro: 'Usuário não encontrado' });
      return;
    }

    const user = result.rows[0];
    const senhaValida = await bcrypt.compare(user_password, user.user_password);

    if (!senhaValida) {
      res.status(401).json({ erro: 'Senha incorreta' });
      return;
    }

    const token = jwt.sign({ id: user.id, nome: user.nome }, 'secreta', { expiresIn: '60m' });

    res.json({ token, user: { id: user.id, nome: user.nome, user_login: user.user_login } });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};
