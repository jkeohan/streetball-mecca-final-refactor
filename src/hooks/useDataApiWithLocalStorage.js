import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage'

const useDataApi = (initialUrl, initialData) => {
  console.log('useDataApi - initialUrl, intialData', initialUrl, initialData)
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [storage,setStorage] = useLocalStorage(initialUrl, initialData)

  useEffect(() => {
    const makeAPICall = async () => {
      console.log('useDataApi - storage', storage)
      if (storage.length > 0) {
        setData(storage);
      } else {
          setIsLoading(true);
          try {
            const res = await fetch(url);
            const json = await res.json();
            setData([json]);
            setStorage(initialUrl, [json])
          } catch (err) {
            console.log('err', err);
          }
      }
      setIsLoading(false);
    };
    makeAPICall();
  }, [url]);

  return [{ data, isLoading }, setUrl];
};

export default useDataApi;
