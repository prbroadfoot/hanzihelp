const sql = require('./sql/index').frames;

class FramesRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  findByCharacter(character) {
    return this.db.task(t =>
      t
        .one(sql.findByCharacter, {
          character: character
        })
        .then(result => t.frames.completeFrameData(result))
    );
  }

  findByHSKLevel(level) {
    return this.db.many(sql.findByHSKLevel, level);
  }

  findByKeyword(keyword, frame_type = 'character') {
    return this.db.task(t =>
      t
        .one(sql.findByKeyword, {
          keyword: keyword,
          frame_type: frame_type
        })
        .then(result => t.frames.completeFrameData(result))
    );
  }

  findByLesson({ book, lesson }) {
    return this.db.many(sql.findByLesson, {
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

  async completeFrameData(frame) {
    const frame_query_obj = {
      frame_number: frame.number,
      frame_type: frame.frame_type
    };
    let results = await this.db.batch([
      this.getCharactersThatCiteFrame(frame_query_obj),
      this.getAlternativeReadings(frame_query_obj),
      this.getElements(frame_query_obj),
      this.getHSKWordsUsingCharacter(frame.character)
    ]);

    return Object.assign({}, frame, {
      charactersThatCiteFrame: results[0],
      alternativeReadings: results[1],
      frameElements: results[2],
      hskWordsUsingCharacter: sortHSKWordsByLevel(results[3])
    });
  }
}

function sortHSKWordsByLevel(words) {
  if (words.length == 0) {
    return undefined;
  }
  let words_by_level = {
    level1: [],
    level2: [],
    level3: [],
    level4: [],
    level5: [],
    level6: []
  };
  for (word of words) {
    words_by_level['level' + word['hsk_level']].push(word['word']);
  }
  return words_by_level;
}

module.exports = FramesRepository;
