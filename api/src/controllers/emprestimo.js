const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const emprestimo = await prisma.emprestimo.create({
            data: req.body
        });
        res.status(201).json(emprestimo).end()
    } catch (e) {
        res.status(400).json(e).end()
    }
}

const read = async (req, res) => {
    const emprestimos = await prisma.emprestimo.findMany();
    res.json(emprestimos).end()
}

const readOne = async (req, res) => {
    const emprestimos = await prisma.emprestimo.findMany({
        where: { id: Number(req.params.id) },
        include: {
            aluno: true,
            livro: true
        }
    });
    res.json(emprestimos).end()
}

const update = async (req, res) => {
    const { retirada } =  await prisma.emprestimo.findUnique({
        where: { id: Number(req.params.id) },
        select: { retirada: true }
    });
    const {devolucao} = req.body;
    if(devolucao){
        const dataRetirada = new Date(retirada);
        const dataDevolucao = new Date(devolucao);
        const diferenca = Math.abs(dataDevolucao - dataRetirada);
        const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
        if(dias > 3){
            req.body.multa = (dias - 3) * 10;
        }
    }
    try {
        const emprestimo = await prisma.emprestimo.update({
            data: req.body,
            where: { id: Number(req.params.id) }
        });
        res.status(202).json(emprestimo).end()
    } catch (e) {
        res.status(400).json(e).end()
    }
}
const remove = async (req, res) => {
    try {
        const emprestimo = await prisma.emprestimo.delete({
            where: { id: Number(req.params.id) }
        });
        res.status(204).json(emprestimo).end()
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