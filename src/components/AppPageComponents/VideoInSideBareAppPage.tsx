import { useState } from 'react';
import SearchField from './SearchField'; // Assuming the SearchField component is in the same directory

// Component to render video search and display in the sidebar
const VideoInSideBareAppPage = () => {
  const [, setSearchQuery] = useState('');

  // Handle search query update
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    // Perform search or filtering based on the value
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Search field */}
      <SearchField onSearch={handleSearch} />
      <div style={{ marginTop: '10px' }}>
        {/* Embedded YouTube video */}
        <iframe
          src="https://www.youtube.com/embed/1z6U0HUKWQg"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ width: '100%', height: '40%', borderRadius: '25px' }}
        ></iframe>
      </div>
    </div>
  );
};

export default VideoInSideBareAppPage;
