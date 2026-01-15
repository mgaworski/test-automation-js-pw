const path = require('path');
const fs = require('fs');

function loadData(name) {
  const fullPath = path.join(__dirname, "..", "data", `${name}.json`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Data file not found: ${fullPath}`);
  }
  const raw = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw);
}

module.exports = { loadData };

/*
Used to load test data from data folder.
Expects data files to be valid json encoded with UTF-8.

const { loadData } = require('../utilities/loadData');
const users = loadData('users');
*/