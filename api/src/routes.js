const express = require('express');
const routes = express.Router();

const Aluno = require('./controllers/aluno');
const Livro = require('./controllers/livro');
const Emprestimo = require('./controllers/emprestimo');

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Biblioteca ACME' });
});

routes.post('/alunos', Aluno.create);
routes.get('/alunos', Aluno.read);
routes.get('/alunos/:ra', Aluno.readOne);
routes.patch('/alunos/:ra', Aluno.update);
routes.delete('/alunos/:ra', Aluno.remove);

routes.post('/livros', Livro.create);
routes.get('/livros', Livro.read);
routes.get('/livros/:id', Livro.readOne);
routes.patch('/livros/:id', Livro.update);
routes.delete('/livros/:id', Livro.remove);

routes.post('/emprestimos', Emprestimo.create);
routes.get('/emprestimos', Emprestimo.read);
routes.get('/emprestimos/:id', Emprestimo.readOne);
routes.patch('/emprestimos/:id', Emprestimo.update);
routes.delete('/emprestimos/:id', Emprestimo.remove);


module.exports = routes;