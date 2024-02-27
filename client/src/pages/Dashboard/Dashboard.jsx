import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
// import Header from '../../components/Header/Header';

const Dashboard = ({role}) => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!role) {
      navigate('/login');
    }
  }, [role, navigate]);

  if (!role) {
    return null;
  }

  return (
    <div>
      {/* <Header /> */}
      {role === CONSTANTS.CUSTOMER ? (
        <CustomerDashboard navigate={navigate} params={params} />
      ) : (
        <CreatorDashboard navigate={navigate} params={params} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => state.userStore.data;

export default connect(mapStateToProps)(Dashboard);

// import React from 'react';
// import { connect } from 'react-redux';
// import CONSTANTS from '../../constants';
// import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
// import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
// import Header from '../../components/Header/Header';

// const Dashboard = props => {
//   const { role, history } = props;
//   console.log(role);
//   console.log(history);
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
