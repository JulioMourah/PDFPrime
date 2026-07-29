import camelot
import pandas as pd
import sys

pdf = sys.argv[1]
xlsx = sys.argv[2]

tables = camelot.read_pdf(
    pdf,
    pages="all"
)

writer = pd.ExcelWriter(
    xlsx,
    engine="openpyxl"
)

if len(tables) == 0:

    df = pd.DataFrame([
        ["Nenhuma tabela foi encontrada neste PDF."]
    ])

    df.to_excel(
        writer,
        sheet_name="Resultado",
        index=False,
        header=False
    )

else:

    for i, table in enumerate(tables):

        sheet = f"Página {i + 1}"

        table.df.to_excel(
            writer,
            sheet_name=sheet,
            index=False,
            header=False
        )

writer.close()

print("Conversão concluída.")