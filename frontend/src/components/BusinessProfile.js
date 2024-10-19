
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom'; // Import Link for navigation
// import BusinessDetails from './profileComponents/BusinessDetails';
// import PostForm from './profileComponents/PostForm';
// import PostList from './profileComponents/PostList';
// import BestMonthsForm from './profileComponents/BestMonthsForm';

// const BusinessProfile = ({ loggedInUserId }) => { // Accepting loggedInUserId as a prop
//   const { id } = useParams();
//   const [business, setBusiness] = useState(null);
//   const [content, setContent] = useState('');
//   const [media, setMedia] = useState(null);
//   const [mediaPreview, setMediaPreview] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState(null);
//   const [bestMonths, setBestMonths] = useState(null);
//   const [categoryInput, setCategoryInput] = useState('');
//   const [loadingBestMonths, setLoadingBestMonths] = useState(false);
//   const [bestMonthsError, setBestMonthsError] = useState(null);

//   // Fetch business details when component mounts
//   useEffect(() => {
//     if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
//       fetchBusinessObjectId();
//     } else {
//       console.error('Invalid or undefined business ID');
//       setError('A valid Business ID is required to fetch data.');
//     }
//   }, [id]);

//   // Fetch business details using ObjectId
//   const fetchBusinessObjectId = async () => {
//     try {
//       console.log(`Fetching business data for ID: ${id}`);
//       const response = await axios.get(`http://localhost:4000/api/businesses/${id}`);
      
//       if (response.data) {
//         setBusiness(response.data);
//         console.log('Business data fetched successfully:', response.data); // Log business data
//         fetchPosts(response.data._id); // Fetch posts with ObjectId
//       } else {
//         throw new Error('No data returned');
//       }
//     } catch (error) {
//       handleRequestError(error);
//     }
//   };

//   // Fetch posts associated with the business
//   const fetchPosts = async (businessId) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/posts/business/${businessId}`);
//       setPosts(response.data);
//     } catch (error) {
//       handleRequestError(error);
//     }
//   };

//   // Handle errors during API requests
//   const handleRequestError = (error) => {
//     console.error('Error fetching data:', error);
//     if (error.response) {
//       setError(`Could not fetch data: ${error.response.data.error || 'Unknown error'}`);
//     } else if (error.request) {
//       setError('No response received from the server.');
//     } else {
//       setError('An error occurred while fetching data.');
//     }
//   };

//   // Handle post submission
//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!business) return; // Prevent submitting if business is not loaded

//     const formData = new FormData();
//     formData.append('media', media);
//     formData.append('content', content);
//     formData.append('businessId', business._id); 

//     try {
//       const response = await axios.post('http://localhost:4000/api/posts', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
      
//       // Update posts state with newly created post
//       setPosts([response.data, ...posts]);
      
//       // Reset form fields
//       setContent('');
//       setMedia(null);
//       setMediaPreview(null);
      
//       // Clear any previous errors
//       setError(null);
      
//     } catch (error) {
//        // Handle post submission error
//        setError(error.response ? error.response.data.error : 'An error occurred while creating the post.');
//      }
//    };

//    // Handle media file selection
//    const handleMediaChange = (e) => {
//      const file = e.target.files[0];
//      if (file) {
//        setMedia(file);
//        const fileURL = URL.createObjectURL(file);
//        setMediaPreview(fileURL); // Set preview for the selected media
//      } else {
//        // Reset media state if no file is selected
//        setMedia(null);
//        setMediaPreview(null);
//      }
//    };

//    // Fetch best months based on category input
//    const fetchBestMonths = async () => {
//      setLoadingBestMonths(true);
//      setBestMonthsError(null);

//      try {
//        // API call to get best performing months based on category
//        const response = await axios.post('http://localhost:4000/api/ml/bestmonths', {
//          category: categoryInput,
//          monthRange: '',
//        });
       
//        // Update best months state with fetched data
//        setBestMonths(response.data);

