import getDay from 'date-fns/getDay';
import getHours from 'date-fns/getHours';

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const appendingDates = () => {
  const daysArray = daysGetter();

  let index = -1;
  document.querySelectorAll('.tile-day').forEach(tile => tile.textContent = daysArray[index += 1]);

  appendingHours()
}

function appendingHours() {
  let index = -1;
  const hoursArray = endOfDaysGetter();

  document.querySelectorAll('.tiles').forEach(tile => {
    for (let i = 0; i < 8; i++) {
      let parentDiv = document.createElement('div');
      parentDiv.setAttribute('id', `hour-container${index += 1}`);
      parentDiv.classList.add('hour-container');

      if (tile.contains(document.querySelector('.hour-container')) && hoursArray[index] < hoursArray[index - 1]) return index--;

      tile.appendChild(parentDiv);
      let tileHour = document.createElement('p');
      tileHour.classList.add('tile-hour');
      tileHour.textContent = hoursArray[index];
      document.getElementById(`hour-container${index}`).appendChild(tileHour);

      let newIcon = document.createElement('i');
      document.getElementById(`hour-container${index}`).appendChild(newIcon);

      let temp = document.createElement('p');
      temp.classList.add('temperature');
      document.getElementById(`hour-container${index}`).appendChild(temp);

      let precipitation = document.createElement('p');
      precipitation.classList.add('precipitation');
      document.getElementById(`hour-container${index}`).appendChild(precipitation);
    }
  })
}

function daysGetter() {
  const today = getDay(new Date());

  const daysArray = [];
  let count = 0;
  for (let i = today; count < 5; i++) {
    daysOfTheWeek[i] ? daysArray.push(daysOfTheWeek[i]) : daysArray.push(daysOfTheWeek[i = 0]);
    count++;
  }
  return daysArray;
}

function endOfDaysGetter() {
  let actualHour = getHours(new Date());

  const hoursArray = [];
  for (let i = 0; i < 40; i++) {
    actualHour <= 24 ? hoursArray.push(actualHour) : hoursArray.push(actualHour = actualHour - 24);
    actualHour += 3;
  }
  return hoursArray;
}
