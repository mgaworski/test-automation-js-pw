const path = require('path');
const fs = require('fs');

function loadEnvironment() {

  let environment = process.env.ENV;
  if (!environment) environment = "dev"

  const fullPath = path.join(__dirname, "..", "data", "envs", `${environment}.json`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Data file not found: ${fullPath}`);
  }
  const raw = fs.readFileSync(fullPath, 'utf-8');
  let config = JSON.parse(raw);
  return config;
}

module.exports = loadEnvironment();

// module.exports = { loadEnvironment };
