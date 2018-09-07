import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';

const realpath = util.promisify(fs.realpath);
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

export async function readStatic(file) {
    const p  = await realpath(path.join(__dirname, `./src/static/${file}`));

    return readFile(p, {encoding:'utf8'});
}

export async function writeStatic(file, data) {
    const p  = await realpath(path.join(__dirname, `./src/static/${file}`));

    return writeFile(p, data);
}