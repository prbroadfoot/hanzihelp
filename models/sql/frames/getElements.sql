-- frame_number: integer
-- frame_type: 'character' or 'primitive'
SELECT cited_frame_reading, cited_frame_type
FROM citations
WHERE citing_frame_number = $(frame_number)
AND citing_frame_type = $(frame_type)
