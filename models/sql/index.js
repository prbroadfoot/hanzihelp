const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

module.exports = {
  frames: {
    findByCharacter: sql('frames/findByCharacter.sql'),
    findByKeyword: sql('frames/findByKeyword.sql'),
    findByLesson: sql('frames/findByLesson.sql'),
    findByHSKLevel: sql('frames/findByHSKLevel.sql'),
    getAlternativeReadings: sql('frames/getAlternativeReadings.sql'),
    getCharactersThatCiteFrame: sql('frames/getCharactersThatCiteFrame.sql'),
    getElements: sql('frames/getElements.sql'),
    getHSKWordsUsingCharacter: sql('frames/getHSKWordsUsingCharacter.sql')
  }
};
