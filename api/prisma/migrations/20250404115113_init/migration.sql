-- CreateTable
CREATE TABLE `Aluno` (
    `ra` VARCHAR(10) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `telefone` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`ra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `livro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(100) NOT NULL,
    `autor` VARCHAR(100) NOT NULL,
    `prateleira` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Emprestimo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alunoRa` VARCHAR(10) NOT NULL,
    `livroId` INTEGER NOT NULL,
    `retirada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `devolucao` DATETIME(3) NULL,
    `multa` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_alunoRa_fkey` FOREIGN KEY (`alunoRa`) REFERENCES `Aluno`(`ra`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `livro`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
