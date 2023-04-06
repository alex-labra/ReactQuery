import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperheroes = () => {
  return axios.get('http://localhost:4000/superheroes');
}

export const RQSuperHeroesPage = () => {

  //callbacks to perform side effects
  const onSuccess = (dta) => {
    console.log('do side effect after data fetch', data);
  }
  const onError = (error) => {
    console.log('do side effect after data fetch error', error);
  }


  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    fetchSuperheroes,
    {
      // cacheTime: 5000,
      // staleTime: 30000,
      // refetchOnMount: true,  //query re-fetches every time it is mounted
      //refetchOnWindowFocus: true,    //when window is focused a background re-fetch to update data
      //refetchInterval: false,
      //refetchIntervalInBackground: true   //even when window is not in focus

      enabled: false, //data will not be fetched (can be fetched through a button)

      // onSuccess: onSuccess,
      // onError: onError

      //ES6 shorthand
      onSuccess,
      onError
    }
  );

  if (isLoading || isFetching) {
    return <h2>Loading.....</h2>
  }

  //New way to handle errors
  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes</h2>
      <button onClick={refetch} style={{ backgroundColor: 'red', padding: '10px' }}>Fetch Heroes</button>
      {
        data?.data.map(
          (hero) => {
            return <div key={hero.name}>{hero.name}</div>
          }
        )
      }
    </>
  )
  
}
