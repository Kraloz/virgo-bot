const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
  getWeatherByCityId(city_id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=${process.env.OPEN_WEATHER_KEY}&lang=sp&units=metric`)
        .then(response => {
          const data = response.data;
          if (data.cod != 200) reject(new Error('XDD'));
          const msg = this.generateMsg(data);
          resolve(msg);
        })
    });
  },
  getWeatherByCoord(lat, lon) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_KEY}&lang=sp&units=metric`)
        .then(response => {
          const data = response.data;
          if (data.cod != 200) reject(new Error('XDD'));
          const msg = this.generateMsg(data);
          resolve(msg);
        }).
        catch(err => console.error(err));
    });
  },
  generateMsg(data) {
    return new Discord.MessageEmbed()
      .setImage(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
      .addFields(
        { name: `Clima en ${data.name}`, value: `${data.weather[0].description}` },
        // { name: '\u200B', value: '\u200B' },
        { name: 'Temperatura', value: `${data.main.temp}°`},
        { name: 'Dirección del viento', value: `${data.wind.deg}°`, inline: true },
        { name: 'El viento sopla a', value: `${data.wind.speed}m/s`, inline: true }
      );
  }
};

// icon url:
//  http://openweathermap.org/img/wn/01d@2x.png