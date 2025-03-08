# EPAM Node.js global mentoring program Q3-Q4 2024

## Practical task

As the time goes, MongoDB is no longer a solution for the Products API. Therefore, the decision has been made to move to PostgreSQL as the primary data storage. Similar to the previous task, you have to pre-populate the new data storage with the existing products.

## Acceptance criteria

1. Data is stored in PostgreSQL database. MikroORM ORM(Object Relational Mapping) is used for querying PostgreSQL.

2. Migrations are used to create and delete products table (note that MikroORM will create product table by default unless specified).

3. Seeds are used to populate products table with test data.

4. There are npm scripts added to package.json to run migrations and seeds.

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
    users.forEach((user) => em.create(User, user));
    products.forEach((product) => em.create(Product, product));
   ```

   Note: **users** and **products** are imported from **./src/configs/initDBData.ts**.

   psql to check(or pgAdmin):

   - Connect to DB `podman exec -it postgresDB psql -h "127.0.0.1" -p "5432" -d "postgresDB" -U "user"`.
     Password - **pass** (if required).

   - Select user table records - `select * from public.user;`.

   - Select product table records - `select * from public.product;`.

5. `npm run start`(or in dev mode `npm run start:dev`).

   Start application.

   Create server and DB connection.

   To check you can use **module-8-db-relational.postman_collection.json**.

6. `npm run stop`(or in dev mode `Ctrl+C`).

   Stop application.

7. `podman-compose down`.

   Stop and delete docker containers based on **docker-compose.yaml** (to check deletion `podman ps -a`).

8. `podman volume rm nodejs-gmp-template_postgresDBData`.

   Remove DB docker volume (to check deletion `podman volume list`).

   Or remove all unused volumes `podman volume prune`.
