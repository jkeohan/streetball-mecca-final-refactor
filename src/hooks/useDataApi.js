import { useState, useEffect } from 'react';

// https://www.robinwieruch.de/react-hooks-fetch-data/

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const makeAPICall = async () => {
      const ls = localStorage.getItem(initialUrl);
      if (ls) {
        setData(JSON.parse(ls));
      } else {
          setIsLoading(true);
          try {
            const res = await fetch(url);
            const json = await res.json();
            setData([json]);
            localStorage.setItem(initialUrl, JSON.stringify([json]));
          } catch (err) {
            console.log('err', err);
          }
      }
      setIsLoading(false);
    };
    makeAPICall();
  }, [url, initialUrl]);

  return [{ data, isLoading }, setUrl];
};

export default useDataApi;
