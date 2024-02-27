import React, { createContext, useContext} from "react";
import { useNavigate } from "react-router-dom";

const NavigateContext = createContext();

export const ProvideNavigate = ({children}) => {
  const navigate = useNavigate();

  return (
    <NavigateContext.Provider value={navigate} >
      {children}
    </NavigateContext.Provider>
  );
};

export const useAppNavigate = () => useContext(NavigateContext);

// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();
// export default history;
