import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import PlanMyDay from './components/PlanMyDay';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [plan, setPlan] = useState(false);
  const [city,setCity]=useState('');
  const [errorMesage,setErrorMesage]=useState(null);
  //const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000) - 86400);  // Default to 24 hours ago

  const handleCityInput=(e)=>{
    setCity(e.target.value);
  }
  const fetchWeather = async () => {
    const apiKey = '70a5680df26a841da32c2d287a8b74f0';  // Replace with your OpenWeatherMap API key
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    console.log(apiUrl);

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
        setErrorMesage(null)
        setPlan(true)
      }
      else{
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      setErrorMesage("Enter Correct Details");
      setPlan(false)
      setWeather(null)
    }
  };
  const handleClick=()=>{
    fetchWeather()
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
      </header>
      <div className='container'>
        
        <label id="city">Enter City or Country</label>
        <input type="text" className='input' onChange={handleCityInput} id="city"></input>
        <button onClick={handleClick} className='button'>Get Weather</button>
        { errorMesage && <p>{errorMesage}</p> }
      </div>
      <div>
      {weather && <WeatherCard weather={weather} />}
      {plan ? <PlanMyDay weather={weather} /> :<p></p>}
      </div>
    </div>
  );
};
export default App;