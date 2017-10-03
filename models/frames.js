const sql = require('./sql/index').frames;

class FramesRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  findByCharacter(character) {
    return this.db.one(sql.findByCharacter, {
      character: character
    });
  }

  findByKeyword(keyword, frame_type = 'character') {
    return this.db.one(sql.findByKeyword, {
      keyword: keyword,
      frame_type: frame_type
    });
  }

  findByLesson({ book, lesson }) {
    return this.db.any(sql.findByLesson, {
      book: book,
      lesson: lesson
    });
  }

  getAlternativeReadings({ frame_number, frame_type }) {
    return this.db
      .any(sql.getAlternativeReadings, {
        frame_number: frame_number,
        frame_type: frame_type
      })
      .then(readings => readings.map(reading => reading.reading));
  }

  getCharactersThatCiteFrame({ frame_number, frame_type }) {
    return this.db
      .any(sql.getCharactersThatCiteFrame, {
        frame_number: frame_number,
        frame_type: frame_type
      })
      .then(characters => characters.map(character => character.character));
  }

  getElements({ frame_number, frame_type }) {
    return this.db.any(sql.getElements, {
      frame_number: frame_number,
      frame_type: frame_type
    });
  }
  getHSKWordsUsingCharacter(character) {
    return this.db.any(sql.getHSKWordsUsingCharacter, character);
  }
}

module.exports = FramesRepository;
