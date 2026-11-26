import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const args = process.argv.slice(2);

// Detectar la configuración (--configuration <env> o -c <env>)
let configName = args[0] === 'serve' ? 'local' : 'production';
const configFlagIndex = args.findIndex((a) => a === '--configuration' || a === '-c');
if (configFlagIndex !== -1 && args[configFlagIndex + 1]) {
  configName = args[configFlagIndex + 1];
} else {
  const inlineConfig = args.find((a) => a.startsWith('--configuration=') || a.startsWith('-c='));
  if (inlineConfig) {
    configName = inlineConfig.split('=')[1];
  }
}

// Cargar variables desde .env.<configName> o .env si existen localmente
const envFiles = [`.env.${configName}`, '.env'];
const fileVars = {};

for (const file of envFiles) {
  const fullPath = resolve(process.cwd(), file);
  if (existsSync(fullPath)) {
    const content = readFileSync(fullPath, 'utf-8');
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIdx = line.indexOf('=');
      if (eqIdx === -1) continue;
      const key = line.slice(0, eqIdx).trim();
      const val = line
        .slice(eqIdx + 1)
        .trim()
        .replace(/^['"]|['"]$/g, '');
      if (!(key in fileVars)) {
        fileVars[key] = val;
      }
    }
  }
}

// Prioridad: variable de entorno del sistema/nube (process.env) > archivo .env.<fase>
const baseUrlApi = (process.env.BASE_URL_API ?? fileVars.BASE_URL_API ?? '').replace(/\/+$/, '');

const ngArgs = [...args, `--define=BASE_URL_API=${JSON.stringify(baseUrlApi)}`];
const ngBin = resolve(process.cwd(), 'node_modules', '@angular', 'cli', 'bin', 'ng.js');

const child = spawn(process.execPath, [ngBin, ...ngArgs], {
  stdio: 'inherit',
  env: { ...fileVars, ...process.env },
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
