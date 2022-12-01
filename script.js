const form = document.getElementById('form');
const body = document.getElementById('weatherBox')
const button = document.getElementById('unitButton');

let city
let unit = 'imperial';

let cityName = document.createElement('p');
let weatherTemp = document.createElement('p');
let weatherSky = document.createElement('p');
let weatherIcon = document.createElement('img');

button.addEventListener('click', () => {
  if (unit === 'imperial') {
    button.innerText = 'Switch to Fahrenheit';
    unit = 'metric';
    getWeatherData(city, unit);
  } else if (unit === 'metric') {
    button.innerText = 'Switch to Celsius';
    unit = 'imperial';
    getWeatherData(city, unit);
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let fd = new FormData(form);
  let obj = Object.fromEntries(fd);
  city = obj.city.split(' ').join('+');
  getWeatherData(city, unit);
})

const getWeatherData = async (city='london', unit='imperial') => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=140c670d01837c54d85eb92c71351828&units=${unit}`, {mode: 'cors'})
    const weatherData = await response.json();
    cityName.innerText = "City: " + weatherData.name;
    weatherTemp.innerText = "Temperature: " + weatherData.main.temp;
    weatherSky.innerText = "Sky: " + weatherData.weather[0].description;
    let iconCode = weatherData.weather[0].icon
    weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
    body.append(cityName);
    body.append(weatherTemp);
    body.append(weatherSky);
    body.append(weatherIcon);
  } catch (error) {
    console.error('Error:', error);
    cityName.innerText = 'Please enter a valid city';
    weatherTemp.innerText = '';
    weatherSky.innerText = '';
    weatherIcon.src = '';
  }
}

getWeatherData();
