#!/bin/bash
# Move to the Protractor test project folder
cd $HOME

echo "User name: " $(id -u -n)
echo "User ID (UID): " $(id -u)
echo "Home folder is: " $(pwd)
echo "Node version: " $(node --version)
echo "NPM version: " $(npm --version)

echo "NPM directory: " $(npm config get prefix)
echo "Typescript version: " $(tsc --version) " and the TSC path: " $(which tsc)
echo "Protractor version: " $(protractor --version)
echo "WebDriver version: " $(webdriver-manager version)

# Install the necessary packages
npm install
# Run the Selenium installation script, located in the local node_modules/ directory.
# This script downloads the files required to run Selenium itself and build a start script and a directory with them.
# When this script is finished, we can start the standalone version of Selenium with the Chrome driver by executing the start script.
node ./node_modules/protractor/bin/webdriver-manager update
# Right now this is not necessary, because of 'directConnect: true' in the 'protractor.conf.js'
# echo "Starting webdriver"
# node ./node_modules/protractor/bin/webdriver-manager start [OR webdriver-manager start] &"
# echo "Finished starting webdriver"

echo "Running Protractor tests"
# X11 for Ubuntu is not configured! The following configurations are needed for XVFB.
# Make a new display with virtual screen 0 with resolution 1920x1080 24dpi
xvfb-run --server-args="-screen 0 1920x1080x24" -a $@
export RESULT=$?

echo "Protractor tests have done"
# Remove temporary folders
rm -rf .config .local .pki .cache .dbus .gconf .mozilla
# Set the file access permissions (read, write and access) recursively for the result folders
chmod -Rf 777 reports

exit $RESULT