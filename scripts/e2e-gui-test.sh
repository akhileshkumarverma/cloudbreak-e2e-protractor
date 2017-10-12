#!/bin/bash -x
# -e  Exit immediately if a command exits with a non-zero status.
# -x  Print commands and their arguments as they are executed.

: ${BASE_URL:? required}
: ${USERNAME:? required}
: ${PASSWORD:? required}
: ${SSH_KEY_NAME:? required}
: ${SSH_KEY_PATH:? required}
: ${CLOUDBREAK_CLOUDBREAK_SSH_USER:? required}
: ${BROWSER:? required}
: ${ENVFILE:=./support/testenv}

HOST=${BASE_URL#*//}
export NOWDATE=$(ssh -o StrictHostKeyChecking=no -i $HWQE_SSH_KEY $CLOUDBREAK_CLOUDBREAK_SSH_USER@$HOST date +%Y-%m-%d"T"%H:%M:%S)

export TESTCONF=/protractor/project/typeScript/e2e.conf.js
export ARTIFACT_POSTFIX=info

TARGET_CBD_VERSION=$(curl -sk $BASE_URL/cb/info | grep -oP "(?<=\"version\":\")[^\"]*")
echo "CBD version: "$TARGET_CBD_VERSION

echo "Refresh the Test Runner Docker image"
docker pull hortonworks/docker-e2e-cloud

export TEST_CONTAINER_NAME=hdc-e2e-runner

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
    hortonworks/docker-e2e-cloud protractor typescript e2e.conf.js
    RESULT=$?
fi

echo " Get the runtime CBD logs!"
mkdir -pv cloudbreak-logs
sudo chown -R jenkins .

ssh -tt -o StrictHostKeyChecking=no -i $HWQE_SSH_KEY $CLOUDBREAK_CLOUDBREAK_SSH_USER@$HOST sudo docker logs cbreak_cloudbreak_1 > cloudbreak-logs/cloudbreak-$TARGET_CBD_VERSION.log

exit $RESULT