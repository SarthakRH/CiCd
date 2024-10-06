# Dockerizing Mern-Application


## Table of Contents
- [Dockerizing The Application](#dockerizing-the-application)
- [Configuring CICD For Containerized Deployment](#configuring-cicd-for-containerized-deployment)

## Dockerizing The Application

1. Created a Dockerfile with the configuration given below to build an image and run it on container.
```bash
FROM node:14.21.3-alpine

WORKDIR /app
COPY ./package.json package.json
COPY ./package-lock.json package-lock.json
COPY ./.env .env
COPY ./start.sh start.sh
COPY ./backend backend/
COPY ./frontend frontend/
COPY ./screenshots screenshots/
RUN npm install && \
    cd frontend && \
    npm install && \
    cd .. && \
    chmod +x start.sh
CMD ["/app/start.sh"]
```
2. Created docker-compose file with the configuration given below to run both app and database on the same network.
```bash
version: "3.1"

services:

  app:
    build:
      context: .
    ports:
      - 5173:5173
      - 5000:5000
    depends_on:
      - db
    networks:
      network:
        ipv4_address: 10.5.0.5

  db:
    image: mongo:7.0.2-jammy
    restart: always
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=password
    expose:
      - "27017"
    networks:
      network:
        ipv4_address: 10.5.0.6

networks:
  network:
    driver: bridge
    ipam:
      config:
        - subnet: 10.5.0.0/16
          gateway: 10.5.0.1
```
3. As backend and frontend running on same container ( can't specify two entry point for the container ), so created a script which start backend and frontend service in the container with below configuration and added script as a entry point for the container.
```bash
#!/bin/sh

cd /app && npm start &
cd /app/frontend && npm run dev
```
4. Now its time to run ```docker compose up --build``` and the containers are up, as shown below.

![app_container](./screenshots/png1.png?raw=true "app_container")

As the container is running but web page doesn't load in the browser, as shown below

![error_browser](./screenshots/png2.png?raw=true "error_browser")

So to fix this, added this line ``` "dev": "vite --host" ``` in frontend/package.json, again build the image and web-site works correctly as show below

![web_page1](./screenshots/png3.png?raw=true "web_page")

## Configuring CICD For Containerized Deployment

1. Created the .gitlab-ci.yml file with the below configurations.
```
stages:
  - build
  - test
  - publish
  - deploy
  - cleanup

variables:
  TAG_LATEST: $CI_REGISTRY_IMAGE/$CI_COMMIT_REF_NAME:latest
  TAG_COMMIT: $CI_REGISTRY_IMAGE/$CI_COMMIT_REF_NAME:$CI_COMMIT_SHORT_SHA

build:
  stage: build
  script:
    - docker compose up --build --no-start

test:
  stage: test
  script:
    - docker compose up -d
    - docker exec wec-task-cicd-app-1 npm test
    - docker compose down

publish:
  image: docker:latest
  stage: publish
  services:
    - docker:dind
  script:
    - docker build -t $TAG_COMMIT -t $TAG_LATEST .
    - docker login $REGISTRY -u $USER -p $TOKEN
    - docker push $TAG_COMMIT
    - docker push $TAG_LATEST

deploy:
  stage: deploy
  tags:
    - deployment
  script:
    - docker compose up -d
  environment:
    name: production
    url: http://13.232.88.63:5173
  only:
    - main

cleanup:
  stage: cleanup
  script:
    - docker compose down
    - docker image prune -a -f

```

2. Defined the jobs as Build, Test, Publish, Deploy, Cleanup.
3. Created an EC2 instance on AWS and assigned that instance for gitlab-runner.
4. Added same instance for CICD runner for this project.
5. Modified the .gitlab-ci.yml config to build and deploy the containerized application on that instance.
