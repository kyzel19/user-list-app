import React, { useState, useEffect } from 'react';

function App() {
  // 1. Set up our "boxes" (state) to hold data, loading status, and errors
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. The function that grabs the data
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users.');
      }

      const data = await response.json();
      // Only keep the first 5 users
      setUsers(data.slice(0, 5));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 3. Run the function once when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // 4. What the user sees on the screen
  if (loading) return <h2>Loading users...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>User Directory</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {users.map((user) => (
          <div key={user.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;