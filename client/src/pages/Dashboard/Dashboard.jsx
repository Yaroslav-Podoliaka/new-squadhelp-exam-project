import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
// import ModeratorDashboard from '../../components/ModeratorDashboard/ModeratorDashboard';
import Header from '../../components/Header/Header';
// import LoginPage from '../LoginPage/LoginPage';
// import { getUser } from '../../store/slices/userSlice';
import Spinner from '../../components/Spinner/Spinner';
import { getUser } from '../../store/slices/userSlice';

// console.log('Dashboard component file is imported');
// const Dashboard = ({role, getUser, isFetching}) => {
const Dashboard = ({ role, getUser, isFetching }) => {
  // const { role, getUser, isFetching } = props;
  const navigate = useNavigate();

  // useEffect(() => {
  //   // console.log('Dashboard is rendering');
  //   getUser();
  // }, [getUser]);

  useEffect(() => {
    if (!isFetching && !role) {
      getUser();
    }
  }, [getUser, role, isFetching]);

  useEffect(() => {
    if (!isFetching && !role === null) {
      navigate('/login');
    }
  }, [role, isFetching, navigate]);

  if (isFetching) {
    return <Spinner />;
  }

  // if (!role) {
  //   // console.log('User not logged in. Redirecting to /login');
  //   navigate('/login');
  //   return null;
  // }

  const dashboardComponent =
  role === CONSTANTS.CUSTOMER ? (
    <CustomerDashboard />
  ) : role === CONSTANTS.CREATOR ? (
    <CreatorDashboard />
  // ) : role === CONSTANTS.MODERATOR ? (
  //   <ModeratorDashboard />
  ) : null;

  return (
    <div>
      <Header />
      {dashboardComponent}
    </div>
  );
};

const mapStateToProps = (state) => ({
  role: state.userStore.data ? state.userStore.data.role : null,
  isFetching: state.userStore.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

// export default Dashboard;


// import React from 'react';
// import { connect } from 'react-redux';
// import CONSTANTS from '../../constants';
// import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
// import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
// import Header from '../../components/Header/Header';

// const Dashboard = props => {
//   const { role, history } = props;
//   return (
//     <div>
//       <Header />
//       {role === CONSTANTS.CUSTOMER ? (
//         <CustomerDashboard history={history} match={props.match} />
//       ) : (
//         <CreatorDashboard history={history} match={props.match} />
//       )}
//     </div>
//   );
// };

// const mapStateToProps = state => state.userStore.data;

// export default connect(mapStateToProps)(Dashboard);
