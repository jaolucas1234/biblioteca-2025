const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const aluno = await prisma.aluno.create({
            data: req.body
        });
        res.status(201).json(aluno).end()
    } catch (e) {
        res.status(400).json(e).end()
    }
}

const read = async (req, res) => {
    const alunos = await prisma.aluno.findMany();
    res.json(alunos).end()
}

const readOne = async (req, res) => {
    const aluno = await prisma.aluno.findMany({
        where: { ra: req.params.ra },
        include: {
            emprestimos: {
                include: {
                    livro: true
                }
            }
        }
    });
    res.json(aluno).end()
}

const update = async (req, res) => {
    try {
        const aluno = await prisma.aluno.update({
            data: req.body,
            where: { ra: req.params.ra }
        });
        res.status(202).json(aluno).end()
    } catch (e) {
        res.status(400).json(e).end()
    }
}
const remove = async (req, res) => {
    try {
        const aluno = await prisma.aluno.delete({
            where: { ra: req.params.ra }
        });
        res.status(204).json(aluno).end()
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