import React from 'react';
import styles from './TryAgain.module.sass';

const TryAgain = ({getData}) => {

  const handleTryAgain = () => {
    getData();
  };

  return (
    <div className={styles.container}>
      <span onClick={handleTryAgain}>Server Error. Try again</span>
      <i className='fas fa-redo' onClick={handleTryAgain} />
    </div>
  );
};

export default TryAgain;

// import React from 'react';
// import styles from './TryAgain.module.sass';

// const TryAgain = props => {
//   const { getData } = props;
//   return (
//     <div className={styles.container}>
//       <span onClick={() => getData()}>Server Error. Try again</span>
//       <i className='fas fa-redo' onClick={() => getData()} />
//     </div>
//   );
// };

// export default TryAgain;
