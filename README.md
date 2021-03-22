# Source code for the blog mini-series about code generation

This repository contains all resources related to the mini-series about utilizing AsyncAPI code generation in your development process.

Directory setup:
- `./AsyncAPI`

This directory contains all the AsyncAPI documents and components for both applications.
- `./Game server`

Contains all the source code for the game server application.
- `./Processor`

Contains all the source code for the processor application.

## Quick start launch application

### Game server

* Install all dependencies `npm i`

### Processor 

* Install all dependencies `npm i`




## Quick start local development

### Game server

* Install all dependencies `npm i`
* Start the game server `npm run start`
* If you want to re-generate the NATS client run the command `npm run generate:client`

### Processor 

* Install all dependencies `npm i`
* If it is the first time make sure to setup the database `npm run setup:database`
* Start the game server `npm run start`
* If you want to re-generate the NATS client run the command `npm run generate:client`


