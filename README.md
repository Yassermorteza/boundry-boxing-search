# Sport clubs 

This is a blueprint of server code a sport clubes app, based on REST API. It's made on [KoaJs](https://koajs.com/),[MongoDB](https://www.mongodb.com/),[Docker](https://www.docker.com/),[Docker-compose](https://docs.docker.com/compose/).

## API

Every record in this api has `geo location` attributes, and it supposed to support bounding box queries.

```js
    geometry:{
            type: { type: String, default: 'Point' },
            coordinates: [Number]
        }
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

In case to run the app on your local machine the below software and environments are required under the oporating system configuration.

```
    Nodejs v9.11.1
    npm v4.6.1
    MongoDB shell version v3.6.5
    Docker version 18.06.0-ce, build 0ffa825
    Docker-compose version 1.22.0, build f46880f
```
Docker images(containers) you may need to pull from [https://hub.docker.com/](Docker Hub):
 ```
    docker pull mongo:latest
    docker pull node:latest
 ```

## Installing

A step by step series of examples that tell you how to get a development env running

```
    git clone git@github.com:Yassermorteza/sport-clubs.git
    cd sport-clubs
    docker-compose up --build
```
After applying the above command lines if you faced a problem connecting to mongodb, it can be helpful to kill running mongo and run the app again, for this purpose run ``sudo killall mongod`` command line and run the docker-compose again. Also it may take a while docker-compose downloads all of the dependencies and ``nodemon``.

## Endpoints

To check the enpoints you can open local url on port 5000 ```http://localhost:5000/``` with chrome apps [Postman](https://www.getpostman.com/) or [Insomnia](https://insomnia.rest/).

```/sport``` is a POST route to add new record to our collection.

```/sport/:id``` is a PUT route to modify a record that already exist.

```/search/:lnglat``` is a GET route to search inside the collection by longitude and latitude, the parameter includes a sequence of  four lng and lat with comma separation, like ```search/0,0,100,100``` ```search/lng,lat,lng,lat```, it is made for boundry boxing search.