//      } catch (error) {
//        // Handle best months fetching error
//        setBestMonthsError('Failed to fetch best performing months.');
//      } finally {
//        // Reset loading state regardless of success or failure
//        setLoadingBestMonths(false);
//      }
//    };

//    if (!business) return (<div>Loading...</div>);

//    // Debugging logs for checking user IDs
//    console.log("Logged In User ID:", loggedInUserId);
//    console.log("Business Owner ID:", business.ownerId);

//    return (
//      <div>
//        {/* Render business details */}
//        <BusinessDetails business={business} />
       
//        {/* Navigation to Business Promotion Page */}
//        <Link to={`/business/promotion/${business._id}`} style={{ textDecoration: 'none' }}>
//          <button style={{ marginBottom: '20px' }}>Go to Business Promotion Page</button>
//        </Link>

//        {/* Conditional rendering of Post creation form */}
//        {loggedInUserId === business.ownerId ? ( 
//          <>
//            <h3>Create Post</h3>
//            <PostForm 
//              content={content}
//              setContent={setContent}
//              media={media}
//              mediaPreview={mediaPreview}
//              handleMediaChange={handleMediaChange}
//              handlePostSubmit={handlePostSubmit}
//            />
//          </>
//        ) : (
//          <p>You do not have permission to create posts for this business.</p> 
//        )}

//        {/* Render list of posts */}
//        <h3>Posts</h3>
//        <PostList posts={posts} error={error} />

//        {/* Best months form */}
//        <BestMonthsForm 
//          categoryInput={categoryInput}
//          setCategoryInput={setCategoryInput}
//          fetchBestMonths={fetchBestMonths}
//          loadingBestMonths={loadingBestMonths}
//          bestMonthsError={bestMonthsError}
//          bestMonths={bestMonths}
//        />
//      </div>
//    );
// };

// export default BusinessProfile;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; 
import BusinessDetails from './profileComponents/BusinessDetails';
import PostForm from './profileComponents/PostForm';
import PostList from './profileComponents/PostList';

