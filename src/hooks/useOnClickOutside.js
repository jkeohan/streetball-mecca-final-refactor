// https://usehooks.com/useOnClickOutside/
import {useEffect} from 'react'

// Hook
export default function useOnClickOutside(ref, handler) {

  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        console.log('useOnClickOutside', ref, event.target);
        // if (!ref.current || ref.current.contains(event.target)) {
        //   return;
        // }

        handler(event);
        //  handler();
      };

      document.addEventListener('mousedown', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
      };
    },
    [ref]
      // [ref, handler]
  );
}