// DataContext.js
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState('');
  const [shopname,setshopname] = useState('');
  const [currentUser, setCurrentUser] = useState(null) ; 
  const [auth, setAuth] = useState(null) ;

  return (
    <DataContext.Provider value={{ data, setData,shopname,setshopname,auth, setAuth, currentUser, setCurrentUser }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
