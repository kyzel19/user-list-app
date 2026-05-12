import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users.');
      const data = await response.json();
      setUsers(data.slice(0, 6)); 
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '40px 20px',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    header: {
      color: '#2d3436',
      fontSize: '2.5rem',
      marginBottom: '30px',
      fontWeight: '700',
      letterSpacing: '-1px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '25px',
      width: '100%',
      maxWidth: '1000px'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      cursor: 'default'
    },
    avatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: '#6c5ce7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    name: { margin: '0 0 8px 0', color: '#2d3436', fontSize: '1.25rem' },
    detail: { margin: '4px 0', color: '#636e72', fontSize: '0.9rem' },
    tag: {
      display: 'inline-block',
      marginTop: '12px',
      padding: '4px 12px',
      borderRadius: '20px',
      background: '#e1e5ee',
      fontSize: '0.75rem',
      color: '#4a69bd',
      fontWeight: '600'
    }
  };

  if (loading) return <div style={styles.container}><h2>Loading...</h2></div>;
  if (error) return <div style={styles.container}><h2 style={{color: 'red'}}>{error}</h2></div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>User Directory</h1>
      
      <div style={styles.grid}>
        {users.map((user) => (
          <div 
            key={user.id} 
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
            }}
          >
            {}
            <div style={styles.avatar}>{user.name.charAt(0)}</div>
            
            <h3 style={styles.name}>{user.name}</h3>
            <p style={styles.detail}><strong>Email:</strong> {user.email.toLowerCase()}</p>
            <p style={styles.detail}><strong>Company:</strong> {user.company.name}</p>
            
            <span style={styles.tag}>Active Member</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;