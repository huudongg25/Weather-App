const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var search = $(".search");
var city = $(".city");
var country = $(".country");
var value = $(".temperature_value");
var shortDesc = $(".desc");
var visibility = $(".visibility span");
var wind = $(".wind span");
var sun = $(".sun span");
var time = $(".time");
var content = $(".content");

async function changeWeather() {
  let searchValue = search.value.trim();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=94929ba0d51beac2afbd1b4df750135c`;

  let data = await fetch(apiUrl).then((res) => res.json());

  if (data.cod == 200) {
    content.classList.remove('hide');
    city.innerText = data.name;
    country.innerText = data.sys.country;
    visibility.innerText = data.visibility + "m";
    wind.innerText = data.wind.speed + "m/s";
    sun.innerText = data.main.humidity + "%";
    value.innerHTML =
      Math.round(data.main.temp - 273.15) + " <sup>o</sup>C</span>";
    shortDesc.innerText = data.weather[0] ? data.weather[0].main : "";
    time.innerText = new Date().toLocaleString("vi");
  } else {
    content.classList.add('hide');
  }
}

search.addEventListener('keypress', function (e) {
  if (e.code === "Enter") {
    changeWeather();
  }
});
