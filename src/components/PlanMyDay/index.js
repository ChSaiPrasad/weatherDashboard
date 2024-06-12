import React, { useState } from 'react';

const PlanMyDay = ({ weather }) => {
  const [activity, setActivity] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  };

  const handlePlanMyDay = () => {
    if (weather) {
        const activitylower=activity.toLowerCase()
      const temp = weather.main.temp - 273.15;
      if (activitylower === 'beach' && temp > 25 && weather.weather[0].main === 'Clear') {
        setSuggestion('Great day for the beach!');
      } else if (activitylower === 'hiking' && temp > 10 && temp < 25 && weather.weather[0].main !== 'Rain') {
        setSuggestion('Perfect weather for a hike.');
      } else if (activitylower === 'commute' && weather.weather[0].main === 'Rain') {
        setSuggestion('Take an umbrella with you.');
      }else if(activitylower !== 'beach' && activitylower !== 'hiking' && activitylower !== 'commute'){
        setSuggestion('Please Choose from (beach,hiking,commute)');
      }
      else {
        setSuggestion('Weather is not ideal for this activity.');
      }
    }
  };

  return (
    <div className="plan-my-day">
      <h2>Plan My Day</h2>
      <input
        type="text"
        placeholder="Enter activity (e.g., beach, hiking, commute)"
        value={activity}
        className='input'
        onChange={handleActivityChange}
      />
      <button onClick={handlePlanMyDay} className='button'>Plan My Day</button>
      {suggestion && <p>{suggestion}</p>}
    </div>
  );
};

export default PlanMyDay;
