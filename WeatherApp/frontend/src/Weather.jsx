import React, { useState } from 'react';
import "./Weather.css"

const api = {
    key: "8675366954a827a5fd497cb7d5bfa598",
    base: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
    const [query, setQuery] = useState('');
    const [waether, setWeather] = useState({});
    const search = (evt) => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                // setQuery('');
                console.log(result);
            });
        }
        
    };

    const dateBuilder = (d) => {
        let months = ["January", "February", "March","April","May", "June","July","August","September","Octuber","November","December"];
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }
  return (
    <div className={(typeof waether.main != "undefined")?((waether.main.temp > 16) ? 'app-warm' : 'app') : 'app'}>
        <main>
            <div className='search-box'>
                <input type='text'
                className='search-bar'
                placeholder='Search...'
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyPress={search}/>
            </div>
            {(waether.name && waether.sys)?(
                <div>
                <div className='location-box'>
                    <div className='location'>
                        {waether.name},{waether.sys.country}
                    </div>
                    <div className='date'>
                        {dateBuilder(new Date())}
                    </div>
                </div>
                <div className='weather-box'>
                    <div className='temp'>
                        {Math.round(waether.main.temp)}°C
                    </div>
                    <div className='weather'>
                        {waether.weather[0].main}
                    </div>
                </div>
            </div>
            ): ('')}
            
        </main>
    </div>
  )
}

export default Weather