-- keyword: string
-- frame_type: 'character' or 'primitive'
-- Returns character data for the best matching row by keyword, if a match exists
-- Provided keyword may match 'keyword' column or alternative reading.
-- Prioritizes rows that match frame_type
-- If frame_type is 'primitive', prioritize alternative reading matches
-- If frame_type is 'character', prioritize keyword column matches
SELECT number, character, keyword, strokes, lesson, book, frame_type FROM
(
SELECT number, character, keyword, strokes, lesson, book, frame_type,
       (CASE WHEN frame_type = $(frame_type) THEN 1 ELSE 2 END) AS ordr
FROM frames
WHERE upper(keyword) = upper($(keyword))

UNION

SELECT number, character, keyword, strokes, lesson, book, frames.frame_type,
       (CASE WHEN $(frame_type) = 'primitive' THEN 0 ELSE 3 END) AS ordr
FROM alternative_readings
INNER JOIN frames
ON alternative_readings.frame_number = frames.number AND alternative_readings.frame_type = frames.frame_type
WHERE upper(alternative_readings.reading) = upper($(keyword))
ORDER BY ordr
LIMIT 1
) AS matching_frame
;
