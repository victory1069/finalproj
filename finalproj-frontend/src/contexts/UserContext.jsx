import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConifg";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const location = useLocation()
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) return
    axiosInstance.get("/user", { headers: { "x-auth-token": user._id } }).then(res => {
      setUser(res.data)
    }).catch(err => {
      console.error(err)
      localStorage.removeItem("loggedInUser")
      setUser(null)
    })
  }, [location])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
