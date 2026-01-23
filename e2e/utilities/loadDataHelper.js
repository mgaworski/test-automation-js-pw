const path = require('path');
const fs = require('fs');

function loadData(name) {
  const jsPath = path.join(__dirname, '..', 'data', `${name}.js`);
  const jsonPath = path.join(__dirname, '..', 'data', `${name}.json`);

  if (fs.existsSync(jsPath)) {
    const mod = require(jsPath);
    return typeof mod === 'function' ? mod() : mod;
  }

  if (fs.existsSync(jsonPath)) {
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(raw);
  }

  throw new Error(`Data file not found: ${jsPath} or ${jsonPath}`);
}

module.exports = { loadData };