import React, { useEffect } from 'react';
import { /**useNavigate,**/ useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../store/slices/userSlice';
import Spinner from '../Spinner/Spinner';
import Header from '../Header/Header';

const PrivateHoc = ({isFetching, data, getUser, navigate, component: Component, ...rest}) => {
  // const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!data) {
      getUser();
    }
  }, [data, getUser]);

  if (isFetching) {
    return <Spinner />;
  }
  // Если данные загружены, передаем их внутреннему компоненту
  return (
    <>
      <Header />
      <Component navigate={navigate} params={params} {...rest} />
    </>
  )
};
// Функция mapStateToProps для получения данных из Redux Store
  const mapStateToProps = (state) => ({
    data: state.userStore.data,
    isFetching: state.userStore.isFetching,
  });
// Функция mapDispatchToProps для отправки экшенов в Redux Store
  const mapDispatchToProps = (dispatch) => ({
    // Экшен для получения данных пользователя
    getUser: () => dispatch(getUser()),
  });
// Соединяем компонент PrivateHoc с Redux Store
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
