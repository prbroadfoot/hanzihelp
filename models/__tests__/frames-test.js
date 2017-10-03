const Frame = require('../frames.js');

describe('findByKeyword', () => {
  test('finds by keyword', () => {
    expect.assertions(1);
    return expect(Frame.findByKeyword('good')).resolves.toEqual({
      book: 1,
      character: '好',
      frame_type: 'character',
      keyword: 'good',
      lesson: 6,
      number: 103,
      strokes: 6
    });
  });

  test('finds by keyword case insensitively', () => {
    expect.assertions(1);
    return expect(Frame.findByKeyword('gOoD')).resolves.toHaveProperty(
      'character',
      '好'
    );
  });

  test('finds by alternative reading', () => {
    expect.assertions(1);
    return expect(
      Frame.findByKeyword('St. Bernard dog')
    ).resolves.toHaveProperty('character', '大');
  });

  test('prioritizes keyword over alternative reading', () => {
    expect.assertions(1);
    return expect(Frame.findByKeyword('muscle')).resolves.toHaveProperty(
      'character',
      '肌'
    );
  });

  test('prioritizes character over primitive by default', () => {
    expect.assertions(1);
    return expect(Frame.findByKeyword('house')).resolves.toHaveProperty(
      'character',
      '家'
    );
  });

  test('prioritizes primitive over character when primitive explicitly requested', () => {
    expect.assertions(1);
    return expect(
      Frame.findByKeyword('house', 'primitive')
    ).resolves.toHaveProperty('character', '宀');
  });

  test('allows frame_type mismatch when matches do not exist', () => {
    expect.assertions(1);
    return expect(Frame.findByKeyword('a drop of')).resolves.toHaveProperty(
      'character',
      '丶'
    );
  });
});

describe('findByCharacter', () => {
  test('finds by character', () => {
    expect.assertions(1);
    return expect(Frame.findByCharacter('好')).resolves.toHaveProperty(
      'keyword',
      'good'
    );
  });
});

describe('findByLesson', () => {
  test('finds by lesson', () => {
    expect.assertions(1);
    return expect(Frame.findByLesson({ book: 1, lesson: 1 })).resolves.toEqual([
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

describe('getElements', () => {
  test('finds the elements for a character frame', () => {
    return expect(
      Frame.getElements({
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
      Frame.getElements({
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