const BusinessProfile = ({ loggedInUserId }) => { // Accepting loggedInUserId as a prop
  const { id } = useParams(); // Extract business ID from URL params
  const [business, setBusiness] = useState(null); // Store business details
  const [content, setContent] = useState(''); // Store content for new post
  const [media, setMedia] = useState(null); // Store media file for new post
  const [mediaPreview, setMediaPreview] = useState(null); // Store media preview URL
  const [posts, setPosts] = useState([]); // Store all posts for this business
  const [error, setError] = useState(null); // Store errors during requests
  const [bestMonths, setBestMonths] = useState([]); // Store best performing months
  const [categoryInput, setCategoryInput] = useState(''); // Store input for category
  const [loadingBestMonths, setLoadingBestMonths] = useState(false); // Track loading state for best months
  const [bestMonthsError, setBestMonthsError] = useState(null); // Store errors for best months fetch

  // Fetch business details when component mounts
  useEffect(() => {
    if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
      fetchBusinessObjectId();
    } else {
      console.error('Invalid or undefined business ID');
      setError('A valid Business ID is required to fetch data.');
    }
  }, [id]);

  // Fetch business details using ObjectId
  const fetchBusinessObjectId = async () => {
    try {
      console.log(`Fetching business data for ID: ${id}`);
      const response = await axios.get(`http://localhost:4000/api/businesses/${id}`);
      
      if (response.data) {
        setBusiness(response.data);
        console.log('Business data fetched successfully:', response.data);
        fetchPosts(response.data._id);
      } else {
        throw new Error('No data returned');
      }
    } catch (error) {
      handleRequestError(error);
    }
  };

  // Fetch posts associated with the business
  const fetchPosts = async (businessId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/posts/business/${businessId}`);
      setPosts(response.data);
    } catch (error) {
      handleRequestError(error);
    }
  };

  // Handle errors during API requests
  const handleRequestError = (error) => {
    console.error('Error fetching data:', error);
    if (error.response) {
      setError(`Could not fetch data: ${error.response.data.error || 'Unknown error'}`);
    } else if (error.request) {
      setError('No response received from the server.');
    } else {
      setError('An error occurred while fetching data.');
    }
  };

  // Handle post submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    
    if (!business) return; 

    const formData = new FormData();
    formData.append('media', media);
    formData.append('content', content);
    formData.append('businessId', business._id); 

    try {
      const response = await axios.post('http://localhost:4000/api/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' }}); 
      
      setPosts([response.data, ...posts]); // Add the new post to the top of the posts list
      
      // Reset form fields
      setContent('');
      setMedia(null);
      setMediaPreview(null);
      
      setError(null); // Clear any error
      
    } catch (error) {
       setError(error.response ? error.response.data.error : 'An error occurred while creating the post.');
     }
   };

   // Handle media file selection
   const handleMediaChange = (e) => {
     const file = e.target.files[0];
     if (file) {
       setMedia(file);
       const fileURL = URL.createObjectURL(file);
       setMediaPreview(fileURL); // Generate and set media preview URL
     } else {
       setMedia(null);
       setMediaPreview(null);
     }
   };

   // Fetch best months based on category input
   const fetchBestMonths = async () => {
     if (!categoryInput) return; // Prevent fetching if no category is entered

     setLoadingBestMonths(true);
     setBestMonthsError(null);

     try {
       // API call to get best performing months based on category
       const response = await axios.post('http://localhost:5000/api/ml/bestmonths', { category: categoryInput }); 

       // Update best months state with fetched data
       if (response.data) {
         const formattedData = Object.entries(response.data).map(([month, profit]) => ({
           month,
           profit,
         }));
         setBestMonths(formattedData); 
       } else {
         throw new Error("Unexpected response format");
       }

     } catch (error) {
       console.error("Error fetching best months:", error);
       setBestMonthsError(error.response ? error.response.data.error : 'Failed to fetch best performing months.');
     } finally {
       setLoadingBestMonths(false);
     }
   };

   if (!business) return (<div>Loading...</div>);

   return (
     <div>
       {/* Render business details */}
       <BusinessDetails business={business} />
       
       {/* Link to business promotion page */}
       <Link to={`/business/promotion/${business._id}`} style={{ textDecoration: 'none' }}>
         <button style={{ marginBottom: '20px' }}>Go to Business Promotion Page</button>
       </Link>

       {/* Create Post Form */}
       <h3>Create Post</h3>
       <PostForm 
         content={content}
         setContent={setContent}
         mediaPreview={mediaPreview}
         handleMediaChange={handleMediaChange}
         handlePostSubmit={handlePostSubmit}
       />

       {/* Display Media Preview */}
       {mediaPreview && (
         <div style={{ marginTop: '20px' }}>
           <h4>Media Preview:</h4>
           {media.type.startsWith('video/') ? (
             <video controls style={{ maxHeight: '200px' }}>
               <source src={mediaPreview} type="video/mp4" />
               Your browser does not support the video tag.
             </video>
           ) : (
             <img src={mediaPreview} alt="Media preview" style={{ maxHeight: '200px' }} />
           )}
         </div>
       )}

       {/* List of posts */}
       <h3>Posts</h3>
       <PostList posts={posts} error={error} />

       {/* Best Months section */}
       <h3>Best Performing Months</h3>
       
       {/* Input field for category */}
       <input 
         type="text"
         value={categoryInput}
         onChange={(e) => setCategoryInput(e.target.value)}
         placeholder="Enter Business Category"
       />
       
       <button onClick={fetchBestMonths}>Fetch Best Months</button>

       {loadingBestMonths ? (
         <p>Loading best performing months...</p>
       ) : bestMonthsError ? (
         <p>Error: {bestMonthsError}</p>
       ) : (
         <ul>
           {bestMonths.map((monthData) => (
             <li key={monthData.month}>
               Month: {monthData.month}, Predicted Profit: ${monthData.profit.toFixed(2)}
             </li>
           ))}
         </ul>
       )}
       
     </div>
   );
};

export default BusinessProfile;