const Frame = require('../frames.js');

test('finds by keyword', () => {
  expect.assertions(1);
  return Frame.findByKeyword('good').then(data => {
    expect(data).toEqual({
      book: 1,
      character: '好',
      frame_type: 'character',
      keyword: 'good',
      lesson: 6,
      number: 103,
      strokes: 6
    });
  });
});

test('finds by keyword case insensitively', () => {
  expect.assertions(1);
  return Frame.findByKeyword('gOoD').then(data => {
    expect(data).toEqual({
      book: 1,
      character: '好',
      frame_type: 'character',
      keyword: 'good',
      lesson: 6,
      number: 103,
      strokes: 6
    });
  });
});

test('finds by alternative reading', () => {
  expect.assertions(1);
  return Frame.findByKeyword('St. Bernard dog').then(data => {
    expect(data).toEqual({
      book: 1,
      character: '大',
      frame_type: 'character',
      keyword: 'large',
      lesson: 7,
      number: 113,
      strokes: 3
    });
  });
});
