const placeName = document.querySelector('.place-name');
const countryFlag = document.querySelector('.country-flag');
const weatherDescription = document.querySelector('.weather-description');

const kelvinToCelsius = kelvin => Math.round(kelvin - 273.15);
const kelvinToFarenheit = kelvin => Math.round(kelvin * 9 / 5 - 459.67);
const celsiusToFarhenheit = celsius => Math.round((celsius * 9 / 5) + 32);
const fahrenheitToCelsius = fahrenheit => Math.round((fahrenheit - 32) * 5 / 9);

const iconMapping = {
    Clouds: 'wi-cloudy',
    Clear: 'wi-day-sunny',
    Rain: 'wi-rain',
    Snow: 'wi-snow',
    Fog: 'wi-fog',
    Storm: 'wi-thunderstorm'
}

export const appendingWeather = (cityWeather, tempUnit) => {
    console.log(cityWeather);

    placeName.textContent = cityWeather.city.name;
    countryFlag.src = `https://www.countryflags.io/${cityWeather.city.country}/shiny/64.png`;
    weatherDescription.textContent = `${cityWeather.list[0].weather[0].description}`;
    tempUnit === '°C' ?
        appendingData(cityWeather, kelvinToCelsius, tempUnit) :
        appendingData(cityWeather, kelvinToFarenheit, tempUnit);
    appendingIcons(cityWeather);
    appendingPrecipitation(cityWeather);
}

function appendingIcons(cityWeather) {
    let hourContainers = document.querySelectorAll('.hour-container');
    let index = 0;
    hourContainers.forEach(container => {
        let newIcon = container.querySelector('i');
        newIcon.classList = '';
        newIcon.classList.add('wi');

        cityWeather.list[index].weather[0].main == 'Clear' &&
            container.firstChild.textContent > 19 || container.firstChild.textContent < 7 ?
            newIcon.classList.add('wi-night-clear') :
            newIcon.classList.add(`${iconMapping[cityWeather.list[index].weather[0].main]}`);

        container.appendChild(newIcon);
        index++;
    });
}

function appendingData(cityWeather, formula, tempUnit) {
    let hourContainers = document.querySelectorAll('.hour-container');
    let index = 0;
    hourContainers.forEach(container => {
        let temp = container.querySelector('.temperature');
        temp.textContent = `${formula(cityWeather.list[index].main.temp)}${tempUnit}`;
        index++;
    });
}

function appendingPrecipitation(cityWeather) {
    let hourContainers = document.querySelectorAll('.hour-container');
    let index = 0;
    hourContainers.forEach(container => {
        let precipitation = container.querySelector('.precipitation');
        precipitation.textContent = `${Math.round(cityWeather.list[index].pop * 100)}%`;
        index++;
    })
}

export const unitSwitch = tempUnit => {
    let temperatures = document.querySelectorAll('.temperature');
    let numsArray = [];
    temperatures.forEach(temp => numsArray.push(temp.textContent.slice(0, -2)));

    for (let i = 0; i < numsArray.length; i++)
        tempUnit === '°C' ?
            temperatures[i].textContent = `${fahrenheitToCelsius(+numsArray[i])}${tempUnit}` :
            temperatures[i].textContent = `${celsiusToFarhenheit(numsArray[i])}${tempUnit}`;
}
