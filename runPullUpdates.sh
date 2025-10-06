#!/bin/bash

git checkout --ours ./package.json
git checkout --ours ./package-lock.json
git checkout --ours ./frontend/package.json 
git checkout --ours ./frontend/package-lock.json 


if [[ -n $1 ]]; then
  git pull origin $1

  else
  current_branch=$(git symbolic-ref --short HEAD)
  git pull origin $current_branch
  fi
fi