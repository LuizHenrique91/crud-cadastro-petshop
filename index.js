const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Post = require('./modules/Post.js')
const handlebars = require('express-handlebars');
const moment = require('moment');
const path = require('path');
const session = require('express-session')
const flash = require('connect-flash');

//Template
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Public
app.use(express.static(path.join(__dirname,"public")))

//Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(session({
  secret: "produtospetshop",
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

//Middleware
app.use((req, res, next) => {
  res.locals.sucesso = req.flash("sucesso")
  res.locals.erro = req.flash("erro")
  next()
})

//rotas s Seguir
app.get('/', function(req, res){
  res.render('cadastroproduto')
})

//Inserir produtos
app.post('/', function(req, res){
  Post.create({
    nome: req.body.nome,
    preco: req.body.preco,
    dataFabricacao: req.body.data,
    publicoAlvo: req.body.publico
  }).then(function(){
    req.flash("sucesso", "Produto Cadastrado com Sucesso")
    res.redirect('/')
  }).catch(function(erro) {
    req.flash("erro", "Por favor, utilize ponto no preço")
    res.redirect('/')
  })
})

//Listar Produtos
app.get('/listaprodutos', function(req, res){
  Post.findAll() 
    .then(function(dados){
      const dadosProduto = retornarDadosBanco(dados)
      res.render('listaprodutos', {dadosProduto})
    })
})

//Deletar
app.get('/deletar/:id', function(req, res){
  Post.destroy({where: {'id': req.params.id}}).then(function(){
    req.flash("sucesso", "Produto Deletado com Sucesso")
    res.redirect('/listaprodutos')
  }).catch(function(erro){
    res.send('Este produro não existe')
  })
})

//Página alterar Produto
app.get('/alterarproduto/:id', function(req, res){
  Post.findByPk(req.params.id)
  .then(function(dados){
    res.render('alterarproduto', {dados})
  })
})

//Atualizando produto
app.post('/produto/editado', function(req, res){
  Post.update({nome: req.body.nome, preco: req.body.preco, dataFabricacao: req.body.data, publicoAlvo: req.body.publico}, {
    where: {
      id: req.body.id
    }
  }).then(function(){
    req.flash('sucesso', "Atualizado com sucesso")
    res.redirect('/listaprodutos')
  }).catch(function(erro){
    req.flash('erro', "Por favor, utilize ponto no preço ao atualizar o produto")
    res.redirect('/listaprodutos')
  })
})
 

function retornarDadosBanco(dados){
  const dadosProduto = []
  for (let i = 0; i < dados.length; i++) {
    dadosProduto.push(dados[i].dataValues);
    moment.locale('pt-br')
    dadosProduto[i].dataFabricacao = moment(dadosProduto[i].dataFabricacao).format('L'); //Transformanto data para pt-br
  }
  return dadosProduto;
}

app.listen(8081, function() {console.log('Servidor rodando');})

