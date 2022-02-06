const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
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
let a = Math.floor(Math.random() * 3) + 1;
const d = new Date();
const day = new Date();
let today = new Date();
const address = document.getElementById("input");
const loc = document.getElementById("loc");
const date = document.getElementById("date");
const statement = document.getElementById("statement");
const temp = document.getElementById("temp");
const fl = document.getElementById("fl");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const clouds = document.getElementById("clouds");
const pop = document.getElementById("pop");
const uvi = document.getElementById("uvi");
const icon = document.getElementById("Mainicon");
const bg = document.getElementById("bg");
let i = 0,
  j = 0,
  k = 0,
  n = 0,
  b = 0;

let wind_dir;
function graph(response) {
  document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    if (b != 0) myChart.destroy();
  });
  const labels = [
    today.getHours() + ".00",
    today.getHours() + 1 + ".00",
    today.getHours() + 2 + ".00",
    today.getHours() + 3 + ".00",
    today.getHours() + 4 + ".00",
    today.getHours() + 5 + ".00",
    today.getHours() + 6 + ".00",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        type: "line",
        label: "Temperature",
        backgroundColor: "rgb(2, 5, 79)",
        borderColor: "rgb(0, 0, 255)",
        color: "#f7f7f7",
        data: [
          response.data.hourly[i++].temp,
          response.data.hourly[i++].temp,
          response.data.hourly[i++].temp,
          response.data.hourly[i++].temp,
          response.data.hourly[i++].temp,
          response.data.hourly[i++].temp,
          response.data.hourly[i++].temp,
          response.data.hourly[i++].temp,
        ],
      },
      {
        type: "line",
        label: "pressure",
        color: "#f7f7f7",
        borderColor: "rgb(255, 23, 78)",
        backgroundColor: "rgb(209, 2, 2)",
        data: [
          response.data.hourly[j++].pressure / 100,
          response.data.hourly[j++].pressure / 100,
          response.data.hourly[j++].pressure / 100,
          response.data.hourly[j++].pressure / 100,
          response.data.hourly[j++].pressure / 100,
          response.data.hourly[j++].pressure / 100,
          response.data.hourly[j++].pressure / 100,
          response.data.hourly[j++].pressure / 100,
        ],
      },
      {
        type: "bar",
        label: "Probability of precipitation",
        color: "#f7f7f7",
        data: [
          response.data.hourly[k++].pop,
          response.data.hourly[k++].pop,
          response.data.hourly[k++].pop,
          response.data.hourly[k++].pop,
          response.data.hourly[k++].pop,
          response.data.hourly[k++].pop,
          response.data.hourly[k++].pop,
          response.data.hourly[k++].pop,
        ],
        fill: false,
        borderColor: "rgb(2, 80, 122)",
        backgroundColor: "rgb(3, 177, 252)",
      },
    ],
  };

  const config = {
    type: "scatter",
    data: data,
    color: "#f7f7f7",
    options: {
      plugins: {
        title: {
          display: true,
          text: "Hourly forecast",
        },
        legend: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  fontColor: "white",
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "white",
                },
              },
            ],
          },
          labels: {
            fontColor: "white",
            font: {
              size: 14,
            },
          },
        },
      },
    },
  };
  const myChart = new Chart(document.getElementById("myChart"), config);
  b++;
}

