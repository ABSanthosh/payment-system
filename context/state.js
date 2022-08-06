import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState({
    user: {
      name: "",
      email: "",
      userId: "",
    },
  });

  const setUserAuthInfo = (data) => {
    localStorage.setItem("user", JSON.stringify(data));

    setUser(data);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const isUserAuthenticated = () => {
    if (!user.user) {
      return false;
    }
  };

  const value = {
    user,
    setAuthState: (data) => setUserAuthInfo(data),
    isUserAuthenticated,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
