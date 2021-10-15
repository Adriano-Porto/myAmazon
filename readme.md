# myAmazon

### myAmazon is an API that manages and handle requests of an e-commerce

## Structure
    There is a database for all the products listed, the users logged in and the specialUsers whom can modify and update products from the store. There is also a database that holds all the transactions that were made in the store.

    All the validation code is wrapped inside the validations folder, the request and response of each route is managed by the controllers and the request for the database are made by the services.

## Tecnologies
    Made using Node.js with Typescript. Used the Express package as the routes manager and TYPEORM with the sqlite3's driver to store the data.