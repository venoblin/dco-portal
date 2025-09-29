#!/bin/bash

git checkout --ours ./package.json
git checkout --ours ./package.lock.json
git checkout --ours ./frontend/package.json 
git checkout --ours ./frontend/package.lock.json 

git pull origin dco