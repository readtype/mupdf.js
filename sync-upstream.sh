#!/bin/bash

# Set branch and upstream remote
BRANCH="main"
UPSTREAM_REMOTE="upstream"
UPSTREAM_BRANCH="master"

# Fetch latest upstream changes
git fetch $UPSTREAM_REMOTE

# Start rebase
git checkout $BRANCH
git rebase $UPSTREAM_REMOTE/$UPSTREAM_BRANCH

# If there are conflicts, resolve them by choosing our version
if [ $? -ne 0 ]; then
  git rebase --abort
  git merge -X ours $UPSTREAM_REMOTE/$UPSTREAM_BRANCH
fi