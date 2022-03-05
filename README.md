# docker-nodejs-mongo-demo
## Simple Service demo using nodejs + express + mongodb, deployed on Docker (Service and Mongodb)

This repository was used for teaching purposes and shared the knowledge.

### Requirements
1. Nodejs
2. Docker
3. Docker compose
4. Mongodb client like NoSQL Booster for MongoDB

### Steps to create docker images and running the project in a docker container
1. Open working folder in the terminal
2. Download npm packages executing following command: 
```Shell
npm install
```

3. Download docker image from docker hub, executing the command: 
```Shell
docker pull mongo
```

4. Create a container from mongo image downloaded in the previous step, execute following command (all in one line): 
```Shell
docker run -d -p 27017-27019:27017-27019 --name mymongo -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo
```

5. Open MongoDB Cliente and try to connect to docker mymongo container (exposed in the previous step), user=mongoadmin, password=secret (see environment variables MONGO_INITDB_ROOT_USERNAME,  MONGO_INITDB_ROOT_PASSWORD in the previous step)
6. Create .env file in the project root folder, this file is used in development environment to inject values to environment variables. Don't upload this file to repository or the docker image, since this file has sensitive information, 
The .env file types have been added to both the .gitignore and the .dockerignore files. The content of the .env file mus be

```yaml
MONGO_HOST=127.0.0.1
MONGO_URI=mongodb://mongoadmin:secret@localhost:27017?authMechanism=SCRAM-SHA-1&authSource=admin
MONGO_DB=apidb
PORT=3000
```

7. run project to verify that all is executed succesfully, executing the following command: 
```shell
npm start
```

8. generate a new image with all source code of this project, run following command: 
```shell
docker build --tag my-service .
```

Note: docker build use the Dockerfile which is in project folder, the --tag my-service is the name that will be used as docker image, it's important include the dot "." in the command.
9. run command to verify the generated docker image: 
```shell
docker image ls
```

10. generate a container from the docker image created in the previous step, use the following commnad (all in one line): 
```shell
docker run -d -p 3000:3000 --name my-service-container --link mymongo:mymongo -e MONGO_HOST=mymongo -e MONGO_URI="mongodb://mongoadmin:secret@localhost:27017?authMechanism=SCRAM-SHA-1&authSource=admin" -e MONGO_DB=apidb -e PORT=3000 my-service
```

Notes:  --link mymongo:mymongo is used to create link between service container and mongo container (mongo container has called mymongo), all arguments with "-e" are environment variables which are injected to container, MONGO_HOST=mymongo must match whith mongo name container.
11. Run following command to check that container generated in the previous step has been created succesfully: docker ps
Note: docker ps or docker container ls must be show a container called my-service-container
12. Test with api tool like postman to check is service is already running.

### Stopping containers
1. Stop service container: 
```shell
docker stop my-service-container
```

2. Stop mongo container: 
```shell
docker stop mymongo
```

### Starting container (in case they are stopped. Both containers must exist and must be stopped )
```shell
docker start my-service-container
```

```shell
docker start mymongo
```

### Removing the container and images (optional)
```shell
docker rm my-service-container
```
```shell
docker rm mymongo
```

### Removing the images (optional, The containers associated with the images you want to delete must first be deleted)
```shell
docker rmi my-service
```

```shell
docker rmi mongo
```
Note: remember images has a name showed in the field repository when you run command: docker image ls.
It's very important remember: The containers associated with the images you want to delete must first be deleted
