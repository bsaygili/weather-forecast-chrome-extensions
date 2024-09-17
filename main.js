const api = {
  baseURL: "https://api.openweathermap.org/data/2.5/",
  key: "cfea0581001b06c132af9527074edc9f",
};

const searchBox = document.querySelector(".search_box");
searchBox.addEventListener("keypress", setQuery);
function setQuery(event) {
  if (event.keyCode == 13) {
    // keyCode 13 means ENTER
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}
function getResults(query) {
  fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((response) => {
      return response.json();
    })
    .then(displayResults);
}
function displayResults(response) {
  console.log(response);
  let city = document.querySelector(".location .city");
  city.innerHTML = `${response.name}, ${response.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(response.main.temp)}<span>°C</span>`;

  let weather_element = document.querySelector(".current .weather");
  weather_element.innerText = response.weather[0].description;

  let hiLow = document.querySelector(".hi-low");
  hiLow.innerText = `${Math.round(response.main.temp_min)}°C / ${Math.round(
    response.main.temp_max
  )}°C `;
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
