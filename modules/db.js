const Sequelize = require('sequelize');

const sequelize = new Sequelize('produtos', 'root', 'inuy1224', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize.authenticate()
  .then( function(){ console.log('Conexao Efetuada com Sucesso')})
  .catch((erro) => console.log('Erro ao se Conectar = ' + erro));

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}