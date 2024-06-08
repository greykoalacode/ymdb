<h1>YMDB: Your Movie DataBase</h1>

## Description

[Nest](https://github.com/nestjs/nest) framework based project implementing a movie database using TypeORM and PostgreSQL

## Routes

### Movies

- `/movies`
  - GET `/`: get all movies
  - GET `?sort=rating`: get all movies sorted by average rating
  - GET `?genre=<GENRE>`: get movies filtered based on GENRE parameter
  - GET `?title=<TITLE>`: get movies filtered based on TITLE parameter
  - GET `/upcoming`: get upcoming movies
  - GET `/:id`: get existing movie
  - POST `/`: create a movie
  - PATCH `/:id`: update existing movie
  - DELETE `/:id`: delete existing movie
- `/users`
  - GET `/`: get all users
  - GET `/:id`: get existing user
  - POST `/`: create new user
  - DELETE `/`: delete all users
  - PATCH `/:id`: update existing user
  - DELETE `/:id`: delete existing user
-  `/ratings`
  - GET `/`: get all ratings
  - GET `/:id`: get existing rating
  - POST `/`: create new rating
  - POST `/bulk`: create multiple ratings
  - DELETE `/`: delete all ratings
  - PATCH `/:id`: update existing rating
  - DELETE `/:id`: delete existing rating

## Installation

```bash
$ npm install
```

## Setup

### Requirements
- PostgreSQL
- NodeJS  > v18

### Clone the Repository

### Installation

```bash
$ npm install
```

### Initial Data Setup
```bash
npx ts-node src/scripts/seed.ts
```

### Run the application
```bash
npm run start:dev
```

### Test API
`ymdb.postman_collection.json` file provided for Postman collection setup with endpoints & initial body


## Docker Compose

```bash
$ docker compose up
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

