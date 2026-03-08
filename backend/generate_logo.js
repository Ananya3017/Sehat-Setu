const fs = require('fs');

const C = { primary: "#1A3D7C" };
let lines = '';
let dots = '';

for (let i = 0; i < 24; i++) {
    const a = (i / 24) * 2 * Math.PI - Math.PI / 2;
    const x1 = 50 + 8 * Math.cos(a);
    const y1 = 50 + 8 * Math.sin(a);
    const x2 = 50 + 36 * Math.cos(a);
    const y2 = 50 + 36 * Math.sin(a);
    lines += `  <line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${C.primary}" stroke-width="1.5" stroke-linecap="round"/>\n`;

    const cx = 50 + 38 * Math.cos(a);
    const cy = 50 + 38 * Math.sin(a);
    dots += `  <circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="2.5" fill="${C.primary}"/>\n`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="none" stroke="${C.primary}" stroke-width="3"/>
  <circle cx="50" cy="50" r="38" fill="none" stroke="${C.primary}" stroke-width="1"/>
  <circle cx="50" cy="50" r="6" fill="${C.primary}"/>
${lines}${dots}</svg>`;

fs.writeFileSync('../public/logo.svg', svg);
console.log("public/logo.svg generated successfully.");
