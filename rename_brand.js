const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === '.gemini') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.sql')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      const replacements = [
        [ /AURA<span>WEAR<\/span>/g, 'VEERA<span>WEAR</span>' ],
        [ /VEERA WEAR/g, 'VEERA WEAR' ],
        [ /veerawear/g, 'veerawear' ],
        [ /Veera Wear/g, 'Veera Wear' ]
      ];
      
      for (const [regex, replacement] of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          changed = true;
        }
      }
      
      if (changed) fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}
processDir(process.argv[2] || '.');
console.log('Renamed brand to Veera Wear successfully.');
