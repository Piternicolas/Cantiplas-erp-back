const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/db');

// Aqui é onde a lógica de autenticação é implementada
// O controller de autenticação é responsável por lidar com a lógica de autenticação
exports.login = async (req, res) => {
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

    const token = jwt.sign({ id: user.id, nome: user.nome }, 'secreta', { expiresIn: '5m' });

    res.json({ token, user: { id: user.id, nome: user.nome, user_login: user.user_login } });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};
