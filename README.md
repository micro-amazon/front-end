# front-end

Front-end application written in [Node.js](https://nodejs.org/en/) that puts together all of the microservices under [micro-amazon](https://github.com/micro-amazon/micro-amazon)

![스크린샷 2021-12-17 오후 2.52.16.png](https://raw.githubusercontent.com/micro-amazon/front-end/master/public/img/sample1.png)

관리자 로그인 모달

![스크린샷 2021-12-17 오후 3.03.54.png](https://raw.githubusercontent.com/micro-amazon/front-end/master/public/img/sample2.png)

관리자 주문 대시보드

# Jenkins pipeline

- [Jenkinsfile](https://github.com/micro-amazon/front-end/blob/master/Jenkinsfile)
    - git scm update
    - gradle build
    - [docker build and push](https://hub.docker.com/repository/docker/zwan2/micro-amazon-front-end)
    - deploy kubernetes

# Run

## Node

`npm start`

## Docker

`make server`

# Use

## Node

`curl http://localhost:8081`