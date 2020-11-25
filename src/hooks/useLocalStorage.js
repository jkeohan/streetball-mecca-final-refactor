import React, {useState, useEffect} from 'react'

export default function useLocalStorageState(key, defaultValue) {
  console.log('useLocalStorage - key, defaultValue', key, defaultValue)
  const [state, setState] = useState(() => {
    try{
      const ls = window.localStorage.getItem(key)
      return ls ? JSON.parse(ls) : defaultValue
    } 
    catch(e) {
      console.log('useLocalStorage - e', e, defaultValue)
      return defaultValue
    }
  })

  useEffect(() => {
    console.log('useLocalStorage - state', key, state)
      window.localStorage.setItem(key, state)
  }, [state])

  return [state, setState]
}