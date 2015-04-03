#!/bin/bash

apt-get -y update
apt-get install -y alsa-utils libasound2-dev
chmod +x sound_start
mv sound_start /usr/bin/sound_start
