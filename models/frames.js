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
