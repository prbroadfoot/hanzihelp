const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

module.exports = {
  frames: {
    findByKeyword: sql('frames/findByKeyword.sql'),
    findByCharacter: sql('frames/findByCharacter.sql')
  }
};
