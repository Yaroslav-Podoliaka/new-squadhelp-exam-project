import React from 'react';
import styles from './Error.module.sass';

const Error = (props) => {
  const getMessage = () => {
    const { status, data } = props;
    switch (status) {
      case 400:
        return 'Check the input data';
      case 403:
        return 'Bank decline transaction';
      case 404:
        return data;
      case 406:
        return data;
      case 409:
        return data;
      case 500:
        return 'Server Error';
      default:
        return null;
    }
  };

  const { clearError } = props;
  
  const errorMessage = getMessage();

  return errorMessage ? (
    <div className={styles.errorContainer}>
      <span>{getMessage()}</span>
      <i className='far fa-times-circle' onClick={() => clearError()} />
    </div>
  ) : null;
};

export default Error;
