import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.sass';
import CONSTANTS from '../../constants';

const Footer = () => {
  const topFooterItemsRender = (item) => (
    <div key={item.title}>
      <h4>{item.title}</h4>
      {item.items.map((i) => (
        <Link key={i} to='https://google.com'>
          {i}
        </Link>
      ))}
    </div>
  );

  const topFooterRender = () => {
    return CONSTANTS.FooterItems.map((item) => topFooterItemsRender(item));
  };

    return (
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div>{topFooterRender()}</div>
        </div>
      </div>
    );
}

export default Footer;

// import React, { Component } from 'react';
// import styles from './Footer.module.sass';
// import CONSTANTS from '../../constants';

// class Footer extends Component {
//   topFooterItemsRender = item => (
//     <div key={item.title}>
//       <h4>{item.title}</h4>
//       {item.items.map(i => (
//         <a key={i} href='https://google.com'>
//           {i}
//         </a>
//       ))}
//     </div>
//   );

//   topFooterRender () {
//     return CONSTANTS.FooterItems.map(item => this.topFooterItemsRender(item));
//   }

//   render () {
//     return (
//       <div className={styles.footerContainer}>
//         <div className={styles.footerTop}>
//           <div>{this.topFooterRender()}</div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Footer;
