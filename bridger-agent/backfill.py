import sqlite3
import csv


CREATE_TRANSACTIONS = """
CREATE TABLE IF NOT EXISTS transactions (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Date TIMESTAMP,
    Description VARCHAR,
    Payee VARCHAR,
    Category VARCHAR,
    Spent FLOAT,
    Received FLOAT,
    Status VARCHAR CHECK(Status IN ('classified', 'unclassified', 'approved', 'pending_client_review'))
)
"""

CREATE_CLIENTS = """
CREATE TABLE IF NOT EXISTS clients (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name VARCHAR,
    Email VARCHAR
)
"""

con = sqlite3.connect("prisma/dev.db")
cur = con.cursor()
cur.execute(CREATE_TRANSACTIONS)
cur.execute(CREATE_CLIENTS)

f = open("/Users/willhorning/Downloads/1100_BOA# 3050 (2).csv")

rdr = csv.DictReader(f)
rows = [r for r in rdr]
for row in rows:
    row["DATE"] = row.pop("\ufeffDate", None)
    row["PAYEE"] = row.pop("Payee", None)
    row["CATEGORY"] = row.pop("Categorize or match", None)
    if row["SPENT"] != "":
        row["SPENT"] = float(row["SPENT"].replace("$", "").replace(",", ""))
    else:
        row["SPENT"] = None
    if row["RECEIVED"] != "":
        row["RECEIVED"] = float(row["RECEIVED"].replace("$", "").replace(",", ""))
    else:
        row["RECEIVED"] = None
    if row["PAYEE"] and row["CATEGORY"]:
        row["STATUS"] = "classified"
    else:
        row["STATUS"] = "unclassified"
    cur.execute(
        """
        INSERT INTO transactions (Date, Description, Payee, Category, Spent, Received, Status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            row["DATE"],
            row["DESCRIPTION"],
            row["PAYEE"],
            row["CATEGORY"],
            row["SPENT"],
            row["RECEIVED"],
            row["STATUS"],
        ),
    )
con.commit()
