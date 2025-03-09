# EPAM Node.js global mentoring program Q3-Q4 2024

## Practical task

As the application expands and your team is showing impressive results, the customer has requested to implement a basic authorization and authentication. Now we need to introduce a new User entity and extend the existing application with the auth flows.

## Application launch

1. `podman-compose up -d`.

   Create and start docker containers based on **docker-compose.yaml**.

   - Create DB docker container - **postgresDB** (to check creation `podman ps -a`).
   - Create DB docker volume - **nodejs-gmp-template_postgresDBData** (to check creation `podman volume list`).

   psql to check(or pgAdmin):

   - Connect to DB `podman exec -it postgresDB psql -h "127.0.0.1" -p "5432" -d "postgresDB" -U "user"`.
     Password - **pass** (if required).

2. `npm i`.

   Install dependencies.

3. `npm run migration:up`.

   Create DB table based on **./src/configs/micro-orm.config.ts** and migration artifacts **./src/migrations/**.

   Note: migration artifacts have already been created using `npx mikro-orm migration:create` based on **./src/configs/micro-orm.config.ts**.

   psql to check(or pgAdmin):

   - Connect to DB `podman exec -it postgresDB psql -h "127.0.0.1" -p "5432" -d "postgresDB" -U "user"`.
     Password - **pass** (if required).

   - Display table list - `\dt`.

4. `npm run seeder:run`.

   Fill table based on **./src/configs/micro-orm.config.ts** and data filling artifacts **./src/seeders/**.

   Note: Data filling artifacts have already been created using `npx mikro-orm seeder:create DatabaseSeeder` based on **./src/configs/micro-orm.config.ts**.

   Implementation of method **run** in class **DatabaseSeeder**:

   ```
    products.forEach((product) => em.create(Product, product));
   ```

   Note: **products** are imported from **./src/configs/initDBData.ts**.

   psql to check(or pgAdmin):

   - Connect to DB `podman exec -it postgresDB psql -h "127.0.0.1" -p "5432" -d "postgresDB" -U "user"`.
     Password - **pass** (if required).

   - Select product table records - `select * from public.product;`.

5. `npm run start`(or in dev mode `npm run start:dev`).

   Start application.

   Create server and DB connection.

   To check you can use **module-9-auth.postman_collection.json**.

   Note: after "User registration" -> "User login" requests need to add token from "User login" response to postman collection parameter "Authorization->Auth type->Bearer Token->Save".

6. `npm run stop`(or in dev mode `Ctrl+C`).

   Stop application.

7. `podman-compose down`.

   Stop and delete docker containers based on **docker-compose.yaml** (to check deletion `podman ps -a`).

8. `podman volume rm nodejs-gmp-template_postgresDBData`.

   Remove DB docker volume (to check deletion `podman volume list`).

   Or remove all unused volumes `podman volume prune`.
