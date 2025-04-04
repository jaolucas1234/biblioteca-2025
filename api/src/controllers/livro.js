const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const livro = await prisma.livro.create({
            data: req.body
        });
        res.status(201).json(livro).end()
    } catch (e) {
        res.status(400).json(e).end()
    }
}

const read = async (req, res) => {
    const livros = await prisma.livro.findMany();
    res.json(livros).end()
}

const readOne = async (req, res) => {
    const livro = await prisma.livro.findMany({
        where: { id: Number(req.params.id) },
        include: {
            emprestimos: {
                include: {
                    aluno: true
                }
            }
        }
    });
    res.json(livro).end()
}

const update = async (req, res) => {
    try {
        const livro = await prisma.livro.update({
            data: req.body,
            where: { id: Number(req.params.id) }
        });
        res.status(202).json(livro).end()
    } catch (e) {
        res.status(400).json(e).end()
    }
}
const remove = async (req, res) => {
    try {
        const livro = await prisma.livro.delete({
            where: { id: Number(req.params.id) }
        });
        res.status(204).json(livro).end()
    } catch (e) {
        res.status(400).json(e).end()
    }
}

module.exports = {
    create,
    read,
    readOne,
    update,
    remove
}