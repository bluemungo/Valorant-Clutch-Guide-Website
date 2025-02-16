import React, { useState, useEffect } from 'react';
import Video from './Video';

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        console.log('Fetching videos...');
        const response = await fetch('/videos/bind/kj/atkSide/siteB');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Received non-JSON response: ${text}`);
        }
        const data = await response.json();

        // Check if data is an array, or if it's an object containing an array in data.videos
        let videoArray;
        if (Array.isArray(data)) {
          videoArray = data;
        } else if (data && Array.isArray(data.videos)) {
          videoArray = data.videos;
        } else {
          throw new Error("Unexpected data format: Expected an array of videos");
        }
        setVideos(videoArray);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <h1>🚀 Hello, React Workspace!</h1>
      {videos.map(video => (
        <Video key={video.id} url={video.url} title={video.title} />
      ))}
    </div>
  );
}

export default App;
