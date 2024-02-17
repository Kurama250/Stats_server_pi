<h1 align="center">Bot stats Raspberry Pi server for Discord</h1>
<em><h5 align="center">(Programming Language - Node.js | Shell)</h5></em>

<p align="center">
  <img src="https://img.shields.io/github/stars/Kurama250/Stats_server_pi">
  <img src="https://img.shields.io/github/license/Kurama250/Stats_server_pi">
  <img src="https://img.shields.io/github/repo-size/Kurama250/Stats_server_pi">
  <img src="https://img.shields.io/badge/stability-stable-green">
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/module-name">
  <img src="https://img.shields.io/npm/v/child_process?label=child_process">
  <img src="https://img.shields.io/npm/v/discord.js@13?label=discord.js@13">
</p>

# Tutorial to install the bot ! For Rasbian (Raspberry Pi)

## 1 - on Terminal

<h5>A) Auto installer</h5>

- Run command :
  
```shell script
bash <(curl -s https://raw.githubusercontent.com/Kurama250/Stats_server_pi/main/setup_server.sh)
```
<h5>B) Manual installer</h5>

```shell script
apt update && apt upgrade -y
apt install npm nodejs git raspi-config -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&\
apt-get install -y nodejs
```
```shell script
git clone https://github.com/Kurama250/Stats_server_pi.git
cd Stats_server_pi
npm install discord.js@13 child_process
npm install pm2 -g
```
## 2 - on Terminal

```shell script
nano config.json
```

## And you also change this line :

```json
  "token": "YOUR_TOKEN",
  "channelId": "ID_CHANNEL",
  "serverId": "ID_SERVER"
```

After doing this, press CTRL + X and you press Y and ENTER then you do the following commands !

## 3 - on Terminal

```shell script
pm2 start main.js -n Stats_server_pi
```

- Demo : 

![alt text](https://github.com/Kurama250/Stats_server_pi/blob/main/img/stats-server-pi.png)

<h1 align="center">Then it's the end you have started the bot have fun !</h1>

Licence : [Creative commons](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en) - CC BY-NC-ND 4.0 by [Kurama250](https://github.com/Kurama250) | [Yoro404](https://github.com/Yoro404)
