// DataContext.js
import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState('');
  const [shopname,setshopname] = useState('');

  return (
    <DataContext.Provider value={{ data, setData,shopname,setshopname }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
