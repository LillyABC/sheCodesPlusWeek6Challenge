let now = new Date();
function formatTimeDay(date) {
  let paragraph = document.querySelector("p#current-date");
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  paragraph.innerHTML = `Current time: ${day}, ${hour}:${minute}.`;
}
formatTimeDay();

//
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-button");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
let city = document.querySelector(".input");
city.addEventListener("submit", search);

/*
function changeCelsius(event) {
  event.preventDefault();
  let changeDegree = document.querySelector(".temp");
  changeDegree.innerHTML = "21";
}
function changeFahrenheit(event) {
  event.preventDefault();
  let changeDegree = document.querySelector(".temp");
  changeDegree.innerHTML = "70";
}
let celsiusDegree = document.querySelector("#celsius-degree");
celsiusDegree.addEventListener("click", changeCelsius);

let fahrenheitDegree = document.querySelector("#fahrenheit-degree");
fahrenheitDegree.addEventListener("click", changeFahrenheit);
*/

//
let apiCity = "Seoul";
let apiKey = "e18f3eef8f69e4c6f8550807956494a5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=${apiKey}&units=metric`;

function searchDisplay(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#rain").innerHTML = response.data.clouds.all;
}
axios.get(apiUrl).then(searchDisplay);

//
function showCity(event) {
  event.preventDefault();
  let apiCity = document.querySelector("#city-enter").value;
  let apiKey = "e18f3eef8f69e4c6f8550807956494a5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(searchDisplay);
}
let newCity = document.querySelector("#searching");
newCity.addEventListener("submit", showCity);

// geolocation:
function searchLocation(position) {
  let apiKey = "e18f3eef8f69e4c6f8550807956494a5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(searchDisplay);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchForm = document.querySelector("#searching");
searchForm.addEventListener("submit", showCity);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getLocation);
