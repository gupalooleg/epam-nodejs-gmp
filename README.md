# EPAM Node.js global mentoring program Q3-Q4 2024

## Practical task

Imagine that you have recently joined a company that sells a wide range of products like e.g Amazon. You're a key member of the team who is responsible for the core app's functionality - products. The customer has recently decided to switch to Node.js and Express and to rewrite the whole Products API from scratch.

## Acceptance criteria

1. Server is created using Express framework. Server should be started using `npm start` command and stopped by `npm run stop` (see Hint 1). Server is running on 8000 port.

2. API implementation follows `./swagger.yaml` provided above. Proper [HTTP status codes](https://developer.mozilla.org/ru/docs/Web/HTTP/Status) are returned in responses (not only 200 or 500). Auth endpoints should be skipped at this point.

3. Application is implemented following Three Layered Architecture. Layers are separated by file names. For example **xxx.repository.ts** contains functions to retrieve data (data access layer), **xxx.service.ts** contains services that implement business logic, **xxx.controller.ts** contains functions that manage status codes/responses returned (presentation layer).
4. Data is stored either in memory or on file system.

5. [joi](https://www.npmjs.com/package/joi) is used to validate request bodies.

## Hints

The hints below will help you to solve our task. Feel free to skip them if you feel the true power.

### Hint 1 - Start and stop server

You can use [pm2](https://www.npmjs.com/package/pm2) to simply start and stop your server. Here are the steps to follow:

```
// step 1 - install pm2

npm i pm2 --save-dev

// step 2 - add start command to package.json

"scripts": {
...
"start": "./node_modules/.bin/pm2 start {path_to_index_file} --name ngmp-network-app",
...
}

// step 3 - add stop command to package.json

"scripts": {
...
"stop": "./node_modules/.bin/pm2 stop ngmp-network-app",
...
}
```

**Start and stop server implemented in TypeScript.**

Since Node.js doesn't natively support TypeScript files, we need to transpile TypeScript into JavaScript before starting or stopping the server with pm2.

Use the following command to build the TypeScript:

```
"scripts": {
  "build": "tsc", ----> converts TypeScript to JavaScript, the output will be saved to ./dist folder
}
```

After building, the start and stop scripts are configured as follows:

```
"scripts": {
  "start": "npm run build && ./node_modules/.bin/pm2 start ./dist/{path_to_index_file}.js --name ngmp-network-app",
  "stop": "./node_modules/.bin/pm2 stop ngmp-network-app",
  "build": "tsc",
}
```
