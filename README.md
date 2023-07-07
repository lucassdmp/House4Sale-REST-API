# REST API in Express

This is a basic REST API built using the Express framework. The API provides endpoints to perform CRUD operations on a specific resource.

## Prerequisites

- Node.js installed
- PostgreSQL database configured

## Configuration

1. Clone the repository:
```bash
    git clone https://github.com/lucassdmp/House4SaleDB
```

2. Install the dependencies: 
```bash
    cd House4SaleDB
    npm install
```	


3. Set the environment variables:

    Create an `.env` file in the root directory of the project and set the following environment variables or edit the .env.basic:

```bash
    PGUSER=<DATABASE_USER>
    PGHOST=<DATABASE_HOST>
    PGDATABASE=<DATABASE_NAME>
    PGPASSWORD=<DATABASE_PASSWORD>
    PGPORT=<DATABASE_PORT>
    API_PORT=<SERVER_PORT>
    API_SUFFIX=<ENDPOINTS_SUFFIX>
```


Be sure to replace the values between `< >` with your specific settings.

## Running the API

After completing the configuration, you can run the API using the following command:

```bash
    npm run dev
```


This will start the server on the specified port and the API will be ready to receive requests.

## Endpoints

The API has the following endpoints available:

- `GET /houses`: Returns all houses.
- `GET /houses/type/:type`: Returns all houses of a given type.
- `GET /houses/address/:address`: Returns all houses with a given address.
- `GET /houses/id/:id`: Returns a house by its ID.
- `GET /houses/date/:order`: Returns all houses sorted by date.
- `GET /houses/price/:order`: Returns all houses sorted by price.
- `GET /houses/prices/:price`: Returns all houses with a specific price.
- `POST /post/house`: Adds a new house.
- `DELETE /delete/house/:id`: Deletes a house by ID.

These are just some examples of available endpoints. Be sure to review the source code for the complete list of endpoints and their functions.

## Note

This project was developed for study purposes, in college activities, and therefore will not be maintained.


## License

This project is licensed under the MIT License. See the LICENSE file for more details.
