import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(key);
      return savedValue === null ? initialValue : JSON.parse(savedValue);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      return;
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
