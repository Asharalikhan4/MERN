import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * A generic hook for fetching data from an API.
 *
 * @param fetchFn - The asynchronous function that fetches the data.
 * @param initialState - The initial state of the fetch operation.
 * @returns An object containing the fetched data, loading state, and any errors.
 */
export default function useApiFetch<T>(
  fetchFn: () => Promise<T>,
  initialState: FetchState<T> = {
    data: null,
    loading: false,
    error: null,
  }
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>(initialState);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState({ ...state, loading: true, error: null });
        const data = await fetchFn();
        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ ...state, loading: false, error: error as Error });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchFn]);

  return state;
}

/**
 * A simple function to fetch data from an API.
 *
 * @param url - The URL to fetch data from.
 * @returns The fetched data.
 */
export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}

/**
 * Example usage:
 *
 * const MyComponent = () => {
 *   const { data, loading, error } = useFetch(() => fetchData<MyDataType>('/api/data'));
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!data) return null;
 *
 *   return <div>{JSON.stringify(data)}</div>;
 * }
 */