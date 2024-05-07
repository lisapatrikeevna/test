import React from 'react';

interface UserTermsProps {
  onClose: () => void;
}

const UserTerms: React.FC<UserTermsProps> = ({ onClose }) => {
  return (
    <div>
      <p>Terms and Conditions content here...</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default UserTerms;
