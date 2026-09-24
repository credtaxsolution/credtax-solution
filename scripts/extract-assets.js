const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

// 1. Favicon SVG
const faviconSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
  <rect width='64' height='64' rx='12' fill='#2F616F'/>
  <g transform='translate(9 11) scale(.92)' fill='none' stroke-width='7'>
    <path d='M33 7.5H7.5V27.5H33' stroke='#fff'/>
    <path d='M15 37.5H40.5V17.5H15' stroke='#A8CBD2'/>
  </g>
</svg>`;
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.svg'), faviconSvg, 'utf8');
console.log('Saved favicon.svg');

const htmlPath = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\a941ea8e-1fed-48fb-ae4c-32027a81f3f1\\.user_uploaded\\media_1790243800417.html';
console.log('Reading from uploaded HTML:', htmlPath);
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 2. Extract brand logo
const logoRegex = /class="brand-logo" src="data:image\/png;base64,([^"]+)"/;
const logoM = htmlContent.match(logoRegex);
if (logoM && logoM[1]) {
  fs.writeFileSync(path.join(publicImagesDir, 'logo.png'), Buffer.from(logoM[1], 'base64'));
  console.log('Successfully saved logo.png! File size:', Buffer.from(logoM[1], 'base64').length, 'bytes');
} else {
  console.log('Logo match not found');
}

// 3. Extract Raijo Jose portrait
const raijoRegex = /src="data:image\/png;base64,([^"]+)" alt="Raijo Jose, Partner at CredTax"/;
const raijoM = htmlContent.match(raijoRegex);
if (raijoM && raijoM[1]) {
  fs.writeFileSync(path.join(publicImagesDir, 'raijo-jose.png'), Buffer.from(raijoM[1], 'base64'));
  console.log('Successfully saved raijo-jose.png! File size:', Buffer.from(raijoM[1], 'base64').length, 'bytes');
} else {
  console.log('Raijo portrait match not found');
}

// 4. Extract Nithin PR portrait
const nithinRegex = /src="data:image\/png;base64,([^"]+)" alt="Nithin PR, Partner at CredTax"/;
const nithinM = htmlContent.match(nithinRegex);
if (nithinM && nithinM[1]) {
  fs.writeFileSync(path.join(publicImagesDir, 'nithin-pr.png'), Buffer.from(nithinM[1], 'base64'));
  console.log('Successfully saved nithin-pr.png! File size:', Buffer.from(nithinM[1], 'base64').length, 'bytes');
} else {
  console.log('Nithin portrait match not found');
}
