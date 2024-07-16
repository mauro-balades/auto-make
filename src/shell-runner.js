
import { exec } from 'child_process';
import { resolve, dirname } from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getShellCommand() {
    let shell = 'sh';
    if (process.platform === 'win32') {
        shell += '.exe';
    }
    return shell;
}

async function executeShellCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

function createFolderIfNotExists(name) {
    if (fs.existsSync(name)) {
        return;
    }
    fs.mkdirSync(name);
}

function getExportFile() {
    const folder = '.automake';
    createFolderIfNotExists(folder);
    return resolve(folder, 'export.am-output');
}

function getExecutorFile() {
    return resolve(__dirname, 'executor.sh');
}

export async function executeShellFile(ctx) {
    const shell = getShellCommand();
    const command = [
        shell,
        getExecutorFile(),
        __dirname,
        ctx.entry,
        getExportFile(),
    ];
    return executeShellCommand(command.join(' '));
} 
