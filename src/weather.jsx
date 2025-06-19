import React, { useState } from 'react';
import axios from 'axios';

export function WeatherApp() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const API_KEY = "dd17780e585528000132be390b963317"; // Still recommend moving this to an environment variable!

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
    <div className="relative min-h-screen flex items-center justify-center p-4 
                    bg-gradient-to-br from-sky-300 to-blue-500

">
      <div className="relative z-10 w-full max-w-lg bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg 
                      rounded-xl shadow-2xl p-6 md:p-8 border border-white border-opacity-60 text-gray-800"> 
        
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold font-mono text-center mb-8 text-gray-900 drop-shadow-sm">
          <span className="block">Weather Today</span>
        </h1>

        {/* Search Bar */}
        <div className="search mb-8 text-center">
          <input
            className='p-3 w-full max-w-sm text-lg rounded-full border-2 border-gray-300
                       bg-white bg-opacity-90 placeholder-gray-500 text-gray-800 shadow-md hover:shadow-blue-400
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                       transition duration-300 ease-in-out'
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text"
          />
        </div>

        {data.name && (
          <div className="container text-center">
            <div className="top mb-8">
              <div className="location text-4xl md:text-5xl font-semibold mb-2 text-gray-900">
                <p>{data.name}</p>
              </div>
              <div className="temp text-6xl md:text-7xl font-bold mb-2 text-gray-900">
                {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
              </div>
              <div className="description text-3xl md:text-4xl font-medium capitalize text-gray-700">
                {data.weather ? <p>{data.weather[0].description}</p> : null}
              </div>
            </div>

            {/* Bottom Section: Feels Like, Humidity, Wind Speed */}
            <div className="bottom grid grid-cols-1 md:grid-cols-3 gap-4 p-4 
                            bg-white bg-opacity-70 rounded-lg shadow-inner border border-gray-200"> {/* Increased opacity here too */}
              
              <div className="feels flex flex-col items-center justify-center p-3">
                {data.main ? <p className='text-3xl font-bold text-gray-900'>{data.main.feels_like.toFixed()}°F</p> : null}
                <p className="text-sm text-gray-600">Feels Like</p>
              </div>
              <div className="humidity flex flex-col items-center justify-center p-3">
                {data.main ? <p className='text-3xl font-bold text-gray-900'>{data.main.humidity}%</p> : null}
                <p className="text-sm text-gray-600">Humidity</p>
              </div>
              <div className="wind flex flex-col items-center justify-center p-3">
                {data.wind ? <p className='text-3xl font-bold text-gray-900'>{data.wind.speed.toFixed()} MPH</p> : null}
                <p className="text-sm text-gray-600">Wind Speed</p>
              </div>
            </div>
          </div>
        )}

        {/* Message when no data is present */}
        {!data.name && (
          <div className="text-gray-700 text-center text-xl">
            <p>Enter a location above to get the current weather!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;