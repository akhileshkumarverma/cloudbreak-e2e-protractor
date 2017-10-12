ENVFILE=./support/testenv
TESTCONF=e2e.conf.js

refresh-image:
				docker pull hortonworks/docker-e2e-cloud

run-gui-tests:
				./scripts/e2e-gui-test.sh

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
