const bcrypt = require('bcryptjs');
const pool = require('../db/db');

async function CreateUser() {
    const name = 'Piter';
    const login = 'piternicolas';
    const password = '123456';
    
    const EncriptedPassword = await bcrypt.hash(password, 10);

    try { 
        await pool.query(
            'INSERT INTO tb_user (name, user_login, user_password) VALUES ($1, $2, $3)',
            [name, login, EncriptedPassword]
        );
        console.log('Usuário criado com sucesso!');
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    } finally {
        pool.end();
    }
}

CreateUser();