const { execSync } = require('child_process');
try {
  execSync('npx vite build', { encoding: 'utf8', stdio: 'pipe' });
  console.log('Build succeeded!');
} catch (e) {
  require('fs').writeFileSync('clean_err.txt', (e.stdout || '') + '\n' + (e.stderr || ''));
  console.log('Build failed. See clean_err.txt');
}
