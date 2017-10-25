FROM ubuntu:xenial
MAINTAINER Hortonworks

# Debian package configuration use the noninteractive frontend: It never interacts with the user at all, and makes the default answers be used for all questions.
# http://manpages.ubuntu.com/manpages/wily/man7/debconf.7.html
ENV DEBIAN_FRONTEND noninteractive

# Update is used to resynchronize the package index files from their sources. An update should always be performed before an upgrade.
RUN apt-get update -qqy \
  && apt-get -qqy install \
    apt-utils \
    wget \
    sudo \
    curl \
    git

# Font libraries
RUN apt-get update -qqy \
  && apt-get -qqy install \
    fonts-ipafont-gothic \
    xfonts-100dpi \
    xfonts-75dpi \
    xfonts-cyrillic \
    xfonts-scalable \
    ttf-ubuntu-font-family \
    libfreetype6 \
    libfontconfig

# Nodejs 8 with npm install
# https://github.com/nodesource/distributions#installation-instructions
RUN apt-get update -qqy \
  && apt-get -qqy install \
    software-properties-common \
    python-software-properties
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get update -qqy \
  && apt-get -qqy install \
    nodejs \
    build-essential

# Latest Google Chrome installation package
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - \
  && sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

# Latest Ubuntu Google Chrome, XVFB and JRE installs
RUN apt-get update -qqy \
  && apt-get -qqy install \
    xvfb \
    google-chrome-stable \
    firefox \
    default-jre

RUN GECKODRIVER_VERSION=$(curl --silent "https://api.github.com/repos/mozilla/geckodriver/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/') \
  && echo $GECKODRIVER_VERSION \
  && wget --no-verbose --output-document /tmp/geckodriver.tar.gz https://github.com/mozilla/geckodriver/releases/download/$GECKODRIVER_VERSION/geckodriver-$GECKODRIVER_VERSION-linux64.tar.gz \
  && tar --directory /opt -zxf /tmp/geckodriver.tar.gz \
  && chmod +x /opt/geckodriver \
  && ln -fs /opt/geckodriver /usr/bin/geckodriver

# Clean clears out the local repository of retrieved package files. Run apt-get clean from time to time to free up disk space.
RUN apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# 1. Step to fixing the error for Node.js native addon build tool (node-gyp)
# https://github.com/nodejs/node-gyp/issues/454
# https://github.com/npm/npm/issues/2952
RUN rm -fr /root/tmp
# 2. Step to fixing the error for Node.js native addon build tool (node-gyp)
# https://github.com/nodejs/node-gyp/issues/454
# https://docs.npmjs.com/getting-started/fixing-npm-permissions
RUN npm install --unsafe-perm -g \
    protractor \
    typescript \
# Get the latest Google Chrome driver
  && npm update \
# Get the latest WebDriver Manager
  && webdriver-manager update \
  && npm cache verify

# Set the working directory
WORKDIR /protractor/

# Copy the run sript/s from local folder to the container's related folder
COPY /scripts/run-e2e-tests.sh /entrypoint.sh

# Set the HOME environment variable for the test project
ENV HOME=/protractor/project
# Set the file access permissions (read, write and access) recursively for the new folders
RUN chmod -Rf 777 .

# Container entry point
ENTRYPOINT ["/entrypoint.sh"]
