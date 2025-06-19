import React, { useState } from 'react';
import axios from 'axios';

function Input() {
  const [context, setContext] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("name");

    if (!username || context.trim() === '') {
      alert("Username not found or context is empty.");
      return;
    }

    try {
      const res = await axios.post("http://16.170.254.172:4004/blog", {
        username: username,
        context: context
      });

      if (res.status === 200) {
        alert("Blog submitted!");
        setContext(""); // Clear the input
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      alert("Error submitting blog: " + (err.response?.data || err.message));
    }
  };


return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Write your blog here..."
          style={styles.textarea}
          rows={4}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'vertical',
    minHeight: '100px'
  },
  button: {
    padding: '0.75rem',
    backgroundColor: 'green',
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#3e8e41'
    }
  }
};

export default Input;
