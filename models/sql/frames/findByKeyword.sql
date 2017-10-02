-- keyword: string
-- frame_type: 'character' or 'primitive'
-- Returns character data for row matching keyword, if one exists.
-- If multiple rows match a given keyword, only returns the row that matches frame_type.
-- If only one row matches a given keyword, frame_type does not necessarily match.
SELECT number, character, keyword, strokes, lesson, book, frame_type,
       (CASE WHEN frame_type = $(frame_type) THEN 0 ELSE 1 END) AS ordr
FROM frames
WHERE keyword = $(keyword)

UNION

SELECT number, character, keyword, strokes, lesson, book, frames.frame_type,
       (CASE WHEN frames.frame_type = $(frame_type) THEN 0 ELSE 1 END) AS ordr
FROM alternative_readings
INNER JOIN frames
ON alternative_readings.frame_number = frames.number AND alternative_readings.frame_type = frames.frame_type
WHERE alternative_readings.reading = $(keyword)
ORDER BY ordr
LIMIT 1;
