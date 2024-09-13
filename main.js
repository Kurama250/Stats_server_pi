const { Client, IntentsBitField, EmbedBuilder, Message } = require('discord.js');
const { exec } = require('child_process');
/**
 * @param {Message} message
 */
const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages]
});

const config = require('./config.json');
const { token, channelId, serverId } = config;

let message = null;

client.on('ready', () => {
  console.log(`Bot ${client.user.tag} is start !`);
  startUpdatingStats();
});

client.login(token);

function getSystemStats(callback, message) {
  exec('top -bn1 | grep Cpu', (error, cpuOutput) => {
    if (error) {
      console.error(`Error executing top : ${error.message}`);
      return callback(error);
    }

    exec('free -m | grep Mem', (error, memOutput) => {
      if (error) {
        console.error(`Error executing free: ${error.message}`);
        return callback(error);
      }

      exec('df -h --output=pcent / | tail -1', (error, diskOutput) => {
        if (error) {
          console.error(`Error executing df : ${error.message}`);
          return callback(error);
        }

        exec('vcgencmd measure_temp', (error, tempOutput) => {
          if (error) {
            console.error(`Error executing vcgencmd : ${error.message}`);
            return callback(error);
          }

          const CpuUsage = parseCpuUsage(cpuOutput);
          const RamUsage = parseMemoryUsage(memOutput);
          const StorageUsage = parseStorageUsage(diskOutput);
          const ProcessorTemp = parseProcessorTemperature(tempOutput);

          const stats = {
            CpuUsage,
            RamUsage,
            StorageUsage,
            ProcessorTemp
          };

          callback(null, stats);
        });
      });
    });
  });
}

function parseProcessorTemperature(tempOutput) {
  if (!tempOutput) {
    return 'N/A';
  }

  const match = tempOutput.match(/temp=(\d+\.\d+)'/);

  if (match && match[1]) {
    const processorTemp = match[1];
    return `${processorTemp}°C`;
  }

  return 'N/A';
}

function parseCpuUsage(cpuOutput) {
  if (!cpuOutput) {
    return 'N/A';
  }

  const cpuParts = cpuOutput.split(/\s+/);
  const CpuUsage = cpuParts[1];

  return CpuUsage;
}

function parseMemoryUsage(memOutput) {
  if (!memOutput) {
    return 'N/A';
  }

  const memParts = memOutput.split(/\s+/);
  const totalMem = parseFloat(memParts[1]);
  const usedMem = parseFloat(memParts[2]);
  const RamUsage = ((usedMem / totalMem) * 100).toFixed(2);

  return RamUsage;
}

function parseStorageUsage(diskOutput) {
  if (!diskOutput) {
    return 'N/A';
  }

  const StorageUsage = diskOutput.trim();

  return StorageUsage;
}

let sentMessage = null;

async function updateStats(message) {
  const embed = new EmbedBuilder()
    .setTitle('Stats Server | Rasbian')
    .setColor(0x9700ff)
    .setThumbnail('https://raw.githubusercontent.com/Kurama250/Stats_server_pi/main/img/pi.png')
    .setTimestamp();

  const stats = await new Promise((resolve, reject) => {
    getSystemStats((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

  embed.setDescription(`**------------------------ ${stats.ProcessorTemp} -----------------------**`);

  embed.addFields(
    { name: 'CPU usage 🔋', value: `${stats.CpuUsage}%`, inline: true },
    { name: 'Memory usage 📟', value: `${stats.RamUsage}%`, inline: true },
    { name: 'Disk usage 📂', value: `${stats.StorageUsage}`, inline: true }
  );

  try {
    const channel = await client.channels.fetch(channelId);

    if (!channel || !channel.isTextBased()) {
      console.log(`Error: channel with ID ${channelId} is not a text-based channel or does not exist`);
      return;
    }

    if (sentMessage) {
      await sentMessage.edit({ embeds: [embed] }).catch((error) => {
        console.log('Error editing message:', error);
      });
    } else {
      sentMessage = await channel.send({ embeds: [embed] }).catch((error) => {
        console.log('Error sending message:', error);
      });
    }
  } catch (error) {
    console.log(`Error fetching channel or sending message: ${error.message}`);
  }
}

function startUpdatingStats() {
  setInterval(updateStats, 10000);
}

