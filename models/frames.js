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

exports.getElements = ({ frame_number, frame_type }) => {
  return db.any(sql.getElements, {
    frame_number: frame_number,
    frame_type: frame_type
  });
};
