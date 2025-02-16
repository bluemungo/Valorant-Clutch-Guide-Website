import React from 'react';

function Video({ url, title }) {
  return (
    <div className="video">
      <h2>{title}</h2>
      <video width="320" height="240" controls>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Video;
