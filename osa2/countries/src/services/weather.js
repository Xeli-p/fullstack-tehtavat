import axios from 'axios';
const api_key = import.meta.env.VITE_SOME_KEY;

const weatherService = {
    getWeatherData: async (cityName) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch weather data');
        }
    },
};

export default weatherService;