const tmi = require('tmi.js');
const TeemoJS = require('teemojs');
const { getSummonerLeagues } = require('./functions.js');

let api = TeemoJS('RGAPI-ed002082-d8eb-47a9-8621-e4f4c2f30e19', {
  "maxConcurrent": 20
});

let log = console.log;
console.log = function() {
    log("");
    log.apply(console, arguments);
    let info = new Error().stack.split('    at ')[2].trim().split(__dirname);
    log('-- from', '\x1b[33m', info[0].split(' (')[0], '\x1b[0m', 'at', '\x1b[33m', info[1], '\x1b[0m');
};

const client = new tmi.Client({
  options: {
    debug: true
  },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: 'kodbilenbot',
    password: '#'
  },
  channels: ['kodbilen']
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  if(self) return;
  message = message.split(' ');
  if (message[0].toLowerCase() === '!lig') {
    getSummonerLeagues(message).then(league => {
			console.log(`${tags['display-name']}: ${message[0]} ${league}`);
			client.say(channel, `${summoner} adlı kullancının ligi ${league}`);
    })
  } else if (message[0].toLowerCase() === '!tftlig') {
    getSummonerLeagues(message, 'tft').then(league => {
			console.log(`${tags['display-name']}: ${message[0]} ${league}`);
			client.say(channel, `${summoner} adlı kullancının TOFİTO ligi ${league}`);
    })
  }
});