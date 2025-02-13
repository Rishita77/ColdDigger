import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const History = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('/api/email-history/');
        setHistory(response.data.history);
      } catch (err) {
        setError('Failed to load history');
        console.error('Error fetching history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      <h2>Email History</h2>
      {history.length === 0 ? (
        <p>No email history found.</p>
      ) : (
        <div className="history-content">
          {history.map((item) => (
            <div key={item.id} className="history-item">
              <h3>{item.subject}</h3>
              <p>Sent to: {item.recipient}</p>
              <p>Date: {new Date(item.sent_date).toLocaleString()}</p>
              <p>Status: {item.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;