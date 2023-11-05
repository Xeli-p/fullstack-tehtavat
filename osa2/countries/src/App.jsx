import { useState, useEffect } from 'react'
import './index.css'
import countryService from './services/countries'
import weatherService from './services/weather'

const api_key = import.meta.env.VITE_SOME_KEY

const Details = ({country}) => {

    if (!country) return null

    return(
        <div key={country.ccn3}>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <img src={country.flags.png} alt='Country flag'/>
            <Languages countryLanguages={country.languages} />
            <Weather countryCapital={country.capital} />
        </div>

    )
}

const Weather = ({ countryCapital }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (countryCapital) {
            console.log(`city for weather: ${countryCapital}`)
            weatherService.getWeatherData(countryCapital)
                .then(response => {
                    console.log('weather response:', response);

                    setWeather({
                        temperature: response.main.temp,
                        description: response.weather[0].description,
                        icon: response.weather[0].icon
                    });
                    console.log(`weather icon: ${weather.icon}`);
                })
                .catch(error => {
                    console.error('Failed to fetch weather data:', error);
                });
        }
    }, [countryCapital]);

    return (
        <div>
            <h3>Weather Information</h3>
            {weather ? (
                <div>
                    <p>Temperature: {weather.temperature}</p>
                    <p>Description: {weather.description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

const Languages = ({ countryLanguages }) => {
    if (!countryLanguages) return null;

    const languageListItems = Object.entries(countryLanguages).map(([languageCode, language]) => (
        <li key={languageCode}>{`${language}`}</li>
    ));

    return (
        <div>
            <h3>Languages:</h3>
            <ul>
                {languageListItems}
            </ul>
        </div>
    );
};

const Filter = ({filter, handler}) => {
    return(
        <form>
            <div>
                Search countries: <input
                onChange={handler}
                value={filter} />
            </div>
        </form>
    )
}

const CountryList = ({countries, filter, handleCountry}) => {
    console.log({countries})
    const filtered =
        countries.filter(country =>
            (country.name.common.toLowerCase().indexOf(filter.toLowerCase()) > -1) || (country.name.common.indexOf(filter) > -1)
        )


    if(filtered.length > 10) return (<p>Too many matches, specify search</p>)
    if(filtered.length === 1) {
        console.log({filtered})
        return(
            <Details country={filtered[0]} />
        )
    }

    return(
        filtered.map(country =>
            <ul key={country.name.common}>{country.name.common} <button onClick={() => handleCountry(country)}>show</button></ul>
        )
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [selCountry, setSelCountry] = useState(null)
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        console.log('effect')
        countryService
            .getAll()
            .then(response => {
                console.log('promise fulfilled', response)
                setCountries(response.data)
            })
            .catch(error => {
                console.log('fail')
            })
    }, [])



    const handleFilterChange = (event) => {
        event.preventDefault()
        setFilter(event.target.value)
    }

    const handleCountry = ({ccn3}) => {
        const newCountry = countries.filter(country => country.ccn3 === ccn3)
        console.log('countryhandler:')
        setSelCountry(newCountry[0]);
        console.log({selCountry})
    };

    return (
        <div>
            <Filter filter={filter} handler={handleFilterChange} />
            <Details country={selCountry} />
            <CountryList countries={countries} filter={filter} handleCountry={(ccn3) => handleCountry(ccn3)}/>
        </div>
    )
}
export default App

