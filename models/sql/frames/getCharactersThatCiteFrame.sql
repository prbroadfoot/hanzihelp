-- frame_number: integer
-- frame_type: 'character' or 'primitive'
-- Returns characters (excludes primitives) that cite the current frame as an element.
SELECT DISTINCT used_by.character, used_by.number
FROM frames current_frame
LEFT JOIN alternative_readings
ON current_frame.number = alternative_readings.frame_number
AND current_frame.frame_type = alternative_readings.frame_type

INNER JOIN citations c
ON c.cited_frame_reading IN (reading, current_frame.keyword)

INNER JOIN frames used_by
ON c.citing_frame_number = used_by.number
AND c.citing_frame_type = used_by.frame_type
WHERE used_by.frame_type = 'character'
AND current_frame.number = $(frame_number)
AND current_frame.frame_type = $(frame_type)
ORDER BY used_by.number
