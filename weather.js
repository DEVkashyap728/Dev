function GetInfo() {
    var newName = document.getElementById("cityInput").value;
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "" + newName + "";

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName + '&appid=6f4bc1ee1e247a8a10b5448e4387f2e6')
    .then(response => response.json())
    .then(data => {
        
		console.log(data);

        
		if (data.list && data.list.length > 0) {
            const currentWeather = data.list[0].main;
            document.getElementById("currentTemp").innerHTML = `Temperature: ${Number(currentWeather.temp - 273.15).toFixed(1)}°C`;
            document.getElementById("currentHumidity").innerHTML = `Humidity: ${currentWeather.humidity}%`;
            document.getElementById("currentWind").innerHTML = `Wind Speed: ${data.list[0].wind.speed} m/s`;
        }

        
		for (let i = 0; i < 5; i++) {
            if (data.list[i] && data.list[i].main) {
                document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°";
                document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
            }
        }

        
		for (let i = 0; i < 5; i++) {
            if (data.list[i] && data.list[i].weather && data.list[i].weather[0]) {
                document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
            }
        }
    })
    .catch(err => alert("Something Went Wrong: Try Checking Your Internet Connection"));
}

function DefaultScreen() {
    document.getElementById("cityInput").value = "Delhi"; // Use value instead of defaultValue
    GetInfo();
}


var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function CheckDay(day) {
    return (day + d.getDay()) % 7;
}

for (let i = 0; i < 5; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}
