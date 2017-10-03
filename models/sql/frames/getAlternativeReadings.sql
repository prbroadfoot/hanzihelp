-- frame_number: integer
-- frame_type: 'character' or 'primitive'
SELECT reading FROM alternative_readings
WHERE frame_number = $(frame_number)
AND frame_type = $(frame_type)
