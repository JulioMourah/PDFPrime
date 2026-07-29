import fitz
import sys

pdf = sys.argv[1]
txt = sys.argv[2]

doc = fitz.open(pdf)

texto = ""

for page in doc:

    texto += page.get_text()

    texto += "\n\n"

with open(txt, "w", encoding="utf-8") as arquivo:

    arquivo.write(texto)

doc.close()

print("Conversão concluída.")