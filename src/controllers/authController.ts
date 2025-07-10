import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/db';

export const login = async (req: Request, res: Response) => {
  const { user_login, user_password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM tb_user WHERE user_login = $1', [user_login]);

    if (result.rows.length === 0) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    const user = result.rows[0];
    const senhaValida = await bcrypt.compare(user_password, user.user_password);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id, nome: user.nome }, process.env.JWT_SECRET as string, { expiresIn: '60m' });

    return res.json({ token, user});
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};
