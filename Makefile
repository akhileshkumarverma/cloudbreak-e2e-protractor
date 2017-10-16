ENVFILE=./support/testenv
TESTCONF=protractor.conf.js

refresh-image:
				docker pull hortonworks/docker-e2e-cloud

run-gui-tests:
				./scripts/e2e-gui-test.sh

build:

				docker build -t hortonworks/docker-e2e-cloud:1.0 .

run:

				docker run -it \
                    --privileged \
                    --rm \
                    --name cloud-e2e-runner \
                    --env-file $(ENVFILE) \
                    -v $(PWD):/protractor/project \
                    hortonworks/docker-e2e-cloud:1.0 npm test
                    RESULT=$?

.PHONY:
				run
