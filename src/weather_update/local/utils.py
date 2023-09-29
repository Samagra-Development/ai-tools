import camelot
import pandas as pd
import pdfplumber
import requests
from io import BytesIO

pdf1 = "https://mausam.imd.gov.in/bhubaneswar/mcdata/District.pdf"
pdf2 = "https://mausam.imd.gov.in/bhubaneswar/mcdata/1730Z.pdf"

def custom_aggregate(x):
    numeric_values = []

    t = None
    for i in x:
        t = i
        try:
            numeric_values.append(float(i))
        except ValueError:
            pass

    if numeric_values:
        return sum(numeric_values) / len(numeric_values)
    else:
        return t

def parse_pdfs():
    table = camelot.read_pdf(pdf1, pages="all")

    first_page = table[0].df.copy(deep=True)

    # camelot doesn't read the 5, 6 rows of first page properly (so read them using pdfplumber)
    response = requests.get(pdf1)
    with pdfplumber.open(BytesIO(response.content)) as pdf:
        temp_page = pdf.pages[0]
        temp_table = temp_page.extract_table()
        temp_df = pd.DataFrame(temp_table[1:], columns=temp_table[0])
        first_page.iloc[5:7, 1:8] = temp_df.iloc[13:15, 2:]

    second_page = table[1].df.copy(deep=True)

    first_table = pd.concat([first_page, second_page], ignore_index=True)
    first_table.drop(columns=8, inplace=True)

    for col in first_table.columns[2:7]:
        first_table.at[14, col] = str(first_table.at[14, col]) + " \n" + str(first_table.at[15, col])

    # appending header to second row
    first_table.iloc[0, 3:7] = first_table.iloc[0, 2]
    first_table.iloc[1] = first_table.iloc[0] + "\n" + first_table.iloc[1]

    first_table.drop([0, 15], inplace=True)
    first_table.reset_index(drop=True, inplace=True)

    third_page = table[2].df.copy(deep=True)
    fourth_page = table[3].df.copy(deep=True)
    fifth_page = table[4].df.copy(deep=True)

    second_table = pd.concat([third_page, fourth_page, fifth_page], ignore_index=True)
    second_table.iloc[0, 3:7] = second_table.iloc[0, 2]

    # appending header to second row
    second_table.iloc[0, 3:7] = second_table.iloc[0, 2]
    second_table.iloc[1] = second_table.iloc[0] + "\n" + second_table.iloc[1]
    second_table.drop(0, inplace=True)
    second_table.reset_index(drop=True, inplace=True)

    for df in [first_table, second_table]:
        for i in range(2, len(df)):
            if df.loc[i, 0] == '':
                df.loc[i, 0] = df.loc[i - 1, 0]

    semi_merge = pd.concat([first_table, second_table.iloc[:, 2:]], axis=1)

    first_row = semi_merge.iloc[:1]
    sorted_df = semi_merge.iloc[1:].sort_values(by=1)
    semi_merge = pd.concat([first_row, sorted_df], ignore_index=True)

    table2 = camelot.read_pdf(pdf2, pages="all")
    table = table2[0].df.copy(deep=True)

    x = pd.read_csv("./content/DistrictMapping.csv")
    map = dict(zip(x['Name Mentioned'], x['Mapped District']))

    table[1] = table[1].map(lambda x: map.get(x, x))
    table.replace('TRACE', 0.1, inplace=True)

    response = requests.get(pdf2)
    with pdfplumber.open(BytesIO(response.content)) as pdf:
        temp_page = pdf.pages[0]
        temp_table = temp_page.extract_table()
        temp_df = pd.DataFrame(temp_table[1:], columns=temp_table[0])
        table.at[1, 6] = temp_df.at[4, '24 HOURS'].replace("I", "").replace("S", "")
    table.drop(columns=0, inplace=True)

    first_row = table.iloc[:1]
    result_df = table.iloc[1:].groupby(1).agg(custom_aggregate).reset_index()
    table = pd.concat([first_row, result_df], ignore_index=True)

    merge = pd.concat([semi_merge, table.iloc[:, 1:]], axis=1)

    merge.columns = merge.iloc[0]
    merge = merge.drop(merge.index[0])
    merge = merge.reset_index(drop=True)

    return merge

