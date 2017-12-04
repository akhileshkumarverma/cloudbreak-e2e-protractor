ENVFILE=./testenvironment

refresh-image:
				docker pull hortonworks/cloudbreak-web-e2e

run-gui-tests:
				./scripts/e2e-gui-test.sh

run:

				docker run -it \
                    --privileged \
                    --rm \
                    --net=host \
                    --name cloudbreak-e2e-runner \
                    --env-file $(ENVFILE) \
                    -v $(PWD):/protractor/project \
                    hortonworks/cloudbreak-web-e2e yarn test
                    RESULT=$?

.PHONY:
				run
