const apiKey = "D73YE4YGUGSSF6JMUD356SWUD";
const apiUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city){
    try {
        const response = await fetch(`${apiUrl}${city}?key=${apiKey}`);

        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
        
        document.querySelector(".city").innerHTML = data.address;
        document.querySelector(".temp").innerHTML = `${Math.round(data.currentConditions.temp)}°C`;
        document.querySelector(".humidity").innerHTML = `${data.currentConditions.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.currentConditions.windspeed} kph`;

        if(data.currentConditions.icon == "cloudy"){
            weatherIcon.src = "images/clouds.png";
        }else if (data.currentConditions.icon == "clear-day"){
            weatherIcon.src = "images/clear.png";
        }
        else if (data.currentConditions.icon == "rain"){
            weatherIcon.src = "images/rain.png";
        }
        else if (data.currentConditions.icon == "showers-day"){
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.currentConditions.icon == "fog"){
            weatherIcon.src = "images/mist.png";
        }
        document.querySelector(".weather").style.display = "block";

        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);

})

