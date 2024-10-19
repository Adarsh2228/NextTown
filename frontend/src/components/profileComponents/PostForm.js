import React from 'react';

const PostForm = ({ content, setContent, mediaPreview, handleMediaChange, handlePostSubmit }) => {
  return (
    <form onSubmit={handlePostSubmit}>
      <div>
        <textarea
          placeholder="Enter post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <input type="file" accept="image/*,video/*" onChange={handleMediaChange} />
      </div>
      {mediaPreview && (
        <div>
          {mediaPreview.endsWith('.mp4') ? (
            <video controls style={{ maxHeight: '200px' }}>
              <source src={mediaPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={mediaPreview} alt="Media preview" style={{ maxHeight: '200px' }} />
          )}
        </div>
      )}
      <button type="submit">Submit Post</button>
    </form>
  );
};

export default PostForm;