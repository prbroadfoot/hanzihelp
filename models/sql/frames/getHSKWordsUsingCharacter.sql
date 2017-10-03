-- takes a string (a simplified hanzi character)
SELECT word, hsk_level FROM HSKWords
WHERE word LIKE '%$1#%'
