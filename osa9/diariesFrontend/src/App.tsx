// import { useState } from 'react'
import { useEffect, useState } from 'react'
import {Diary} from './types'
import axios from 'axios'



const DiaryDisplay = ({diary}: {diary: Diary}) => {
  return (
    <div>
    <h3>{diary.date}</h3>
    <p>weather: {diary.weather}</p>
    <p>visibility: {diary.visibility}</p>
    </div>
  )
}

const Notification = ({error}: {error: string}) =>  {
  return(
    <p style={{ color: 'red' }}>{error}</p>
  )
}


const Diaries = ({diaries}: {diaries: Diary[]}): JSX.Element => {
  return(
    <div>
      <h2> Flight diaries </h2>
      {diaries.map((diary, index) => (
        <DiaryDisplay key={index} diary={diary} />
      ))}
    </div>
  )
}

const App = () => {

  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries')
    .then((response) => setDiaries(response.data))
  },[])

  const postDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    }

    axios.post<Diary>('http://localhost:3000/api/diaries', diaryToAdd)
    .then(response => {
      console.log(response.data);
      setDiaries(diaries.concat(response.data));
      setDate('');
      setWeather('');
      setVisibility('');
      setComment('');
    })
    .catch(error => {
      if (axios.isAxiosError(error) && error.response) {
        console.log('error:', error.response);
        setError(error.response.data);
        setTimeout(() => {
          setError('');
        }, 5000);
      } else {
        console.error('Unexpected error:', error);
      }
    });
};

  return (
    <div>
      <div>
        <h2>Add a new diary</h2>
        <Notification error={error} />
        <form onSubmit={postDiary}>
          <div>
            date: <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </div>
          <div>
            visibility: 
            great          <input type="radio" name="visibility"
              onChange={() => setVisibility('great')} />|
            good    <input type="radio" name="visibility"
              onChange={() => setVisibility('good')} />|
            ok <input type="radio" name="visibility"
              onChange={() => setVisibility('ok')} />|
            poor <input type="radio" name="visibility"
              onChange={() => setVisibility('poor')} />
          </div>
          weather: 
            sunny<input type="radio" name="weather"
              onChange={() => setWeather('sunny')} />|
            rainy    <input type="radio" name="weather"
              onChange={() => setWeather('rainy')} />|
            cloudy <input type="radio" name="weather"
              onChange={() => setWeather('cloudy')} />|
            stormy <input type="radio" name="weather"
              onChange={() => setWeather('stormy')} />|
            windy <input type="radio" name="weather"
              onChange={() => setWeather('windy')} />
          <div>comment: <input value={comment} onChange={(event) => setComment(event.target.value)} /></div>
          <button type='submit'>add</button>
        </form>
      </div>
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App
