-- takes an integer (1-6) for HSK level
SELECT f.character, f.keyword FROM Frames f
INNER JOIN HSKCharacters h
ON f.character = h.character
WHERE h.hsk_level = $1
