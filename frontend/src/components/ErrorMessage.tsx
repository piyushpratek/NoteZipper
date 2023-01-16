import React from 'react';
import Alert from 'react-bootstrap/Alert';

const ErrorMessage = ({ variant = 'info', children }) => {
  return (
    <div>
      <>
        {['danger'].map((variant) => (
          <Alert key={variant} variant={variant} style={{ fontSize: 20 }}>
            <strong>{children}</strong>
          </Alert>
        ))}
      </>
    </div>
  );
};

export default ErrorMessage;
