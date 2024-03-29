import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { getUser } from '../../store/slices/userSlice';
// Функциональный компонент высшего порядка (HOC), обеспечивает переход на главную страницу, если пользователь уже авторизован
const OnlyNotAuthorizedUserHoc = ({checkAuth, isFetching, data, component: Component}) => {
  const navigate = useNavigate();
  // Запрашиваем данные пользователя при монтировании компонента
    useEffect(() => {
      checkAuth(navigate);
    }, [checkAuth, navigate]);
  // Отображаем спиннер во время процесса загрузки
    if (isFetching) {
      return <Spinner />;
    }
    // Проверяем наличие данных пользователя и выполняем переход
    if (!data) {
      // Возвращаем переданный компонент
    return <Component navigate={navigate} />;
    }
    return null;
};
// Функция, отображающая какие части стейта необходимы компоненту
  const mapStateToProps = (state) => state.userStore;
// Функция mapDispatchToProps для отправки экшенов в Redux Store
  const mapDispatchToProps = (dispatch) => ({
    // Экшен для получения данных пользователя
    checkAuth: () => dispatch(getUser()),
  });
// Соединяем компонент с Redux Store
export default connect(mapStateToProps, mapDispatchToProps)(OnlyNotAuthorizedUserHoc);

// import React from 'react';
// import { connect } from 'react-redux';
// import { getUser } from '../../store/slices/userSlice';
// import Spinner from '../Spinner/Spinner';

// const OnlyNotAuthorizedUserHoc = Component => {
//   class HocForLoginSignUp extends React.Component {
//     componentDidMount () {
//       this.props.checkAuth(this.props.history.replace);
//     }

//     render () {
//       if (this.props.isFetching) {
//         return <Spinner />;
//       }
//       if (!this.props.data) {
//         return <Component history={this.props.history} />;
//       }
//       return null;
//     }
//   }

//   const mapStateToProps = state => state.userStore;

//   const mapDispatchToProps = dispatch => ({
//     checkAuth: replace => dispatch(getUser(replace)),
//   });

//   return connect(mapStateToProps, mapDispatchToProps)(HocForLoginSignUp);
// };

// export default OnlyNotAuthorizedUserHoc;
