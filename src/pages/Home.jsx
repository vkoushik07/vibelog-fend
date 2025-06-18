


// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import Input from "../components/input";

// function Home() {
//   const [blogs, setBlogs] = useState([]);
//   const username = localStorage.getItem("name");

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await axios.get("http://localhost:4004/blog");
//         setBlogs(Array.isArray(res.data) ? res.data : [res.data]);
//       } catch (err) {
//         console.error("Error fetching blogs:", err);
//       }
//     };

//     if (username) {
//       fetchBlogs();
//     }
//   }, [username]);

//   const handleUpvote = async (id) => {
//     try {
//       await axios.put(`http://localhost:4004/blog/${id}`);
//       const updatedBlogs = await axios.get("http://localhost:4004/blog");
//       setBlogs(Array.isArray(updatedBlogs.data) ? updatedBlogs.data : [updatedBlogs.data]);
//     } catch (err) {
//       console.error("Error upvoting blog:", err);
//     }
//   };

//   const handleReport = async (id) => {
//     try {
//       // Dummy API call for reporting
//       await axios.post(`http://localhost:4004/blog/${id}/report`, {
//         reportedBy: username
//       });
//       alert("Post has been reported");
//     } catch (err) {
//       console.error("Error reporting post:", err);
//     }
//   };

//   if (!username) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div style={styles.container}>
//       <Navbar />
//       <div style={styles.contentWrapper}>
//         <div style={styles.inputContainer}>
//           <Input />
//         </div>
//         <div style={styles.postsContainer}>
//           {blogs.map((blog) => (
//             <div key={blog.id} style={styles.card}>
//               <div style={styles.header}>
//                 <h3 style={styles.user}>@{blog.username}</h3>
//               </div>
//               <p style={styles.text}>{blog.context}</p>
//               <div style={styles.footer}>
//                 <div style={styles.leftFooter}>
//                   <span style={styles.upvotes}>❤️ {blog.upvotes}</span>
//                   {username && (
//                     <button 
//                       style={styles.upvoteButton} 
//                       onClick={() => handleUpvote(blog.id)}
//                     >
//                       Upvote
//                     </button>
//                   )}
//                 </div>
//                 <button 
//                   style={styles.reportButton}
//                   onClick={() => handleReport(blog.id)}
//                 >
//                   Report
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//   },
//   contentWrapper: {
//     display: 'flex',
//     flexDirection: 'column',
//     marginTop: '80px', // Matches navbar height
//   },
//   inputContainer: {
//     padding: '20px 0',
//     backgroundColor: '#fff',
//     display: 'flex',
//     justifyContent: 'center',
//     boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//     zIndex: 100, // Lower than navbar but still above content
//   },
//   postsContainer: {
//     padding: '20px',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '20px',
//     alignItems: 'center',
//   },
//   card: {
//     border: "1px solid #e0e0e0",
//     borderRadius: "10px",
//     padding: "20px",
//     width: "90%",
//     maxWidth: "800px",
//     backgroundColor: "#ffffff",
//     boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'flex-start',
//     marginBottom: '15px'
//   },
//   user: {
//     margin: 0,
//     color: "#333",
//     fontSize: '1.1rem',
//     fontWeight: '600'
//   },
//   text: {
//     fontSize: "1rem",
//     marginBottom: "20px",
//     lineHeight: '1.5',
//     textAlign: 'left'
//   },
//   footer: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingTop: '15px',
//     borderTop: '1px solid #eee'
//   },
//   leftFooter: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '15px'
//   },
//   upvotes: {
//     fontWeight: "bold",
//     color: "#ff4d4f",
//     fontSize: '1rem'
//   },
//   upvoteButton: {
//     padding: "8px 16px",
//     borderRadius: "5px",
//     border: "none",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     cursor: "pointer",
//     fontSize: '0.9rem',
//     transition: 'background-color 0.2s',
//     ':hover': {
//       backgroundColor: '#3e8e41'
//     }
//   },
//   reportButton: {
//     padding: "8px 16px",
//     borderRadius: "5px",
//     border: "1px solid #ff4d4f",
//     backgroundColor: "transparent",
//     color: "#ff4d4f",
//     cursor: "pointer",
//     fontSize: '0.9rem',
//     transition: 'all 0.2s',
//     ':hover': {
//       backgroundColor: '#fff0f0'
//     }
//   }
// };

// export default Home;

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Input from "../components/input";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [upvotedPosts, setUpvotedPosts] = useState([]);
  const username = localStorage.getItem("name");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:4004/blog");
        setBlogs(Array.isArray(res.data) ? res.data : [res.data]);
        
        // Initialize upvoted posts from localStorage if available
        const savedUpvotes = JSON.parse(localStorage.getItem('upvotedPosts')) || [];
        setUpvotedPosts(savedUpvotes);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    if (username) {
      fetchBlogs();
    }
  }, [username]);

  const handleUpvote = async (id) => {
    if (upvotedPosts.includes(id)) {
      return; // Already upvoted
    }

    try {
      await axios.put(`http://localhost:4004/blog/${id}`);
      const updatedBlogs = await axios.get("http://localhost:4004/blog");
      setBlogs(Array.isArray(updatedBlogs.data) ? updatedBlogs.data : [updatedBlogs.data]);
      
      // Update upvoted posts in state and localStorage
      const newUpvotedPosts = [...upvotedPosts, id];
      setUpvotedPosts(newUpvotedPosts);
      localStorage.setItem('upvotedPosts', JSON.stringify(newUpvotedPosts));
    } catch (err) {
      console.error("Error upvoting blog:", err);
    }
  };

  const handleReport = async (id) => {
    try {
      await axios.post(`http://localhost:4004/blog/${id}/report`, {
        reportedBy: username
      });
      alert("Post has been reported");
    } catch (err) {
      console.error("Error reporting post:", err);
    }
  };

  if (!username) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.contentWrapper}>
        <div style={styles.inputContainer}>
          <Input />
        </div>
        <div style={styles.postsContainer}>
          {blogs.map((blog) => (
            <div key={blog.id} style={styles.card}>
              <div style={styles.header}>
                <h3 style={styles.user}>@{blog.username}</h3>
              </div>
              <p style={styles.text}>{blog.context}</p>
              <div style={styles.footer}>
                <div style={styles.leftFooter}>
                  <span style={upvotedPosts.includes(blog.id) ? styles.upvotedHeart : styles.upvotes}>
                    ❤️ {blog.upvotes}
                  </span>
                  {username && (
                    <button 
                      style={upvotedPosts.includes(blog.id) ? styles.upvotedButton : styles.upvoteButton}
                      onClick={() => handleUpvote(blog.id)}
                      disabled={upvotedPosts.includes(blog.id)}
                    >
                      {upvotedPosts.includes(blog.id) ? 'Upvoted' : 'Upvote'}
                    </button>
                  )}
                </div>
                <button 
                  style={styles.reportButton}
                  onClick={() => handleReport(blog.id)}
                >
                  Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '80px',
  },
  inputContainer: {
    padding: '20px 0',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    zIndex: 100,
  },
  postsContainer: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
  },
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    padding: "20px",
    width: "90%",
    maxWidth: "800px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '15px'
  },
  user: {
    margin: 0,
    color: "#333",
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  text: {
    fontSize: "1rem",
    marginBottom: "20px",
    lineHeight: '1.5',
    textAlign: 'left'
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: '15px',
    borderTop: '1px solid #eee'
  },
  leftFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  upvotes: {
    fontWeight: "bold",
    color: "#ff4d4f",
    fontSize: '1rem'
  },
  upvotedHeart: {
    fontWeight: "bold",
    color: "#ff4d4f",
    fontSize: '1rem',
    animation: 'heartBeat 0.5s',
    '@keyframes heartBeat': {
      '0%': { transform: 'scale(1)' },
      '25%': { transform: 'scale(1.3)' },
      '50%': { transform: 'scale(1)' },
      '75%': { transform: 'scale(1.3)' },
      '100%': { transform: 'scale(1)' }
    }
  },
  upvoteButton: {
    padding: "8px 16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#3e8e41'
    }
  },
  upvotedButton: {
    padding: "8px 16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#cccccc",
    color: "#666666",
    cursor: "not-allowed",
    fontSize: '0.9rem'
  },
  reportButton: {
    padding: "8px 16px",
    borderRadius: "5px",
    border: "1px solid #ff4d4f",
    backgroundColor: "transparent",
    color: "#ff4d4f",
    cursor: "pointer",
    fontSize: '0.9rem',
    transition: 'all 0.2s',
    ':hover': {
      backgroundColor: '#fff0f0'
    }
  }
};

export default Home;