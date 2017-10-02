-- keyword: string
-- frame_type: 'character' or 'primitive'
-- Returns character data for row matching keyword, if it exists.
-- Keyword may match either 'keyword' column or alternative readings.
-- If multiple rows match a given keyword, only returns the row that matches frame_type.
-- If only one row matches a given keyword, frame_type does not necessarily match.
SELECT number, character, keyword, strokes, lesson, book, frame_type FROM
(
SELECT number, character, keyword, strokes, lesson, book, frames.frame_type,
       (CASE WHEN frames.frame_type = $(frame_type) THEN 0 ELSE 1 END) AS ordr
FROM frames
LEFT JOIN alternative_readings
ON alternative_readings.frame_number = frames.number AND alternative_readings.frame_type = frames.frame_type
WHERE upper(frames.keyword) = upper($(keyword)) OR upper(alternative_readings.reading) = upper($(keyword))
ORDER BY ordr
LIMIT 1
) AS matching_frame
;
