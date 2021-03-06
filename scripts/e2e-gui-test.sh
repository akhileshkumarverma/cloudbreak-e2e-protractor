#!/bin/bash -x
# -e  Exit immediately if a command exits with a non-zero status.
# -x  Print commands and their arguments as they are executed.

: ${BASE_URL:? required}
: ${USERNAME:? required}
: ${PASSWORD:? required}
: ${MASTER_SSH_KEY:? required}
: ${CLOUDBREAK_CENTOS_SSH_USER:? required}
: ${BROWSER:? required}
: ${ENVFILE:=./testenvironment}

HOST=${BASE_URL#*//}
export NOWDATE=$(ssh -o StrictHostKeyChecking=no -i $MASTER_SSH_KEY $CLOUDBREAK_CENTOS_SSH_USER@$HOST date +%Y-%m-%d"T"%H:%M:%S)

export TESTCONF=/protractor/project/typeScript/protractor.conf.js
export ARTIFACT_POSTFIX=info

CBD_VERSION=$(curl -sk $BASE_URL/cb/info | grep -oP "(?<=\"version\":\")[^\"]*")
echo "CBD version: "$CBD_VERSION

echo "Refresh the Test Runner Docker image"
docker pull hortonworks/cloudbreak-web-e2e

export TEST_CONTAINER_NAME=cloudbreak-e2e-runner

echo "Checking stopped containers"
if [[ -n "$(docker ps -a -f status=exited -f status=dead -q)" ]]; then
  echo "Delete stopped containers"
  docker rm $(docker ps -a -f status=exited -f status=dead -q)
else
  echo "There is no Exited or Dead container"
fi

echo "Checking " $TEST_CONTAINER_NAME " container is running"
if [[ "$(docker inspect -f {{.State.Running}} $TEST_CONTAINER_NAME 2> /dev/null)" == "true" ]]; then
  echo "Delete the running " $TEST_CONTAINER_NAME " container"
  docker rm -f $TEST_CONTAINER_NAME
fi

BASE_URL_RESPONSE=$(curl -k --write-out %{http_code} --silent --output /dev/null $BASE_URL/sl)
echo $BASE_URL " HTTP status code is: " $BASE_URL_RESPONSE
if [[ $BASE_URL_RESPONSE -ne 200 ]]; then
    echo $BASE_URL " Web GUI is not accessible!"
    RESULT=1
else
    docker run -i \
    --privileged \
    --rm \
    --name $TEST_CONTAINER_NAME \
    --env-file $ENVFILE \
    -v $(pwd):/protractor/project \
    -v /dev/shm:/dev/shm \
    hortonworks/cloudbreak-web-e2e yarn test
    RESULT=$?
fi

echo " Get the runtime CBD logs!"
mkdir -pv cloudbreak-logs
sudo chown -R jenkins .

ssh -tt -o StrictHostKeyChecking=no -i $MASTER_SSH_KEY $CLOUDBREAK_CENTOS_SSH_USER@$HOST sudo docker logs --since $NOWDATE cbreak_cloudbreak_1 > cloudbreak-logs/cloudbreak-$CBD_VERSION.log

exit $RESULT