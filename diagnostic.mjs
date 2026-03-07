import { execSync } from 'child_process';
import fs from 'fs';
try {
  execSync('npx vite build', { encoding: 'utf8', stdio: 'pipe' });
  console.log('Build succeeded!');
} catch (e) {
  fs.writeFileSync('clean_err.txt', (e.stdout || '') + '\n' + (e.stderr || ''));
  console.log('Build failed. See clean_err.txt');
}
