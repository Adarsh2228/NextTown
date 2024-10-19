import React, { useState } from 'react';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments([...comments, commentInput]); // Add new comment
      setCommentInput(''); // Clear input
      // Here you can also make an API call to save the comment in the database
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <input 
          type="text" 
          value={commentInput} 
          onChange={(e) => setCommentInput(e.target.value)} 
          placeholder="Add a comment..." 
        />
        <button type="submit">Post</button>
      </form>
      <div>
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;