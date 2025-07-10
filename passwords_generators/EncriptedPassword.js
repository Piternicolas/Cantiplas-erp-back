// criptografarSenha.js
const bcrypt = require('bcrypt');

// Altere a senha aqui
const senha = '123';

bcrypt.hash(senha, 10, (err, hash) => {
  if (err) {
    console.error('Erro ao gerar hash:', err);
    return;
  }

  console.log('Hash gerado para a senha:', hash)
});
