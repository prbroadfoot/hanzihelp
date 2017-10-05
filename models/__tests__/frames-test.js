const db = require('../db.js');

describe('findByKeyword', () => {
  test('finds by keyword', () => {
    expect.assertions(1);
    return expect(db.frames.findByKeyword('good')).resolves.toEqual(
      expect.objectContaining({
        book: 1,
        character: '好',
        frame_type: 'character',
        keyword: 'good',
        lesson: 6,
        number: 103,
        strokes: 6
      })
    );
  });

  test('finds by keyword case insensitively', () => {
    expect.assertions(1);
    return expect(db.frames.findByKeyword('gOoD')).resolves.toHaveProperty(
      'character',
      '好'
    );
  });

  test('finds by alternative reading', () => {
    expect.assertions(1);
    return expect(
      db.frames.findByKeyword('St. Bernard dog')
    ).resolves.toHaveProperty('character', '大');
  });

  test('prioritizes keyword over alternative reading for characters', () => {
    expect.assertions(1);
    return expect(db.frames.findByKeyword('muscle')).resolves.toHaveProperty(
      'character',
      '肌'
    );
  });

  test('prioritizes alternative reading over keyword for primitives', () => {
    expect.assertions(1);
    return expect(
      db.frames.findByKeyword('muscle', 'primitive')
    ).resolves.toHaveProperty('character', '力');
  });

  test('prioritizes character over primitive by default', () => {
    expect.assertions(1);
    return expect(db.frames.findByKeyword('house')).resolves.toHaveProperty(
      'character',
      '家'
    );
  });

  test('prioritizes primitive over character when primitive explicitly requested', () => {
    expect.assertions(1);
    return expect(
      db.frames.findByKeyword('house', 'primitive')
    ).resolves.toHaveProperty('character', '宀');
  });

  test('allows frame_type mismatch when matches do not exist', () => {
    expect.assertions(1);
    return expect(db.frames.findByKeyword('a drop of')).resolves.toHaveProperty(
      'character',
      '丶'
    );
  });
});

describe('findByCharacter', () => {
  test('finds by character', () => {
    expect.assertions(1);
    return expect(db.frames.findByCharacter('好')).resolves.toHaveProperty(
      'keyword',
      'good'
    );
  });
});

describe('findByLesson', () => {
  test('finds by lesson', () => {
    expect.assertions(1);
    return expect(
      db.frames.findByLesson({ book: 1, lesson: 1 })
    ).resolves.toEqual([
      { character: '一', keyword: 'one' },
      { character: '二', keyword: 'two' },
      { character: '三', keyword: 'three' },
      { character: '四', keyword: 'four' },
      { character: '五', keyword: 'five' },
      { character: '六', keyword: 'six' },
      { character: '七', keyword: 'seven' },
      { character: '八', keyword: 'eight' },
      { character: '九', keyword: 'nine' },
      { character: '十', keyword: 'ten' },
      { character: '口', keyword: 'mouth' },
      { character: '日', keyword: 'day' },
      { character: '月', keyword: 'month' },
      { character: '田', keyword: 'rice field' },
      { character: '目', keyword: 'eye' }
    ]);
  });
});

describe('getAlternativeReadings', () => {
  test('finds the alternative readings for a character frame', () => {
    return expect(
      db.frames.getAlternativeReadings({
        frame_number: 1,
        frame_type: 'character'
      })
    ).resolves.toEqual(['floor', 'ceiling']);
  });
  test('finds the alternative readings for a primitive frame', () => {
    return expect(
      db.frames.getAlternativeReadings({
        frame_number: 1,
        frame_type: 'primitive'
      })
    ).resolves.toEqual(['eyedropper']);
  });
});

describe('getCharactersThatCiteFrame', () => {
  test('finds characters that cite a character frame', () => {
    return expect(
      db.frames.getCharactersThatCiteFrame({
        frame_number: 672,
        frame_type: 'character'
      })
    ).resolves.toEqual(['治', '始', '胎', '怠', '怡', '冶', '抬']);
  });
});

describe('getElements', () => {
  test('finds the elements for a character frame', () => {
    return expect(
      db.frames.getElements({
        frame_number: 103,
        frame_type: 'character'
      })
    ).resolves.toEqual([
      { cited_frame_reading: 'woman', cited_frame_type: 'character' },
      { cited_frame_reading: 'child', cited_frame_type: 'character' }
    ]);
  });

  test('finds the elements for a primitive frame', () => {
    return expect(
      db.frames.getElements({
        frame_number: 129,
        frame_type: 'primitive'
      })
    ).resolves.toEqual([
      { cited_frame_reading: 'soldier', cited_frame_type: 'character' },
      { cited_frame_reading: 'flag', cited_frame_type: 'primitive' },
      { cited_frame_reading: 'missile', cited_frame_type: 'character' }
    ]);
  });
});

describe('getHSKWordsUsingCharacter', () => {
  test('finds HSK words that contain the character', () => {
    return expect(db.frames.getHSKWordsUsingCharacter('厚')).resolves.toEqual([
      { hsk_level: 4, word: '厚' },
      { hsk_level: 6, word: '得天独厚' },
      { hsk_level: 6, word: '浓厚' },
      { hsk_level: 6, word: '深情厚谊' },
      { hsk_level: 6, word: '雄厚' }
    ]);
  });
});

test('complete query by keyword', () => {
  return expect(db.frames.findByKeyword('correct')).resolves.toEqual({
    alternativeReadings: [],
    book: 1,
    character: '正',
    charactersThatCiteFrame: ['证', '政', '整', '怔', '征', '歪', '症', '钙'],
    frameElements: [
      { cited_frame_reading: 'one', cited_frame_type: 'character' },
      { cited_frame_reading: 'footprint', cited_frame_type: 'character' }
    ],
    frame_type: 'character',
    hskWordsUsingCharacter: {
      level1: [],
      level2: ['正在'],
      level3: [],
      level4: ['真正', '正常', '正好', '正确', '正式'],
      level5: ['反正', '改正', '正'],
      level6: [
        '端正',
        '更正',
        '公正',
        '纠正',
        '正月',
        '正当',
        '正负',
        '正规',
        '正经',
        '正气',
        '正义',
        '正宗'
      ]
    },
    keyword: 'correct',
    lesson: 17,
    number: 387,
    strokes: 5
  });
});
