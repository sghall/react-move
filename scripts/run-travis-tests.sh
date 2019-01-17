#!/bin/bash
set -ev
npm run lint
npm run test:coverage
coveralls < ./coverage/lcov.info
