import psycopg2
import os
from dotenv import load_dotenv


# Carrega valores para as variáveis de ambiente do .env
load_dotenv()

# Recupera os valores das variáveis de ambiente
database = os.getenv('PGDATABASE')
user = os.getenv('PGUSER')
passwd = os.getenv('PGPASSWORD')
host = os.getenv('PGHOST')
port = os.getenv('PGPORT')


# Connect to your postgres DB
conn = psycopg2.connect(
    dbname=database,
    user=user,
    password=passwd,
    host=host,
    port=port
)

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a query
cur.execute("SELECT * FROM imoveldata;")

# Retrieve query results
records = cur.fetchall()

for record in records:
    print(record)

# Close the cursor and connection
cur.close()
conn.close()

