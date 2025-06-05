import React, { useState } from 'react';
import axios from 'axios';

export function WeatherApp() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const API_KEY = "dd17780e585528000132be390b963317"; 

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`;

      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
          alert("Could not find weather for that location. Please try again.");
          setData({}); 
        });
      setLocation(''); 
    }
  };

  return (
    <div className="app p-10 mt-7 ">
      <div className="search">
        <input
          className=' p-3
            text-lg
            rounded-4xl
            border-2
            hover:border-cyan-600
            focus:ring-3
            focus:ring-cyan-600
            text-black
            placeholder-gray-500
            shadow-lg
            w-80
            md:w-80'
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text"
        />
      </div>
      <div className="container  p-5">
        <div className="top text-3xl">
          <div className="location text-3xl ">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels text-3xl">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity text-3xl">
              {data.main ? <p className='bold '>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind text-3xl">
              {data.wind ? <p className='bold '>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default WeatherApp;