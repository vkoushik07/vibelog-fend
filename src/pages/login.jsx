import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://16.170.254.172:4004/auth/login', formData);

      if (res.status === 200 && res.data.username) {
        localStorage.setItem("name", res.data.username);
        navigate('/');
      } else {
        alert("Invalid login");
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h2>Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',           // ✅ center vertically
    //minHeight: '100vh',             // ✅ full screen height
    backgroundColor: '#fff',  
    // marginTop:'100px'
  },
  form: {
    //paddingTop:'200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '300px',
    backgroundColor: '#f7f7f7',     // optional: card-like feel
    padding: '2rem',                // optional: spacing
    borderRadius: '8px',            // optional: rounded corners
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' // optional: subtle shadow
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem'
  },
  button: {
    padding: '0.5rem',
    fontSize: '1rem',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  }
};


export default Login;
