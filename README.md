# EPAM Node.js global mentoring program Q3-Q4 2024

## Practical task

As the Products API expands and the number of products grows, the decision was made to move to a NoSQL database. In this task you will need to update the existing Products API to use MongoDB for product storage. Additionally, you have to pre-populate the new data storage with the existing products.

## Acceptance criteria

1. Data is stored in MongoDB database, products collection. Mongoose is used as ODM(Object Document Mapper) for querying MongoDB.

2. Data Access Layer is rewritten to query MongoDB. Product schema is the same as the one used in the previous module.

3. There is a script that pre-populates MongoDB with products.

## Application launch

1. `podman-compose up -d`.

   Create and start docker containers based on **docker-compose.yaml**.

   - Create DB docker container - **mongoDB** (to check creation `podman ps -a`).
   - Create DB docker volume - **nodejs-gmp-template_mongoDBData** (to check creation `podman volume list`).
   - Add initial DB data based on **docker-compose-db-init.js** (to check **mongosh** or **MongoDB Compass**).

   mongosh example:

   ```
   podman exec -it mongoDB mongosh -u "user" -p "pass"
   show dbs
   use mongoDB
   db.users.find()
   ```

2. `npm i`.

   Install dependencies.

3. `npm run start`(or in dev mode `npm run start:dev`).

   Start application.

   Create server and DB connection.

   To check you can use **module-7-db-nosql.postman_collection.json**.

4. `npm run stop`(or in dev mode `Ctrl+C`).

   Stop application.

5. `podman-compose down`.

   Stop and delete docker containers based on **docker-compose.yaml**.

6. `podman volume rm nodejs-gmp-template_mongoDBData`.

   Remove DB docker volume.

   Or remove all unused volumes `podman volume prune`
