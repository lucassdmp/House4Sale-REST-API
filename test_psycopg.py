import psycopg2

# Connect to your postgres DB
conn = psycopg2.connect(
    dbname="mydb",
    user="",
    password="",
    host="localhost",
    port="5432"
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

