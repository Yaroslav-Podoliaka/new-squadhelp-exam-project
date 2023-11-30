import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';
import './App.css';
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
import browserHistory from './browserHistory';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';

const App = () => {
  return (
    <Router history={browserHistory}>
      <ToastContainer
        position='top-center'
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
        <Route path='/' element={<Home />} />
        <Route path='/login*' element={OnlyNotAuthorizedUserHoc(LoginPage)} />
        <Route path='/registration*' element={OnlyNotAuthorizedUserHoc(RegistrationPage)} />
        <Route path='/payment*' element={PrivateHoc(Payment)} />
        <Route path='/startContest*' element={PrivateHoc(StartContestPage)} />
        <Route path='/startContest/nameContest*' element={PrivateHoc(ContestCreationPage, {
            contestType: CONSTANTS.NAME_CONTEST,
            title: 'Company Name',
          })} />
        <Route path='/startContest/taglineContest*' element={PrivateHoc(ContestCreationPage, {
            contestType: CONSTANTS.TAGLINE_CONTEST,
            title: 'TAGLINE',
          })} />
        <Route path='/startContest/logoContest*' element={PrivateHoc(ContestCreationPage, {
            contestType: CONSTANTS.LOGO_CONTEST,
            title: 'LOGO',
          })} />
        <Route path='/dashboard*' element={PrivateHoc(Dashboard)} />
        <Route path='/contest/:id' element={PrivateHoc(ContestPage)} />
        <Route path='/account*' element={PrivateHoc(UserProfile)} />
        <Route element={<NotFound />} />
      </Routes>
      <ChatContainer />
    </Router>
  );
}

/**class App extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <ToastContainer
          position='top-center'
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
          <Route path='/' element={<Home />} />
          <Route path='/login*' element={OnlyNotAuthorizedUserHoc(LoginPage)} />
          <Route path='/registration*' element={OnlyNotAuthorizedUserHoc(RegistrationPage)} />
          <Route path='/payment*' element={PrivateHoc(Payment)} />
          <Route path='/startContest*' element={PrivateHoc(StartContestPage)} />
          <Route path='/startContest/nameContest*' element={PrivateHoc(ContestCreationPage, {
              contestType: CONSTANTS.NAME_CONTEST,
              title: 'Company Name',
            })} />
          <Route path='/startContest/taglineContest*' element={PrivateHoc(ContestCreationPage, {
              contestType: CONSTANTS.TAGLINE_CONTEST,
              title: 'TAGLINE',
            })} />
          <Route path='/startContest/logoContest*' element={PrivateHoc(ContestCreationPage, {
              contestType: CONSTANTS.LOGO_CONTEST,
              title: 'LOGO',
            })} />
          <Route path='/dashboard*' element={PrivateHoc(Dashboard)} />
          <Route path='/contest/:id*' element={PrivateHoc(ContestPage)} />
          <Route path='/account*' element={PrivateHoc(UserProfile)} />
          <Route element={<NotFound />} />
        </Routes>
        <ChatContainer />
      </Router>
    );
  }
}**/

export default App;
