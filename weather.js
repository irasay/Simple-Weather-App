/*main*/
var temperature;
var location;
var humidity;
var icon;
var wind;
var direction;

/*not main*/
var high;
var low;
var con;

/*API*/
var APIKEY = "b833afa850a9acf8e46e4f71b031ed47";

function updateByCity(city) {
        var link = "http://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&APPID=" 
        + APIKEY ;

        sendRequest(link);
}

function sendRequest(link) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var data = JSON.parse(xmlhttp.responseText) ;
                        var weather = {} ;
                        weather.icon = data.weather[0].id;
                        weather.humidity = data.main.humidity;
                        weather.wind = Math.round(3.6*(data.wind.speed));
                        weather.direction = changeDir(data.wind.deg);
                        weather.loc = data.name;
                        weather.temperature = celsius(data.main.temp); 
                        update(weather);
                }
        };
        xmlhttp.open("GET", link,  true);
        xmlhttp.send(); 
}

function update(weather) {
        wind.innerHTML = weather.wind;
        direction.innerHTML = weather.direction;
        humidity.innerHTML = weather.humidity;
        loc.innerHTML = weather.loc;
        temperature.innerHTML = weather.temperature;
        icon.src = "WeatherIcons/" + weather.icon + ".png";
}

window.onload = function () {
        icon = document.getElementById('icon');
        temperature = document.getElementById('temperature');
        loc = document.getElementById('location');
        humidity = document.getElementById('humidity');
        wind = document.getElementById('wind');
        direction = document.getElementById('direction');

        updateByCity("Brampton");
}

function celsius(tmp) {
        return Math.round(tmp - 273.15);
}

function farenheit(tmp) {
        return Math.round(tmp*(9/5) - 459.67);
}

function changeDir(deg) {
        var range = 360/8;
        var low = 360 - range/2;
        var high = (low + range)%360;

        var cardinality = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        for (i in cardinality) {
                if (deg >= low && deg < high) 
                        return cardinality[i];

                low = (low + range) %360;
                high = (high + range)%360;
        }
        return "N";
}

/*temp*/
function updateByCityF(city) {
        var link = "http://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&APPID=" 
        + APIKEY ;

        sendRequestF(link);
}

function sendRequestF(link) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var data = JSON.parse(xmlhttp.responseText) ;
                        var weather = {} ;
                        weather.icon = data.weather[0].id;
                        weather.humidity = data.main.humidity;
                        weather.wind = Math.round(3.6*(data.wind.speed));
                        weather.direction = changeDir(data.wind.deg);
                        weather.loc = data.name;
                        weather.temperature = farenheit(data.main.temp); 
                        update(weather);
                }
        };
        xmlhttp.open("GET", link,  true);
        xmlhttp.send(); 
} /*end of temp*/