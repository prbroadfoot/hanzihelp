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
