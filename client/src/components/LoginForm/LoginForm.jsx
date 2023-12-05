import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { checkAuth, clearAuth } from '../../store/slices/authSlice';
import styles from './LoginForm.module.sass';
import FormInput from '../FormInput/FormInput';
import Schems from '../../utils/validators/validationSchems';
import Error from '../Error/Error';
import CONSTANTS from '../../constants';

const LoginForm = ({auth, loginRequest, authClear}) => {
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      authClear();
    };
  }, [authClear]);

  const clicked = (values) => {
    loginRequest({ data: values, history: navigate });
  };

    const { error, isFetching } = auth;
    const { submitting } = auth;

    const formInputClasses = {
      container: styles.inputContainer,
      input: styles.input,
      warning: styles.fieldWarning,
      notValid: styles.notValid,
      valid: styles.valid,
    };

    return (
      <div className={styles.loginForm}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={authClear}
          />
        )}
        <h2>LOGIN TO YOUR ACCOUNT</h2>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={clicked}
          validationSchema={Schems.LoginSchem}
        >
          <Form>
            <FormInput
              classes={formInputClasses}
              name="email"
              type="text"
              label="Email Address"
            />
            <FormInput
              classes={formInputClasses}
              name="password"
              type="password"
              label="Password"
            />
            <button
              type="submit"
              disabled={submitting}
              className={styles.submitContainer}
            >
              <span className={styles.inscription}>
                {isFetching ? 'Submitting...' : 'LOGIN'}
              </span>
            </button>
          </Form>
        </Formik>
      </div>
    );
};

const mapStateToProps = (state) => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = (dispatch) => ({
  loginRequest: ({ data, history }) =>
    dispatch(checkAuth({ data, history, authMode: CONSTANTS.AUTH_MODE.LOGIN })),
  authClear: () => dispatch(clearAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

// import React from 'react';
// import { connect } from 'react-redux';
// import { /**Field,**/ Form, Formik } from 'formik';
// import { checkAuth, clearAuth } from '../../store/slices/authSlice';
// import styles from './LoginForm.module.sass';
// import FormInput from '../FormInput/FormInput';
// import Schems from '../../utils/validators/validationSchems';
// import Error from '../Error/Error';
// import CONSTANTS from '../../constants';

// class LoginForm extends React.Component {
//   componentWillUnmount() {
//     this.props.authClear();
//   }

//   clicked = (values) => {
//     this.props.loginRequest({ data: values, history: this.props.history });
//   };

//   render() {
//     const { error, isFetching } = this.props.auth;
//     const { submitting, authClear } = this.props;

//     const formInputClasses = {
//       container: styles.inputContainer,
//       input: styles.input,
//       warning: styles.fieldWarning,
//       notValid: styles.notValid,
//       valid: styles.valid,
//     };

//     return (
//       <div className={styles.loginForm}>
//         {error && (
//           <Error
//             data={error.data}
//             status={error.status}
//             clearError={authClear}
//           />
//         )}
//         <h2>LOGIN TO YOUR ACCOUNT</h2>
//         <Formik
//           initialValues={{
//             email: '',
//             password: '',
//           }}
//           onSubmit={this.clicked}
//           validationSchema={Schems.LoginSchem}
//         >
//           <Form>
//             <FormInput
//               classes={formInputClasses}
//               name="email"
//               type="text"
//               label="Email Address"
//             />
//             <FormInput
//               classes={formInputClasses}
//               name="password"
//               type="password"
//               label="Password"
//             />
//             <button
//               type="submit"
//               disabled={submitting}
//               className={styles.submitContainer}
//             >
//               <span className={styles.inscription}>
//                 {isFetching ? 'Submitting...' : 'LOGIN'}
//               </span>
//             </button>
//           </Form>
//         </Formik>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   const { auth } = state;
//   return { auth };
// };

// const mapDispatchToProps = (dispatch) => ({
//   loginRequest: ({ data, history }) =>
//     dispatch(checkAuth({ data, history, authMode: CONSTANTS.AUTH_MODE.LOGIN })),
//   authClear: () => dispatch(clearAuth()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
