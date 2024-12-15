import React, { useEffect ,useRef,useState} from "react";
import search_icon from "../assets/search.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";
import snow from "../assets/snow.png";


const Weather = () => {
   const inputRef = useRef();
  const [weatherdata, setweatherdata] = useState(false);

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d":snow,
    "13n":snow,
  }

  const search = async(city) =>{
    if(city === ''){
      alert('First enter any location..')
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
    const response = await fetch(url);
    const data = await response.json();
    const icon = allIcons[data.weather[0].icon] || clear;

    setweatherdata({
      city: data.name,
      temperature: Math.floor(data.main.temp),
      humidity: data.main.humidity,
      wind: data.wind.speed,
      location:data.name,
      icon:icon,
    })
  }
  // useEffect(()=>{
  //   search("Lucknow");
  // },[])

  return (
    <div className="weather flex flex-col items-center">
      <div className="search-bar flex items-center gap-3">
        <input ref={inputRef}
          className="h-10 w-72 rounded-full p-5 text-xl text-black outline-none"
          type="text"
          placeholder="Search"
        />
        <img onClick={()=>{
          search(inputRef.current.value);
        }}
          className="w-10 p-3 rounded-[50%] cursor-pointer bg-slate-100"
          src={search_icon}
          alt=""
        />
      </div>

        {weatherdata?<>
          <img src={weatherdata.icon} className="w-32 my-6 mx-0" />
      <p className="temp">{weatherdata.temperature}°C</p>
      <p className="location">{weatherdata.city}</p>
      <div className="data w-full mt-10 text-white flex justify-between">
        <div className="col flex items-start gap-3 text-lg text-center">
          <img className="img w-10 mt-3" src={humidity} alt="" />
          <div>
            <p>{weatherdata.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col flex items-start gap-3 text-lg text-center">
          <img className="img w-10 mt-3" src={wind} alt="" />
          <div>
            <p>{weatherdata.wind}km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div></>:<></>}
      
    </div>
  );
};

export default Weather;
