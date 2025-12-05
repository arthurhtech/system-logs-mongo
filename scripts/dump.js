import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import dotenv from "dotenv";

dotenv.config()

const PASTA_BACKUP = path.resolve('backups');
const NOME_ARQUIVO = `backup.gz`;
const CAMINHO = path.join(PASTA_BACKUP, NOME_ARQUIVO);

function dump() {
    try {
        if (!fs.existsSync(PASTA_BACKUP)) {
            console.log(`Criando pasta de backups em: ${PASTA_BACKUP}`);
            fs.mkdirSync(PASTA_BACKUP);
        }

        const comando = `docker exec mongodb mongodump -u ${process.env.MONGO_USERNAME} -p ${process.env.MONGO_PASSWORD} --authenticationDatabase admin --db ${process.env.MONGO_DB} --archive --gzip > "${CAMINHO}"`;

        execSync(comando, {stdio: 'inherit'});

        console.log(`Backup salvo com sucesso!`);

    } catch (error) {
        console.error('Erro ao realizar backup:', error.message);
    }
}

dump()
