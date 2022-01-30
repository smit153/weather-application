const address = document.getElementById("input");
document.getElementById("submit").addEventListener("click", (event) => {
  event.preventDefault();
  console.log("hello");
  axios
    .get(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        address.value +
        ".json?access_token=pk.eyJ1Ijoic21pdDMzMyIsImEiOiJja3h3djB5OGUxenh1MnBtcHFneXhxYzhvIn0.yt5havZ_nM7GXGHtVYv55w"
    )
    .then((response) => {
      console.log(response.data);
      var link = document.getElementById("windy");
      link.setAttribute(
        "src",
        "https://embed.windy.com/embed2.html?lat=" +
          response.data.features[0].center[1] +
          "&lon=" +
          response.data.features[0].center[0] +
          "&detailLat=" +
          response.data.features[0].center[1] +
          "&detailLon=" +
          response.data.features[0].center[0] +
          "&width=1332&height=650&zoom=8&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
      );
    })
    .catch((error) => console.error(error));
});
