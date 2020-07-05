const Discord = require('discord.js');
const client = new Discord.Client();
const openWeather = require('./plugins/open-weather/index.js');

// open weather temporary ban response:
// {
//   "cod": 429,
//   "message": "Your account is temporary blocked due to exceeding of requests limitation of your subscription type.
// }


// client.on('ready', () => {
//   console.log('I am ready!');
// });

// Create an event listener for messages
client.on('message', message => {

  if (message.content.substring(0, 1) === '~') {
    var args = message.content.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);

    console.log('cmd :', cmd);
    console.log('args :', args);

    if (cmd === "clima") {
      if (args[0] === "caba") {
        const city_id = 3433955;
        openWeather.getWeatherByCityId(city_id)
          .then(response => {
            message.channel
              .send(response)
              .catch(err => console.log(err));
            })
          .catch(err => console.log(err));
      }
      if (args[0] === "chile" ) {
        const city_id = 3895088;
        openWeather.getWeatherByCityId(city_id)
            .then(response => {
              message.channel
                .send(response)
                .catch(err => console.log(err));
              })
            .catch(err => console.log(err));
      }
    }
      if (args[0] === "coord" ) {
        const lat = args[1];
        const lon = args[2];
        openWeather.getWeatherByCoord(lat, lon)
            .then(response => {
              message.channel
                .send(response)
                .catch(err => console.log(err));
              })
            .catch(err => console.log(err));
      }
  }
});

client.login(process.env.DISCORD_KEY)
  .catch(err => {
    console.log(err);
  });