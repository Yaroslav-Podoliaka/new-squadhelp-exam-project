// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { connect } from 'react-redux';
// import Spinner from '../Spinner/Spinner';
// import { getUser } from '../../store/slices/userSlice';
// // import LoginPage from '../../pages/LoginPage/LoginPage';
// // Компонент для обертки других компонентов, требующих аутентификации
// const PrivateHoc = (Component, props) => {
//   const navigate = useNavigate();
// // Функциональный компонент Hoc
//   const Hoc = ({data, getUser, isFetching, match}) => {
// // useEffect для выполнения действий после первого рендера
//     useEffect(() => {
//       // Если данные о пользователе отсутствуют, вызываем экшен для их получения
//       if (!data) {
//         getUser();
//       }
//     }, [data, getUser]);
    
//       return (
//         <>
//           {isFetching && <Spinner />}
//           {isFetching && (
//             // Если данные загружены, передаем их внутреннему компоненту
//             <Component history={navigate} match={match} {...props} />
//           )}
//         </>
//       );
//   };
// // Функция mapStateToProps для получения данных из Redux Store
//   const mapStateToProps = (state) => state.userStore;
// // Функция mapDispatchToProps для отправки экшенов в Redux Store
//   const mapDispatchToProps = (dispatch) => ({
//     // Экшен для получения данных пользователя
//     getUser: () => dispatch(getUser()),
//   });
// // Соединяем компонент Hoc с Redux Store
//   return connect(mapStateToProps, mapDispatchToProps)(Hoc);
// };

// export default PrivateHoc;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../store/slices/userSlice';
import Spinner from '../Spinner/Spinner';

const PrivateHoc = ({isFetching, data, getUser, component: Component, ...rest}) => {
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (!isFetching && !data) {
      // navigate('/login');
    }
  }, [data, isFetching/**, navigate**/]);

  if (isFetching) {
    return <Spinner />;
  }

  return <Component history={navigate} {...rest} />;
};
  const mapStateToProps = (state) => ({
    dana: state.userStore.data,
    isFetching: state.userStore.isFetching,
  });

  const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(getUser()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(PrivateHoc);

// import React from 'react';
// import { connect } from 'react-redux';
// // import { Redirect } from 'react-router-dom';
// import { getUser } from '../../store/slices/userSlice';
// import Spinner from '../Spinner/Spinner';

// const PrivateHoc = (Component, props) => {
//   class Hoc extends React.Component {
//     componentDidMount() {
//       if (!this.props.data) {
//         this.props.getUser();
//       }
//     }

//     render() {
//       return (
//         <>
//           {this.props.isFetching ? (
//             <Spinner />
//           ) : (
//             <Component
//               history={this.props.history}
//               match={this.props.match}
//               {...props}
//             />
//           )}
//         </>
//       );
//     }
//   }

//   const mapStateToProps = (state) => state.userStore;

//   const mapDispatchToProps = (dispatch) => ({
//     getUser: () => dispatch(getUser()),
//   });

//   return connect(mapStateToProps, mapDispatchToProps)(Hoc);
// };

// export default PrivateHoc;