function forecastData(response) {
  document.getElementById("day1").addEventListener("click", (event) => {
    days(0);
  });
  document.getElementById("day2").addEventListener("click", (event) => {
    days(1);
  });
  document.getElementById("day3").addEventListener("click", (event) => {
    days(2);
  });
  document.getElementById("day4").addEventListener("click", (event) => {
    days(3);
  });
  document.getElementById("day5").addEventListener("click", (event) => {
    days(4);
  });
  function days(k) {
    var table =
      "<th scope='col class='table-dark'></th><th scope='col class='table-dark'>Temperature</th>      <th scope='col class='table-dark'>Feels like</th>";
    document.getElementById("p" + k).innerHTML =
      "<b>Pressure:</b> " + response.data.daily[k].pressure + "hPa";
    document.getElementById("h" + k).innerHTML =
      "<b>Humidity:</b> " + response.data.daily[k].humidity + "%";
    document.getElementById("w" + k).innerHTML =
      "<b>Wind speed:</b> " + response.data.daily[k].wind_speed;
    document.getElementById("c" + k).innerHTML =
      "<b>Cloudiness:</b> " + response.data.daily[k].clouds + "%";
    document.getElementById("r" + k).innerHTML =
      "<b>Probability of precipitation:</b> " +
      response.data.daily[k].pop +
      "%";
    document.getElementById("u" + k).innerHTML =
      "<b>UV index:</b> " + response.data.daily[k].uvi;
    document.getElementById("tah" + k).innerHTML =
      "<th scope='col' class='show'></th><th scope='col' class='show'>Temperature</th>      <th scope='col' class='show'>Feels like</th>";
    document.getElementById("st" + k).innerHTML =
      "<tr>  <th scope='row'>Morning</th>  <td>" +
      response.data.daily[k].temp.morn +
      "</td>  <td>" +
      response.data.daily[k].feels_like.morn +
      "</td></tr><tr>  <th scope='row'>Afternoon</th>  <td>" +
      response.data.daily[k].temp.day +
      "</td>  <td>" +
      response.data.daily[k].feels_like.day +
      "</td></tr><tr>  <th scope='row'>Evening</th>  <td>" +
      response.data.daily[k].temp.eve +
      "</td>  <td>" +
      response.data.daily[k].feels_like.eve +
      "</td><tr>  <th scope='row'>Night</th>  <td >" +
      response.data.daily[k].temp.night +
      "</td>  <td>" +
      response.data.daily[k].feels_like.night +
      "</td></tr>";
  }
}
function getweather(response) {
  if (
    response.data.current.wind_deg < 90 &&
    response.data.current.wind_deg >= 0
  )
    wind_dir = "S/W";
  if (
    response.data.current.wind_deg < 180 &&
    response.data.current.wind_deg >= 90
  )
    wind_dir = "S/E";
  if (
    response.data.current.wind_deg < 270 &&
    response.data.current.wind_deg >= 180
  )
    wind_dir = "N/E";
  if (
    response.data.current.wind_deg < 360 &&
    response.data.current.wind_deg >= 270
  )
    wind_dir = "N/W";
  loc.innerHTML = address.value;
  date.innerHTML =
    weekday[d.getDay()] + " | " + d.getDate() + " " + months[d.getMonth()];
  statement.innerHTML =
    "Feels like " +
    response.data.current.feels_like +
    "°C | " +
    response.data.current.weather[0].description;
  temp.innerHTML = "<b>Temperature:</b> " + response.data.current.temp;
  fl.innerHTML =
    "<b>Feels like:</b> " + response.data.current.feels_like + "°C";
  pressure.innerHTML =
    "<b>Pressure:</b> " + response.data.current.pressure + "hPa";
  humidity.innerHTML =
    "<b>Humidity:</b> " + response.data.current.humidity + "%";
  wind.innerHTML =
    "<b>Wind speed:</b> " + response.data.current.wind_speed + wind_dir;
  clouds.innerHTML = "<b>Cloudiness:</b> " + response.data.current.clouds + "%";
  pop.innerHTML =
    "<b>visibility:</b> " + response.data.current.visibility / 1000 + "Km";
  uvi.innerHTML = "<b>UV index:</b> " + response.data.current.uvi;
}
function mainIcon(response) {
  let hd01;
  k = 0;
  if (Math.round(response.data.daily[k].weather[0].id % 100) == 2) {
    hd01 = "<img src='/img/animated/rainy-" + a + ".svg'  id='icon'/>";
    icon.innerHTML = hd01;
    bg.style.backgroundImage = "url(/img/img/r" + a + ".jpg)";
  }
  if (Math.round(response.data.daily[k].weather[0].id % 100) == 3) {
    hd01 =
      "<img src='/img/animated/rainy-" +
      (Math.floor(Math.random() * 4) + 4) +
      ".svg'  id='icon'/>";
    icon.innerHTML = hd01;
    bg.style.backgroundImage = "url(/img/img/r" + a + ".jpg)";
  }

  if (Math.round(response.data.daily[k].weather[0].id % 100) == 6) {
    icon.innerHTML =
      "<img src='/img/animated/snowy-" + a + ".svg'  id='icon'/>";
    bg.style.backgroundImage = "url(/img/img/sf" + a + ".jpg)";
  }
  if (Math.round(response.data.daily[k].weather[0].id % 100) == 2) {
    hd01 = "<img src='/img/animated/thunder.svg'  id='icon'/>";
    icon.innerHTML = hd01;
    bg.style.backgroundImage = "url(/img/img/l" + a + ".jpg)";
  }
  if (Math.round(response.data.daily[k].weather[0].id % 100) == 7) {
    hd01 = "<img src='/img/animated/cloudy.svg'  id='icon'/>";
    icon.innerHTML = hd01;
    bg.style.backgroundImage = "url(/img/img/cd" + a + ".jpg)";
  }
  if (response.data.daily[k].weather[0].id == 800) {
    if (today.getHours() < 19 && today.getHours() >= 7) {
      hd01 = "<img src='/img/animated/day.svg'  id='icon'/>";
      icon.innerHTML = hd01;
    } else {
      hd01 = "<img src='/img/animated/night.svg'  id='icon'/>";
      icon.innerHTML = hd01;
    }
    if (today.getHours() < 18 && today.getHours() >= 9) {
      bg.style.backgroundImage = "url(/img/img/d" + a + ".jpg)";
    }
    if (today.getHours() >= 18 || today.getHours() < 21) {
      bg.style.backgroundImage = "url(/img/img/ss" + a + ".jpg)";
    }
    if (today.getHours() >= 21 || today.getHours() < 6) {
      bg.style.backgroundImage = "url(/img/img/n" + a + ".jpg)";
    }
    if (today.getHours() >= 6 && today.getHours() < 9) {
      bg.style.backgroundImage = "url(/img/img/sr" + a + ".jpg)";
    }
  }
  if (
    response.data.daily[k].weather[0].id >= 800 &&
    response.data.daily[k].weather[0].id < 810
  ) {
    if (today.getHours() < 19 && today.getHours() >= 7) {
      hd01 = "<img src='/img/animated/cloudy-day-" + a + ".svg'  id='icon'/>";
      icon.innerHTML = hd01;
    } else {
      hd01 = "<img src='/img/animated/cloudy-night-" + a + ".svg'  id='icon'/>";
      icon.innerHTML = hd01;
    }
    if (today.getHours() < 18 && today.getHours() >= 9) {
      bg.style.backgroundImage = "url(/img/img/cd" + a + ".jpg)";
      console.log("hello");
    }
    if (today.getHours() >= 18 || today.getHours() < 21) {
      bg.style.backgroundImage = "url(/img/img/cs" + a + ".jpg)";
    }
    if (today.getHours() >= 21 || today.getHours() < 6) {
      bg.style.backgroundImage = "url(/img/img/cn" + a + ".jpg)";
    }
    if (today.getHours() >= 6 && today.getHours() < 9) {
      bg.style.backgroundImage = "url(/img/img/cs" + a + ".jpg)";
    }
  }
}
function forecast(response) {
  n = 1;
  document.getElementById("heading1").innerHTML = weekday[(d.getDay() + 1) % 7];
  document.getElementById("s1").innerHTML =
    miniIcons(n) +
    response.data.daily[n].temp.max +
    "°C/" +
    response.data.daily[n].temp.min +
    "°C  " +
    response.data.daily[n++].weather[0].description;

  document.getElementById("heading2").innerHTML = weekday[(d.getDay() + 2) % 7];
  document.getElementById("s2").innerHTML =
    miniIcons(n) +
    response.data.daily[n].temp.max +
    "°C/" +
    response.data.daily[n].temp.min +
    "°C  " +
    response.data.daily[n++].weather[0].description;

  document.getElementById("heading3").innerHTML = weekday[(d.getDay() + 3) % 7];
  document.getElementById("s3").innerHTML =
    miniIcons(n) +
    response.data.daily[n].temp.max +
    "°C/" +
    response.data.daily[n].temp.min +
    "°C  " +
    response.data.daily[n++].weather[0].description;

  document.getElementById("heading4").innerHTML = weekday[(d.getDay() + 4) % 7];
  document.getElementById("s4").innerHTML =
    miniIcons(n) +
    response.data.daily[n].temp.max +
    "°C/" +
    response.data.daily[n].temp.min +
    "°C  " +
    response.data.daily[n++].weather[0].description;

  document.getElementById("heading5").innerHTML = weekday[(d.getDay() + 5) % 7];
  document.getElementById("s5").innerHTML =
    miniIcons(n) +
    response.data.daily[n].temp.max +
    "°C/" +
    response.data.daily[n].temp.min +
    "°C  " +
    response.data.daily[n++].weather[0].description;
  function miniIcons(n) {
    if (Math.round(response.data.daily[n].weather[0].id % 100) == 2) {
      return "<img src='/img/animated/rainy-" + a + ".svg'  id='icon1'/>";
    }
    if (Math.round(response.data.daily[n].weather[0].id % 100) == 3) {
      return (
        "<img src='/img/animated/rainy-" +
        (Math.floor(Math.random() * 4) + 4) +
        ".svg'  id='icon1'/>"
      );
    }

    if (Math.round(response.data.daily[n].weather[0].id % 100) == 6)
      return "<img src='/img/animated/snowy-" + a + ".svg'  id='icon1'/>";

    if (Math.round(response.data.daily[n].weather[0].id % 100) == 2)
      return "<img src='/img/animated/thunder.svg'  id='icon1'/>";

    if (Math.round(response.data.daily[n].weather[0].id % 100) == 7)
      return "<img src='/img/animated/cloudy-day-" + a + ".svg'  id='icon1'/>";

    if (response.data.daily[n].weather[0].id == 800) {
      return "<img src='/img/animated/day.svg'  id='icon1'/>";
    }
    if (
      response.data.daily[n].weather[0].id >= 800 &&
      response.data.daily[n].weather[0].id < 810
    )
      return "<img src='/img/animated/cloudy-day-" + a + ".svg'  id='icon1'/>";
  }
}
document.getElementById("submit").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("container").classList.remove("opa");
  axios
    .get(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        address.value +
        ".json?access_token=pk.eyJ1Ijoic21pdDMzMyIsImEiOiJja3h3djB5OGUxenh1MnBtcHFneXhxYzhvIn0.yt5havZ_nM7GXGHtVYv55w"
    )
    .then((response) => {
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            response.data.features[0].center[1] +
            "&lon=" +
            response.data.features[0].center[0] +
            "&appid=16f786d3bfc5612301db19fcf406c72f&units=metric"
        )
        .then((response) => {
          forecastData(response);
          getweather(response);
          mainIcon(response);
          forecast(response);
          graph(response);
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
});
if (today.getHours() < 18 && today.getHours() >= 9) {
  bg.style.backgroundImage = "url(/img/img/d" + a + ".jpg)";
}
if (today.getHours() >= 18 || today.getHours() < 21) {
  bg.style.backgroundImage = "url(/img/img/ss" + a + ".jpg)";
}
if (today.getHours() >= 21 || today.getHours() < 6) {
  bg.style.backgroundImage = "url(/img/img/n" + a + ".jpg)";
}
if (today.getHours() >= 6 && today.getHours() < 9) {
  bg.style.backgroundImage = "url(/img/img/sr" + a + ".jpg)";
}
document.getElementById("home").classList.add("text-primary");
TeleportAutocomplete.init(".my-input").on("change", function (value) {
  //appendToResult('<pre>' + JSON.stringify(value, null, 2) + '</pre>');
});
