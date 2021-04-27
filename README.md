# Mini series about how to speed up your development process

This repository contains all resources related to the mini-series about utilizing AsyncAPI code generation in your development process.

Directory setup:
- `./AsyncAPI` - Contains all the AsyncAPI documents and components for both applications.
- `./Game server` - Contains all the source code for the game server application.
- `./Processor` - Contains all the source code for the processor application.
- `./docs` - contains all the corresponding blog posts.

## Quick start local development
Here is the steps to get the applications running.
### Requirements
The following libraries must be installed:
* Node.js
* npm 
* Docker

### Services

* start all services `docker-compose up -d`

### Game server

* Install all dependencies `npm i`
* Start the game server `npm run start`
* (optional) If you want to re-generate the NATS client run the command `npm run generate:client`

### Processor 

* Install all dependencies `npm i`
* Start the game server `npm run start`
* (optional) If you want to re-generate the NATS client run the command `npm run generate:client`

