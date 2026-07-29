from pdf2docx import Converter
import sys

pdf = sys.argv[1]
docx = sys.argv[2]

cv = Converter(pdf)
cv.convert(docx)
cv.close()