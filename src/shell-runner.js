
import {execa} from 'execa';
import fs from 'fs';

export async function executeShellFile(ctx) {
    let openFile = ctx.entry;
    let fileContent = fs.readFileSync(openFile, 'utf8');
    execa(fileContent)
} 
