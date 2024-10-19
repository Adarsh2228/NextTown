import React from 'react';

const ShareButton = ({ postId }) => {
  const handleShare = () => {
    // Implement share functionality (e.g., copy link to clipboard)
    alert(`Post ${postId} shared!`);
  };

  return (
    <button onClick={handleShare}>Share</button>
  );
};

export default ShareButton;