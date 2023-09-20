#!/bin/bash
# setup_server by Kurama250
# Github : https://github.com/Kurama250

apt update && apt upgrade -y
apt install npm node.js git raspi-config -y
curl -fsSL https://deb.nodesource.com/setup_16.x | bash - &&\
apt-get install -y nodejs -y
git clone https://github.com/Kurama250/Stats_server.git
cd Stats_server/
npm install discord.js@13 child_process
npm install pm2 -g
