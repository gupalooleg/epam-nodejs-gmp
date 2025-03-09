# EPAM Node.js global mentoring program Q3-Q4 2024

## Practical task

It's now time to make some enhancements and ensure the application is ready for production.

## Acceptance criteria

1. Logging

   - Winston is used for all application logs. All logs are reviewed, proper log levels are set for all of them. Application logs are written to console.
   - Logging of incoming requests is added: it contains date, log level, request method, request path and request duration. The format is the following:

   `2024-12-08 11:11:49 [info]: GET /api/products - 3ms`

2. Graceful Shutdown

   - When SIGTERM or SIGINT received, shutdown is initialized for the server.
   - The server stores all the open connections in a separate array. When SIGTERM or SIGINT are received, we close() the server and wait for any remaining connections to finish by sending an end() event to each of them. If server is successfully closed, we exit the process with code 0.
   - After 10 seconds, all the connections are destroyed forcefully, after 20 seconds - the process is forcefully exited with code 1.

3. Config Management & Environment Variables

   - Application has proper config management: environment variables are used instead of any hardcoded values. dotenv npm package is used to manage environment configuration. **Please note that these files should not be committed due to the potential presence of sensitive data. However, for educational purposes and to ensure the proper functioning of automated tests, those files should be commited.**

   - NPM scripts updated to run for production and test environments in package.json.

4. Healthcheck Endpoint

   - **GET /api/health** endpoint is implemented. It checks if server is running and if connection with database is established.

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

   To check you can use **module-10-production.postman_collection.json**.

   Note: after "User registration" -> "User login" requests need to add token from "User login" response to postman collection parameter "Authorization->Auth type->Bearer Token->Save".

   Note: display logs in production mode - `npx pm2 logs module-10-production`.

6. `npm run stop`(or in dev mode `Ctrl+C`).

   Stop application.

   Note: delete app from pm2 in production mode - `npx pm2 delete module-10-production`.

7. `podman-compose down`.

   Stop and delete docker containers based on **docker-compose.yaml** (to check deletion `podman ps -a`).

8. `podman volume rm nodejs-gmp-template_postgresDBData`.

   Remove DB docker volume (to check deletion `podman volume list`).

   Or remove all unused volumes `podman volume prune`.
