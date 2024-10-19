import React from 'react';
import LikeButton from '../PostComponents/LikeButton'; // Import LikeButton
import CommentSection from '../PostComponents/CommentSection'; // Import CommentSection
import ShareButton from '../PostComponents/ShareButton'; // Import ShareButton

const PostList = ({ posts, error }) => {
  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {posts.length === 0 && <p>No posts available.</p>} {/* Message for no posts */}
      
      {posts.map((post) => (
        <div key={post._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <p>{post.content}</p>
          
          {/* Render images */}
          {post.images && post.images.length > 0 && post.images.map((imageUrl, index) => (
            <img 
              key={index} 
              src={`http://localhost:4000/${imageUrl}`} 
              alt={`Post image ${index}`} 
              style={{ maxHeight: '200px', marginBottom: '10px' }} 
            />
          ))}
          
          {/* Render videos */}
          {post.videos && post.videos.length > 0 && post.videos.map((videoUrl, index) => (
            <video key={index} controls style={{ maxHeight: '200px', marginBottom: '10px' }}>
              <source src={`http://localhost:4000/${videoUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
          
          {/* Like, Comment, and Share Features */}
          <div style={{ marginTop: '10px' }}>
            <LikeButton postId={post._id} />
            <CommentSection postId={post._id} />
            <ShareButton postId={post._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;