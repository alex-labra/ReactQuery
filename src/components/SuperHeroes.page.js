import axios from 'axios';
import React, { useEffect } from 'react';

export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  //used to catch errors (old way)
  const [error, setError] = React.useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/superheroes')
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      })
  }, []);

  if (isLoading) {
    return <h2>Loading.....</h2>
  }

  //render error
  if(error) {
    return <h2>{error}</h2>
  }

  return (
    <>
      <h1>Super Heroes</h1>
      {
        data.map((hero) => {
          return <div key={hero.name}>{hero.name}</div>
        })
      }
    </>
  )
}
