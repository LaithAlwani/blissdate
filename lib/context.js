"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const { createContext, useContext } = require("react");

const AppContext = createContext({ currentUser: null });

export function AppWrapper({ children }) {
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`/api/user/${user.id}`).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setCurrentUser(data.user);
          });
        }
      });
    } else {
      setCurrentUser(null);
    }
  }, [user]);

  return <AppContext.Provider value={{currentUser, setCurrentUser}}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
