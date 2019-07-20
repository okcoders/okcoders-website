#!/bin/bash

source build/.env

docker build -t local-mongo -f build/Dockerfile.db ./

docker build -t local-app -f build/Dockerfile.app ./