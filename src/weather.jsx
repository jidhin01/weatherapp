import React, { useState } from 'react';
import axios from 'axios';
import Waves from './components/Waves';

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
                    bg-gray-400">


<Waves
  lineColor="#fff"
  backgroundColor="rgba(255, 255, 255, 0.2)"
  waveSpeedX={0.02}
  waveSpeedY={0.01}
  waveAmpX={40}
  waveAmpY={20}
  friction={0.9}
  tension={0.01}
  maxCursorMove={120}
  xGap={12}
  yGap={36}
/>

      <div className="relative z-10 w-full max-w-lg bg-gray-100/5 backdrop-blur-lg shadow-gray-600 bg-opacity-80 backdrop-filter backdrop-blur-lg 
                      rounded-xl shadow-2xl p-6 md:p-8 border border-white border-opacity-60 text-gray-800"> 
        
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-sans text-center mb-8 text-gray-900 drop-shadow-sm">
          <span className="block">Weather</span>
        </h1>

        {/* Search Bar */}
        <div className="search mb-8 text-center">
          <input
            className='p-3 w-full max-w-sm text-lg rounded-full border-2 border-gray-700
                       bg-gray-400/5 backdrop-blur-lg bg-opacity-90 placeholder-gray-500 text-gray-800 shadow-md hover:shadow-gray-900
                       focus:outline-none focus:ring-2  focus:border-transparent
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
                            bg-gray-400 bg-opacity-70 rounded-lg shadow-inner border border-gray-900"> {/* Increased opacity here too */}
              
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
            <p>Enter a location</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;