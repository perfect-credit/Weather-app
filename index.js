const apiKey="8fc9c39a827bb32aad3212ba2d51394f";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");
const d = new Date();
let timestring='';

if(d.getHours()<=12){
    timestring = d.getHours() +':'+d.getMinutes()+'AM';
} else {
    timestring = d.getHours() +':'+d.getMinutes()+'PM';
}

document.querySelector(".timeValue").innerHTML=timestring;

async function checkWeather(city){
    const response =await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status==404){
        // document.querySelector(".error").style.display="block";
        document.querySelector(".weather-icon").style.display="none";
    }
    else{
        var data=await response.json();
        console.log('fetch', data);   

        document.querySelector(".weather-icon").innerHTML=Math.round(data.main.temp) + "°c";
        document.querySelector("h1").innerHTML=Math.round(data.main.temp) + "°c";
        
        document.querySelector(".humidityValue").innerHTML=data.main.humidity + "%";
        document.querySelector(".pressureValue").innerHTML=data.main.pressure + "kPa";

        if(data.weather[0].main=="Clouds"){
            weatherIcon.src="images/sunny-cloud.png"
        }
        
        else if(data.weather[0].main=="Clear"){
            weatherIcon.src="images/clear.png"
        }
        
        else if(data.weather[0].main=="Rain"){
            weatherIcon.src="images/rain.png"
        }
        
        else if(data.weather[0].main=="Drizzle"){
            weatherIcon.src="images/drizzle.png"
        }

        document.querySelector(".weather-icon").style.display="block";
    }
}

searchBtn.addEventListener("click",()=>{
    const dateString = new Date();
    let dateTimestring='';
    
    if(dateString.getHours()<=12){
        dateTimestring = dateString.getHours() +':'+dateString.getMinutes()+'AM';
    } else {
        dateTimestring = dateString.getHours() +':'+dateString.getMinutes()+'PM';
    }
    document.querySelector(".timeValue").innerHTML=dateTimestring;
    checkWeather(searchBox.value)
})