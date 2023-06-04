# Test Assignment for NSW Job

## Description

Project is a microservice for NSW Test Job. I have used npm, node and other such technologies in the microservcies.

## Dependencies

Deployment of microservices requires following dependencies:

- Docker
- NPM

## Project setup

- Please install `Docker`.
- Open Command prompt, Powershell or terminal, and Run `docker-compose up` from the root folder
- After successfull execution API is available
- To directly call API, please refer to  section `API`
- To directly call Front End, please refer to  section `FE`

## Project Port
Project required following ports:

- 3306
- 8084
- 1234

You can always change these ports by changing them inside docker compose file.


## Docker Server Structure

Docker will deploy three applications:

- db for mariadb
- api for APIs
- app for front end app


## API

The API contain all of different requests. To explore them, please visit: `http://localhost:8084/swagger-ui/index.html`


## Database
- Microservice is using mariadb for storage
- Backup of db is available in database folder from the root folder


## Front end

- Front End (FE) deployment is also part of docker composer file implementation. FE is accessed through `http://localhost:12344'
- 
## Run Tests

Unfortunatly due to limitation of time, I was not able to implement unit tests.


## Missing Stuff

Following items were not finished

- Unit Tests
- Dashboard
- GraphQL for refreshing biding state




