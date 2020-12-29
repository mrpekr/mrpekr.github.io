#!/bin/bash

# skip if build is triggered by pull request
if [ $TRAVIS_PULL_REQUEST == "true" ]; then
  echo "this is PR, exiting"
  exit 0
fi

# enable error reporting to the console
set -e

# cleanup "_site"
rm -rf _site
mkdir _site

# clone remote repo to "_site"
git clone https://${GH_TOKEN}@github.com/YOUR_GITHUB_USERNAME/YOUR_GITHUB_REPO --branch master _site

# build with Jekyll into "_site"
# exec jekyll build

# push empty commit
cd _site
git config user.email "stampachpetr@email.com"
git config user.name "mrpekr"
git commit -a -m "rebuild pages" --allow-empty
git push origin gh-pages

# remove last empty commit
git reset HEAD~
git push origin gh-pages --force