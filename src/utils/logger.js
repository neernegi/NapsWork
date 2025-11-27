import fs from 'fs';
import path from 'path';

const logsDir = path.resolve('src/logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

export const accessLogStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });
