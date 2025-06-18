import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>VibeLog</div>
      <div style={styles.links}>
        {username ? (
          <>
            <Link style={styles.link} to="/">Home</Link>
            <button style={styles.link} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

// const styles = {
//   navbar: {
//     marginTop:'-400px',
//    // width:'1000px',
//     marginLeft:'-300px',
//     width:'1800px',
//     paddingRight:'200px',
    
//     backgroundColor: 'green',
//     padding: '1rem 2rem',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   brand: {
//     color: 'white',
//     fontSize: '2rem',
//     fontWeight: 'bold',
//     paddingLeft:'100px',
//   },
//   links: {
//     display: 'flex',
//     gap: '1rem'
//   },
//   link: {
//     color: 'white',
//     fontSize: '1.2rem',
//     textDecoration: 'none',
//     cursor: 'pointer',
//     background: 'none',
//     border: 'none',
//     fontFamily: 'inherit'
//   }
// };

const styles = {
  navbar: {
    backgroundColor: 'green',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed', // Keeps navbar at top
    top: 0,            // Anchors to top
    left: 0,           // Anchors to left
    right: 0,          // Anchors to right
    zIndex: 1000,      // Ensures it stays above other content
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)' // Optional shadow
  },
  brand: {
    color: 'white',
    fontSize: '1.5rem', // Slightly smaller for better proportion
    fontWeight: 'bold'
  },
  links: {
    display: 'flex',
    gap: '1rem'
  },
  link: {
    color: 'white',
    fontSize: '1rem',
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: 'inherit',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.2)'
    }
  }
};

export default Navbar;
