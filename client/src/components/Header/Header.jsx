import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';
import { clearUserStore } from '../../store/slices/userSlice';
import { getUser } from '../../store/slices/userSlice';
import Logo from '../Logo';

const Header = ({ data, isFetching, getUser, clearUserStore }) => {
  const navigate = useNavigate();
  // если data не существует, запускаем getUser при монтировании компонента,
  useEffect(() => {
    if (!data) {
      getUser();
    }
  }, [data, getUser]);
  // Выход из аккаунта (очистка localStorage, очистка Redux-стейта пользователя и перенаправление на страницу входа)
  const logOut = () => {
    localStorage.clear();
    clearUserStore();
    navigate('/login');
  };
  // Переход на страницу создания контеста
  const startContests = () => {
    navigate('/startContest');
  };
  // Функция для рендеринга кнопок в зависимости от наличия данных пользователя
  const renderLoginButtons = () => {
    if (data) {
      return (
        // Рендеринг блока с информацией о пользователе и выпадающим меню
        <>
          <div className={styles.userInfo}>
            {/* Отображение аватара пользователя */}
            <img
              src={
                data.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${data.avatar}`
              }
              alt="user"
            />
            {/* Отображение имени пользователя */}
            <span>{`Hi, ${data.displayName}`}</span>
            {/* Иконка для выпадающего меню */}
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt="menu"
            />
            {/* Список опций в выпадающем меню */}
            <ul>
              <li>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/account" style={{ textDecoration: 'none' }}>
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http:/www.google.com"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http:/www.google.com"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              {/* Выход из аккаунта */}
              <li>
                <span onClick={logOut}>Logout</span>
              </li>
            </ul>
          </div>
          {/* Иконка для отображения email */}
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
            className={styles.emailIcon}
            alt="email"
          />
        </>
      );
    }
    // Рендеринг кнопок входа и регистрации, если пользователь не авторизован
    return (
      <>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link to="/registration" style={{ textDecoration: 'none' }}>
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  };
  // Если данные о загрузке (isFetching) присутствуют, возвращаем null
  if (isFetching) {
    return null;
  }
  return (
    <div className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        {/* Информационное сообщение */}
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <a href="http://www.google.com">Read Announcement</a>
      </div>
      {/* Блок с номером телефона и кнопками входа/регистрации */}
      <div className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
          <span>(877)&nbsp;355-3585</span>
        </div>
        <div className={styles.userButtonsContainer}>
          {renderLoginButtons()}
        </div>
      </div>
      {/* Блок с навигацией */}
      <div className={styles.navContainer}>
        {/* Логотип */}
        <Logo
          src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
          className={styles.logo}
          alt="blue_logo"
        />
        {/* Блок с левой частью навигации и кнопкой START CONTEST */}
        <div className={styles.leftNav}>
          {/* Навигационное меню */}
          <div className={styles.nav}>
            <ul>
              <li>
                {/* Раздел "NAME IDEAS" */}
                <span>NAME IDEAS</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  {/* Подразделы с категориями */}
                  <li>
                    <a href="http://www.google.com">BEAUTY</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">CONSULTING</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">E-COMMERCE</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">FASHION & CLOTHING</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">FINANCE</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">REAL ESTATE</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">TECH</a>
                  </li>
                  <li className={styles.last}>
                    <a href="http://www.google.com">MORE CATEGORIES</a>
                  </li>
                </ul>
              </li>
              <li>
                {/* Раздел "CONTESTS" */}
                <span>CONTESTS</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  {/* Подразделы с категориями */}
                  <li>
                    <a href="/how-it-works">HOW IT WORKS</a>
                    {/* <Link to="/how-it-works" style={{ textDecoration: 'none' }}>
                      <span>HOW IT WORKS</span>
                    </Link> */}
                  </li>
                  <li>
                    <a href="http://www.google.com">PRICING</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">AGENCY SERVICE</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">ACTIVE CONTESTS</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">WINNERS</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">LEADERBOARD</a>
                  </li>
                  <li className={styles.last}>
                    <a href="http://www.google.com">BECOME A CREATIVE</a>
                  </li>
                </ul>
              </li>
              <li>
                {/* Раздел "Our Work" */}
                <span>Our Work</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  {/* Подразделы с категориями */}
                  <li>
                    <a href="http://www.google.com">NAMES</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">TAGLINES</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">LOGOS</a>
                  </li>
                  <li className={styles.last}>
                    <a href="http://www.google.com">TESTIMONIALS</a>
                  </li>
                </ul>
              </li>
              <li>
                {/* Раздел "Names For Sale" */}
                <span>Names For Sale</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  {/* Подразделы с категориями */}
                  <li>
                    <a href="http://www.google.com">POPULAR NAMES</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">SHORT NAMES</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">INTRIGUING NAMES</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">NAMES BY CATEGORY</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">VISUAL NAME SEARCH</a>
                  </li>
                  <li className={styles.last}>
                    <a href="http://www.google.com">SELL YOUR DOMAINS</a>
                  </li>
                </ul>
              </li>
              <li>
                {/* Раздел "Blog" */}
                <span>Blog</span>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                  alt="menu"
                />
                <ul>
                  {/* Подразделы с категориями */}
                  <li>
                    <a href="http://www.google.com">ULTIMATE NAMING GUIDE</a>
                  </li>
                  <li>
                    <a href="http://www.google.com">
                      POETIC DEVICES IN BUSINESS NAMING
                    </a>
                  </li>
                  <li>
                    <a href="http://www.google.com">CROWDED BAR THEORY</a>
                  </li>
                  <li className={styles.last}>
                    <a href="http://www.google.com">ALL ARTICLES</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {/* Кнопка для создания нового контеста (только для пользователей, не являющихся CREATOR) */}
          {data && data.role !== CONSTANTS.CREATOR && (
            <div className={styles.startContestBtn} onClick={startContests}>
              START CONTEST
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
// Функция для подключения стейта из Redux к компоненту
const mapStateToProps = (state) => state.userStore;
// Функция для подключения actions из Redux к компоненту
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  clearUserStore: () => dispatch(clearUserStore()),
});
// Подключение компонента к Redux-стейту
export default connect(mapStateToProps, mapDispatchToProps)(Header);

// import React from 'react';
// import { connect } from 'react-redux';
// import { Link, withRouter } from 'react-router-dom';
// import styles from './Header.module.sass';
// import CONSTANTS from '../../constants';
// import { clearUserStore } from '../../store/slices/userSlice';
// import { getUser } from '../../store/slices/userSlice';

// class Header extends React.Component {
//   componentDidMount() {
//     if (!this.props.data) {
//       this.props.getUser();
//     }
//   }

//   logOut = () => {
//     localStorage.clear();
//     this.props.clearUserStore();
//     this.props.history.replace('/login');
//   };

//   startContests = () => {
//     this.props.history.push('/startContest');
//   };

//   renderLoginButtons = () => {
//     if (this.props.data) {
//       return (
//         <>
//           <div className={styles.userInfo}>
//             <img
//               src={
//                 this.props.data.avatar === 'anon.png'
//                   ? CONSTANTS.ANONYM_IMAGE_PATH
//                   : `${CONSTANTS.publicURL}${this.props.data.avatar}`
//               }
//               alt="user"
//             />
//             <span>{`Hi, ${this.props.data.displayName}`}</span>
//             <img
//               src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
//               alt="menu"
//             />
//             <ul>
//               <li>
//                 <Link to="/dashboard" style={{ textDecoration: 'none' }}>
//                   <span>View Dashboard</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/account" style={{ textDecoration: 'none' }}>
//                   <span>My Account</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="http:/www.google.com"
//                   style={{ textDecoration: 'none' }}
//                 >
//                   <span>Messages</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="http:/www.google.com"
//                   style={{ textDecoration: 'none' }}
//                 >
//                   <span>Affiliate Dashboard</span>
//                 </Link>
//               </li>
//               <li>
//                 <span onClick={this.logOut}>Logout</span>
//               </li>
//             </ul>
//           </div>
//           <img
//             src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
//             className={styles.emailIcon}
//             alt="email"
//           />
//         </>
//       );
//     }
//     return (
//       <>
//         <Link to="/login" style={{ textDecoration: 'none' }}>
//           <span className={styles.btn}>LOGIN</span>
//         </Link>
//         <Link to="/registration" style={{ textDecoration: 'none' }}>
//           <span className={styles.btn}>SIGN UP</span>
//         </Link>
//       </>
//     );
//   };

//   render() {
//     if (this.props.isFetching) {
//       return null;
//     }
//     return (
//       <div className={styles.headerContainer}>
//         <div className={styles.fixedHeader}>
//           <span className={styles.info}>
//             Squadhelp recognized as one of the Most Innovative Companies by Inc
//             Magazine.
//           </span>
//           <a href="http://www.google.com">Read Announcement</a>
//         </div>
//         <div className={styles.loginSignnUpHeaders}>
//           <div className={styles.numberContainer}>
//             <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
//             <span>(877)&nbsp;355-3585</span>
//           </div>
//           <div className={styles.userButtonsContainer}>
//             {this.renderLoginButtons()}
//           </div>
//         </div>
//         <div className={styles.navContainer}>
//           <img
//             src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
//             className={styles.logo}
//             alt="blue_logo"
//           />
//           <div className={styles.leftNav}>
//             <div className={styles.nav}>
//               <ul>
//                 <li>
//                   <span>NAME IDEAS</span>
//                   <img
//                     src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
//                     alt="menu"
//                   />
//                   <ul>
//                     <li>
//                       <a href="http://www.google.com">Beauty</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">Consulting</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">E-Commerce</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">Fashion & Clothing</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">Finance</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">Real Estate</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">Tech</a>
//                     </li>
//                     <li className={styles.last}>
//                       <a href="http://www.google.com">More Categories</a>
//                     </li>
//                   </ul>
//                 </li>
//                 <li>
//                   <span>CONTESTS</span>
//                   <img
//                     src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
//                     alt="menu"
//                   />
//                   <ul>
//                     <li>
//                       <a href="http://www.google.com">HOW IT WORKS</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">PRICING</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">AGENCY SERVICE</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">ACTIVE CONTESTS</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">WINNERS</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">LEADERBOARD</a>
//                     </li>
//                     <li className={styles.last}>
//                       <a href="http://www.google.com">BECOME A CREATIVE</a>
//                     </li>
//                   </ul>
//                 </li>
//                 <li>
//                   <span>Our Work</span>
//                   <img
//                     src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
//                     alt="menu"
//                   />
//                   <ul>
//                     <li>
//                       <a href="http://www.google.com">NAMES</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">TAGLINES</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">LOGOS</a>
//                     </li>
//                     <li className={styles.last}>
//                       <a href="http://www.google.com">TESTIMONIALS</a>
//                     </li>
//                   </ul>
//                 </li>
//                 <li>
//                   <span>Names For Sale</span>
//                   <img
//                     src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
//                     alt="menu"
//                   />
//                   <ul>
//                     <li>
//                       <a href="http://www.google.com">POPULAR NAMES</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">SHORT NAMES</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">INTRIGUING NAMES</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">NAMES BY CATEGORY</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">VISUAL NAME SEARCH</a>
//                     </li>
//                     <li className={styles.last}>
//                       <a href="http://www.google.com">SELL YOUR DOMAINS</a>
//                     </li>
//                   </ul>
//                 </li>
//                 <li>
//                   <span>Blog</span>
//                   <img
//                     src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
//                     alt="menu"
//                   />
//                   <ul>
//                     <li>
//                       <a href="http://www.google.com">ULTIMATE NAMING GUIDE</a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">
//                         POETIC DEVICES IN BUSINESS NAMING
//                       </a>
//                     </li>
//                     <li>
//                       <a href="http://www.google.com">CROWDED BAR THEORY</a>
//                     </li>
//                     <li className={styles.last}>
//                       <a href="http://www.google.com">ALL ARTICLES</a>
//                     </li>
//                   </ul>
//                 </li>
//               </ul>
//             </div>
//             {this.props.data && this.props.data.role !== CONSTANTS.CREATOR && (
//               <div
//                 className={styles.startContestBtn}
//                 onClick={this.startContests}
//               >
//                 START CONTEST
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => state.userStore;
// const mapDispatchToProps = (dispatch) => ({
//   getUser: () => dispatch(getUser()),
//   clearUserStore: () => dispatch(clearUserStore()),
// });

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
