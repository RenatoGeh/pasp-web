#!/bin/bash

pushd . && cd lang-pasp && bash rollup.sh && popd && node_modules/.bin/rollup -c
