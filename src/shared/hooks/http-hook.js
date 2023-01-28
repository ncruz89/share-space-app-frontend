import { useState, useCallback, useRef, useEffect } from "react";

// useHttpClient custom hook
// handles loading & error state
// returns access to loading and error state as well as sendRequest and clearError methods
export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // create ref for activeHttpRequests
  const activeHttpRequests = useRef([]);

  /* sendRequest method
     receives url, method, body and headers parameters
     handles loading state before and after request
     runs fetch request with passed parameters
     handles httpAbortCtrl in case component unmounts during active fetch requests
     handles parsing response as json
     returns data
  */
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      // before sending request create a new abort controller and add it to activeHttpRequests ref
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal, //signal property points to abort controller signal
        });

        const data = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) throw new Error(data.message);

        setIsLoading(false);

        return data;
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  // clearError method
  // sets error state back to null
  const clearError = () => {
    setError(null);
  };

  // cleanup function for activeHttpRequests...goes through each abort controller and aborts on unmount
  // this will prevent an error occuring if someone leaves the page where there was a component currently making a fetch request.
  useEffect(() => {
    // return (cleanup function) only runs before next useEffect runs or if component unmounts
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
