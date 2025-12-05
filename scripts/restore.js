import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import dotenv from "dotenv";

dotenv.config()

const PASTA = path.resolve('backups');
const NOME_ARQUIVO = `backup.gz`;
const CAMINHO = path.join(PASTA, NOME_ARQUIVO);

function restore() {
    try {
        if (!fs.existsSync(CAMINHO)) {
            throw new Error(`Arquivo não encontrado: ${CAMINHO_ARQUIVO}\nVerifique se o nome está correto na variável ARQUIVO_ALVO.`);
        }

        const dadosBackup = fs.readFileSync(CAMINHO);
        const comando = `docker exec -i mongodb mongorestore -u ${process.env.MONGO_USERNAME} -p ${process.env.MONGO_PASSWORD} --authenticationDatabase admin --db ${process.env.MONGO_DB} --archive --gzip --drop`;

        // Executa injetando o buffer do arquivo
        execSync(comando, {
            input: dadosBackup,
            stdio: ['pipe', 'inherit', 'inherit']
        });
        console.log('Restauração concluída');

    } catch (error) {
        console.error('Erro:', error.message);
    }
}

restore();
