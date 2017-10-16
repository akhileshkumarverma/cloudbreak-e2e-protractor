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
    curl

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

# YARN installation package
RUN wget -q -O - https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - \
 && sh -c 'echo "deb https://dl.yarnpkg.com/debian/ stable main" >> /etc/apt/sources.list.d/yarn.list'
# Latest Google Chrome installation package
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - \
  && sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

# Firefox 47.0.2 install
RUN apt-get purge firefox
RUN wget https://ftp.mozilla.org/pub/firefox/releases/47.0.2/linux-$(uname -m)/en-US/firefox-47.0.2.tar.bz2 \
  && tar -xjf firefox-47.0.2.tar.bz2 \
  && mv firefox /opt/ \
  && ln -s /opt/firefox/firefox /usr/bin/firefox
RUN apt-mark hold firefox

# Latest Ubuntu Google Chrome, XVFB and JRE installs
RUN apt-get update -qqy \
  && apt-get -qqy install \
    xvfb \
    google-chrome-stable \
    default-jre \
    yarn

# Clean clears out the local repository of retrieved package files. Run apt-get clean from time to time to free up disk space.
RUN apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# 1. Step to fixing the error for Node.js native addon build tool (node-gyp)
# https://github.com/nodejs/node-gyp/issues/454
# https://github.com/npm/npm/issues/2952
RUN rm -fr /root/tmp
# 2. Step to fixing the error for Node.js native addon build tool (node-gyp)
# https://github.com/nodejs/node-gyp/issues/454
RUN npm install --unsafe-perm --save-exact -g \
    protractor@5.0.0 \
    typescript \
# Get the latest Google Chrome driver
  && npm update \
# Get the latest WebDriver Manager
  && webdriver-manager update \
  && npm cache verify
# Set the path to the global npm install directory. This is vital for Jasmine Reporters
# http://stackoverflow.com/questions/31534698/cannot-find-module-jasmine-reporters
# https://docs.npmjs.com/getting-started/fixing-npm-permissions
ENV NODE_PATH /usr/lib/node_modules

# Create new user for protractor testing. This is vital for Google Chrome to can launch with WebDriver
RUN mkdir -p /protractor
RUN useradd -d /protractor/project -m protractor
RUN echo 'protractor:protractor' | chpasswd
RUN chown -R protractor /protractor
RUN chgrp -R protractor /protractor

# Change to Protractor user
USER protractor
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
