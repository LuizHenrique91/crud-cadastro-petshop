const db = require('./db');

const Post = db.sequelize.define('produto', {
  nome: {
    type: db.Sequelize.STRING
  },
  
  preco: {
    type: db.Sequelize.DECIMAL
  },

  dataFabricacao: {
    type: db.Sequelize.DATE
  },

  publicoAlvo: {
    type: db.Sequelize.STRING
  }
})

module.exports = Post;