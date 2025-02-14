import React from 'react';
import './TestBanner.css'; // Ensure you create this CSS file

const TestBanner = () => {
  return (
    <div className="test-credentials-banner">
      Site under testing: test credentials (login) - Email: <code>fakemail@example.com</code>, Password: <code>password</code>
    </div>
  );
};

export default TestBanner;