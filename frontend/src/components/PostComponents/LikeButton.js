import React, { useState } from 'react';

const LikeButton = ({ postId }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0); // Initialize likes count

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(likesCount + (liked ? -1 : 1)); // Update likes count
    // Here you can also make an API call to update the like status in the database
  };

  return (
    <button onClick={handleLike}>
      {liked ? 'Unlike' : 'Like'} ({likesCount})
    </button>
  );
};

export default LikeButton;