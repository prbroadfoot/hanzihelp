-- book: integer
-- lesson: integer
SELECT character, keyword FROM frames WHERE book = $(book) AND lesson = $(lesson)
