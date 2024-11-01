import pandas as pd
from faker import Faker
import csv
import os

fake = Faker()

def use_faker(columnType, number_of_rows: int):
    data_line = []
    for col in columnType:
        if col == "address":
            data_line.append(fake.address())
        elif col == "street_address":
            data_line.append(fake.street_address())
        elif col == "int_identifiant":
            ele = fake.random_int(min=1, max=number_of_rows)
            data_line.append(ele)
        elif col == "postCode":
            data_line.append(fake.postalcode())
        elif col == "city":
            data_line.append(fake.city())
        elif col == "state":
            data_line.append(fake.state())
        elif col == "country":
            data_line.append(fake.country())
        elif col == "first_name":
            data_line.append(fake.first_name())
        elif col == "last_name":
            data_line.append(fake.last_name())
        elif col == "first_name_male":
            data_line.append(fake.first_name_male())
        elif col == "first_name_female":
            data_line.append(fake.first_name_female())
        elif col == "prefix":
            data_line.append(fake.prefix())
        elif col == "suffix":
            data_line.append(fake.suffix())
        elif col == "prefix_male":
            data_line.append(fake.prefix_male())
        elif col == "prefix_female":
            data_line.append(fake.prefix_female())
        elif col == "phone_number":
            data_line.append(fake.phone_number())
        elif col == "cellphone_number":
            data_line.append(fake.cellphone_number())
        elif col == "international_phone_number":
            data_line.append(fake.international_phone_number())
        elif col == "email":
            data_line.append(fake.email())
        elif col == "user_name":
            data_line.append(fake.user_name())
        elif col == "date_of_birth":
            data_line.append(fake.date_of_birth().strftime("%d/%m/%Y"))
        elif col == "date_time":
            data_line.append(fake.date_time().strftime("%d/%m/%Y %H:%M:%S"))
        elif col == "time":
            data_line.append(fake.time().strftime("%H:%M:%S"))
        elif col == "year":
            data_line.append(fake.year())
        elif col == "month":
            data_line.append(fake.month())
        elif col == "day_of_month":
            data_line.append(fake.day_of_month())
        elif col == "day_of_week":
            data_line.append(fake.day_of_week())
        elif col == "sentence":
            data_line.append(fake.sentence())
        elif col == "paragraph":
            data_line.append(fake.paragraph())
        elif col == "text":
            data_line.append(fake.text())
        elif col == "word":
            data_line.append(fake.word())
        elif col == "Words":
            data_line.append(fake.words())
        elif col == "company":
            data_line.append(fake.company())
        elif col == "bs":
            data_line.append(fake.bs())
        elif col == "company_logo":
            data_line.append(fake.company_logo())
        elif col == "job":
            data_line.append(fake.job())
        elif col == "user_agent":
            data_line.append(fake.user_agent())
        elif col == "price":
            data_line.append(fake.price())
        elif col == "amount":
            data_line.append(fake.amount())
        elif col == "currency_code":
            data_line.append(fake.currency_code())
        elif col == "credit_card_number":
            data_line.append(fake.credit_card_number())
        elif col == "bank_account_number":
            data_line.append(fake.bank_account_number())
        elif col == "url":
            data_line.append(fake.url())
        elif col == "Username":
            data_line.append(fake.user_name())
        elif col == "domain_name":
            data_line.append(fake.domain_name())
        elif col == "ipv4":
            data_line.append(fake.ipv4())
        elif col == "ipv6":
            data_line.append(fake.ipv6())
    
    return data_line
        
def insert_into_csv_by_pandas(columnType: list, columnName:list, number_of_rows: int):
    
    col_csv = []

    for i in range(len(columnName)):
        col_csv.append(columnName[i])

    os.makedirs(os.path.dirname('./app/db/data_generated.csv'), exist_ok=True)
    rows = []
    for _ in range(number_of_rows):
        line = use_faker(columnType, number_of_rows)
        rows.append(line)
  
    # Créer un dataframe avec le tableau rows et les noms de colonnes
    data_frame = pd.DataFrame(rows, columns=col_csv)
    # Écrire les données dans un fichier CSV
    data_frame.to_csv('./app/db/data_generated.csv', index=False)

    return 1

def creer_fichier_sql(tableName: str, columnName: list, sqlType: list, number_of_rows: int, columnType: list):

    valeurs = []
    col_name = ["id"] + columnName
    sqlType = ["mediumint not NULL"] + sqlType
    for i in range(number_of_rows):
        valeurs.append([i] + use_faker(columnType, number_of_rows))

    nom_fichier = "./app/db/data_generated.sql"
    os.makedirs(os.path.dirname('./app/db/data_generated.sql'), exist_ok=True)

    # Ouvrir le fichier en mode écriture
    with open(nom_fichier, 'w') as fichier:
        # Écrire la commande CREATE TABLE dans le fichier
        commande_create_table = f"DROP TABLE IF EXISTS `{tableName}`;\n\nCREATE TABLE `{tableName}` (\n"
        for i in range(len(col_name)):
            commande_create_table += f"`{col_name[i]}` {sqlType[i]}, \n"
        commande_create_table = f"{commande_create_table}PRIMARY KEY (`id`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n\n"
        
        fichier.write(commande_create_table)

        # Écrire les commandes INSERT INTO dans le fichier
        commande_insert_into = f"INSERT INTO `{tableName}` ("
        for colonne in col_name:
            commande_insert_into += f"`{colonne}`, "
        commande_insert_into = commande_insert_into.rstrip(", ") + ")\nVALUES \n"
        for valeur in valeurs:
            commande_insert_into = commande_insert_into + "(" + str(valeur[0]) + ", "
            for i in range(1, len(valeur)):
                commande_insert_into += f"\"{valeur[i]}\", "
                if i == len(valeur) - 1:
                    commande_insert_into = commande_insert_into.rstrip(", ") + "),\n"
        if len(valeurs) - 1:
            commande_insert_into = commande_insert_into.rstrip(",\n") + ";\n"
        fichier.write(commande_insert_into)

    return 1