const db = require('./db');
const sql = require('./sql/index').frames;

exports.findByCharacter = character => {
  return db.one(sql.findByCharacter, {
    character: character
  });
};

exports.findByKeyword = (keyword, frame_type = 'character') => {
  return db.one(sql.findByKeyword, {
    keyword: keyword,
    frame_type: frame_type
  });
};

exports.findByLesson = ({ book, lesson }) => {
  return db.any(sql.findByLesson, {
    book: book,
    lesson: lesson
  });
};

exports.getAlternativeReadings = ({ frame_number, frame_type }) => {
  return db
    .any(sql.getAlternativeReadings, {
      frame_number: frame_number,
      frame_type: frame_type
    })
    .then(readings => readings.map(reading => reading.reading));
};

exports.getCharactersThatCiteFrame = ({ frame_number, frame_type }) => {
  return db
    .any(sql.getCharactersThatCiteFrame, {
      frame_number: frame_number,
      frame_type: frame_type
    })
    .then(characters => characters.map(character => character.character));
};

exports.getElements = ({ frame_number, frame_type }) => {
  return db.any(sql.getElements, {
    frame_number: frame_number,
    frame_type: frame_type
  });
};

exports.getHSKWordsUsingCharacter = character => {
  return db.any(sql.getHSKWordsUsingCharacter, character);
};
