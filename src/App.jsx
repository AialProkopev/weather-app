import React, { useState } from 'react';

const api = {
  key: "2fc46f18fc913f5291c17d8094a52726",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [img, setImg] = useState([])

  const query = () => {
    if (city !== '')
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}&lang=ru`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result)
          console.log(result)
        });
    else setWeather({})
  }
  const getImage = () => {
    fetch(`https://bing-image-search1.p.rapidapi.com/images/search?q=${city}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
        "x-rapidapi-key": "498f45e0c5msh36432ef701d79c3p170623jsne40a09208255"
      }
    })
      .then(response => response.json())
      .then(res => {
        setImg(res.value)
        console.log(Array.isArray(img))
      })
      .catch(err => {
        console.error(err);
      })
  }

  const submit = (e) => {
    e.preventDefault()
    query()
    getImage()
  }

  const galleryArray = () => {
    let arr = img.map((item) => 
      <div className="gallery__image"><img src={item.contentUrl} /></div>
    )
    return arr
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="title"><h1>Weather App</h1></div>
        <div className="app">
          <form onSubmit={submit}>
            <input
              type="text"
              placeholder="Search city..."
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="submit"
              value="Search"
            />
          </form>
          {(typeof weather.main == 'undefined') ?
            ('Not found') : (
              <div className="app__content">
                <div className="app__place">Place = {weather.name}</div>
                <div className="app__country">Country = {weather.sys.country}</div>
                <div className="app__temp">Temp = {Math.round(weather.main.temp)}°С</div>
                <div className="app__weather">Weather = {weather.weather[0].main}</div>
                {(typeof img[0] !== 'undefined') ?
                  <div className="gallery">
                    
                     
                  
                      {galleryArray()}
                    
                  </div>
                  : ''}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default App