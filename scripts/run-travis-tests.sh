#!/bin/bash
set -ev
npm run lint
npm run test:coverage
npm run test:karma
coveralls < ./coverage/lcov.info
