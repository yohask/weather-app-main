import {appendingDates} from './date-getter';
import {appendingWeather, unitSwitch} from './weather-getter';

appendingDates();

const searchButton = document.querySelector('.search-button');
const searchBar = document.querySelector('.search-bar');
const placeError = document.querySelector('.place-error');
const placeInfo = document.querySelector('.place-information');
const weatherDescription = document.querySelector('.weather-description');
const tilesContainer = document.querySelector('.tiles-container');

const tempSwitch = document.querySelector('.temp-switch');
let tempUnit = '°C';

tempSwitch.addEventListener('change', () => {
  tempUnit === '°C' ? tempUnit = '°F' : tempUnit = '°C';
  unitSwitch(tempUnit);
  document.querySelector('.fahrenheit').classList.toggle('active');
  document.querySelector('.celsius').classList.toggle('active');
})

const fetchingWeather = async (cityName = 'london') => {
  placeInfo.classList.remove('active');
  weatherDescription.classList.remove('active');
  tilesContainer.classList.remove('active');
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=a63f2c379197334015f2d7a78700d620`,
      {mode: 'cors'});
    let cityWeather = await response.json();

    appendingWeather(cityWeather, tempUnit);
    placeError.classList.remove('active');
    placeInfo.classList.add('active');
    weatherDescription.classList.add('active');
    tilesContainer.classList.add('active');
  }
  catch (error) {
    placeInfo.classList.add('active');
    weatherDescription.classList.add('active');
    placeError.classList.add('active');
    tilesContainer.classList.add('active');
  }
}

fetchingWeather();

searchButton.addEventListener('click', () => {
  if (searchBar.value !== '') fetchingWeather(searchBar.value);
  searchBar.value = '';
});

window.addEventListener('keydown', function (e) {
  const keyPress = document.querySelector(`button[data-key="${e.keyCode}"]`);
  if (!keyPress) return;

  keyPress.click();
});
