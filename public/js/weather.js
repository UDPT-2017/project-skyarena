$.getJSON("https://geoip-db.com/json/geoip.php?jsonp=?", function(response) {
    var WeatherUrl = "https://api.darksky.net/forecast/2d86580d0233e17a66ab9970d79144b0/"+response.latitude+ "," + response.longitude;
    console.log(WeatherUrl);
    $.ajax({
        type: "GET",
        url: WeatherUrl,
        dataType: 'jsonp',
        success: function(json) {
            var temperature = (json.currently.temperature - 32)/1.8;
            temperature = Number(temperature).toFixed(2);
            temperature = temperature.toString() + "°";
            $("#temperature").text(temperature);
            var skycons = new Skycons({"color": "white"});
            skycons.add("icon", json.currently.icon);
            skycons.play();

        }
    });
});