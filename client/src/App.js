import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateHoc from './components/PrivateHoc/PrivateHoc';
import NotFound from './components/NotFound/NotFound';
import Home from './pages/Home/Home';
import OnlyNotAuthorizedUserHoc from './components/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import CONSTANTS from './constants';
// import browserHistory from './browserHistory';
import { ProvideNavigate } from './browserHistory';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import './App.css';

const App = () => {
  return (
    <Router navigator={ProvideNavigate} /**history={browserHistory}**/>
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<OnlyNotAuthorizedUserHoc component={LoginPage} />}
          />
          <Route
            path="/registration"
            element={<OnlyNotAuthorizedUserHoc component={RegistrationPage} />}
          />
          <Route path="/payment" element={<PrivateHoc component={Payment} />} />
          <Route
            path="/startContest"
            element={<PrivateHoc component={StartContestPage} />}
          />
          <Route
            path="/startContest/nameContest"
            element={
              <PrivateHoc
                component={ContestCreationPage}
                contestType={CONSTANTS.NAME_CONTEST}
                title="Company Name"
              />
            }
          />
          <Route
            path="/startContest/taglineContest"
            element={
              <PrivateHoc
                component={ContestCreationPage}
                contestType={CONSTANTS.TAGLINE_CONTEST}
                title="TAGLINE"
              />
            }
          />
          <Route
            path="/startContest/logoContest"
            element={
              <PrivateHoc
                component={ContestCreationPage}
                contestType={CONSTANTS.LOGO_CONTEST}
                title="LOGO"
              />
            }
          />
          <Route
            path="/dashboard"
            element={<PrivateHoc component={Dashboard} />}
          />
          <Route
            path="/contest/:id"
            element={<PrivateHoc component={ContestPage} />}
          />
          <Route
            path="/account"
            element={<PrivateHoc component={UserProfile} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
      <ChatContainer />
    </Router>
  );
};

export default App;

// import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './App.css';
// import { ToastContainer } from 'react-toastify';
// import LoginPage from './pages/LoginPage/LoginPage';
// import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
// import Payment from './pages/Payment/Payment';
// import StartContestPage from './pages/StartContestPage/StartContestPage';
// import Dashboard from './pages/Dashboard/Dashboard';
// import PrivateHoc from './components/PrivateHoc/PrivateHoc';
// import NotFound from './components/NotFound/NotFound';
// import Home from './pages/Home/Home';
// import OnlyNotAuthorizedUserHoc from './components/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc';
// import ContestPage from './pages/ContestPage/ContestPage';
// import UserProfile from './pages/UserProfile/UserProfile';
// import 'react-toastify/dist/ReactToastify.css';
// import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
// import CONSTANTS from './constants';
// import browserHistory from './browserHistory';
// import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';

// class App extends Component {
//   render () {
//     return (
//       <Router history={browserHistory}>
//         <ToastContainer
//           position='top-center'
//           autoClose={5000}
//           hideProgressBar
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnVisibilityChange
//           draggable
//           pauseOnHover
//         />
//         <Switch>
//           <Route exact path='/' component={Home} />
//           <Route
//             exact
//             path='/login'
//             component={OnlyNotAuthorizedUserHoc(LoginPage)}
//           />
//           <Route
//             exact
//             path='/registration'
//             component={OnlyNotAuthorizedUserHoc(RegistrationPage)}
//           />
//           <Route exact path='/payment' component={PrivateHoc(Payment)} />
//           <Route
//             exact
//             path='/startContest'
//             component={PrivateHoc(StartContestPage)}
//           />
//           <Route
//             exact
//             path='/startContest/nameContest'
//             component={PrivateHoc(ContestCreationPage, {
//               contestType: CONSTANTS.NAME_CONTEST,
//               title: 'Company Name',
//             })}
//           />
//           <Route
//             exact
//             path='/startContest/taglineContest'
//             component={PrivateHoc(ContestCreationPage, {
//               contestType: CONSTANTS.TAGLINE_CONTEST,
//               title: 'TAGLINE',
//             })}
//           />
//           <Route
//             exact
//             path='/startContest/logoContest'
//             component={PrivateHoc(ContestCreationPage, {
//               contestType: CONSTANTS.LOGO_CONTEST,
//               title: 'LOGO',
//             })}
//           />
//           <Route exact path='/dashboard' component={PrivateHoc(Dashboard)} />
//           <Route
//             exact
//             path='/contest/:id'
//             component={PrivateHoc(ContestPage)}
//           />
//           <Route exact path='/account' component={PrivateHoc(UserProfile)} />
//           <Route component={NotFound} />
//         </Switch>
//         <ChatContainer />
//       </Router>
//     );
//   }
// }

// export default App;
