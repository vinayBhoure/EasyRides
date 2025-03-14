import React, { useEffect, useState } from 'react'
import { useGetCordinatesQuery } from '../redux/api/mapAPI'

function Test() {
  const [logs, setLogs] = useState(null);
  // Add a default address to query
  const address = "New York";
  const { data, isLoading, isError } = useGetCordinatesQuery(address);

  useEffect(() => {
    if (isLoading) {
      setLogs("Loading coordinates...");
    }

    if (isError) {
      setLogs("Error fetching coordinates");
    }

    if (data) {
      setLogs(JSON.stringify(data, null, 2));
    }
  }, [data, isLoading, isError]);

  return (
    <div className='flex w-screen h-screen justify-center items-center'>
      <pre className="bg-gray-100 p-4 rounded-lg">
        {logs}
      </pre>
    </div>
  )
}

export default Test